"use client";

import { resetPassword } from '@/actions/auth';
import { tokenExists } from '@/actions/user';
import { resetPasswordSchema } from '@/app/validations/authSchema'
import LoadingIcon from '@/components/loading-icon';
import MaxWidthWrapper from '@/components/max-width-wrapper'
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { wait } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaCheckCircle } from "react-icons/fa";

type ResetPasswordInputs = {
  password: string,
  confirmPassword: string,
  slug: string
}

function Page({ params }: { params: { slug: string } }) {

  const { register, formState: { errors }, handleSubmit } = useForm<ResetPasswordInputs>({
    resolver: zodResolver(resetPasswordSchema)
  });
  const [dialogIsDisplayed, setDialogIsDisplayed] = useState(false);
  const [time, setTime] = useState<number>(8);
  const [validToken, setValidToken] = useState<boolean | null>(null);
  const [verifyingToken, setVerifyingToken] = useState(true);
  const router = useRouter();

  const onSubmit = async (data: ResetPasswordInputs) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && key !== null) {
        formData.append(key, value.toString());
      }

    });
    const result = await resetPassword(formData);

    if (result) {
      console.log(result);
      setTime(7);
      setDialogIsDisplayed(true);
      await wait(5000);
      router.push("/");
    }
    else {
      console.error(result);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (!(time === 0)) {
        setTime(time - 1);
      }
    }, 1000);

    const func = async () => {
      const result = await tokenExists(params.slug);

      if (!result) {
        setValidToken(false);
      }
      else {
        setValidToken(true);
      }
    }

    func();
    setVerifyingToken(false);

  }, [time]);

  // Loading: Verifying token
  if (verifyingToken) {
    return (
      <div className='h-fit items-center'>
        <MaxWidthWrapper className='h-full mt-24 w-full mx-auto flex flex-col gap-2 text-center items-center justify-center'>
          <LoadingIcon />
        </MaxWidthWrapper>
      </div>
    )
  }

  // If token is not valid, then display this to the user
  if (!validToken && !verifyingToken) {
    return (
      <div className='h-fit items-center'>
        <MaxWidthWrapper className='h-full mt-24 w-full mx-auto flex flex-col gap-2 text-center items-center justify-center'>
          <h1 className='text-2xl font-extrabold'>El link usado no es válido</h1>
          <p className='text-lg'>Si considera que esto es un error, intentelo nuevamente</p>
        </MaxWidthWrapper>
      </div>
    );
  }

  return (
    <>
      <div className='h-fit items-center'>
        <MaxWidthWrapper className='h-full mt-24 w-full mx-auto flex items-center justify-center'>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center justify-center p-6 gap-4 shadow-sm border rounded-lg'>
            <h1 className='text-2xl font-extrabold'>Reestablecer contraseña</h1>
            <div className='block w-full'>
              <Label htmlFor='password' className='text-md'>Contraseña<span className="text-destructive"> *</span></Label>
              <Input type='password' id="password" className='focus-visible:ring-0 focus:border-primary transition-colors' {...register("password")} />
              {errors.password && <p className='text-destructive'>{errors.password.message as string}</p>}
            </div>
            <div className='block w-full'>
              <Label htmlFor='confirmPassword' className='text-md'>Confirmar contraseña<span className="text-destructive"> *</span></Label>
              <Input type='password' id="confirmPassword" className='focus-visible:ring-0 focus:border-primary transition-colors' {...register
                ("confirmPassword")} />
              {errors.confirmPassword && <p className='text-destructive'>{errors.confirmPassword.message as string}</p>}
            </div>
            <Input type="hidden" id="slug" value={params.slug} {...register("slug")} />
            {errors.root && <p className='text-destructive'>{errors.root.message as string}</p>}
            <Button type="submit" className='text-md focus-visible:ring-0 focus:border-primary transition-colors'>Confirmar</Button>
          </form>
        </MaxWidthWrapper>
      </div>
      <AlertDialog open={dialogIsDisplayed} onOpenChange={setDialogIsDisplayed}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-2xl flex gap-2 items-center'><FaCheckCircle className='text-green-500' /> Estado del proceso</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className='text-lg'>¡Tu contraseña fue reestablecida con éxito! Serás redirigidx automaticamente a la página de inicio en {time} segundos.</AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default Page