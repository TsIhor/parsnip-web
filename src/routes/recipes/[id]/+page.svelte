<script lang="ts">
  import { onMount } from 'svelte';
import { recipeStore } from '$lib/recipes.store';

  let { data }: { data: { id: number } } = $props();

  const storeState = recipeStore.state;

  let completedSteps = $state(new Set<number>());

  onMount(() => {
    recipeStore.fetchRecipe(data.id);
  });

  $effect(() => {
    if ($storeState.recipe) {
      completedSteps = new Set();
    }
  });

  const diffVariant: Record<string, string> = {
    easy:   'badge-success',
    medium: 'badge-warning',
    hard:   'badge-error',
  };

  function toggleStep(i: number) {
    if (completedSteps.has(i)) completedSteps.delete(i);
    else completedSteps.add(i);
    completedSteps = new Set(completedSteps);
  }

  const jsonLd = $derived.by(() => {
    const r = $storeState.recipe;
    if (!r) return null;

    const imageUrl = r.recipe_header_image?.media_url
      ?? r.recipe_header_image?.firebase_media_url
      ?? null;

    return {
      '@context': 'https://schema.org/',
      '@type': 'Recipe',
      name: r.title,
      description: r.description,
      ...(imageUrl ? { image: [imageUrl] } : {}),
      author: { '@type': 'Organization', name: 'Parsnip' },
      ...(r.time ? { totalTime: `PT${r.time}M` } : {}),
      ...(r.servings ? { recipeYield: `${r.servings} servings` } : {}),
      keywords: r.tags?.map(t => t.name).join(', '),
      recipeIngredient: r.ingredients?.map(i =>
        `${i.quantity_fmt || `${i.quantity} ${i.unit}`.trim()} ${i.name}`.trim()
      ),
      recipeInstructions: r.steps?.map((s, idx) => ({
        '@type': 'HowToStep',
        position: idx + 1,
        text: s.instruction || s.action || '',
      })),
    };
  });
</script>

<svelte:head>
  <title>{$storeState.recipe ? `${$storeState.recipe.title} — Parsnip` : 'Recipe — Parsnip'}</title>
  {#if $storeState.recipe}
    <meta name="description" content={$storeState.recipe.description} />
    {@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
  {/if}
</svelte:head>

{#if $storeState.isLoading}
  <div class="max-w-4xl mx-auto px-6 py-12 animate-pulse space-y-6">
    <div class="h-4 bg-base-300 rounded w-1/3"></div>
    <div class="h-10 bg-base-300 rounded w-2/3"></div>
    <div class="h-4 bg-base-300 rounded w-full"></div>
    <div class="aspect-video bg-base-300 rounded-3xl"></div>
  </div>
{:else if $storeState.error}
  <div class="max-w-4xl mx-auto px-6 py-20 text-center">
    <div class="text-5xl mb-4">⚠️</div>
    <p class="text-base-content/60">{$storeState.error}</p>
    <a href="/recipes" class="btn btn-ghost mt-4">← Back to recipes</a>
  </div>
{:else if $storeState.recipe}
  {@const recipe = $storeState.recipe}

  <article class="max-w-4xl mx-auto px-6 py-12">
    <!-- Breadcrumb -->
    <div class="breadcrumbs text-sm text-base-content/50 mb-8">
      <ul>
        <li><a href="/" class="hover:text-primary">Home</a></li>
        <li><a href="/recipes" class="hover:text-primary">Recipes</a></li>
        <li class="text-base-content/70">{recipe.title}</li>
      </ul>
    </div>

    <!-- Tags -->
    {#if recipe.tags?.length}
      <div class="flex flex-wrap gap-2 mb-4">
        {#each recipe.tags as tag}
          <span class="badge badge-ghost">{tag.name}</span>
        {/each}
      </div>
    {/if}

    <h1 class="font-display text-4xl md:text-5xl font-bold text-base-content leading-tight mb-4">
      {recipe.title}
    </h1>
    <p class="text-base-content/60 text-lg leading-relaxed mb-8">{recipe.description}</p>

    <!-- Meta stats -->
    <div class="stats stats-horizontal shadow border border-base-300 mb-8 flex-wrap">
      {#if recipe.time}
        <div class="stat">
          <div class="stat-figure text-xl">⏱</div>
          <div class="stat-title">Time</div>
          <div class="stat-value text-lg">{recipe.time}</div>
        </div>
      {/if}
      {#if recipe.servings}
        <div class="stat">
          <div class="stat-figure text-xl">👥</div>
          <div class="stat-title">Servings</div>
          <div class="stat-value text-lg">{recipe.servings}</div>
        </div>
      {/if}
      {#if recipe.difficulty}
        <div class="stat">
          <div class="stat-figure text-xl">📊</div>
          <div class="stat-title">Difficulty</div>
          <div class="stat-value text-lg">
            <span class="badge {diffVariant[recipe.difficulty] ?? 'badge-ghost'} badge-lg">
              {recipe.difficulty}
            </span>
          </div>
        </div>
      {/if}
    </div>

    <!-- Hero image -->
    {#if recipe.recipe_header_image?.media_url || recipe.recipe_header_image?.firebase_media_url}
      <div class="aspect-video rounded-3xl overflow-hidden mb-12 shadow-md">
        <img
          src={recipe.recipe_header_image.media_url ?? recipe.recipe_header_image.firebase_media_url}
          alt={recipe.title}
          class="w-full h-full object-cover"
        />
      </div>
    {/if}

    <div class="grid md:grid-cols-3 gap-12">
      <!-- Ingredients -->
      <div>
        <h2 class="font-display text-2xl font-bold text-base-content mb-4">Ingredients</h2>
        <ul class="space-y-3">
          {#each recipe.ingredients ?? [] as ing}
            <li class="flex items-center gap-3 py-2 border-b border-base-200 last:border-0">
              <span class="w-2 h-2 rounded-full bg-primary/70 flex-shrink-0"></span>
              <span class="text-base-content/90 text-sm first-letter:uppercase">{ing.name}</span>
              <span class="text-primary font-medium text-sm min-w-[70px]">
                {ing.quantity_fmt}
              </span>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Steps -->
      <div class="md:col-span-2">
        <h2 class="font-display text-2xl font-bold text-base-content mb-6">Instructions</h2>
        <div class="space-y-4">
          {#each recipe.steps ?? [] as step, i}
            <button
              class="flex gap-4 p-4 rounded-2xl w-full text-left cursor-pointer transition-all duration-200
                {completedSteps.has(i) ? 'bg-primary/10 opacity-60' : 'bg-base-200 border border-base-300 hover:border-primary/40'}"
              onclick={() => toggleStep(i)}
            >
              <div class="badge badge-lg shrink-0 {completedSteps.has(i) ? 'badge-primary' : 'badge-ghost border-primary/30 text-primary'}">
                {completedSteps.has(i) ? '✓' : i + 1}
              </div>
              <p class="text-base-content/90 leading-relaxed pt-0.5 text-sm">
                {step.instruction || step.action || ''}
              </p>
            </button>
          {/each}
        </div>
        <p class="text-xs text-base-content/40 mt-4">Click on a step to mark it as done</p>
      </div>
    </div>
  </article>
{/if}
