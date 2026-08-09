import {NextResponse} from 'next/server';
import {getServerSession} from '@/modules/auth/services/serverAuth';
export async function GET(){
  const session=await getServerSession();
  if(!session.authenticated)return NextResponse.json({authenticated:false,demo:Boolean(session.demo)});
  return NextResponse.json({authenticated:true,email:session.email||session.user?.email||session.profile?.email||null,role:session.role||'learner',demo:Boolean(session.demo)});
}
