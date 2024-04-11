import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';
import { hasPrivilege } from '$lib/prisma';
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

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
    let verified: boolean | null;
    if (claim?.verified === true) {
        verified = true;
    } 
    else if (claim?.verified === false && claim?.verifiedAt === null) {
        verified = null;
    }
    else {
        verified = false;
    }
    
    return {claim, sources, canModify, verified};
}) satisfies PageServerLoad;

export const actions: Actions = {
    verify: async (event) => {
        if (!event.locals.user) {
            fail(403, { message: "You cannot verity this" });
        }
        const id = parseInt(event.params.id);
        const formData = await event.request.formData();
        const verificationStatus = formData.get("verification") as string;
        
        if (verificationStatus === "verified") {
            await prisma.claim.update({ where: { id }, data: { verified: true, verifiedAt: new Date() } });
            console.log("verified");
        }
        else if (verificationStatus === "refuted") {
            await prisma.claim.update({ where: { id }, data: { verified: false, verifiedAt: new Date() } });
            console.log("refuted");
        }
        else if (verificationStatus === "none") {
            await prisma.claim.update({ where: { id }, data: { verified: false, verifiedAt: null } });
            console.log("No verification status set");
        }
    }
}