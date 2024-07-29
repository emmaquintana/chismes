"use client"

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function useNavigationLoading() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setLoading(false); // Reset loading effect when route changes    
  }, [pathname, searchParams]);

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  return { loading, startLoading, stopLoading };
}

function LoadingIndicator() {
  return (
    <div className='fixed top-0 left-0 bg-[rgba(0,0,0,.2)] w-full h-full animate-pulse z-50'></div>
  );
}

function LinkWithLoading({ href, className, children, ...props }: React.ComponentProps<typeof Link>) {
  const { loading, startLoading } = useNavigationLoading();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {    
    // If the link's href is equal than the pathname, then nothing happens.
    if (pathname === href) {
      e.preventDefault();
      return;
    }
    startLoading();
  };

  return (
    <>
      {loading && <LoadingIndicator />}
      <Link href={href} className={className} onClick={handleClick} {...props}>
        {children}
      </Link>
    </>
  );
}

export { LinkWithLoading }