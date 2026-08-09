import {NextResponse} from 'next/server';
import {env} from '@/modules/infrastructure/config/env';

export async function POST(request){
  const {email,password,role='learner'}=await request.json();
  if(env.demoMode || !env.supabaseUrl || !env.supabaseAnonKey){
    const response=NextResponse.json({ok:true,role,demo:true});
    response.cookies.set('oa_session',JSON.stringify({email:email||'demo@opsacademy.example',role,demo:true}),{httpOnly:true,sameSite:'lax',path:'/',maxAge:60*60*24*7});
    return response;
  }

  const auth=await fetch(`${env.supabaseUrl}/auth/v1/token?grant_type=password`,{
    method:'POST',
    headers:{'apikey':env.supabaseAnonKey,'Content-Type':'application/json'},
    body:JSON.stringify({email,password})
  });
  const data=await auth.json();
  if(!auth.ok)return NextResponse.json({error:data.error_description||data.msg||'Invalid credentials'},{status:401});

  // Production roles are always resolved from the database. The client cannot self-select a privileged role.
  const profileRes=await fetch(`${env.supabaseUrl}/rest/v1/profiles?id=eq.${data.user.id}&select=role`,{
    headers:{
      apikey:env.supabaseServiceRoleKey||env.supabaseAnonKey,
      Authorization:`Bearer ${env.supabaseServiceRoleKey||data.access_token}`
    },
    cache:'no-store'
  });
  const profiles=profileRes.ok?await profileRes.json():[];
  const resolvedRole=profiles?.[0]?.role||'learner';
  const response=NextResponse.json({ok:true,role:resolvedRole,demo:false});
  response.cookies.set('oa_access_token',data.access_token,{httpOnly:true,secure:true,sameSite:'lax',path:'/',maxAge:data.expires_in||3600});
  response.cookies.set('oa_refresh_token',data.refresh_token,{httpOnly:true,secure:true,sameSite:'lax',path:'/',maxAge:60*60*24*30});
  return response;
}
