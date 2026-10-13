import { categories } from '#lib/data/categories.ts';
import { courses } from '#lib/data/courses.ts';
import { hosts } from '#lib/data/hosts.ts';
import type { CategoryId, City, Course, DatedSession, Host } from '#lib/types.ts';

export { categories, courses, hosts };

export const getCourse = (slug: string) => courses.find((course) => course.slug === slug);
export const getHost = (slug: string) => hosts.find((host) => host.slug === slug);
export const getCategory = (id: CategoryId) => categories.find((category) => category.id === id)!;
export const coursesByHost = (hostSlug: string) => courses.filter((course) => course.host === hostSlug);
export const giftCardPartners = hosts.filter((host): host is Host & Required<Pick<Host, 'giftCardPartner'>> =>
	Boolean(host.giftCardPartner)
);

export function dateFromOffset(dayOffset: number, start: string): Date {
	const [hours, minutes] = start.split(':').map(Number);
	const date = new Date();
	date.setHours(hours, minutes, 0, 0);
	date.setDate(date.getDate() + dayOffset);
	return date;
}

export const datedSessions = (course: Course): DatedSession[] =>
	course.sessions
		.map((session) => ({ ...session, date: dateFromOffset(session.dayOffset, session.start) }))
		.sort((a, b) => a.date.getTime() - b.date.getTime());

export const nextAvailableSession = (course: Course) =>
	datedSessions(course).find((session) => session.spotsLeft > 0);

export const totalSpotsLeft = (course: Course) =>
	course.sessions.reduce((sum, session) => sum + session.spotsLeft, 0);

export function upcomingWithin(days: number) {
	return courses
		.flatMap((course) =>
			datedSessions(course)
				.filter((session) => session.dayOffset <= days && session.spotsLeft > 0)
				.map((session) => ({ course, session }))
		)
		.sort((a, b) => a.session.date.getTime() - b.session.date.getTime());
}

export type SortKey = 'populaer' | 'dato' | 'pris-lav' | 'pris-hoej' | 'bedoemmelse';

export interface CourseFilter {
	query?: string;
	category?: CategoryId | null;
	city?: City | null;
	maxPrice?: number | null;
	sort?: SortKey;
}

const normalize = (text: string) => text.toLocaleLowerCase('da-DK').normalize('NFKD');

export function filterCourses({ query, category, city, maxPrice, sort = 'populaer' }: CourseFilter): Course[] {
	const terms = query ? normalize(query).split(/\s+/).filter(Boolean) : [];
	const matches = courses.filter((course) => {
		if (category && course.category !== category) return false;
		if (city && course.city !== city) return false;
		if (maxPrice && course.price > maxPrice) return false;
		if (!terms.length) return true;
		const host = getHost(course.host);
		const haystack = normalize(
			[course.title, course.summary, course.city, course.venue, host?.name, host?.person, getCategory(course.category).name].join(' ')
		);
		return terms.every((term) => haystack.includes(term));
	});

	const nextTime = (course: Course) => nextAvailableSession(course)?.date.getTime() ?? Infinity;
	const sorters: Record<SortKey, (a: Course, b: Course) => number> = {
		populaer: (a, b) => b.reviewCount * b.rating - a.reviewCount * a.rating,
		dato: (a, b) => nextTime(a) - nextTime(b),
		'pris-lav': (a, b) => a.price - b.price,
		'pris-hoej': (a, b) => b.price - a.price,
		bedoemmelse: (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount
	};
	return matches.sort(sorters[sort]);
}

export function courseContext(slug: string) {
	const course = getCourse(slug);
	if (!course) return null;
	return { course, host: getHost(course.host)!, category: getCategory(course.category) };
}

export function hostContext(slug: string) {
	const host = getHost(slug);
	if (!host) return null;
	return { host, courses: coursesByHost(host.slug) };
}
