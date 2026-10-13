<script lang="ts">
	import { BadgeCheck, Link, Printer, ShieldAlert } from '@lucide/svelte';
	import { page } from '$app/state';
	import { getCourse, getHost } from '#lib/catalog.ts';
	import { demo } from '#lib/demo-store.svelte.ts';
	import { formatDuration, formatFullDate } from '#lib/format.ts';
	import { showToast } from '#lib/toast.svelte.ts';
	import Logo from '#lib/components/Logo.svelte';
	import QrCode from '#lib/components/QrCode.svelte';

	const certificate = $derived(demo.getCertificate(page.params.id ?? ''));
	const course = $derived(certificate ? getCourse(certificate.courseSlug) : undefined);
	const host = $derived(course ? getHost(course.host) : undefined);
	const completedAt = $derived(certificate ? new Date(certificate.completedAt) : new Date());
	const certificateUrl = $derived(`${page.url.origin}/bevis/${certificate?.id}`);

	const linkedInUrl = $derived.by(() => {
		if (!certificate || !course) return '';
		const params = new URLSearchParams({
			startTask: 'CERTIFICATION_NAME',
			name: course.title,
			organizationName: 'Lezzonz',
			issueYear: String(completedAt.getFullYear()),
			issueMonth: String(completedAt.getMonth() + 1),
			certUrl: certificateUrl,
			certId: certificate.id
		});
		return `https://www.linkedin.com/profile/add?${params}`;
	});

	async function copyLink() {
		await navigator.clipboard?.writeText(certificateUrl);
		showToast('Link til beviset er kopieret');
	}
</script>

<svelte:head>
	<title>{certificate && course ? `Kursusbevis: ${certificate.holderName} — ${course.title}` : 'Kursusbevis'} · Lezzonz</title>
	<style>
		@page {
			size: A4 landscape;
			margin: 0;
		}
	</style>
</svelte:head>

{#if !certificate || !course || !host}
	<section class="mx-auto max-w-xl px-5 py-16 text-center">
		<div class="mx-auto grid size-20 place-items-center rounded-full bg-[#ff3b30]/10 text-[#ff3b30]"><ShieldAlert class="size-10" /></div>
		<h1 class="mt-5 text-[1.9rem] font-bold tracking-tight">Bevis ikke fundet</h1>
		<p class="mt-3 font-mono text-label-2">{page.params.id}</p>
		<a href="/bevis" class="btn btn-primary mt-6">Prøv en anden kode</a>
	</section>
{:else}
	<section class="mx-auto max-w-5xl px-5 print:max-w-none print:p-0">
		<div class="no-print mb-6 flex flex-col gap-4 rounded-3xl bg-success/10 p-4 sm:flex-row sm:items-center">
			<span class="grid size-11 shrink-0 place-items-center rounded-full bg-success text-white"><BadgeCheck class="size-6" /></span>
			<div class="flex-1">
				<div class="font-semibold">Ægte kursusbevis</div>
				<div class="font-mono text-[0.85rem] text-label-2">{certificate.id}</div>
			</div>
			<div class="flex flex-wrap gap-2">
				<button onclick={() => window.print()} class="btn btn-secondary h-10 px-4 text-[0.9rem]"><Printer class="size-4" />Gem som PDF</button>
				<button onclick={copyLink} class="btn btn-secondary h-10 px-4 text-[0.9rem]"><Link class="size-4" />Kopiér link</button>
				<a href={linkedInUrl} target="_blank" rel="noopener noreferrer" class="btn h-10 bg-[#0a66c2] px-4 text-[0.9rem] text-white hover:opacity-90">Føj til LinkedIn</a>
			</div>
		</div>

		<div class="certificate @container relative mx-auto aspect-[1.414] w-full overflow-hidden rounded-[1.25rem] bg-[#fffdf8] text-[#2b2418] shadow-float print:rounded-none print:shadow-none">
			<div class="absolute inset-[2.2%] rounded-[0.8rem] border border-[#d8c39a] print:rounded-none"></div>
			<div class="absolute inset-[3.2%] rounded-[0.6rem] border-2 border-[#e9dcc0] print:rounded-none"></div>
			<div class="absolute -top-[30%] -right-[15%] size-[60%] rounded-full bg-[#ffe7c4]/50 blur-3xl"></div>
			<div class="absolute -bottom-[30%] -left-[10%] size-[50%] rounded-full bg-[#ffd6e0]/40 blur-3xl"></div>

			<div class="relative flex h-full flex-col items-center px-[9%] py-[6.5%] text-center">
				<div class="flex w-full items-center justify-between">
					<Logo size={26} />
					<span class="font-mono text-[1.2cqw] tracking-wider text-[#8a7350]">{certificate.id}</span>
				</div>

				<div class="mt-[3%] text-[1.5cqw] font-bold tracking-[0.45em] text-[#a67c3d] uppercase">Kursusbevis</div>
				<div class="mt-[2.5%] font-serif text-[1.8cqw] text-[#6b5a40] italic">Dette bevis bekræfter, at</div>
				<div class="mt-[1.5%] font-serif text-[5.2cqw] leading-tight font-semibold tracking-[-0.01em]">{certificate.holderName}</div>
				<div class="mx-auto my-[1.5%] h-px w-[40%] bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent"></div>
				<div class="font-serif text-[1.8cqw] text-[#6b5a40] italic">har gennemført kurset</div>
				<div class="mt-[1.2%] max-w-[85%] font-serif text-[3cqw] leading-snug font-bold text-balance">{course.title}</div>
				<div class="mt-[1.5%] text-[1.45cqw] text-[#6b5a40]">
					hos {host.name}, {course.city} · {formatFullDate(completedAt)} · {formatDuration(course.durationMinutes, course.durationNote)}
				</div>
				<div class="mt-[1.2%] max-w-[80%] text-[1.25cqw] text-[#8a7350]">Indhold: {course.learn.join(' · ')}</div>

				<div class="mt-auto flex w-full items-end justify-between">
					<div class="w-[28%] text-left">
						<div class="font-serif text-[2.6cqw] italic" style="font-family: 'Snell Roundhand', 'Apple Chancery', 'Brush Script MT', cursive">{host.person}</div>
						<div class="mt-1 h-px bg-[#c9a96e]"></div>
						<div class="mt-1 text-[1.1cqw] text-[#8a7350]">{host.role}, {host.name}</div>
					</div>

					<div class="relative grid size-[11cqw] place-items-center rounded-full bg-[conic-gradient(from_0deg,#f6e7c8,#d9a85b,#f6e7c8,#b8863f,#f6e7c8)] shadow-[0_6px_20px_-6px_rgb(166_124_61/0.6)]">
						<div class="grid size-[80%] place-items-center rounded-full border border-white/60 bg-gradient-to-br from-[#e9c98f] to-[#b8863f] text-center text-white">
							<span class="text-[1cqw] leading-tight font-bold tracking-[0.15em] uppercase">Lezzonz<br />Verificeret</span>
						</div>
					</div>

					<div class="flex w-[28%] flex-col items-end">
						<div class="rounded-lg bg-white p-1.5 text-[#2b2418] shadow-sm"><QrCode value={certificateUrl} class="size-[8cqw]" label="QR-kode til verificering" /></div>
						<div class="mt-1 text-[1cqw] text-[#8a7350]">Scan for at verificere</div>
					</div>
				</div>
			</div>
		</div>

	</section>
{/if}

<style>
	@media print {
		.certificate {
			width: 100vw;
			height: 100vh;
			aspect-ratio: auto;
			print-color-adjust: exact;
			-webkit-print-color-adjust: exact;
		}
	}
</style>
