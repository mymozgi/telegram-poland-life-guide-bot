import { MiddlewareFn } from 'telegraf';
import Database from 'better-sqlite3';
import { BotContext } from '../types';
import { getOrCreateUser } from '../services/user';

export function userMiddleware(db: Database.Database): MiddlewareFn<BotContext> {
  return async (ctx, next) => {
    if (ctx.from) {
      const user = getOrCreateUser(db, ctx.from.id, ctx.from.username ?? null);
      ctx.userLanguage = user.language as BotContext['userLanguage'];
      ctx.dbUserId = user.id;
    }
    return next();
  };
}
