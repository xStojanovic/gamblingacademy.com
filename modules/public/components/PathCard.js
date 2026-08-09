export default function PathCard({ path }) {
  return (
    <article className="card path-card">
      <div className="course-topline">
        <span className="pill">Learning Path</span>
        {path.badge && <span className="badge">{path.badge}</span>}
      </div>
      <h3>{path.title}</h3>
      <p className="muted">{path.description}</p>
      <div className="path-list">
        {path.courses.map((c, i) => <div key={c}><span className="step">{i+1}</span>{c}</div>)}
      </div>
      <div className="course-meta"><span>{path.duration}</span><span>Verified certificate</span></div>
    </article>
  );
}
