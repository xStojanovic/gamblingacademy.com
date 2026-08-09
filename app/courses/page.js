import CourseCard from '@/modules/public/components/CourseCard';
import { courses } from '@/modules/learning/data/catalog';

export const metadata = { title: 'Courses — OpsAcademy' };

export default function CoursesPage() {
  return <>
    <section className="page-hero"><div className="container"><div className="eyebrow">Courses</div><h1>Practical operations education, built for work.</h1><p className="lead">Start with industry fundamentals, then build role-specific knowledge across product, operations and project delivery.</p></div></section>
    <section className="section"><div className="container"><div className="grid-2">{courses.map(c => <CourseCard course={c} key={c.slug}/>)}</div></div></section>
  </>;
}
