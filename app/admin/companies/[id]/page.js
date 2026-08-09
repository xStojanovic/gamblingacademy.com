import AdminCompanyDetail from '@/modules/admin/components/AdminCompanyDetail';export default async function Page({params}){const {id}=await params;return <AdminCompanyDetail id={id}/>}
