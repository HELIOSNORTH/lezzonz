<script lang="ts">
	import { Star } from '@lucide/svelte';
	import { formatNumber, formatRating } from '#lib/format.ts';

	let { rating, count, class: className = '' }: { rating: number; count?: number; class?: string } = $props();
</script>

<span class="inline-flex items-center gap-1 {className}">
	<Star class="size-[0.9em] fill-current text-[#ff9f0a]" strokeWidth={0} />
	<span class="font-semibold">{formatRating(rating)}</span>
	{#if count !== undefined}
		<span class="text-label-2">({formatNumber(count)})</span>
	{/if}
</span>
