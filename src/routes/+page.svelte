<script lang="ts">
	import { ArrowRight, Award, ChevronLeft, ChevronRight, CreditCard, MapPin, Search, Sparkles } from '@lucide/svelte';
	import { goto } from '$app/navigation';
	import { categories, courses, getCourse, getHost, upcomingWithin } from '#lib/catalog.ts';
	import { cities } from '#lib/data/categories.ts';
	import { formatDay, formatMonth, formatPrice, formatShortDate, formatTime, formatDuration } from '#lib/format.ts';
	import CourseCard from '#lib/components/CourseCard.svelte';
	import CourseCover from '#lib/components/CourseCover.svelte';
	import GiftCardVisual from '#lib/components/GiftCardVisual.svelte';
	import Avatar from '#lib/components/Avatar.svelte';
	import SectionHeader from '#lib/components/SectionHeader.svelte';
	import Rating from '#lib/components/Rating.svelte';

	let query = $state('');
	let city = $state('');
	let carousel: HTMLDivElement;

	const popular = [...courses].sort((a, b) => Number(b.featured ?? 0) - Number(a.featured ?? 0) || b.reviewCount - a.reviewCount).slice(0, 10);
	const soon = upcomingWithin(7).slice(0, 6);
	const heroCards = ['napolitansk-pizza', 'banekursus', 'blomsterbinding'].map((slug) => getCourse(slug)!);
	const spotlight = getCourse('napolitansk-pizza')!;
	const spotlightHost = getHost(spotlight.host)!;
	const cityCounts = cities.map((name) => ({ name, count: courses.filter((course) => course.city === name).length }));

	function search(event: SubmitEvent) {
		event.preventDefault();
		const params = new URLSearchParams();
		if (query.trim()) params.set('q', query.trim());
		if (city) params.set('by', city);
		goto(`/kurser${params.size ? `?${params}` : ''}`);
	}

	const scrollCarousel = (direction: number) =>
		carousel.scrollBy({ left: direction * carousel.clientWidth * 0.8, behavior: 'smooth' });
</script>

<svelte:head>
	<title>Lezzonz — Lær noget nyt. I virkeligheden.</title>
</svelte:head>

<section class="relative">
	<div class="pointer-events-none absolute inset-x-0 -top-28 -z-10 h-[46rem] overflow-hidden">
		<div class="absolute top-10 left-[-10%] size-[34rem] rounded-full bg-[#ff9f0a]/25 blur-[120px]"></div>
		<div class="absolute top-40 right-[-8%] size-[30rem] rounded-full bg-[#ff375f]/20 blur-[120px]"></div>
		<div class="absolute top-[26rem] left-[30%] size-[26rem] rounded-full bg-[#5e5ce6]/15 blur-[120px]"></div>
	</div>

	<div class="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] items-center gap-12 px-5 pt-6 pb-10 md:grid-cols-[1.15fr_1fr] md:pt-12 md:pb-20">
		<div class="animate-rise">
			<a href="/gavekort#partnere" class="glass pressable inline-flex items-center gap-2 rounded-full py-1.5 pr-3 pl-1.5 text-[0.85rem] font-medium">
				<span class="rounded-full bg-brand px-2 py-0.5 text-[0.75rem] font-bold text-white">Nyt</span>
				Gavekort i 12 udvalgte butikker
				<ChevronRight class="size-4 text-label-2" />
			</a>
			<h1 class="mt-6 font-display text-[2.6rem] leading-[1.02] font-bold tracking-[-0.045em] text-balance min-[400px]:text-[2.9rem] sm:text-[3.6rem] lg:text-[4.4rem]">
				Lær noget nyt.<br />
				<span class="bg-gradient-to-r from-[#ff9f0a] via-brand to-[#ff375f] bg-clip-text text-transparent">I virkeligheden.</span>
			</h1>
			<p class="mt-5 max-w-xl text-[1.15rem] leading-relaxed text-label-2 md:text-[1.25rem]">
				Håndplukkede kurser og workshops hos dygtige, lokale undervisere. Fra napolitansk pizza og flødeboller til banekørsel og blomsterbinding.
			</p>

			<form onsubmit={search} class="glass mt-8 flex max-w-xl items-center gap-1 rounded-full p-1.5">
				<label class="flex min-w-0 flex-1 items-center gap-2 pl-3">
					<Search class="size-5 shrink-0 text-label-2" />
					<span class="sr-only">Hvad vil du lære?</span>
					<input
						bind:value={query}
						placeholder="Hvad vil du lære?"
						class="h-11 min-w-0 flex-1 bg-transparent text-[1.05rem] outline-none placeholder:text-label-3"
					/>
				</label>
				<label class="hidden items-center gap-1 border-l border-separator pl-3 sm:flex">
					<MapPin class="size-4 text-label-2" />
					<span class="sr-only">By</span>
					<select bind:value={city} class="h-11 cursor-pointer bg-transparent pr-2 text-[0.95rem] font-medium outline-none">
						<option value="">Hele landet</option>
						{#each cities as name (name)}<option value={name}>{name}</option>{/each}
					</select>
				</label>
				<button class="btn btn-primary h-11 px-5">Søg</button>
			</form>

			<div class="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.92rem] text-label-2">
				<span class="flex items-center gap-1.5"><Rating rating={4.9} /> i gennemsnit</span>
				<span>{courses.length} kurser i {cities.length} byer</span>
				<span class="flex items-center gap-1.5"><Award class="size-4 text-accent" /> Kursusbevis på alle kurser</span>
			</div>
		</div>

		<div class="relative hidden h-[34rem] md:block" aria-hidden="true">
			{#each heroCards as course, index (course.slug)}
				<a
					href="/kurser/{course.slug}"
					class="group glass-strong absolute w-56 overflow-hidden rounded-[1.6rem] p-2 animate-float"
					style:--r="{[-7, 5, -3][index]}deg"
					style:left={['0%', '52%', '22%'][index]}
					style:top={['0%', '4%', '52%'][index]}
					style:animation-delay="{index * -2.3}s"
					style:z-index={[1, 2, 3][index]}
					tabindex="-1"
				>
					<CourseCover {course} class="aspect-[4/3] rounded-[1.2rem]" emojiSize="3.6rem" />
					<div class="px-2 pt-3 pb-2">
						<div class="text-[0.72rem] font-semibold tracking-wide text-accent uppercase">{course.city}</div>
						<div class="mt-0.5 line-clamp-1 font-semibold">{course.title}</div>
						<div class="mt-1 flex items-center justify-between text-[0.85rem] text-label-2">
							<span>{formatDuration(course.durationMinutes, course.durationNote)}</span>
							<span class="font-bold text-label">{formatPrice(course.price)}</span>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<section class="mx-auto max-w-6xl px-5">
	<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
		{#each categories as category, index (category.id)}
			<a
				href="/kurser?kategori={category.id}"
				class="card pressable group flex flex-col gap-3 p-4 hover:-translate-y-0.5 hover:shadow-float animate-rise"
				style:animation-delay="{index * 60}ms"
			>
				<span
					class="grid size-12 place-items-center rounded-2xl text-[1.6rem] transition-transform duration-500 ease-spring group-hover:scale-110 group-hover:-rotate-6"
					style:background="color-mix(in srgb, {category.tint} 16%, transparent)"
				>
					{category.emoji}
				</span>
				<span>
					<span class="block font-semibold tracking-tight">{category.name}</span>
					<span class="mt-0.5 line-clamp-2 block text-[0.82rem] leading-snug text-label-2">{category.tagline}</span>
				</span>
			</a>
		{/each}
	</div>
</section>

<section class="mx-auto mt-16 max-w-6xl md:mt-24">
	<div class="flex items-end justify-between px-5">
		<div class="flex-1"><SectionHeader title="Populært lige nu" subtitle="De kurser, alle taler om — book før holdene bliver fulde." href="/kurser" /></div>
	</div>
	<div class="relative">
		<div bind:this={carousel} class="no-scrollbar flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pt-1 pb-8">
			{#each popular as course (course.slug)}
				<CourseCard {course} class="w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-[calc((100%-3rem)/4)]" />
			{/each}
		</div>
		<div class="pointer-events-none absolute inset-x-0 top-[28%] hidden justify-between px-1 lg:flex">
			<button onclick={() => scrollCarousel(-1)} class="glass-strong pressable pointer-events-auto -ml-4 grid size-11 place-items-center rounded-full" aria-label="Forrige">
				<ChevronLeft class="size-5" />
			</button>
			<button onclick={() => scrollCarousel(1)} class="glass-strong pressable pointer-events-auto -mr-4 grid size-11 place-items-center rounded-full" aria-label="Næste">
				<ChevronRight class="size-5" />
			</button>
		</div>
	</div>
</section>

<section class="mx-auto mt-10 max-w-6xl px-5">
	<SectionHeader title="Sker snart" subtitle="Ledige pladser de næste syv dage." href="/kurser?sorter=dato" linkLabel="Se kalender" />
	<div class="grid gap-3 md:grid-cols-2">
		{#each soon as { course, session } (session.id)}
			<a href="/kurser/{course.slug}?hold={session.id}" class="card pressable group flex items-center gap-4 p-3 pr-4 hover:shadow-float">
				<div class="grid w-14 shrink-0 place-items-center rounded-2xl bg-fill-2 py-2 text-center">
					<span class="text-[0.68rem] font-bold tracking-wider text-accent">{formatMonth(session.date)}</span>
					<span class="font-display text-[1.5rem] leading-none font-bold">{formatDay(session.date)}</span>
				</div>
				<CourseCover {course} class="hidden size-14 shrink-0 rounded-2xl sm:block" emojiSize="1.8rem" />
				<div class="min-w-0 flex-1">
					<div class="truncate font-semibold">{course.title}</div>
					<div class="mt-0.5 truncate text-[0.85rem] text-label-2">
						{formatShortDate(session.date)} · {formatTime(session.date)} · {course.city}
					</div>
				</div>
				<div class="shrink-0 text-right">
					<div class="font-bold">{formatPrice(course.price)}</div>
					<div class="text-[0.75rem] {session.spotsLeft <= 3 ? 'font-semibold text-accent' : 'text-label-2'}">
						{session.spotsLeft} {session.spotsLeft === 1 ? 'plads' : 'pladser'}
					</div>
				</div>
			</a>
		{/each}
	</div>
</section>

<section class="mx-auto mt-20 max-w-6xl px-5 md:mt-28">
	<a href="/kurser/{spotlight.slug}" class="group relative block overflow-hidden rounded-[2rem] shadow-float">
		<div class="absolute inset-0"><CourseCover course={spotlight} class="h-full" emojiSize="clamp(7rem, 22vw, 15rem)" emojiClass="items-start justify-center pt-14 md:items-center md:justify-end md:pt-0 md:pr-[10%]" /></div>
		<div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent md:bg-gradient-to-r md:from-black/65 md:via-black/25"></div>
		<div class="relative flex min-h-[38rem] flex-col justify-end p-6 text-white md:min-h-[30rem] md:max-w-[55%] md:justify-center md:p-12">
			<span class="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[0.8rem] font-semibold backdrop-blur-md">
				<Sparkles class="size-3.5" /> Månedens underviser
			</span>
			<h2 class="mt-4 font-display text-[2.2rem] leading-[1.05] font-bold tracking-[-0.035em] md:text-[3rem]">
				Matteo lærer 400 århusianere at bage pizza — hver måned.
			</h2>
			<p class="mt-3 max-w-md text-[1.05rem] text-white/85">
				«Min dej har hævet i 72 timer. Det har jeres tålmodighed ikke. Derfor går vi direkte til det sjove.»
			</p>
			<div class="mt-6 flex items-center gap-3">
				<Avatar initials={spotlightHost.initials} gradient={spotlightHost.gradient} size={44} />
				<div class="text-[0.9rem]">
					<div class="font-semibold">{spotlightHost.person}</div>
					<div class="text-white/75">{spotlightHost.name}</div>
				</div>
				<span class="ml-auto inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-3 whitespace-nowrap font-semibold text-black transition-transform duration-300 group-hover:translate-x-1 md:ml-6">
					Fra {formatPrice(spotlight.price)} <ArrowRight class="size-4" />
				</span>
			</div>
		</div>
	</a>
</section>

<section class="mx-auto mt-20 max-w-6xl px-5 md:mt-28">
	<div class="text-center">
		<h2 class="font-display text-[2rem] font-bold tracking-[-0.03em] md:text-[2.6rem]">Sådan fungerer Lezzonz</h2>
		<p class="mx-auto mt-2 max-w-lg text-label-2 md:text-[1.1rem]">Fra inspiration til kursusbevis på tre enkle trin.</p>
	</div>
	<div class="mt-10 grid gap-4 md:grid-cols-3">
		{#each [
			{ icon: Search, step: '1', title: 'Find dit kursus', text: 'Bliv inspireret af hundredvis af hold i din by. Se pris, varighed og ledige pladser med det samme.' },
			{ icon: CreditCard, step: '2', title: 'Book på et øjeblik', text: 'Betal sikkert med MobilePay, kort eller Apple Pay. Du får din billet på mail og i appen.' },
			{ icon: Award, step: '3', title: 'Mød op — og få beviset', text: 'Efter kurset modtager du automatisk et digitalt kursusbevis, som alle kan verificere.' }
		] as item (item.step)}
			{@const Icon = item.icon}
			<div class="card p-7">
				<div class="flex items-center justify-between">
					<span class="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-[#ffb340] to-brand text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.4)]">
						<Icon class="size-6" strokeWidth={2.2} />
					</span>
					<span class="font-display text-[3rem] leading-none font-bold text-fill">{item.step}</span>
				</div>
				<h3 class="mt-5 text-[1.25rem] font-semibold tracking-tight">{item.title}</h3>
				<p class="mt-2 leading-relaxed text-label-2">{item.text}</p>
			</div>
		{/each}
	</div>
</section>

<section class="mx-auto mt-20 max-w-6xl px-5 md:mt-28">
	<div class="card grid items-center gap-10 overflow-hidden p-7 md:grid-cols-2 md:p-14">
		<div>
			<span class="text-[0.85rem] font-semibold tracking-wide text-accent uppercase">Gavekort</span>
			<h2 class="mt-2 font-display text-[2.1rem] leading-tight font-bold tracking-[-0.03em] md:text-[2.7rem]">Giv en oplevelse.<br />Ikke en ting.</h2>
			<p class="mt-4 max-w-md leading-relaxed text-label-2 md:text-[1.1rem]">
				Et gavekort til Lezzonz kan bruges på alle kurser. Send det på mail med det samme, print det selv — eller køb det med QR-kode hos en af vores 12 partnerbutikker.
			</p>
			<div class="mt-7 flex flex-wrap gap-3">
				<a href="/gavekort" class="btn btn-primary">Køb gavekort</a>
				<a href="/gavekort#partnere" class="btn btn-secondary">Find en butik</a>
			</div>
		</div>
		<div class="relative mx-auto w-full max-w-sm py-6">
			<div class="absolute inset-x-6 top-0 rotate-[8deg] opacity-80">
				<GiftCardVisual amount={500} design="fjord" tilt={false} />
			</div>
			<div class="relative -rotate-[4deg]">
				<GiftCardVisual amount={1000} design="aftenrod" recipient="Emma" sender="Farmor" qrValue="https://lezzonz.dk/gavekort" />
			</div>
		</div>
	</div>
</section>

<section class="mx-auto mt-20 max-w-6xl px-5">
	<SectionHeader title="Find kurser i din by" />
	<div class="flex flex-wrap gap-2">
		{#each cityCounts as item (item.name)}
			<a href="/kurser?by={item.name}" class="card pressable flex items-center gap-2 rounded-full py-2.5 pr-3 pl-4 font-medium hover:shadow-float">
				<MapPin class="size-4 text-accent" />{item.name}
				<span class="rounded-full bg-fill-2 px-2 py-0.5 text-[0.8rem] text-label-2">{item.count}</span>
			</a>
		{/each}
	</div>
</section>

<section class="mx-auto mt-20 max-w-6xl px-5 md:mt-28">
	<div class="relative overflow-hidden rounded-[2rem] bg-[#1d1d1f] p-8 text-white md:p-14 dark:bg-surface">
		<div class="absolute -top-24 -right-24 size-80 rounded-full bg-brand/40 blur-[100px]"></div>
		<div class="relative grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
			<div>
				<h2 class="font-display text-[2rem] leading-tight font-bold tracking-[-0.03em] md:text-[2.6rem]">Underviser du? Fyld dine hold.</h2>
				<p class="mt-3 max-w-lg text-[1.05rem] leading-relaxed text-white/75">
					Slip for Excel-ark, MobilePay-beskeder og manuelle beviser. Lezzonz klarer tilmelding, betaling, påmindelser og kursusbeviser — du klarer undervisningen.
				</p>
			</div>
			<div class="flex flex-wrap gap-3 md:justify-end">
				<a href="/for-undervisere" class="btn bg-white text-black hover:opacity-90">Bliv underviser</a>
				<a href="/dashboard" class="btn bg-white/15 text-white hover:bg-white/25">Se dashboardet</a>
			</div>
		</div>
	</div>
</section>
