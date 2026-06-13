import { Telegraf, Markup } from 'telegraf';
import Database from 'better-sqlite3';
import { BotContext } from '../types';
import { t } from '../locales';
import { getUserFavorites, removeFavorite } from '../services/favorites';
import { getArticleBySlug } from '../services/content';

export function registerFavoritesHandler(bot: Telegraf<BotContext>, db: Database.Database): void {
  bot.hears([
    '⭐ Favorites', '⭐ Ulubione', '⭐ Улюблені', '⭐ Избранное',
  ], async (ctx) => {
    await showFavorites(ctx, db);
  });

  bot.action('favs', async (ctx) => {
    await ctx.answerCbQuery();
    await showFavorites(ctx, db, true);
  });

  // fd:lang:slug — delete favorite directly from list
  bot.action(/^fd:([^:]+):(.+)$/, async (ctx) => {
    await ctx.answerCbQuery('🗑️ Removed');
    const lang = ctx.match[1];
    const slug = ctx.match[2];
    removeFavorite(db, ctx.dbUserId, slug, lang);
    await showFavorites(ctx, db, true);
  });
}

async function showFavorites(ctx: BotContext, db: Database.Database, edit = false): Promise<void> {
  const loc = t(ctx.userLanguage);
  const favorites = getUserFavorites(db, ctx.dbUserId);

  if (!favorites.length) {
    const text = loc.no_favorites;
    if (edit) {
      await ctx.editMessageText(text, { parse_mode: 'HTML' }).catch(() => ctx.reply(text, { parse_mode: 'HTML' }));
    } else {
      await ctx.reply(text, { parse_mode: 'HTML' });
    }
    return;
  }

  const buttons = favorites.map(fav => {
    const article = getArticleBySlug(fav.article_lang as BotContext['userLanguage'], fav.article_slug);
    const label = article ? article.title : fav.article_slug;
    return [
      Markup.button.callback(label, `art:${fav.article_slug}`),
      Markup.button.callback('🗑️', `fd:${fav.article_lang}:${fav.article_slug}`),
    ];
  });

  const text = loc.favorites_header;
  const keyboard = Markup.inlineKeyboard(buttons);

  if (edit) {
    await ctx.editMessageText(text, { parse_mode: 'HTML', ...keyboard });
  } else {
    await ctx.reply(text, { parse_mode: 'HTML', ...keyboard });
  }
}
