import { cn } from '@/lib/utils';
import Link from 'next/link'
import React, { HTMLAttributes } from 'react'

type ChismeCardProps = HTMLAttributes<HTMLDivElement>;

function ChismeCard({className, ...props}: ChismeCardProps) {
    return (
        <div className={cn("flex flex-col shadow-md rounded-md bg-background w-full h-fit min-h-10", className)} {...props}>
            <div className="flex w-full h-fit gap-2 p-4 bg-secondary">
                <div className="rounded-full size-10 bg-gray-300"></div>
                <div className="flex flex-col justify-center h-10 text-foreground">
                    <p className="text-left">Nombre de usuario</p>
                    <p className="text-left text-muted-foreground">Escrito hace N tiempo</p>
                </div>
            </div>
            <Link href={`/chisme?id=${0}`}>
                <p className="p-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste ea, ratione tempora vitae delectus accusamus vero cupiditate harum dolorem sint laudantium esse odit quidem quaerat aspernatur est, reprehenderit rerum fuga?</p>
            </Link>
        </div>
    )
}

export default ChismeCard