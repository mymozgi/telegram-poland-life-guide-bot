import path from 'path';

export const config = {
  BOT_TOKEN: process.env.BOT_TOKEN ?? '',
  DATABASE_PATH: process.env.DATABASE_PATH ?? path.join(process.cwd(), 'data', 'bot.db'),
  CONTENT_DIR: process.env.CONTENT_DIR ?? path.join(process.cwd(), 'content'),
  ASSETS_DIR: process.env.ASSETS_DIR ?? path.join(process.cwd(), 'assets'),
  STATS_PORT: Number(process.env.PORT ?? process.env.STATS_PORT ?? 3000),
  ADMIN_ID: Number(process.env.ADMIN_TELEGRAM_ID ?? 0),
  KOFI_URL: process.env.KOFI_URL ?? '',
};
