'use client';
import {useRef,useState} from 'react';
import {useAdmin} from '@/modules/admin/components/AdminStore';

function readableSize(bytes=0){if(!bytes)return '—';if(bytes<1024*1024)return `${Math.max(1,Math.round(bytes/1024))} KB`;return `${(bytes/1024/1024).toFixed(1)} MB`;}
function assetType(type=''){if(type.startsWith('video/'))return 'Video';if(type==='application/pdf')return 'PDF';if(type.startsWith('image/'))return 'Image';return 'File';}

export default function MediaLibraryManager(){
  const {data,addItem,removeItem,log}=useAdmin();
  const input=useRef(null);const [uploading,setUploading]=useState(false);const [message,setMessage]=useState('');
  async function upload(file){
    if(!file)return;setUploading(true);setMessage('');
    try{
      const body=new FormData();body.append('file',file);
      const res=await fetch('/api/admin/media/upload',{method:'POST',body});const result=await res.json();
      if(!res.ok)throw new Error(result.error||'Upload failed');
      addItem('media',{name:file.name,type:assetType(file.type),size:readableSize(file.size),usage:0,status:result.demo?'Demo asset':'Ready',updated:'Now',path:result.asset?.path||''});
      log('Uploaded media asset',file.name);setMessage(result.demo?'Stored in demo library. Configure Supabase Storage for persistent uploads.':'Asset uploaded successfully.');
    }catch(error){setMessage(error.message)}finally{setUploading(false);if(input.current)input.current.value='';}
  }
  return <>
    <div className="dashboard-panel"><div className="row-between"><div><h3>Media library</h3><p className="muted small">Upload and manage course images, diagrams, PDFs and video source assets. Production uploads use protected server-side storage credentials.</p></div><div className="row"><input ref={input} type="file" onChange={e=>upload(e.target.files?.[0])} disabled={uploading}/><button className="button button-small" onClick={()=>input.current?.click()} disabled={uploading}>{uploading?'Uploading…':'Upload asset'}</button></div></div>{message&&<p className="muted small" style={{marginTop:12}}>{message}</p>}</div>
    <div className="media-grid">{data.media.map(m=><div className="dashboard-panel media-card" key={m.id}><div className="media-preview">{m.type==='Video'?'▶':m.type==='PDF'?'PDF':m.type==='Image'?'IMG':'FILE'}</div><b>{m.name}</b><span className="muted small">{m.type} · {m.size}</span><div className="row-between"><span className={`status ${m.status==='Ready'?'success':''}`}>{m.status}</span><button className="ghost-button danger" onClick={()=>removeItem('media',m.id)}>Delete</button></div></div>)}</div>
  </>;
}
