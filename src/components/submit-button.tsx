"use client"

import React, { ForwardRefExoticComponent, RefAttributes } from 'react'
import { Button, ButtonProps } from './ui/button'
import { useFormStatus } from 'react-dom';
import { cn } from '@/lib/utils';
import LoadingIcon from './loading-icon';

type SubmitButtonProps = ForwardRefExoticComponent<ButtonProps & RefAttributes<HTMLButtonElement>> & {
    children?: React.ReactNode,
    className?: string
};

const SubmitButton: React.FC<SubmitButtonProps> = ({ className, children, ...props }) => {

    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={pending} className={cn('focus-visible:ring-0 focus:border-primary transition-colors', className, {
            "bg-red-500": pending
        }
        )} {...props}>
            <div className='flex justify-center items-center gap-2'>
                {!pending ? (children) : (<p>Cargando...</p>)}
            </div>
        </Button>
    )
}

export default SubmitButton