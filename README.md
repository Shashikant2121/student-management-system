# Student Management System

A full-stack Student Management System built using the MERN stack (MongoDB, Express.js, React, and Node.js).

## Features

- Add new student records
- View all students
- Search students by name or email
- Edit existing student details
- Delete student records
- Dashboard with student statistics
- Form validation and error handling
- Responsive user interface

## Tech Stack

**Frontend**
- React
- Vite
- Axios
- CSS

**Backend**
- Node.js
- Express.js
- Mongoose

**Database**
- MongoDB Atlas

## Project Structure

```text
student-management-system/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── App.css
│   └── .env
├── server/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── server.js
├── .gitignore
└── README.md
```

## Requirements

- Node.js and npm
- MongoDB Atlas account or a MongoDB database
- Git (for version control)

## Installation

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd student-management-system
```

### 2. Setup the backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory:

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
```

Start the backend:

```bash
npm run dev
```

### 3. Setup the frontend

Open a second terminal:

```bash
cd client
npm install
```

Create a `.env` file inside the `client` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Open the local URL shown in your terminal, usually `http://localhost:5173`.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Check backend status |
| GET | `/api/students` | Get and search students |
| POST | `/api/students` | Add a student |
| PUT | `/api/students/:id` | Update a student |
| DELETE | `/api/students/:id` | Delete a student |

Search example:

```text
GET /api/students?search=Rahul
```

## Environment Variables

Never commit your `.env` files or database credentials to GitHub. Replace the example values with your own local configuration.

## Author

Student project developed for learning full-stack web development.
