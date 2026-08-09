import {NextResponse} from 'next/server';

export async function middleware(request){
  const {pathname}=request.nextUrl;const demo=process.env.NEXT_PUBLIC_DEMO_MODE!=='false';if(demo)return NextResponse.next();
  const token=request.cookies.get('oa_access_token')?.value;const supabaseUrl=process.env.NEXT_PUBLIC_SUPABASE_URL;const anonKey=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if(!token||!supabaseUrl||!anonKey){const url=request.nextUrl.clone();url.pathname='/login';url.searchParams.set('next',pathname);return NextResponse.redirect(url)}

  // Middleware resolves the authenticated profile instead of trusting a client-supplied role value.
  try{
    const auth=await fetch(`${supabaseUrl}/auth/v1/user`,{headers:{apikey:anonKey,Authorization:`Bearer ${token}`},cache:'no-store'});
    if(!auth.ok)throw new Error('Invalid session');
    const user=await auth.json();
    const profile=await fetch(`${supabaseUrl}/rest/v1/profiles?id=eq.${user.id}&select=role`,{headers:{apikey:anonKey,Authorization:`Bearer ${token}`},cache:'no-store'});
    const rows=profile.ok?await profile.json():[];const role=rows?.[0]?.role||'learner';
    if((pathname.startsWith('/admin')||pathname.startsWith('/cms'))&&role!=='academy_admin'){const url=request.nextUrl.clone();url.pathname='/dashboard';return NextResponse.redirect(url)}
    if(pathname.startsWith('/company')&&!['company_admin','academy_admin'].includes(role)){const url=request.nextUrl.clone();url.pathname='/dashboard';return NextResponse.redirect(url)}
    return NextResponse.next();
  }catch(e){const url=request.nextUrl.clone();url.pathname='/login';url.searchParams.set('next',pathname);return NextResponse.redirect(url)}
}
export const config={matcher:['/dashboard/:path*','/company/:path*','/admin/:path*','/cms/:path*']};
