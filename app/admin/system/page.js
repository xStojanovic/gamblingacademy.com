import AdminShell from '@/modules/admin/components/AdminShell';import SystemHealth from '@/modules/admin/components/SystemHealth';
export default function Page(){return <AdminShell active="health" eyebrow="Owner Admin / Platform" title="System Health" description="Operational view of service adapters, production dependencies and environment readiness."><SystemHealth/></AdminShell>}
