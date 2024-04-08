import { lucia, validUsername, validPassword } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import { Argon2id } from "oslo/password";
import prisma from "$lib/prisma";

import type { Actions } from "./$types";


export const actions: Actions = {
	default: async (event) => {
		// console.log("hi");
		const formData = await event.request.formData();
		const username = formData.get("username") as string;
		const password = formData.get("password") as string;
		if (!validUsername(username)) {
			console.log("hi-username");
			return fail(400, {
				message: "Invalid username"
			});
		}
		if (!validPassword(password)) {
			console.log("hi-password");
			return fail(400, {
				message: "Invalid password"
			});
		}
		// console.log("hi");
		// check if username is already used
		const userExists = await prisma.user.findFirst({ where: { username } });
		if (userExists) {
			return fail(400, {
				message: "Username already in use"
			})
		}
		// console.log("hi");
		// hash the password and create new user
		const hashedPassword = await new Argon2id().hash(password);
		const newUser = await prisma.user.create({
			data: {
				username,
				hashedPassword
			}
		});

		console.log("New user created:", username);

		// create session cookie

		const session = await lucia.createSession(newUser.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});

		redirect(302, "/");
	}
};

