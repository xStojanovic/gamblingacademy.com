export default function Loading() {
  return (
    <section className="section">
      <div className="container">
        <div className="loading-shell" aria-label="Loading">
          <div className="loading-line loading-line-wide" />
          <div className="loading-line" />
          <div className="grid-3" style={{ marginTop: 28 }}>
            {[0, 1, 2].map((item) => <div className="card loading-card" key={item} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
