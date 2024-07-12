import Link from 'next/link'
import React from 'react'

function Header() {
    return (
        <header className="fixed top-0 h-16 w-full rounded-b-md bg-primary">
            <nav className="content-center h-full w-full">
                <Link href="/" className="ml-5 text-left text-3xl font-bold text-white">Chismes</Link>
            </nav>
        </header>
    )
}

export default Header