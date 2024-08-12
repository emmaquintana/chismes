import { InfoButtonEditCardForm, InfoCard } from "@/components/info-button-card";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/db";
import { getCommonDate } from "@/lib/utils";
import Image from "next/image";

// Receives username as params
async function Page({ params }: { params: { slug: string } }) {

    const currentUser = await validateRequest();
    const userProfile = await prisma.users.findUnique({
        where: {
            username: params.slug
        }
    });

    if (!userProfile) {
        return (
            <section className="h-fit py-4 mt-10 flex flex-col justify-center items-center">
                <h1>El usuario {params.slug} no existe</h1>
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
                            <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">{userProfile?.firstName ?? 'Anónimo'} {userProfile?.lastName ?? ''}</h2>
                            <p className="font-bold text-md sm:text-lg md:text-xl text-muted-foreground">@{userProfile?.username}</p>
                        </div>
                    </div>
                </section>
                <section className="mt-20 flex flex-wrap items-center justify-center gap-5 place-items-start w-fit h-fit animate-fade-in">
                    {currentUser.user?.username === params.slug ? (
                        <>
                            <InfoButtonEditCardForm
                                title="Nombre de usuario"
                                desc={currentUser.user.username}
                                userId={currentUser.user.id}
                                actionType="updateUsername"
                                className="drop-shadow-lg"
                            />
                            <InfoButtonEditCardForm
                                title="Nombre"
                                desc={currentUser.user.firstName}
                                userId={currentUser.user.id}
                                actionType="updateFirstName"
                                className="drop-shadow-lg"
                            />
                            <InfoButtonEditCardForm
                                title="Apellido"
                                desc={currentUser.user.lastName}
                                userId={currentUser.user.id}
                                actionType="updateLastName"
                                className="drop-shadow-lg"
                            />
                            <InfoButtonEditCardForm
                                title="Email"
                                desc={currentUser.user.email}
                                userId={currentUser.user.id}
                                actionType="updateEmail"
                                className="drop-shadow-lg"
                            />
                            <InfoCard title="Edad" desc={(new Date(Date.now()).getFullYear()) - currentUser.user.birthdate.getFullYear()} />
                            <InfoCard title="Fecha de creación" desc={getCommonDate(new Date(currentUser.user.createdAt))} />
                        </>
                    ) : (
                        <>
                            <InfoCard title="Nombre de usuario" desc={userProfile.username!} />
                            <InfoCard title="Nombre" desc={userProfile.firstName!} />
                            <InfoCard title="Apellido" desc={userProfile.lastName!} />
                            <InfoCard title="Email" desc={userProfile.email!} />
                            <InfoCard title="Edad" desc={(new Date(Date.now()).getFullYear()) - userProfile.birthdate.getFullYear()} />
                            <InfoCard title="Fecha de creación" desc={getCommonDate(new Date(userProfile.createdAt))} />
                        </>
                    )}
                </section>
            </MaxWidthWrapper>
        </main >
    )

}



export default Page