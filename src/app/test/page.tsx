"use client"

import LinkButton from '@/components/link-button';
import { cn } from '@/lib/utils';
import React from 'react'
import { MdHome, MdPerson } from 'react-icons/md';

function TestingPage() {

  return (
    <div className='flex items-center justify-center w-full h-[calc(100dvh-64px)] py-10'>
      <Menu />
    </div>
  )
}

function Menu() {
  return (
    <div className='flex flex-col justify-start gap-2 px-10 w-80'>
      <LinkButtonMenu
        href="/"
        icon={<MdHome />}
        content="Home"
      />
      <LinkButtonMenu
        href="/profile"
        icon={<MdPerson />}
        content="Mi perfil"
      />
    </div>
  );
}

interface LinkButtonMenuProps extends React.ComponentProps<typeof LinkButton> { }

function LinkButtonMenu(props: LinkButtonMenuProps) {
  return (
    <LinkButton href={props.href} className={cn('group gap-1 justify-start', props.className)}>
      <div className='group-hover:translate-x-2 transition-transform flex gap-2 items-center'>
        {props.icon}
        <p>{props.content}</p>
        {props.children}
      </div>
    </LinkButton>
  );
}

export default TestingPage