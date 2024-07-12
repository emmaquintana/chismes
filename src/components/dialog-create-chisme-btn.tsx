import React from 'react'
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
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from '@/lib/utils';
import { Textarea } from './ui/textarea';

function DialogCreateChismeButton({ className, content = "+" }: { className?: string, content?: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={cn("active:scale-90 duration-75 transition-transform", className)}>{content}</Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[650px] sm:max-w-96">
        <DialogHeader>
          <DialogTitle>Crear chisme</DialogTitle>
          <DialogDescription>
            ¡Quemá a alguien en poco tiempo!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="title" className="text-left">
              Titulo
            </Label>
            <Input
              id="title"
              placeholder='Por ej.: Iara del barrio Sarmiento tiene 7 novios. Uno de ellos es mi novio.'
              className="focus:border-primary focus-visible:ring-0 transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="description" className="text-left">
              Descripción del chisme
            </Label>
            <Textarea
              id="description"
              className='resize-none focus-visible:ring-0 focus:border-primary'
              placeholder='Por ej.: Voy a funar a quien fue mi mejor amiga Iara. El otro día...' />
          </div>
        </div>
        <DialogFooter className='flex-row justify-end gap-2'>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit">Publicar chisme</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DialogCreateChismeButton