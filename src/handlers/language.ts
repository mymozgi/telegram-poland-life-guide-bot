import { Telegraf } from 'telegraf';
import Database from 'better-sqlite3';
import { BotContext, LANGUAGES, Language } from '../types';
import { t } from '../locales';
import { setUserLanguage } from '../services/user';
import { trackEvent } from '../analytics/tracker';
import { showMainMenu } from './menu';
import { showLanguageSelection } from './start';

export function registerLanguageHandler(bot: Telegraf<BotContext>, db: Database.Database): void {
  for (const lang of LANGUAGES) {
    bot.action(`lang:${lang}`, async (ctx) => {
      await ctx.answerCbQuery();
      setUserLanguage(db, ctx.from!.id, lang as Language);
      ctx.userLanguage = lang as Language;
      trackEvent(db, ctx.dbUserId, 'language_selected', { language: lang });
      await ctx.editMessageText(t(lang as Language).language_saved, { parse_mode: 'HTML' });
      await showMainMenu(ctx);
    });
  }

  bot.hears([
    '🌐 Language', '🌐 Język', '🌐 Мова', '🌐 Язык',
  ], async (ctx) => {
    await showLanguageSelection(ctx);
  });
}
