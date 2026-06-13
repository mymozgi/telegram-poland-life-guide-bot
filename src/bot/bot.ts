import { Telegraf, session } from 'telegraf';
import Database from 'better-sqlite3';
import { BotContext, SessionData } from '../types';
import { config } from '../config';
import { userMiddleware } from './middleware';
import { registerStartHandler } from '../handlers/start';
import { registerLanguageHandler } from '../handlers/language';
import { registerMenuHandler } from '../handlers/menu';
import { registerCategoriesHandler } from '../handlers/categories';
import { registerArticlesHandler } from '../handlers/articles';
import { registerSearchHandler } from '../handlers/search';
import { registerFavoritesHandler } from '../handlers/favorites';
import { registerFeedbackHandler } from '../handlers/feedback';
import { registerAboutHandler } from '../handlers/about';
import { registerFinesHandler } from '../handlers/fines';
import { registerWhatsNewHandler } from '../handlers/whatsnew';

const defaultSession = (): SessionData => ({
  state: undefined,
  feedbackText: undefined,
  lastCategory: undefined,
});

export function createBot(db: Database.Database): Telegraf<BotContext> {
  const bot = new Telegraf<BotContext>(config.BOT_TOKEN);

  bot.use(session({ defaultSession }));
  bot.use(userMiddleware(db));

  registerStartHandler(bot, db);
  registerLanguageHandler(bot, db);
  registerMenuHandler(bot, db);
  registerCategoriesHandler(bot, db);
  registerArticlesHandler(bot, db);
  registerSearchHandler(bot, db);
  registerFavoritesHandler(bot, db);
  registerFeedbackHandler(bot, db);
  registerAboutHandler(bot, db);
  registerFinesHandler(bot, db);
  registerWhatsNewHandler(bot, db);

  bot.catch((err, ctx) => {
    console.error(`Error for ${ctx.updateType}:`, err);
  });

  return bot;
}
