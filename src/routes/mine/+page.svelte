<script lang="ts">
	import { Award, ChevronRight, RotateCcw } from '@lucide/svelte';
	import { getCourse } from '#lib/catalog.ts';
	import { demo } from '#lib/demo-store.svelte.ts';
	import { formatDay, formatFullDate, formatMonth, formatPrice, formatRelativeDay, formatTime } from '#lib/format.ts';
	import { showToast } from '#lib/toast.svelte.ts';
	import Avatar from '#lib/components/Avatar.svelte';
	import CourseCard from '#lib/components/CourseCard.svelte';
	import CourseCover from '#lib/components/CourseCover.svelte';
	import GiftCardVisual from '#lib/components/GiftCardVisual.svelte';

	type Tab = 'kommende' | 'gennemfoert' | 'gavekort' | 'favoritter';

	let tab = $state<Tab>('kommende');

	const bookings = $derived(
		demo.state.bookings
			.map((booking) => ({ booking, course: getCourse(booking.courseSlug)!, date: new Date(booking.startsAt) }))
			.filter((item) => item.course)
	);
	const upcoming = $derived(bookings.filter((item) => !item.booking.completed).sort((a, b) => a.date.getTime() - b.date.getTime()));
	const completed = $derived(bookings.filter((item) => item.booking.completed).sort((a, b) => b.date.getTime() - a.date.getTime()));
	const favorites = $derived(demo.state.favorites.map((slug) => getCourse(slug)).filter((course) => course !== undefined));
	const giftBalance = $derived(demo.state.giftCards.filter((card) => card.received).reduce((sum, card) => sum + card.balance, 0));
	const firstName = $derived(demo.user.name.split(' ')[0]);
	const initials = $derived(demo.user.name.split(' ').map((part) => part[0]).slice(0, 2).join(''));

	const tabs = $derived([
		{ id: 'kommende' as Tab, label: 'Kommende', count: upcoming.length },
		{ id: 'gennemfoert' as Tab, label: 'Gennemført', count: completed.length },
		{ id: 'gavekort' as Tab, label: 'Gavekort', count: demo.state.giftCards.length },
		{ id: 'favoritter' as Tab, label: 'Favoritter', count: favorites.length }
	]);

	function resetDemo() {
		demo.reset();
		tab = 'kommende';
		showToast('Demoen er nulstillet', '↺');
	}
</script>

<svelte:head>
	<title>Mine kurser · Lezzonz</title>
</svelte:head>

<section class="mx-auto max-w-5xl px-5">
	<div class="flex items-center gap-4 animate-rise">
		<Avatar {initials} size={72} />
		<div>
			<h1 class="font-display text-[2.2rem] leading-tight font-bold tracking-[-0.035em]">Hej, {firstName}</h1>
			<p class="text-label-2">{demo.user.email}</p>
		</div>
	</div>

	<div class="mt-6 grid grid-cols-3 gap-3">
		<div class="card rounded-3xl p-4"><div class="font-display text-[1.3rem] font-bold tracking-tight sm:text-[1.8rem]">{completed.length}</div><div class="text-[0.85rem] text-label-2">Gennemførte kurser</div></div>
		<div class="card rounded-3xl p-4"><div class="font-display text-[1.3rem] font-bold tracking-tight sm:text-[1.8rem]">{demo.state.certificates.length}</div><div class="text-[0.85rem] text-label-2">Kursusbeviser</div></div>
		<div class="card rounded-3xl p-4"><div class="font-display text-[1.3rem] font-bold tracking-tight sm:text-[1.8rem]">{formatPrice(giftBalance)}</div><div class="text-[0.85rem] text-label-2">På gavekort</div></div>
	</div>

	<div class="no-scrollbar sticky top-[calc(env(safe-area-inset-top)+4.6rem)] z-30 -mx-5 mt-8 overflow-x-auto px-5 py-2 md:top-[5.4rem]">
		<div class="glass-strong inline-flex rounded-full p-1">
			{#each tabs as item (item.id)}
				<button
					onclick={() => (tab = item.id)}
					class="flex h-10 items-center gap-1.5 rounded-full px-4 text-[0.92rem] font-semibold whitespace-nowrap transition-all {tab === item.id ? 'bg-label text-bg' : 'text-label-2 hover:text-label'}"
				>
					{item.label}<span class="text-[0.78rem] opacity-70">{item.count}</span>
				</button>
			{/each}
		</div>
	</div>

	<div class="mt-6">
		{#if tab === 'kommende'}
			{#if upcoming.length}
				<div class="grid gap-3">
					{#each upcoming as { booking, course, date } (booking.id)}
						<a href="/booking/{booking.id}" class="card pressable flex items-center gap-4 p-3 pr-4 hover:shadow-float">
							<div class="grid w-16 shrink-0 place-items-center rounded-2xl bg-fill-2 py-2.5 text-center">
								<span class="text-[0.7rem] font-bold tracking-wider text-accent">{formatMonth(date)}</span>
								<span class="font-display text-[1.7rem] leading-none font-bold">{formatDay(date)}</span>
							</div>
							<CourseCover {course} class="hidden size-16 shrink-0 rounded-2xl sm:block" emojiSize="2rem" />
							<div class="min-w-0 flex-1">
								<div class="text-[0.8rem] font-semibold text-accent">{formatRelativeDay(date)} · {formatTime(date)}</div>
								<div class="truncate font-semibold">{course.title}</div>
								<div class="truncate text-[0.85rem] text-label-2">{course.venue}, {course.city} · {booking.participants.length} {booking.participants.length === 1 ? 'person' : 'personer'}</div>
							</div>
							<ChevronRight class="size-5 shrink-0 text-label-3" />
						</a>
					{/each}
				</div>
			{:else}
				<div class="card flex flex-col items-center p-12 text-center">
					<div class="text-[3rem]">🗓️</div>
					<h2 class="mt-2 text-lg font-semibold">Ingen kommende kurser</h2>
					<p class="mt-1 text-label-2">Find dit næste hold og kom i gang.</p>
					<a href="/kurser" class="btn btn-primary mt-5">Udforsk kurser</a>
				</div>
			{/if}
		{:else if tab === 'gennemfoert'}
			<div class="grid gap-3">
				{#each completed as { booking, course, date } (booking.id)}
					<div class="card p-4">
						<div class="flex items-center gap-4">
							<CourseCover {course} class="size-16 shrink-0 rounded-2xl" emojiSize="2rem" />
							<div class="min-w-0 flex-1">
								<div class="truncate font-semibold">{course.title}</div>
								<div class="text-[0.85rem] text-label-2">Gennemført {formatFullDate(date)}</div>
							</div>
							<a href="/kurser/{course.slug}" class="hidden text-[0.9rem] font-semibold text-accent sm:block">Book igen</a>
						</div>
						<div class="mt-3 flex flex-wrap gap-2">
							{#each demo.certificatesFor(booking.id) as certificate (certificate.id)}
								<a href="/bevis/{certificate.id}" class="pressable inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#fff3df] to-[#ffe6c4] py-2 pr-4 pl-2 text-[0.88rem] font-semibold text-[#7a4f12] dark:from-[#3a2c18] dark:to-[#2e2214] dark:text-[#ffd29d]">
									<span class="grid size-7 place-items-center rounded-full bg-gradient-to-br from-[#ffd29d] to-[#d9822b] text-white"><Award class="size-4" /></span>
									Kursusbevis · {certificate.holderName}
								</a>
							{/each}
						</div>
					</div>
				{:else}
					<div class="card p-12 text-center text-label-2">Når du har gennemført et kursus, finder du dit kursusbevis her.</div>
				{/each}
			</div>
		{:else if tab === 'gavekort'}
			<div class="grid gap-6 sm:grid-cols-2">
				{#each demo.state.giftCards as card (card.code)}
					<a href="/gavekort/{card.code}" class="pressable block">
						<GiftCardVisual amount={card.amount} design={card.design} recipient={card.recipient} sender={card.sender} code={card.code} tilt={false} />
						<div class="mt-3 flex items-center justify-between px-1 text-[0.92rem]">
							<span class="text-label-2">{card.received ? `Fra ${card.sender}` : `Købt til ${card.recipient}`}</span>
							<span class="font-semibold">Saldo {formatPrice(card.balance)}</span>
						</div>
					</a>
				{/each}
			</div>
			<a href="/gavekort" class="btn btn-secondary mt-6">Køb et nyt gavekort</a>
		{:else}
			{#if favorites.length}
				<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{#each favorites as course (course.slug)}<CourseCard {course} />{/each}
				</div>
			{:else}
				<div class="card p-12 text-center text-label-2">Tryk på hjertet på et kursus for at gemme det her.</div>
			{/if}
		{/if}
	</div>

	<div class="mt-16 flex flex-col items-center gap-2 text-center">
		<button onclick={resetDemo} class="inline-flex items-center gap-1.5 text-[0.9rem] font-medium text-label-2 hover:text-label"><RotateCcw class="size-4" />Nulstil demoen</button>
		<p class="max-w-sm text-[0.8rem] text-label-3">Demoen gemmer bookinger, gavekort og favoritter i denne browser.</p>
	</div>
</section>
