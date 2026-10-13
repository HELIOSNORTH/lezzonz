import type { Host } from '#lib/types.ts';

export const hosts: Host[] = [
	{
		slug: 'pizzaskolen-aarhus',
		name: 'Pizzaskolen Aarhus',
		person: 'Matteo Rossi',
		role: 'Pizzaiolo',
		city: 'Aarhus',
		bio: 'Matteo er født i Napoli og har bagt pizza i over 20 år. Siden 2019 har han lært tusindvis af århusianere at lave den perfekte dej — med 72 timers hævning og masser af humør.',
		since: 2019,
		initials: 'MR',
		gradient: ['#ff9a5a', '#ff4d2e'],
		giftCardPartner: { storeName: 'Pizzaskolen, Mejlgade', address: 'Mejlgade 48, 8000 Aarhus C' }
	},
	{
		slug: 'konditori-sukkerblomst',
		name: 'Konditori Sukkerblomst',
		person: 'Ida Holm',
		role: 'Konditor',
		city: 'København',
		bio: 'Et lille konditori på Frederiksberg, kendt for sine håndlavede flødeboller. Ida deler gerne ud af hemmelighederne bag den perfekte skum og den sprøde chokoladeskal.',
		since: 2016,
		initials: 'IH',
		gradient: ['#f7b7c5', '#c9667f'],
		giftCardPartner: { storeName: 'Konditori Sukkerblomst', address: 'Værnedamsvej 9, 1819 Frederiksberg C' }
	},
	{
		slug: 'limfjord-destilleri',
		name: 'Limfjord Destilleri',
		person: 'Anders Kjær',
		role: 'Destillatør',
		city: 'Aalborg',
		bio: 'Et nordjysk mikrodestilleri, der laver gin på botanicals fra Limfjordens kyster. Anders guider dig gennem smagen, duften og håndværket.',
		since: 2018,
		initials: 'AK',
		gradient: ['#8fd3c7', '#2e7d74'],
		giftCardPartner: { storeName: 'Destilleriets gårdbutik', address: 'Søndergade 21, 9000 Aalborg' }
	},
	{
		slug: 'bar-nord',
		name: 'Bar Nord Academy',
		person: 'Sebastian Friis',
		role: 'Bartender',
		city: 'København',
		bio: 'Sebastian har stået bag baren i København, London og New York. Nu underviser han i klassiske cocktails, teknik og værtskab.',
		since: 2021,
		initials: 'SF',
		gradient: ['#4c3a8f', '#1d1440'],
		giftCardPartner: { storeName: 'Bar Nord', address: 'Gothersgade 33, 1123 København K' }
	},
	{
		slug: 'nordic-track-academy',
		name: 'Nordic Track Academy',
		person: 'Mikkel Damgaard',
		role: 'Racerkører & instruktør',
		city: 'Silkeborg',
		bio: 'Mikkel har kørt danske og nordiske mesterskaber i ti sæsoner. Hans banekurser lægger vægt på sikkerhed, teknik og dokumenteret gennemførelse.',
		since: 2014,
		initials: 'MD',
		gradient: ['#64d2ff', '#0a3d91'],
		giftCardPartner: { storeName: 'Nordic Track Academy, depotet', address: 'Ringvejen 5, 8600 Silkeborg' }
	},
	{
		slug: 'skovens-spisekammer',
		name: 'Skovens Spisekammer',
		person: 'Karen Vestergaard',
		role: 'Naturvejleder',
		city: 'Aalborg',
		bio: 'Karen har samlet svampe i Rold Skov, siden hun var barn. I dag er hun uddannet svampekontrollant og naturvejleder.',
		since: 2013,
		initials: 'KV',
		gradient: ['#c5a880', '#53412c'],
		giftCardPartner: { storeName: 'Skovens Spisekammer', address: 'Rebildvej 25, 9520 Skørping' }
	},
	{
		slug: 'blomstervaerkstedet',
		name: 'Blomsterværkstedet',
		person: 'Maja Kristensen',
		role: 'Florist',
		city: 'Aarhus',
		bio: 'En lille blomsterbutik i Frederiksbjerg med fokus på danske sæsonblomster. Maja holder værksted hver uge.',
		since: 2017,
		initials: 'MK',
		gradient: ['#ffb3c7', '#e0457b'],
		giftCardPartner: { storeName: 'Blomsterværkstedet', address: 'Jægergårdsgade 112, 8000 Aarhus C' }
	},
	{
		slug: 'garnhuset',
		name: 'Garnhuset Odense',
		person: 'Hanne Iversen',
		role: 'Strikdesigner',
		city: 'Odense',
		bio: 'Hanne har designet strikkeopskrifter i 20 år. I Garnhuset finder du både garn, kaffe og et hyggeligt fællesskab.',
		since: 2011,
		initials: 'HI',
		gradient: ['#d4a5a5', '#7d4e57'],
		giftCardPartner: { storeName: 'Garnhuset, Vestergade', address: 'Vestergade 31, 5000 Odense C' }
	},
	{
		slug: 'beatlab',
		name: 'BeatLab Aarhus',
		person: 'Oliver Strand',
		role: 'Musikproducer',
		city: 'Aarhus',
		bio: 'Oliver har produceret for flere danske kunstnere og driver et lydstudie i Godsbanen.',
		since: 2020,
		initials: 'OS',
		gradient: ['#bf5af2', '#2c1250'],
		giftCardPartner: { storeName: 'BeatLab, Godsbanen', address: 'Skovgaardsgade 3, 8000 Aarhus C' }
	},
	{
		slug: 'digital-hverdag',
		name: 'Digital Hverdag',
		person: 'Louise Kragh',
		role: 'AI-underviser',
		city: 'Aarhus',
		bio: 'Louise hjælper virksomheder og privatpersoner med at bruge AI-værktøjer trygt og effektivt.',
		since: 2023,
		initials: 'LK',
		gradient: ['#64d2ff', '#5e5ce6'],
		giftCardPartner: { storeName: 'Digital Hverdag, Navitas', address: 'Inge Lehmanns Gade 10, 8000 Aarhus C' }
	}
];
