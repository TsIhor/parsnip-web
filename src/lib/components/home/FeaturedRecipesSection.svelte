<script lang="ts">
  import { onMount } from 'svelte';
  import RecipeCard from '$lib/components/RecipeCard.svelte';
  import { recipeStore } from '$lib/recipes.store';

  const storeState = recipeStore.state;

  onMount(() => {
    if ($storeState.recipes.length === 0) {
      recipeStore.fetchRecipes();
    }
  });

  const featured = $derived($storeState.recipes.slice(0, 3));
</script>

{#if featured.length}
<section class="max-w-6xl mx-auto px-6 py-20">
  <div class="flex items-end justify-between mb-10">
    <div>
      <h2 class="font-display text-4xl font-bold text-base-content mb-2">Featured recipes</h2>
      <p class="text-base-content/60">Handpicked dishes to inspire your next cook</p>
    </div>
    <a href="/recipes" class="text-primary text-sm font-medium hover:underline hidden md:block">
      All recipes →
    </a>
  </div>

  <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each featured as recipe}
      <RecipeCard {recipe} />
    {/each}
  </div>

  <div class="text-center mt-8 md:hidden">
    <a href="/recipes" class="btn-outline">All recipes</a>
  </div>
</section>
{/if}
