"use server";

import prisma from "@/lib/db";
import { hash } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { lucia, validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { generateIdFromEntropySize } from "lucia";
import { verify } from "@node-rs/argon2";

export async function signup(formData: FormData): Promise<ActionResult> {
	const username = formData.get("username");
	if (
		typeof username !== "string" ||
		username.length < 6 ||
		username.length > 40
	) {
		return {
			error: "Invalid username"
		};
	}
	const password = formData.get("password");
	const confirmPassword = formData.get("confirmPassword");
	if (typeof password !== "string" || password.length < 6 || password.length > 40 || password !== confirmPassword) {
		return {
			error: "Invalid password"
		};
	}
	const email = formData.get("email") as string;
	const birthdate = formData.get("birthdate") as string;
	const firstName = formData.get("firstName") as string;
	const lastName = formData.get("lastName") as string;
	const gender = formData.get("gender") as string;

	const passwordHash = await hash(password, {
		// recommended minimum parameters
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});
	const userId = generateIdFromEntropySize(10); // 16 characters long

	// TODO: check if username is already used
	await prisma.users.create({
		data: {
			id: userId,
			username: username,
			password_hash: passwordHash,
			birthdate: new Date(birthdate).toISOString(),
			firstName: firstName,
			lastName: lastName,
			email: email,
			gender: gender === "masc" ? 'M' : gender === "fem" ? 'F' : gender === "other" ? 'O' : 'NR',
			createdAt: new Date(Date.now()),
			status: 'A'
		}
	});

	const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/");
}

export async function login(formData: FormData): Promise<ActionResult> {
	const username = formData.get("username") as string;
	/**
	if (
		typeof username !== "string" ||
		username.length < 6 ||
		username.length > 40 ||
		!/^[a-z0-9_-]+$/.test(username)
	) {
		return {
			error: "Usuario no válido"
		};
	}
		 */
	const password = formData.get("password") as string;
	/**
	if (typeof password !== "string" || password.length < 6 || password.length > 255) {
		return {
			error: "Contraseña no válida"
		};
	}
		 */

	const existingUser = await prisma.users.findUnique({
		where: {
			username: username.toLowerCase()
		}
	})
	if (!existingUser) {
		// NOTE:
		// Returning immediately allows malicious actors to figure out valid usernames from response times,
		// allowing them to only focus on guessing passwords in brute-force attacks.
		// As a preventive measure, you may want to hash passwords even for invalid usernames.
		// However, valid usernames can be already be revealed with the signup page among other methods.
		// It will also be much more resource intensive.
		// Since protecting against this is non-trivial,
		// it is crucial your implementation is protected against brute-force attacks with login throttling etc.
		// If usernames are public, you may outright tell the user that the username is invalid.
		return {
			error: "Usuario y/o contraseña incorrectos"
		};
	}

	const validPassword = await verify(existingUser.password_hash!, password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});
	if (!validPassword) {
		return {
			error: "Usuario y/o contraseña incorrectos"
		};
	}

	const session = await lucia.createSession(existingUser.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/");
}

export async function logout(): Promise<ActionResult> {
	const { session } = await validateRequest();
	if (!session) {
		return {
			error: "Unauthorized"
		};
	}

	await lucia.invalidateSession(session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/");
}

/**Reset the password of the user. 
 * The user is identified by the slug (token). 
 * If the slug is not registered in the db, then this function returns an error
 */
export async function resetPassword(formData: FormData) {
	const password = formData.get("password") as string;
	const confirmPassword = formData.get("confirmPassword") as string;
	const slug = formData.get("slug") as string; // This is the token

	if (password !== confirmPassword) {
		return "Contraseñas no coinciden";
	}

	const passwordHash = await hash(password, {
		// recommended minimum parameters
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});

	try {
		const tokenExistsInPasswordReset = await prisma.password_reset.findUnique({
			where: {
				token: slug
			}
		});

		if (!tokenExistsInPasswordReset) {			
			return `Error: token does not exist for reset password`
		}		

		// Find the user to update the password. 
		// The user is found by getting his email on password_reset table
		const email = await prisma.password_reset.findUnique({
			where: {
				token: slug
			}
		}).then(data => data?.user_email);

		// With the email obtained, update the password
		const result = await prisma.users.update({
			where: {
				email: email
			},
			data: {
				password_hash: passwordHash
			}
		});

		// With the password updated, password reset's record in db is deleted
		await prisma.password_reset.delete({
			where: {
				token: slug
			}
		});

		return result;
	}
	catch (err) {
		console.error(err as Error);
	}
}

interface ActionResult {
	error: string;
}