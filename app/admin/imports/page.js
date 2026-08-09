import AdminShell from '@/modules/admin/components/AdminShell';import DataImportManager from '@/modules/admin/components/DataImportManager';
export default function Page(){return <AdminShell active="imports" eyebrow="Owner Admin / Enterprise" title="Data Imports" description="Validate and stage structured imports for customers, learners and learning content."><DataImportManager/></AdminShell>}
