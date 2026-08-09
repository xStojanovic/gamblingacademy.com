import {NextResponse} from 'next/server';
export async function POST(){const r=NextResponse.json({ok:true});for(const name of ['oa_session','oa_access_token','oa_refresh_token','oa_role','go_session','go_access_token','go_refresh_token','go_role'])r.cookies.set(name,'',{path:'/',maxAge:0});return r}
