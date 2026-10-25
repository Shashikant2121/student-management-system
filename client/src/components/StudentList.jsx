function StudentList({
  students = [],
  loading = false,
  search = "",
  onSearch = () => {},
  onDelete = () => {},
  onEdit = () => {},
}) {
  // Ensure students is always an array
  const studentList = Array.isArray(students) ? students : [];

  return (
    <section className="student-list">
      <div className="list-heading">
        <div>
          <h2>Student Records</h2>
          <p>{studentList.length} student(s) found</p>
        </div>

        <input
          type="search"
          value={search}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Search name or email..."
          aria-label="Search students"
        />
      </div>

      {loading ? (
        <p>Loading students...</p>
      ) : studentList.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Course</th>
                <th>Age</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {studentList.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                  <td>{student.course}</td>
                  <td>{student.age}</td>
                  <td>
                    <button
                      type="button"
                      className="edit-button"
                      onClick={() => onEdit(student)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => onDelete(student._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default StudentList;
