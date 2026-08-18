import Link from 'next/link';
import { renderText } from '@/modules/shared/utils/renderText';

export default function CourseCard({ course }) {
  if (!course || typeof course !== 'object') return null;

  const slug = renderText(course.slug);
  const title = renderText(course.title, 'Course');
  const eyebrow = renderText(course.eyebrow, 'Course');
  const level = renderText(course.level);
  const description = renderText(course.description);
  const duration = renderText(course.duration);
  const lessons = Number.isFinite(Number(course.lessons)) ? Number(course.lessons) : 0;

  return (
    <article className="card course-card">
      <div className="course-topline">
        <span className="pill">{eyebrow}</span>
        <span className="muted small">{level}</span>
      </div>
      <h3>{title}</h3>
      <p className="muted">{description}</p>
      <div className="course-meta">
        <span>{duration}</span>
        <span>{lessons} lessons</span>
        <span>Certificate</span>
      </div>
      {slug ? (
        <Link className="text-link" href={`/course/${slug}`}>
          View course <span>→</span>
        </Link>
      ) : null}
    </article>
  );
}
