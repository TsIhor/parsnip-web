export interface Category {
	id: string;
	name: string;
	emoji: string;
	count: number;
}

export const categories: Category[] = [
	{ id: 'breakfasts', name: 'Breakfasts',   emoji: '🍳',  count: 12 },
	{ id: 'soups',      name: 'Soups',         emoji: '🍲',  count: 8  },
	{ id: 'mains',      name: 'Main Courses',  emoji: '🍽️', count: 24 },
	{ id: 'baking',     name: 'Baking',        emoji: '🥐',  count: 16 },
	{ id: 'desserts',   name: 'Desserts',      emoji: '🍰',  count: 18 },
	{ id: 'salads',     name: 'Salads',        emoji: '🥗',  count: 10 },
];
