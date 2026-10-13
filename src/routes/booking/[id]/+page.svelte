<script lang="ts">
	import { Award, CalendarPlus, Check, ChevronRight, Mail, MapPin, Navigation, QrCode as QrIcon, Sparkles } from '@lucide/svelte';
	import { scale } from 'svelte/transition';
	import { page } from '$app/state';
	import { getCourse, getHost } from '#lib/catalog.ts';
	import { demo } from '#lib/demo-store.svelte.ts';
	import { formatDuration, formatLongDate, formatPrice, formatTime } from '#lib/format.ts';
	import { downloadCalendarEvent } from '#lib/ics.ts';
	import { showToast } from '#lib/toast.svelte.ts';
	import CourseCover from '#lib/components/CourseCover.svelte';
	import QrCode from '#lib/components/QrCode.svelte';

	const booking = $derived(demo.getBooking(page.params.id ?? ''));
	const course = $derived(booking ? getCourse(booking.courseSlug) : undefined);
	const host = $derived(course ? getHost(course.host) : undefined);
	const startsAt = $derived(booking ? new Date(booking.startsAt) : new Date());
	const isNew = $derived(page.url.searchParams.has('ny'));
	const certificates = $derived(booking ? demo.certificatesFor(booking.id) : []);

	function addToCalendar() {
		if (!booking || !course) return;
		downloadCalendarEvent({
			uid: booking.id,
			title: course.title,
			start: startsAt,
			minutes: course.durationMinutes,
			location: `${course.venue}, ${course.address}`,
			description: `Booking ${booking.id} via Lezzonz. Vis din billet ved ankomst.`
		});
	}

	function simulateCompleted() {
		if (!booking) return;
		const issued = demo.completeBooking(booking.id);
		showToast(`${issued.length} ${issued.length === 1 ? 'kursusbevis' : 'kursusbeviser'} udstedt`, '🎓');
	}
</script>

<svelte:head>
	<title>{course ? `Billet: ${course.title}` : 'Booking'} · Lezzonz</title>
</svelte:head>

{#if !booking || !course || !host}
	<section class="mx-auto max-w-xl px-5 py-20 text-center">
		<div class="text-[3.5rem]">🎟️</div>
		<h1 class="mt-3 text-2xl font-bold">Vi kan ikke finde bookingen</h1>
		<p class="mt-2 text-label-2">Bookinger i demoen gemmes kun i denne browser.</p>
		<a href="/mine" class="btn btn-primary mt-6">Gå til Mine kurser</a>
	</section>
{:else}
	<section class="mx-auto max-w-3xl px-5">
		{#if isNew}
			<div class="text-center">
				<div class="mx-auto grid size-20 place-items-center rounded-full bg-success text-white shadow-float" in:scale={{ start: 0.4, duration: 600 }}>
					<Check class="size-10" strokeWidth={3} />
				</div>
				<h1 class="mt-5 font-display text-[2.4rem] font-bold tracking-[-0.035em] md:text-[3rem]">Du er booket!</h1>
				<p class="mx-auto mt-2 max-w-md text-[1.1rem] text-label-2">
					Vi har sendt en bekræftelse til {booking.participants[0].email}. Vi glæder os til at se dig, {booking.participants[0].name.split(' ')[0]}.
				</p>
			</div>
		{:else}
			<a href="/mine" class="text-[0.95rem] font-medium text-accent hover:underline">‹ Mine kurser</a>
			<h1 class="mt-3 font-display text-[2.2rem] font-bold tracking-[-0.035em]">Din billet</h1>
		{/if}

		<div class="mt-10 overflow-hidden rounded-[2rem] bg-surface shadow-float animate-rise">
			<div class="relative">
				<CourseCover {course} class="h-40 md:h-48" emojiSize="4.5rem" />
				<div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5 pt-12 text-white">
					<div class="text-[0.8rem] font-semibold tracking-wide uppercase opacity-85">{host.name}</div>
					<div class="text-[1.4rem] leading-tight font-bold tracking-tight">{course.title}</div>
				</div>
			</div>
			<div class="grid gap-6 p-6 md:grid-cols-[1fr_auto] md:p-8">
				<dl class="grid grid-cols-2 gap-x-6 gap-y-4 text-[0.95rem]">
					<div><dt class="text-[0.78rem] text-label-2">Dato</dt><dd class="font-semibold">{formatLongDate(startsAt)}</dd></div>
					<div><dt class="text-[0.78rem] text-label-2">Tid</dt><dd class="font-semibold">{formatTime(startsAt)} · {formatDuration(course.durationMinutes, course.durationNote)}</dd></div>
					<div class="col-span-2"><dt class="text-[0.78rem] text-label-2">Sted</dt><dd class="font-semibold">{course.venue}</dd><dd class="text-label-2">{course.address}</dd></div>
					<div class="col-span-2">
						<dt class="text-[0.78rem] text-label-2">{booking.participants.length === 1 ? 'Deltager' : 'Deltagere'}</dt>
						<dd class="font-semibold">{booking.participants.map((participant) => participant.name).join(', ')}</dd>
					</div>
					<div><dt class="text-[0.78rem] text-label-2">Booking</dt><dd class="font-mono font-semibold">{booking.id}</dd></div>
					<div><dt class="text-[0.78rem] text-label-2">Betalt</dt><dd class="font-semibold">{formatPrice(booking.total)}</dd></div>
				</dl>
				<div class="flex flex-col items-center justify-center rounded-3xl bg-fill-2 p-5 md:w-48">
					<div class="rounded-2xl bg-white p-3 text-black"><QrCode value="{page.url.origin}/booking/{booking.id}" class="size-32" label="Billet QR-kode" /></div>
					<div class="mt-3 flex items-center gap-1.5 text-[0.8rem] text-label-2"><QrIcon class="size-3.5" /> Vis ved ankomst</div>
				</div>
			</div>
			<div class="relative border-t-2 border-dashed border-separator">
				<span class="absolute -top-4 -left-4 size-8 rounded-full bg-bg"></span>
				<span class="absolute -top-4 -right-4 size-8 rounded-full bg-bg"></span>
			</div>
			<div class="grid grid-cols-3 gap-2 p-4 md:p-5">
				<button onclick={addToCalendar} class="pressable flex flex-col items-center gap-1.5 rounded-2xl py-3 text-[0.82rem] font-semibold hover:bg-fill-2">
					<CalendarPlus class="size-5 text-accent" />Kalender
				</button>
				<a href="https://maps.google.com/?q={encodeURIComponent(course.address)}" target="_blank" rel="noopener noreferrer" class="pressable flex flex-col items-center gap-1.5 rounded-2xl py-3 text-[0.82rem] font-semibold hover:bg-fill-2">
					<Navigation class="size-5 text-accent" />Rute
				</a>
				<a href="/kurser/{course.slug}" class="pressable flex flex-col items-center gap-1.5 rounded-2xl py-3 text-[0.82rem] font-semibold hover:bg-fill-2">
					<MapPin class="size-5 text-accent" />Kurset
				</a>
			</div>
		</div>

		{#if certificates.length}
			<div class="card mt-8 p-6">
				<h2 class="flex items-center gap-2 text-[1.2rem] font-semibold"><Award class="size-5 text-accent" /> Kursusbeviser</h2>
				<div class="mt-4 grid gap-2">
					{#each certificates as certificate (certificate.id)}
						<a href="/bevis/{certificate.id}" class="pressable flex items-center justify-between rounded-2xl bg-fill-2 p-4 hover:bg-fill">
							<span><span class="block font-semibold">{certificate.holderName}</span><span class="font-mono text-[0.8rem] text-label-2">{certificate.id}</span></span>
							<ChevronRight class="size-5 text-label-3" />
						</a>
					{/each}
				</div>
			</div>
		{:else}
			<div class="card mt-8 p-6 md:p-8">
				<h2 class="text-[1.2rem] font-semibold">Hvad sker der nu?</h2>
				<ol class="mt-5 space-y-5">
					{#each [
						{ icon: Mail, title: 'Bekræftelse sendt', text: `Billet og kvittering ligger i ${booking.participants[0].email}.`, done: true },
						{ icon: CalendarPlus, title: 'Påmindelse dagen før', text: 'Vi sender praktisk info, og hvad du skal medbringe.', done: false },
						{ icon: QrIcon, title: 'Mød op og check ind', text: `${host.person} scanner din billet ved ankomst.`, done: false },
						{ icon: Award, title: 'Kursusbevis i indbakken', text: 'Når kurset er gennemført, får du automatisk dit personlige kursusbevis.', done: false }
					] as step (step.title)}
						{@const Icon = step.icon}
						<li class="flex gap-4">
							<span class="grid size-10 shrink-0 place-items-center rounded-full {step.done ? 'bg-success text-white' : 'bg-fill-2 text-label-2'}">
								<Icon class="size-5" />
							</span>
							<span>
								<span class="block font-semibold">{step.title}</span>
								<span class="text-[0.92rem] text-label-2">{step.text}</span>
							</span>
						</li>
					{/each}
				</ol>
				<div class="mt-8 flex flex-col items-start gap-3 rounded-2xl border border-dashed border-separator p-4 sm:flex-row sm:items-center">
					<span class="rounded-full bg-fill px-2 py-0.5 text-[0.72rem] font-bold tracking-wide text-label-2 uppercase">Demo</span>
					<span class="flex-1 text-[0.9rem] text-label-2">Spring frem i tiden og se, hvordan kursusbeviset ser ud.</span>
					<button onclick={simulateCompleted} class="btn btn-primary h-10 px-4 text-[0.9rem]"><Sparkles class="size-4" />Simulér gennemført</button>
				</div>
			</div>
		{/if}

		<div class="mt-8 flex flex-wrap justify-center gap-3">
			<a href="/mine" class="btn btn-secondary">Mine kurser</a>
			<a href="/kurser" class="btn btn-primary">Find flere kurser</a>
		</div>
	</section>
{/if}
