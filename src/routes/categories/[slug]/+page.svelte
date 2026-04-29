<script lang="ts">
  import RecipeCard from '$lib/components/RecipeCard.svelte';
  import type { Category, Recipe } from '$lib/recipes.store.js';
  interface PageData { category: Category; recipes: Recipe[]; }
  let { data }: { data: PageData } = $props();
  const { category, recipes } = data;
</script>

<svelte:head>
  <title>{category.name} — Parsnip</title>
</svelte:head>

<div class="max-w-6xl mx-auto px-6 py-12">
  <div class="breadcrumbs text-sm text-base-content/50 mb-8">
    <ul>
      <li><a href="/" class="hover:text-primary">Home</a></li>
      <li><a href="/categories" class="hover:text-primary">Categories</a></li>
      <li class="text-base-content/70">{category.name}</li>
    </ul>
  </div>

  <div class="flex items-center gap-4 mb-10">
    <span class="text-5xl">{category.emoji}</span>
    <div>
      <h1 class="font-display text-4xl font-bold text-base-content">{category.name}</h1>
      <p class="text-base-content/60">{recipes.length} recipes</p>
    </div>
  </div>

  {#if recipes.length > 0}
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each recipes as recipe}
        <RecipeCard {recipe} />
      {/each}
    </div>
  {:else}
    <div class="text-center py-20">
      <div class="text-5xl mb-4">{category.emoji}</div>
      <h3 class="font-display text-xl text-base-content/60 mb-2">Recipes coming soon</h3>
      <p class="text-base-content/50 mb-6">We are working on filling this category</p>
      <a href="/recipes" class="btn btn-primary rounded-full">View All Recipes</a>
    </div>
  {/if}
</div>
