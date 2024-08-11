"use server"

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function obtainUser(id: string) {
    try {
        const user = await prisma.users.findUnique({
            where: {
                id: id
            }
        });
        return user;
    }
    catch (err) {
        console.error(err as Error);
    }
}

export async function emailExists(email: string) {
    try {
        const result = await prisma.users.findUnique({
            where: {
                email: email
            }
        });

        return result ? true : false;
    }
    catch (err) {
        console.error(err as Error);
    }
}

export async function tokenExists(token: string) {
    const result = await prisma.password_reset.findUnique({
        where: {
            token
        }
    })

    return result ? true : false;
}

export async function updateFirstName(formData?: FormData) {

    if (!formData) {
        return {
            message: "No se proporcionó información"
        }
    }

    const firstName = formData.get("firstName")?.toString().trim();
    const userId = formData.get("userId");

    console.log(userId)

    try {
        await prisma.users.update({
            where: {
                id: userId as string
            },
            data: {
                firstName: firstName?.length === 0 ? 'Anónimo' : firstName
            }
        });

        revalidatePath("/profile");
    }
    catch (err) {
        console.error(err)
        return {
            message: "Hubo un error. Intentalo nuevamente"
        }
    }
}

export async function updateLastName(formData?: FormData) {

    if (!formData) {
        return {
            message: "No se proporcionó información"
        }
    }

    const lastName = formData.get("lastName")?.toString().trim();
    const userId = formData.get("userId");

    console.log(userId)

    try {
        await prisma.users.update({
            where: {
                id: userId as string
            },
            data: {
                lastName
            }
        });

        revalidatePath("/profile");
    }
    catch (err) {
        console.error(err)
        return {
            message: "Hubo un error. Intentalo nuevamente"
        }
    }
}

export async function updateUsername(formData?: FormData) {

    if (!formData) {
        return {
            message: "No se proporcionó información"
        }
    }

    const username = formData.get("username")?.toString().trim();
    const userId = formData.get("userId");

    try {
        if (await userNameExists(username as string)) {
            return {
                message: "El nombre de usuario " + username as string + " no está disponible"
            }
        }

        await prisma.users.update({
            where: {
                id: userId as string
            },
            data: {
                username: username
            }
        });

        revalidatePath("/profile");
    }
    catch (err) {
        console.error(err)
        return {
            message: "Hubo un error. Intentalo nuevamente"
        }
    }
}

export async function updateEmail(formData?: FormData) {

    if (!formData) {
        return {
            message: "No se proporcionó información"
        }
    }

    const email = formData.get("email")?.toString().trim();
    const userId = formData.get("userId");

    try {
        if (await emailExists(email!)) {
            return {
                message: "El email " + email + " no está disponible"
            }
        }

        await prisma.users.update({
            where: {
                id: userId as string
            },
            data: {
                email: email
            }
        });

        revalidatePath("/profile");
    }
    catch (err) {
        console.error(err)
        return {
            message: "Hubo un error. Intentalo nuevamente"
        }
    }
}

export async function userNameExists(username: string) {

    username = username.toString().trim();

    const userNameExists = await prisma.users.findUnique({
        where: {
            username: username
        }
    });

    return userNameExists;
}