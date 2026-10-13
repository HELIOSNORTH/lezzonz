import { error } from '@sveltejs/kit';
import { courseContext } from '#lib/catalog.ts';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => courseContext(params.slug) ?? error(404, 'Kurset findes ikke');
