import { Article, Language } from '../types';
import { getArticlesByLanguage } from '../services/content';

export interface SearchResult {
  article: Article;
  score: number;
}

export function searchArticles(lang: Language, query: string): Article[] {
  const articles = getArticlesByLanguage(lang);
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];

  const scored: SearchResult[] = articles
    .map(article => ({ article, score: scoreArticle(article, terms) }))
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.map(r => r.article);
}

function scoreArticle(article: Article, terms: string[]): number {
  const titleLow = article.title.toLowerCase();
  const questionLow = article.question.toLowerCase();
  const answerLow = article.short_answer.toLowerCase();
  const keywordsLow = article.keywords.map(k => k.toLowerCase());

  let score = 0;
  for (const term of terms) {
    if (titleLow.includes(term)) score += 10;
    if (keywordsLow.some(k => k.includes(term))) score += 8;
    if (questionLow.includes(term)) score += 6;
    if (answerLow.includes(term)) score += 4;
    const conditionsText = article.conditions.join(' ').toLowerCase();
    if (conditionsText.includes(term)) score += 2;
  }
  return score;
}
