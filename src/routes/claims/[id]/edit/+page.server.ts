import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
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

        const formData = await event.request.formData();

        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const sourcesStr = formData.get('sources') as string;
        const editId = parseInt(formData.get('editId') as string);

        const sources = sourcesStr.split(',').map(source => source.trim());
        

        const existingClaim = await prisma.claim.findUnique({ where: { id: editId } });

        if (!existingClaim) {
            return fail(400, {
                message: "Could not find the claim you're trying to edit"
            });
        }
        if (existingClaim.creatorId !== user.id) {
            return fail(403, {
                message: "You don't have permission to edit this claim"
            });
        }
        const deleteSources = prisma.source.deleteMany({ where: { claimId: editId } });
        const editClaim = prisma.claim.update({
            where: { id: editId },
            data: {
                title,
                description,
                editedAt: new Date()
            }
        });
        const replaceSources = prisma.source.createMany({
            data: sources.map(source => ({
                claimId: existingClaim.id,
                url: source
            }))}
        );

        await prisma.$transaction([deleteSources, editClaim, replaceSources]);
        
        
        console.log(`A claim with an id of ${existingClaim.id} was edited by ${user.username}`);
        redirect(302, `/claims/${existingClaim.id}`);
        // console.log(title, description, sources);
    }
}