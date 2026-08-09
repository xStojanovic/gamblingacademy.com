import DashboardNav from '@/modules/learner/components/DashboardNav';
import PathCard from '@/modules/public/components/PathCard';
import {learningPaths} from '@/modules/learning/data/catalog';
export default function DashboardPathsPage(){return <section className="section"><div className="container"><div className="dashboard-shell"><DashboardNav active="paths"/><div className="dashboard-content"><div className="eyebrow">Role development</div><h2>Learning Paths</h2><p className="muted">Structured course sequences mapped to common operations roles and onboarding needs.</p><div className="grid-2" style={{marginTop:28}}>{learningPaths.map(p=><PathCard key={p.slug} path={p}/>)}</div></div></div></div></section>}
