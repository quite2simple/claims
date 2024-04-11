import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';
import { hasPrivilege } from '$lib/prisma';

export const load = (async (event) => {
    const claimId = parseInt(event.params.id);

    const claim = await prisma.claim.findUnique({ 
        include: { creator: true, reactions: true, sources: true }, 
        where: { id: claimId } 
    });
    const sources = await prisma.source.findMany({ where: { claimId } });
    const creatorId = claim?.creatorId as number;
    let canModify = false;
    if (event.locals.user) {
        canModify = await hasPrivilege(event.locals.user.id, creatorId);
    }
    
    return {claim, sources, canModify};
}) satisfies PageServerLoad;