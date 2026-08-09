import {NextResponse} from 'next/server';
import {env} from '@/modules/infrastructure/config/env';
import {requireServerRole} from '@/modules/auth/services/serverAuth';
import {dbInsert} from '@/modules/infrastructure/services/supabaseRest';

export const runtime='nodejs';

function safeName(name='asset'){
  return name.toLowerCase().replace(/[^a-z0-9._-]+/g,'-').replace(/^-+|-+$/g,'')||'asset';
}

export async function POST(request){
  const auth=await requireServerRole(['academy_admin']);
  if(!auth.ok)return NextResponse.json({error:'Unauthorized'},{status:401});
  const form=await request.formData();
  const file=form.get('file');
  if(!file || typeof file==='string')return NextResponse.json({error:'File is required'},{status:400});
  const type=file.type||'application/octet-stream';
  const allowed=['image/','video/','application/pdf','text/csv','application/vnd.openxmlformats-officedocument'];
  if(!allowed.some(prefix=>type.startsWith(prefix)))return NextResponse.json({error:'Unsupported file type'},{status:415});
  const max=100*1024*1024;
  if(file.size>max)return NextResponse.json({error:'File exceeds 100 MB upload limit'},{status:413});

  const path=`${new Date().toISOString().slice(0,10)}/${crypto.randomUUID()}-${safeName(file.name)}`;
  if(env.demoMode || !env.supabaseUrl || !env.supabaseServiceRoleKey){
    return NextResponse.json({ok:true,demo:true,asset:{name:file.name,type,size:file.size,path,status:'Demo asset'}});
  }

  const bytes=Buffer.from(await file.arrayBuffer());
  const upload=await fetch(`${env.supabaseUrl}/storage/v1/object/${env.supabaseMediaBucket}/${path}`,{
    method:'POST',
    headers:{
      apikey:env.supabaseServiceRoleKey,
      Authorization:`Bearer ${env.supabaseServiceRoleKey}`,
      'Content-Type':type,
      'x-upsert':'false'
    },
    body:bytes
  });
  if(!upload.ok){
    const error=await upload.text();
    return NextResponse.json({error:`Storage upload failed: ${error}`},{status:502});
  }
  const record=await dbInsert('media_assets',{name:file.name,media_type:type.startsWith('video/')?'video':type.startsWith('image/')?'image':type==='application/pdf'?'pdf':'file',storage_path:path,mime_type:type,byte_size:file.size,status:'ready',created_by:auth.session?.user?.id||null});
  return NextResponse.json({ok:true,demo:false,asset:{id:record.data?.[0]?.id,name:file.name,type,size:file.size,path,status:'Ready'}});
}
