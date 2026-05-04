import type { Meta, StoryObj } from '@storybook/sveltekit';
import Footer from './Footer.svelte';

const meta = {
  title: 'Components/Footer',
  component: Footer,
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

// Popular categories loaded from Supabase — shows "Loading..." in isolation
export const Default: StoryObj = {};
