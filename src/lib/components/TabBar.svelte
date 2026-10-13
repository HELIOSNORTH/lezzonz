<script lang="ts">
	import { Compass, Gift, House, Ticket } from '@lucide/svelte';
	import { page } from '$app/state';

	const tabs = [
		{ href: '/', label: 'Forside', icon: House },
		{ href: '/kurser', label: 'Udforsk', icon: Compass },
		{ href: '/gavekort', label: 'Gavekort', icon: Gift },
		{ href: '/mine', label: 'Mine kurser', icon: Ticket }
	];

	const activeIndex = $derived.by(() => {
		const path = page.url.pathname;
		const index = tabs.findIndex((tab, i) => i > 0 && path.startsWith(tab.href));
		return index >= 0 ? index : path === '/' ? 0 : -1;
	});
</script>

<nav
	class="no-print fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
	aria-label="Hovedmenu"
>
	<div class="glass-strong relative grid w-full max-w-md grid-cols-4 rounded-full p-1.5">
		{#if activeIndex >= 0}
			<span
				class="absolute top-1.5 bottom-1.5 left-1.5 rounded-full bg-fill transition-transform duration-500 ease-spring"
				style:width="calc((100% - 0.75rem) / 4)"
				style:transform="translateX({activeIndex * 100}%)"
			></span>
		{/if}
		{#each tabs as tab, index (tab.href)}
			{@const Icon = tab.icon}
			<a
				href={tab.href}
				class="relative flex flex-col items-center gap-0.5 rounded-full py-1.5 text-[0.68rem] font-semibold transition-colors {activeIndex === index
					? 'text-accent'
					: 'text-label-2'}"
			>
				<Icon class="size-[22px]" strokeWidth={activeIndex === index ? 2.4 : 2} />
				{tab.label}
			</a>
		{/each}
	</div>
</nav>
