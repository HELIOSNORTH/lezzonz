<script lang="ts">
	import { MapPin, Search, X } from '@lucide/svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { activeCities, categories, filterCourses, getCategory, type SortKey } from '#lib/catalog.ts';
	import CourseCard from '#lib/components/CourseCard.svelte';
	import type { CategoryId, City } from '#lib/types.ts';

	const priceOptions = [
		{ value: '', label: 'Alle priser' },
		{ value: '500', label: 'Under 500 kr.' },
		{ value: '1000', label: 'Under 1.000 kr.' },
		{ value: '2000', label: 'Under 2.000 kr.' }
	];
	const sortOptions: { value: SortKey; label: string }[] = [
		{ value: 'populaer', label: 'Mest populære' },
		{ value: 'dato', label: 'Første ledige dato' },
		{ value: 'bedoemmelse', label: 'Bedste bedømmelse' },
		{ value: 'pris-lav', label: 'Laveste pris' },
		{ value: 'pris-hoej', label: 'Højeste pris' }
	];

	const params = $derived(page.url.searchParams);
	const query = $derived(params.get('q') ?? '');
	const category = $derived((params.get('kategori') as CategoryId | null) ?? null);
	const city = $derived((params.get('by') as City | null) ?? null);
	const maxPrice = $derived(params.get('pris') ?? '');
	const sort = $derived((params.get('sorter') as SortKey | null) ?? 'populaer');
	const results = $derived(filterCourses({ query, category, city, maxPrice: Number(maxPrice) || null, sort }));
	const activeCategory = $derived(category ? getCategory(category) : null);
	const hasFilters = $derived(Boolean(query || category || city || maxPrice));

	let searchInput: HTMLInputElement;

	$effect(() => {
		if (params.get('fokus') === 'soeg') searchInput?.focus();
	});

	function setParam(key: string, value: string | null) {
		const next = new URL(page.url.href);
		if (value) next.searchParams.set(key, value);
		else next.searchParams.delete(key);
		next.searchParams.delete('fokus');
		goto(`${next.pathname}${next.search}`, { replace: true, reset: false });
	}

	const clearAll = () => goto('/kurser', { replace: true, reset: false });
</script>

<svelte:head>
	<title>{activeCategory ? `${activeCategory.name} — ` : ''}Udforsk kurser · Lezzonz</title>
</svelte:head>

<section class="mx-auto max-w-6xl px-5">
	<div class="animate-rise">
		<h1 class="font-display text-[2.4rem] leading-tight font-bold tracking-[-0.04em] md:text-[3.2rem]">
			{#if activeCategory}<span class="mr-2">{activeCategory.emoji}</span>{activeCategory.name}{:else}Udforsk kurser{/if}
		</h1>
	</div>

	<div class="sticky top-[calc(env(safe-area-inset-top)+4.6rem)] z-30 -mx-5 mt-6 px-5 py-2 md:top-[5.4rem]">
		<label class="glass-strong flex h-13 items-center gap-3 rounded-full px-5">
			<Search class="size-5 shrink-0 text-label-2" />
			<span class="sr-only">Søg</span>
			<input
				bind:this={searchInput}
				value={query}
				oninput={(event) => setParam('q', event.currentTarget.value)}
				type="search"
				placeholder="Søg"
				class="h-full min-w-0 flex-1 bg-transparent text-[1.05rem] outline-none placeholder:text-label-3 [&::-webkit-search-cancel-button]:hidden"
			/>
			{#if query}
				<button onclick={() => setParam('q', null)} class="grid size-7 place-items-center rounded-full bg-fill" aria-label="Ryd søgning">
					<X class="size-4" />
				</button>
			{/if}
		</label>
	</div>

	<div class="no-scrollbar -mx-5 mt-3 flex gap-2 overflow-x-auto px-5 pb-1">
		<button
			onclick={() => setParam('kategori', null)}
			class="pressable h-10 shrink-0 rounded-full px-4 text-[0.92rem] font-semibold {!category ? 'bg-label text-bg' : 'bg-surface text-label shadow-card'}"
		>
			Alle
		</button>
		{#each categories as item (item.id)}
			<button
				onclick={() => setParam('kategori', item.id === category ? null : item.id)}
				class="pressable flex h-10 shrink-0 items-center gap-1.5 rounded-full px-4 text-[0.92rem] font-semibold {category === item.id
					? 'bg-label text-bg'
					: 'bg-surface text-label shadow-card'}"
			>
				<span>{item.emoji}</span>{item.name}
			</button>
		{/each}
	</div>

	<div class="mt-4 flex flex-wrap items-center gap-2">
		<label class="relative flex h-10 items-center gap-1.5 rounded-full bg-surface pr-3 pl-3.5 text-[0.9rem] font-medium shadow-card">
			<MapPin class="size-4 text-label-2" />
			<span class="sr-only">By</span>
			<select value={city ?? ''} onchange={(event) => setParam('by', event.currentTarget.value)} class="cursor-pointer bg-transparent pr-1 outline-none">
				<option value="">Alle byer</option>
				{#each activeCities as name (name)}<option value={name}>{name}</option>{/each}
			</select>
		</label>
		<label class="flex h-10 items-center rounded-full bg-surface pr-3 pl-3.5 text-[0.9rem] font-medium shadow-card">
			<span class="sr-only">Pris</span>
			<select value={maxPrice} onchange={(event) => setParam('pris', event.currentTarget.value)} class="cursor-pointer bg-transparent pr-1 outline-none">
				{#each priceOptions as option (option.value)}<option value={option.value}>{option.label}</option>{/each}
			</select>
		</label>
		<label class="flex h-10 items-center rounded-full bg-surface pr-3 pl-3.5 text-[0.9rem] font-medium shadow-card">
			<span class="sr-only">Sortér</span>
			<select value={sort} onchange={(event) => setParam('sorter', event.currentTarget.value === 'populaer' ? null : event.currentTarget.value)} class="cursor-pointer bg-transparent pr-1 outline-none">
				{#each sortOptions as option (option.value)}<option value={option.value}>{option.label}</option>{/each}
			</select>
		</label>
		{#if hasFilters}
			<button onclick={clearAll} class="h-10 rounded-full px-3 text-[0.9rem] font-semibold text-accent hover:underline">Nulstil</button>
		{/if}
		<span class="ml-auto text-[0.9rem] text-label-2">{results.length} {results.length === 1 ? 'kursus' : 'kurser'}</span>
	</div>

	{#if results.length}
		<div class="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
			{#each results as course (course.slug)}
				<CourseCard {course} />
			{/each}
		</div>
	{:else}
		<div class="card mt-8 flex flex-col items-center px-6 py-16 text-center">
			<div class="text-[3.5rem]">🔍</div>
			<h2 class="mt-3 text-xl font-semibold">Ingen kurser fundet</h2>
						<button onclick={clearAll} class="btn btn-primary mt-6">Vis alle kurser</button>
		</div>
	{/if}
</section>
