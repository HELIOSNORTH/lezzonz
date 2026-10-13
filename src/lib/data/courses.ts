import type { Course, Session } from '#lib/types.ts';

type SessionRow = [dayOffset: number, start: string, spotsLeft: number];

const sessions = (prefix: string, rows: SessionRow[]): Session[] =>
	rows.map(([dayOffset, start, spotsLeft], index) => ({
		id: `${prefix}-${index + 1}`,
		dayOffset,
		start,
		spotsLeft
	}));

export const courses: Course[] = [
	{
		slug: 'napolitansk-pizza',
		title: 'Napolitansk pizza fra bunden',
		summary: 'Lær at lave dej, sauce og den perfekte luftige kant — og bag din egen pizza i stenovn.',
		category: 'mad-drikke',
		host: 'pizzaskolen-aarhus',
		city: 'Aarhus',
		venue: 'Pizzaskolen',
		address: 'Mejlgade 48, 8000 Aarhus C',
		price: 700,
		durationMinutes: 180,
		capacity: 16,
		level: 'Alle niveauer',
		learn: [
			'Æltning, foldning og hævning af napolitansk dej',
			'San Marzano-tomatsauce og valg af ost',
			'Udstrækning af bunden uden kagerulle',
			'Bagning i stenovn — og hvordan du gør det derhjemme'
		],
		includes: ['Alle råvarer', 'Et glas vin eller sodavand', 'Opskrift og dejkugle med hjem', 'Kursusbevis'],
		bring: ['Godt humør — forklæde låner du af os'],
		rating: 4.9,
		reviewCount: 1284,
		featured: true,
		sessions: sessions('pizza', [
			[2, '17:30', 3],
			[4, '17:30', 0],
			[5, '12:00', 6],
			[9, '17:30', 11],
			[11, '12:00', 8],
			[16, '17:30', 14]
		])
	},
	{
		slug: 'floedeboller',
		title: 'Flødeboller i særklasse',
		summary: 'Lav dine egne flødeboller med sprød bund, luftig skum og blank chokolade.',
		category: 'mad-drikke',
		host: 'konditori-sukkerblomst',
		city: 'København',
		venue: 'Konditori Sukkerblomst',
		address: 'Værnedamsvej 9, 1819 Frederiksberg C',
		price: 595,
		durationMinutes: 150,
		capacity: 10,
		level: 'Begynder',
		learn: ['Marcipan- og kiksbunde', 'Italiensk marengs-skum', 'Temperering af chokolade', 'Pynt og smagsvarianter'],
		includes: ['Alle råvarer', 'Kaffe og te', 'Æske med 12 flødeboller', 'Kursusbevis'],
		rating: 4.9,
		reviewCount: 486,
		featured: true,
		sessions: sessions('floede', [
			[3, '17:00', 2],
			[8, '13:00', 6],
			[15, '17:00', 10],
			[22, '13:00', 10]
		])
	},
	{
		slug: 'gin-smagning',
		title: 'Ginsmagning med egne botanicals',
		summary: 'Smag fem nordiske gins, og blend din egen flaske med urter fra Limfjorden.',
		category: 'mad-drikke',
		host: 'limfjord-destilleri',
		city: 'Aalborg',
		venue: 'Limfjord Destilleri',
		address: 'Søndergade 21, 9000 Aalborg',
		price: 450,
		durationMinutes: 120,
		capacity: 18,
		minAge: 18,
		level: 'Alle niveauer',
		learn: ['Destillation og botanicals', 'Smagning som en professionel', 'Den perfekte gin & tonic'],
		includes: ['Fem smagsprøver', 'Snacks', 'Egen 20 cl ginflaske', 'Kursusbevis'],
		rating: 4.8,
		reviewCount: 238,
		sessions: sessions('gin', [
			[4, '19:00', 7],
			[11, '19:00', 12],
			[18, '19:00', 18]
		])
	},
	{
		slug: 'cocktails-bartending',
		title: 'Bartending og klassiske cocktails',
		summary: 'Ryst, rør og pynt som en professionel. Seks klassikere og teknikken bag.',
		category: 'mad-drikke',
		host: 'bar-nord',
		city: 'København',
		venue: 'Bar Nord',
		address: 'Gothersgade 33, 1123 København K',
		price: 650,
		durationMinutes: 180,
		capacity: 14,
		minAge: 18,
		level: 'Begynder',
		learn: ['Shake, stir og build', 'Balance mellem sødt og surt', 'Is, glas og garnish', 'Seks klassiske opskrifter'],
		includes: ['Seks cocktails', 'Bartender-udstyr til låns', 'Opskriftshæfte', 'Kursusbevis'],
		rating: 4.7,
		reviewCount: 392,
		sessions: sessions('bar', [
			[3, '19:00', 4],
			[10, '19:00', 9],
			[17, '19:00', 14]
		])
	},
	{
		slug: 'banekursus',
		title: 'Banekursus: Sikker og hurtig på racerbanen',
		summary: 'Teori, teknik og mange omgange på banen — med dokumenteret kursusbevis.',
		category: 'sport-motor',
		host: 'nordic-track-academy',
		city: 'Silkeborg',
		venue: 'Jyllandsringen',
		address: 'Jyllandsringen, 8600 Silkeborg',
		price: 2995,
		durationMinutes: 360,
		capacity: 12,
		minAge: 18,
		level: 'Begynder',
		learn: ['Ideallinje og bremsepunkter', 'Flag, regler og sikkerhed', 'Vægtoverføring og greb', 'Kørsel med og uden instruktør'],
		includes: ['Instruktør', 'Hjelm og køredragt til låns', 'Frokost', 'Digitalt kursusbevis'],
		bring: ['Gyldigt kørekort', 'Egen bil eller lejebil (kan tilkøbes)'],
		rating: 4.9,
		reviewCount: 168,
		featured: true,
		sessions: sessions('bane', [
			[10, '09:00', 3],
			[24, '09:00', 8],
			[38, '09:00', 12]
		])
	},
	{
		slug: 'svampetur',
		title: 'Svampetur i Rold Skov',
		summary: 'Find, kend og tilbered skovens svampe sammen med en uddannet svampekontrollant.',
		category: 'oplevelser',
		host: 'skovens-spisekammer',
		city: 'Aalborg',
		venue: 'Rold Skov, P-pladsen ved Rebild',
		address: 'Rebildvej 25, 9520 Skørping',
		price: 350,
		durationMinutes: 180,
		capacity: 20,
		level: 'Alle niveauer',
		learn: ['Spisesvampe og giftsvampe', 'Hvor og hvornår du finder dem', 'Tilberedning over bål'],
		includes: ['Svampekontrol', 'Smagning ved bålet', 'Varm kaffe'],
		bring: ['Kurv og kniv', 'Tøj efter vejret'],
		rating: 4.9,
		reviewCount: 188,
		sessions: sessions('svamp', [
			[5, '10:00', 7],
			[12, '10:00', 15]
		])
	},
	{
		slug: 'blomsterbinding',
		title: 'Blomsterbinding: Sæsonens buket',
		summary: 'Bind en spiralbuket af danske sæsonblomster, og lær florist-tricks til vasen derhjemme.',
		category: 'hygge-fritid',
		host: 'blomstervaerkstedet',
		city: 'Aarhus',
		venue: 'Blomsterværkstedet',
		address: 'Jægergårdsgade 112, 8000 Aarhus C',
		price: 545,
		durationMinutes: 120,
		capacity: 10,
		level: 'Begynder',
		learn: ['Spiralbinding', 'Farver og former', 'Pasning og holdbarhed'],
		includes: ['Alle blomster', 'Kaffe og kage', 'Din egen buket', 'Kursusbevis'],
		rating: 4.9,
		reviewCount: 274,
		featured: true,
		sessions: sessions('blomst', [
			[3, '17:00', 4],
			[9, '17:00', 6],
			[17, '10:00', 10]
		])
	},
	{
		slug: 'strik-sweater',
		title: 'Strik din første sweater',
		summary: 'Fire hyggelige aftener, hvor du strikker en raglansweater fra top til tå.',
		category: 'hygge-fritid',
		host: 'garnhuset',
		city: 'Odense',
		venue: 'Garnhuset',
		address: 'Vestergade 31, 5000 Odense C',
		price: 1195,
		durationMinutes: 600,
		durationNote: '4 aftener à 2½ time',
		capacity: 10,
		level: 'Let øvet',
		learn: ['Strik fra toppen', 'Raglanudtagninger', 'Ærmer og ribkanter', 'Måltagning og pasform'],
		includes: ['Opskrift', 'Kaffe og kage', '15 % rabat på garn', 'Kursusbevis'],
		rating: 4.9,
		reviewCount: 143,
		sessions: sessions('strik', [
			[7, '18:30', 3],
			[35, '18:30', 10]
		])
	},
	{
		slug: 'beats-ableton',
		title: 'Lav dit første beat i Ableton',
		summary: 'Trommer, bas og melodi. Gå hjem med dit eget nummer på fire timer.',
		category: 'kreativ-musik',
		host: 'beatlab',
		city: 'Aarhus',
		venue: 'BeatLab, Godsbanen',
		address: 'Skovgaardsgade 3, 8000 Aarhus C',
		price: 895,
		durationMinutes: 240,
		capacity: 8,
		level: 'Begynder',
		learn: ['Ableton Live fra bunden', 'Trommer og groove', 'Bas, melodi og arrangement'],
		includes: ['Computer og hovedtelefoner', 'Dit nummer som fil', 'Kursusbevis'],
		rating: 4.8,
		reviewCount: 117,
		sessions: sessions('beat', [
			[5, '12:00', 3],
			[19, '12:00', 8]
		])
	},
	{
		slug: 'ai-i-hverdagen',
		title: 'AI i hverdagen og på jobbet',
		summary: 'Brug ChatGPT, Copilot og Claude trygt og effektivt. Praktisk, ærligt og uden hype.',
		category: 'viden-it',
		host: 'digital-hverdag',
		city: 'Aarhus',
		venue: 'Digital Hverdag, Navitas',
		address: 'Inge Lehmanns Gade 10, 8000 Aarhus C',
		price: 1295,
		durationMinutes: 180,
		capacity: 16,
		level: 'Begynder',
		learn: ['Gode prompts', 'Datasikkerhed og GDPR', 'AI til dine egne opgaver'],
		includes: ['Kaffe og frokost', 'Prompt-guide', 'Kursusbevis'],
		bring: ['Bærbar computer'],
		rating: 4.8,
		reviewCount: 211,
		sessions: sessions('ai', [
			[6, '09:00', 6],
			[20, '09:00', 16]
		])
	}
];
