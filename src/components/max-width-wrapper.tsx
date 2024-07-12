import { cn } from '@/lib/utils'
import React, { HTMLAttributes } from 'react'

function MaxWidthWrapper({className, ...props}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("max-w-96 sm:max-w-[500px] md:max-w-[740px] lg:max-w-[780px] xl:max-w-[1400px] w-full", className)}>
        {props.children}        
    </div>
  )
}

export default MaxWidthWrapper