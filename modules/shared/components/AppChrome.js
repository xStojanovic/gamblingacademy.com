'use client';

import { usePathname } from 'next/navigation';
import SiteHeader from '@/modules/public/components/SiteHeader';
import SiteFooter from '@/modules/public/components/SiteFooter';

const workspacePrefixes = ['/dashboard', '/company', '/admin', '/cms', '/learn', '/assessment', '/login'];

export default function AppChrome({ children }) {
  const path = usePathname();
  const workspace = workspacePrefixes.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      {!workspace ? <SiteHeader /> : null}
      <main id="main-content" className={workspace ? 'workspace-main' : ''} tabIndex={-1}>{children}</main>
      {!workspace ? <SiteFooter /> : null}
    </>
  );
}
