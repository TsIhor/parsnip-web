<script lang="ts">
  import HeroSection          from './HeroSection.svelte';
  import SocialProofSection   from './SocialProofSection.svelte';
  import HowItWorksSection    from './HowItWorksSection.svelte';
  import OnboardingFlowSection from './OnboardingFlowSection.svelte';
  import SkillsSection        from './SkillsSection.svelte';
  import FeaturedRecipesSection from './FeaturedRecipesSection.svelte';
  import CategoriesSection    from './CategoriesSection.svelte';
  import CtaSection           from './CtaSection.svelte';
  import { reveal }           from '$lib/actions/reveal';
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
