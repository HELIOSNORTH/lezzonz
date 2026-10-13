<script lang="ts">
	import '../app.css';
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import Footer from '#lib/components/Footer.svelte';
	import Header from '#lib/components/Header.svelte';
	import TabBar from '#lib/components/TabBar.svelte';
	import Toasts from '#lib/components/Toasts.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	const routeId = $derived(page.route.id ?? '');
	const bareChrome = $derived(routeId.startsWith('/display'));
	const hasOwnActionBar = $derived(routeId.startsWith('/kurser/[slug]'));

	onNavigate((navigation) => {
		if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
</svelte:head>

{#if bareChrome}
	{@render children()}
{:else}
	<Header />
	<main class="min-h-dvh pt-[calc(env(safe-area-inset-top)+5.5rem)] md:pt-28">
		{@render children()}
	</main>
	<Footer />
	{#if !hasOwnActionBar}<TabBar />{/if}
	<Toasts />
{/if}
