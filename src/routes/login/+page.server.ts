import type { Actions } from './$types';
import prisma from "$lib/prisma";
import { fail, redirect } from "@sveltejs/kit";
import { Argon2id } from "oslo/password";
import { lucia } from "$lib/server/auth";

export const actions: Actions = {
    default: async (event) => {
        const formData = await event.request.formData();
		const username = formData.get("username") as string;
		const password = formData.get("password") as string;

        const userExists = await prisma.user.findFirst({ where: { username } });

        if (!userExists) {
            return fail(400, {
                message: "Invalid username or password"
            })
        }

        const correctPassword = await new Argon2id().verify(userExists.hashedPassword, password);

        if (!correctPassword) {
            return fail(400, {
                message: "Invalid username or password"
            })
        }

        console.log("User logged in successfully: ", userExists.username);

        const session = await lucia.createSession(userExists.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});

		redirect(302, "/");

    }
};