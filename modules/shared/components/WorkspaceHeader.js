import ThemeToggle from '@/modules/shared/components/ThemeToggle';
export default function WorkspaceHeader({eyebrow,title,description,actions}){
 return <div className="workspace-heading row-between"><div><div className="eyebrow">{eyebrow}</div><h2>{title}</h2>{description&&<p className="muted">{description}</p>}</div><div className="workspace-actions"><ThemeToggle/>{actions}</div></div>;
}
