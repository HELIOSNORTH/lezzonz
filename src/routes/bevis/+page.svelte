<script lang="ts">
	import { ShieldCheck } from '@lucide/svelte';
	import { goto } from '$app/navigation';
	import { SAMPLE_CERTIFICATE_ID } from '#lib/demo-store.svelte.ts';

	let code = $state('');

	function verify(event: SubmitEvent) {
		event.preventDefault();
		if (code.trim()) goto(`/bevis/${code.trim().toUpperCase()}`);
	}
</script>

<svelte:head>
	<title>Verificér kursusbevis · Lezzonz</title>
</svelte:head>

<section class="mx-auto max-w-xl px-5 py-8 text-center md:py-16">
	<div class="mx-auto grid size-20 place-items-center rounded-[1.6rem] bg-gradient-to-br from-[#ffd29d] to-[#d9822b] text-white shadow-float">
		<ShieldCheck class="size-10" strokeWidth={2} />
	</div>
	<h1 class="mt-6 font-display text-[2.3rem] leading-tight font-bold tracking-[-0.035em] md:text-[2.8rem]">Verificér et kursusbevis</h1>
	<p class="mt-3 text-[1.05rem] leading-relaxed text-label-2">
		Arbejdsgivere, racerbaner, klubber og forsikringsselskaber kan tjekke, om et kursusbevis er ægte. Indtast koden fra beviset, eller scan QR-koden.
	</p>
	<form onsubmit={verify} class="glass mt-8 flex items-center gap-1 rounded-full p-1.5">
		<label class="flex-1">
			<span class="sr-only">Bevis-ID</span>
			<input bind:value={code} placeholder="LZ-XXXX-XXXX" class="h-11 w-full bg-transparent px-4 font-mono text-[1.05rem] tracking-wider uppercase outline-none placeholder:text-label-3" />
		</label>
		<button class="btn btn-primary h-11">Verificér</button>
	</form>
	<p class="mt-4 text-[0.9rem] text-label-2">
		Prøv med eksemplet <a class="font-mono font-semibold text-accent hover:underline" href="/bevis/{SAMPLE_CERTIFICATE_ID}">{SAMPLE_CERTIFICATE_ID}</a>
	</p>
</section>
