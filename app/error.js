'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ErrorPage({ error, reset }) {
  useEffect(() => {
    console.error('OpsAcademy route error:', error);
  }, [error]);

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 760 }}>
        <div className="card error-state-card">
          <div className="eyebrow">Something went wrong</div>
          <h1>This section could not be loaded.</h1>
          <p className="lead">
            Your account and learning data have not been changed. Retry the section or return to the workspace.
          </p>
          <div className="hero-actions">
            <button className="button" type="button" onClick={() => reset()}>Try again</button>
            <Link className="button button-secondary" href="/">Return home</Link>
          </div>
          {error?.digest ? <p className="muted small" style={{ marginTop: 20 }}>Reference: {String(error.digest)}</p> : null}
        </div>
      </div>
    </section>
  );
}
