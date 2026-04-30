<script lang="ts">
  import { onMount } from 'svelte';
import { recipeStore } from '$lib/recipes.store';

  let { data }: { data: { id: number } } = $props();

  const storeState = recipeStore.state;

  let completedSteps = $state(new Set<number>());
  let videoStarted = $state(false);
  let barBottom = $state(0);

  onMount(() => {
    recipeStore.fetchRecipe(data.id);

    const footer = document.querySelector('footer');
    if (!footer) return;

    function updateBarBottom() {
      const footerTop = footer!.getBoundingClientRect().top;
      barBottom = Math.max(0, window.innerHeight - footerTop);
    }

    window.addEventListener('scroll', updateBarBottom, { passive: true });
    window.addEventListener('resize', updateBarBottom, { passive: true });
    updateBarBottom();

    return () => {
      window.removeEventListener('scroll', updateBarBottom);
      window.removeEventListener('resize', updateBarBottom);
    };
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

    const videoUrl = r.recipe_video?.media_url ?? r.recipe_video?.stream_url ?? null;

    return {
      '@context': 'https://schema.org/',
      '@type': 'Recipe',
      name: r.title,
      description: r.description,
      ...(imageUrl ? { image: [imageUrl] } : {}),
      ...(videoUrl ? {
        video: {
          '@type': 'VideoObject',
          name: r.title,
          description: r.description,
          contentUrl: videoUrl,
          ...(imageUrl ? { thumbnailUrl: imageUrl } : {}),
          ...(r.published_at ? { uploadDate: r.published_at.slice(0, 10) } : {}),
        }
      } : {}),
      author: { '@type': 'Organization', name: 'Parsnip' },
      ...(r.time ? { totalTime: `PT${r.time}M` } : {}),
      ...(r.servings ? { recipeYield: `${r.servings} servings` } : {}),
      keywords: r.tags?.map(t => t.name).join(', '),
      recipeIngredient: r.ingredients?.map(i =>
        `${i.name} ${i.quantity_fmt}`.trim()
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

  <article class="max-w-4xl mx-auto px-6 py-12 pb-24">
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
    <div class="stats stats-horizontal shadow border border-base-300 mb-8 w-full">
      {#if recipe.time}
        <div class="stat py-1">
          <div class="stat-figure text-lg">⏱</div>
          <div class="stat-title text-xs">Time</div>
          <div class="stat-value text-base">{recipe.time}</div>
        </div>
      {/if}
      {#if recipe.servings}
        <div class="stat py-1">
          <div class="stat-figure text-lg">👥</div>
          <div class="stat-title text-xs">Servings</div>
          <div class="stat-value text-base">{recipe.servings}</div>
        </div>
      {/if}
      {#if recipe.difficulty}
        <div class="stat py-2">
          <div class="stat-figure text-lg">📊</div>
          <div class="stat-title text-xs">Difficulty</div>
          <div class="stat-value text-base">
            <span class="badge {diffVariant[recipe.difficulty] ?? 'badge-ghost'} badge-md">
              {recipe.difficulty}
            </span>
          </div>
        </div>
      {/if}
    </div>

    <!-- Hero media: video preferred over image -->
    {#if recipe.recipe_video?.media_url || recipe.recipe_video?.stream_url}
      {@const posterUrl = recipe.recipe_header_image?.media_url ?? recipe.recipe_header_image?.firebase_media_url ?? null}
      {@const videoUrl = recipe.recipe_video.media_url ?? recipe.recipe_video.stream_url}
      <div class="aspect-video rounded-3xl overflow-hidden mb-12 shadow-md bg-black">
        <video
          src={videoUrl ?? undefined}
          controls
          playsinline
          poster={posterUrl ?? undefined}
          class="w-full h-full {videoStarted ? 'object-contain' : 'object-cover'}"
          onplay={() => { videoStarted = true; }}
        >
          <track kind="captions" />
        </video>
      </div>
    {:else if recipe.recipe_header_image?.media_url || recipe.recipe_header_image?.firebase_media_url}
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

  <!-- Skills CTA — sticky bottom bar -->
  <div class="fixed left-0 right-0 z-40 bg-base-100/90 backdrop-blur-md border-t border-base-300 shadow-lg transition-[bottom] duration-150 ease-out" style="bottom: {barBottom}px">
    <div class="max-w-4xl mx-auto px-6 py-3">
      <!-- mobile: stack vertically; sm+: single row -->
      <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <!-- text -->
        <div class="text-center sm:text-left">
          <p class="font-semibold text-base-content text-sm leading-tight">Find a step tricky?</p>
          <p class="text-xs text-base-content/50">Build real cooking skills with Parsnip</p>
        </div>
        <!-- skills + buttons -->
        <div class="flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
          <!-- all 5 skill icons -->
          <div class="flex gap-1.5">
            {#each [
              { icon: '/skills/shopping.png',    name: 'Shopping'    },
              { icon: '/skills/prepping.png',    name: 'Prepping'    },
              { icon: '/skills/making.png',      name: 'Making'      },
              { icon: '/skills/ingredients.png', name: 'Ingredients' },
              { icon: '/skills/techniques.png',  name: 'Techniques'  },
            ] as skill}
              <div class="w-8 h-8 rounded-xl bg-base-200 flex items-center justify-center">
                <img src={skill.icon} alt={skill.name} class="w-5 h-5 object-contain" />
              </div>
            {/each}
          </div>
          <!-- store buttons -->
          <div class="flex gap-2 shrink-0">
            <a href="/download/ios"
              class="flex items-center gap-1.5 bg-base-content text-base-100 px-3 py-2 rounded-xl hover:opacity-90 transition-opacity text-xs font-medium">
              <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.18 1.27-2.16 3.8.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.37 2.78M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              App Store
            </a>
            <a href="/download/android"
              class="flex items-center gap-1.5 bg-base-content text-base-100 px-3 py-2 rounded-xl hover:opacity-90 transition-opacity text-xs font-medium">
              <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 20.5v-17c0-.83 1-.99 1.44-.49l15.08 8.5c.46.26.46.93 0 1.19L4.44 21c-.44.5-1.44.34-1.44-.5zM5 7.42v9.16L16.01 12 5 7.42z"/>
              </svg>
              Google Play
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
