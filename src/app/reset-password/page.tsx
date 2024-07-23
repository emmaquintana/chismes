"use client"

import MaxWidthWrapper from '@/components/max-width-wrapper'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { emailExists } from '@/actions/user';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'
import { sendMailForResetPassword } from '@/lib/mailService';

function Page() {

    const [errors, setErrors] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");
        const result = await emailExists(email as string);

        if (result) {            
            await sendMailForResetPassword(email as string);
            router.push(`/reset-password/email-verification?e=${email}`);
        }
        else {
            setErrors("El mail no se encuentra o es inválido");
        }
    }

    {console.log()}

    return (
        <div className='flex flex-col w-full h-fit items-center gap-5 text-center'>
            <MaxWidthWrapper className='flex flex-col w-full h-full items-center gap-5 mt-10'>
                <div className="flex flex-col gap-4 justify-center items-center h-fit w-full p-6 shadow-sm border rounded-lg min-[500px]:w-[360px] sm:w-72 md:w-96 min-w-64">
                    <h1 className="font-extrabold text-2xl">Reestablecer contraseña</h1>
                    <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="email" className="text-md text-left">Email</Label>
                            <Input required={true} type='email' name='email' id="email" className="focus-visible:ring-0 focus:border-primary transition-colors" />
                            {errors && <p className='text-destructive text-sm text-left'>{errors}</p>}
                        </div>
                        <Button type="submit" className="focus-visible:ring-0 focus:border-primary transition-colors">Siguiente</Button>
                    </form>
                </div>
            </MaxWidthWrapper>
        </div>
    )
}
export default Page