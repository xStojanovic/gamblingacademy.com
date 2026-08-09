import AdminShell from '@/modules/admin/components/AdminShell';import BackupManager from '@/modules/admin/components/BackupManager';
export default function Page(){return <AdminShell active="backups" eyebrow="Owner Admin / Platform" title="Backups & Export" description="Portable exports now, with provider-managed backups and restore tests in production."><BackupManager/></AdminShell>}
