import Link from 'next/link';
import { release, deploymentDefaults } from '@/modules/infrastructure/config/release';

export const metadata = {
  title: 'Build Information',
  robots: { index: false, follow: false }
};

const settings = [
  ['Framework', deploymentDefaults.frameworkPreset],
  ['Branch', deploymentDefaults.branch],
  ['Node version', deploymentDefaults.nodeVersion],
  ['Root directory', deploymentDefaults.rootDirectory],
  ['Build command', deploymentDefaults.buildCommand],
  ['Package manager', deploymentDefaults.packageManager],
  ['Output directory', deploymentDefaults.outputDirectory]
];

export default function BuildInfoPage() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 980 }}>
        <div className="section-head">
          <div className="eyebrow">Deployment diagnostics</div>
          <h1>OpsAcademy {release.version}</h1>
          <p className="lead">This page identifies the release that is actually running. It is useful after a Hostinger redeploy to confirm the new code—not a cached build—is live.</p>
        </div>
        <div className="grid-3">
          <div className="metric-card"><div className="muted small">Release</div><div className="metric-value">V7</div><div>{release.channel}</div></div>
          <div className="metric-card"><div className="muted small">Next.js</div><div className="metric-value">{release.next}</div><div>Security-patched 15.5 line</div></div>
          <div className="metric-card"><div className="muted small">Node</div><div className="metric-value">22</div><div>Hostinger target runtime</div></div>
        </div>
        <div className="dashboard-panel" style={{ marginTop: 24 }}>
          <div className="row-between"><div><div className="eyebrow">Expected Hostinger configuration</div><h2>Use the standard Next.js preset.</h2></div><span className="status success">V7 compatible</span></div>
          {settings.map(([label, value]) => <div className="admin-pipeline-row" key={label}><span>{label}</span><b>{value}</b></div>)}
        </div>
        <div className="dashboard-panel" style={{ marginTop: 24 }}>
          <h3>After deployment</h3>
          <p className="muted">Open <code>/api/build-info</code>. It should report <strong>version {release.version}</strong>, <strong>Next {release.next}</strong> and <strong>Node v22.x</strong>. If Hostinger reports another Next version in its build log, it is compiling stale dependencies or a different source revision.</p>
          <div className="hero-actions"><Link className="button" href="/api/build-info">Open build API →</Link><Link className="button button-secondary" href="/">Return home</Link></div>
        </div>
      </div>
    </section>
  );
}
