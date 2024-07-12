import ChismeCard from "@/components/chisme-card";
import DialogCreateChismeButton from "@/components/dialog-create-chisme-btn";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import React from "react";

export default function Home() {    
  
  return (
    <main className="flex flex-col items-center justify-between">
      <MaxWidthWrapper>
        <ChismeCard className="mt-10 animate-fade-in-scale" />
        <ChismeCard className="mt-10 animate-fade-in-scale" />
        <ChismeCard className="mt-10 animate-fade-in-scale" />
      </MaxWidthWrapper>
      <DialogCreateChismeButton className="fixed bottom-6 right-6 rounded-full text-3xl font-bold size-16 " />
    </main>
  );
}
