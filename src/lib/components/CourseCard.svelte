<script lang="ts">
	import { Clock, MapPin } from '@lucide/svelte';
	import { getCategory, getHost, nextAvailableSession } from '#lib/catalog.ts';
	import { formatDuration, formatPrice, formatShortDate, formatTime } from '#lib/format.ts';
	import type { Course } from '#lib/types.ts';
	import CourseCover from './CourseCover.svelte';
	import FavoriteButton from './FavoriteButton.svelte';
	import Rating from './Rating.svelte';

	let { course, class: className = '' }: { course: Course; class?: string } = $props();

	const category = $derived(getCategory(course.category));
	const host = $derived(getHost(course.host));
	const next = $derived(nextAvailableSession(course));
</script>

<a
	href="/kurser/{course.slug}"
	class="group card pressable flex flex-col overflow-hidden hover:-translate-y-1 hover:shadow-float {className}"
>
	<div class="relative">
		<CourseCover {course} class="aspect-[4/3]" />
		<span
			class="glass absolute top-3 left-3 inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[0.8rem] font-semibold"
		>
			<span class="size-2 rounded-full" style:background={category.tint}></span>{category.name}
		</span>
		<FavoriteButton slug={course.slug} class="absolute top-3 right-3" />
		{#if next && next.spotsLeft <= 3}
			<span class="absolute bottom-3 left-3 rounded-full bg-black/55 px-2.5 py-1 text-[0.75rem] font-semibold text-white backdrop-blur-md">
				Kun {next.spotsLeft} {next.spotsLeft === 1 ? 'plads' : 'pladser'} tilbage
			</span>
		{/if}
	</div>
	<div class="flex flex-1 flex-col p-5">
		<div class="flex items-center justify-between gap-2 text-[0.8rem] font-semibold tracking-wide text-accent uppercase">
			<span>{next ? `${formatShortDate(next.date)} · ${formatTime(next.date)}` : 'Udsolgt — skriv dig på venteliste'}</span>
		</div>
		<h3 class="mt-1.5 text-[1.15rem] leading-snug font-semibold tracking-[-0.015em] text-balance">{course.title}</h3>
		<p class="mt-1.5 line-clamp-2 text-[0.95rem] leading-relaxed text-label-2">{course.summary}</p>
		<div class="mt-auto pt-4">
			<div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.85rem] text-label-2">
				<span class="inline-flex items-center gap-1"><Clock class="size-3.5" />{formatDuration(course.durationMinutes, course.durationNote)}</span>
				<span class="inline-flex items-center gap-1"><MapPin class="size-3.5" />{course.city}</span>
				<Rating rating={course.rating} count={course.reviewCount} />
			</div>
			<div class="mt-3 flex items-end justify-between border-t border-separator pt-3">
				<span class="truncate text-[0.85rem] text-label-2">{host?.name}</span>
				<span class="shrink-0 text-right">
					<span class="text-[1.15rem] font-bold tracking-tight">{formatPrice(course.price)}</span>
					<span class="block text-[0.7rem] text-label-3">pr. person</span>
				</span>
			</div>
		</div>
	</div>
</a>
