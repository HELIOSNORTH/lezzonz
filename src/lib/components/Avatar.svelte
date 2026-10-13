<script lang="ts">
	let {
		initials,
		gradient = ['#ffb340', '#ff6a33'],
		size = 44
	}: { initials: string; gradient?: [string, string]; size?: number } = $props();
</script>

<span
	class="inline-grid shrink-0 place-items-center rounded-full font-semibold text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.35)]"
	style:width="{size}px"
	style:height="{size}px"
	style:font-size="{size * 0.36}px"
	style:background="linear-gradient(145deg, {gradient[0]}, {gradient[1]})"
>
	{initials}
</span>
