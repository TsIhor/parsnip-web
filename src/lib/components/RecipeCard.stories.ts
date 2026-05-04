import type { Meta, StoryObj } from '@storybook/sveltekit';
import type { Media, Recipe } from '$lib/recipes.store';
import RecipeCard from '$lib/components/RecipeCard.svelte';

const meta = {
  title: 'Components/RecipeCard',
  component: RecipeCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<{ recipe: Recipe }>;

export default meta;
type Story = StoryObj<{ recipe: Recipe }>;

const mockMedia = (url: string): Media => ({
  type: 'image',
  title: '',
  s3_key: '',
  description: '',
  media_url: url,
  stream_url: null,
  stream_s3_key: null,
  media_location: 'header_media',
});

const baseRecipe: Recipe = {
  id: 1,
  title: 'Creamy Tuscan Pasta',
  description: 'A rich and comforting pasta dish with sun-dried tomatoes, spinach, and a creamy garlic sauce.',
  time: 30,
  servings: 4,
  difficulty: 'easy',
  tags: [
    { id: 1, type: { id: 1, name: 'cuisine' }, name: 'Pasta' },
    { id: 2, type: { id: 1, name: 'cuisine' }, name: 'Italian' },
    { id: 3, type: { id: 2, name: 'diet' }, name: 'Vegetarian' },
  ],
  recipe_header_image: null,
  recipe_video: null,
  external_refs: null,
  ingredients: [],
  steps: [],
  questionnaire_id: null,
  levels: [],
  external_recipe_id: null,
  published_at: null,
  sections: [],
};

export const Default: Story = {
  args: { recipe: baseRecipe },
};

export const WithImage: Story = {
  args: {
    recipe: {
      ...baseRecipe,
      recipe_header_image: mockMedia('https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=600&q=80'),
    },
  },
};

export const WithVideo: Story = {
  args: {
    recipe: {
      ...baseRecipe,
      id: 2,
      title: 'Beef Stir Fry',
      description: 'Quick and flavourful stir fry with tender beef strips and fresh vegetables.',
      difficulty: 'medium',
      time: 20,
      recipe_header_image: mockMedia('https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80'),
      recipe_video: { ...mockMedia(''), stream_url: 'https://example.com/video.mp4', media_location: 'recipe_media' },
    },
  },
};

export const Hard: Story = {
  args: {
    recipe: {
      ...baseRecipe,
      id: 3,
      title: 'Beef Wellington',
      description: 'A classic British dish of beef tenderloin wrapped in pâté and puff pastry.',
      difficulty: 'hard',
      time: 120,
      tags: [
        { id: 4, type: { id: 1, name: 'cuisine' }, name: 'Beef' },
        { id: 5, type: { id: 1, name: 'cuisine' }, name: 'British' },
        { id: 6, type: { id: 3, name: 'occasion' }, name: 'Special Occasion' },
      ],
    },
  },
};

export const NoTags: Story = {
  args: {
    recipe: { ...baseRecipe, tags: [] },
  },
};

export const MinimalInfo: Story = {
  args: {
    recipe: {
      ...baseRecipe,
      id: 5,
      title: 'Simple Salad',
      description: 'A fresh garden salad.',
      time: null,
      servings: null,
      difficulty: '',
      tags: [],
    },
  },
};
