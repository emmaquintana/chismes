"use server"

import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/db";
import { chismes } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function obtainAllChismes() {
    try {
        const chismes: chismes[] = await prisma.chismes.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        return chismes;
    }
    catch (err) {
        console.error(err);
    }
}

export async function createChisme(formData: FormData) {
    try {
        // Obtains data from formData and user's data from validateRequest() function
        const title = formData.get("title") as string;
        const desc = formData.get("desc") as string;
        const user = await validateRequest();

        // Obtains current date but in GMT-3
        const gmt3Date = new Date(Date.now());
        gmt3Date.setHours(gmt3Date.getHours() - 3);

        // Creates the chisme
        const chisme = await prisma.chismes.create({
            data: {
                title: title,
                desc: desc,
                createdAt: gmt3Date,
                isActive: 1,
                user_id: user.user?.id!
            }
        });

        revalidatePath("/");

        return chisme;
    }
    catch (err) {
        console.error(err as Error);
    }
}

export async function deleteChisme(id: number) {
    try {
        await prisma.chismes.delete({
            where: { id }
        });
        revalidatePath("/")
    }
    catch (err) {
        console.error(err as Error)
    }
}

export async function updateChisme(formData: FormData) {
    try {
        const title = formData.get("title") as string;
        const desc = formData.get("desc") as string;
        const chismeId = formData.get("chismeId");

        const updatedChisme = await prisma.chismes.update({
            where: {
                id: Number(chismeId)
            },
            data: {
                title,
                desc,
                updatedAt: new Date(Date.now())
            }
        });

        revalidatePath("/");

        return updatedChisme;
    }
    catch (err) {
        console.error(err);
    }
}

export async function obtainChisme(chismeId: number) {
    try {
        const chisme = await prisma.chismes.findUnique({
            where: {
                id: chismeId
            }
        });

        return chisme;
    }
    catch (err) {
        console.log(err as Error);
    }
}