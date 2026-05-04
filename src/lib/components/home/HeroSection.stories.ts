import type { Meta, StoryObj } from '@storybook/sveltekit';
import HeroSection from './HeroSection.svelte';

const meta = {
  title: 'Home/HeroSection',
  component: HeroSection,
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

export const Default: StoryObj = {};
