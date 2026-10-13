<script lang="ts">
	import { Award, BellRing, CalendarCheck, Check, Gift, Megaphone, Wallet } from '@lucide/svelte';
	import { scale } from 'svelte/transition';
	import { categories } from '#lib/catalog.ts';
	import { cities } from '#lib/data/categories.ts';
	import { formatNumber, formatPrice } from '#lib/format.ts';

	const COMMISSION_RATE = 0.12;

	let price = $state(700);
	let participantsPerMonth = $state(120);
	let applied = $state(false);
	let form = $state({ name: '', business: '', email: '', city: 'Aarhus', category: 'mad-drikke', about: '' });

	const revenue = $derived(price * participantsPerMonth);
	const payout = $derived(Math.round(revenue * (1 - COMMISSION_RATE)));
	const formValid = $derived(form.name.trim() && form.business.trim() && /\S+@\S+\.\S+/.test(form.email));

	const features = [
		{ icon: CalendarCheck, title: 'Booking og betaling' },
		{ icon: Award, title: 'Automatiske kursusbeviser' },
		{ icon: Gift, title: 'Gavekort med QR' },
		{ icon: BellRing, title: 'Påmindelser og venteliste' },
		{ icon: Wallet, title: 'Udbetaling hver uge' },
		{ icon: Megaphone, title: 'Nye kunder' }
	];


	function apply(event: SubmitEvent) {
		event.preventDefault();
		if (formValid) applied = true;
	}
</script>

<svelte:head>
	<title>For undervisere · Lezzonz</title>
</svelte:head>

<section class="relative mx-auto max-w-6xl px-5">
	<div class="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[30rem] w-[min(60rem,100vw)] -translate-x-1/2 rounded-full bg-brand/15 blur-[120px]"></div>
	<div class="mx-auto max-w-3xl pt-4 text-center animate-rise md:pt-10">
		<h1 class="font-display text-[2.8rem] leading-[1.02] font-bold tracking-[-0.045em] text-balance md:text-[4.2rem]">Fyld dine hold.<br />Vi klarer resten.</h1>
		<div class="mt-8 flex flex-wrap justify-center gap-3">
			<a href="#ansoeg" class="btn btn-brand h-13 px-7 text-[1.05rem]">Kom i gang — det er gratis</a>
			<a href="/dashboard" class="btn btn-secondary h-13 px-7 text-[1.05rem]">Se dashboardet</a>
		</div>
	</div>
</section>

<section class="mx-auto mt-24 max-w-6xl px-5">
	<h2 class="text-center font-display text-[2rem] font-bold tracking-[-0.03em] md:text-[2.6rem]">Alt samlet ét sted</h2>
	<div class="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-3">
		{#each features as feature (feature.title)}
			{@const Icon = feature.icon}
			<div class="card flex flex-col items-start gap-4 p-5 md:flex-row md:items-center">
				<span class="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-[#ffb340] to-brand text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.4)]"><Icon class="size-6" /></span>
				<h3 class="text-[1.05rem] font-semibold tracking-tight">{feature.title}</h3>
			</div>
		{/each}
	</div>
</section>

<section class="mx-auto mt-24 max-w-6xl px-5">
	<div class="card grid gap-10 p-7 md:grid-cols-2 md:p-12">
		<div>
			<h2 class="font-display text-[2rem] leading-tight font-bold tracking-[-0.03em]">Hvad kan du tjene?</h2>
			<label class="mt-8 block">
				<span class="flex justify-between font-medium"><span>Pris pr. deltager</span><span class="tabular-nums">{formatPrice(price)}</span></span>
				<input type="range" min="150" max="3000" step="25" bind:value={price} class="mt-3 w-full accent-[var(--brand)]" />
			</label>
			<label class="mt-6 block">
				<span class="flex justify-between font-medium"><span>Deltagere pr. måned</span><span class="tabular-nums">{formatNumber(participantsPerMonth)}</span></span>
				<input type="range" min="10" max="500" step="5" bind:value={participantsPerMonth} class="mt-3 w-full accent-[var(--brand)]" />
			</label>
		</div>
		<div class="flex flex-col justify-center rounded-[1.5rem] bg-gradient-to-br from-[#1d1d1f] to-[#3a3a3c] p-7 text-white">
			<div class="text-[0.9rem] text-white/70">Omsætning pr. måned</div>
			<div class="font-display text-[2rem] font-bold tabular-nums">{formatPrice(revenue)}</div>
			<div class="mt-5 text-[0.9rem] text-white/70">Udbetalt til dig</div>
			<div class="font-display text-[3rem] leading-none font-bold tracking-tight tabular-nums">{formatPrice(payout)}</div>
			<div class="mt-4 text-[0.82rem] text-white/60">Efter {formatNumber(COMMISSION_RATE * 100)} % gebyr</div>
		</div>
	</div>
</section>


<section id="ansoeg" class="mx-auto mt-24 max-w-3xl scroll-mt-28 px-5">
	<div class="card p-7 md:p-10">
		{#if applied}
			<div class="py-8 text-center" in:scale={{ start: 0.95, duration: 400 }}>
				<div class="mx-auto grid size-16 place-items-center rounded-full bg-success text-white"><Check class="size-8" strokeWidth={3} /></div>
				<h2 class="mt-5 font-display text-[1.8rem] font-bold tracking-tight">Tak, {form.name.split(' ')[0]}!</h2>
				<p class="mx-auto mt-2 max-w-md text-label-2">Vi kontakter dig snart.</p>
				<a href="/dashboard" class="btn btn-primary mt-6">Udforsk dashboardet</a>
			</div>
		{:else}
			<h2 class="font-display text-[1.9rem] font-bold tracking-[-0.03em]">Bliv underviser</h2>
			<form onsubmit={apply} class="mt-7 grid gap-4 sm:grid-cols-2">
				<label><span class="mb-1.5 block text-[0.85rem] font-medium text-label-2">Dit navn</span><input bind:value={form.name} required class="field" /></label>
				<label><span class="mb-1.5 block text-[0.85rem] font-medium text-label-2">Virksomhed</span><input bind:value={form.business} required class="field" /></label>
				<label><span class="mb-1.5 block text-[0.85rem] font-medium text-label-2">E-mail</span><input bind:value={form.email} type="email" required class="field" /></label>
				<label>
					<span class="mb-1.5 block text-[0.85rem] font-medium text-label-2">By</span>
					<select bind:value={form.city} class="field cursor-pointer">{#each cities as city (city)}<option>{city}</option>{/each}<option>Anden by</option></select>
				</label>
				<label class="sm:col-span-2">
					<span class="mb-1.5 block text-[0.85rem] font-medium text-label-2">Kategori</span>
					<select bind:value={form.category} class="field cursor-pointer">{#each categories as category (category.id)}<option value={category.id}>{category.emoji} {category.name}</option>{/each}</select>
				</label>
				<label class="sm:col-span-2">
					<span class="mb-1.5 block text-[0.85rem] font-medium text-label-2">Dit kursus</span>
					<textarea bind:value={form.about} rows="4" class="field h-auto resize-none py-3" placeholder=""></textarea>
				</label>
				<div class="flex items-center gap-4 sm:col-span-2">
					<button class="btn btn-brand" disabled={!formValid}>Send ansøgning</button>
				</div>
			</form>
		{/if}
	</div>
</section>
