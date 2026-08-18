import Link from 'next/link';
import { renderText } from '@/modules/shared/utils/renderText';

function normalizePathCourse(course, index) {
  if (typeof course === 'string') {
    return {
      key: `${course}-${index}`,
      title: course,
      slug: null,
    };
  }

  if (course && typeof course === 'object') {
    return {
      key: renderText(course.slug || course.id || `${renderText(course.title, 'course')}-${index}`),
      title: renderText(course.title || course.name || course.slug, `Course ${index + 1}`),
      slug: renderText(course.slug) || null,
    };
  }

  return {
    key: `course-${index}`,
    title: `Course ${index + 1}`,
    slug: null,
  };
}

export default function PathCard({ path }) {
  if (!path || typeof path !== 'object') return null;

  const pathCourses = Array.isArray(path.courses)
    ? path.courses.map(normalizePathCourse)
    : [];

  return (
    <article className="card path-card">
      <div className="course-topline">
        <span className="pill">Learning Path</span>
        {path.badge ? <span className="badge">{renderText(path.badge)}</span> : null}
      </div>

      <h3>{renderText(path.title, 'Learning Path')}</h3>
      <p className="muted">{renderText(path.description)}</p>

      <div className="path-list">
        {pathCourses.map((course, index) => (
          <div key={course.key}>
            <span className="step">{index + 1}</span>
            {course.slug ? (
              <Link href={`/course/${course.slug}`}>{course.title}</Link>
            ) : (
              <span>{course.title}</span>
            )}
          </div>
        ))}
      </div>

      <div className="course-meta">
        <span>{renderText(path.duration)}</span>
        <span>Verified certificate</span>
      </div>
    </article>
  );
}
