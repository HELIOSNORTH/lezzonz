<script lang="ts">
	import { ChevronLeft, Printer } from '@lucide/svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { giftCardPartners } from '#lib/catalog.ts';
	import { formatPrice } from '#lib/format.ts';
	import CourseCover from '#lib/components/CourseCover.svelte';
	import Logo from '#lib/components/Logo.svelte';
	import QrCode from '#lib/components/QrCode.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const { host, courses } = $derived(data);
	const purchaseUrl = $derived(`${page.url.origin}/gavekort?vaert=${host.slug}`);
	const lead = $derived(courses[0]);
</script>

<svelte:head>
	<title>Butiksdisplay · {host.name} · Lezzonz</title>
	<style>
		@page {
			size: A5 portrait;
			margin: 0;
		}
	</style>
</svelte:head>

<div class="min-h-dvh bg-[radial-gradient(80%_60%_at_50%_0%,#fff3e6,transparent),linear-gradient(#efe9e1,#d9d1c6)] px-4 py-6 print:bg-none print:p-0">
	<div class="no-print mx-auto mb-6 flex max-w-xl flex-wrap items-center justify-between gap-3">
		<a href="/gavekort#partnere" class="glass pressable inline-flex h-10 items-center gap-1 rounded-full pr-4 pl-3 text-[0.9rem] font-medium"><ChevronLeft class="size-4" />Partnere</a>
		<div class="flex gap-2">
			<label class="glass flex h-10 items-center rounded-full px-3 text-[0.9rem]">
				<span class="sr-only">Vælg partner</span>
				<select value={host.slug} onchange={(event) => goto(`/display/${event.currentTarget.value}`)} class="cursor-pointer bg-transparent font-medium outline-none">
					{#each giftCardPartners as partner (partner.slug)}<option value={partner.slug}>{partner.name}</option>{/each}
				</select>
			</label>
			<button onclick={() => window.print()} class="btn btn-primary h-10 px-4 text-[0.9rem]"><Printer class="size-4" />Print</button>
		</div>
	</div>


	<div class="poster relative mx-auto aspect-[1/1.414] w-full max-w-md overflow-hidden rounded-[1.5rem] bg-[#fffdf8] text-[#1d1d1f] shadow-[0_40px_80px_-20px_rgb(0_0_0/0.35)] print:max-w-none print:rounded-none print:shadow-none">
		<div class="absolute inset-x-0 top-0 h-[42%]">
			{#if lead}<CourseCover course={lead} eager class="size-full" />{/if}
			<div class="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-transparent"></div>
		</div>
		<div class="relative flex h-full flex-col px-[9%] pt-[8%] pb-[7%]">
			<div class="text-white">
				<div class="text-[0.7rem] font-bold tracking-[0.3em] uppercase opacity-90">Gavekort</div>
				<h1 class="mt-2 max-w-[75%] font-display text-[2rem] leading-[1.02] font-bold tracking-[-0.035em]">Giv en oplevelse hos {host.name}</h1>
			</div>

			<div class="mx-auto mt-auto w-[62%] rounded-[1.4rem] bg-white p-[5%] shadow-[0_20px_40px_-12px_rgb(0_0_0/0.3)] ring-1 ring-black/5">
				<QrCode value={purchaseUrl} class="w-full" label="Scan for at købe gavekort" />
			</div>

			<div class="mt-[6%] text-center">
				<div class="text-[1.15rem] font-bold tracking-tight">Scan · Betal · Giv</div>
				
			</div>

			<div class="mt-[6%] flex items-center justify-between border-t border-black/10 pt-[4%]">
				<Logo size={22} />
				<span class="text-[0.78rem] font-semibold text-[#6e6e73]">Fra {formatPrice(250)}</span>
			</div>
		</div>
	</div>
</div>

<style>
	@media print {
		.poster {
			width: 100vw;
			height: 100vh;
			aspect-ratio: auto;
			print-color-adjust: exact;
			-webkit-print-color-adjust: exact;
		}
	}
</style>
