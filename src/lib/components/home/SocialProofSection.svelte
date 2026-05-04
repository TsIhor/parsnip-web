<script lang="ts">
  import { onMount } from 'svelte';
  import { recipeStore } from '$lib/recipes.store';

  const storeState = recipeStore.state;

  onMount(() => {
    if ($storeState.recipes.length === 0) recipeStore.fetchRecipes();
    if ($storeState.recipe_tags.length === 0) recipeStore.fetchTags();
  });

  const recipeCount = $derived(
    $storeState.isLoadingRecipes ? '...' : `${$storeState.recipes.length}+`
  );

  const categoryCount = $derived(
    $storeState.recipe_tags.length === 0
      ? '...'
      : `${$storeState.recipe_tags.filter(t => t.type?.id === 3).length}+`
  );
</script>

<section class="bg-primary text-primary-content py-10">
  <div class="max-w-6xl mx-auto px-6">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
      <div>
        <div class="font-display text-4xl font-bold">70K+</div>
        <div class="text-primary-content/70 text-sm mt-1">Active learners</div>
      </div>
      <div>
        <div class="font-display text-4xl font-bold">4.8★</div>
        <div class="text-primary-content/70 text-sm mt-1">App Store rating</div>
      </div>
      <div>
        <div class="font-display text-4xl font-bold">{recipeCount}</div>
        <div class="text-primary-content/70 text-sm mt-1">Recipes & lessons</div>
      </div>
      <div>
        <div class="font-display text-4xl font-bold">{categoryCount}</div>
        <div class="text-primary-content/70 text-sm mt-1">Skill categories</div>
      </div>
    </div>
  </div>
</section>
