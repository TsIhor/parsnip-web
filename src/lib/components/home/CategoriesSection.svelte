<script lang="ts">
  import { onMount } from 'svelte';
  import { recipeStore } from '$lib/recipes.store';

  const storeState = recipeStore.state;

  onMount(() => {
    if ($storeState.recipe_tags.length === 0) {
      recipeStore.fetchTags();
    }
  });

  const categories = $derived(
    $storeState.recipe_tags.filter(t => t.type?.id === 3)
  );
</script>

<section class="bg-base-200 py-20">
  <div class="max-w-6xl mx-auto px-6">
    <div class="flex items-end justify-between mb-10">
      <div>
        <h2 class="font-display text-4xl font-bold text-base-content mb-2">Browse by category</h2>
        <p class="text-base-content/60">Find the kind of dish you're in the mood for</p>
      </div>
      <a href="/categories" class="text-primary text-sm font-medium hover:underline hidden md:block">
        All categories →
      </a>
    </div>

    {#if categories.length > 0}
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {#each categories as cat}
          <a
            href="/recipes"
            onclick={() => recipeStore.state.update(s => ({ ...s, selected_tag_ids: [cat.id] }))}
            class="bg-base-100 rounded-2xl p-4 text-center hover:bg-primary hover:text-primary-content transition-all duration-200 group shadow-sm hover:shadow-md"
          >
            <div class="font-semibold text-sm text-base-content group-hover:text-primary-content">{cat.name}</div>
          </a>
        {/each}
      </div>
    {/if}
  </div>
</section>
