import { Telegraf, Markup } from 'telegraf';
import { DatabaseSync } from 'node:sqlite';
import { BotContext } from '../types';
import { t } from '../locales';
import { saveFeedback } from '../services/feedback';
import { trackEvent } from '../analytics/tracker';
import { showMainMenu } from './menu';

export function registerFeedbackHandler(bot: Telegraf<BotContext>, db: DatabaseSync): void {
  bot.hears([
    '💡 Suggest improvement', '💡 Zaproponuj ulepszenie',
    '💡 Запропонувати покращення', '💡 Предложить улучшение',
  ], async (ctx) => {
    ctx.session.state = 'awaiting_feedback_text';
    await ctx.reply(t(ctx.userLanguage).feedback_prompt, { parse_mode: 'HTML' });
  });

  bot.on('text', async (ctx, next) => {
    if (ctx.session.state !== 'awaiting_feedback_text') return next();

    ctx.session.feedbackText = ctx.message.text;
    ctx.session.state = 'awaiting_feedback_photo';

    const loc = t(ctx.userLanguage);
    await ctx.reply(
      loc.feedback_photo_prompt,
      {
        parse_mode: 'HTML',
        ...Markup.inlineKeyboard([
          [Markup.button.callback(loc.btn_skip_photo, 'fb:skip')],
        ]),
      }
    );
  });

  bot.on('photo', async (ctx, next) => {
    if (ctx.session.state !== 'awaiting_feedback_photo') return next();

    const fileId = ctx.message.photo[ctx.message.photo.length - 1].file_id;
    const text = ctx.session.feedbackText ?? null;

    saveFeedback(db, ctx.dbUserId, text, fileId);
    trackEvent(db, ctx.dbUserId, 'feedback_sent', { has_photo: true });

    ctx.session.state = undefined;
    ctx.session.feedbackText = undefined;

    await ctx.reply(t(ctx.userLanguage).feedback_received, { parse_mode: 'HTML' });
    await showMainMenu(ctx);
  });

  bot.action('fb:skip', async (ctx) => {
    await ctx.answerCbQuery();
    const text = ctx.session.feedbackText ?? null;

    saveFeedback(db, ctx.dbUserId, text, null);
    trackEvent(db, ctx.dbUserId, 'feedback_sent', { has_photo: false });

    ctx.session.state = undefined;
    ctx.session.feedbackText = undefined;

    await ctx.editMessageText(t(ctx.userLanguage).feedback_received, { parse_mode: 'HTML' });
    await showMainMenu(ctx);
  });
}
