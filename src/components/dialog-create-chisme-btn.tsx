import React from 'react'
import DialogCreateChisme from './dialog-create-chisme';
import { validateRequest } from '@/lib/auth';
import DialogAuth from './dialog-auth';

async function DialogCreateChismeButton({ className }: { className?: string }) {

  const { user } = await validateRequest();

  return (
    <>
      {user ? (
        <DialogCreateChisme className={className} />
      ) : (
        <DialogAuth className={className} />
      )}
    </>
  )
}

export default DialogCreateChismeButton