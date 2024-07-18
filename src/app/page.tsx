import { obtainAllChismes } from "@/actions/chisme";
import ChismeCard from "@/components/chisme-card";
import DialogCreateChismeButton from "@/components/dialog-create-chisme-btn";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { validateRequest } from "@/lib/auth";
import React from "react";

export default async function Home() {

  const chismes = await obtainAllChismes();
  const { session } = await validateRequest();

  return (
    <main className="flex flex-col items-center justify-between">
      <MaxWidthWrapper className="pb-2">
        {chismes && chismes.length > 0 && chismes.map((chisme) => (
          <ChismeCard
            className="mt-10 animate-fade-in-scale"
            id={chisme.id as never}
            title={chisme.title}
            desc={chisme.desc}
            user_id={chisme.user_id}
            key={chisme.id}
            currentUserId={session?.userId}
          />
        ))}
        {!chismes || chismes.length === 0 &&
          <div className="w-full animate-fade-in-scale">
            <Alert className="text-2xl text-primary w-fit mx-auto mt-10">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription className="text-lg">
                Sucedió algún error y no se pueden mostrar los chismes. Intentalo de nuevo más tarde
              </AlertDescription>
            </Alert>
          </div>
        }
      </MaxWidthWrapper>
      <DialogCreateChismeButton className="fixed bottom-6 right-6 rounded-full text-3xl font-bold size-16 " />
    </main>
  );
}
