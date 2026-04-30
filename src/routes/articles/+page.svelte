<script lang="ts">
  import { articles, articleCategories, type ArticleCategory } from '$lib/articles.js';

  let activeCategory = $state<ArticleCategory | 'all'>('all');

  const filtered = $derived(
    activeCategory === 'all' ? articles : articles.filter(a => a.category === activeCategory)
  );
</script>

<svelte:head>
  <title>Articles — Parsnip</title>
  <meta name="description" content="Practical cooking knowledge: how to choose ingredients, master techniques, and build real kitchen skills." />
</svelte:head>

<!-- Header -->
<section class="bg-base-200 py-16">
  <div class="max-w-6xl mx-auto px-6 text-center">
    <h1 class="font-display text-5xl font-bold text-base-content mb-4">Cooking Knowledge</h1>
    <p class="text-base-content/60 text-lg max-w-xl mx-auto">
      Practical guides on picking ingredients, mastering techniques, and building real kitchen skills.
    </p>
  </div>
</section>

<!-- Filter tabs -->
<section class="border-b border-base-300 bg-base-100 sticky top-16 z-40">
  <div class="max-w-6xl mx-auto px-6">
    <div class="flex gap-1 py-3 overflow-x-auto">
      <button
        onclick={() => activeCategory = 'all'}
        class="btn btn-sm rounded-full whitespace-nowrap {activeCategory === 'all' ? 'btn-primary' : 'btn-ghost'}"
      >All articles</button>
      {#each articleCategories as cat}
        <button
          onclick={() => activeCategory = cat.id}
          class="btn btn-sm rounded-full whitespace-nowrap {activeCategory === cat.id ? 'btn-primary' : 'btn-ghost'}"
        >{cat.emoji} {cat.name}</button>
      {/each}
    </div>
  </div>
</section>

<!-- Articles grid -->
<section class="max-w-6xl mx-auto px-6 py-12">
  {#key activeCategory}
  <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each filtered as article, i}
      {@const cat = articleCategories.find(c => c.id === article.category)}
      <a href="/articles/{article.slug}"
        style="opacity:0; animation: fadeUp 0.4s ease {i * 50}ms forwards"
        class="card bg-base-200 hover:shadow-md transition-shadow duration-300 hover:-translate-y-1 group overflow-hidden">
        <figure class="aspect-[16/9] overflow-hidden bg-base-300">
          {#if article.image}
            <img
              src={article.image}
              alt={article.title}
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          {:else}
            <div class="w-full h-full flex items-center justify-center text-5xl">
              {cat?.emoji}
            </div>
          {/if}
        </figure>
        <div class="card-body p-5">
          <div class="flex items-center gap-2 mb-1">
            <span class="badge badge-ghost text-xs">{cat?.emoji} {cat?.name}</span>
            <span class="text-xs text-base-content/40 ml-auto">{article.readTime} min read</span>
          </div>
          <h2 class="card-title font-display text-lg leading-snug group-hover:text-primary transition-colors">
            {article.title}
          </h2>
          <p class="text-base-content/60 text-sm leading-relaxed flex-1">
            {article.excerpt}
          </p>
          <span class="link link-primary text-sm no-underline group-hover:underline mt-2">Read →</span>
        </div>
      </a>
    {/each}
  </div>
  {/key}
</section>
