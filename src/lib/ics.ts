const stamp = (date: Date) => date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
const escape = (text: string) => text.replace(/[\;,]/g, (match) => `\\${match}`).replace(/\n/g, '\\n');

export function downloadCalendarEvent(event: { uid: string; title: string; start: Date; minutes: number; location: string; description: string }) {
	const end = new Date(event.start.getTime() + event.minutes * 60_000);
	const lines = [
		'BEGIN:VCALENDAR',
		'VERSION:2.0',
		'PRODID:-//Lezzonz//Demo//DA',
		'BEGIN:VEVENT',
		`UID:${event.uid}@lezzonz.dk`,
		`DTSTAMP:${stamp(new Date())}`,
		`DTSTART:${stamp(event.start)}`,
		`DTEND:${stamp(end)}`,
		`SUMMARY:${escape(event.title)}`,
		`LOCATION:${escape(event.location)}`,
		`DESCRIPTION:${escape(event.description)}`,
		'BEGIN:VALARM',
		'TRIGGER:-P1D',
		'ACTION:DISPLAY',
		`DESCRIPTION:${escape(event.title)} i morgen`,
		'END:VALARM',
		'END:VEVENT',
		'END:VCALENDAR'
	];
	const url = URL.createObjectURL(new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' }));
	const link = Object.assign(document.createElement('a'), { href: url, download: `${event.title}.ics` });
	link.click();
	setTimeout(() => URL.revokeObjectURL(url), 1000);
}
