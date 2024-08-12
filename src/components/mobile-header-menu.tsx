"use client"

import { User } from 'lucia';
import React, { useState } from 'react'
import { IoMdMenu } from "react-icons/io";
import { Button } from './ui/button';
import Link from 'next/link';
import { IoMdClose } from "react-icons/io";
import { cn } from '@/lib/utils';

type MobileHeaderProps = {
    user?: User | null,
    logoutAction?: any,
    className?: string
}

function MobileHeaderMenu({ className, ...props }: MobileHeaderProps) {

    const [menuIsDisplayed, setMenuIsDisplayed] = useState<boolean | null>(null);

    return (
        <>
            <IoMdMenu className={cn('text-3xl text-primary-foreground font-extrabold mr-6 cursor-pointer active:scale-90 transition-transform', className)} onClick={() => setMenuIsDisplayed(true)} />
            <div className={cn('absolute -left-full top-0 h-dvh w-dvw transition-transform bg-primary hidden opacity-0', className, {
                "animate-to-zero-x block opacity-100 transition-opacity": menuIsDisplayed,
                "animate-to-full-left-x opacity-0 transition-opacity": !menuIsDisplayed
            })}>
                <button className='absolute right-0 text-4xl text-primary-foreground font-bold text-right p-4' onClick={() => {
                    setMenuIsDisplayed(false)
                }}>
                    <IoMdClose className='text-4xl text-primary-foreground active:scale-90 transition-transform' />
                </button>
                <div className='flex flex-col flex-wrap items-center justify-center h-full w-full'>
                    {props.user &&
                        <form action={props.logoutAction} className='flex flex-col items-center gap-4'>
                            <Button className='text-primary-foreground font-bold text-3xl select-none' onClick={() => setMenuIsDisplayed(false)}>Cerrar sesión</Button>
                            <Link href="/profile" onClick={() => setMenuIsDisplayed(false)} className='text-primary-foreground font-bold text-3xl select-none'>Mi Perfil</Link>
                        </form>
                    }
                    {!props.user &&
                        <div className='flex flex-col gap-6 items-center'>
                            <Link href="/sign-in" onClick={() => setMenuIsDisplayed(false)} className='text-primary-foreground font-bold text-3xl select-none'>Iniciar sesión</Link>
                            <Link href="/sign-up" onClick={() => setMenuIsDisplayed(false)} className='text-primary-foreground font-bold text-3xl select-none'>Registrarse</Link>
                        </div>
                    }
                </div>
            </div>

        </>
    )
}

export default MobileHeaderMenu