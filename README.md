# Parsnip Web

The companion website for the **Parsnip** mobile app — a skill-based cooking learning platform available on iOS and Android.

## What is Parsnip?

Parsnip is a mobile app that teaches people how to cook through structured, progressive lessons. Instead of just following recipes, users build real cooking skills — knife techniques, heat control, flavor balance, and more — that gradually unlock the ability to prepare increasingly complex dishes.

The learning experience is gamified: users earn points, maintain streaks, and level up their skills as they progress through the curriculum.

## What is this website?

This site sits between a marketing page and a recipe platform. Its two goals:

1. **Attract and convert** — introduce visitors to Parsnip, communicate its value, and drive app downloads and signups.
2. **Showcase recipes** — present the full recipe catalog so users can discover a dish they want to make, then jump into the app to learn the skills required to cook it step by step.

## Tech Stack

- [SvelteKit](https://kit.svelte.dev/) — framework (Svelte 5)
- [TypeScript](https://www.typescriptlang.org/) — type safety
- [Tailwind CSS](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/) — styling and theming
- Static adapter — deployed as a static site

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── lib/
│   ├── components/     # Nav, Footer, RecipeCard
│   └── recipes.ts      # Recipe and category data + types
└── routes/
    ├── +layout.svelte
    ├── +page.svelte          # Home / landing
    ├── about/
    ├── categories/
    └── recipes/
```
