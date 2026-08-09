import Link from 'next/link';

export default function CourseCard({ course }) {
  return (
    <article className="card course-card">
      <div className="course-topline"><span className="pill">{course.eyebrow}</span><span className="muted small">{course.level}</span></div>
      <h3>{course.title}</h3>
      <p className="muted">{course.description}</p>
      <div className="course-meta"><span>{course.duration}</span><span>{course.lessons} lessons</span><span>Certificate</span></div>
      <Link className="text-link" href={`/course/${course.slug}`}>View course <span>→</span></Link>
    </article>
  );
}
