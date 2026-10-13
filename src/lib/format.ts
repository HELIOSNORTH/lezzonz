const priceFormatter = new Intl.NumberFormat('da-DK', {
	style: 'currency',
	currency: 'DKK',
	maximumFractionDigits: 0
});
const numberFormatter = new Intl.NumberFormat('da-DK');
const shortDate = new Intl.DateTimeFormat('da-DK', { weekday: 'short', day: 'numeric', month: 'short' });
const longDate = new Intl.DateTimeFormat('da-DK', { weekday: 'long', day: 'numeric', month: 'long' });
const fullDate = new Intl.DateTimeFormat('da-DK', { day: 'numeric', month: 'long', year: 'numeric' });
const timeFormat = new Intl.DateTimeFormat('da-DK', { hour: '2-digit', minute: '2-digit' });
const dayNumber = new Intl.DateTimeFormat('da-DK', { day: 'numeric' });
const monthShort = new Intl.DateTimeFormat('da-DK', { month: 'short' });

const capitalize = (text: string) => text.charAt(0).toLocaleUpperCase('da-DK') + text.slice(1);

export const formatPrice = (amount: number) => priceFormatter.format(amount);
export const formatNumber = (value: number) => numberFormatter.format(value);
export const formatRating = (rating: number) => rating.toLocaleString('da-DK', { minimumFractionDigits: 1 });
export const formatShortDate = (date: Date) => capitalize(shortDate.format(date));
export const formatLongDate = (date: Date) => capitalize(longDate.format(date));
export const formatFullDate = (date: Date) => fullDate.format(date);
export const formatTime = (date: Date) => `kl. ${timeFormat.format(date)}`;
export const formatDay = (date: Date) => dayNumber.format(date).replace('.', '');
export const formatMonth = (date: Date) => monthShort.format(date).replace('.', '').toLocaleUpperCase('da-DK');

export function formatDuration(minutes: number, note?: string): string {
	if (note) return note;
	const hours = Math.floor(minutes / 60);
	const rest = minutes % 60;
	if (rest === 0) return hours === 1 ? '1 time' : `${hours} timer`;
	if (rest === 30) return `${hours}½ time`;
	return hours ? `${hours} t ${rest} min` : `${rest} min`;
}

export const formatDurationShort = (minutes: number) => {
	const hours = minutes / 60;
	return Number.isInteger(hours) ? `${hours} t` : `${hours.toLocaleString('da-DK')} t`;
};

export function formatRelativeDay(date: Date): string {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const target = new Date(date);
	target.setHours(0, 0, 0, 0);
	const days = Math.round((target.getTime() - today.getTime()) / 86_400_000);
	if (days === 0) return 'I dag';
	if (days === 1) return 'I morgen';
	if (days > 1 && days < 7) return `Om ${days} dage`;
	if (days < 0 && days > -2) return 'I går';
	if (days < 0) return `For ${-days} dage siden`;
	return formatShortDate(date);
}

export const plural = (count: number, singular: string, pluralForm: string) =>
	`${formatNumber(count)} ${count === 1 ? singular : pluralForm}`;
