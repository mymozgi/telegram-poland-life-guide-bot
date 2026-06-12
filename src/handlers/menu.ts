import { Telegraf, Markup } from 'telegraf';
import { DatabaseSync } from 'node:sqlite';
import { BotContext } from '../types';
import { t } from '../locales';

export function registerMenuHandler(bot: Telegraf<BotContext>, _db: DatabaseSync): void {
  bot.hears(/(🏠|Menu|Меню|Menü|menu)/i, async (ctx) => {
    await showMainMenu(ctx);
  });
}

export async function showMainMenu(ctx: BotContext): Promise<void> {
  const loc = t(ctx.userLanguage);
  ctx.session.state = undefined;

  await ctx.reply(
    loc.main_menu_text,
    {
      parse_mode: 'HTML',
      ...Markup.keyboard([
        [loc.btn_search],
        [loc.btn_categories, loc.btn_fines],
        [loc.btn_favorites, loc.btn_feedback],
        [loc.btn_language, loc.btn_about],
      ]).resize(),
    }
  );
}
