import prisma from '$lib/prisma';
import { redirect } from '@sveltejs/kit';

export const DELETE = async (request) => {
    const { id } = request.params;
    const claimId = parseInt(id);
    const userId = request.locals.user?.id;

    // if not logged in, 401
    if (!userId) {
        return new Response('Unauthorized', { status: 401 });
    }

    // get the user that is trying to delete the claim
    const deleter = await prisma.user.findUnique({ where: { id: userId } });

    // if the deleter is neither a mod nor admin, check that the deleter owns the claim
    // TODO: make it so that admins can delete any claim and mods can't delete each other's
    // and admin's claims
    if (!deleter?.roles.includes('ADMIN') && !deleter?.roles.includes('MODERATOR')) {
        
        const claimOwnerId = (await prisma.claim.findUnique({ where: { id: claimId } }))?.creatorId;

        // if not the owner tries to delete it, 403
        if (claimOwnerId !== userId) {
            return new Response(
                'You cannot delete this claim as it does not belong to you', 
            { status: 403 });
        }
    }

    // delete the sources, reactions and then the claim
    console.log(`User ${userId} is deleting claim ${claimId}`);

    const deleteSources = prisma.source.deleteMany({ where: { claimId } });
    const deleteReactions = prisma.reaction.deleteMany({ where: { claimId } });
    const deleteClaim = prisma.claim.delete({ where: { id: claimId } });

    await prisma.$transaction([
        deleteSources, 
        deleteReactions, 
        deleteClaim
    ]);

    console.log("Claim deleted successfully");

    redirect(302, '/');
};