import type { Meta, StoryObj } from '@storybook/sveltekit';
import CategoriesSection from './CategoriesSection.svelte';

const meta = {
  title: 'Home/CategoriesSection',
  component: CategoriesSection,
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

// Renders with live Supabase data — shows loading state in isolation
export const Default: StoryObj = {};
