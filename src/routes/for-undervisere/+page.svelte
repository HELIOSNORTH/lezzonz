<script lang="ts">
	import { Award, BellRing, CalendarCheck, Check, Gift, Megaphone, Wallet, X } from '@lucide/svelte';
	import { scale } from 'svelte/transition';
	import { categories } from '#lib/catalog.ts';
	import { cities } from '#lib/data/categories.ts';
	import { formatNumber, formatPrice } from '#lib/format.ts';
	import Avatar from '#lib/components/Avatar.svelte';

	const COMMISSION_RATE = 0.12;

	let price = $state(700);
	let participantsPerMonth = $state(120);
	let applied = $state(false);
	let form = $state({ name: '', business: '', email: '', city: 'Aarhus', category: 'mad-drikke', about: '' });

	const revenue = $derived(price * participantsPerMonth);
	const payout = $derived(Math.round(revenue * (1 - COMMISSION_RATE)));
	const formValid = $derived(form.name.trim() && form.business.trim() && /\S+@\S+\.\S+/.test(form.email));

	const features = [
		{ icon: CalendarCheck, title: 'Booking og betaling', text: 'Online tilmelding døgnet rundt. Kunderne betaler med MobilePay, kort eller Apple Pay — pengene er sikret, før holdet starter.' },
		{ icon: Award, title: 'Automatiske kursusbeviser', text: 'Markér fremmøde med et tryk, og alle deltagere får et personligt, verificerbart kursusbevis. Slut med Word-skabeloner.' },
		{ icon: Gift, title: 'Gavekort med QR i butikken', text: 'Vi leverer et flot display til disken. Kunderne scanner, betaler og giver gaven videre — uden at du løfter en finger.' },
		{ icon: BellRing, title: 'Påmindelser og venteliste', text: 'Automatiske påmindelser dagen før, og ledige pladser går direkte til ventelisten ved afbud.' },
		{ icon: Wallet, title: 'Udbetaling hver uge', text: 'Overblik over salg, gebyrer og udbetalinger. Klar til bogføring og eksport til dit regnskabsprogram.' },
		{ icon: Megaphone, title: 'Nye kunder', text: 'Bliv fundet af folk, der leder efter oplevelser i din by — og af virksomheder, der planlægger firmaarrangementer.' }
	];

	const before = ['Tilmeldinger i Excel og på Messenger', 'MobilePay-beskeder, der skal matches', 'Kursusbeviser lavet i hånden', 'Afbud, der ikke bliver fyldt op'];
	const after = ['Én oversigt over alle hold og deltagere', 'Betaling sikret ved booking', 'Kursusbeviser sendt automatisk', 'Venteliste fylder ledige pladser'];

	function apply(event: SubmitEvent) {
		event.preventDefault();
		if (formValid) applied = true;
	}
</script>

<svelte:head>
	<title>For undervisere · Lezzonz</title>
</svelte:head>

<section class="relative mx-auto max-w-6xl overflow-x-clip px-5">
	<div class="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-brand/15 blur-[120px]"></div>
	<div class="mx-auto max-w-3xl pt-4 text-center animate-rise md:pt-10">
		<span class="text-[0.85rem] font-semibold tracking-wide text-accent uppercase">For undervisere og butikker</span>
		<h1 class="mt-3 font-display text-[2.8rem] leading-[1.02] font-bold tracking-[-0.045em] text-balance md:text-[4.2rem]">Fyld dine hold.<br />Vi klarer resten.</h1>
		<p class="mx-auto mt-5 max-w-2xl text-[1.15rem] leading-relaxed text-label-2 md:text-[1.25rem]">
			Lezzonz samler tilmelding, betaling, påmindelser, gavekort og kursusbeviser ét sted — så du kan bruge tiden på det, du er god til.
		</p>
		<div class="mt-8 flex flex-wrap justify-center gap-3">
			<a href="#ansoeg" class="btn btn-brand h-13 px-7 text-[1.05rem]">Kom i gang — det er gratis</a>
			<a href="/dashboard" class="btn btn-secondary h-13 px-7 text-[1.05rem]">Se dashboardet</a>
		</div>
	</div>

	<div class="mt-16 grid gap-4 md:grid-cols-2">
		<div class="card p-7">
			<h2 class="text-[1.1rem] font-semibold text-label-2">I dag</h2>
			<ul class="mt-4 space-y-3">
				{#each before as item (item)}
					<li class="flex items-center gap-3 text-[1.02rem]"><span class="grid size-6 shrink-0 place-items-center rounded-full bg-fill text-label-2"><X class="size-3.5" strokeWidth={3} /></span>{item}</li>
				{/each}
			</ul>
		</div>
		<div class="card relative overflow-hidden p-7 ring-2 ring-brand/40">
			<div class="absolute -top-16 -right-16 size-48 rounded-full bg-brand/20 blur-3xl"></div>
			<h2 class="relative text-[1.1rem] font-semibold text-accent">Med Lezzonz</h2>
			<ul class="relative mt-4 space-y-3">
				{#each after as item (item)}
					<li class="flex items-center gap-3 text-[1.02rem] font-medium"><span class="grid size-6 shrink-0 place-items-center rounded-full bg-brand text-white"><Check class="size-3.5" strokeWidth={3} /></span>{item}</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

<section class="mx-auto mt-24 max-w-6xl px-5">
	<h2 class="text-center font-display text-[2rem] font-bold tracking-[-0.03em] md:text-[2.6rem]">Alt, du skal bruge</h2>
	<div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each features as feature (feature.title)}
			{@const Icon = feature.icon}
			<div class="card p-7">
				<span class="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-[#ffb340] to-brand text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.4)]"><Icon class="size-6" /></span>
				<h3 class="mt-5 text-[1.15rem] font-semibold tracking-tight">{feature.title}</h3>
				<p class="mt-2 leading-relaxed text-label-2">{feature.text}</p>
			</div>
		{/each}
	</div>
</section>

<section class="mx-auto mt-24 max-w-6xl px-5">
	<div class="card grid gap-10 p-7 md:grid-cols-2 md:p-12">
		<div>
			<h2 class="font-display text-[2rem] leading-tight font-bold tracking-[-0.03em]">Hvad kan du tjene?</h2>
			<p class="mt-2 text-label-2">Ingen opstartsgebyr og intet abonnement. Du betaler kun, når du sælger en plads.</p>
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
			<div class="mt-4 text-[0.82rem] text-white/60">Efter {formatNumber(COMMISSION_RATE * 100)} % i Lezzonz-gebyr inkl. betalingsgebyrer.</div>
		</div>
	</div>
</section>

<section class="mx-auto mt-24 max-w-4xl px-5 text-center">
	<blockquote class="font-display text-[1.6rem] leading-snug font-semibold tracking-[-0.02em] text-balance md:text-[2.1rem]">
		«Før brugte jeg hver søndag på at matche MobilePay-beskeder med navne i et regneark. Nu er holdene fulde, og jeg bager pizza i stedet.»
	</blockquote>
	<div class="mt-6 inline-flex items-center gap-3">
		<Avatar initials="MR" gradient={['#ff9a5a', '#ff4d2e']} size={48} />
		<div class="text-left"><div class="font-semibold">Matteo Rossi</div><div class="text-[0.9rem] text-label-2">Pizzaskolen Aarhus · 400 elever om måneden</div></div>
	</div>
</section>

<section id="ansoeg" class="mx-auto mt-24 max-w-3xl scroll-mt-28 px-5">
	<div class="card p-7 md:p-10">
		{#if applied}
			<div class="py-8 text-center" in:scale={{ start: 0.95, duration: 400 }}>
				<div class="mx-auto grid size-16 place-items-center rounded-full bg-success text-white"><Check class="size-8" strokeWidth={3} /></div>
				<h2 class="mt-5 font-display text-[1.8rem] font-bold tracking-tight">Tak, {form.name.split(' ')[0]}!</h2>
				<p class="mx-auto mt-2 max-w-md text-label-2">Vi har modtaget din ansøgning og kontakter dig inden for to hverdage på {form.email}. I mellemtiden kan du se, hvordan dashboardet fungerer.</p>
				<a href="/dashboard" class="btn btn-primary mt-6">Udforsk dashboardet</a>
			</div>
		{:else}
			<h2 class="font-display text-[1.9rem] font-bold tracking-[-0.03em]">Bliv underviser på Lezzonz</h2>
			<p class="mt-2 text-label-2">Fortæl os lidt om dig og dit kursus. Det tager to minutter.</p>
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
					<span class="mb-1.5 block text-[0.85rem] font-medium text-label-2">Fortæl om dit kursus</span>
					<textarea bind:value={form.about} rows="4" class="field h-auto resize-none py-3" placeholder="Hvad lærer deltagerne, hvor lang tid tager det, og hvad koster det?"></textarea>
				</label>
				<div class="flex items-center gap-4 sm:col-span-2">
					<button class="btn btn-brand" disabled={!formValid}>Send ansøgning</button>
					<span class="text-[0.85rem] text-label-3">Gratis at oprette. Ingen binding.</span>
				</div>
			</form>
		{/if}
	</div>
</section>
