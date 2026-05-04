<script lang="ts">
  import { onMount } from 'svelte';

  const onboardingScreens = [
    { src: '/onboarding/screen_1.png', label: 'Welcome to\nParsnip',            connector: 1    },
    { src: '/onboarding/screen_2.png', label: 'Pick your\nskill level',          connector: 2    },
    { src: '/onboarding/screen_3.png', label: 'Choose dishes\nyou want to cook', connector: 3    },
    { src: '/onboarding/screen_4.png', label: 'See your\nskill path',            connector: 4    },
    { src: '/onboarding/screen_5.png', label: 'Start your\njourney 🎉',          connector: null },
  ];

  onMount(() => {
    const el = document.getElementById('onboarding-flow');
    if (!el) return;
    let isDown = false, startX = 0, scrollLeft = 0;
    const onDown  = (e: MouseEvent) => { isDown = true; startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft; };
    const onUp    = () => { isDown = false; };
    const onMove  = (e: MouseEvent) => { if (!isDown) return; e.preventDefault(); el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX); };
    el.addEventListener('mousedown',  onDown);
    el.addEventListener('mouseleave', onUp);
    el.addEventListener('mouseup',    onUp);
    el.addEventListener('mousemove',  onMove);
    return () => {
      el.removeEventListener('mousedown',  onDown);
      el.removeEventListener('mouseleave', onUp);
      el.removeEventListener('mouseup',    onUp);
      el.removeEventListener('mousemove',  onMove);
    };
  });
</script>

<section class="pb-20 overflow-hidden">
  <div class="max-w-6xl mx-auto px-6 mb-12 text-center">
    <h2 class="font-display text-4xl font-bold text-base-content mb-3">Your journey starts here</h2>
    <p class="text-base-content/60 max-w-lg mx-auto">From zero to confident cook — here's what the first few minutes in the app look like.</p>
  </div>

  <div class="overflow-x-auto pb-6 cursor-grab active:cursor-grabbing select-none" id="onboarding-flow">
    <div class="flex items-center min-w-max px-6 md:px-[max(1.5rem,calc((100vw-72rem)/2))]">

      {#each onboardingScreens as screen}
        <div class="flex flex-col items-center w-64">
          <div class="relative bg-base-content rounded-[2.5rem] p-1 shadow-xl w-56">
            <div class="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-base-content rounded-full z-10"></div>
            <div class="rounded-[2.2rem] overflow-hidden aspect-[9/19] flex items-center bg-primary">
              <img src={screen.src} alt={screen.label} class="w-full h-[93%]" />
            </div>
          </div>
          <p class="text-xs text-base-content/60 text-center mt-3 px-2 leading-tight whitespace-pre-line">{screen.label}</p>
        </div>

        {#if screen.connector !== null}
          <div class="flex items-center -mt-8">
            <div class="w-8 h-px border-t-2 border-dashed border-primary/40"></div>
            <div class="w-9 h-9 rounded-full bg-primary text-primary-content text-xs font-bold flex items-center justify-center shadow-md shrink-0">{screen.connector}</div>
            <div class="w-8 h-px border-t-2 border-dashed border-primary/40"></div>
          </div>
        {/if}
      {/each}

    </div>
  </div>

  <p class="text-center text-xs text-base-content/30 mt-2">← scroll to explore →</p>
</section>
