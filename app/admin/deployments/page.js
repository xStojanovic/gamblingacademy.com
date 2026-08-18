import AdminShell from '@/modules/admin/components/AdminShell';
import DeploymentCenter from '@/modules/infrastructure/components/DeploymentCenter';

export default function Page() {
  return (
    <AdminShell
      active="deployments"
      eyebrow="Owner Admin / Platform"
      title="Deployments & Releases"
      description="Verify the running release, Hostinger build settings, production dependencies and deployment readiness from one place."
    >
      <DeploymentCenter />
    </AdminShell>
  );
}
