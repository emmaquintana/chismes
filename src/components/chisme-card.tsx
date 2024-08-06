import { obtainUser } from '@/actions/user';
import { cn } from '@/lib/utils';
import Link from 'next/link'
import React, { HTMLAttributes } from 'react'
import ChismeCardClient from './chisme-card-client';

type ChismeCardProps = HTMLAttributes<HTMLDivElement> & {
    id?: number,
    title?: string
    createdAt?: Date,
    updatedAt?: Date | null | undefined,
    desc?: string,
    user_id?: string,
    currentUserId?: string
};

async function ChismeCard({ className, ...props }: ChismeCardProps) {

    const user = await obtainUser(props.user_id!);

    props.createdAt?.setHours(props.createdAt.getHours() + 3);
    const dateObj = {
        day: props.createdAt?.getDate(),
        month: props.createdAt?.getMonth()! + 1,
        year: props.createdAt?.getFullYear(),
        hour: props.createdAt?.getHours(),
        minute: props.createdAt?.getMinutes()! < 10 ? "0" + props.createdAt?.getMinutes() : props.createdAt?.getMinutes(),
        second: props.createdAt?.getSeconds(),
    }
    const date = `${dateObj.day}-${dateObj.month}-${dateObj.year} ${dateObj.hour}:${dateObj.minute}`

    return (
        <div className={cn("flex flex-col shadow-md rounded-md bg-background w-full h-fit min-h-10", className)} {...props}>
            <div className="flex w-full h-fit gap-2 p-4 bg-secondary">
                <div className='flex justify-between items-center w-full'>
                    <div className='flex gap-2'>
                        <div className="rounded-full size-10 bg-gray-300"></div>
                        <div className="flex flex-col justify-center h-10 text-foreground">
                            {user &&
                                <>
                                    <p className="text-left">{user.firstName ?? "Anónimo"} {user.lastName}</p>
                                    <p className="text-left text-muted-foreground">{date}</p>
                                </>}
                            {!user &&
                                <>
                                    <p className="text-left">Nombre de usuario</p>
                                    <p className="text-left text-muted-foreground">{date}</p>
                                </>}
                        </div>
                    </div>
                    {props.id && props.currentUserId === props.user_id &&
                        <ChismeCardClient id={props.id} />
                    }
                </div>
            </div>
            <Link href={`/chisme/${props.id}`} className='p-4 space-y-2'>
                <h3 className='font-extrabold'>{props.title}</h3>
                <p>{props.desc}</p>
            </Link>
        </div>
    )
}

export default ChismeCard