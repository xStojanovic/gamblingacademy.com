import {NextResponse} from 'next/server';
import {env} from '@/modules/infrastructure/config/env';
import {requireServerRole} from '@/modules/auth/services/serverAuth';
import {dbSelect,dbInsert,dbUpdate} from '@/modules/infrastructure/services/supabaseRest';
export async function POST(request){
  const auth=await requireServerRole(['learner','company_admin','academy_admin']);if(!auth.ok)return NextResponse.json({error:auth.error},{status:auth.status});
  const {slug,progressPercent=0,completedLessons=0}=await request.json();if(!slug)return NextResponse.json({error:'Course slug required'},{status:400});
  if(env.demoMode)return NextResponse.json({ok:true,demo:true});
  const userId=auth.session.user.id;const course=await dbSelect('courses',`slug=eq.${encodeURIComponent(slug)}&select=id&limit=1`);const courseId=course.data?.[0]?.id;
  if(!courseId)return NextResponse.json({error:'Course not found'},{status:404});
  const existing=await dbSelect('course_progress',`user_id=eq.${userId}&course_id=eq.${courseId}&select=user_id&limit=1`);
  const payload={progress_percent:Math.max(0,Math.min(100,Number(progressPercent)||0)),completed_lessons:Math.max(0,Number(completedLessons)||0),updated_at:new Date().toISOString()};
  const result=existing.data?.length?await dbUpdate('course_progress',`user_id=eq.${userId}&course_id=eq.${courseId}`,payload):await dbInsert('course_progress',{user_id:userId,course_id:courseId,...payload});
  return NextResponse.json({ok:result.ok,error:result.error||null},{status:result.ok?200:500});
}
