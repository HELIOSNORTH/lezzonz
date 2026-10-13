<script lang="ts">
	import { Award, CalendarDays, Check, ChevronRight, Gift, Plus, QrCode as QrIcon, Star, TrendingUp, Users, Wallet } from '@lucide/svelte';
	import { coursesByHost, datedSessions, getHost } from '#lib/catalog.ts';
	import { formatFullDate, formatNumber, formatPrice, formatShortDate, formatTime } from '#lib/format.ts';
	import { showToast } from '#lib/toast.svelte.ts';
	import Avatar from '#lib/components/Avatar.svelte';
	import CourseCover from '#lib/components/CourseCover.svelte';

	const BAR_COLOR = '#f0541e';
	const host = getHost('pizzaskolen-aarhus')!;
	const hostCourses = coursesByHost(host.slug);

	const sessions = hostCourses
		.flatMap((course) => datedSessions(course).map((session) => ({ course, session, booked: course.capacity - session.spotsLeft })))
		.sort((a, b) => a.session.date.getTime() - b.session.date.getTime());

	const monthLabel = new Intl.DateTimeFormat('da-DK', { month: 'short' });
	const monthlyRevenue = [212_100, 231_000, 248_500, 259_000, 271_600, 280_000].map((value, index, all) => {
		const date = new Date();
		date.setDate(1);
		date.setMonth(date.getMonth() - (all.length - 1 - index));
		return { label: monthLabel.format(date).replace('.', ''), value, current: index === all.length - 1 };
	});
	const chartMax = 300_000;
	const gridLines = [0, 100_000, 200_000, 300_000];

	const firstNames = ['Anna', 'Mikkel', 'Freja', 'Oliver', 'Clara', 'Lucas', 'Ida', 'William', 'Ella', 'Noah', 'Alma', 'Victor', 'Josefine', 'Magnus', 'Agnes', 'Elias'];
	const lastNames = ['Nielsen', 'Jensen', 'Hansen', 'Pedersen', 'Andersen', 'Christensen', 'Larsen', 'Sørensen', 'Rasmussen', 'Jørgensen', 'Petersen', 'Madsen', 'Kristensen', 'Olsen', 'Thomsen', 'Poulsen'];

	const participantsFor = (seed: number, count: number) =>
		Array.from({ length: count }, (_, index) => ({
			id: index,
			name: `${firstNames[(index * 7 + seed) % firstNames.length]} ${lastNames[(index * 5 + seed * 3) % lastNames.length]}`,
			giftCard: (index + seed) % 6 === 0
		}));

	let selectedId = $state(sessions[0].session.id);
	let checkedIn = $state<Record<string, number[]>>({});
	let completedSessions = $state<string[]>([]);
	let hoveredMonth = $state<number | null>(null);

	const selected = $derived(sessions.find((item) => item.session.id === selectedId)!);
	const roster = $derived(participantsFor(sessions.indexOf(selected) + 3, selected.booked));
	const present = $derived(checkedIn[selectedId] ?? []);
	const isCompleted = $derived(completedSessions.includes(selectedId));

	function toggle(participantId: number) {
		const current = checkedIn[selectedId] ?? [];
		checkedIn[selectedId] = current.includes(participantId) ? current.filter((id) => id !== participantId) : [...current, participantId];
	}

	const checkInAll = () => (checkedIn[selectedId] = roster.map((participant) => participant.id));

	function completeSession() {
		completedSessions.push(selectedId);
		showToast(`${present.length} kursusbeviser sendt til deltagerne`, '🎓');
	}

	const kpis = [
		{ icon: TrendingUp, label: 'Omsætning denne måned', value: formatPrice(280_000), delta: '+3,1 % siden sidste måned' },
		{ icon: Users, label: 'Deltagere denne måned', value: formatNumber(400), delta: '+18 siden sidste måned' },
		{ icon: CalendarDays, label: 'Fyldningsgrad', value: '94 %', delta: '27 af 29 hold udsolgt' },
		{ icon: Star, label: 'Gennemsnitlig bedømmelse', value: '4,9', delta: '1.284 anmeldelser' }
	];

	const payouts = [
		{ date: -3, amount: 61_230, status: 'På vej' },
		{ date: -10, amount: 64_850, status: 'Udbetalt' },
		{ date: -17, amount: 58_410, status: 'Udbetalt' },
		{ date: -24, amount: 62_090, status: 'Udbetalt' }
	].map((payout) => ({ ...payout, date: new Date(Date.now() + payout.date * 86_400_000) }));

	const giftCardSales = [
		{ name: 'Gavekort 1.400 kr.', via: 'Display i butikken', when: 'I dag, kl. 11.24' },
		{ name: 'Gavekort 700 kr.', via: 'lezzonz.dk', when: 'I går, kl. 20.02' },
		{ name: 'Gavekort 2.100 kr.', via: 'Display i butikken', when: 'I går, kl. 15.47' }
	];
</script>

<svelte:head>
	<title>Dashboard · {host.name} · Lezzonz</title>
</svelte:head>

<section class="mx-auto max-w-6xl px-5">
	<div class="mb-6 flex items-center gap-2 rounded-2xl bg-brand/10 px-4 py-2.5 text-[0.88rem] font-medium text-accent">
		<span class="rounded-full bg-brand px-2 py-0.5 text-[0.7rem] font-bold text-white uppercase">Demo</span>
		Sådan ser underviser-dashboardet ud for {host.name}.
	</div>

	<div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
		<div class="flex items-center gap-4">
			<Avatar initials={host.initials} gradient={host.gradient} size={60} />
			<div>
				<h1 class="font-display text-[2rem] leading-tight font-bold tracking-[-0.035em]">God morgen, {host.person.split(' ')[0]}</h1>
				<p class="text-label-2">{host.name} · {formatFullDate(new Date())}</p>
			</div>
		</div>
		<div class="flex gap-2">
			<a href="/display/{host.slug}" class="btn btn-secondary h-11 px-4 text-[0.92rem]"><QrIcon class="size-4" />Butiksdisplay</a>
			<button onclick={() => showToast('Kursusguiden åbner i den fulde version', '✦')} class="btn btn-primary h-11 px-4 text-[0.92rem]"><Plus class="size-4" />Nyt hold</button>
		</div>
	</div>

	<div class="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
		{#each kpis as kpi (kpi.label)}
			{@const Icon = kpi.icon}
			<div class="card rounded-3xl p-5">
				<div class="flex items-center gap-2 text-[0.82rem] text-label-2"><Icon class="size-4" />{kpi.label}</div>
				<div class="mt-2 font-display text-[1.7rem] leading-tight font-bold tracking-tight md:text-[2rem]">{kpi.value}</div>
				<div class="mt-1 text-[0.8rem] text-label-2">{kpi.delta}</div>
			</div>
		{/each}
	</div>

	<div class="mt-4 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
		<div class="card p-6">
			<div class="flex items-baseline justify-between">
				<h2 class="font-semibold">Omsætning pr. måned</h2>
				<span class="text-[0.85rem] text-label-2">Seneste 6 måneder</span>
			</div>
			<div class="relative mt-6 h-56" role="img" aria-label="Søjlediagram over omsætning de seneste seks måneder">
				{#each gridLines as line (line)}
					<div class="absolute inset-x-0 flex translate-y-1/2 items-center gap-2" style:bottom="calc({(line / chartMax) * 100}% * (200 / 224) + 24px)">
						<span class="w-10 shrink-0 text-right text-[0.72rem] text-label-3 tabular-nums">{line === 0 ? '0' : `${line / 1000}k`}</span>
						<span class="h-px flex-1 bg-separator"></span>
					</div>
				{/each}
				<div class="absolute inset-y-0 right-0 left-12 flex items-end gap-[2px] pb-6">
					{#each monthlyRevenue as month, index (month.label)}
						<div
							class="relative flex h-full flex-1 flex-col items-center justify-end"
							role="presentation"
							onpointerenter={() => (hoveredMonth = index)}
							onpointerleave={() => (hoveredMonth = null)}
						>
							{#if hoveredMonth === index}
								<div class="glass-strong absolute z-10 rounded-xl px-3 py-1.5 text-center text-[0.8rem] whitespace-nowrap" style:bottom="calc({(month.value / chartMax) * 100}% + 8px)">
									<div class="font-semibold tabular-nums">{formatPrice(month.value)}</div>
									<div class="text-label-2 capitalize">{month.label}</div>
								</div>
							{/if}
							<div
								class="w-[62%] max-w-14 rounded-t-[4px] transition-opacity duration-200"
								style:height="{(month.value / chartMax) * 100}%"
								style:background={BAR_COLOR}
								style:opacity={hoveredMonth === null || hoveredMonth === index ? 1 : 0.45}
							></div>
							<span class="absolute -bottom-6 text-[0.75rem] text-label-2 capitalize {month.current ? 'font-semibold text-label' : ''}">{month.label}</span>
						</div>
					{/each}
				</div>
			</div>
			<table class="sr-only">
				<caption>Omsætning pr. måned</caption>
				<thead><tr><th>Måned</th><th>Omsætning</th></tr></thead>
				<tbody>{#each monthlyRevenue as month (month.label)}<tr><td>{month.label}</td><td>{formatPrice(month.value)}</td></tr>{/each}</tbody>
			</table>
		</div>

		<div class="card p-6">
			<div class="flex items-center justify-between">
				<h2 class="flex items-center gap-2 font-semibold"><Gift class="size-4 text-accent" />Gavekort</h2>
				<span class="text-[0.85rem] text-label-2">Denne måned</span>
			</div>
			<div class="mt-4 grid grid-cols-2 gap-3">
				<div class="rounded-2xl bg-fill-2 p-4"><div class="font-display text-[1.5rem] font-bold">38</div><div class="text-[0.8rem] text-label-2">Solgte gavekort</div></div>
				<div class="rounded-2xl bg-fill-2 p-4"><div class="font-display text-[1.5rem] font-bold">{formatPrice(31_850)}</div><div class="text-[0.8rem] text-label-2">Gavekortsalg</div></div>
			</div>
			<ul class="mt-4 divide-y divide-separator">
				{#each giftCardSales as sale (sale.when)}
					<li class="flex items-center justify-between py-2.5 text-[0.9rem]">
						<span><span class="block font-medium">{sale.name}</span><span class="text-[0.8rem] text-label-2">{sale.via}</span></span>
						<span class="text-[0.8rem] text-label-2">{sale.when}</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>

	<div class="mt-4 grid gap-4 lg:grid-cols-[1fr_1.3fr]">
		<div class="card p-6">
			<h2 class="font-semibold">Kommende hold</h2>
			<div class="mt-4 space-y-2">
				{#each sessions as item (item.session.id)}
					{@const fill = item.booked / item.course.capacity}
					<button
						onclick={() => (selectedId = item.session.id)}
						class="pressable flex w-full items-center gap-3 rounded-2xl border-2 p-3 text-left transition-colors {selectedId === item.session.id ? 'border-brand bg-brand/5' : 'border-transparent bg-fill-2 hover:bg-fill'}"
					>
						<CourseCover course={item.course} class="size-11 shrink-0 rounded-xl" emojiSize="1.4rem" />
						<span class="min-w-0 flex-1">
							<span class="block truncate text-[0.92rem] font-semibold">{item.course.title}</span>
							<span class="text-[0.8rem] text-label-2">{formatShortDate(item.session.date)} · {formatTime(item.session.date)}</span>
							<span class="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-fill">
								<span class="block h-full rounded-full {fill === 1 ? 'bg-success' : 'bg-brand'}" style:width="{fill * 100}%"></span>
							</span>
						</span>
						<span class="text-right text-[0.8rem] font-semibold tabular-nums">
							{item.booked}/{item.course.capacity}
							{#if completedSessions.includes(item.session.id)}<span class="block text-success">Afsluttet</span>{/if}
						</span>
					</button>
				{/each}
			</div>
		</div>

		<div class="card p-6">
			<div class="flex flex-wrap items-start justify-between gap-3">
				<div>
					<h2 class="font-semibold">Deltagerliste</h2>
					<p class="text-[0.85rem] text-label-2">{selected.course.title} · {formatShortDate(selected.session.date)}, {formatTime(selected.session.date)}</p>
				</div>
				{#if !isCompleted && roster.length}
					<button onclick={checkInAll} class="text-[0.88rem] font-semibold text-accent">Markér alle mødt</button>
				{/if}
			</div>
			{#if roster.length}
				<ul class="mt-4 max-h-[24rem] divide-y divide-separator overflow-y-auto pr-1">
					{#each roster as participant (participant.id)}
						{@const isPresent = present.includes(participant.id)}
						<li class="flex items-center gap-3 py-2.5">
							<Avatar initials={participant.name.split(' ').map((part) => part[0]).join('')} gradient={['#d1d1d6', '#8e8e93']} size={34} />
							<span class="flex-1 text-[0.92rem]">
								{participant.name}
								{#if participant.giftCard}<span class="ml-1.5 rounded-full bg-brand/10 px-2 py-0.5 text-[0.7rem] font-semibold text-accent">Gavekort</span>{/if}
							</span>
							<button
								onclick={() => toggle(participant.id)}
								disabled={isCompleted}
								aria-pressed={isPresent}
								class="pressable flex h-8 items-center gap-1.5 rounded-full px-3 text-[0.8rem] font-semibold transition-colors {isPresent ? 'bg-success text-white' : 'bg-fill-2 text-label-2'}"
							>
								{#if isPresent}<Check class="size-3.5" strokeWidth={3} />Mødt{:else}Ikke mødt{/if}
							</button>
						</li>
					{/each}
				</ul>
				<div class="mt-4 flex flex-col gap-3 border-t border-separator pt-4 sm:flex-row sm:items-center sm:justify-between">
					<span class="text-[0.88rem] text-label-2">{present.length} af {roster.length} mødt</span>
					{#if isCompleted}
						<span class="inline-flex items-center gap-2 font-semibold text-success"><Award class="size-4" />Kursusbeviser sendt</span>
					{:else}
						<button onclick={completeSession} disabled={!present.length} class="btn btn-brand h-11 px-5 text-[0.92rem]"><Award class="size-4" />Afslut hold og send {present.length || ''} beviser</button>
					{/if}
				</div>
			{:else}
				<p class="mt-6 text-label-2">Ingen tilmeldte endnu.</p>
			{/if}
		</div>
	</div>

	<div class="card mt-4 p-6">
		<div class="flex items-center justify-between">
			<h2 class="flex items-center gap-2 font-semibold"><Wallet class="size-4 text-accent" />Udbetalinger</h2>
			<span class="text-[0.85rem] text-label-2">Hver mandag til konto ****4821</span>
		</div>
		<table class="mt-4 w-full text-left text-[0.92rem]">
			<thead class="text-[0.8rem] text-label-2">
				<tr><th class="pb-2 font-medium">Dato</th><th class="pb-2 font-medium">Beløb</th><th class="pb-2 text-right font-medium">Status</th></tr>
			</thead>
			<tbody class="divide-y divide-separator">
				{#each payouts as payout (payout.amount)}
					<tr>
						<td class="py-3">{formatFullDate(payout.date)}</td>
						<td class="py-3 font-semibold tabular-nums">{formatPrice(payout.amount)}</td>
						<td class="py-3 text-right">
							<span class="rounded-full px-2.5 py-1 text-[0.78rem] font-semibold {payout.status === 'Udbetalt' ? 'bg-success/12 text-success' : 'bg-brand/10 text-accent'}">{payout.status}</span>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<a href="/for-undervisere" class="mt-4 inline-flex items-center gap-1 text-[0.9rem] font-semibold text-accent">Læs om priser og gebyrer<ChevronRight class="size-4" /></a>
	</div>
</section>
