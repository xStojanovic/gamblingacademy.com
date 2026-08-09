import {NextResponse} from 'next/server';import crypto from 'crypto';import {env} from '@/modules/infrastructure/config/env';import {requireServerRole} from '@/modules/auth/services/serverAuth';import {getCompanyContext} from '@/modules/company/services/companyServer';import {dbInsert,dbSelect} from '@/modules/infrastructure/services/supabaseRest';
export async function POST(request){
  const auth=await requireServerRole(['company_admin','academy_admin']);if(!auth.ok)return NextResponse.json({error:auth.error},{status:auth.status});
  const {email,name='',team='New Employees',companyRole='member'}=await request.json();if(!email)return NextResponse.json({error:'Email required'},{status:400});
  if(env.demoMode)return NextResponse.json({ok:true,demo:true,inviteLink:`${env.appUrl}/invite/demo-token`});
  const c=await getCompanyContext(auth.session);if(!c)return NextResponse.json({error:'Company not found'},{status:404});
  let teamId=null;if(team){const t=await dbSelect('teams',`company_id=eq.${c.companyId}&name=eq.${encodeURIComponent(team)}&select=id&limit=1`);teamId=t.data?.[0]?.id||null;}
  const raw=crypto.randomBytes(32).toString('hex');const tokenHash=crypto.createHash('sha256').update(raw).digest('hex');const expires=new Date(Date.now()+7*24*60*60*1000).toISOString();
  const inserted=await dbInsert('company_invitations',{company_id:c.companyId,email:email.toLowerCase(),company_role:companyRole,team_id:teamId,token:tokenHash,expires_at:expires});if(!inserted.ok)return NextResponse.json({error:inserted.error||'Could not create invitation'},{status:500});
  const inviteLink=`${env.appUrl}/invite/${raw}`;
  let delivered=false;
  if(env.resendApiKey){const mail=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${env.resendApiKey}`,'Content-Type':'application/json'},body:JSON.stringify({from:process.env.EMAIL_FROM||'OpsAcademy <academy@example.com>',to:[email],subject:`You have been invited to ${c.company.name}`,html:`<p>Hello ${name||''},</p><p>You have been invited to join <strong>${c.company.name}</strong> on OpsAcademy.</p><p><a href="${inviteLink}">Accept invitation</a></p><p>This link expires in 7 days.</p>`})});delivered=mail.ok;}
  return NextResponse.json({ok:true,demo:false,delivered,inviteLink:delivered?null:inviteLink,expiresAt:expires});
}
