import type { Meta, StoryObj } from '@storybook/sveltekit';
import CtaSection from './CtaSection.svelte';

const meta = {
  title: 'Home/CtaSection',
  component: CtaSection,
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

export const Default: StoryObj = {};
