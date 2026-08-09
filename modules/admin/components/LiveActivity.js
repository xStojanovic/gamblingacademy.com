'use client';
import {useAdmin} from '@/modules/admin/components/AdminStore';
export default function LiveActivity(){const {data}=useAdmin();return <div className="dashboard-panel"><div className="activity-feed">{data.activity.map(a=><div className="activity-item" key={a.id}><span className={`activity-type ${a.type.toLowerCase()}`}>{a.type.slice(0,2).toUpperCase()}</span><div><b>{a.event}</b><p className="muted small">{a.detail}</p></div><small>{a.time}</small></div>)}</div></div>}
