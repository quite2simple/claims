import type { LayoutServerLoad } from './$types';

export const load = (async (event) => {
    const user = event.locals.user;
    const loggedIn = !!user;
    return {loggedIn, user};
}) satisfies LayoutServerLoad;