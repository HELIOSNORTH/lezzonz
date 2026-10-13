<script lang="ts">
	import { fly } from 'svelte/transition';
	import { toasts } from '#lib/toast.svelte.ts';
</script>

<div class="pointer-events-none fixed inset-x-0 top-20 z-[60] flex flex-col items-center gap-2 px-4 md:top-24" aria-live="polite">
	{#each toasts as toast (toast.id)}
		<div
			class="glass-strong flex items-center gap-2.5 rounded-full py-2.5 pr-5 pl-3 text-[0.95rem] font-medium"
			in:fly={{ y: -16, duration: 380 }}
			out:fly={{ y: -10, duration: 240 }}
		>
			<span class="grid size-7 place-items-center rounded-full bg-label text-[0.85rem] text-bg">{toast.icon}</span>
			{toast.message}
		</div>
	{/each}
</div>
