<svelte:head>
  <title>About — Parsnip</title>
</svelte:head>

<div class="max-w-3xl mx-auto px-6 py-16">
  <div class="text-center mb-16">
    <div class="text-6xl mb-6">🌿</div>
    <h1 class="font-display text-5xl font-bold text-base-content mb-4">About Parsnip</h1>
    <p class="text-base-content/60 text-lg leading-relaxed">
      A skill-based cooking platform that teaches you to cook — not just follow recipes
    </p>
  </div>

  <div class="card bg-base-200 border border-base-300 shadow-sm mb-8">
    <div class="card-body">
      <h2 class="card-title font-display text-2xl">Our Mission</h2>
      <p class="text-base-content/70 leading-relaxed">
        <strong class="text-primary">Parsnip</strong> teaches you real cooking skills through structured,
        progressive lessons. Instead of just following recipes, you build techniques — knife work,
        heat control, flavour balance — that gradually unlock more complex dishes.
      </p>
    </div>
  </div>

  <div class="grid sm:grid-cols-3 gap-4 mb-8">
    {#each [
      ['🎯', 'Skill-first', 'Learn techniques, not just recipes'],
      ['📈', 'Progressive', 'Lessons that build on each other'],
      ['🏆', 'Gamified', 'Earn XP and level up your skills'],
    ] as [emoji, title, desc]}
      <div class="card bg-base-200 text-center">
        <div class="card-body items-center p-5">
          <div class="text-3xl mb-2">{emoji}</div>
          <div class="font-medium text-base-content mb-1">{title}</div>
          <div class="text-sm text-base-content/60">{desc}</div>
        </div>
      </div>
    {/each}
  </div>

  <div class="card bg-primary text-primary-content text-center">
    <div class="card-body">
      <h2 class="card-title font-display text-2xl justify-center">Ready to start cooking?</h2>
      <p class="text-primary-content/80 mb-2">Download Parsnip and begin your first lesson today</p>
      <div class="card-actions justify-center mt-2">
        <a href="/recipes" class="btn bg-base-100 text-primary hover:bg-base-200 border-0 rounded-full">
          Browse Recipes
        </a>
      </div>
    </div>
  </div>
</div>
