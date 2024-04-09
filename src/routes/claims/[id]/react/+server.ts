import type { RequestHandler } from './$types';
import prisma from '$lib/prisma';

export const POST: RequestHandler = async (request) => {
    const { id } = request.params;
    const { approve } = await request.request.json();
    const claimId = parseInt(id);
    const userId = request.locals.user?.id;

    // if not logged in, 401
    if (!userId) {
        return new Response('Unauthorized', { status: 401 });
    }

    const existingReaction = await prisma.reaction.findFirst({ where: { userId, claimId } });

    if (!existingReaction) {
        await prisma.reaction.create({ data: { userId, claimId, approve } });
        console.log("Reaction created");
        return new Response("Reaction created", { status: 201 });
    }

    console.log("Something went wrong (create)");
    return new Response("Something went wrong", { status: 400 });
};

export const PUT = async (request) => {
    const { id } = request.params;
    const { approve } = await request.request.json();
    const claimId = parseInt(id);
    const userId = request.locals.user?.id;

    // if not logged in, 401
    if (!userId) {
        return new Response('Unauthorized', { status: 401 });
    }

    const existingReaction = await prisma.reaction.findFirst({ where: { userId, claimId } });

    if (existingReaction) {
        await prisma.reaction.update({ where: { id: existingReaction.id }, data: { approve } });
        console.log("Reaction updated");
        return new Response("Reaction updated", { status: 200 });
    }

    console.log("Something went wrong (update)");
    return new Response("Something went wrong", { status: 400 });
};

export const DELETE = async (request) => {
    const { id } = request.params;
    const claimId = parseInt(id);
    const userId = request.locals.user?.id;

    const existingReaction = await prisma.reaction.findFirst({ where: { userId, claimId } });

    if (existingReaction) {
        await prisma.reaction.delete({ where: { id: existingReaction.id } });
        console.log("Reaction deleted");
        return new Response("Reaction deleted", { status: 200 });
    }

    console.log("Something went wrong (delete)");
    return new Response("Something went wrong", { status: 400 });
}