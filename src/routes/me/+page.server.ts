import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';
import { redirect } from '@sveltejs/kit';

export const load = (async ({parent}) => {
    const parentData = await parent();
    if (!parentData.loggedIn) {
        console.log("Redirected from /me to /login");
        redirect(302, '/login');
    }
    const user = await prisma.user.findUnique({ where: { id: parentData.user?.id } });
    return {user};
}) satisfies PageServerLoad;