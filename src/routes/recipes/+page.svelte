<script lang="ts">
  import { onMount } from 'svelte';
  import RecipeCard from '$lib/components/RecipeCard.svelte';
  import { recipeStore } from '$lib/recipes.store';
  import type { RecipeStoreState } from '$lib/recipes.store';

  const storeState = recipeStore.state;

  let searchInput = $state('');
  let debounceTimer: ReturnType<typeof setTimeout>;

  onMount(() => {
    recipeStore.fetchTags();
    recipeStore.fetchRecipes();
  });

  function onSearch() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      recipeStore.state.update((s: RecipeStoreState) => ({ ...s, keyword: searchInput }));
      recipeStore.fetchRecipes();
    }, 350);
  }

  function toggleTag(id: number) {
    recipeStore.state.update((s: RecipeStoreState) => ({
      ...s,
      selected_tag_ids: s.selected_tag_ids.includes(id)
        ? s.selected_tag_ids.filter((t: number) => t !== id)
        : [...s.selected_tag_ids, id]
    }));
    recipeStore.fetchRecipes();
  }

  function resetFilters() {
    searchInput = '';
    recipeStore.state.update((s: RecipeStoreState) => ({ ...s, keyword: '', selected_tag_ids: [] }));
    recipeStore.fetchRecipes();
  }
</script>

<svelte:head>
  <title>Recipes — Parsnip</title>
</svelte:head>

<div class="max-w-6xl mx-auto px-6 py-12">
  <div class="mb-10">
    <h1 class="font-display text-4xl font-bold text-base-content mb-2">All Recipes</h1>
    <p class="text-base-content/60">Find the perfect dish for any occasion</p>
  </div>

  <!-- Search -->
  <label class="input input-bordered flex items-center gap-2 mb-6">
    <svg class="w-4 h-4 text-base-content/40 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0118 0z"/>
    </svg>
    <input
      type="text"
      placeholder="Search recipes..."
      bind:value={searchInput}
      oninput={onSearch}
      class="grow"
    />
    {#if searchInput}
      <button onclick={resetFilters} class="text-base-content/30 hover:text-base-content/60">✕</button>
    {/if}
  </label>

  <!-- Tag filters -->
  {#if $storeState.recipe_tags.length > 0}
    <div class="flex flex-wrap gap-2 mb-8">
      <button
        onclick={resetFilters}
        class="btn btn-sm rounded-full {$storeState.selected_tag_ids.length === 0 && !searchInput ? 'btn-primary' : 'btn-ghost border border-base-300'}"
      >All</button>
      {#each $storeState.recipe_tags as tag}
        <button
          onclick={() => toggleTag(tag.id)}
          class="btn btn-sm rounded-full {$storeState.selected_tag_ids.includes(tag.id) ? 'btn-primary' : 'btn-ghost border border-base-300'}"
        >{tag.name}</button>
      {/each}
    </div>
  {/if}

  {#if $storeState.isLoadingRecipes}
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each Array(6) as _}
        <div class="card bg-base-200 animate-pulse">
          <div class="aspect-[4/3] bg-base-300 rounded-t-2xl"></div>
          <div class="card-body p-4 gap-3">
            <div class="h-3 bg-base-300 rounded w-1/3"></div>
            <div class="h-5 bg-base-300 rounded w-2/3"></div>
            <div class="h-3 bg-base-300 rounded w-full"></div>
          </div>
        </div>
      {/each}
    </div>
  {:else if $storeState.error}
    <div class="text-center py-20">
      <div class="text-5xl mb-4">⚠️</div>
      <p class="text-base-content/60">{$storeState.error}</p>
    </div>
  {:else if $storeState.recipes.length > 0}
    <p class="text-base-content/60 text-sm mb-6">
      Found: <span class="font-medium text-base-content">{$storeState.recipes.length}</span> recipes
    </p>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each $storeState.recipes as recipe (recipe.id)}
        <RecipeCard {recipe} />
      {/each}
    </div>
  {:else}
    <div class="text-center py-20">
      <div class="text-5xl mb-4">🔍</div>
      <h3 class="font-display text-xl text-base-content/60 mb-2">Nothing found</h3>
      <p class="text-base-content/50">Try changing the search query or filters</p>
      <button onclick={resetFilters} class="btn btn-ghost btn-sm mt-4">Reset filters</button>
    </div>
  {/if}
</div>
