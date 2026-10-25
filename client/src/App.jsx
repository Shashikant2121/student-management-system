import { useEffect, useState } from "react";
import StudentDashboard from "./components/StudentDashboard.jsx";
import StudentForm from "./components/StudentForm.jsx";
import StudentList from "./components/StudentList.jsx";

import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "./services/studentApi.js";

import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editingStudent, setEditingStudent] = useState(null);

  const fetchStudents = async (searchTerm = "") => {
    setLoading(true);
    setError("");

    try {
      const result = await getStudents(searchTerm);

      // Expected API response: { success: true, data: [...] }
      console.log("Students API response:", result);

      const studentData = Array.isArray(result?.data)
        ? result.data
        : Array.isArray(result)
          ? result
          : [];

      setStudents(studentData);
    } catch (err) {
      console.error("Fetch students error:", err);

      setStudents([]);
      setError(
        err.response?.data?.message ||
          "Unable to load students. Check the backend server.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchStudents(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const handleAddStudent = async (studentData) => {
    setError("");
    setMessage("");

    try {
      const result = await addStudent(studentData);

      setMessage(result.message || "Student added successfully.");
      await fetchStudents(search);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to add student. Please try again.",
      );

      throw err;
    }
  };

  const handleDeleteStudent = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?",
    );

    if (!confirmed) return;

    setError("");
    setMessage("");

    try {
      const result = await deleteStudent(id);

      setMessage(result.message || "Student deleted successfully.");
      await fetchStudents(search);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to delete student. Please try again.",
      );
    }
  };
  const handleUpdateStudent = async (id, studentData) => {
    setError("");
    setMessage("");

    const result = await updateStudent(id, studentData);

    setMessage(result.message || "Student updated successfully.");
    setEditingStudent(null);

    await fetchStudents(search);
  };

  return (
    <main className="app-container">
      <header className="app-header">
        <p className="eyebrow">MERN STACK PROJECT</p>
        <h1>Student Management System</h1>
        <p>Manage student records in one place.</p>
      </header>
      <StudentDashboard students={students} />
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error">{error}</p>}

      <StudentForm
        onAddStudent={handleAddStudent}
        editingStudent={editingStudent}
        onUpdateStudent={handleUpdateStudent}
        onCancelEdit={() => setEditingStudent(null)}
      />

      <StudentList
        students={students}
        loading={loading}
        search={search}
        onSearch={setSearch}
        onDelete={handleDeleteStudent}
        onEdit={(student) => setEditingStudent(student)}
      />
    </main>
  );
}

export default App;
