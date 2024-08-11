"use client"

import React, { useState } from "react";
import { RiPencilFill } from "react-icons/ri";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button, buttonVariants } from "./ui/button";
import { editEmailSchema, editFirstNameSchema, editLastNameSchema, editUsernameSchema, userValidationsNumbers } from "@/app/validations/authSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updateEmail, updateFirstName, updateLastName, updateUsername } from "@/actions/user";
import LoadingIcon from "./loading-icon";


interface InfoCardProps extends React.HTMLAttributes<HTMLDivElement> {
    icon?: React.ReactElement;
    title?: string;
    desc?: string | number;
}

export function InfoCard({ className, icon: Icon, title, desc, ...props }: InfoCardProps) {
    return (
        <div className={cn("p-5 flex items-center justify-between rounded-lg bg-white shadow-md w-full max-w-80 h-32", className)} {...props}>
            <div>
                <h3 className="font-bold text-3xl">{title}</h3>
                <p className="text-xl text-muted-foreground font-semibold">{desc}</p>
            </div>
            {Icon && React.cloneElement(Icon, { className: "text-2xl text-black" })}
            {props.children}
        </div>
    );
}

export interface InfoButtonCardProps extends InfoCardProps { }

export function InfoButtonCard({ className, icon: Icon, title, desc, ...props }: InfoButtonCardProps) {
    return (
        <div className={cn("p-5 flex items-center justify-between rounded-lg bg-white shadow-md w-full max-w-80 h-32 group transition-all duration-300 cursor-pointer hover:bg-primary hover:scale-105 active:scale-100 overflow-hidden", className)} {...props}>
            <div>
                <h3 className="font-bold text-3xl group-hover:text-primary-foreground transition-all duration-300">{title}</h3>
                <p className="text-xl text-muted-foreground font-semibold group-hover:text-primary-foreground transition-all duration-300">{desc}</p>
            </div>
            {Icon && React.cloneElement(Icon, { className: "text-2xl text-black group-hover:text-primary-foreground group-hover:animate-rotate-360 translate-x-[200%] group-hover:translate-x-0 transition-all duration-300" })}
            {props.children}
        </div>
    );
}

interface InfoButtonEditCardFormProps extends InfoButtonCardProps {
    validations?: typeof userValidationsNumbers,
    userId: string | number,
    actionType: 'updateLastName' | 'updateFirstName' | 'updateEmail' | 'updateUsername'
}

export function InfoButtonEditCardForm(props: InfoButtonEditCardFormProps) {
    const [dialogIsOpened, setDialogIsOpened] = useState(false);
    let actionFunction: (formData?: FormData) => Promise<{ message: string; } | undefined>;
    let validationSchema: z.ZodObject<any>;
    let name: string;

    switch (props.actionType) {
        case 'updateFirstName':
            actionFunction = updateFirstName;
            validationSchema = editFirstNameSchema;
            name = 'firstName';
            break;
        case 'updateLastName':
            actionFunction = updateLastName;
            validationSchema = editLastNameSchema;
            name = 'lastName';
            break;
        case 'updateUsername':
            actionFunction = updateUsername;
            validationSchema = editUsernameSchema;
            name = 'username';
            break;
        case 'updateEmail':
            actionFunction = updateEmail;
            validationSchema = editEmailSchema;
            name = "email";
            break;
        default:
            validationSchema = editFirstNameSchema;
            name = 'firstName'
            break;
    }

    const { register, formState: { errors, isSubmitting, isValidating }, handleSubmit, watch, setError } = useForm<z.infer<typeof validationSchema>>({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            [name]: props.desc as string,
        },
        mode: "onSubmit"
    });

    const value = watch('value');

    const isChanged = value !== props.desc;

    const onSubmit = async (data: z.infer<typeof validationSchema>) => {
        try {
            const formData = new FormData();

            Object.entries(data).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    formData.append(key, value.toString());
                }
            });

            const result = await actionFunction(formData);

            if (result?.message) {
                throw new Error(result!.message!)
            }

            setDialogIsOpened(false);
        }
        catch (err) {
            console.log(err as Error);
            setError("root", {
                message: (err as Error).message
            });
        }
    };

    return (
        <>
            <InfoButtonCard title={props.title} desc={props.desc} onClick={() => setDialogIsOpened(true)}>
                <RiPencilFill className="text-2xl text-black group-hover:text-primary-foreground group-hover:animate-rotate-360 translate-x-[200%] group-hover:translate-x-0 transition-all duration-300 hover:scale-110" />
            </InfoButtonCard>
            <Dialog open={dialogIsOpened} onOpenChange={setDialogIsOpened}>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                        <DialogHeader>
                            <DialogTitle className="text-2xl">Edita tu {props.title}</DialogTitle>
                        </DialogHeader>
                        <DialogDescription>
                            <Input
                                type="text"
                                className="w-full text-lg focus:border-primary focus-visible:ring-0 transition-colors text-card-foreground"
                                {...register(name)}
                            />
                            {errors[name] && <p className="text-md text-destructive">{errors[name]?.message as string}</p>}
                            <Input type="hidden" {...register("userId")} value={props.userId} />
                            {errors.root && <p className="text-md text-destructive">{errors.root.message}</p>}
                        </DialogDescription>
                        <DialogFooter>
                            <Button type="button" className={"text-black" + buttonVariants({ variant: 'outline' })} onClick={() => setDialogIsOpened(false)}>Cancelar</Button>
                            <Button type="submit" disabled={isSubmitting} className={isSubmitting ? 'cursor-default' : 'cursor-pointer'}>
                                {!isSubmitting &&
                                    <>Confirmar</>
                                }
                                {isSubmitting &&
                                    <div className='flex gap-2 items-center justify-center h-fit'>
                                        <LoadingIcon className='text-lg text-white font-bold' />
                                        <p>Confirmar</p>
                                    </div>
                                }
                                {isValidating &&
                                    <div className='flex gap-2 items-center justify-center h-fit'>
                                        <LoadingIcon className='text-lg text-white font-bold' />
                                        <p>Confirmar</p>
                                    </div>
                                }
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}