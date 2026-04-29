import { supabase } from '$lib/supabase';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Media {
	id: string;
	url: string;
	type: string;
}

export interface Recipe {
	id: number | null;
	title: string;
	description: string;
	createdAt?: number;
	updatedAt?: number;
	external_refs: RecipeExternalRef[] | null;
	ingredients: Ingredient[];
	difficulty: string;
	servings: number | null;
	steps: Step[];
	time: number | null;
	recipe_header_image: Media | null;
	recipe_video: Media | null;
	tags: RecipeTag[];
	levels: string[];
	published_at: string | null;
	sections: Section[];
}

export interface RecipeTag {
	id: number;
	name: string;
	type: RecipeTagType;
}

export interface RecipeTagType {
	id: number;
	name: string;
}

export interface Ingredient {
	id?: string;
	name: string;
	note: string;
	quantity: string;
	unit: string;
	section_id: number | null;
	order_index: number;
	quantity_fmt: string;
	locale_id: number;
}

export interface Step {
	id?: string;
	title: string;
	instruction: string;
	action: string;
	section_id: number | null;
	media_id: string | null;
	media?: Media | null;
	order_index: number;
	locale_id: number;
}

export interface Section {
	id: number | null;
	recipe_id: number | null;
	title: string;
	order_index: number;
}

export interface RecipeExternalRef {
	id?: string;
	caption: string;
	url: string;
}

export type OrderBy =
	| 'created_at asc'
	| 'created_at desc'
	| 'published_at asc'
	| 'published_at desc'
	| 'title asc'
	| 'title desc'
	| 'id asc'
	| 'id desc'
	| null;

// ─── Store ────────────────────────────────────────────────────────────────────

class RecipeStore {
	recipes = $state<Recipe[]>([]);
	recipe = $state<Recipe | null>(null);
	isLoadingRecipes = $state(true);
	isLoading = $state(true);
	recipe_tag_types = $state<RecipeTagType[]>([]);
	recipe_tags = $state<RecipeTag[]>([]);
	order_by = $state<OrderBy>(null);
	selected_tag_ids = $state<number[]>([]);
	difficulty_filter = $state('');
	keyword = $state('');
	error = $state<string | null>(null);

	async fetchTags() {
		const { data, error } = await supabase.rpc('app_options').select('*');
		if (error) throw error;

		this.recipe_tag_types = data[0].recipe_tag_types as RecipeTagType[];
		this.recipe_tags = data[0].recipe_tags as RecipeTag[];
	}

	async fetchRecipes(): Promise<void> {
		this.error = null;

		const { data, error } = await supabase.rpc('recipes', {
			_limit: 1000,
			_tag_ids: this.selected_tag_ids.length ? this.selected_tag_ids : null,
			_status_ids: [1], // published only
			_order_by: this.order_by,
			_keyword: this.keyword || null,
		});

		if (error) {
			this.error = error.message;
			return;
		}

		this.recipes = this.difficulty_filter
			? (data as Recipe[]).filter((r) => r.difficulty === this.difficulty_filter)
			: (data as Recipe[]);

		this.isLoadingRecipes = false;
	}

	async fetchRecipe(id: number): Promise<void> {
		this.isLoading = true;
		this.error = null;
		this.recipe = null;

		try {
			const { data, error } = await supabase.rpc('recipes', {
				_id: id,
				_status_ids: [1],
			});

			if (error) {
				this.error = error.message;
				this.isLoading = false;
				return;
			}

			data[0].instruction = data[0].action ?? data[0].instruction;

			this.recipe = data[0] as Recipe;
			this.isLoading = false;
		} catch (e: any) {
			this.error = e.message;
			this.isLoading = false;
		}
	}

	toggleTag(id: number) {
		this.selected_tag_ids = this.selected_tag_ids.includes(id)
			? this.selected_tag_ids.filter((t) => t !== id)
			: [...this.selected_tag_ids, id];
	}

	setDifficulty(value: string) {
		this.difficulty_filter = this.difficulty_filter === value ? '' : value;
	}

	resetFilters() {
		this.keyword = '';
		this.selected_tag_ids = [];
		this.difficulty_filter = '';
		this.order_by = null;
	}
}

export const recipeStore = new RecipeStore();
