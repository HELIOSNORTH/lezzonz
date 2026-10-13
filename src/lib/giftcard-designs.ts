import type { GiftCardDesign } from '#lib/types.ts';

export const giftCardDesigns: Record<GiftCardDesign, { name: string; background: string; ink: string }> = {
	aftenrod: {
		name: 'Aftenrød',
		background:
			'radial-gradient(120% 120% at 0% 0%, #ffd29d 0%, transparent 50%), radial-gradient(100% 100% at 100% 100%, #b5174d 0%, transparent 60%), linear-gradient(135deg, #ff9a5a, #ff4d2e 55%, #c2185b)',
		ink: '#ffffff'
	},
	fjord: {
		name: 'Fjord',
		background:
			'radial-gradient(120% 120% at 0% 0%, #b9e6ff 0%, transparent 50%), radial-gradient(100% 100% at 100% 100%, #0a2a66 0%, transparent 60%), linear-gradient(135deg, #64d2ff, #0a84ff 55%, #1d3a8a)',
		ink: '#ffffff'
	},
	skov: {
		name: 'Skov',
		background:
			'radial-gradient(120% 120% at 0% 0%, #d6f5c5 0%, transparent 50%), radial-gradient(100% 100% at 100% 100%, #0f3d24 0%, transparent 60%), linear-gradient(135deg, #8fd694, #2f8f5b 55%, #134e33)',
		ink: '#ffffff'
	},
	champagne: {
		name: 'Champagne',
		background:
			'radial-gradient(120% 120% at 0% 0%, #fffaf0 0%, transparent 55%), radial-gradient(100% 100% at 100% 100%, #b08d57 0%, transparent 60%), linear-gradient(135deg, #f6e7c8, #e2c48f 55%, #a67c3d)',
		ink: '#3b2a12'
	}
};
