<script lang="ts">
	import { Gift, Mail, MapPin, Printer, QrCode as QrIcon, Store } from '@lucide/svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { courses, getCategory, coursesByHost, getCourse, getHost, giftCardPartners } from '#lib/catalog.ts';
	import { demo, SAMPLE_GIFT_CARD_CODE } from '#lib/demo-store.svelte.ts';
	import { formatPrice } from '#lib/format.ts';
	import { giftCardDesigns } from '#lib/giftcard-designs.ts';
	import Avatar from '#lib/components/Avatar.svelte';
	import GiftCardVisual from '#lib/components/GiftCardVisual.svelte';
	import PaymentSheet from '#lib/components/PaymentSheet.svelte';
	import type { GiftCardDesign, PaymentMethod } from '#lib/types.ts';

	type Scope = 'beloeb' | 'kursus' | 'underviser';

	const amounts = [250, 500, 750, 1000, 1500, 2000];
	const requestedCourse = page.url.searchParams.get('kursus');
	const requestedHost = page.url.searchParams.get('vaert');

	let scope = $state<Scope>(requestedCourse && getCourse(requestedCourse) ? 'kursus' : requestedHost && getHost(requestedHost) ? 'underviser' : 'beloeb');
	let amount = $state(500);
	let customAmount = $state('');
	let courseSlug = $state(requestedCourse && getCourse(requestedCourse) ? requestedCourse : 'napolitansk-pizza');
	let persons = $state(2);
	let hostSlug = $state(requestedHost && getHost(requestedHost) ? requestedHost : giftCardPartners[0].slug);
	let design = $state<GiftCardDesign>('aftenrod');
	let recipient = $state('');
	let sender = $state(demo.user.name.split(' ')[0]);
	let message = $state('');
	let delivery = $state<'mail' | 'print'>('mail');
	let recipientEmail = $state('');
	let paymentMethod = $state<PaymentMethod>('mobilepay');
	let stage = $state<'idle' | 'pending' | 'approved'>('idle');
	let submitted = $state(false);
	let redeemCode = $state('');
	let redeemResult = $state<'none' | 'found' | 'missing'>('none');

	const selectedCourse = $derived(getCourse(courseSlug)!);
	const selectedHost = $derived(getHost(hostSlug)!);
	const value = $derived(
		scope === 'kursus' ? selectedCourse.price * persons : Number(customAmount) > 0 ? Math.round(Number(customAmount)) : amount
	);
	const scopeLabel = $derived(
		scope === 'kursus'
			? `${selectedCourse.title}${persons > 1 ? ` · ${persons} personer` : ''}`
			: scope === 'underviser'
				? `Gælder hos ${selectedHost.name}`
				: undefined
	);
	const valid = $derived(value >= 100 && value <= 10000 && recipient.trim().length > 0 && (delivery === 'print' || /\S+@\S+\.\S+/.test(recipientEmail)));
	const redeemed = $derived(redeemResult === 'found' ? demo.findGiftCard(redeemCode) : undefined);

	const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

	async function buy(event: SubmitEvent) {
		event.preventDefault();
		submitted = true;
		if (!valid) return;
		stage = 'pending';
		await wait(1700);
		stage = 'approved';
		await wait(800);
		const card = demo.createGiftCard({
			amount: value,
			design,
			recipient: recipient.trim(),
			sender: sender.trim(),
			message: message.trim(),
			hostSlug: scope === 'underviser' ? hostSlug : undefined,
			courseSlug: scope === 'kursus' ? courseSlug : undefined
		});
		goto(`/gavekort/${card.code}?ny=1`);
	}

	function redeem(event: SubmitEvent) {
		event.preventDefault();
		redeemResult = demo.findGiftCard(redeemCode) ? 'found' : 'missing';
	}
</script>

<svelte:head>
	<title>Gavekort · Lezzonz</title>
</svelte:head>

<section class="mx-auto max-w-6xl px-5">
	<div class="max-w-2xl animate-rise">
		<h1 class="font-display text-[2.6rem] leading-[1.05] font-bold tracking-[-0.04em] md:text-[3.4rem]">Giv en oplevelse</h1>
	</div>

	<form onsubmit={buy} novalidate class="mt-10 flex flex-col gap-6 lg:grid lg:grid-cols-[1fr_440px] lg:gap-12">
		<div class="contents lg:col-start-2 lg:row-start-1 lg:block">
			<div class="contents lg:sticky lg:top-28 lg:block">
				<GiftCardVisual class="order-1" amount={value} {design} recipient={recipient || 'Modtager'} sender={sender} scope={scopeLabel} qrValue="https://lezzonz.dk/gavekort" />
				{#if message}
					<div class="card order-1 p-5 lg:mt-4 text-[0.95rem] leading-relaxed italic">«{message}»</div>
				{/if}
				<div class="card order-3 p-5 lg:mt-4">
					<div class="flex items-center justify-between text-[1.1rem] font-bold"><span>I alt</span><span>{formatPrice(value)}</span></div>
					<div class="mt-4 grid grid-cols-3 gap-2" role="radiogroup" aria-label="Betalingsmetode">
						{#each [
							{ id: 'mobilepay', label: 'MobilePay' },
							{ id: 'applepay', label: 'Apple Pay' },
							{ id: 'card', label: 'Kort' }
						] as option (option.id)}
							<button type="button" role="radio" aria-checked={paymentMethod === option.id} onclick={() => (paymentMethod = option.id as PaymentMethod)} class="pressable h-11 rounded-xl border-2 text-[0.85rem] font-semibold {paymentMethod === option.id ? 'border-brand bg-brand/5' : 'border-transparent bg-fill-2'}">
								{option.label}
							</button>
						{/each}
					</div>
					<button class="btn btn-brand mt-4 w-full" disabled={stage !== 'idle'}>
						<Gift class="size-4" />Køb gavekort · {formatPrice(value)}
					</button>
					{#if submitted && !valid}
						<p class="mt-3 text-center text-[0.88rem] text-[#ff3b30]">Udfyld modtager{delivery === 'mail' ? ' og e-mail' : ''}</p>
					{/if}
				</div>
			</div>
		</div>

		<div class="order-2 space-y-6 lg:col-start-1 lg:row-start-1">
			<section class="card p-6">
				<h2 class="text-[1.15rem] font-semibold">Vælg gavekort</h2>
				<div class="mt-4 grid grid-cols-3 rounded-2xl bg-fill-2 p-1">
					{#each [
						{ id: 'beloeb', label: 'Frit beløb' },
						{ id: 'kursus', label: 'Et kursus' },
						{ id: 'underviser', label: 'En butik' }
					] as option (option.id)}
						<button type="button" onclick={() => (scope = option.id as Scope)} class="h-10 rounded-xl text-[0.9rem] font-semibold transition-all {scope === option.id ? 'bg-surface shadow-card' : 'text-label-2'}">
							{option.label}
						</button>
					{/each}
				</div>

				{#if scope === 'kursus'}
					<label class="mt-5 block">
						<span class="mb-1.5 block text-[0.85rem] font-medium text-label-2">Kursus</span>
						<select bind:value={courseSlug} class="field cursor-pointer">
							{#each courses as course (course.slug)}<option value={course.slug}>{course.title} — {formatPrice(course.price)}</option>{/each}
						</select>
					</label>
					<div class="mt-4 flex items-center justify-between">
						<span class="font-medium">Antal personer</span>
						<div class="flex gap-1.5">
							{#each [1, 2, 3, 4] as count (count)}
								<button type="button" onclick={() => (persons = count)} class="pressable size-10 rounded-full font-semibold {persons === count ? 'bg-label text-bg' : 'bg-fill-2'}">{count}</button>
							{/each}
						</div>
					</div>
				{:else}
					{#if scope === 'underviser'}
						<label class="mt-5 block">
							<span class="mb-1.5 block text-[0.85rem] font-medium text-label-2">Butik eller underviser</span>
							<select bind:value={hostSlug} class="field cursor-pointer">
								{#each giftCardPartners as partner (partner.slug)}<option value={partner.slug}>{partner.name} — {partner.city}</option>{/each}
							</select>
						</label>
					{/if}
					<div class="mt-5 grid grid-cols-3 gap-2">
						{#each amounts as option (option)}
							<button
								type="button"
								onclick={() => {
									amount = option;
									customAmount = '';
								}}
								class="pressable h-12 rounded-2xl font-semibold {amount === option && !customAmount ? 'bg-label text-bg' : 'bg-fill-2 hover:bg-fill'}"
							>
								{formatPrice(option)}
							</button>
						{/each}
					</div>
					<label class="mt-3 block">
						<span class="sr-only">Andet beløb</span>
						<input bind:value={customAmount} type="number" inputmode="numeric" min="100" max="10000" placeholder="Andet beløb (kr.)" class="field" />
					</label>
				{/if}
			</section>

			<section class="card p-6">
				<h2 class="text-[1.15rem] font-semibold">Design</h2>
				<div class="mt-4 grid grid-cols-4 gap-3">
					{#each Object.entries(giftCardDesigns) as [id, option] (id)}
						<button type="button" onclick={() => (design = id as GiftCardDesign)} class="group flex flex-col items-center gap-2" aria-pressed={design === id}>
							<span class="aspect-[1.586] w-full rounded-xl ring-offset-2 ring-offset-surface transition-all {design === id ? 'ring-2 ring-brand' : ''}" style:background={option.background}></span>
							<span class="text-[0.8rem] font-medium {design === id ? '' : 'text-label-2'}">{option.name}</span>
						</button>
					{/each}
				</div>
			</section>

			<section class="card p-6">
				<h2 class="text-[1.15rem] font-semibold">Hilsen</h2>
				<div class="mt-4 grid gap-3 sm:grid-cols-2">
					<label>
						<span class="mb-1.5 block text-[0.85rem] font-medium text-label-2">Til</span>
						<input bind:value={recipient} placeholder="Modtagerens navn" class="field {submitted && !recipient.trim() ? 'border-[#ff3b30]' : ''}" />
					</label>
					<label>
						<span class="mb-1.5 block text-[0.85rem] font-medium text-label-2">Fra</span>
						<input bind:value={sender} placeholder="Dit navn" class="field" />
					</label>
				</div>
				<label class="mt-3 block">
					<span class="mb-1.5 block text-[0.85rem] font-medium text-label-2">Hilsen</span>
					<textarea bind:value={message} maxlength="240" rows="3" placeholder="Skriv en hilsen" class="field h-auto resize-none py-3"></textarea>
				</label>
			</section>

			<section class="card p-6">
				<h2 class="text-[1.15rem] font-semibold">Levering</h2>
				<div class="mt-4 grid gap-2 sm:grid-cols-2">
					<button type="button" onclick={() => (delivery = 'mail')} class="pressable flex items-center gap-3 rounded-2xl border-2 p-4 text-left {delivery === 'mail' ? 'border-brand bg-brand/5' : 'border-transparent bg-fill-2'}">
						<Mail class="size-5 text-accent" /><span class="font-semibold">Send på mail</span>
					</button>
					<button type="button" onclick={() => (delivery = 'print')} class="pressable flex items-center gap-3 rounded-2xl border-2 p-4 text-left {delivery === 'print' ? 'border-brand bg-brand/5' : 'border-transparent bg-fill-2'}">
						<Printer class="size-5 text-accent" /><span class="font-semibold">Print selv</span>
					</button>
				</div>
				{#if delivery === 'mail'}
					<label class="mt-3 block">
						<span class="sr-only">Modtagerens e-mail</span>
						<input bind:value={recipientEmail} type="email" placeholder="Modtagerens e-mail" class="field {submitted && !/\S+@\S+\.\S+/.test(recipientEmail) ? 'border-[#ff3b30]' : ''}" />
					</label>
				{/if}
			</section>
		</div>
	</form>
</section>

<section class="mx-auto mt-16 max-w-6xl px-5">
	<div class="card grid gap-6 p-6 md:grid-cols-[1fr_1.2fr] md:items-center md:p-10">
		<div>
			<h2 class="font-display text-[1.7rem] font-bold tracking-tight">Har du et gavekort?</h2>
		</div>
		<div>
			<form onsubmit={redeem} class="flex gap-2">
				<input bind:value={redeemCode} oninput={() => (redeemResult = 'none')} placeholder="GAVE-XXXX-XXXX" class="field font-mono uppercase" />
				<button class="btn btn-primary">Tjek</button>
			</form>
			{#if redeemed}
				<div class="mt-3 flex items-center justify-between rounded-2xl bg-success/10 p-4">
					<span><span class="block font-semibold text-success">Saldo: {formatPrice(redeemed.balance)}</span><span class="text-[0.85rem] text-label-2">Fra {redeemed.sender}</span></span>
					<a href="/gavekort/{redeemed.code}" class="font-semibold text-accent">Se gavekort ›</a>
				</div>
			{:else if redeemResult === 'missing'}
				<p class="mt-3 text-[0.9rem] text-[#ff3b30]">Ukendt kode.</p>
			{:else}
				<button type="button" onclick={() => (redeemCode = SAMPLE_GIFT_CARD_CODE)} class="mt-2 text-[0.8rem] text-label-3 hover:text-label-2">Demo: prøv {SAMPLE_GIFT_CARD_CODE}</button>
			{/if}
		</div>
	</div>
</section>

<section id="partnere" class="mx-auto mt-20 max-w-6xl scroll-mt-28 px-5">
	<div>
		<span class="inline-flex items-center gap-1.5 text-[0.85rem] font-semibold tracking-wide text-accent uppercase"><Store class="size-4" /> I butikkerne</span>
		<h2 class="mt-2 font-display text-[2rem] leading-tight font-bold tracking-[-0.03em] md:text-[2.5rem]">Køb i butikken</h2>
	</div>

	<div class="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
		{#each giftCardPartners as partner (partner.slug)}
			{@const category = getCategory(coursesByHost(partner.slug)[0]?.category ?? 'mad-drikke')}
			<div class="card flex flex-col p-5">
				<div class="flex items-center gap-3">
					<Avatar initials={partner.initials} gradient={partner.gradient} size={48} />
					<div class="min-w-0">
						<div class="truncate font-semibold">{partner.giftCardPartner.storeName}</div>
						<div class="flex items-center gap-1 truncate text-[0.85rem] text-label-2"><MapPin class="size-3.5 shrink-0" />{partner.giftCardPartner.address}</div>
					</div>
					<span class="ml-auto text-xl">{category.emoji}</span>
				</div>
				<div class="mt-4 flex gap-2">
					<a href="/gavekort?vaert={partner.slug}" onclick={() => { scope = 'underviser'; hostSlug = partner.slug; window.scrollTo({ top: 0, behavior: 'smooth' }); }} class="btn btn-secondary h-9 flex-1 px-3 text-[0.85rem]"><Gift class="size-4" />Køb gavekort</a>
					<a href="/display/{partner.slug}" class="btn btn-secondary h-9 px-3 text-[0.85rem]" title="Se butiksdisplay"><QrIcon class="size-4" />Display</a>
				</div>
			</div>
		{/each}
	</div>
</section>


<PaymentSheet {stage} method={paymentMethod} amount={value} />
