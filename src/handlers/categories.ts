import { Telegraf, Markup } from 'telegraf';
import Database from 'better-sqlite3';
import { BotContext, CATEGORIES, Category } from '../types';
import { t } from '../locales';
import { getArticlesByCategory } from '../services/content';
import { trackEvent } from '../analytics/tracker';

export function registerCategoriesHandler(bot: Telegraf<BotContext>, db: Database.Database): void {
  bot.hears([
    '📚 Categories', '📚 Kategorie', '📚 Категорії', '📚 Категории',
  ], async (ctx) => {
    await showCategoriesList(ctx);
  });

  bot.action('cats', async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.editMessageText(
      t(ctx.userLanguage).categories_header,
      { parse_mode: 'HTML', ...buildCategoriesKeyboard(ctx) }
    );
  });

  bot.action(/^cat:(.+)$/, async (ctx) => {
    await ctx.answerCbQuery();
    const category = ctx.match[1] as Category;
    ctx.session.lastCategory = category;
    trackEvent(db, ctx.dbUserId, 'category_opened', { category });
    await showCategoryArticles(ctx, category);
  });
}

async function showCategoriesList(ctx: BotContext): Promise<void> {
  await ctx.reply(
    t(ctx.userLanguage).categories_header,
    { parse_mode: 'HTML', ...buildCategoriesKeyboard(ctx) }
  );
}

function buildCategoriesKeyboard(ctx: BotContext) {
  const loc = t(ctx.userLanguage);
  const rows = [];
  for (let i = 0; i < CATEGORIES.length; i += 2) {
    const row = [
      Markup.button.callback(loc.category_labels[CATEGORIES[i]], `cat:${CATEGORIES[i]}`),
    ];
    if (CATEGORIES[i + 1]) {
      row.push(Markup.button.callback(loc.category_labels[CATEGORIES[i + 1]], `cat:${CATEGORIES[i + 1]}`));
    }
    rows.push(row);
  }
  return Markup.inlineKeyboard(rows);
}

export async function showCategoryArticles(ctx: BotContext, category: Category): Promise<void> {
  const loc = t(ctx.userLanguage);
  const articles = getArticlesByCategory(ctx.userLanguage, category);
  const label = loc.category_labels[category];

  if (!articles.length) {
    await ctx.editMessageText(
      `${label}\n\n${loc.no_articles}`,
      {
        parse_mode: 'HTML',
        ...Markup.inlineKeyboard([
          [Markup.button.callback(loc.btn_back, 'cats')],
        ]),
      }
    );
    return;
  }

  const buttons = articles.map(a => [
    Markup.button.callback(a.title, `art:${a.slug}`),
  ]);
  buttons.push([Markup.button.callback(loc.btn_back, 'cats')]);

  await ctx.editMessageText(
    `${label} — ${articles.length}`,
    { parse_mode: 'HTML', ...Markup.inlineKeyboard(buttons) }
  );
}
