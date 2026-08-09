import {cookies} from 'next/headers';import {env} from '@/modules/infrastructure/config/env';

async function resolveProductionUser(token){
  if(!env.supabaseUrl||!env.supabaseAnonKey)return null;
  const authRes=await fetch(`${env.supabaseUrl}/auth/v1/user`,{headers:{apikey:env.supabaseAnonKey,Authorization:`Bearer ${token}`},cache:'no-store'});
  if(!authRes.ok)return null;
  const user=await authRes.json();
  const profileRes=await fetch(`${env.supabaseUrl}/rest/v1/profiles?id=eq.${user.id}&select=role,full_name,email`,{headers:{apikey:env.supabaseAnonKey,Authorization:`Bearer ${token}`},cache:'no-store'});
  const profiles=profileRes.ok?await profileRes.json():[];
  return {user,profile:profiles?.[0]||null,role:profiles?.[0]?.role||'learner'};
}

export async function getServerSession(){
  const jar=await cookies();const demo=jar.get('oa_session')?.value;
  if(env.demoMode){if(demo){try{return {authenticated:true,...JSON.parse(demo)}}catch(e){}}return {authenticated:true,email:'demo@opsacademy.example',role:'academy_admin',demo:true};}
  const token=jar.get('oa_access_token')?.value;if(!token)return {authenticated:false};
  const resolved=await resolveProductionUser(token);if(!resolved)return {authenticated:false};
  return {authenticated:true,...resolved,token};
}

export async function requireServerRole(roles=[]){
  const session=await getServerSession();
  if(env.demoMode)return {ok:true,session};
  if(!session.authenticated)return {ok:false,status:401,error:'Authentication required'};
  if(roles.length&&!roles.includes(session.role))return {ok:false,status:403,error:'Insufficient permissions'};
  return {ok:true,session};
}
