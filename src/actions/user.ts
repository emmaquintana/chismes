import prisma from "@/lib/db";
import { users } from "@prisma/client";

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