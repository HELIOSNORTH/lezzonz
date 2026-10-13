<script lang="ts">
	import type { Course } from '#lib/types.ts';

	let {
		course,
		emojiSize = '4.5rem',
		class: className = ''
	}: { course: Pick<Course, 'gradient' | 'emoji' | 'title'>; emojiSize?: string; class?: string } = $props();

	const background = $derived.by(() => {
		const [light, mid, deep] = course.gradient;
		return [
			`radial-gradient(120% 90% at 15% 10%, ${light} 0%, transparent 55%)`,
			`radial-gradient(90% 80% at 90% 20%, ${mid}cc 0%, transparent 60%)`,
			`radial-gradient(120% 100% at 60% 110%, ${deep} 0%, transparent 65%)`,
			`linear-gradient(145deg, ${light}, ${mid} 55%, ${deep})`
		].join(', ');
	});
</script>

<div class="noise relative overflow-hidden {className}" style:background role="img" aria-label={course.title}>
	<div class="absolute top-[-30%] right-[-20%] size-[80%] rounded-full bg-white/20 blur-3xl"></div>
	<div class="absolute inset-0 grid place-items-center">
		<span
			class="cover-emoji select-none"
			style:font-size={emojiSize}
			style="filter: drop-shadow(0 12px 18px rgb(0 0 0 / 0.25));"
		>{course.emoji}</span>
	</div>
</div>

<style>
	.cover-emoji {
		display: inline-block;
		transform: rotate(-8deg);
		transition: transform 0.6s var(--ease-spring);
	}
	:global(.group:hover) .cover-emoji {
		transform: rotate(-2deg) scale(1.08);
	}
</style>
