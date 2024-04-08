import type { PageServerLoad } from './$types';
import type { Actions } from './$types';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async (event) => {
        const formData = await event.request.formData();

        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const sourcesStr = formData.get('sources') as string;

        const sources = sourcesStr.split(',').map(source => source.trim());

        console.log(title, description, sources);
    }
}