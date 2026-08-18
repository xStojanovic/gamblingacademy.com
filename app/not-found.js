import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 760 }}>
        <div className="card error-state-card">
          <div className="eyebrow">404 / Not found</div>
          <h1>This page does not exist.</h1>
          <p className="lead">The link may have changed, or the content may no longer be available.</p>
          <div className="hero-actions">
            <Link className="button" href="/">Go to homepage</Link>
            <Link className="button button-secondary" href="/courses">Browse courses</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
