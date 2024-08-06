"use client";

import MaxWidthWrapper from '@/components/max-width-wrapper'
import { sendMailForResetPassword } from '@/lib/mailService';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function Page() {
    
    // When the user never pressed the button to retry, top limit of time is 61 (topTimeLimitNeverPressed). 
    // When the user pressed the button, top limit of time is 60 (topTimeLimit)
    const topTimeLimit = 25;
    const topTimeLimitNeverPressed = topTimeLimit + 1;
    const [time, setTime] = useState(topTimeLimitNeverPressed);
    
    const searchParams = useSearchParams();
    const email = searchParams.get("e");

    useEffect(() => {
        setTimeout(() => {
            if (!(time === 0) && !(time === topTimeLimitNeverPressed)) {
                setTime(prev => prev - 1);
            }
        }, 1000)
    }, [time]);

    return (
        <div className='flex flex-col w-full h-fit items-center gap-5 text-center'>
            <MaxWidthWrapper className='flex flex-col w-full h-full items-center gap-5 mt-10'>
                <h1 className='text-4xl font-extrabold '>Reestablecer contraseña</h1>
                <p className='text-lg'>Verifica tu dirección de correo electrónico (<Link className='text-sky-400' href={`mailto:${email}`}>{email}</Link>) para continuar con el proceso de recuperación de contraseña</p>
                <p className='text-lg text-muted-foreground'>¿No recibiste el correo? <span className={cn('text-sky-400 cursor-pointer', {
                    "text-gray-500": time > 0 && time <= topTimeLimit,
                    "cursor-default": time > 0 && time <= topTimeLimit
                })} onClick={async () => {
                    if (time === 0 || time === topTimeLimitNeverPressed) {
                        setTime(topTimeLimit);
                        await sendMailForResetPassword(email!)
                    }
                }}>Presiona aqui para que volvamos a enviartelo.</span></p>
                {time < topTimeLimitNeverPressed && time > 0 &&
                    <p className='text-lg text-muted-foreground'>Espera este tiempo para volver a intentarlo: {time}</p>
                }
            </MaxWidthWrapper>
        </div>
    )
}
export default Page;