"use client";

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
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';
import useEditChisme from '@/custom-hooks/useEditChisme';
import LoadingIcon from './loading-icon';
import { useState } from 'react';

function DialogEditChisme({ className, content = "Editar", chismeId }: { className?: string, content?: string, chismeId: number }) {
    const [isOpen, setIsOpen] = useState(false);
    const { register, formState: { errors, isSubmitSuccessful }, handleSubmit, reset } = useForm({
        resolver: zodResolver(updateChismeSchema)
    });
    const { onSubmit, loading, values } = useEditChisme(chismeId);

    const handleFormSubmit = async (data: any) => {
        await onSubmit(data);
        reset();
        setIsOpen(false);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger className={cn('p-2 hover:bg-muted transition-colors', className)}>
                {content}
            </DialogTrigger>
            <DialogContent className="md:max-w-[650px] sm:max-w-96">
                <form onSubmit={handleSubmit(handleFormSubmit)}>
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
                                defaultValue={values.title}
                                autoFocus={false}
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
                                defaultValue={values.desc}
                                autoFocus={false}
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
    )
}

export default DialogEditChisme