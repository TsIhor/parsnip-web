import { recipes, categories } from '$lib/recipes.store.js';
import { error } from '@sveltejs/kit';

export function load({ params }: { params: Record<string, string> }) {
  const category = categories.find(c => c.id === params.slug);
  if (!category) throw error(404, 'Category not found');
  const categoryRecipes = recipes.filter(r => r.category === params.slug);
  return { category, recipes: categoryRecipes };
};
