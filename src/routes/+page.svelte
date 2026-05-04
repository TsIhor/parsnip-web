<script lang="ts">
  import HeroSection           from '$lib/components/home/HeroSection.svelte';
  import SocialProofSection    from '$lib/components/home/SocialProofSection.svelte';
  import HowItWorksSection     from '$lib/components/home/HowItWorksSection.svelte';
  import OnboardingFlowSection from '$lib/components/home/OnboardingFlowSection.svelte';
  import SkillsSection         from '$lib/components/home/SkillsSection.svelte';
  import FeaturedRecipesSection from '$lib/components/home/FeaturedRecipesSection.svelte';
  import CategoriesSection     from '$lib/components/home/CategoriesSection.svelte';
  import CtaSection            from '$lib/components/home/CtaSection.svelte';
  import { reveal }            from '$lib/actions/reveal';
</script>

<svelte:head>
  <title>Parsnip — Learn to Cook, One Skill at a Time</title>
  <meta name="description" content="Parsnip teaches you to cook through progressive skill lessons — not just recipes. Download on iOS and Android." />
</svelte:head>

<HeroSection />
<div use:reveal><SocialProofSection /></div>
<div use:reveal><HowItWorksSection /></div>
<div use:reveal><OnboardingFlowSection /></div>
<div use:reveal><SkillsSection /></div>
<div use:reveal><FeaturedRecipesSection /></div>
<div use:reveal><CategoriesSection /></div>
<div use:reveal><CtaSection /></div>
