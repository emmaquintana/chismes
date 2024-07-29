"use client"

import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import React from 'react'

/**This component should be used only on dev environment */
function TestingButton({ className }: { className?: string }) {

    const router = useRouter();

    return (
        <button className={cn('px-4 py-2 bg-black text-lg text-white font-bold rounded-md active:scale-95 transition-transform', className)} onClick={() => {
            router.push("/test");
        }}>
            Test
        </button>
    )
}

export default TestingButton