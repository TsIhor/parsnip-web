# Parsnip — Claude Guidelines

## Stack

- **Framework:** SvelteKit + Svelte 5 + TypeScript
- **Styling:** Tailwind CSS + DaisyUI
- **Database:** Supabase
- **Deployment:** Vercel
- **UI Dev:** Storybook

## Project Structure

```
src/
  lib/
    components/        # reusable components
      home/            # home page sections + HomePage.svelte
    actions/           # svelte actions
    supabase/          # supabase client
    recipes.store.ts   # global recipe store
  routes/              # SvelteKit pages
.storybook/            # Storybook config
static/                # static assets (images, icons)
```

## Rules

### Svelte
- Always use **Svelte 5** syntax: `$state`, `$derived`, `$props`, `$effect`
- Never use Svelte 4 patterns: `export let`, `$:`, `createEventDispatcher`

### Components
- All reusable components go in `src/lib/components/`
- Home page sections go in `src/lib/components/home/`
- When creating a new component — always create a `.stories.ts` file alongside it

### Styling
- Use **DaisyUI** classes first — don't write custom CSS if DaisyUI already covers it
- Use Tailwind utilities for layout and spacing

### Supabase
- Always use the client from `$lib/supabase`
- Never create a second Supabase client instance

### Do NOT
- Add Firebase — project uses Supabase only
- Add comments unless the logic is genuinely non-obvious

## Design Tokens

<!-- To be filled in -->

## Notes

- `firebase_media_url` fields in Supabase data are legacy URL strings — not Firebase SDK usage
- Storybook runs on port 6006 (or 6007 if occupied): `npm run storybook`
