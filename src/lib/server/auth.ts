import { Lucia, TimeSpan } from "lucia";
import { dev } from "$app/environment";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const adapter = new PrismaAdapter(client.session, client.user);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: !dev
		}
	},
    sessionExpiresIn: new TimeSpan(24, "h"),
    getUserAttributes: (attributes) => {
		return {
			// attributes has the type of DatabaseUserAttributes
			id: attributes.id,
			username: attributes.username
		};
	}
});

export const validUsername = (username: unknown) => {
	if (typeof username !== "string") {
		return false;
	}
	return !(username.length < 3 || username.length > 31 || !/^[a-z0-9_-]+$/.test(username));
}

export const validPassword = (password: unknown) => {
	if (typeof password !== "string") {
		return false;
	}
	return !(password.length < 1 || password.length > 255);
}

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		UserId: number;
        DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	id: number
	username: string;
}