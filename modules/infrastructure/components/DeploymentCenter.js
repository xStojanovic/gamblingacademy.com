'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { release, deploymentDefaults } from '@/modules/infrastructure/config/release';

const expected = [
  ['Framework preset', deploymentDefaults.frameworkPreset],
  ['Branch', deploymentDefaults.branch],
  ['Node version', deploymentDefaults.nodeVersion],
  ['Root directory', deploymentDefaults.rootDirectory],
  ['Build command', deploymentDefaults.buildCommand],
  ['Package manager', deploymentDefaults.packageManager],
  ['Output directory', deploymentDefaults.outputDirectory]
];

export default function DeploymentCenter() {
  const [status, setStatus] = useState({ loading: true, data: null, error: '' });
  const [history, setHistory] = useState([]);

  async function refresh() {
    setStatus((current) => ({ ...current, loading: true, error: '' }));
    try {
      const response = await fetch('/api/build-info', { cache: 'no-store' });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || 'Build diagnostics unavailable');
      setStatus({ loading: false, data, error: '' });
      fetch('/api/admin/deployments', { cache: 'no-store' }).then((r) => r.ok ? r.json() : null).then((j) => setHistory(j?.releases || [])).catch(() => {});
    } catch (error) {
      setStatus({ loading: false, data: null, error: error.message });
    }
  }

  useEffect(() => { refresh(); }, []);

  const runtime = status.data?.runtime;
  const services = status.data?.services || {};
  const liveVersion = status.data?.release?.version || release.version;
  const liveNext = status.data?.release?.next || release.next;
  const releaseMatches = liveVersion === release.version && liveNext === release.next;

  return (
    <>
      <div className="grid-4">
        <div className="metric-card"><div className="muted small">Release</div><div className="metric-value">{liveVersion}</div><div>{release.channel}</div></div>
        <div className="metric-card"><div className="muted small">Next.js</div><div className="metric-value">{liveNext}</div><div>{releaseMatches ? 'Expected build' : 'Check deployment source'}</div></div>
        <div className="metric-card"><div className="muted small">Runtime</div><div className="metric-value">{runtime?.node ? runtime.node.replace('v', '') : '22.x'}</div><div>Node.js</div></div>
        <div className="metric-card"><div className="muted small">Mode</div><div className="metric-value">{runtime?.demoMode === false ? 'Live' : 'Demo'}</div><div>{runtime?.environment || 'production build'}</div></div>
      </div>

      <div className="grid-2" style={{ marginTop: 24 }}>
        <div className="dashboard-panel">
          <div className="row-between"><div><div className="eyebrow">Hostinger</div><h3>Required deployment settings</h3></div><span className={`status ${releaseMatches ? 'success' : 'warning'}`}>{releaseMatches ? 'Release aligned' : 'Verify build'}</span></div>
          {expected.map(([label, value]) => <div className="admin-pipeline-row" key={label}><span>{label}</span><b>{value}</b></div>)}
          <div className="hero-actions"><button className="button button-small" type="button" onClick={refresh} disabled={status.loading}>{status.loading ? 'Checking…' : 'Refresh diagnostics'}</button><Link className="button button-secondary button-small" href="/build-info">Public build info</Link></div>
          {status.error ? <div className="feedback" style={{ marginTop: 14 }}>{status.error}</div> : null}
        </div>

        <div className="dashboard-panel">
          <div className="eyebrow">Service activation</div>
          <h3>Build-safe with zero environment variables.</h3>
          <p className="muted small">The application compiles in demo mode without external credentials. Production services activate independently when their environment variables are added.</p>
          {Object.entries(services).map(([name, ready]) => <div className="admin-pipeline-row" key={name}><span>{name}</span><span className={`status ${ready ? 'success' : ''}`}>{ready ? 'Configured' : 'Demo fallback'}</span></div>)}
        </div>
      </div>

      {history.length ? (
        <div className="dashboard-panel" style={{ marginTop: 24 }}>
          <div className="row-between"><div><div className="eyebrow">Release history</div><h3>Recent platform builds</h3></div><span className="pill">{history.length} records</span></div>
          <div className="table-wrap"><table className="table"><thead><tr><th>Version</th><th>Channel</th><th>Next.js</th><th>Branch</th><th>Status</th></tr></thead><tbody>{history.slice(0, 8).map((item, index) => <tr key={`${item.version || 'release'}-${index}`}><td><b>{String(item.version || '—')}</b></td><td>{String(item.channel || '—')}</td><td>{String(item.next_version || '—')}</td><td>{String(item.branch || 'main')}</td><td><span className={`status ${item.status === 'ready' || item.status === 'deployed' ? 'success' : ''}`}>{String(item.status || 'unknown')}</span></td></tr>)}</tbody></table></div>
        </div>
      ) : null}

      <div className="dashboard-panel" style={{ marginTop: 24 }}>
        <div className="row-between"><div><div className="eyebrow">V7 deployment safeguards</div><h3>What happens automatically on <code>npm run build</code></h3></div><span className="pill">No custom Hostinger command</span></div>
        <div className="grid-3" style={{ marginTop: 18 }}>
          <div className="card feature-card"><div className="feature-number">01 — VERSION</div><h4>Dependency fingerprint</h4><p className="muted small">The prebuild checks both package.json and the actually installed Next/React packages. A stale Hostinger cache fails with a clear message.</p></div>
          <div className="card feature-card"><div className="feature-number">02 — RENDER</div><h4>React object safety</h4><p className="muted small">A JSX scanner blocks the map-parameter rendering pattern that caused the previous prerender failure, and catalogue fields are validated before Next starts.</p></div>
          <div className="card feature-card"><div className="feature-number">03 — OUTPUT</div><h4>Post-build verification</h4><p className="muted small">After Next succeeds, V7 confirms BUILD_ID, server output and static assets exist inside <code>.next</code>.</p></div>
        </div>
      </div>
    </>
  );
}
