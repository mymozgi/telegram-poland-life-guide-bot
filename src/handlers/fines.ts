import { Telegraf, Markup } from 'telegraf';
import Database from 'better-sqlite3';
import { BotContext } from '../types';
import { t } from '../locales';
import { getFinesArticles } from '../services/content';
import { trackEvent } from '../analytics/tracker';

export function registerFinesHandler(bot: Telegraf<BotContext>, db: Database.Database): void {
  bot.hears([
    '⚖️ Fines', '⚖️ Mandaty', '⚖️ Штрафи', '⚖️ Штрафы',
  ], async (ctx) => {
    trackEvent(db, ctx.dbUserId, 'category_opened', { category: 'fines' });
    const loc = t(ctx.userLanguage);
    const articles = getFinesArticles(ctx.userLanguage);

    if (!articles.length) {
      await ctx.reply(loc.no_articles, { parse_mode: 'HTML' });
      return;
    }

    const buttons = articles.map(a => [
      Markup.button.callback(a.title, `art:${a.slug}`),
    ]);

    await ctx.reply(
      `${loc.category_labels['fines']}`,
      { parse_mode: 'HTML', ...Markup.inlineKeyboard(buttons) }
    );
  });
}
