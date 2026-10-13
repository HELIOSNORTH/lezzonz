<script lang="ts">
	import { Check, Copy, Printer, Share } from '@lucide/svelte';
	import { scale } from 'svelte/transition';
	import { page } from '$app/state';
	import { getCourse, getHost } from '#lib/catalog.ts';
	import { demo } from '#lib/demo-store.svelte.ts';
	import { formatFullDate, formatPrice } from '#lib/format.ts';
	import { showToast } from '#lib/toast.svelte.ts';
	import GiftCardVisual from '#lib/components/GiftCardVisual.svelte';

	const card = $derived(demo.findGiftCard(page.params.code ?? ''));
	const isNew = $derived(page.url.searchParams.has('ny'));
	const course = $derived(card?.courseSlug ? getCourse(card.courseSlug) : undefined);
	const host = $derived(card?.hostSlug ? getHost(card.hostSlug) : undefined);
	const scope = $derived(course ? course.title : host ? `Gælder hos ${host.name}` : undefined);
	const redeemUrl = $derived(`${page.url.origin}/gavekort/${card?.code}`);
	const expires = $derived(card ? new Date(new Date(card.createdAt).setFullYear(new Date(card.createdAt).getFullYear() + 3)) : new Date());
	const browseHref = $derived(course ? `/kurser/${course.slug}` : host ? `/undervisere/${host.slug}` : '/kurser');

	async function copyCode() {
		await navigator.clipboard?.writeText(card?.code ?? '');
		showToast('Koden er kopieret');
	}

	async function share() {
		if (!card) return;
		const text = `Du har fået et gavekort til Lezzonz på ${formatPrice(card.amount)}!`;
		if (navigator.share) {
			try {
				await navigator.share({ title: 'Gavekort til Lezzonz', text, url: redeemUrl });
			} catch {
				return;
			}
		} else {
			await navigator.clipboard?.writeText(`${text} ${redeemUrl}`);
			showToast('Link kopieret — klar til at sende');
		}
	}
</script>

<svelte:head>
	<title>Gavekort · Lezzonz</title>
</svelte:head>

{#if !card}
	<section class="mx-auto max-w-xl px-5 py-20 text-center">
		<div class="text-[3.5rem]">🎁</div>
		<h1 class="mt-3 text-2xl font-bold">Gavekortet blev ikke fundet</h1>
		<p class="mt-2 text-label-2">Tjek koden, eller kontakt os, hvis du mener, der er en fejl.</p>
		<a href="/gavekort" class="btn btn-primary mt-6">Til gavekort</a>
	</section>
{:else}
	<section class="mx-auto max-w-2xl px-5 text-center">
		{#if isNew}
			<div class="mx-auto grid size-16 place-items-center rounded-full bg-success text-white" in:scale={{ start: 0.4, duration: 500 }}>
				<Check class="size-8" strokeWidth={3} />
			</div>
			<h1 class="mt-4 font-display text-[2.3rem] font-bold tracking-[-0.035em]">Gavekortet er klar</h1>
			<p class="mt-2 text-label-2">Del det med {card.recipient}, print det — eller vis QR-koden direkte fra skærmen.</p>
		{:else}
			<h1 class="font-display text-[2.3rem] font-bold tracking-[-0.035em]">{card.received ? `Et gavekort til dig, ${card.recipient}` : `Gavekort til ${card.recipient}`}</h1>
			{#if card.sender}<p class="mt-2 text-label-2">Fra {card.sender}</p>{/if}
		{/if}

		<div class="mx-auto mt-10 max-w-md animate-rise">
			<GiftCardVisual amount={card.amount} design={card.design} recipient={card.recipient} sender={card.sender} code={card.code} qrValue={redeemUrl} {scope} />
		</div>

		{#if card.message}
			<blockquote class="mx-auto mt-8 max-w-md font-serif text-[1.25rem] leading-relaxed italic">«{card.message}»</blockquote>
		{/if}

		<div class="card mx-auto mt-8 max-w-md p-5 text-left">
			<dl class="grid grid-cols-2 gap-4 text-[0.95rem]">
				<div><dt class="text-[0.78rem] text-label-2">Saldo</dt><dd class="text-[1.2rem] font-bold">{formatPrice(card.balance)}</dd></div>
				<div><dt class="text-[0.78rem] text-label-2">Gyldigt til</dt><dd class="font-semibold">{formatFullDate(expires)}</dd></div>
				<div class="col-span-2">
					<dt class="text-[0.78rem] text-label-2">Kode</dt>
					<dd class="flex items-center justify-between font-mono text-[1.05rem] font-semibold tracking-wider">
						{card.code}
						<button onclick={copyCode} class="grid size-9 place-items-center rounded-full hover:bg-fill" aria-label="Kopiér kode"><Copy class="size-4" /></button>
					</dd>
				</div>
			</dl>
		</div>

		<div class="no-print mt-6 flex flex-wrap justify-center gap-3">
			<button onclick={share} class="btn btn-secondary"><Share class="size-4" />Del</button>
			<button onclick={() => window.print()} class="btn btn-secondary"><Printer class="size-4" />Print</button>
			<a href={browseHref} class="btn btn-primary">{card.received ? 'Find et kursus' : 'Se kurser'}</a>
		</div>
	</section>
{/if}
