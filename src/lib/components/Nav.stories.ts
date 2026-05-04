import type { Meta, StoryObj } from '@storybook/sveltekit';
import Nav from './Nav.svelte';

const meta: Meta<typeof Nav> = {
  title: 'Components/Nav',
  component: Nav,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DarkTheme: Story = {
  decorators: [
    () => ({
      Component: Nav,
      props: {},
    }),
  ],
  parameters: {
    backgrounds: { default: 'light' },
  },
};
