import { Telegraf } from 'telegraf';
import { DatabaseSync } from 'node:sqlite';
import { BotContext } from '../types';
import { t } from '../locales';

export function registerAboutHandler(bot: Telegraf<BotContext>, _db: DatabaseSync): void {
  bot.hears([
    'ℹ️ About', 'ℹ️ O aplikacji', 'ℹ️ Про бот', 'ℹ️ О боте',
  ], async (ctx) => {
    await ctx.reply(t(ctx.userLanguage).about_text, { parse_mode: 'HTML' });
  });
}
