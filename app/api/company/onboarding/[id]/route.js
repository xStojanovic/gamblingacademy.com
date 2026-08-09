import {NextResponse} from 'next/server';
import {env} from '@/modules/infrastructure/config/env';
import {requireServerRole} from '@/modules/auth/services/serverAuth';
import {getCompanyContext} from '@/modules/company/services/companyServer';
import {dbSelect,dbUpdate} from '@/modules/infrastructure/services/supabaseRest';

export async function PATCH(req,{params}){
  const auth=await requireServerRole(['company_admin','academy_admin']);
  if(!auth.ok)return NextResponse.json({error:auth.error},{status:auth.status});
  const {id}=await params;const body=await req.json();
  if(env.demoMode)return NextResponse.json({ok:true,demo:true});
  const context=await getCompanyContext(auth.session);
  if(!context)return NextResponse.json({error:'Company membership not found'},{status:404});
  const enrollment=await dbSelect('onboarding_enrollments',`id=eq.${encodeURIComponent(id)}&select=id,program_id&limit=1`);
  const row=enrollment.data?.[0];if(!row)return NextResponse.json({error:'Onboarding enrollment not found'},{status:404});
  const program=await dbSelect('onboarding_programs',`id=eq.${row.program_id}&company_id=eq.${context.companyId}&select=id&limit=1`);
  if(!program.data?.length)return NextResponse.json({error:'Onboarding enrollment does not belong to this company'},{status:403});
  const progress=Math.max(0,Math.min(100,Number(body.progress||0)));
  const result=await dbUpdate('onboarding_enrollments',`id=eq.${encodeURIComponent(id)}`,{progress_percent:progress,state:body.state||{},completed_at:body.completed?new Date().toISOString():null});
  return NextResponse.json({ok:result.ok||result.demo,demo:Boolean(result.demo)});
}
