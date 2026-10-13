<script lang="ts">
	let { size = 28, wordmark = true }: { size?: number; wordmark?: boolean } = $props();
	const uid = $props.id();
	const gradientId = `lz-mark-${uid}`;
</script>

<span class="inline-flex items-center gap-2">
	<svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
		<defs>
			<linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
				<stop offset="0" stop-color="#ffb340" />
				<stop offset="0.55" stop-color="#ff6a33" />
				<stop offset="1" stop-color="#e8401c" />
			</linearGradient>
		</defs>
		<rect width="32" height="32" rx="9" fill="url(#{gradientId})" />
		<path d="M11 8.5v12.2c0 1.5.9 2.3 2.4 2.3H21" fill="none" stroke="white" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" />
		<circle cx="21.5" cy="11" r="2.4" fill="white" fill-opacity="0.9" />
	</svg>
	{#if wordmark}
		<span class="font-display font-bold tracking-[-0.04em]" style="font-size: {size * 0.75}px">lezzonz</span>
	{/if}
</span>
