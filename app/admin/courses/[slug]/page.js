import AdminCourseBuilder from '@/modules/admin/components/AdminCourseBuilder';export default async function Page({params}){const {slug}=await params;return <AdminCourseBuilder slug={slug}/>}
