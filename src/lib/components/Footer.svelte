<script lang="ts">
	import { categories } from '#lib/catalog.ts';
	import Logo from './Logo.svelte';

	const year = new Date().getFullYear();
</script>

<footer class="no-print mt-24 border-t border-separator pb-32 md:pb-12">
	<div class="mx-auto grid max-w-6xl gap-10 px-5 pt-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
		<div>
			<Logo />
		</div>
		<div>
			<h3 class="text-[0.85rem] font-semibold">Udforsk</h3>
			<ul class="mt-3 space-y-2 text-[0.92rem] text-label-2">
				{#each categories as category (category.id)}
					<li><a class="hover:text-label" href="/kurser?kategori={category.id}">{category.name}</a></li>
				{/each}
			</ul>
		</div>
		<div>
			<h3 class="text-[0.85rem] font-semibold">Lezzonz</h3>
			<ul class="mt-3 space-y-2 text-[0.92rem] text-label-2">
				<li><a class="hover:text-label" href="/gavekort">Gavekort</a></li>
				<li><a class="hover:text-label" href="/gavekort#partnere">Gavekort i butikker</a></li>
				<li><a class="hover:text-label" href="/bevis">Verificér et kursusbevis</a></li>
				<li><a class="hover:text-label" href="/mine">Mine kurser</a></li>
			</ul>
		</div>
		<div>
			<h3 class="text-[0.85rem] font-semibold">For undervisere</h3>
			<ul class="mt-3 space-y-2 text-[0.92rem] text-label-2">
				<li><a class="hover:text-label" href="/for-undervisere">Sælg dine kurser</a></li>
				<li><a class="hover:text-label" href="/dashboard">Underviser-dashboard</a></li>
				<li><a class="hover:text-label" href="/display/pizzaskolen-aarhus">Butiksdisplay med QR</a></li>
			</ul>
		</div>
	</div>
	<div class="mx-auto mt-12 flex max-w-6xl flex-col gap-2 px-5 text-[0.8rem] text-label-3 md:flex-row md:justify-between">
		<span>© {year} Lezzonz · Lavet i Danmark</span>
		<span>Demoversion — ingen rigtige betalinger eller bookinger</span>
	</div>
</footer>
