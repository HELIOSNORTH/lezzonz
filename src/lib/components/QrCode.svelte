<script lang="ts">
	import { encode } from 'uqr';

	let { value, class: className = '', label }: { value: string; class?: string; label?: string } = $props();

	const path = $derived.by(() => {
		const { data, size } = encode(value, { ecc: 'M', border: 0 });
		let d = '';
		for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) if (data[y][x]) d += `M${x} ${y}h1v1h-1z`;
		return { d, size };
	});
</script>

<svg viewBox="0 0 {path.size} {path.size}" class={className} role="img" aria-label={label ?? 'QR-kode'} shape-rendering="crispEdges">
	<path d={path.d} fill="currentColor" />
</svg>
