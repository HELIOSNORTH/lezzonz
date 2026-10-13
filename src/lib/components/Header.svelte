<script lang="ts">
	import { Search } from '@lucide/svelte';
	import { page } from '$app/state';
	import { demo } from '#lib/demo-store.svelte.ts';
	import Avatar from './Avatar.svelte';
	import Logo from './Logo.svelte';

	const links = [
		{ href: '/kurser', label: 'Udforsk' },
		{ href: '/gavekort', label: 'Gavekort' },
		{ href: '/for-undervisere', label: 'For undervisere' }
	];

	const initials = $derived(
		demo.user.name
			.split(' ')
			.map((part) => part[0])
			.slice(0, 2)
			.join('')
	);

	const isActive = (href: string) => page.url.pathname.startsWith(href);
</script>

<header class="no-print fixed inset-x-0 top-0 z-50 px-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
	<nav class="glass mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full pr-2 pl-4 md:h-[3.75rem] md:pl-5">
		<a href="/" class="pressable" aria-label="Lezzonz forside"><Logo /></a>

		<div class="hidden items-center gap-1 md:flex">
			{#each links as link (link.href)}
				<a
					href={link.href}
					class="rounded-full px-4 py-2 text-[0.95rem] font-medium transition-colors {isActive(link.href)
						? 'bg-fill text-label'
						: 'text-label-2 hover:text-label'}"
				>
					{link.label}
				</a>
			{/each}
		</div>

		<div class="flex items-center gap-1.5">
			<a href="/kurser?fokus=soeg" class="pressable grid size-10 place-items-center rounded-full hover:bg-fill" aria-label="Søg i kurser">
				<Search class="size-[19px]" strokeWidth={2.2} />
			</a>
			<a
				href="/mine"
				class="pressable flex items-center gap-2 rounded-full py-1 pr-1 pl-1 hover:bg-fill md:pl-3 {isActive('/mine') ? 'bg-fill' : ''}"
			>
				<span class="hidden text-[0.95rem] font-medium md:inline">Mine kurser</span>
				<Avatar {initials} size={36} />
			</a>
		</div>
	</nav>
</header>
