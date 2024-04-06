import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';

export const load = (async () => {
    const query = await prisma.claim.findMany({ include: {
        creator: true,
        reactions: true
    }});
    const responce = query.map((claim) => {
        let rating = 0;
        claim.reactions.forEach((reaction) => {
            rating += (reaction.approve) ? 1 : -1;
        })
        return {
            ...claim, 
            rating
        }
    });
    return {claims: responce};
}) satisfies PageServerLoad;