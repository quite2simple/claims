import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';

export const load = (async ({ parent }) => {
    const query = await prisma.claim.findMany(
        {
            orderBy: { createdAt: 'desc' }, 
            include: 
            {
                creator: true,
                reactions: true
            },
    });
    const parentData = await parent();
    const responce = query.map((claim) => {
        let rating = 0;
        claim.reactions.forEach((reaction) => {
            rating += (reaction.approve) ? 1 : -1;
        })
        let reaction = 0;
        if (parentData.loggedIn) {
            const reactionRecord = claim.reactions.find((reaction) => reaction.userId === parentData.user?.id);
            if (reactionRecord) {
                reaction = (reactionRecord.approve) ? 1 : -1;
            }
        }
        return {
            ...claim, 
            rating,
            reaction
        }
    });
    return {claims: responce};
}) satisfies PageServerLoad;