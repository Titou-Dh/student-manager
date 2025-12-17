# Student Manager

A simple single-page MERN (MongoDB, Express, React, Node.js) application for managing students with full CRUD operations. Built as a monorepo with Vite for the frontend.

## Features

- ✅ Add a student
- ✅ View all students
- ✅ Update a student
- ✅ Delete a student

## Tech Stack

- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Frontend**: React, Vite, Axios
- **Database**: MongoDB
- **Monorepo**: npm workspaces

## Project Structure

```
student-manager/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── StudentForm.jsx
│   │   │   ├── StudentList.jsx
│   │   │   └── StudentItem.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── server/                 # Express backend
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── studentController.js
│   ├── models/
│   │   └── Student.js
│   ├── routes/
│   │   └── studentRoutes.js
│   ├── server.js
│   └── package.json
├── package.json            # Root workspace config
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB running (local or connection string)
- npm (v7+ for workspaces support)

### Quick Start (Monorepo)

1. **Install all dependencies:**
   ```bash
   npm install
   ```
   This will install dependencies for the root, server, and client workspaces.

2. **Create environment file:**
   Create a `.env` file in the `server` directory:
   ```
   MONGODB_URI=mongodb://localhost:27017/student-manager
   PORT=5000
   ```

3. **Run both server and client:**
   ```bash
   npm run dev
   ```
   This starts both the backend (port 5000) and frontend (port 3000) concurrently.

### Individual Workspace Commands

**Backend only:**
```bash
npm run dev --workspace=server
# or
cd server && npm run dev
```

**Frontend only:**
```bash
npm run dev --workspace=client
# or
cd client && npm run dev
```

**Production build:**
```bash
# Build frontend
npm run build --workspace=client

# Start backend
npm start --workspace=server
```

## API Endpoints

- `GET /api/students` - Fetch all students
- `POST /api/students` - Create a new student
- `PUT /api/students/:id` - Update a student
- `DELETE /api/students/:id` - Delete a student

## Data Model

**Student**
- `name`: String (required)
- `email`: String (required, unique)
- `class`: String
- `grade`: Number
- `createdAt`: Date (auto-generated)
- `updatedAt`: Date (auto-generated)

## Development

The project uses npm workspaces for monorepo management:
- Root `package.json` defines workspaces
- `concurrently` runs both server and client in development
- Vite provides fast HMR for the frontend
- Express server runs with nodemon for auto-reload

## Notes

- Frontend runs on `http://localhost:3000`
- Backend runs on `http://localhost:5000`
- Vite proxy is configured to forward `/api` requests to the backend
- No authentication or authorization (as per requirements)
- Simple, clean CRUD interface
