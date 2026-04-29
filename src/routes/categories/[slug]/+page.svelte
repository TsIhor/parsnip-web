<script lang="ts">
  import { onMount } from 'svelte';
  import RecipeCard from '$lib/components/RecipeCard.svelte';
  import { recipeStore } from '$lib/recipes.store';

  let { data }: { data: { slug: string } } = $props();

  const storeState = recipeStore.state;

  onMount(() => {
    if ($storeState.recipe_tags.length === 0) recipeStore.fetchTags();
    if ($storeState.recipes.length === 0) recipeStore.fetchRecipes();
  });

  const tag = $derived(
    $storeState.recipe_tags.find(
      t => t.name.toLowerCase() === data.slug.toLowerCase()
    )
  );

  const filtered = $derived(
    tag
      ? $storeState.recipes.filter(r => r.tags?.some(t => t.id === tag.id))
      : []
  );
</script>

<svelte:head>
  <title>{tag ? `${tag.name} — Parsnip` : 'Category — Parsnip'}</title>
</svelte:head>

<div class="max-w-6xl mx-auto px-6 py-12">
  <div class="breadcrumbs text-sm text-base-content/50 mb-8">
    <ul>
      <li><a href="/" class="hover:text-primary">Home</a></li>
      <li><a href="/categories" class="hover:text-primary">Categories</a></li>
      <li class="text-base-content/70">{tag?.name ?? data.slug}</li>
    </ul>
  </div>

  {#if $storeState.isLoadingRecipes}
    <div class="animate-pulse space-y-6">
      <div class="h-10 bg-base-300 rounded w-1/3"></div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each Array(6) as _}
          <div class="card bg-base-200">
            <div class="aspect-[4/3] bg-base-300 rounded-t-2xl"></div>
            <div class="card-body p-4 gap-3">
              <div class="h-4 bg-base-300 rounded w-2/3"></div>
              <div class="h-3 bg-base-300 rounded w-full"></div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {:else if tag}
    <div class="flex items-center gap-4 mb-10">
      <div>
        <h1 class="font-display text-4xl font-bold text-base-content">{tag.name}</h1>
        <p class="text-base-content/60">{filtered.length} recipes</p>
      </div>
    </div>

    {#if filtered.length > 0}
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each filtered as recipe}
          <RecipeCard {recipe} />
        {/each}
      </div>
    {:else}
      <div class="text-center py-20">
        <div class="text-5xl mb-4">🍽️</div>
        <h3 class="font-display text-xl text-base-content/60 mb-2">Recipes coming soon</h3>
        <a href="/recipes" class="btn btn-primary rounded-full mt-4">View All Recipes</a>
      </div>
    {/if}
  {:else}
    <div class="text-center py-20">
      <div class="text-5xl mb-4">🔍</div>
      <h3 class="font-display text-xl text-base-content/60 mb-2">Category not found</h3>
      <a href="/categories" class="btn btn-ghost mt-4">← All categories</a>
    </div>
  {/if}
</div>
