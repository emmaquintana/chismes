"use server"

import prisma from "@/lib/db";

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