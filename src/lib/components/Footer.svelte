<script lang="ts">
  import { onMount } from 'svelte';
  import { recipeStore } from '$lib/recipes.store';

  const storeState = recipeStore.state;

  onMount(() => {
    if ($storeState.recipe_tags.length === 0) recipeStore.fetchTags();
    if ($storeState.recipes.length === 0) recipeStore.fetchRecipes();
  });

  const popularCategories = $derived.by(() => {
    const countByTag = $storeState.recipes.reduce<Record<number, number>>((acc, recipe) => {
      for (const tag of recipe.tags ?? []) {
        acc[tag.id] = (acc[tag.id] ?? 0) + 1;
      }
      return acc;
    }, {});

    return $storeState.recipe_tags
      .filter(t => t.type?.id === 3)
      .sort((a, b) => (countByTag[b.id] ?? 0) - (countByTag[a.id] ?? 0))
      .slice(0, 4);
  });
</script>

<footer class="bg-base-200 text-base-content">
  <div class="max-w-6xl mx-auto px-6 py-12">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
      <div>
        <div class="flex items-center gap-2 mb-3">
          <img src="/logomark-parsnip.png" alt="Parsnip" class="w-8 h-8" />
          <span class="font-display text-2xl font-bold text-base-content">Parsnip</span>
        </div>
        <p class="text-base-content/60 text-sm leading-relaxed">
          Learn to cook through skill-based lessons. Build real techniques, one dish at a time.
        </p>
      </div>
      <div>
        <h4 class="font-medium text-base-content mb-3">Sections</h4>
        <ul class="space-y-2 text-sm text-base-content/60">
          <li><a href="/recipes" class="hover:text-base-content transition-colors">All Recipes</a></li>
          <li><a href="/categories" class="hover:text-base-content transition-colors">Categories</a></li>
          <li><a href="/about" class="hover:text-base-content transition-colors">About</a></li>
        </ul>
      </div>
      <div>
        <h4 class="font-medium text-base-content mb-3">Popular Categories</h4>
        <ul class="space-y-2 text-sm text-base-content/60">
          {#each popularCategories as cat}
            <li>
              <button
                onclick={() => {
                  recipeStore.state.update(s => ({ ...s, selected_tag_ids: [cat.id] }));
                  window.location.href = '/recipes';
                }}
                class="hover:text-base-content transition-colors text-left"
              >
                {cat.name}
              </button>
            </li>
          {:else}
            <li class="text-base-content/30 text-xs">Loading...</li>
          {/each}
        </ul>
      </div>
    </div>
    <div class="border-t border-base-content/15 pt-6 text-center text-sm text-base-content/40">
      © 2025 Parsnip — made with love for cooking
    </div>
  </div>
</footer>
