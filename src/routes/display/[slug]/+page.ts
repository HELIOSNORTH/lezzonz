import { error } from '@sveltejs/kit';
import { hostContext } from '#lib/catalog.ts';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => hostContext(params.slug) ?? error(404, 'Underviseren findes ikke');
