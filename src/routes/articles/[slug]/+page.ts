import { error } from '@sveltejs/kit';
import { articles } from '$lib/articles.js';

export function load({ params }: { params: Record<string, string> }) {
  const article = articles.find(a => a.slug === params.slug);
  if (!article) throw error(404, 'Article not found');

  const related = articles
    .filter(a => a.category === article.category && a.slug !== article.slug)
    .slice(0, 3);

  return { article, related };
}
