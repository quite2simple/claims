import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';

export const load = (async ({ params }) => {
    const claimId = parseInt(params.id);

    const claim = await prisma.claim.findUnique({ 
        include: { creator: true, reactions: true, sources: true }, 
        where: { id: claimId } 
    });
    const sources = await prisma.source.findMany({ where: { claimId } });
    return {claim, sources};
}) satisfies PageServerLoad;