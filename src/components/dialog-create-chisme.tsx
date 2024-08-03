"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from '@/lib/utils';
import { Textarea } from './ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createChismeSchema } from '@/app/validations/chismeSchema';
import useCreateChisme from '@/custom-hooks/useCreateChisme';
import LoadingIcon from './loading-icon';

function DialogCreateChisme({ className, content = "+" }: { className?: string, content?: string }) {

    const [isOpen, setIsOpen] = useState(false);
    const { register, formState: { errors, isSubmitting: loading, isValidating, isSubmitSuccessful }, handleSubmit, reset } = useForm({
        resolver: zodResolver(createChismeSchema)
    });

    const { onSubmit } = useCreateChisme();

    const handleFormSubmit = async (data: any) => {
        await onSubmit(data)        
        reset();
        setIsOpen(false)        
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className={cn("active:scale-90 duration-75 transition-transform", className)}>{content}</Button>
            </DialogTrigger>
            <DialogContent className="md:max-w-[650px] sm:max-w-96">
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <DialogHeader>
                        <DialogTitle className='text-xl'>Crear chisme</DialogTitle>
                        <DialogDescription className='text-md'>
                            ¡Quemá a alguien en poco tiempo!
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="title" className="text-left text-md">
                                Titulo
                            </Label>
                            <Input
                                id="title"
                                placeholder='Min. 12 caracteres - Max. 92 caracteres'
                                className="text-md focus:border-primary focus-visible:ring-0 transition-colors"
                                {...register("title")}
                            />
                            {errors.title?.message && <p className='text-md text-destructive'>{errors.title.message as string}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="description" className="text-left text-md">
                                Descripción del chisme
                            </Label>
                            <Textarea
                                id="description"
                                className='text-md resize-none focus-visible:ring-0 focus:border-primary'
                                placeholder='Min. 42 caracteres - Max. 2048 caracteres'
                                {...register("desc")}
                            />
                            {errors.desc?.message && <p className='text-md text-destructive'>{errors.desc.message as string}</p>}
                        </div>
                    </div>
                    <DialogFooter className='flex-row justify-end gap-2'>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cerrar
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={loading} className={loading ? 'cursor-default' : 'cursor-pointer'}>
                            {!loading &&
                                <>Publicar chisme</>
                            }
                            {loading &&
                                <div className='flex gap-2 items-center justify-center h-fit'>
                                    <LoadingIcon className='text-lg text-white font-bold' />
                                    <p>Publicar chisme</p>
                                </div>
                            }
                            {isValidating &&
                                <div className='flex gap-2 items-center justify-center h-fit'>
                                    <LoadingIcon className='text-lg text-white font-bold' />
                                    <p>Publicar chisme</p>
                                </div>
                            }
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default DialogCreateChisme