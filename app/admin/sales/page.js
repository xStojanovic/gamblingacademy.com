import AdminShell from '@/modules/admin/components/AdminShell';import SalesPipeline from '@/modules/sales/components/SalesPipeline';
export default function Page(){return <AdminShell active="sales" eyebrow="Owner Admin / Commercial" title="Sales Pipeline" description="Track B2B opportunities from qualification through pilot, proposal and customer-success handoff."><SalesPipeline/></AdminShell>}
