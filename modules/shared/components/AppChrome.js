'use client';
import {usePathname} from 'next/navigation';import SiteHeader from '@/modules/public/components/SiteHeader';import SiteFooter from '@/modules/public/components/SiteFooter';
const workspacePrefixes=['/dashboard','/company','/admin','/cms','/learn','/assessment','/login'];
export default function AppChrome({children}){const path=usePathname();const workspace=workspacePrefixes.some(p=>path===p||path.startsWith(`${p}/`));return <>{!workspace&&<SiteHeader/>}<main className={workspace?'workspace-main':''}>{children}</main>{!workspace&&<SiteFooter/>}</>}
