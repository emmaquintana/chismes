"use client"

import Link from 'next/link'
import React from 'react'

function TestingPage() {
  return (
    <div className='flex items-center justify-center w-full h-[calc(100dvh-64px)] py-10'>      
      <Link href="/">Ir a ...</Link>
    </div>
  )
}

export default TestingPage