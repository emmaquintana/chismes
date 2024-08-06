import MaxWidthWrapper from '@/components/max-width-wrapper';
import React from 'react'
import { MdConstruction } from "react-icons/md";

function Page({ params }: { params: { id: string } }) {
    return (
        <section className='w-dvw flex justify-center h-fit mt-24'>
            <MaxWidthWrapper className='w-full h-fit flex flex-col items-center gap-10'>
                <MdConstruction className='text-9xl text-primary' />
                <h1 className='text-4xl md:text-5xl lg:text-6xl font-extrabold text-center'>Hay cosas más importantes que atender...</h1>
                <h3 className='text-2xl md:text-3xl lg:text-4xl font-bold text-muted-foreground text-center'>¡Pronto podrás comentar chismes!</h3>
            </MaxWidthWrapper>
        </section>
    )
}

export default Page