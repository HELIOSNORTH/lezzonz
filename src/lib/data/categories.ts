import type { Category } from '#lib/types.ts';

export const categories: Category[] = [
	{
		id: 'mad-drikke',
		name: 'Mad & Drikke',
		emoji: '🍕',
		tint: '#ff9500'
	},
	{
		id: 'sport-motor',
		name: 'Sport & Motor',
		emoji: '🏁',
		tint: '#0a84ff'
	},
	{
		id: 'oplevelser',
		name: 'Oplevelser',
		emoji: '🧭',
		tint: '#30b0c7'
	},
	{
		id: 'hygge-fritid',
		name: 'Hygge & Fritid',
		emoji: '🧶',
		tint: '#ff2d55'
	},
	{
		id: 'kreativ-musik',
		name: 'Kreativ & Musik',
		emoji: '🎸',
		tint: '#af52de'
	},
	{
		id: 'viden-it',
		name: 'Viden & IT',
		emoji: '💡',
		tint: '#5856d6'
	}
];

export const cities = ['Aarhus', 'København', 'Odense', 'Aalborg', 'Vejle', 'Silkeborg', 'Roskilde'] as const;
