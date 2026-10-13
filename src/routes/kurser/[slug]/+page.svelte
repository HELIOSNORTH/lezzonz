<script lang="ts">
	import {
		Award,
		BadgeCheck,
		CalendarDays,
		Check,
		ChevronLeft,
		ChevronRight,
		Clock,
		Gift,
		Languages,
		MapPin,
		Minus,
		Navigation,
		Plus,
		Share,
		ShieldCheck,
		Signal,
		Users,
		UserRound
	} from '@lucide/svelte';
	import { page } from '$app/state';
	import { courses, datedSessions } from '#lib/catalog.ts';
	import { reviewsByCategory } from '#lib/data/reviews.ts';
	import { demo } from '#lib/demo-store.svelte.ts';
	import { formatDuration, formatLongDate, formatPrice, formatShortDate, formatTime, formatNumber, formatRating } from '#lib/format.ts';
	import { showToast } from '#lib/toast.svelte.ts';
	import Avatar from '#lib/components/Avatar.svelte';
	import CourseCard from '#lib/components/CourseCard.svelte';
	import CourseCover from '#lib/components/CourseCover.svelte';
	import FavoriteButton from '#lib/components/FavoriteButton.svelte';
	import Rating from '#lib/components/Rating.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const { course, host, category } = $derived(data);

	const sessions = $derived(
		datedSessions(course).map((session) => ({
			...session,
			spotsLeft: Math.max(0, session.spotsLeft - demo.seatsTaken(session.id))
		}))
	);
	const reviews = $derived(reviewsByCategory[course.category]);
	const related = $derived(courses.filter((item) => item.category === course.category && item.slug !== course.slug).slice(0, 3));

	let selectedId = $state('');
	let participants = $state(1);

	$effect.pre(() => {
		const requested = page.url.searchParams.get('hold');
		const firstAvailable = sessions.find((session) => session.spotsLeft > 0);
		const match = sessions.find((session) => session.id === requested && session.spotsLeft > 0);
		selectedId = (match ?? firstAvailable)?.id ?? '';
		participants = 1;
	});

	const selected = $derived(sessions.find((session) => session.id === selectedId));
	const maxParticipants = $derived(Math.min(selected?.spotsLeft ?? 1, 8));
	const total = $derived(course.price * participants);
	const bookHref = $derived(`/kurser/${course.slug}/book?hold=${selectedId}&antal=${participants}`);
	const mapsHref = $derived(`https://maps.google.com/?q=${encodeURIComponent(course.address)}`);

	const facts = $derived([
		{ icon: Clock, label: 'Varighed', value: formatDuration(course.durationMinutes, course.durationNote) },
		{ icon: Users, label: 'Maks. holdstørrelse', value: `${course.capacity} personer` },
		{ icon: Signal, label: 'Niveau', value: course.level },
		{ icon: UserRound, label: 'Alder', value: course.minAge ? `Fra ${course.minAge} år` : 'Alle aldre' },
		{ icon: Languages, label: 'Sprog', value: 'Dansk' },
		{ icon: Award, label: 'Kursusbevis', value: 'Inkluderet' }
	]);

	async function share() {
		const url = location.href.split('?')[0];
		if (navigator.share) {
			try {
				await navigator.share({ title: course.title, text: course.summary, url });
			} catch {
				return;
			}
		} else {
			await navigator.clipboard?.writeText(url);
			showToast('Link kopieret');
		}
	}
</script>

<svelte:head>
	<title>{course.title} · {host.name} · Lezzonz</title>
	<meta name="description" content={course.summary} />
</svelte:head>

<article class="mx-auto max-w-6xl px-5 pb-28 lg:pb-0">
	<a href="/kurser?kategori={course.category}" class="inline-flex items-center gap-0.5 text-[0.95rem] font-medium text-accent hover:underline">
		<ChevronLeft class="size-4" strokeWidth={2.5} />{category.name}
	</a>

	<div class="relative mt-4 animate-rise">
		<CourseCover {course} class="aspect-[4/3] rounded-[2rem] shadow-card sm:aspect-[2/1] lg:aspect-[21/8]" emojiSize="clamp(6rem, 18vw, 11rem)" />
		<div class="absolute top-4 right-4 flex gap-2">
			<button onclick={share} class="glass pressable grid size-10 place-items-center rounded-full" aria-label="Del kursus">
				<Share class="size-[18px]" strokeWidth={2.2} />
			</button>
			<FavoriteButton slug={course.slug} />
		</div>
	</div>

	<div class="mt-8 grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-14">
		<header class="lg:col-start-1">
			<span class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.82rem] font-semibold" style:background="color-mix(in srgb, {category.tint} 16%, transparent)">
				{category.emoji} {category.name}
			</span>
			<h1 class="mt-3 font-display text-[2.2rem] leading-[1.08] font-bold tracking-[-0.035em] text-balance md:text-[2.9rem]">{course.title}</h1>
			<p class="mt-3 text-[1.1rem] leading-relaxed text-label-2 md:text-[1.2rem]">{course.summary}</p>
			<div class="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.95rem]">
				<Rating rating={course.rating} count={course.reviewCount} />
				<span class="inline-flex items-center gap-1 text-label-2"><MapPin class="size-4" />{course.venue}, {course.city}</span>
				<a href="/undervisere/{host.slug}" class="inline-flex items-center gap-2 font-medium hover:underline">
					<Avatar initials={host.initials} gradient={host.gradient} size={26} />{host.person}
				</a>
			</div>

			<div class="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
				{#each facts as fact (fact.label)}
					{@const Icon = fact.icon}
					<div class="card flex items-center gap-3 rounded-2xl p-4">
						<Icon class="size-5 shrink-0 text-accent" strokeWidth={2.2} />
						<div class="min-w-0">
							<div class="text-[0.75rem] text-label-2">{fact.label}</div>
							<div class="truncate text-[0.95rem] font-semibold">{fact.value}</div>
						</div>
					</div>
				{/each}
			</div>
		</header>

		<aside id="book" class="lg:sticky lg:top-28 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
			<div class="card p-5 md:p-6">
				<div class="flex items-baseline justify-between">
					<div>
						<span class="font-display text-[1.8rem] font-bold tracking-tight">{formatPrice(course.price)}</span>
						<span class="text-label-2"> / person</span>
					</div>
					<span class="text-[0.85rem] text-label-2">{formatDuration(course.durationMinutes, course.durationNote)}</span>
				</div>

				<h2 class="mt-5 mb-2 flex items-center gap-2 text-[0.9rem] font-semibold"><CalendarDays class="size-4 text-accent" /> Vælg hold</h2>
				<div class="space-y-2" role="radiogroup" aria-label="Vælg hold">
					{#each sessions as session (session.id)}
						{@const soldOut = session.spotsLeft === 0}
						<button
							role="radio"
							aria-checked={selectedId === session.id}
							disabled={soldOut}
							onclick={() => {
								selectedId = session.id;
								participants = Math.min(participants, Math.min(session.spotsLeft, 8));
							}}
							class="pressable flex w-full items-center justify-between gap-3 rounded-2xl border-2 px-4 py-3 text-left transition-colors {selectedId === session.id
								? 'border-brand bg-brand/5'
								: 'border-transparent bg-fill-2 hover:bg-fill'} {soldOut ? 'opacity-50' : ''}"
						>
							<span>
								<span class="block font-semibold">{formatShortDate(session.date)}</span>
								<span class="text-[0.85rem] text-label-2">{formatTime(session.date)}</span>
							</span>
							<span class="text-right text-[0.82rem] font-semibold {soldOut ? 'text-label-2' : session.spotsLeft <= 3 ? 'text-accent' : 'text-success'}">
								{soldOut ? 'Udsolgt' : `${session.spotsLeft} ${session.spotsLeft === 1 ? 'plads' : 'pladser'} ledige`}
							</span>
						</button>
					{/each}
				</div>

				<div class="mt-5 flex items-center justify-between">
					<span class="font-semibold">Deltagere</span>
					<div class="flex items-center gap-1 rounded-full bg-fill-2 p-1">
						<button onclick={() => (participants = Math.max(1, participants - 1))} disabled={participants <= 1} class="pressable grid size-9 place-items-center rounded-full bg-surface shadow-card disabled:opacity-40" aria-label="Færre deltagere">
							<Minus class="size-4" strokeWidth={2.5} />
						</button>
						<span class="w-8 text-center font-semibold tabular-nums" aria-live="polite">{participants}</span>
						<button onclick={() => (participants = Math.min(maxParticipants, participants + 1))} disabled={participants >= maxParticipants} class="pressable grid size-9 place-items-center rounded-full bg-surface shadow-card disabled:opacity-40" aria-label="Flere deltagere">
							<Plus class="size-4" strokeWidth={2.5} />
						</button>
					</div>
				</div>

				<div class="mt-5 flex items-center justify-between border-t border-separator pt-4">
					<span class="text-label-2">I alt</span>
					<span class="text-[1.25rem] font-bold">{formatPrice(total)}</span>
				</div>

				<a href={selected ? bookHref : undefined} aria-disabled={!selected} class="btn btn-brand mt-4 w-full text-[1.05rem] {selected ? '' : 'pointer-events-none opacity-40'}">
					Book {participants === 1 ? 'plads' : `${participants} pladser`}
				</a>
				<ul class="mt-4 space-y-1.5 text-[0.85rem] text-label-2">
					<li class="flex items-center gap-2"><ShieldCheck class="size-4 text-success" /> Gratis afbestilling indtil 48 timer før</li>
					<li class="flex items-center gap-2"><BadgeCheck class="size-4 text-success" /> MobilePay, kort og Apple Pay</li>
				</ul>
			</div>
			<a href="/gavekort?kursus={course.slug}" class="card pressable mt-3 flex items-center gap-3 rounded-2xl p-4 hover:shadow-float">
				<span class="grid size-10 place-items-center rounded-xl bg-brand/10 text-accent"><Gift class="size-5" /></span>
				<span class="flex-1">
					<span class="block font-semibold">Giv kurset i gave</span>
					<span class="text-[0.85rem] text-label-2">Gavekort med QR-kode — klar med det samme</span>
				</span>
				<ChevronRight class="size-5 text-label-3" />
			</a>
		</aside>

		<div class="space-y-12 lg:col-start-1 lg:row-start-2">
			<section>
				<h2 class="text-[1.5rem] font-bold tracking-tight">Om kurset</h2>
				{#each course.description as paragraph, index (index)}
					<p class="mt-3 text-[1.05rem] leading-relaxed text-label-2">{paragraph}</p>
				{/each}
			</section>

			<section class="grid gap-4 md:grid-cols-2">
				<div class="card p-6">
					<h2 class="text-[1.15rem] font-semibold">Det lærer du</h2>
					<ul class="mt-4 space-y-3">
						{#each course.learn as item (item)}
							<li class="flex gap-3"><span class="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand text-white"><Check class="size-3" strokeWidth={3.5} /></span>{item}</li>
						{/each}
					</ul>
				</div>
				<div class="card p-6">
					<h2 class="text-[1.15rem] font-semibold">Inkluderet i prisen</h2>
					<ul class="mt-4 space-y-3">
						{#each course.includes as item (item)}
							<li class="flex gap-3"><span class="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-success text-white"><Check class="size-3" strokeWidth={3.5} /></span>{item}</li>
						{/each}
					</ul>
					{#if course.bring}
						<h3 class="mt-6 text-[0.95rem] font-semibold">Medbring</h3>
						<ul class="mt-2 space-y-1 text-label-2">
							{#each course.bring as item (item)}<li>· {item}</li>{/each}
						</ul>
					{/if}
				</div>
			</section>

			<section class="card overflow-hidden">
				<div class="flex flex-col gap-6 p-6 sm:flex-row">
					<div class="relative h-40 overflow-hidden rounded-2xl bg-[#e9efe6] sm:h-auto sm:w-56 dark:bg-[#1f2a22]" aria-hidden="true">
						<div class="absolute inset-0 opacity-60 [background-image:linear-gradient(var(--separator)_1px,transparent_1px),linear-gradient(90deg,var(--separator)_1px,transparent_1px)] [background-size:22px_22px]"></div>
						<div class="absolute top-[30%] -left-6 h-5 w-[140%] rotate-[-14deg] bg-white/80 dark:bg-white/10"></div>
						<div class="absolute top-0 left-[58%] h-full w-4 rotate-[8deg] bg-white/80 dark:bg-white/10"></div>
						<div class="absolute top-[62%] -left-4 h-10 w-[60%] rounded-full bg-[#9bd7ff]/70 blur-[2px]"></div>
						<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
							<span class="grid size-11 place-items-center rounded-full rounded-br-none bg-brand text-xl shadow-float rotate-45"><span class="-rotate-45">{course.emoji}</span></span>
						</div>
					</div>
					<div class="flex-1">
						<h2 class="text-[1.15rem] font-semibold">Her foregår det</h2>
						<p class="mt-2 font-medium">{course.venue}</p>
						<p class="text-label-2">{course.address}</p>
						<a href={mapsHref} target="_blank" rel="noopener noreferrer" class="btn btn-secondary mt-4 h-10 px-4 text-[0.9rem]">
							<Navigation class="size-4" /> Vis rute
						</a>
					</div>
				</div>
			</section>

			<section class="card p-6">
				<div class="flex flex-col gap-6 sm:flex-row sm:items-start">
					<Avatar initials={host.initials} gradient={host.gradient} size={72} />
					<div class="flex-1">
						<div class="text-[0.8rem] font-semibold tracking-wide text-accent uppercase">Din underviser</div>
						<h2 class="mt-1 text-[1.3rem] font-bold tracking-tight">{host.person}</h2>
						<p class="text-label-2">{host.role} · {host.name} · Underviser siden {host.since}</p>
						<p class="mt-3 leading-relaxed">{host.bio}</p>
						<a href="/undervisere/{host.slug}" class="mt-4 inline-flex items-center gap-1 font-semibold text-accent hover:underline">
							Se alle kurser fra {host.name}<ChevronRight class="size-4" />
						</a>
					</div>
				</div>
			</section>

			<section>
				<div class="flex items-end justify-between">
					<h2 class="text-[1.5rem] font-bold tracking-tight">Anmeldelser</h2>
					<span class="text-label-2">{formatNumber(course.reviewCount)} anmeldelser</span>
				</div>
				<div class="mt-4 flex items-center gap-4">
					<span class="font-display text-[3.4rem] leading-none font-bold tracking-tight">{formatRating(course.rating)}</span>
					<div>
						<div class="text-[1.1rem] tracking-[0.15em] text-[#ff9f0a]">★★★★★</div>
						<div class="text-[0.9rem] text-label-2">Verificerede deltagere</div>
					</div>
				</div>
				<div class="mt-6 grid gap-3 md:grid-cols-3">
					{#each reviews as review (review.name)}
						<figure class="card p-5">
							<div class="text-[#ff9f0a]">{'★'.repeat(review.rating)}<span class="text-fill">{'★'.repeat(5 - review.rating)}</span></div>
							<blockquote class="mt-2 text-[0.95rem] leading-relaxed">«{review.text}»</blockquote>
							<figcaption class="mt-3 text-[0.85rem] font-semibold">{review.name} <span class="font-normal text-label-2">· {review.city}</span></figcaption>
						</figure>
					{/each}
				</div>
			</section>

			<section class="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#fff7ea] to-[#ffe9d6] p-6 md:p-8 dark:from-[#2a2118] dark:to-[#1c1712]">
				<div class="flex flex-col gap-6 md:flex-row md:items-center">
					<div class="flex-1">
						<div class="flex items-center gap-2 text-[0.8rem] font-semibold tracking-wide text-accent uppercase"><Award class="size-4" /> Kursusbevis</div>
						<h2 class="mt-2 text-[1.35rem] font-bold tracking-tight">Bevis på, at du har gennemført</h2>
						<p class="mt-2 leading-relaxed text-label-2">
							Når {host.person.split(' ')[0]} har registreret dit fremmøde, får du automatisk et personligt, digitalt kursusbevis. Det kan deles, printes og verificeres af alle med et klik.
						</p>
						<a href="/bevis/LZ-4F7K-9QX2" class="mt-4 inline-flex items-center gap-1 font-semibold text-accent hover:underline">Se et eksempel<ChevronRight class="size-4" /></a>
					</div>
					<div class="mx-auto w-56 rotate-2 rounded-xl border border-[#e8d6b8] bg-[#fffdf8] p-4 text-center shadow-float dark:border-[#4a3c28] dark:bg-[#24201a]">
						<div class="text-[0.55rem] font-bold tracking-[0.3em] text-[#a67c3d] uppercase">Kursusbevis</div>
						<div class="mt-2 font-serif text-[1.1rem] italic">{demo.user.name}</div>
						<div class="mx-auto my-2 h-px w-24 bg-[#e8d6b8] dark:bg-[#4a3c28]"></div>
						<div class="line-clamp-2 text-[0.72rem] text-label-2">{course.title}</div>
						<div class="mx-auto mt-3 grid size-8 place-items-center rounded-full bg-gradient-to-br from-[#ffd29d] to-[#d9822b] text-[0.8rem] text-white">✓</div>
					</div>
				</div>
			</section>
		</div>
	</div>

	{#if related.length}
		<section class="mt-20">
			<h2 class="mb-5 font-display text-[1.6rem] font-bold tracking-[-0.025em] md:text-[2rem]">Mere inden for {category.name.toLocaleLowerCase('da-DK')}</h2>
			<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{#each related as item (item.slug)}<CourseCard course={item} />{/each}
			</div>
		</section>
	{/if}
</article>

<div class="no-print fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
	<div class="glass-strong mx-auto flex max-w-xl items-center gap-3 rounded-full py-2 pr-2 pl-5">
		<div class="min-w-0 flex-1">
			<div class="font-bold">{formatPrice(total)}</div>
			<div class="truncate text-[0.78rem] text-label-2">
				{selected ? `${formatLongDate(selected.date)} · ${participants} ${participants === 1 ? 'person' : 'personer'}` : 'Ingen ledige hold'}
			</div>
		</div>
		<a href={selected ? bookHref : '#book'} class="btn btn-brand h-11 px-6">{selected ? 'Book nu' : 'Se hold'}</a>
	</div>
</div>
