<script lang="ts">
	import { CalendarDays, Check, ChevronLeft, CreditCard, Gift, Lock, MapPin, Minus, Plus, UserRound } from '@lucide/svelte';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { datedSessions } from '#lib/catalog.ts';
	import { demo, SAMPLE_GIFT_CARD_CODE } from '#lib/demo-store.svelte.ts';
	import { formatLongDate, formatPrice, formatTime, formatDuration } from '#lib/format.ts';
	import CourseCover from '#lib/components/CourseCover.svelte';
	import PaymentSheet from '#lib/components/PaymentSheet.svelte';
	import type { Participant, PaymentMethod } from '#lib/types.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const { course, host } = $derived(data);

	const sessions = $derived(datedSessions(course).filter((session) => session.spotsLeft - demo.seatsTaken(session.id) > 0));
	const session = $derived(sessions.find((item) => item.id === page.url.searchParams.get('hold')) ?? sessions[0]);
	const seatsAvailable = $derived(session ? Math.min(session.spotsLeft - demo.seatsTaken(session.id), 8) : 1);

	const initialCount = Math.max(1, Number(page.url.searchParams.get('antal')) || 1);
	let participants = $state<Participant[]>(
		Array.from({ length: initialCount }, (_, index) => (index === 0 ? { ...demo.user } : { name: '', email: '' }))
	);
	let paymentMethod = $state<PaymentMethod>('mobilepay');
	let giftCardOpen = $state(false);
	let giftCardInput = $state('');
	let appliedGiftCode = $state('');
	let giftCardError = $state('');
	let acceptedTerms = $state(true);
	let submitted = $state(false);
	let paymentStage = $state<'idle' | 'pending' | 'approved'>('idle');
	let card = $state({ number: '', expiry: '', cvc: '' });

	const subtotal = $derived(course.price * participants.length);
	const appliedGiftCard = $derived(appliedGiftCode ? demo.findGiftCard(appliedGiftCode) : undefined);
	const giftCardAmount = $derived(appliedGiftCard ? Math.min(appliedGiftCard.balance, subtotal) : 0);
	const amountDue = $derived(subtotal - giftCardAmount);

	const emailValid = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	const participantErrors = $derived(
		participants.map((participant) => ({
			name: participant.name.trim().length < 2,
			email: !emailValid(participant.email.trim())
		}))
	);
	const cardInvalid = $derived(
		paymentMethod === 'card' && amountDue > 0 && (card.number.replace(/\s/g, '').length < 15 || card.expiry.length < 5 || card.cvc.length < 3)
	);
	const formInvalid = $derived(participantErrors.some((error) => error.name || error.email) || cardInvalid || !acceptedTerms);

	const methods: { id: PaymentMethod; label: string; hint: string }[] = [
		{ id: 'mobilepay', label: 'MobilePay', hint: 'Godkend i appen' },
		{ id: 'applepay', label: 'Apple Pay', hint: 'Betal med Face ID' },
		{ id: 'card', label: 'Betalingskort', hint: 'Dankort, Visa, Mastercard' }
	];

	function setCount(count: number) {
		const next = Math.max(1, Math.min(seatsAvailable, count));
		if (next > participants.length) participants.push(...Array.from({ length: next - participants.length }, () => ({ name: '', email: '' })));
		else participants.splice(next);
	}

	function applyGiftCard() {
		const found = demo.findGiftCard(giftCardInput);
		if (!found) giftCardError = 'Vi kunne ikke finde et gavekort med den kode.';
		else if (found.balance <= 0) giftCardError = 'Gavekortet er allerede brugt.';
		else {
			appliedGiftCode = found.code;
			giftCardError = '';
		}
	}

	const formatCardNumber = (value: string) => value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
	const formatExpiry = (value: string) => {
		const digits = value.replace(/\D/g, '').slice(0, 4);
		return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
	};

	const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

	async function pay(event: SubmitEvent) {
		event.preventDefault();
		submitted = true;
		if (formInvalid || !session) return;
		paymentStage = 'pending';
		await wait(amountDue > 0 ? 1900 : 900);
		paymentStage = 'approved';
		await wait(900);
		const booking = demo.createBooking({
			courseSlug: course.slug,
			sessionId: session.id,
			startsAt: session.date,
			participants: participants.map((participant) => ({ name: participant.name.trim(), email: participant.email.trim() })),
			total: subtotal,
			paymentMethod: amountDue === 0 ? 'giftcard' : paymentMethod,
			giftCardCode: appliedGiftCode || undefined
		});
		goto(`/booking/${booking.id}?ny=1`, { replace: true });
	}

	const payLabel = $derived(
		amountDue === 0
			? 'Bekræft booking'
			: paymentMethod === 'mobilepay'
				? `Betal ${formatPrice(amountDue)} med MobilePay`
				: paymentMethod === 'applepay'
					? `Betal ${formatPrice(amountDue)} med Apple Pay`
					: `Betal ${formatPrice(amountDue)}`
	);
</script>

<svelte:head>
	<title>Book: {course.title} · Lezzonz</title>
</svelte:head>

<section class="mx-auto max-w-6xl px-5 pb-32 lg:pb-0">
	<a href="/kurser/{course.slug}" class="inline-flex items-center gap-0.5 text-[0.95rem] font-medium text-accent hover:underline">
		<ChevronLeft class="size-4" strokeWidth={2.5} />Tilbage til kurset
	</a>
	<h1 class="mt-3 font-display text-[2.2rem] font-bold tracking-[-0.035em] md:text-[2.8rem]">Bekræft og betal</h1>

	{#if !session}
		<div class="card mt-8 p-10 text-center">
			<p class="text-lg font-semibold">Der er desværre ingen ledige pladser på dette kursus lige nu.</p>
			<a href="/kurser/{course.slug}" class="btn btn-primary mt-6">Tilbage til kurset</a>
		</div>
	{:else}
		<form onsubmit={pay} novalidate class="mt-8 grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-12">
			<div class="space-y-6">
				<section class="card p-6">
					<h2 class="flex items-center gap-2 text-[1.15rem] font-semibold"><CalendarDays class="size-5 text-accent" /> Dit hold</h2>
					<div class="mt-4 grid gap-2">
						{#each sessions as item (item.id)}
							<a
								href="?hold={item.id}&antal={participants.length}"
								data-sveltekit-replacestate
								data-sveltekit-reset="false"
								class="flex items-center justify-between rounded-2xl border-2 px-4 py-3 transition-colors {item.id === session.id ? 'border-brand bg-brand/5' : 'border-transparent bg-fill-2 hover:bg-fill'}"
							>
								<span class="font-semibold">{formatLongDate(item.date)}</span>
								<span class="text-[0.9rem] text-label-2">{formatTime(item.date)}</span>
							</a>
						{/each}
					</div>
				</section>

				<section class="card p-6">
					<div class="flex items-center justify-between gap-4">
						<h2 class="flex items-center gap-2 text-[1.15rem] font-semibold"><UserRound class="size-5 text-accent" /> Deltagere</h2>
						<div class="flex items-center gap-1 rounded-full bg-fill-2 p-1">
							<button type="button" onclick={() => setCount(participants.length - 1)} disabled={participants.length <= 1} class="pressable grid size-8 place-items-center rounded-full bg-surface shadow-card disabled:opacity-40" aria-label="Færre deltagere">
								<Minus class="size-4" strokeWidth={2.5} />
							</button>
							<span class="w-7 text-center font-semibold tabular-nums">{participants.length}</span>
							<button type="button" onclick={() => setCount(participants.length + 1)} disabled={participants.length >= seatsAvailable} class="pressable grid size-8 place-items-center rounded-full bg-surface shadow-card disabled:opacity-40" aria-label="Flere deltagere">
								<Plus class="size-4" strokeWidth={2.5} />
							</button>
						</div>
					</div>
					<p class="mt-1 text-[0.9rem] text-label-2">Navnet bruges på kursusbeviset, og billetten sendes til mailen.</p>
					<div class="mt-5 space-y-5">
						{#each participants as participant, index (index)}
							<fieldset class="grid gap-3 sm:grid-cols-2">
								<legend class="mb-2 text-[0.85rem] font-semibold text-label-2">{index === 0 ? 'Dig' : `Deltager ${index + 1}`}</legend>
								<label class="block">
									<span class="sr-only">Fulde navn</span>
									<input bind:value={participant.name} autocomplete={index === 0 ? 'name' : 'off'} placeholder="Fulde navn" class="field {submitted && participantErrors[index]?.name ? 'border-[#ff3b30]' : ''}" />
								</label>
								<label class="block">
									<span class="sr-only">E-mail</span>
									<input bind:value={participant.email} type="email" autocomplete={index === 0 ? 'email' : 'off'} placeholder="E-mail" class="field {submitted && participantErrors[index]?.email ? 'border-[#ff3b30]' : ''}" />
								</label>
							</fieldset>
						{/each}
					</div>
					{#if submitted && participantErrors.some((error) => error.name || error.email)}
						<p class="mt-3 text-[0.9rem] font-medium text-[#ff3b30]">Udfyld navn og en gyldig e-mail for alle deltagere.</p>
					{/if}
				</section>

				<section class="card p-6">
					<h2 class="flex items-center gap-2 text-[1.15rem] font-semibold"><CreditCard class="size-5 text-accent" /> Betaling</h2>
					{#if amountDue > 0}
						<div class="mt-4 grid gap-2 sm:grid-cols-3" role="radiogroup" aria-label="Betalingsmetode">
							{#each methods as method (method.id)}
								<button
									type="button"
									role="radio"
									aria-checked={paymentMethod === method.id}
									onclick={() => (paymentMethod = method.id)}
									class="pressable flex flex-col items-start gap-2 rounded-2xl border-2 p-4 text-left transition-colors {paymentMethod === method.id ? 'border-brand bg-brand/5' : 'border-transparent bg-fill-2 hover:bg-fill'}"
								>
									{#if method.id === 'mobilepay'}
										<span class="grid h-7 place-items-center rounded-lg bg-[#5a78ff] px-2 text-[0.75rem] font-bold text-white">MobilePay</span>
									{:else if method.id === 'applepay'}
										<span class="grid h-7 place-items-center rounded-lg bg-black px-2.5 text-[0.8rem] font-semibold text-white dark:bg-white dark:text-black">Apple Pay</span>
									{:else}
										<span class="flex h-7 items-center gap-1">
											<span class="rounded-md bg-[#e4002b] px-1.5 py-1 text-[0.6rem] font-bold text-white">DANKORT</span>
											<span class="rounded-md bg-[#1a1f71] px-1.5 py-1 text-[0.6rem] font-bold text-white italic">VISA</span>
										</span>
									{/if}
									<span>
										<span class="block font-semibold">{method.label}</span>
										<span class="text-[0.8rem] text-label-2">{method.hint}</span>
									</span>
								</button>
							{/each}
						</div>

						{#if paymentMethod === 'card'}
							<div class="mt-4 grid grid-cols-2 gap-3" transition:fade={{ duration: 150 }}>
								<label class="col-span-2">
									<span class="sr-only">Kortnummer</span>
									<input value={card.number} oninput={(event) => (card.number = event.currentTarget.value = formatCardNumber(event.currentTarget.value))} inputmode="numeric" autocomplete="cc-number" placeholder="Kortnummer" class="field font-mono {submitted && card.number.replace(/\s/g, '').length < 15 ? 'border-[#ff3b30]' : ''}" />
								</label>
								<label>
									<span class="sr-only">Udløbsdato</span>
									<input value={card.expiry} oninput={(event) => (card.expiry = event.currentTarget.value = formatExpiry(event.currentTarget.value))} inputmode="numeric" autocomplete="cc-exp" placeholder="MM/ÅÅ" class="field font-mono {submitted && card.expiry.length < 5 ? 'border-[#ff3b30]' : ''}" />
								</label>
								<label>
									<span class="sr-only">Kontrolcifre</span>
									<input bind:value={card.cvc} maxlength="4" inputmode="numeric" autocomplete="cc-csc" placeholder="CVC" class="field font-mono {submitted && card.cvc.length < 3 ? 'border-[#ff3b30]' : ''}" />
								</label>
								<p class="col-span-2 text-[0.8rem] text-label-3">Demo: brug fx 4571 0000 0000 0001 · 12/29 · 123</p>
							</div>
						{/if}
					{:else}
						<p class="mt-3 rounded-2xl bg-success/10 p-4 font-medium text-success">Dit gavekort dækker hele beløbet — der skal ikke betales mere.</p>
					{/if}

					<div class="mt-5 border-t border-separator pt-4">
						{#if appliedGiftCard}
							<div class="flex items-center justify-between rounded-2xl bg-fill-2 p-3 pl-4">
								<span class="flex items-center gap-2 text-[0.95rem]"><Gift class="size-4 text-accent" /> Gavekort <span class="font-mono text-[0.85rem]">{appliedGiftCard.code}</span></span>
								<button type="button" onclick={() => (appliedGiftCode = '')} class="text-[0.9rem] font-semibold text-accent">Fjern</button>
							</div>
						{:else if giftCardOpen}
							<div class="flex gap-2">
								<input bind:value={giftCardInput} placeholder="GAVE-XXXX-XXXX" class="field font-mono uppercase" />
								<button type="button" onclick={applyGiftCard} class="btn btn-secondary">Anvend</button>
							</div>
							{#if giftCardError}<p class="mt-2 text-[0.9rem] text-[#ff3b30]">{giftCardError}</p>{/if}
							<button type="button" onclick={() => (giftCardInput = SAMPLE_GIFT_CARD_CODE)} class="mt-2 text-[0.8rem] text-label-3 hover:text-label-2">Demo: brug koden {SAMPLE_GIFT_CARD_CODE}</button>
						{:else}
							<button type="button" onclick={() => (giftCardOpen = true)} class="flex items-center gap-2 font-semibold text-accent"><Gift class="size-4" /> Har du et gavekort?</button>
						{/if}
					</div>
				</section>

				<label class="flex items-start gap-3 px-1 text-[0.92rem] text-label-2">
					<input type="checkbox" bind:checked={acceptedTerms} class="mt-0.5 size-5 accent-[var(--brand)]" />
					<span>Jeg accepterer Lezzonz' handelsbetingelser og afbestillingsregler. Gratis afbestilling indtil 48 timer før kursusstart.</span>
				</label>
			</div>

			<aside class="lg:sticky lg:top-28 lg:self-start">
				<div class="card overflow-hidden">
					<CourseCover {course} class="h-36" emojiSize="3.6rem" />
					<div class="p-6">
						<h2 class="text-[1.15rem] leading-snug font-semibold">{course.title}</h2>
						<p class="mt-1 text-[0.9rem] text-label-2">{host.name}</p>
						<ul class="mt-4 space-y-2 text-[0.92rem]">
							<li class="flex items-center gap-2"><CalendarDays class="size-4 text-label-2" />{formatLongDate(session.date)}, {formatTime(session.date)}</li>
							<li class="flex items-center gap-2"><MapPin class="size-4 text-label-2" />{course.venue}, {course.city}</li>
							<li class="flex items-center gap-2"><Check class="size-4 text-label-2" />{formatDuration(course.durationMinutes, course.durationNote)} · kursusbevis inkluderet</li>
						</ul>
						<dl class="mt-5 space-y-2 border-t border-separator pt-4 text-[0.95rem]">
							<div class="flex justify-between"><dt class="text-label-2">{participants.length} × {formatPrice(course.price)}</dt><dd>{formatPrice(subtotal)}</dd></div>
							{#if giftCardAmount}
								<div class="flex justify-between text-success"><dt>Gavekort</dt><dd>−{formatPrice(giftCardAmount)}</dd></div>
							{/if}
							<div class="flex justify-between pt-2 text-[1.15rem] font-bold"><dt>At betale</dt><dd>{formatPrice(amountDue)}</dd></div>
							<div class="text-[0.8rem] text-label-3">Inkl. moms</div>
						</dl>
						<button class="btn btn-brand mt-5 hidden w-full lg:flex" disabled={paymentStage !== 'idle'}>
							<Lock class="size-4" />{payLabel}
						</button>
						<p class="mt-3 hidden text-center text-[0.78rem] text-label-3 lg:block">Demo — der trækkes ingen penge.</p>
					</div>
				</div>
			</aside>

			<div class="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
				<button class="btn btn-brand h-14 w-full text-[1.05rem] shadow-float" disabled={paymentStage !== 'idle'}>
					<Lock class="size-4" />{payLabel}
				</button>
			</div>
		</form>
	{/if}
</section>

<PaymentSheet stage={paymentStage} method={paymentMethod} amount={amountDue} />
