import Link from 'next/link';

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
      key: course.slug || course.id || `${course.title || 'course'}-${index}`,
      title: course.title || course.name || course.slug || `Course ${index + 1}`,
      slug: course.slug || null,
    };
  }

  return {
    key: `course-${index}`,
    title: `Course ${index + 1}`,
    slug: null,
  };
}

export default function PathCard({ path }) {
  const pathCourses = Array.isArray(path?.courses)
    ? path.courses.map(normalizePathCourse)
    : [];

  return (
    <article className="card path-card">
      <div className="course-topline">
        <span className="pill">Learning Path</span>
        {path?.badge ? <span className="badge">{String(path.badge)}</span> : null}
      </div>

      <h3>{String(path?.title || 'Learning Path')}</h3>
      <p className="muted">{String(path?.description || '')}</p>

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
        <span>{String(path?.duration || '')}</span>
        <span>Verified certificate</span>
      </div>
    </article>
  );
}
