export default function MetricCard({ value, label, note }) {
  return <div className="metric-card"><div className="metric-value">{value}</div><div>{label}</div>{note && <div className="muted small">{note}</div>}</div>
}
