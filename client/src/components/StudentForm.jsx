import { useEffect, useState } from "react";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  course: "",
  age: "",
};

function StudentForm({
  onAddStudent,
  editingStudent,
  onUpdateStudent,
  onCancelEdit,
}) {
  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        name: editingStudent.name || "",
        email: editingStudent.email || "",
        phone: editingStudent.phone || "",
        course: editingStudent.course || "",
        age: String(editingStudent.age ?? ""),
      });
      setError("");
    } else {
      setFormData(initialForm);
    }
  }, [editingStudent]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.course.trim() ||
      !formData.age
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (Number(formData.age) < 1) {
      setError("Age must be greater than zero.");
      return;
    }

    const studentData = {
      ...formData,
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      course: formData.course.trim(),
      age: Number(formData.age),
    };

    setSubmitting(true);

    try {
      if (editingStudent) {
        await onUpdateStudent(editingStudent._id, studentData);
      } else {
        await onAddStudent(studentData);
      }

      setFormData(initialForm);
    } catch (err) {
  console.error("Save student error:", err);

  setError(
    err.response?.data?.message ||
      err.message ||
      "Unable to save student. Please try again.",
  );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="student-form">
      <h2>{editingStudent ? "Edit Student" : "Add New Student"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full name"
            required
          />

          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email address"
            required
          />

          <input
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone number"
            required
          />

          <input
            name="course"
            value={formData.course}
            onChange={handleChange}
            placeholder="Course (e.g. BCA)"
            required
          />

          <input
            name="age"
            type="number"
            min="1"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            required
          />
        </div>

        {error && <p className="error">{error}</p>}

        <div className="form-actions">
          <button type="submit" disabled={submitting}>
            {submitting
              ? "Saving..."
              : editingStudent
                ? "Update Student"
                : "Add Student"}
          </button>

          {editingStudent && (
            <button type="button" onClick={onCancelEdit} disabled={submitting}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default StudentForm;
