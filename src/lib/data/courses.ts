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
		description: [
			'På tre hyggelige timer tager Matteo dig med fra mel og vand til en ægte napolitansk pizza. Du lærer, hvordan dejen skal æltes, hvorfor hævetiden betyder alt, og hvordan du får den luftige, leopardplettede kant.',
			'Vi bager i en 450 grader varm stenovn, og selvfølgelig spiser vi pizzaerne sammen bagefter. Du går hjem med opskrift, en dejkugle til næste dag og masser af selvtillid.'
		],
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
		emoji: '🍕',
		gradient: ['#ffb36b', '#ff4d2e', '#ffd166'],
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
		slug: 'pizza-boern-og-voksne',
		title: 'Pizzaværksted for børn og voksne',
		summary: 'En weekendformiddag med mel på næsen. Børn og voksne bager hver deres pizza.',
		description: [
			'Et sjovt og trygt værksted, hvor børn fra 6 år og deres voksne laver pizza sammen. Matteo viser, hvordan dejen skal behandles, og alle får lov at vælge deres egne toppings.',
			'Prisen gælder pr. deltager — både børn og voksne.'
		],
		category: 'mad-drikke',
		host: 'pizzaskolen-aarhus',
		city: 'Aarhus',
		venue: 'Pizzaskolen',
		address: 'Mejlgade 48, 8000 Aarhus C',
		price: 395,
		durationMinutes: 120,
		capacity: 20,
		minAge: 6,
		level: 'Begynder',
		learn: ['Dej fra bunden', 'Sjove toppings', 'Sikker brug af ovn og knive'],
		includes: ['Alle råvarer', 'Saftevand og kaffe', 'Diplom til børnene'],
		emoji: '👩‍🍳',
		gradient: ['#ffe29a', '#ff8a5c', '#ff5e7e'],
		rating: 4.8,
		reviewCount: 311,
		sessions: sessions('pizzakids', [
			[6, '10:00', 5],
			[13, '10:00', 12],
			[20, '10:00', 16]
		])
	},
	{
		slug: 'floedeboller',
		title: 'Flødeboller i særklasse',
		summary: 'Lav dine egne flødeboller med sprød bund, luftig skum og blank chokolade.',
		description: [
			'Ida fra Konditori Sukkerblomst viser dig, hvordan du laver flødeboller som i konditoriet. Du lærer at piske den perfekte skum, temperere chokolade, så den bliver blank og sprød, og pynte med lakrids, frysetørrede bær og havsalt.',
			'Du går hjem med en æske med 12 flødeboller — hvis de overlever turen.'
		],
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
		emoji: '🍫',
		gradient: ['#f9c9d4', '#c9667f', '#5b2a1f'],
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
		description: [
			'Anders åbner dørene til destilleriet og fortæller om håndværket bag nordisk gin. Du smager fem forskellige gins og lærer at genkende enebær, citrus og kystens urter.',
			'Til sidst sammensætter du dit eget blend, som du tager med hjem i en 20 cl flaske med din egen etiket.'
		],
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
		emoji: '🍸',
		gradient: ['#b8f2e6', '#2e7d74', '#0d3b38'],
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
		description: [
			'Sebastian lærer dig de grundlæggende teknikker bag baren: at ryste, røre, måle og balancere sødme og syre. Undervejs blander du seks klassiske cocktails — fra Old Fashioned til Daiquiri.',
			'Perfekt til polterabend, firmafest eller bare en aften med vennerne.'
		],
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
		emoji: '🍹',
		gradient: ['#8a6cff', '#4c3a8f', '#1d1440'],
		rating: 4.7,
		reviewCount: 392,
		sessions: sessions('bar', [
			[3, '19:00', 4],
			[10, '19:00', 9],
			[17, '19:00', 14]
		])
	},
	{
		slug: 'surdejsbroed',
		title: 'Surdejsbrød — fra starter til sprød skorpe',
		summary: 'Forstå surdejen, og bag et brød med blød krumme og knasende skorpe.',
		description: [
			'Line gennemgår hele processen: pasning af surdejsstarter, autolyse, strækning og foldning, formning og bagning i støbejernsgryde.',
			'Du får en levende starter med hjem, så du kan fortsætte i dit eget køkken.'
		],
		category: 'mad-drikke',
		host: 'korn-og-co',
		city: 'Odense',
		venue: 'Korn & Co. Bageri',
		address: 'Kongensgade 63, 5000 Odense C',
		price: 550,
		durationMinutes: 240,
		capacity: 12,
		level: 'Begynder',
		learn: ['Pasning af surdejsstarter', 'Hydrering og mel', 'Formning og indsnit', 'Bagning i gryde'],
		includes: ['Mel og råvarer', 'Frokost med nybagt brød', 'Surdejsstarter med hjem', 'Kursusbevis'],
		emoji: '🥖',
		gradient: ['#f4dcb0', '#c48a4a', '#7a4a1f'],
		rating: 4.9,
		reviewCount: 257,
		sessions: sessions('surdej', [
			[5, '09:00', 5],
			[12, '09:00', 8],
			[19, '09:00', 12]
		])
	},
	{
		slug: 'sushi-workshop',
		title: 'Sushi-workshop med Kenji',
		summary: 'Ris, knivteknik og rulning. Lav nigiri, maki og uramaki som en mester.',
		description: [
			'Kenji lærer dig, hvordan sushiris skal koges og smages til, og hvordan fisken skæres korrekt. Du ruller maki og uramaki og former nigiri med hænderne.',
			'Vi slutter af med at spise sammen ved det lange bord.'
		],
		category: 'mad-drikke',
		host: 'umami-koekkenet',
		city: 'Aarhus',
		venue: 'Umami Køkkenet',
		address: 'Frederiksgade 74, 8000 Aarhus C',
		price: 695,
		durationMinutes: 180,
		capacity: 12,
		level: 'Begynder',
		learn: ['Sushiris fra bunden', 'Knivteknik og fiskevalg', 'Maki, uramaki og nigiri'],
		includes: ['Alle råvarer', 'Grøn te', 'Kursusbevis'],
		emoji: '🍣',
		gradient: ['#ffb4a8', '#ff6b6b', '#263238'],
		rating: 4.8,
		reviewCount: 174,
		sessions: sessions('sushi', [
			[7, '17:30', 6],
			[14, '17:30', 12]
		])
	},
	{
		slug: 'naturvin',
		title: 'Naturvin fra Loire — smagning',
		summary: 'Seks vine fra små producenter. Lær, hvad naturvin er, og hvad du skal kigge efter.',
		description: [
			'Camilla tager dig med på en tur gennem Loiredalen i seks glas. Du lærer om naturvin, biodynamik og de små producenter, der står bag.',
			'Til vinen serveres oste og charcuteri fra Vesterbros bedste delikatesser.'
		],
		category: 'mad-drikke',
		host: 'vinkaelderen',
		city: 'København',
		venue: 'Vinkælderen',
		address: 'Istedgade 74, 1650 København V',
		price: 395,
		durationMinutes: 120,
		capacity: 16,
		minAge: 18,
		level: 'Alle niveauer',
		learn: ['Hvad er naturvin?', 'Druer og terroir i Loire', 'Smagenoter og madparring'],
		includes: ['Seks vine', 'Ost og charcuteri', '10 % rabat i butikken samme aften'],
		emoji: '🍷',
		gradient: ['#e07a8f', '#b33951', '#4a0f1f'],
		rating: 4.7,
		reviewCount: 203,
		sessions: sessions('vin', [
			[2, '19:00', 2],
			[9, '19:00', 10],
			[16, '19:00', 16]
		])
	},
	{
		slug: 'pasta-fresca',
		title: 'Pasta fresca som i Bologna',
		summary: 'Tagliatelle, tortellini og ragù. En aften i Giulias køkken ved fjorden.',
		description: [
			'Giulia viser dig, hvordan man laver frisk æggepasta med kun mel, æg og et kavelstok. Du former tagliatelle og tortellini og smager hendes bedstemors ragù.',
			'Aftenen slutter med middag og et glas italiensk vin.'
		],
		category: 'mad-drikke',
		host: 'casa-pasta',
		city: 'Vejle',
		venue: 'Casa Pasta',
		address: 'Havnegade 6, 7100 Vejle',
		price: 595,
		durationMinutes: 180,
		capacity: 12,
		level: 'Begynder',
		learn: ['Æggepasta i hånden', 'Tagliatelle og tortellini', 'Klassisk ragù bolognese'],
		includes: ['Middag', 'Et glas vin', 'Opskrifter'],
		emoji: '🍝',
		gradient: ['#fff1b8', '#ffd166', '#e5a50a'],
		rating: 4.9,
		reviewCount: 131,
		sessions: sessions('pasta', [
			[6, '17:00', 4],
			[13, '17:00', 11],
			[27, '17:00', 12]
		])
	},
	{
		slug: 'banekursus',
		title: 'Banekursus: Sikker og hurtig på racerbanen',
		summary: 'Teori, teknik og mange omgange på banen — med dokumenteret kursusbevis.',
		description: [
			'Et komplet introduktionskursus til banekørsel. Om formiddagen gennemgår Mikkel teori om ideallinje, bremsepunkter, flag og sikkerhed. Om eftermiddagen kører du selv — først med instruktør ved siden af, siden alene.',
			'Når kurset er gennemført, udsteder vi et digitalt kursusbevis, som du kan fremvise ved trackdays og klubløb. Slut med at lede efter papirer.'
		],
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
		emoji: '🏎️',
		gradient: ['#9be7ff', '#0a84ff', '#0a2a66'],
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
		slug: 'gokart-traening',
		title: 'Gokarttræning med racerkører',
		summary: 'Skær sekunder af din omgangstid med teknik fra en erfaren instruktør.',
		description: [
			'Et intensivt træningspas, hvor Nikolaj gennemgår linjer, bremsning og overhalinger. Vi måler dine omgangstider før og efter.',
			'Du får en personlig analyse med hjem.'
		],
		category: 'sport-motor',
		host: 'roskilde-karting',
		city: 'Roskilde',
		venue: 'Roskilde Karting',
		address: 'Banevej 4, 4000 Roskilde',
		price: 895,
		durationMinutes: 120,
		capacity: 10,
		minAge: 15,
		level: 'Alle niveauer',
		learn: ['Ideallinje på gokartbanen', 'Bremsning og acceleration', 'Overhalinger'],
		includes: ['Gokart og brændstof', 'Hjelm', 'Tidtagning og analyse'],
		emoji: '🏁',
		gradient: ['#fff176', '#ffd60a', '#ff453a'],
		rating: 4.7,
		reviewCount: 219,
		sessions: sessions('kart', [
			[5, '14:00', 6],
			[12, '14:00', 10]
		])
	},
	{
		slug: 'padel-begynder',
		title: 'Padel for begyndere',
		summary: 'Grundslag, vægspil og regler. Kom godt i gang med Danmarks hurtigst voksende sport.',
		description: [
			'Emma lærer dig grundslagene, hvordan du bruger glasvæggene, og de vigtigste regler. Efter træningen spiller vi små kampe.',
			'Ketsjer og bolde er inkluderet.'
		],
		category: 'sport-motor',
		host: 'padelhuset-aarhus',
		city: 'Aarhus',
		venue: 'Padelhuset',
		address: 'Hasselager Allé 18, 8260 Viby J',
		price: 349,
		durationMinutes: 90,
		capacity: 8,
		level: 'Begynder',
		learn: ['Forhånd, baghånd og volley', 'Spil med glasvæggene', 'Regler og placering'],
		includes: ['Ketsjer og bolde', 'Bane i 90 minutter', 'Vand og frugt'],
		emoji: '🎾',
		gradient: ['#b5f5c6', '#30d158', '#0b6e4f'],
		rating: 4.8,
		reviewCount: 356,
		sessions: sessions('padel', [
			[1, '18:00', 2],
			[3, '18:00', 5],
			[8, '18:00', 8],
			[10, '10:00', 8]
		])
	},
	{
		slug: 'vinterbadning-saunagus',
		title: 'Vinterbadning og saunagus',
		summary: 'Trygt i gang med kulden. Vejrtrækning, dukkert og en duftende saunagus.',
		description: [
			'Rasmus guider dig trygt i gang med vinterbadning. Vi starter med vejrtrækning og opvarmning, tager en kort dukkert og slutter med en saunagus med æteriske olier.',
			'Perfekt for nybegyndere — og dem, der aldrig har turdet.'
		],
		category: 'sport-motor',
		host: 'kuldegys',
		city: 'Aarhus',
		venue: 'Kuldegys ved havnebadet',
		address: 'Bassin 7, 8000 Aarhus C',
		price: 295,
		durationMinutes: 90,
		capacity: 14,
		minAge: 16,
		level: 'Begynder',
		learn: ['Sikker vinterbadning', 'Vejrtrækning i kulde', 'Saunagus og restitution'],
		includes: ['Sauna og saunagus', 'Håndklæde', 'Varm te'],
		emoji: '🧖',
		gradient: ['#d6f0ff', '#9bd7ff', '#3a6ea5'],
		rating: 4.9,
		reviewCount: 412,
		sessions: sessions('kulde', [
			[1, '07:30', 4],
			[4, '07:30', 9],
			[8, '07:30', 14],
			[15, '07:30', 14]
		])
	},
	{
		slug: 'golf-banetilladelse',
		title: 'Golf: Fra nul til banetilladelse',
		summary: 'Sving, regler og etikette. Tag din banetilladelse over to weekenddage.',
		description: [
			'Peter tager dig fra første sving til banetilladelse. Du lærer det lange spil, nærspil og putning, og vi gennemgår regler og etikette.',
			'Kurset afsluttes med en prøve på banen og et kursusbevis, der giver adgang til at spille på klubbens bane.'
		],
		category: 'sport-motor',
		host: 'fyns-golfakademi',
		city: 'Odense',
		venue: 'Fyns Golfakademi',
		address: 'Golfvej 2, 5260 Odense S',
		price: 1495,
		durationMinutes: 480,
		durationNote: '2 dage à 4 timer',
		capacity: 10,
		level: 'Begynder',
		learn: ['Det lange spil', 'Nærspil og putning', 'Regler og etikette', 'Prøve til banetilladelse'],
		includes: ['Køller til låns', 'Rangebolde', 'Prøvegebyr', 'Kursusbevis'],
		emoji: '⛳',
		gradient: ['#dcf5b0', '#a8e063', '#2f7d32'],
		rating: 4.8,
		reviewCount: 97,
		sessions: sessions('golf', [
			[12, '09:00', 4],
			[26, '09:00', 10]
		])
	},
	{
		slug: 'svampetur',
		title: 'Svampetur i Rold Skov',
		summary: 'Find, kend og tilbered skovens svampe sammen med en uddannet svampekontrollant.',
		description: [
			'Vi går en rolig tur gennem Rold Skov og lærer at kende de bedste spisesvampe — og dem, du skal holde dig fra. Karen kontrollerer alle fund.',
			'Turen slutter ved bålet, hvor vi steger dagens fangst på panden.'
		],
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
		emoji: '🍄',
		gradient: ['#e8d5b5', '#c5a880', '#53412c'],
		rating: 4.9,
		reviewCount: 188,
		sessions: sessions('svamp', [
			[5, '10:00', 7],
			[12, '10:00', 15]
		])
	},
	{
		slug: 'fluefiskeri',
		title: 'Introduktion til fluefiskeri',
		summary: 'Kast, fluer og stille vand. En dag på Gudenåen med en erfaren guide.',
		description: [
			'Jens lærer dig det grundlæggende kast, valg af fluer og hvordan du læser åen. Efter frokost fisker vi sammen fra bredden.',
			'Fiskekort og udstyr er inkluderet.'
		],
		category: 'oplevelser',
		host: 'gudenaa-fluefiskeri',
		city: 'Silkeborg',
		venue: 'Gudenå ved Resenbro',
		address: 'Resenbro Østervej 2, 8600 Silkeborg',
		price: 795,
		durationMinutes: 300,
		capacity: 6,
		level: 'Begynder',
		learn: ['Overhåndskast og rullekast', 'Valg af fluer', 'At læse åen'],
		includes: ['Fiskekort', 'Stang, hjul og waders', 'Frokost'],
		emoji: '🎣',
		gradient: ['#c8f7e1', '#7fd1ae', '#1f5c4a'],
		rating: 4.9,
		reviewCount: 64,
		sessions: sessions('flue', [
			[6, '09:00', 2],
			[20, '09:00', 6]
		])
	},
	{
		slug: 'stand-up-workshop',
		title: 'Stand-up comedy workshop',
		summary: 'Skriv dine første fem minutter — og prøv dem af på en rigtig scene.',
		description: [
			'Simon lærer dig at finde dit materiale, skrive pointer og bruge timing. Workshoppen slutter med en lille, tryg optræden for holdet.',
			'Ingen erfaring nødvendig — kun lyst til at prøve.'
		],
		category: 'oplevelser',
		host: 'latterfabrikken',
		city: 'København',
		venue: 'Latterfabrikken',
		address: 'Studiestræde 14, 1455 København K',
		price: 495,
		durationMinutes: 180,
		capacity: 12,
		minAge: 18,
		level: 'Begynder',
		learn: ['Find dit materiale', 'Opbygning af en joke', 'Timing og scenenærvær'],
		includes: ['Workshop og scene', 'En drink efter showet'],
		emoji: '🎤',
		gradient: ['#ffe680', '#ffcc00', '#ff6b00'],
		rating: 4.6,
		reviewCount: 88,
		sessions: sessions('standup', [
			[9, '18:00', 5],
			[23, '18:00', 12]
		])
	},
	{
		slug: 'nattefoto',
		title: 'Fotowalk: Nattefotografering',
		summary: 'Lange lukketider, neonlys og spejlinger. Tag bedre billeder efter mørkets frembrud.',
		description: [
			'Freja går med dig gennem Københavns gader efter mørkets frembrud. Du lærer at bruge stativ, lange lukketider og manuel fokus.',
			'Du kan deltage med spejlrefleks, systemkamera eller mobil.'
		],
		category: 'oplevelser',
		host: 'lys-og-linse',
		city: 'København',
		venue: 'Mødested ved Nyhavn 1',
		address: 'Nyhavn 1, 1051 København K',
		price: 450,
		durationMinutes: 150,
		capacity: 10,
		level: 'Let øvet',
		learn: ['Lange lukketider', 'Komposition i mørke', 'Redigering af natbilleder'],
		includes: ['Stativ til låns', 'Varm kakao undervejs'],
		bring: ['Kamera eller mobil'],
		emoji: '📸',
		gradient: ['#9e9cff', '#5e5ce6', '#0b0b3b'],
		rating: 4.8,
		reviewCount: 121,
		sessions: sessions('foto', [
			[4, '19:30', 3],
			[11, '19:30', 10]
		])
	},
	{
		slug: 'blomsterbinding',
		title: 'Blomsterbinding: Sæsonens buket',
		summary: 'Bind en spiralbuket af danske sæsonblomster, og lær florist-tricks til vasen derhjemme.',
		description: [
			'Maja lærer dig at binde en klassisk spiralbuket med sæsonens blomster og grønt. Du lærer om farvesammensætning, holdbarhed og pasning.',
			'Du tager selvfølgelig din buket med hjem.'
		],
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
		emoji: '💐',
		gradient: ['#ffd6e0', '#ffb3c7', '#e0457b'],
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
		description: [
			'Over fire aftener strikker du din egen sweater med Hannes populære opskrift. Hun hjælper med opslag, udtagninger, ærmer og afslutning.',
			'Der er kaffe på kanden og plads til både snak og stilhed.'
		],
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
		emoji: '🧶',
		gradient: ['#f1d4d4', '#d4a5a5', '#7d4e57'],
		rating: 4.9,
		reviewCount: 143,
		sessions: sessions('strik', [
			[7, '18:30', 3],
			[35, '18:30', 10]
		])
	},
	{
		slug: 'juledekorationer',
		title: 'Juledekorationer af naturens materialer',
		summary: 'Gran, mos, kogler og lys. Lav en dekoration, der dufter af skov og jul.',
		description: [
			'Lotte viser dig, hvordan du bygger en smuk juledekoration af gran, mos, kogler og tørrede blomster. Alle materialer er samlet i skov og strand omkring Roskilde.',
			'Der serveres gløgg og æbleskiver.'
		],
		category: 'hygge-fritid',
		host: 'kransebinderiet',
		city: 'Roskilde',
		venue: 'Kransebinderiet',
		address: 'Algade 18, 4000 Roskilde',
		price: 395,
		durationMinutes: 150,
		capacity: 14,
		level: 'Alle niveauer',
		learn: ['Opbygning af en dekoration', 'Arbejde med naturmaterialer', 'Lys og sikkerhed'],
		includes: ['Alle materialer', 'Gløgg og æbleskiver'],
		emoji: '🎄',
		gradient: ['#b9e4c9', '#5fa777', '#1e4d2b'],
		rating: 4.8,
		reviewCount: 196,
		sessions: sessions('jul', [
			[14, '18:00', 9],
			[21, '13:00', 14],
			[28, '18:00', 14]
		])
	},
	{
		slug: 'keramik-drejeskive',
		title: 'Keramik på drejeskiven',
		summary: 'Centrér leret, og drej dine første skåle og kopper. Vi brænder og glaserer for dig.',
		description: [
			'Astrid lærer dig at centrere leret, åbne det og trække vægge op. De fleste går hjem med to-tre skåle eller kopper, som vi glaserer og brænder.',
			'Dine værker er klar til afhentning tre uger efter kurset.'
		],
		category: 'hygge-fritid',
		host: 'drejebaenken',
		city: 'København',
		venue: 'Drejebænken Keramik',
		address: 'Jægersborggade 27, 2200 København N',
		price: 795,
		durationMinutes: 180,
		capacity: 6,
		level: 'Begynder',
		learn: ['Centrering af ler', 'Kopper og skåle', 'Afdrejning og glasur'],
		includes: ['Ler og glasur', 'Brænding', 'Forklæde', 'Kursusbevis'],
		emoji: '🏺',
		gradient: ['#f3d9c2', '#e2b48c', '#8c5a3c'],
		rating: 4.9,
		reviewCount: 329,
		sessions: sessions('keramik', [
			[2, '18:00', 1],
			[6, '10:00', 0],
			[13, '10:00', 4],
			[20, '18:00', 6]
		])
	},
	{
		slug: 'lysestoebning',
		title: 'Lysestøbning og dyppede lys',
		summary: 'Støb og dyp dine egne lys i stearin og bivoks — i alle farver.',
		description: [
			'Mette viser dig, hvordan du dypper klassiske kronelys og støber bloklys i forme. Du vælger selv farver og dufte.',
			'Et perfekt kursus til efterårets mørke aftener.'
		],
		category: 'hygge-fritid',
		host: 'vejle-lysstoeberi',
		city: 'Vejle',
		venue: 'Vejle Lysstøberi',
		address: 'Søndergade 12, 7100 Vejle',
		price: 345,
		durationMinutes: 120,
		capacity: 12,
		level: 'Alle niveauer',
		learn: ['Dypning af kronelys', 'Støbning i forme', 'Farver og dufte'],
		includes: ['Stearin og bivoks', 'Kaffe og te', 'Dine lys med hjem'],
		emoji: '🕯️',
		gradient: ['#ffe7c4', '#ffd29d', '#d9822b'],
		rating: 4.7,
		reviewCount: 158,
		sessions: sessions('lys', [
			[4, '17:00', 6],
			[11, '17:00', 12],
			[25, '13:00', 12]
		])
	},
	{
		slug: 'beats-ableton',
		title: 'Lav dit første beat i Ableton',
		summary: 'Trommer, bas og melodi. Gå hjem med dit eget nummer på fire timer.',
		description: [
			'Oliver lærer dig det grundlæggende i Ableton Live: at programmere trommer, lave en baslinje og bygge et nummer op. Vi arbejder i hans studie på Godsbanen.',
			'Computer og hovedtelefoner stilles til rådighed.'
		],
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
		emoji: '🎧',
		gradient: ['#e2b8ff', '#bf5af2', '#2c1250'],
		rating: 4.8,
		reviewCount: 117,
		sessions: sessions('beat', [
			[5, '12:00', 3],
			[19, '12:00', 8]
		])
	},
	{
		slug: 'guitar-voksne',
		title: 'Guitar for voksne begyndere',
		summary: 'Lær de vigtigste akkorder og spil dine første sange på fire gange.',
		description: [
			'Thomas lærer dig at holde guitaren, slå an og skifte mellem de vigtigste akkorder. Efter fire gange kan du spille med på en håndfuld kendte sange.',
			'Du kan låne en guitar, hvis du ikke har din egen.'
		],
		category: 'kreativ-musik',
		host: 'aalborg-guitarskole',
		city: 'Aalborg',
		venue: 'Aalborg Guitarskole',
		address: 'Boulevarden 15, 9000 Aalborg',
		price: 1495,
		durationMinutes: 360,
		durationNote: '4 gange à 1½ time',
		capacity: 8,
		level: 'Begynder',
		learn: ['De ti vigtigste akkorder', 'Rytme og anslag', 'Dine første sange'],
		includes: ['Guitar til låns', 'Nodehæfte', 'Kursusbevis'],
		emoji: '🎸',
		gradient: ['#ffd38a', '#ff9f0a', '#7a3e00'],
		rating: 4.8,
		reviewCount: 102,
		sessions: sessions('guitar', [
			[8, '19:00', 4],
			[36, '19:00', 8]
		])
	},
	{
		slug: 'akvarel',
		title: 'Akvarel ved fjorden',
		summary: 'Vand, pigment og lys. Mal stemningsfulde landskaber i Ingers atelier.',
		description: [
			'Inger introducerer dig til akvarellens teknikker: vådt-i-vådt, lasering og at spare lyset. Vi maler fjordlandskaber med udsigten som inspiration.',
			'Papir, pensler og farver er inkluderet.'
		],
		category: 'kreativ-musik',
		host: 'atelier-fjordlys',
		city: 'Roskilde',
		venue: 'Atelier Fjordlys',
		address: 'Strandgade 9, 4000 Roskilde',
		price: 595,
		durationMinutes: 180,
		capacity: 10,
		level: 'Alle niveauer',
		learn: ['Vådt-i-vådt', 'Lasering', 'Komposition og lys'],
		includes: ['Alle materialer', 'Kaffe og kage'],
		emoji: '🎨',
		gradient: ['#d7e7ff', '#a0c4ff', '#5a7bd8'],
		rating: 4.9,
		reviewCount: 79,
		sessions: sessions('akvarel', [
			[7, '10:00', 5],
			[21, '10:00', 10]
		])
	},
	{
		slug: 'dj-workshop',
		title: 'DJ-workshop: Mix som en pro',
		summary: 'Beatmatching, overgange og læsning af dansegulvet — på vinyl og controller.',
		description: [
			'Malik lærer dig at beatmatche, bygge overgange og opbygge et sæt. Du prøver både vinyl og controller.',
			'Workshoppen slutter med, at alle spiller et kort sæt for holdet.'
		],
		category: 'kreativ-musik',
		host: 'pladespilleren',
		city: 'København',
		venue: 'Pladespilleren',
		address: 'Blågårdsgade 22, 2200 København N',
		price: 650,
		durationMinutes: 180,
		capacity: 8,
		level: 'Begynder',
		learn: ['Beatmatching', 'EQ og overgange', 'At bygge et sæt'],
		includes: ['Udstyr', 'Sodavand og snacks'],
		emoji: '💿',
		gradient: ['#ff8fa8', '#ff375f', '#30004f'],
		rating: 4.7,
		reviewCount: 93,
		sessions: sessions('dj', [
			[10, '16:00', 2],
			[24, '16:00', 8]
		])
	},
	{
		slug: 'ai-i-hverdagen',
		title: 'AI i hverdagen og på jobbet',
		summary: 'Brug ChatGPT, Copilot og Claude trygt og effektivt. Praktisk, ærligt og uden hype.',
		description: [
			'Louise viser dig, hvordan du bruger AI-assistenter til mails, opsummeringer, planlægning og idéudvikling — og hvor du skal passe på.',
			'Du arbejder med egne opgaver og går hjem med en personlig værktøjskasse.'
		],
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
		emoji: '🤖',
		gradient: ['#c9f1ff', '#64d2ff', '#5e5ce6'],
		rating: 4.8,
		reviewCount: 211,
		sessions: sessions('ai', [
			[6, '09:00', 6],
			[20, '09:00', 16]
		])
	},
	{
		slug: 'hjemmeside-paa-en-dag',
		title: 'Byg din hjemmeside på én dag',
		summary: 'Fra idé til færdig side med eget domæne. Uden kode — men med godt håndværk.',
		description: [
			'Mads guider dig igennem opbygning af en professionel hjemmeside: struktur, tekster, billeder, domæne og synlighed på Google.',
			'Du går hjem med en færdig, offentlig hjemmeside.'
		],
		category: 'viden-it',
		host: 'webvaerkstedet',
		city: 'Odense',
		venue: 'Webværkstedet',
		address: 'Overgade 41, 5000 Odense C',
		price: 1995,
		durationMinutes: 360,
		capacity: 10,
		level: 'Begynder',
		learn: ['Struktur og design', 'Tekster der sælger', 'Domæne og Google'],
		includes: ['Frokost', 'Ét års hosting', 'Kursusbevis'],
		bring: ['Bærbar computer', 'Logo og billeder, hvis du har dem'],
		emoji: '🌐',
		gradient: ['#b7f5c5', '#34c759', '#007aff'],
		rating: 4.7,
		reviewCount: 76,
		sessions: sessions('web', [
			[13, '09:00', 4],
			[34, '09:00', 10]
		])
	},
	{
		slug: 'foerstehjaelp',
		title: 'Førstehjælp og hjertestarter',
		summary: 'Livreddende førstehjælp i praksis. Med kursusbevis, der kan fremvises på jobbet.',
		description: [
			'Henrik gennemgår hjerte-lunge-redning, brug af hjertestarter, frie luftveje og hjælp ved ulykker. Det meste af tiden øver vi praktisk på dukker.',
			'Du modtager et digitalt kursusbevis, som du kan dele med din arbejdsgiver.'
		],
		category: 'viden-it',
		host: 'livredderne',
		city: 'Aarhus',
		venue: 'Livredderne, Trøjborg',
		address: 'Tordenskjoldsgade 21, 8200 Aarhus N',
		price: 695,
		durationMinutes: 240,
		capacity: 16,
		level: 'Alle niveauer',
		learn: ['Hjerte-lunge-redning', 'Hjertestarter', 'Stabilt sideleje', 'Hjælp ved ulykker'],
		includes: ['Øvelsesdukker', 'Kaffe og sandwich', 'Digitalt kursusbevis'],
		emoji: '⛑️',
		gradient: ['#ffc2bd', '#ff6961', '#b0002a'],
		rating: 4.9,
		reviewCount: 538,
		sessions: sessions('hjerte', [
			[4, '17:00', 5],
			[11, '09:00', 12],
			[18, '17:00', 16]
		])
	},
	{
		slug: 'python-begynder',
		title: 'Kom i gang med Python',
		summary: 'To intensive dage, hvor du skriver dine første programmer og automatiserer kedelige opgaver.',
		description: [
			'Nanna lærer dig de grundlæggende byggesten i Python: variabler, løkker, funktioner og filer. På dag to automatiserer du en rigtig opgave fra din hverdag.',
			'Ingen forudsætninger — kun nysgerrighed.'
		],
		category: 'viden-it',
		host: 'kodeskolen',
		city: 'København',
		venue: 'Kodeskolen',
		address: 'Njalsgade 76, 2300 København S',
		price: 2495,
		durationMinutes: 720,
		durationNote: '2 dage à 6 timer',
		capacity: 14,
		level: 'Begynder',
		learn: ['Python-syntaks', 'Løkker og funktioner', 'Filer og regneark', 'Dit første script'],
		includes: ['Frokost begge dage', 'Kursusmateriale', 'Kursusbevis'],
		bring: ['Bærbar computer'],
		emoji: '🐍',
		gradient: ['#9fd1ff', '#0a84ff', '#1c1c1e'],
		rating: 4.8,
		reviewCount: 104,
		sessions: sessions('python', [
			[15, '09:00', 6],
			[43, '09:00', 14]
		])
	}
];
