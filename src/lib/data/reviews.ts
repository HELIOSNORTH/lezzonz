import type { CategoryId, Review } from '#lib/types.ts';

export const reviewsByCategory: Record<CategoryId, Review[]> = {
	'mad-drikke': [
		{ name: 'Louise', city: 'Aarhus', rating: 5, text: 'Fantastisk aften! Vi fik lov at lave det hele selv, og underviseren var både sjov og meget dygtig. Har allerede lavet det derhjemme to gange.' },
		{ name: 'Jakob', city: 'Risskov', rating: 5, text: 'Gave til min kæreste, men jeg tror, jeg fik mest ud af det. Hyggelig stemning og lækre råvarer.' },
		{ name: 'Anne-Marie', city: 'Viby J', rating: 4, text: 'Rigtig god undervisning og god tid til spørgsmål. Lidt varmt i lokalet, men det hører vel med.' }
	],
	'sport-motor': [
		{ name: 'Frederik', city: 'Silkeborg', rating: 5, text: 'Professionelt fra start til slut. Rart at få et rigtigt kursusbevis, man kan vise frem bagefter.' },
		{ name: 'Katrine', city: 'Aarhus', rating: 5, text: 'Jeg var nervøs, men instruktøren gjorde det trygt og sjovt. Jeg er hooked.' },
		{ name: 'Mathias', city: 'Horsens', rating: 4, text: 'God balance mellem teori og praksis. Kunne godt have brugt lidt mere tid på banen.' }
	],
	oplevelser: [
		{ name: 'Signe', city: 'Aalborg', rating: 5, text: 'En helt særlig oplevelse. Guiden var så vidende og fortalte levende. Kan varmt anbefales.' },
		{ name: 'Morten', city: 'København', rating: 5, text: 'Vi var der som firmaarrangement, og alle talte om det i ugevis bagefter.' },
		{ name: 'Helle', city: 'Skørping', rating: 4, text: 'Dejlig tur og god stemning. Tag ordentligt fodtøj på!' }
	],
	'hygge-fritid': [
		{ name: 'Marie', city: 'Frederiksberg', rating: 5, text: 'Så hyggelig en eftermiddag. Jeg gik hjem med noget, jeg selv havde lavet, og et stort smil.' },
		{ name: 'Birgitte', city: 'Odense', rating: 5, text: 'Tålmodig og inspirerende underviser. Jeg har meldt mig til næste hold.' },
		{ name: 'Caroline', city: 'Roskilde', rating: 4, text: 'Skøn stemning og lækker kage. Tiden fløj afsted.' }
	],
	'kreativ-musik': [
		{ name: 'Emil', city: 'Aarhus', rating: 5, text: 'Jeg havde aldrig rørt et instrument, men gik hjem og kunne spille. Super pædagogisk.' },
		{ name: 'Sara', city: 'Nørrebro', rating: 5, text: 'Små hold og masser af personlig sparring. Præcis hvad jeg ledte efter.' },
		{ name: 'Lars', city: 'Aalborg', rating: 4, text: 'Fedt kursus med god energi. Kunne godt have været en time længere.' }
	],
	'viden-it': [
		{ name: 'Pernille', city: 'Aarhus', rating: 5, text: 'Konkret og brugbart. Min arbejdsgiver fik kursusbeviset direkte, og det var nemt at dele.' },
		{ name: 'Søren', city: 'Odense', rating: 5, text: 'Jeg bruger det, jeg lærte, hver eneste dag. Bedste kursus, jeg har taget længe.' },
		{ name: 'Tina', city: 'Valby', rating: 4, text: 'Rolig og grundig underviser. Godt materiale med hjem.' }
	]
};
