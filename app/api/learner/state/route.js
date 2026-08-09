import {NextResponse} from 'next/server';
import {env} from '@/modules/infrastructure/config/env';
import {requireServerRole} from '@/modules/auth/services/serverAuth';
import {dbSelect} from '@/modules/infrastructure/services/supabaseRest';

export async function GET(){
  const auth=await requireServerRole(['learner','company_admin','academy_admin']);
  if(!auth.ok)return NextResponse.json({error:auth.error},{status:auth.status});
  if(env.demoMode || !auth.session?.user?.id)return NextResponse.json({ok:true,demo:true});
  const userId=auth.session.user.id;
  const [profile,progress,goals,notifications,transcript,certs]=await Promise.all([
    dbSelect('profiles',`id=eq.${userId}&select=id,full_name,email,locale,timezone,preferences`),
    dbSelect('course_progress',`user_id=eq.${userId}&select=course_id,progress_percent,completed_lessons,courses(slug)`),
    dbSelect('learner_goals',`user_id=eq.${userId}&select=*&order=created_at.desc`),
    dbSelect('learner_notifications',`user_id=eq.${userId}&select=*&order=created_at.desc&limit=50`),
    dbSelect('transcript_events',`user_id=eq.${userId}&select=*&order=completed_at.desc&limit=100`),
    dbSelect('certificates',`user_id=eq.${userId}&select=credential_id,program_name,score,issued_at,revoked_at&order=issued_at.desc`)
  ]);
  const progressMap={};const lessonMap={};
  for(const row of progress.data||[]){const slug=row.courses?.slug;if(slug){progressMap[slug]=row.progress_percent||0;lessonMap[slug]=row.completed_lessons||0;}}
  return NextResponse.json({ok:true,demo:false,data:{
    profile:profile.data?.[0]||null,
    progress:progressMap,
    completedLessons:lessonMap,
    goals:(goals.data||[]).map(g=>({id:g.id,title:g.title,target:g.target_date,progress:g.progress,status:g.status})),
    notifications:(notifications.data||[]).map(n=>({id:n.id,type:n.notification_type,title:n.title,body:n.body,read:Boolean(n.read_at),date:n.created_at})),
    transcript:(transcript.data||[]).map(t=>({id:t.id,type:t.item_type,title:t.title,result:t.result,hours:Number(t.learning_hours||0),date:t.completed_at})),
    certificates:(certs.data||[]).filter(c=>!c.revoked_at).map(c=>({id:c.credential_id,program:c.program_name,score:c.score==null?'—':`${c.score}%`,issued:c.issued_at}))
  }});
}
