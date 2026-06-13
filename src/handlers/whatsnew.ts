import { Telegraf, Markup } from 'telegraf';
import Database from 'better-sqlite3';
import { BotContext } from '../types';
import { t } from '../locales';
import { getRecentArticles } from '../services/content';
import { trackEvent } from '../analytics/tracker';

export function registerWhatsNewHandler(bot: Telegraf<BotContext>, db: Database.Database): void {
  bot.hears([
    '🆕 What\'s new', '🆕 Co nowego', '🆕 Що нового', '🆕 Что нового',
  ], async (ctx) => {
    const loc = t(ctx.userLanguage);
    const articles = getRecentArticles(ctx.userLanguage, 5);

    trackEvent(db, ctx.dbUserId, 'category_opened', { category: 'whats_new' });

    if (!articles.length) {
      await ctx.reply(loc.whats_new_empty, { parse_mode: 'HTML' });
      return;
    }

    const buttons = articles.map(a => [
      Markup.button.callback(a.title, `art:${a.slug}`),
    ]);

    await ctx.reply(loc.whats_new_header, {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard(buttons),
    });
  });
}
