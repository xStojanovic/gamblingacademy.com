import Link from 'next/link';
import PathCard from '@/modules/public/components/PathCard';
import {learningPaths} from '@/modules/learning/data/catalog';
export const metadata={title:'Learning Paths — OpsAcademy'};
export default function PathsPage(){return <><section className="page-hero"><div className="container"><div className="eyebrow">Role-Based Learning</div><h1>Learn for the role you have — or the role you want.</h1><p className="lead">Structured paths combine the courses, concepts and assessments most relevant to a function or onboarding goal.</p></div></section><section className="section"><div className="container"><div className="grid-2">{learningPaths.map(p=><div key={p.slug}><PathCard path={p}/><Link className="text-link path-detail-link" href={`/learning-paths/${p.slug}`}>View full path →</Link></div>)}</div></div></section></>}
