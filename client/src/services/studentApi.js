import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Get all students or search by name/email
export const getStudents = async (search = "") => {
  const response = await API.get("/students", {
    params: search ? { search } : {},
  });

  return response.data;
};

// Add a new student
export const addStudent = async (studentData) => {
  const response = await API.post("/students", studentData);
  return response.data;
};

// Update an existing student
export const updateStudent = async (id, studentData) => {
  const response = await API.put(`/students/${id}`, studentData);
  return response.data;
};

// Delete a student
export const deleteStudent = async (id) => {
  const response = await API.delete(`/students/${id}`);
  return response.data;
};
