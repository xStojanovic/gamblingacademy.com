'use client';
import Link from 'next/link';import {useState} from 'react';import {adminNavigation} from '@/modules/shared/config/routes';
export default function AdminNav({active='overview'}){const [open,setOpen]=useState(false);return <>
 <button className="workspace-mobile-toggle" onClick={()=>setOpen(!open)}>Admin Menu {open?'↑':'↓'}</button>
 <aside className={`dashboard-nav admin-nav ${open?'mobile-open':''}`}>
  <div className="admin-brand"><span className="admin-mark">OA</span><div><b>OpsAcademy</b><small>Owner Admin</small></div></div>
  {adminNavigation.map(g=><div className="admin-nav-group" key={g.label}><span className="admin-nav-label">{g.label}</span>{g.items.map(item=><Link key={item.key} href={item.href} className={active===item.key?'active':''} onClick={()=>setOpen(false)}>{item.label}</Link>)}</div>)}
  <div className="nav-divider"/><Link href="/dashboard">Learner demo →</Link><Link href="/company">Company admin →</Link><Link href="/">Public website →</Link>
 </aside></>}
