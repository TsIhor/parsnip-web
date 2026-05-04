<script lang="ts">
  const skills = [
    { icon: '/skills/shopping.png',    name: 'Shopping',    current: 3, max: 30 },
    { icon: '/skills/prepping.png',    name: 'Prepping',    current: 4, max: 30 },
    { icon: '/skills/making.png',      name: 'Making',      current: 2, max: 12 },
    { icon: '/skills/ingredients.png', name: 'Ingredients', current: 1, max: 12 },
    { icon: '/skills/techniques.png',  name: 'Techniques',  current: 3, max: 12 },
  ];
</script>

<section class="bg-base-200 py-20">
  <div class="max-w-6xl mx-auto px-6">
    <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
      <div>
        <h2 class="font-display text-4xl font-bold text-base-content mb-3">Build real skills</h2>
        <p class="text-base-content/60 max-w-md">Every lesson targets a specific culinary skill. Track your progress, earn XP, and watch your level rise.</p>
      </div>
      <a href="/download/ios" class="btn-primary self-start md:self-auto whitespace-nowrap">
        Start learning free
      </a>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {#each skills as skill}
        {@const pct = Math.round((skill.current / skill.max) * 100)}
        <div class="bg-base-100 rounded-2xl p-5 shadow-sm flex flex-col items-center text-center">
          <div class="font-semibold text-base-content text-sm mb-4">{skill.name}</div>

          <div class="relative mb-4" style="width:5rem;height:5rem;">
            <svg class="absolute inset-0 w-full h-full" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="38" class="stroke-base-300" stroke-width="4"/>
            </svg>
            <div
              class="radial-progress text-primary"
              style="--value:{pct}; --size:5rem; --thickness:4px;"
              role="progressbar"
              aria-valuenow={pct}
            >
              <img src={skill.icon} alt={skill.name} class="w-9 h-9 object-contain" />
            </div>
          </div>

          <div class="text-accent font-semibold text-sm">{skill.current}/{skill.max}</div>
        </div>
      {/each}
    </div>
  </div>
</section>
