import 'dotenv/config';
import { getDatabase } from './db/database';
import { runMigrations } from './db/schema';
import { loadAllArticles } from './services/content';
import { createBot } from './bot/bot';
import { startStatsServer } from './handlers/stats';

async function main(): Promise<void> {
  const db = getDatabase();
  runMigrations(db);
  loadAllArticles();
  startStatsServer(db);

  const bot = createBot(db);

  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));

  await bot.launch();
  console.log('Bot started successfully!');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
