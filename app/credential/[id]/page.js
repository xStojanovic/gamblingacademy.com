import PublicCredential from '@/modules/credentials/components/PublicCredential';
export async function generateMetadata({params}){const {id}=await params;return {title:`Credential ${id}`}}
export default async function Page({params}){const {id}=await params;return <section className="section"><div className="container narrow-wide"><PublicCredential id={id}/></div></section>}
