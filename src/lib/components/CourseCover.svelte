<script lang="ts">
	import type { Course } from '#lib/types.ts';

	let {
		course,
		eager = false,
		class: className = ''
	}: { course: Pick<Course, 'slug' | 'title'>; eager?: boolean; class?: string } = $props();
</script>

<div class="relative overflow-hidden bg-fill {className}">
	<img
		src="/photos/{course.slug}.webp"
		alt={course.title}
		loading={eager ? 'eager' : 'lazy'}
		decoding="async"
		class="absolute inset-0 size-full object-cover transition-transform duration-700 ease-spring group-hover:scale-[1.04]"
	/>
</div>
