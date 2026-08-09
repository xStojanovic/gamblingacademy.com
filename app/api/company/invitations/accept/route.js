import {NextResponse} from 'next/server';import crypto from 'crypto';import {env} from '@/modules/infrastructure/config/env';import {dbSelect,dbInsert,dbUpdate} from '@/modules/infrastructure/services/supabaseRest';
export async function POST(request){
  const {token,password,fullName}=await request.json();if(!token||!password)return NextResponse.json({error:'Invitation token and password are required'},{status:400});
  if(env.demoMode)return NextResponse.json({ok:true,demo:true});
  const hash=crypto.createHash('sha256').update(token).digest('hex');const invites=await dbSelect('company_invitations',`token=eq.${hash}&accepted_at=is.null&select=*&limit=1`);const invite=invites.data?.[0];
  if(!invite)return NextResponse.json({error:'Invitation is invalid or already used'},{status:404});if(new Date(invite.expires_at)<new Date())return NextResponse.json({error:'Invitation has expired'},{status:410});
  if(!env.supabaseServiceRoleKey)return NextResponse.json({error:'Supabase service role is not configured'},{status:503});
  const created=await fetch(`${env.supabaseUrl}/auth/v1/admin/users`,{method:'POST',headers:{apikey:env.supabaseServiceRoleKey,Authorization:`Bearer ${env.supabaseServiceRoleKey}`,'Content-Type':'application/json'},body:JSON.stringify({email:invite.email,password,email_confirm:true,user_metadata:{full_name:fullName||''}})});const user=await created.json();
  if(!created.ok)return NextResponse.json({error:user.msg||user.message||'Could not create account'},{status:400});
  await dbInsert('profiles',{id:user.id,full_name:fullName||invite.email,email:invite.email,role:'learner'});
  await dbInsert('company_users',{company_id:invite.company_id,user_id:user.id,team_id:invite.team_id||null,company_role:invite.company_role||'member'});
  await dbUpdate('company_invitations',`id=eq.${invite.id}`,{accepted_at:new Date().toISOString()});
  return NextResponse.json({ok:true});
}
