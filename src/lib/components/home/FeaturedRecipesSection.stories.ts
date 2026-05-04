import type { Meta, StoryObj } from '@storybook/sveltekit';
import FeaturedRecipesSection from './FeaturedRecipesSection.svelte';

const meta = {
  title: 'Home/FeaturedRecipesSection',
  component: FeaturedRecipesSection,
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

// Renders with live Supabase data — shows loading state in isolation
export const Default: StoryObj = {};
