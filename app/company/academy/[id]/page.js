import CompanyModuleBuilder from '@/modules/company/components/CompanyModuleBuilder';
export default async function Page({params}){const {id}=await params;return <CompanyModuleBuilder id={id}/>}
