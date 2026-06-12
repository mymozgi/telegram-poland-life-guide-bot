import { Telegraf, Markup } from 'telegraf';
import Database from 'better-sqlite3';
import { BotContext } from '../types';
import { t } from '../locales';
import { searchArticles } from '../search/index';
import { trackEvent } from '../analytics/tracker';
import { showMainMenu } from './menu';

export function registerSearchHandler(bot: Telegraf<BotContext>, db: Database.Database): void {
  bot.hears([
    '🔍 Ask question', '🔍 Zadaj pytanie', '🔍 Задати питання', '🔍 Задать вопрос',
  ], async (ctx) => {
    ctx.session.state = 'awaiting_search';
    await ctx.reply(t(ctx.userLanguage).search_prompt, { parse_mode: 'HTML' });
  });

  bot.on('text', async (ctx, next) => {
    if (ctx.session.state !== 'awaiting_search') return next();

    const query = ctx.message.text.trim();
    if (!query) return next();

    ctx.session.state = undefined;
    const results = searchArticles(ctx.userLanguage, query);

    trackEvent(db, ctx.dbUserId, 'search', { query, results_count: results.length });

    const loc = t(ctx.userLanguage);

    if (!results.length) {
      await ctx.reply(
        loc.search_no_results.replace('{query}', escapeHtml(query)),
        {
          parse_mode: 'HTML',
          ...Markup.inlineKeyboard([
            [Markup.button.callback(loc.btn_categories, 'cats')],
          ]),
        }
      );
      return;
    }

    const count = Math.min(results.length, 10);
    const header = loc.search_results
      .replace('{query}', escapeHtml(query))
      .replace('{count}', String(count));

    const buttons = results.slice(0, 10).map(a => [
      Markup.button.callback(a.title, `art:${a.slug}`),
    ]);

    await ctx.reply(header, {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard(buttons),
    });
  });
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
