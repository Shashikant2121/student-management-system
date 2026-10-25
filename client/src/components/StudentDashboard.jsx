function StudentDashboard({ students = [] }) {
  const safeStudents = Array.isArray(students) ? students : [];

  const totalStudents = safeStudents.length;

  const courseCount = safeStudents.reduce((courses, student) => {
    const course = student.course?.trim() || "Not specified";
    courses[course] = (courses[course] || 0) + 1;
    return courses;
  }, {});

  const totalCourses = Object.keys(courseCount).length;

  const averageAge =
    totalStudents > 0
      ? (
          safeStudents.reduce(
            (total, student) => total + Number(student.age || 0),
            0,
          ) / totalStudents
        ).toFixed(1)
      : "0";

  const stats = [
    {
      title: "Total Students",
      value: totalStudents,
      icon: "👨‍🎓",
    },
    {
      title: "Total Courses",
      value: totalCourses,
      icon: "📚",
    },
    {
      title: "Average Age",
      value: averageAge,
      icon: "🎂",
    },
  ];

  return (
    <section className="dashboard">
      <h2>Dashboard Overview</h2>

      <div className="dashboard-grid">
        {stats.map((stat) => (
          <article className="stat-card" key={stat.title}>
            <span className="stat-icon">{stat.icon}</span>
            <div>
              <p>{stat.title}</p>
              <h3>{stat.value}</h3>
            </div>
          </article>
        ))}
      </div>

      <div className="course-summary">
        <h3>Students by Course</h3>

        {totalStudents === 0 ? (
          <p>No student data available yet.</p>
        ) : (
          <ul>
            {Object.entries(courseCount).map(([course, count]) => (
              <li key={course}>
                <span>{course}</span>
                <strong>{count}</strong>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default StudentDashboard;
