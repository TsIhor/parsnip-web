<script lang="ts">
  import '../app.css';
  import Nav from '$lib/components/Nav.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { onMount } from 'svelte';
  import { recipeStore } from '$lib/recipes.store';
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();

  onMount(() => {
    recipeStore.fetchTags();
  });
</script>

<Nav />
<main>
  {@render children()}
</main>
<Footer />
