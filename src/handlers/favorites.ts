import { Telegraf, Markup } from 'telegraf';
import { DatabaseSync } from 'node:sqlite';
import { BotContext } from '../types';
import { t } from '../locales';
import { getUserFavorites } from '../services/favorites';
import { getArticleBySlug } from '../services/content';

export function registerFavoritesHandler(bot: Telegraf<BotContext>, db: DatabaseSync): void {
  bot.hears([
    '⭐ Favorites', '⭐ Ulubione', '⭐ Улюблені', '⭐ Избранное',
  ], async (ctx) => {
    await showFavorites(ctx, db);
  });

  bot.action('favs', async (ctx) => {
    await ctx.answerCbQuery();
    await showFavorites(ctx, db, true);
  });
}

async function showFavorites(ctx: BotContext, db: DatabaseSync, edit = false): Promise<void> {
  const loc = t(ctx.userLanguage);
  const favorites = getUserFavorites(db, ctx.dbUserId);

  if (!favorites.length) {
    const text = loc.no_favorites;
    if (edit) {
      await ctx.editMessageText(text, { parse_mode: 'HTML' });
    } else {
      await ctx.reply(text, { parse_mode: 'HTML' });
    }
    return;
  }

  const buttons = favorites
    .map(fav => {
      const article = getArticleBySlug(fav.article_lang as BotContext['userLanguage'], fav.article_slug);
      const label = article ? article.title : fav.article_slug;
      return [Markup.button.callback(label, `art:${fav.article_slug}`)];
    })
    .filter(Boolean);

  const text = loc.favorites_header;
  const keyboard = Markup.inlineKeyboard(buttons);

  if (edit) {
    await ctx.editMessageText(text, { parse_mode: 'HTML', ...keyboard });
  } else {
    await ctx.reply(text, { parse_mode: 'HTML', ...keyboard });
  }
}
