import { dateFromOffset, getCourse } from '#lib/catalog.ts';
import type { Booking, Certificate, GiftCard, GiftCardDesign, Participant, PaymentMethod } from '#lib/types.ts';

const STORAGE_KEY = 'lezzonz-demo-v2';
const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

interface DemoState {
	user: Participant;
	bookings: Booking[];
	certificates: Certificate[];
	giftCards: GiftCard[];
	favorites: string[];
}

const randomBlock = (length = 4) =>
	Array.from(crypto.getRandomValues(new Uint32Array(length)), (n) => CODE_ALPHABET[n % CODE_ALPHABET.length]).join('');

export const newCertificateId = () => `LZ-${randomBlock()}-${randomBlock()}`;
const newBookingId = () => `B-${randomBlock(6)}`;
const newGiftCardCode = () => `GAVE-${randomBlock()}-${randomBlock()}`;

export const SAMPLE_CERTIFICATE_ID = 'LZ-4F7K-9QX2';
export const SAMPLE_GIFT_CARD_CODE = 'GAVE-7HMK-Q3PD';

function seedState(): DemoState {
	const user = { name: 'Sofie Lund', email: 'sofie.lund@example.com' };
	const partner = { name: 'Jonas Lund', email: 'jonas.lund@example.com' };
	const now = new Date();
	const daysAgo = (days: number) => new Date(now.getTime() - days * 86_400_000).toISOString();

	const bookings: Booking[] = [
		{
			id: 'B-H7N2QK',
			courseSlug: 'ai-i-hverdagen',
			sessionId: 'ai-past',
			startsAt: dateFromOffset(-23, '09:00').toISOString(),
			participants: [user],
			total: 1295,
			giftCardUsed: 0,
			paymentMethod: 'mobilepay',
			createdAt: daysAgo(40),
			completed: true
		},
		{
			id: 'B-W3GJ8T',
			courseSlug: 'gin-smagning',
			sessionId: 'gin-past',
			startsAt: dateFromOffset(-51, '19:00').toISOString(),
			participants: [user, partner],
			total: 900,
			giftCardUsed: 0,
			paymentMethod: 'card',
			createdAt: daysAgo(70),
			completed: true
		},
		{
			id: 'B-R5VD9M',
			courseSlug: 'blomsterbinding',
			sessionId: 'blomst-2',
			startsAt: dateFromOffset(9, '17:00').toISOString(),
			participants: [user],
			total: 545,
			giftCardUsed: 0,
			paymentMethod: 'applepay',
			createdAt: daysAgo(3),
			completed: false
		}
	];

	return {
		user,
		bookings,
		certificates: [
			{ id: SAMPLE_CERTIFICATE_ID, bookingId: 'B-H7N2QK', courseSlug: 'ai-i-hverdagen', holderName: user.name, completedAt: bookings[0].startsAt },
			{ id: 'LZ-8TQM-2HXD', bookingId: 'B-W3GJ8T', courseSlug: 'gin-smagning', holderName: user.name, completedAt: bookings[1].startsAt },
			{ id: 'LZ-C6RP-5WNA', bookingId: 'B-W3GJ8T', courseSlug: 'gin-smagning', holderName: partner.name, completedAt: bookings[1].startsAt }
		],
		giftCards: [
			{
				code: SAMPLE_GIFT_CARD_CODE,
				amount: 1000,
				balance: 1000,
				design: 'champagne',
				recipient: 'Sofie',
				sender: 'Mor og far',
				message: 'Tillykke med fødselsdagen, skat. Find noget sjovt, du gerne vil lære. Knus',
				createdAt: daysAgo(12),
				received: true
			}
		],
		favorites: ['napolitansk-pizza', 'banekursus', 'floedeboller']
	};
}

function readStorage(): DemoState | null {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? (JSON.parse(raw) as DemoState) : null;
	} catch {
		return null;
	}
}

class DemoStore {
	state = $state<DemoState>(readStorage() ?? seedState());

	constructor() {
		this.completeFinishedBookings();
		this.save();
	}

	get user() {
		return this.state.user;
	}

	private save() {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify($state.snapshot(this.state)));
		} catch {
			return;
		}
	}

	private completeFinishedBookings() {
		const now = Date.now();
		for (const booking of this.state.bookings) {
			const course = getCourse(booking.courseSlug);
			const endsAt = new Date(booking.startsAt).getTime() + (course?.durationMinutes ?? 0) * 60_000;
			if (!booking.completed && endsAt < now) this.issueCertificates(booking);
		}
	}

	private issueCertificates(booking: Booking): Certificate[] {
		booking.completed = true;
		const issued = booking.participants.map((participant) => ({
			id: newCertificateId(),
			bookingId: booking.id,
			courseSlug: booking.courseSlug,
			holderName: participant.name,
			completedAt: booking.startsAt
		}));
		this.state.certificates.unshift(...issued);
		return issued;
	}

	isFavorite = (slug: string) => this.state.favorites.includes(slug);

	toggleFavorite(slug: string): boolean {
		const index = this.state.favorites.indexOf(slug);
		if (index >= 0) this.state.favorites.splice(index, 1);
		else this.state.favorites.unshift(slug);
		this.save();
		return index < 0;
	}

	seatsTaken = (sessionId: string) =>
		this.state.bookings
			.filter((booking) => booking.sessionId === sessionId)
			.reduce((sum, booking) => sum + booking.participants.length, 0);

	createBooking(input: {
		courseSlug: string;
		sessionId: string;
		startsAt: Date;
		participants: Participant[];
		total: number;
		paymentMethod: PaymentMethod;
		giftCardCode?: string;
	}): Booking {
		let giftCardUsed = 0;
		if (input.giftCardCode) {
			const card = this.findGiftCard(input.giftCardCode);
			if (card) {
				giftCardUsed = Math.min(card.balance, input.total);
				card.balance -= giftCardUsed;
			}
		}
		const booking: Booking = {
			id: newBookingId(),
			courseSlug: input.courseSlug,
			sessionId: input.sessionId,
			startsAt: input.startsAt.toISOString(),
			participants: input.participants,
			total: input.total,
			giftCardUsed,
			paymentMethod: input.paymentMethod,
			createdAt: new Date().toISOString(),
			completed: false
		};
		this.state.bookings.unshift(booking);
		this.state.user = { ...input.participants[0] };
		this.save();
		return booking;
	}

	getBooking = (id: string) => this.state.bookings.find((booking) => booking.id === id);

	completeBooking(id: string): Certificate[] {
		const booking = this.getBooking(id);
		if (!booking || booking.completed) return [];
		const issued = this.issueCertificates(booking);
		this.save();
		return issued;
	}

	getCertificate = (id: string) =>
		this.state.certificates.find((certificate) => certificate.id === id.trim().toUpperCase());

	certificatesFor = (bookingId: string) =>
		this.state.certificates.filter((certificate) => certificate.bookingId === bookingId);

	findGiftCard = (code: string) =>
		this.state.giftCards.find((card) => card.code === code.trim().toUpperCase());

	createGiftCard(input: {
		amount: number;
		design: GiftCardDesign;
		recipient: string;
		sender: string;
		message: string;
		hostSlug?: string;
		courseSlug?: string;
	}): GiftCard {
		const card: GiftCard = {
			...input,
			code: newGiftCardCode(),
			balance: input.amount,
			createdAt: new Date().toISOString()
		};
		this.state.giftCards.unshift(card);
		this.save();
		return card;
	}

	reset() {
		this.state = seedState();
		this.save();
	}
}

export const demo = new DemoStore();
