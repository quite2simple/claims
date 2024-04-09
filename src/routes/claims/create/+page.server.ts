import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async (event) => {

        // if not logged in, 401

        if (!event.locals.user) {
            return fail(401, {
                message: "Unauthorized"
            });
        }
        const userId = event.locals.user.id;

        const user = await prisma.user.findUnique({ where: { id: userId } });

        // if the user doesn't exist, 401

        if (!user) {
            return fail(401, {
                message: "Unauthorized"
            });
        }

        // if the user is muted (can't post right now), 403

        if (user?.muted) {
            return fail(403, {
                message: "You are not allowed to post new claims right now. Please try again later."
            });
        }

        const formData = await event.request.formData();

        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const sourcesStr = formData.get('sources') as string;

        const sources = sourcesStr.split(',').map(source => source.trim());

        const newClaim = await prisma.claim.create({
            data: {
                title,
                description,
                creatorId: userId
            }
        });
        await prisma.source.createMany({
            data: sources.map(source => ({
                claimId: newClaim.id,
                url: source
            }))}
        )
        console.log(`A new claim with an id of ${newClaim.id} was created by ${user.username}`);

        // console.log(title, description, sources);
    }
}