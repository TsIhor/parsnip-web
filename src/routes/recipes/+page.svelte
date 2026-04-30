<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import RecipeCard from '$lib/components/RecipeCard.svelte';
  import { recipeStore } from '$lib/recipes.store';
  import type { RecipeStoreState } from '$lib/recipes.store';

  const storeState = recipeStore.state;

  let searchInput = $state('');
  let debounceTimer: ReturnType<typeof setTimeout>;

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

  const tagsByType = $derived.by(() => {
    const map = new Map<number, { typeName: string; tags: typeof $storeState.recipe_tags }>();
    for (const tag of $storeState.recipe_tags) {
      if (!map.has(tag.type.id)) {
        map.set(tag.type.id, { typeName: tag.type.name, tags: [] });
      }
      map.get(tag.type.id)!.tags.push(tag);
    }
    return [...map.values()];
  });

  const hasActiveFilters = $derived(
    $storeState.selected_tag_ids.length > 0 || searchInput.length > 0
  );
</script>

<svelte:head>
  <title>Recipes — Parsnip</title>
</svelte:head>

<div class="max-w-6xl mx-auto px-6 py-6">
  

  <div class="flex flex-col lg:flex-row gap-8">
    <!-- Sidebar filters -->
    <aside class="w-full lg:w-64 shrink-0 lg:sticky lg:top-20 lg:self-start">
      <div class="mb-5">
        <h1 class="font-display text-4xl font-bold text-base-content mb-2">All Recipes</h1>
        <p class="text-base-content/60 text-[14px]">Find the perfect dish for any occasion</p>
      </div>
      <!-- Search -->
      <label class="input input-bordered input-sm flex items-center gap-2 mb-6">
        <svg class="w-4 h-4 text-base-content/40 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0118 0z"/>
        </svg>
        <input
          type="text"
          placeholder="Search..."
          bind:value={searchInput}
          oninput={onSearch}
          class="grow"
        />
        {#if searchInput}
          <button onclick={resetFilters} class="text-base-content/30 hover:text-base-content/60">✕</button>
        {/if}
      </label>

      <!-- Filters by type -->
      {#if tagsByType.length > 0}
        <div class="space-y-5">
          {#each tagsByType as group}
            <div>
              <p class="text-xs font-semibold text-base-content/40 uppercase tracking-wider mb-2">
                {group.typeName}
              </p>
              <div class="flex flex-wrap gap-1.5">
                {#each group.tags as tag}
                  <button
                    onclick={() => toggleTag(tag.id)}
                    class="btn btn-xs rounded-full {$storeState.selected_tag_ids.includes(tag.id) ? 'btn-primary' : 'btn-ghost border border-base-300'}"
                  >{tag.name}</button>
                {/each}
              </div>
            </div>
          {/each}
        </div>

        {#if hasActiveFilters}
          <button onclick={resetFilters} class="btn btn-ghost btn-xs mt-5 text-base-content/50 w-full">
            ✕ Reset filters
          </button>
        {/if}
      {/if}
    </aside>

    <!-- Recipes -->
    <div class="flex-1 min-w-0">
      {#if $storeState.isLoadingRecipes}
        <div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
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
        <p class="text-base-content/60 text-sm mb-3">
          Found: <span class="font-medium text-base-content">{$storeState.recipes.length}</span> recipes
        </p>
        <div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {#each $storeState.recipes as recipe, i (recipe.id)}
            <div
              in:fly={{ y: 20, duration: 250, delay: (i % 12) * 30 }}
              out:fade={{ duration: 150 }}
            >
              <RecipeCard {recipe} />
            </div>
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

  </div>
</div>
