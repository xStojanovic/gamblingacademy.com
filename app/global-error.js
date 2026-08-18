'use client';

export default function GlobalError({ error, reset }) {
  return (
    <html lang="en">
      <body>
        <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, fontFamily: 'Arial, sans-serif' }}>
          <div style={{ maxWidth: 640 }}>
            <p style={{ textTransform: 'uppercase', letterSpacing: '.12em', fontSize: 12 }}>OpsAcademy</p>
            <h1>We could not load the application.</h1>
            <p>Please retry. If the problem continues, use the deployment diagnostics in Owner Admin after the application is restored.</p>
            <button onClick={() => reset()} style={{ padding: '12px 18px', cursor: 'pointer' }}>Try again</button>
            {error?.digest ? <p style={{ opacity: .65, fontSize: 12 }}>Reference: {String(error.digest)}</p> : null}
          </div>
        </main>
      </body>
    </html>
  );
}
