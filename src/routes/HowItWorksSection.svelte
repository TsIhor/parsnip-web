<script lang="ts">
  const steps = [
    { n: '01', title: 'Pick a dish you want to make',  body: 'Browse our recipe catalog and find something that excites you — from a quick weeknight pasta to a weekend roast.' },
    { n: '02', title: 'Learn the skills it requires',  body: 'Each recipe is broken down into the core techniques involved. You practice each one with guided micro-lessons.' },
    { n: '03', title: 'Cook it — for real',            body: 'Once your skills are up, cook the full dish step by step. Earn XP, unlock harder recipes, and level up.' },
  ];
</script>

<section class="max-w-6xl mx-auto px-6 py-20">
  <div class="text-center mb-14">
    <h2 class="font-display text-4xl font-bold text-base-content mb-3">How Parsnip works</h2>
    <p class="text-base-content/60 max-w-lg mx-auto">Not another recipe app — a cooking education that actually sticks.</p>
  </div>

  <div class="grid md:grid-cols-3 gap-8">
    {#each steps as s}
      <div class="relative bg-base-200 rounded-3xl p-8 overflow-hidden">
        <div class="font-display text-9xl font-bold text-primary/[0.07] absolute -bottom-4 -right-2 leading-none select-none pointer-events-none">{s.n}</div>
        <div class="relative z-10">
          <div class="font-display text-sm font-bold text-primary mb-3 uppercase tracking-widest">Step {s.n}</div>
          <h3 class="font-display text-xl font-bold text-base-content mb-3">{s.title}</h3>
          <p class="text-base-content/60 leading-relaxed text-sm">{s.body}</p>
        </div>
      </div>
    {/each}
  </div>
</section>
