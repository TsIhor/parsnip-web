import type { Meta, StoryObj } from '@storybook/sveltekit';
import HomePage from './HomePage.svelte';

const meta = {
  title: 'Home/Full Page',
  component: HomePage,
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

export const Default: StoryObj = {};
