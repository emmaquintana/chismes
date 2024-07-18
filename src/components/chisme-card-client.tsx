"use client";

import AlertDialogDeleteChismeButton from './alert-dialog-delete-btn';
import DialogEditChisme from './dialog-edit-chisme';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

function ChismeCardClient({ id }: { id: number }) {

    return (
        <Popover>
            <PopoverTrigger className='font-bold text-xl text-secondary-foreground hover:bg-muted transition-colors p-2 select-none text-center cursor-pointer'>:</PopoverTrigger>
            <PopoverContent className='w-fit p-1 flex flex-col'>
                <AlertDialogDeleteChismeButton chismeId={id} />
                <DialogEditChisme chismeId={id} />
            </PopoverContent>
        </Popover>
    )
}

export default ChismeCardClient