import AdminAssessmentBuilder from '@/modules/admin/components/AdminAssessmentBuilder';export default async function Page({params}){const {id}=await params;return <AdminAssessmentBuilder id={id}/>}
