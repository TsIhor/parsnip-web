<script lang="ts">
  import { onMount } from 'svelte';
  import { recipeStore } from '$lib/recipes.store';
  import { goto } from '$app/navigation';

  const storeState = recipeStore.state;

  onMount(() => {
    if ($storeState.recipe_tags.length === 0) recipeStore.fetchTags();
    if ($storeState.recipes.length === 0) recipeStore.fetchRecipes();
  });

  const categories = $derived(
    $storeState.recipe_tags.filter(t => t.type?.id === 3)
  );

  const countByTag = $derived(
    $storeState.recipes.reduce<Record<number, number>>((acc, recipe) => {
      for (const tag of recipe.tags ?? []) {
        acc[tag.id] = (acc[tag.id] ?? 0) + 1;
      }
      return acc;
    }, {})
  );

  function goToRecipes(tagId: number) {
    recipeStore.state.update(s => ({ ...s, selected_tag_ids: [tagId] }));
    goto('/recipes');
  }
</script>

<svelte:head>
  <title>Categories — Parsnip</title>
</svelte:head>

<div class="max-w-6xl mx-auto px-6 py-12">
  <div class="mb-10">
    <h1 class="font-display text-4xl font-bold text-base-content mb-2">Categories</h1>
    <p class="text-base-content/60">Choose a dish type and find the perfect recipe</p>
  </div>

  {#if $storeState.recipe_tags.length === 0}
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each Array(6) as _}
        <div class="bg-base-200 rounded-3xl overflow-hidden animate-pulse">
          <div class="aspect-video bg-base-300"></div>
          <div class="p-5 flex items-center gap-3">
            <div class="w-8 h-8 bg-base-300 rounded-full"></div>
            <div class="h-5 bg-base-300 rounded w-1/2"></div>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each categories as cat}
        <button
          onclick={() => goToRecipes(cat.id)}
          class="group bg-base-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 text-left"
        >
          <div class="aspect-video bg-base-300 flex items-center justify-center text-6xl">
            🍽️
          </div>
          <div class="p-5 flex items-center justify-between">
            <div>
              <h3 class="font-display text-lg font-semibold text-base-content">{cat.name}</h3>
              {#if countByTag[cat.id]}
                <p class="text-sm text-base-content/50">{countByTag[cat.id]} recipes</p>
              {/if}
            </div>
            <svg class="w-5 h-5 text-base-content/30 group-hover:text-primary group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </div>
        </button>
      {/each}
    </div>
  {/if}
</div>
