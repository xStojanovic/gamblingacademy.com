import './globals.css';
import AppChrome from '@/modules/shared/components/AppChrome';
export const metadata={
 title:{default:'OpsAcademy — Professional Operations Education',template:'%s | OpsAcademy'},
 description:'Professional operations education for individuals and teams. Learn the industry, develop people and standardize knowledge.',
 metadataBase:new URL(process.env.NEXT_PUBLIC_APP_URL||'https://opsacademy.example'),
 openGraph:{title:'OpsAcademy',description:'The professional learning platform for operations.',type:'website'},
 robots:{index:true,follow:true}
};
export default function RootLayout({children}){return <html lang="en" suppressHydrationWarning><body><script dangerouslySetInnerHTML={{__html:`try{var t=localStorage.getItem('opsacademy-theme');if(!t)t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}`}}/><AppChrome>{children}</AppChrome></body></html>}
