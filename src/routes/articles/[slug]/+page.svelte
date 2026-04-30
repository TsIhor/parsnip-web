<script lang="ts">
  import { articleCategories, type Article } from '$lib/articles.js';

  interface PageData { article: Article; related: Article[] }
  let { data }: { data: PageData } = $props();

  const article = $derived(data.article);
  const related = $derived(data.related);
  const cat = $derived(articleCategories.find(c => c.id === data.article.category));
</script>

<svelte:head>
  <title>{article.title} — Parsnip</title>
  <meta name="description" content={article.excerpt} />
</svelte:head>

<!-- Header -->
<section class="bg-base-200 py-14">
  <div class="max-w-3xl mx-auto px-6">
    <div class="breadcrumbs text-sm text-base-content/50 mb-6">
      <ul>
        <li><a href="/" class="hover:text-primary">Home</a></li>
        <li><a href="/articles" class="hover:text-primary">Articles</a></li>
        <li class="text-base-content/70 max-w-[180px] truncate">{article.title}</li>
      </ul>
    </div>

    <div class="flex items-center gap-2 mb-4">
      <span class="text-xl">{cat?.emoji}</span>
      <span class="badge badge-primary">{cat?.name}</span>
    </div>

    <h1 class="font-display text-4xl md:text-5xl font-bold text-base-content leading-tight mb-4">
      {article.title}
    </h1>
    <p class="text-base-content/60 text-lg leading-relaxed mb-4">{article.excerpt}</p>
    <span class="badge badge-ghost">{article.readTime} min read</span>
  </div>
</section>

{#if article.image}
  <div class="max-w-3xl mx-auto px-6 -mb-6 relative z-10" style="margin-top: -2rem;">
    <div class="aspect-[16/7] rounded-2xl overflow-hidden shadow-lg">
      <img src={article.image} alt={article.title} class="w-full h-full object-cover" />
    </div>
  </div>
{/if}

<!-- Body -->
<section class="max-w-3xl mx-auto px-6 py-12">
  {#each article.body as section}
    {#if section.heading}
      <h2 class="font-display text-2xl font-bold text-base-content mt-10 mb-3">{section.heading}</h2>
    {/if}
    <p class="text-base-content/70 leading-relaxed mb-4">{section.text}</p>
  {/each}
</section>

<!-- Related articles -->
{#if related.length}
  <section class="border-t border-base-300 bg-base-200 py-14">
    <div class="max-w-6xl mx-auto px-6">
      <h2 class="font-display text-2xl font-bold text-base-content mb-8">More on {cat?.name}</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each related as rel}
          {@const relCat = articleCategories.find(c => c.id === rel.category)}
          <a href="/articles/{rel.slug}" class="card card-compact bg-base-100 hover:shadow-md transition-all duration-200 group">
            <div class="card-body">
              <div class="flex items-center gap-2 mb-1">
                <span>{relCat?.emoji}</span>
                <span class="badge badge-ghost text-xs">{rel.readTime} min</span>
              </div>
              <h3 class="card-title font-display text-lg leading-snug group-hover:text-primary transition-colors">
                {rel.title}
              </h3>
              <p class="text-sm text-base-content/50 line-clamp-2">{rel.excerpt}</p>
            </div>
          </a>
        {/each}
      </div>
    </div>
  </section>
{/if}
