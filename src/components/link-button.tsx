import { cn } from "@/lib/utils"
import Link from "next/link"
import React from "react"

interface LinkButtonProps extends React.ComponentProps<typeof Link> {
    icon?: React.ReactElement
}

function LinkButton({ className, icon, href, ...props }: LinkButtonProps) {
    return (
        <Link href={href} className={cn('flex justify-center relative p-3 font-bold text-center text-2xl md:text-3xl gap-1 items-center h-fit active:scale-95 hover:text-primary hover:bg-secondary transition-all rounded-full select-none', className)} {...props}>
            {icon}
            <p>{props.content}</p>
            {props.children}
        </Link>
    )
}

export default LinkButton