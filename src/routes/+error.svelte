<script lang="ts">
	import { page } from '$app/state';
</script>

<section class="mx-auto flex max-w-xl flex-col items-center px-5 py-24 text-center">
	<div class="text-[4rem]">🧭</div>
	<h1 class="mt-4 font-display text-3xl font-bold tracking-tight">
		{page.status === 404 ? 'Siden findes ikke' : 'Noget gik galt'}
	</h1>
	<a href="/kurser" class="btn btn-primary mt-8">Udforsk kurser</a>
</section>
