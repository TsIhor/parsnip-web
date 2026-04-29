import { supabase } from '$lib/supabase';
import { get, writable } from 'svelte/store';

export let defaultRecipe: Recipe = {
	id: null,
	title: '',
	description: '',
	ingredients: [],
	servings: null,
	time: null,
	steps: [],
	external_refs: [],
	difficulty: '',
	questionnaire_id: '',
	tags: [],
	recipe_header_image: null,
	recipe_video: null,
	levels: [],
	external_recipe_id: null,
	firestore_dish_id: null,
	published_at: null,
	sections: []
};

export interface Media {
	id?: number;
	type: string;
	title: string;
	s3_key: string;
	description: string;
	is_ai_generated?: boolean;
	firebase_media_url?: string | null;
	media_url: string | null;
	stream_url: string | null;
	stream_s3_key: string | null;
	media_location: 'header_media' | 'recipe_media' | null;
	// Enriched fields returned by the media RPC
	created_at?: string | null;
	original_width?: number | null;
	original_height?: number | null;
}

export interface Recipe {
	id: number | null; // +
	title: string; // +
	description: string; // +
	createdAt?: number; // +
	updatedAt?: number; // +
	external_refs: RecipeExternalRef[] | null;
	ingredients: Ingredient[];
	difficulty: string;
	servings: number | null; // +
	steps: Step[];
	time: number | null;
	recipe_header_image: Media | null;
	recipe_video: Media | null;
	questionnaire_id: string | null;
	tags: RecipeTag[];
	levels: string[];
	external_recipe_id: string | null;
	firestore_dish_id?: string | null;
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

export interface RecipeLocale {
	id: number;
	locale: string;
}

export interface RecipeStoreState {
	recipes: Recipe[];
	recipe: Recipe | null;
	originalRecipe: Recipe | null;
	isLoadingRecipes: boolean;
	isLoading: boolean;
	activeTab: string;
	recipe_tag_types: RecipeTagType[];
	recipe_tags: RecipeTag[];
	recipe_locales: {id: number, locale: string}[];
	order_by:
		| 'created_at asc'
		| 'created_at desc'
		| 'published_at asc'
		| 'published_at desc'
		| 'title asc'
		| 'title desc'
		| 'id asc'
		| 'id desc'
		| null;
	status_filter: 'all' | 'live' | 'draft';
	selected_tag_ids: number[];
	keyword: string;
	scrolled: boolean;
	error: string | null;
}

export class RecipeStore {
	state = writable<RecipeStoreState>({
		recipes: [],
		isLoading: true,
		isLoadingRecipes: true,
		recipe: structuredClone(defaultRecipe),
		originalRecipe: structuredClone(defaultRecipe),
		activeTab: 'edit',
		recipe_tag_types: [],
		recipe_tags: [],
		recipe_locales: [],
		order_by: null,
		status_filter: 'live',
		selected_tag_ids: [],
		keyword: '',
		scrolled: false,
		error: null
	});

	unsubscribeRecipeContent?: () => void;
	unsubscribeFeedbacks?: () => void;

	async fetchTags() {
		const { data, error } = await supabase.rpc('app_options').select('*');
		
		if (error) throw error;

		this.state.update((s) => ({
			...s,
			recipe_tag_types: data[0].recipe_tag_types as RecipeTagType[],
			recipe_tags: data[0].recipe_tags as RecipeTag[],
			recipe_locales: data[0].recipe_locales as RecipeLocale[]
		}));
	}

	async fetchRecipes(): Promise<void> {
		this.state.update((s) => ({ ...s, error: null }));

		// --- Filters by order ---
		// random,
		// published_at ( published_at asc, published_at desc), created_at ( created_at asc, created_at desc) ,
		// title ( title asc, title desc)
		// id ( id asc, id desc)

		const currentState = get(this.state);
		const ORDER_BY = currentState.order_by;
		const TAG_IDS = currentState.selected_tag_ids;
		const KEYWORD = currentState.keyword || null;

		const { data, error } = await supabase.rpc('recipes', {
			_limit: 1000,
			_tag_ids: TAG_IDS.length ? TAG_IDS : null,
			_order_by: ORDER_BY,
			_keyword: KEYWORD,
		});

		if (error) {
			this.state.update((s) => ({ ...s, error: error.message }));
			return;
		}

		this.state.update((s) => ({
			...s,
			recipes: data as Recipe[],
			isLoadingRecipes: false,
		}));
	}

	async fetchRecipe(id: number): Promise<void> {
		this.state.update((s) => ({ ...s, isLoading: true, error: null, recipe: null, scrolled: false }));

		try {
			// const recipeDoc = await getDoc(doc(db, 'Recipes', id));
			const { data, error } = await supabase.rpc('recipes', {
				_id: id,
				_status_ids: [1, 2]
			});

			if (error) {
				this.state.update((s) => ({ ...s, error: error.message, isLoading: false }));
				return;
			}
			
			data[0].instruction = data[0].action ?? data[0].instruction;

			data[0].self_assessment = data[0].self_assessment || { questions: [] };

			// data[0].sections = (await this.fetchSections(data[0])) || [];

			this.state.update((s) => ({
				...s,
				recipe: data[0],
				originalRecipe: structuredClone(data[0]),
				isLoading: false
			}));
		} catch (error: any) {
			this.state.update((s) => ({ ...s, error: error.message, isLoading: false }));
		}
	}
}

export const recipeStore = new RecipeStore();
