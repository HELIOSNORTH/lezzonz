import type { Category } from '#lib/types.ts';

export const categories: Category[] = [
	{
		id: 'mad-drikke',
		name: 'Mad & Drikke',
		tagline: 'Pizza, flødeboller, gin og alt det gode',
		emoji: '🍕',
		tint: '#ff9500'
	},
	{
		id: 'sport-motor',
		name: 'Sport & Motor',
		tagline: 'Banekørsel, padel, golf og saunagus',
		emoji: '🏁',
		tint: '#0a84ff'
	},
	{
		id: 'oplevelser',
		name: 'Oplevelser',
		tagline: 'Ud i naturen og ind i byens liv',
		emoji: '🧭',
		tint: '#30b0c7'
	},
	{
		id: 'hygge-fritid',
		name: 'Hygge & Fritid',
		tagline: 'Blomster, strik, ler og levende lys',
		emoji: '🧶',
		tint: '#ff2d55'
	},
	{
		id: 'kreativ-musik',
		name: 'Kreativ & Musik',
		tagline: 'Beats, guitar, akvarel og DJ',
		emoji: '🎸',
		tint: '#af52de'
	},
	{
		id: 'viden-it',
		name: 'Viden & IT',
		tagline: 'AI, kode, hjemmesider og førstehjælp',
		emoji: '💡',
		tint: '#5856d6'
	}
];

export const cities = ['Aarhus', 'København', 'Odense', 'Aalborg', 'Vejle', 'Silkeborg', 'Roskilde'] as const;
