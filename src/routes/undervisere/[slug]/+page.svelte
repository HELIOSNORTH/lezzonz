<script lang="ts">
	import { Gift, MapPin, QrCode as QrIcon, Store } from '@lucide/svelte';
	import CourseCard from '#lib/components/CourseCard.svelte';
	import Avatar from '#lib/components/Avatar.svelte';
	import Rating from '#lib/components/Rating.svelte';
	import { formatNumber } from '#lib/format.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const { host, courses } = $derived(data);
	const reviewCount = $derived(courses.reduce((sum, course) => sum + course.reviewCount, 0));
	const rating = $derived(courses.reduce((sum, course) => sum + course.rating * course.reviewCount, 0) / Math.max(reviewCount, 1));
</script>

<svelte:head>
	<title>{host.name} · Lezzonz</title>
</svelte:head>

<section class="mx-auto max-w-6xl px-5">
	<div class="relative overflow-hidden rounded-[2rem] p-6 text-white shadow-float md:p-10" style:background="linear-gradient(135deg, {host.gradient[0]}, {host.gradient[1]})">
		<div class="absolute inset-0 opacity-25 mix-blend-overlay" style="background-image: var(--noise)"></div>
		<div class="relative flex flex-col gap-6 md:flex-row md:items-center">
			<span class="rounded-full ring-4 ring-white/40"><Avatar initials={host.initials} gradient={['#ffffff55', '#00000033']} size={96} /></span>
			<div class="flex-1">
				<h1 class="font-display text-[2.2rem] leading-tight font-bold tracking-[-0.035em] md:text-[2.8rem]">{host.name}</h1>
				<p class="mt-1 text-white/85">{host.person} · {host.role} · Underviser siden {host.since}</p>
				<div class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.95rem] text-white/90">
					<span class="inline-flex items-center gap-1"><MapPin class="size-4" />{host.city}</span>
					<Rating {rating} count={reviewCount} class="[&_.text-label-2]:text-white/75" />
					<span>{formatNumber(courses.length)} {courses.length === 1 ? 'kursus' : 'kurser'}</span>
				</div>
			</div>
		</div>
	</div>

	<div class="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
		<div>
			<h2 class="text-[1.4rem] font-bold tracking-tight">Om {host.person.split(' ')[0]}</h2>
			<p class="mt-2 max-w-2xl text-[1.05rem] leading-relaxed text-label-2">{host.bio}</p>
		</div>
		{#if host.giftCardPartner}
			<div class="card p-5">
				<div class="flex items-center gap-2 text-[0.8rem] font-semibold tracking-wide text-accent uppercase"><Store class="size-4" /> Gavekort-partner</div>
				<p class="mt-2 font-semibold">{host.giftCardPartner.storeName}</p>
				<p class="text-[0.9rem] text-label-2">{host.giftCardPartner.address}</p>
				<div class="mt-4 flex gap-2">
					<a href="/gavekort?vaert={host.slug}" class="btn btn-primary h-10 flex-1 px-4 text-[0.9rem]"><Gift class="size-4" />Køb gavekort</a>
					<a href="/display/{host.slug}" class="btn btn-secondary h-10 px-4 text-[0.9rem]" aria-label="Se butiksdisplay"><QrIcon class="size-4" /></a>
				</div>
			</div>
		{/if}
	</div>

	<h2 class="mt-12 mb-5 font-display text-[1.6rem] font-bold tracking-[-0.025em]">Kurser hos {host.name}</h2>
	<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
		{#each courses as course (course.slug)}<CourseCard {course} />{/each}
	</div>
</section>
