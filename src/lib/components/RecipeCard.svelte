<script lang="ts">
  import type { Recipe } from '$lib/recipes.store';

  let { recipe }: { recipe: Recipe } = $props();

  const imageUrl = $derived(
    recipe.recipe_header_image?.media_url
    ?? recipe.recipe_header_image?.firebase_media_url
    ?? null
  );

</script>

<a href="/recipes/{recipe.id}"
  class="card bg-base-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group overflow-hidden">
  <figure class="aspect-[4/3] overflow-hidden bg-base-300 relative">
    {#if imageUrl}
      <img
        src={imageUrl}
        alt={recipe.title}
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    {:else}
      <div class="w-full h-full flex items-center justify-center text-5xl">🍽️</div>
    {/if}
    {#if recipe.recipe_video?.media_url || recipe.recipe_video?.stream_url}
      <div class="absolute bottom-2 right-2 bg-black/60 rounded-full p-1.5 backdrop-blur-sm">
        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z"/>
        </svg>
      </div>
    {/if}
  </figure>
  <div class="card-body p-4 gap-2">
    <div class="flex flex-wrap gap-1">
      {#each recipe.tags ?? [] as tag}
        <span class="badge text-xs">{tag.name}</span>
      {/each}
    </div>
    <h3 class="card-title font-display text-lg leading-snug">{recipe.title}</h3>
    <p class="text-sm text-base-content/60 line-clamp-2">{recipe.description}</p>
    <div class="flex items-center gap-3 text-sm text-base-content/40 mt-1">
      {#if recipe.time}
        <span class="flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          {recipe.time} min
        </span>
      {/if}
      {#if recipe.servings}
        <span class="flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0"/>
          </svg>
          {recipe.servings}
        </span>
      {/if}
      {#if recipe.difficulty}
        <span class="badge badge-sm {recipe.difficulty === 'easy' ? 'badge-success' : recipe.difficulty === 'medium' ? 'badge-warning' : 'badge-error'} ml-auto">
          {recipe.difficulty}
        </span>
      {/if}
    </div>
  </div>
</a>
