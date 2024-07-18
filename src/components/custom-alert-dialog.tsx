import React, { ButtonHTMLAttributes } from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { PopoverClose } from '@radix-ui/react-popover';
import { cn } from '@/lib/utils';

type CustomAlertDialogProps = {
    className?: string,    
    title?: string,
    desc?: string,
    cancelContent?: string,
    confirmContent?: string,    
    confirmAction?: (...params:any) => void,
    actionType?: "button" | "submit" | "reset" | undefined,
    onClose?: () => void
}

function CustomAlertDialog({ className, ...props }: CustomAlertDialogProps) {
    return (
        <AlertDialog>            
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className='text-lg'>{props.title}</AlertDialogTitle>
                    <AlertDialogDescription className='text-md'>
                        {props.desc}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <PopoverClose>
                        <AlertDialogCancel onClick={props.onClose} className='text-md'>{props.cancelContent}</AlertDialogCancel>
                    </PopoverClose>
                    <PopoverClose>
                        <AlertDialogAction type={props.actionType} onClick={props.confirmAction} className='text-md'>{props.confirmContent}</AlertDialogAction>
                    </PopoverClose>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default CustomAlertDialog