import AdminShell from '@/modules/admin/components/AdminShell';import WebhookManager from '@/modules/admin/components/WebhookManager';
export default function Page(){return <AdminShell active="webhooks" eyebrow="Owner Admin / Developer" title="Webhooks" description="Configure outbound platform events such as course completion and certificate issuance."><WebhookManager/></AdminShell>}
