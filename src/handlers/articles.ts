import { Telegraf, Markup } from 'telegraf';
import { DatabaseSync } from 'node:sqlite';
import { BotContext, Article, Category } from '../types';
import { t } from '../locales';
import { getArticleBySlug } from '../services/content';
import { isFavorite, addFavorite, removeFavorite } from '../services/favorites';
import { trackEvent } from '../analytics/tracker';
import path from 'path';
import fs from 'fs';
import { config } from '../config';

export function registerArticlesHandler(bot: Telegraf<BotContext>, db: DatabaseSync): void {
  bot.action(/^art:(.+)$/, async (ctx) => {
    await ctx.answerCbQuery();
    const slug = ctx.match[1];
    trackEvent(db, ctx.dbUserId, 'article_opened', { slug });
    await sendArticle(ctx, db, slug);
  });

  bot.action(/^fav\+:(.+)$/, async (ctx) => {
    await ctx.answerCbQuery('⭐ Saved!');
    const slug = ctx.match[1];
    addFavorite(db, ctx.dbUserId, slug, ctx.userLanguage);
    await ctx.editMessageReplyMarkup(buildArticleKeyboard(ctx, db, slug).reply_markup);
  });

  bot.action(/^fav-:(.+)$/, async (ctx) => {
    await ctx.answerCbQuery('Removed.');
    const slug = ctx.match[1];
    removeFavorite(db, ctx.dbUserId, slug, ctx.userLanguage);
    await ctx.editMessageReplyMarkup(buildArticleKeyboard(ctx, db, slug).reply_markup);
  });
}

export async function sendArticle(ctx: BotContext, db: DatabaseSync, slug: string, backAction?: string): Promise<void> {
  const loc = t(ctx.userLanguage);
  const article = getArticleBySlug(ctx.userLanguage, slug);

  if (!article) {
    await ctx.reply(loc.error_general);
    return;
  }

  const text = formatArticle(article, loc);
  const keyboard = buildArticleKeyboard(ctx, db, slug, backAction ?? (article.category ? `cat:${article.category}` : 'cats'));

  const imagePath = article.images[0]
    ? path.join(config.ASSETS_DIR, 'images', article.images[0].file)
    : null;

  if (imagePath && fs.existsSync(imagePath)) {
    await ctx.replyWithPhoto(
      { source: imagePath },
      { caption: text, parse_mode: 'HTML', ...keyboard }
    );
  } else {
    await ctx.reply(text, { parse_mode: 'HTML', ...keyboard });
  }
}

function buildArticleKeyboard(ctx: BotContext, db: DatabaseSync, slug: string, backAction = 'cats') {
  const loc = t(ctx.userLanguage);
  const faved = isFavorite(db, ctx.dbUserId, slug, ctx.userLanguage);
  return Markup.inlineKeyboard([
    [
      faved
        ? Markup.button.callback(loc.btn_remove_favorite, `fav-:${slug}`)
        : Markup.button.callback(loc.btn_add_favorite, `fav+:${slug}`),
    ],
    [Markup.button.callback(loc.btn_back, backAction)],
  ]);
}

function formatArticle(article: Article, loc: ReturnType<typeof t>): string {
  const lines: string[] = [];

  lines.push(`<b>${article.title}</b>\n`);
  lines.push(`❓ <b>${article.question}</b>\n`);
  lines.push(`✅ ${article.short_answer}`);

  if (article.conditions.length) {
    lines.push(`\n${loc.article_conditions}`);
    article.conditions.forEach(c => lines.push(`• ${c}`));
  }

  if (article.exceptions.length) {
    lines.push(`\n${loc.article_exceptions}`);
    article.exceptions.forEach(e => lines.push(`• ${e}`));
  }

  if (article.penalties.length) {
    lines.push(`\n${loc.article_penalties}`);
    article.penalties.forEach(p => lines.push(`• ${p}`));
  }

  if (article.legal_basis.length && (article.legal_basis[0].act || article.legal_basis[0].article)) {
    lines.push(`\n${loc.article_legal}`);
    article.legal_basis.forEach(lb => {
      if (lb.act || lb.article) {
        lines.push(`• ${[lb.act, lb.article].filter(Boolean).join(', Art. ')}`);
      }
    });
  }

  if (article.sources.length && article.sources[0].title) {
    lines.push(`\n${loc.article_sources}`);
    article.sources.forEach(s => {
      if (s.url) {
        lines.push(`• <a href="${s.url}">${s.title}</a>`);
      } else {
        lines.push(`• ${s.title}`);
      }
    });
  }

  if (article.updated_at) {
    lines.push(`\n<i>${loc.article_updated}: ${article.updated_at}</i>`);
  }

  return lines.join('\n');
}
