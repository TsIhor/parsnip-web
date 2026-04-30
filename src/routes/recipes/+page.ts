import { browser } from '$app/environment';
import { recipeStore } from '$lib/recipes.store';
import { get } from 'svelte/store';

export async function load() {
  if (browser) {
    const cached = get(recipeStore.state).recipes.length > 0;
    if (cached) {
      recipeStore.fetchRecipes();
    } else {
      await recipeStore.fetchRecipes();
    }
  }
  return {};
}
