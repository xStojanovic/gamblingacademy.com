import AdminShell from '@/modules/admin/components/AdminShell';import ApiKeyManager from '@/modules/admin/components/ApiKeyManager';
export default function Page(){return <AdminShell active="api" eyebrow="Owner Admin / Developer" title="API Keys" description="Control integration credentials and API scopes for enterprise customers and internal systems."><ApiKeyManager/></AdminShell>}
