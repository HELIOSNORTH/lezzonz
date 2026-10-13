export type CategoryId =
	| 'mad-drikke'
	| 'sport-motor'
	| 'oplevelser'
	| 'hygge-fritid'
	| 'kreativ-musik'
	| 'viden-it';

export type City = 'Aarhus' | 'København' | 'Odense' | 'Aalborg' | 'Vejle' | 'Silkeborg' | 'Roskilde';

export interface Category {
	id: CategoryId;
	name: string;
	emoji: string;
	tint: string;
}

export interface Host {
	slug: string;
	name: string;
	person: string;
	role: string;
	city: City;
	bio: string;
	since: number;
	initials: string;
	gradient: [string, string];
	giftCardPartner?: { storeName: string; address: string };
}

export interface Session {
	id: string;
	dayOffset: number;
	start: string;
	spotsLeft: number;
}

export interface Course {
	slug: string;
	title: string;
	summary: string;
	category: CategoryId;
	host: string;
	city: City;
	venue: string;
	address: string;
	price: number;
	durationMinutes: number;
	durationNote?: string;
	capacity: number;
	minAge?: number;
	level: 'Begynder' | 'Let øvet' | 'Alle niveauer' | 'Øvet';
	learn: string[];
	includes: string[];
	bring?: string[];
	rating: number;
	reviewCount: number;
	sessions: Session[];
	featured?: boolean;
}

export interface Review {
	name: string;
	city: string;
	rating: number;
	text: string;
}

export interface DatedSession extends Session {
	date: Date;
}

export interface Participant {
	name: string;
	email: string;
}

export type PaymentMethod = 'mobilepay' | 'card' | 'applepay' | 'giftcard';

export interface Booking {
	id: string;
	courseSlug: string;
	sessionId: string;
	startsAt: string;
	participants: Participant[];
	total: number;
	giftCardUsed: number;
	paymentMethod: PaymentMethod;
	createdAt: string;
	completed: boolean;
}

export interface Certificate {
	id: string;
	bookingId: string;
	courseSlug: string;
	holderName: string;
	completedAt: string;
}

export type GiftCardDesign = 'aftenrod' | 'fjord' | 'skov' | 'champagne';

export interface GiftCard {
	code: string;
	amount: number;
	balance: number;
	design: GiftCardDesign;
	recipient: string;
	sender: string;
	message: string;
	hostSlug?: string;
	courseSlug?: string;
	createdAt: string;
	received?: boolean;
}
