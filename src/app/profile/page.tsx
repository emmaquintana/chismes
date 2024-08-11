import { updateFirstName, updateLastName } from "@/actions/user";
import { InfoButtonCard, InfoButtonEditCardForm, InfoCard } from "@/components/info-button-card";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import { validateRequest } from "@/lib/auth"
import { cn, getCommonDate } from "@/lib/utils";
import { AlertDialog, AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { RiPencilFill } from "react-icons/ri";
import { editFirstNameSchema } from "../validations/authSchema";

async function Page() {

    const user = await validateRequest();

    if (!user.user) {
        return (
            <section>
                <h1 className="p-10 text-3xl md:text-4xl font-bold text-center">Para acceder a tu perfil, primero debes <Link href="/sign-in" className="text-sky-300 underline">iniciar sesión</Link></h1>
            </section>
        );
    }

    return (
        <main className="w-dvw h-fit flex flex-col items-center justify-center">
            <MaxWidthWrapper className="mt-10 flex flex-col w-dvw h-fit justify-center items-center">
                <section className="animate-fade-in">
                    <div className="flex gap-4">
                        <Image alt="Foto de perfil anónima" src={"/user/anonimo.webp"} width={800} height={800} className="flex items-center justify-center text-4xl bg-gray-200 border-2 border-black rounded-full size-16 sm:size-20 md:size-24 lg:size-28" />
                        <div className="flex flex-col gap-1 justify-center">
                            <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">{user.user?.firstName ?? 'Anónimo'} {user.user?.lastName ?? ''}</h2>
                            <p className="font-bold text-md sm:text-lg md:text-xl text-muted-foreground">@{user.user?.username}</p>
                        </div>
                    </div>
                </section>
                <section className="mt-20 flex flex-wrap items-center justify-center gap-5 place-items-start w-fit h-fit animate-fade-in">
                    <InfoButtonEditCardForm
                        title="Nombre de usuario"
                        desc={user.user.username}
                        userId={user.user.id}
                        actionType="updateUsername"
                        className="drop-shadow-lg"
                    />
                    <InfoButtonEditCardForm
                        title="Nombre"
                        desc={user.user.firstName}
                        userId={user.user.id}
                        actionType="updateFirstName"
                        className="drop-shadow-lg"
                    />
                    <InfoButtonEditCardForm
                        title="Apellido"
                        desc={user.user.lastName}
                        userId={user.user.id}
                        actionType="updateLastName"
                        className="drop-shadow-lg"
                    />
                    <InfoButtonEditCardForm
                        title="Email"
                        desc={user.user.email}
                        userId={user.user.id}
                        actionType="updateEmail"
                        className="drop-shadow-lg"
                    />                
                    <InfoCard title="Edad" desc={(new Date(Date.now()).getFullYear()) - user.user.birthdate.getFullYear()} />
                    <InfoCard title="Fecha de creación" desc={getCommonDate(new Date(user.user.createdAt))} />
                </section>
            </MaxWidthWrapper>
        </main >
    )

}



export default Page