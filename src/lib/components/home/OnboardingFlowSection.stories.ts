import type { Meta, StoryObj } from '@storybook/sveltekit';
import OnboardingFlowSection from './OnboardingFlowSection.svelte';

const meta = {
  title: 'Home/OnboardingFlowSection',
  component: OnboardingFlowSection,
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

export const Default: StoryObj = {};
