import {notFound} from 'next/navigation';
import AssessmentClient from '@/modules/learner/components/AssessmentClient';
import {assessmentQuestions,getCourse} from '@/modules/learning/data/catalog';
export default async function AssessmentPage({params}){const {slug}=await params; const course=getCourse(slug); if(!course) notFound(); const questions=assessmentQuestions[slug]||assessmentQuestions['operations-foundations']; return <section className="section"><div className="container narrow-wide"><AssessmentClient course={course} questions={questions}/></div></section>}
