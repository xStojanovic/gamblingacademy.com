import {redirect} from 'next/navigation';export default async function Page({params}){const {slug}=await params;redirect(`/admin/courses/${slug}`)}
