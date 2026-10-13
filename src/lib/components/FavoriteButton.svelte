<script lang="ts">
	import { Heart } from '@lucide/svelte';
	import { demo } from '#lib/demo-store.svelte.ts';
	import { showToast } from '#lib/toast.svelte.ts';

	let { slug, class: className = '' }: { slug: string; class?: string } = $props();

	const active = $derived(demo.isFavorite(slug));
	let bump = $state(false);

	function toggle(event: MouseEvent) {
		event.preventDefault();
		event.stopPropagation();
		const added = demo.toggleFavorite(slug);
		bump = added;
		showToast(added ? 'Gemt i dine favoritter' : 'Fjernet fra favoritter', added ? '♥' : '♡');
	}
</script>

<button
	type="button"
	onclick={toggle}
	aria-pressed={active}
	aria-label={active ? 'Fjern fra favoritter' : 'Gem som favorit'}
	class="glass pressable grid size-10 place-items-center rounded-full {className}"
>
	<Heart
		class="size-[18px] transition-transform duration-300 {active ? 'fill-[#ff375f] text-[#ff375f]' : 'text-label'} {bump ? 'scale-110' : ''}"
		strokeWidth={2.2}
	/>
</button>
