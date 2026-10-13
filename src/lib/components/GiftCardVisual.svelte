<script lang="ts">
	import { formatPrice } from '#lib/format.ts';
	import { giftCardDesigns } from '#lib/giftcard-designs.ts';
	import type { GiftCardDesign } from '#lib/types.ts';
	import Logo from './Logo.svelte';
	import QrCode from './QrCode.svelte';

	let {
		amount,
		design,
		recipient = '',
		sender = '',
		code,
		qrValue,
		scope,
		tilt = true,
		class: className = ''
	}: {
		amount: number;
		design: GiftCardDesign;
		recipient?: string;
		sender?: string;
		code?: string;
		qrValue?: string;
		scope?: string;
		tilt?: boolean;
		class?: string;
	} = $props();

	const theme = $derived(giftCardDesigns[design]);
	let rotateX = $state(0);
	let rotateY = $state(0);
	let glareX = $state(30);
	let glareY = $state(20);

	function onPointerMove(event: PointerEvent) {
		if (!tilt || event.pointerType === 'touch') return;
		const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
		const x = (event.clientX - rect.left) / rect.width;
		const y = (event.clientY - rect.top) / rect.height;
		rotateY = (x - 0.5) * 14;
		rotateX = (0.5 - y) * 14;
		glareX = x * 100;
		glareY = y * 100;
	}

	function onPointerLeave() {
		rotateX = 0;
		rotateY = 0;
	}
</script>

<div class="[perspective:1200px] {className}">
	<div
		class="noise relative aspect-[1.586] w-full overflow-hidden rounded-[1.4rem] shadow-float transition-transform duration-300 ease-out"
		style:background={theme.background}
		style:color={theme.ink}
		style:transform="rotateX({rotateX}deg) rotateY({rotateY}deg)"
		onpointermove={onPointerMove}
		onpointerleave={onPointerLeave}
		role="img"
		aria-label="Gavekort på {formatPrice(amount)}"
	>
		<div
			class="pointer-events-none absolute inset-0 opacity-60 mix-blend-soft-light"
			style:background="radial-gradient(60% 60% at {glareX}% {glareY}%, rgb(255 255 255 / 0.7), transparent 70%)"
		></div>
		<div class="absolute inset-0 rounded-[1.4rem] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_0_0_1px_rgb(255_255_255/0.18)]"></div>

		<div class="relative flex h-full flex-col justify-between p-[6%]">
			<div class="flex items-start justify-between">
				<Logo size={26} />
				<span class="text-[0.7rem] font-bold tracking-[0.2em] uppercase opacity-80">Gavekort</span>
			</div>

			<div class="flex items-end justify-between gap-3">
				<div class="min-w-0">
					{#if recipient}<div class="truncate text-[0.85rem] opacity-85">Til {recipient}</div>{/if}
					<div class="font-display text-[clamp(1.8rem,7vw,2.6rem)] leading-none font-bold tracking-[-0.03em]">
						{formatPrice(amount)}
					</div>
					<div class="mt-1.5 truncate text-[0.8rem] opacity-80">
						{scope ?? 'Gælder til alle kurser på Lezzonz'}{sender ? ` · Fra ${sender}` : ''}
					</div>
				</div>
				{#if qrValue}
					<div class="shrink-0 rounded-xl bg-white p-1.5 text-black shadow-lg">
						<QrCode value={qrValue} class="size-16" label="QR-kode til gavekortet" />
					</div>
				{/if}
			</div>
		</div>
		{#if code}
			<div class="absolute top-[6%] right-[6%] mt-6 font-mono text-[0.72rem] tracking-wider opacity-80">{code}</div>
		{/if}
	</div>
</div>
