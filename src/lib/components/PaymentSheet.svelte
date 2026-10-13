<script lang="ts">
	import { Check, Lock, Smartphone } from '@lucide/svelte';
	import { fade, scale } from 'svelte/transition';
	import { formatPrice } from '#lib/format.ts';
	import type { PaymentMethod } from '#lib/types.ts';

	let { stage, method, amount }: { stage: 'idle' | 'pending' | 'approved'; method: PaymentMethod; amount: number } = $props();

	const pendingTitle = $derived(
		amount === 0
			? 'Bekræfter…'
			: method === 'mobilepay'
				? 'Godkend i MobilePay'
				: method === 'applepay'
					? 'Bekræft med Face ID'
					: 'Behandler betaling…'
	);
</script>

{#if stage !== 'idle'}
	<div class="fixed inset-0 z-[70] grid place-items-center bg-black/30 p-6 backdrop-blur-md" transition:fade={{ duration: 200 }}>
		<div class="glass-strong w-full max-w-sm rounded-[2rem] p-8 text-center" in:scale={{ start: 0.92, duration: 350 }} role="status">
			{#if stage === 'pending'}
				<div class="relative mx-auto grid size-20 place-items-center">
					<span class="absolute inset-0 animate-ping rounded-full bg-brand/25"></span>
					<span class="relative grid size-20 place-items-center rounded-full bg-gradient-to-br from-[#ffb340] to-brand text-white">
						{#if method === 'mobilepay' && amount > 0}<Smartphone class="size-9" />{:else}<Lock class="size-8" />{/if}
					</span>
				</div>
				<h2 class="mt-6 text-[1.3rem] font-semibold">{pendingTitle}</h2>
				<p class="mt-2 text-label-2">{formatPrice(amount)} til Lezzonz</p>
			{:else}
				<div class="mx-auto grid size-20 place-items-center rounded-full bg-success text-white" in:scale={{ start: 0.5, duration: 400 }}>
					<Check class="size-10" strokeWidth={3} />
				</div>
				<h2 class="mt-6 text-[1.3rem] font-semibold">Betaling gennemført</h2>
				<p class="mt-2 text-label-2">Et øjeblik…</p>
			{/if}
		</div>
	</div>
{/if}
