import { cn } from '@/lib/utils';
import React from 'react'
import { RiLoader4Fill } from "react-icons/ri";


function LoadingIcon({className}: {className?: string}) {
  return (
    <RiLoader4Fill className={cn("text-8xl text-primary font-extrabold animate-spin", className)} />
  )
}

export default LoadingIcon