import React from 'react'
import LoadingIcon from './loading-icon'
import { cn } from '@/lib/utils'

function LoadingScreen({ className }: { className?: string }) {
    return (
        <div className='flex items-center justify-center w-full h-[calc(100dvh-64px)] py-10'>
            <LoadingIcon className={cn('text-8xl', className)} />
        </div>
    )
}

export default LoadingScreen