import type { Meta, StoryObj } from '@storybook/sveltekit';
import HowItWorksSection from './HowItWorksSection.svelte';

const meta = {
  title: 'Home/HowItWorksSection',
  component: HowItWorksSection,
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

export const Default: StoryObj = {};
