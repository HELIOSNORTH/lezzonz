<script lang="ts">
	import { ChevronRight } from '@lucide/svelte';

	let { title, subtitle, href, linkLabel = 'Se alle' }: { title: string; subtitle?: string; href?: string; linkLabel?: string } = $props();
</script>

<div class="mb-5 flex items-end justify-between gap-4">
	<div>
		<h2 class="font-display text-[1.6rem] leading-tight font-bold tracking-[-0.025em] md:text-[2rem]">{title}</h2>
		{#if subtitle}<p class="mt-1 text-label-2 md:text-[1.05rem]">{subtitle}</p>{/if}
	</div>
	{#if href}
		<a {href} class="flex shrink-0 items-center gap-0.5 font-medium text-accent hover:underline">
			{linkLabel}<ChevronRight class="size-4" strokeWidth={2.5} />
		</a>
	{/if}
</div>
