import type { Meta, StoryObj } from '@storybook/sveltekit';
import SkillsSection from './SkillsSection.svelte';

const meta = {
  title: 'Home/SkillsSection',
  component: SkillsSection,
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

export const Default: StoryObj = {};
