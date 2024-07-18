import React, { HTMLAttributes } from 'react'
import { Button, buttonVariants } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Link from 'next/link';
import { cn } from '@/lib/utils';

function DialogAuth({ className, content = '+' }: { className?: string, content?: string }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className={cn("active:scale-90 duration-75 transition-transform", className)}>{content}</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='text-2xl'>Iniciar sesión o registrarse</DialogTitle>
                    <DialogDescription className='text-md'>
                        Para poder realizar esta acción, debes estar logueadx con una cuenta
                    </DialogDescription>
                </DialogHeader>
                <div className='flex gap-4'>
                    <Link href="/sign-up" className={cn(buttonVariants({ variant: "default" }), "text-md")}>Registrarse</Link>
                    <Link href="/sign-in" className={cn(buttonVariants({ variant: "default" }), "text-md")}>Iniciar sesión</Link>
                </div>
                <DialogFooter className='flex-row justify-end gap-2'>
                    <DialogClose asChild>
                        <Button type="button" variant="outline" className='text-md'>Cancelar</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DialogAuth