import type { Meta, StoryObj } from '@storybook/sveltekit';
import SocialProofSection from './SocialProofSection.svelte';

const meta = {
  title: 'Home/SocialProofSection',
  component: SocialProofSection,
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

// Renders with live Supabase data — shows loading state in isolation
export const Default: StoryObj = {};
