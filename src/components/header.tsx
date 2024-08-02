import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { logout } from '@/actions/auth';
import { validateRequest } from '@/lib/auth'
import MobileHeaderMenu from './mobile-header-menu';

async function Header() {

    const { user } = await validateRequest();

    return (
        <header className="fixed top-0 h-fit py-4 w-full rounded-b-md bg-primary z-10">
            <nav className="flex items-center justify-between h-full w-full px-1">
                <Link href="/" className="ml-5 text-3xl font-bold text-primary-foreground">Chismes</Link>
                <div className='hidden md:flex justify-between items-center'>
                    {user &&
                        <div className='flex items-center space-x-5'>                            
                            <p className='font-bold text-lg text-primary-foreground tracking-wide'>¡Hola {user.firstName}!</p>
                            <form action={logout}>
                                <Button className='text-primary-foreground font-bold text-lg'>Cerrar sesión</Button>
                            </form>
                        </div>
                    }
                    {!user &&
                        <div className='px-2 space-x-6'>
                            <Link href="/sign-in" className='text-primary-foreground font-bold text-lg'>Iniciar sesión</Link>
                            <Link href="/sign-up" className='text-primary-foreground font-bold text-lg'>Registrarse</Link>
                        </div>
                    }
                </div>
                <MobileHeaderMenu user={user} logoutAction={logout} className='md:hidden' />
            </nav>
        </header>
    )
}

export default Header