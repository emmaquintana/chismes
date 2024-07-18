import React from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog'
import { PopoverClose } from '@radix-ui/react-popover'
import { deleteChisme } from '@/actions/chisme'

function AlertDialogDeleteChismeButton({ chismeId }: { chismeId: number }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger className='p-2 hover:bg-muted transition-colors'>Borrar</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className='text-lg'>¿Estás seguro de querer borrar el chisme?</AlertDialogTitle>
                    <AlertDialogDescription className='text-md'>
                        ¿Estás seguro de que quieres borrar el chisme? Esta acción no puede ser revertida
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <PopoverClose asChild>
                        <AlertDialogCancel className='text-md'>Cancelar</AlertDialogCancel>
                    </PopoverClose>
                    <PopoverClose asChild>
                        <AlertDialogAction className='text-md' onClick={async () => { await deleteChisme(chismeId) }}>Confirmar</AlertDialogAction>
                    </PopoverClose>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default AlertDialogDeleteChismeButton