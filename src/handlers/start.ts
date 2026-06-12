import { Telegraf, Markup } from 'telegraf';
import Database from 'better-sqlite3';
import { BotContext } from '../types';
import { t } from '../locales';
import { showMainMenu } from './menu';

export function registerStartHandler(bot: Telegraf<BotContext>, _db: Database.Database): void {
  bot.start(async (ctx) => {
    await ctx.reply(
      t(ctx.userLanguage).welcome,
      {
        parse_mode: 'HTML',
        ...Markup.inlineKeyboard([
          [Markup.button.callback('🇬🇧 English', 'lang:en')],
          [Markup.button.callback('🇵🇱 Polski', 'lang:pl')],
          [Markup.button.callback('🇺🇦 Українська', 'lang:ua')],
          [Markup.button.callback('🇷🇺 Русский', 'lang:ru')],
        ]),
      }
    );
  });

  bot.command('menu', async (ctx) => {
    await showMainMenu(ctx);
  });
}

export async function showLanguageSelection(ctx: BotContext): Promise<void> {
  await ctx.reply(
    t(ctx.userLanguage).choose_language,
    {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        [Markup.button.callback('🇬🇧 English', 'lang:en')],
        [Markup.button.callback('🇵🇱 Polski', 'lang:pl')],
        [Markup.button.callback('🇺🇦 Українська', 'lang:ua')],
        [Markup.button.callback('🇷🇺 Русский', 'lang:ru')],
      ]),
    }
  );
}
