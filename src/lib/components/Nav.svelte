<script lang="ts">
  import { page } from '$app/state';
  import { onMount } from 'svelte';

  let menuOpen = $state(false);
  let theme = $state('light');

  onMount(() => {
    theme = localStorage.getItem('theme') ?? 'light';
  });

  function toggleTheme() {
    theme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }

  const links = [
    { href: '/', label: 'Home' },
    { href: '/recipes', label: 'Recipes' },
    { href: '/categories', label: 'Categories' },
    { href: '/articles', label: 'Articles' },
    { href: '/about', label: 'About' },
  ];
</script>

<nav class="sticky top-0 z-50 bg-base-100/90 backdrop-blur-sm border-b border-base-300">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <div class="flex items-center justify-between h-16">

      <!-- Logo -->
      <a href="/" class="flex items-center gap-2 group">
        <img src="/logomark-parsnip.png" alt="Parsnip" class="w-8 h-8" />
        <span class="font-display text-xl text-primary font-bold group-hover:text-primary/80 transition-colors">
          Parsnip
        </span>
      </a>

      <!-- Desktop links -->
      <div class="hidden md:flex items-center gap-1">
        {#each links as link}
          <a
            href={link.href}
            class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
              {page.url.pathname === link.href
                ? 'bg-primary text-primary-content'
                : 'text-base-content/70 hover:bg-base-200 hover:text-primary'}"
          >
            {link.label}
          </a>
        {/each}
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-1">
        <!-- Search -->
        <a href="/recipes" aria-label="Search recipes" class="btn btn-ghost btn-circle btn-sm text-base-content/50 hover:text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </a>

        <!-- Theme toggle -->
        <button
          onclick={toggleTheme}
          class="btn btn-ghost btn-circle btn-sm text-base-content/50 hover:text-primary"
          aria-label="Toggle theme"
        >
          {#if theme === 'light'}
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
            </svg>
          {:else}
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
          {/if}
        </button>

        <!-- Mobile menu button -->
        <button
          class="btn btn-ghost btn-circle btn-sm md:hidden text-base-content/50"
          onclick={() => menuOpen = !menuOpen}
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    {#if menuOpen}
      <div class="md:hidden py-3 border-t border-base-300 flex flex-col gap-1">
        {#each links as link}
          <a
            href={link.href}
            class="px-4 py-2 rounded-lg text-sm font-medium text-base-content/70 hover:bg-base-200 hover:text-primary transition-colors"
            onclick={() => menuOpen = false}
          >
            {link.label}
          </a>
        {/each}
      </div>
    {/if}
  </div>
</nav>
