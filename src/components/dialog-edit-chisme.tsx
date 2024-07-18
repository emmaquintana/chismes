"use client";

import { updateChisme } from '@/actions/chisme';
import { updateChismeSchema } from '@/app/validations/chismeSchema';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Textarea } from './ui/textarea';
import { useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';

function DialogEditChisme({ className, content = "Editar", chismeId }: { className?: string, content?: string, chismeId?: number }) {
    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: zodResolver(updateChismeSchema)
    });
    const [confirmDialogIsDisplayed, setConfirmDialogIsDisplayed] = useState(false);
    const [formData, setFormData] = useState(null);

    const onSubmit = async (data: any) => {
        setFormData(data);
        setConfirmDialogIsDisplayed(true);
    }

    const handleConfirm = async () => {
        try {
            setConfirmDialogIsDisplayed(false);
            
            if (formData) {
                const formDataObj = new FormData();
                Object.entries(formData).forEach(([key, value]) => {
                    if (value !== undefined && value !== null) {
                        formDataObj.append(key, value.toString());
                    }
                });

                const result = await updateChisme(formDataObj);                
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Dialog>
                <DialogTrigger className={cn('p-2 hover:bg-muted transition-colors', className)}>
                    {content}
                </DialogTrigger>
                <DialogContent className="md:max-w-[650px] sm:max-w-96">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle className='text-xl'>Editar chisme</DialogTitle>
                            <DialogDescription className='text-md'>
                                ¿Te olvidaste de quemar a alguien más? Meté leña al fuego, serpiente
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
                                <Input type="hidden" {...register("chismeId")} value={chismeId} />
                            </div>
                        </div>
                        <DialogFooter className='flex-row justify-end gap-2'>
                            <DialogClose asChild>
                                <Button type="button" variant="outline">
                                    Cancelar
                                </Button>
                            </DialogClose>
                            <Button type="submit">Editar</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            <AlertDialog open={confirmDialogIsDisplayed} onOpenChange={setConfirmDialogIsDisplayed}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className='text-lg'>¿Estás seguro de querer editar el chisme?</AlertDialogTitle>
                        <AlertDialogDescription className='text-md'>
                            Esta acción no puede ser revertida
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className='text-md'>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirm} className='text-md'>Confirmar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default DialogEditChisme