import { Telegraf, Markup } from 'telegraf';
import Database from 'better-sqlite3';
import { BotContext } from '../types';
import { t } from '../locales';
import { config } from '../config';

export function registerAboutHandler(bot: Telegraf<BotContext>, _db: Database.Database): void {
  bot.hears([
    'ℹ️ About', 'ℹ️ O aplikacji', 'ℹ️ Про бот', 'ℹ️ О боте',
  ], async (ctx) => {
    const loc = t(ctx.userLanguage);
    const keyboard = config.KOFI_URL
      ? Markup.inlineKeyboard([[Markup.button.url(loc.btn_support, config.KOFI_URL)]])
      : undefined;

    await ctx.reply(loc.about_text, {
      parse_mode: 'HTML',
      ...(keyboard ?? {}),
    });
  });
}
