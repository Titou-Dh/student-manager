import { useState, useEffect } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import { getStudents, createStudent, updateStudent, deleteStudent } from './services/api';

function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getStudents();
      setStudents(response.data);
    } catch (err) {
      setError('Failed to fetch students. Please try again.');
      console.error('Error fetching students:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (studentData) => {
    try {
      setError(null);
      if (editingStudent) {
        const response = await updateStudent(editingStudent._id, studentData);
        setStudents(students.map(s => s._id === editingStudent._id ? response.data : s));
        setEditingStudent(null);
      } else {
        const response = await createStudent(studentData);
        setStudents([response.data, ...students]);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to save student. Please try again.';
      setError(errorMessage);
      console.error('Error saving student:', err);
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditingStudent(null);
    setError(null);
  };

  const handleDelete = async (id) => {
    try {
      setError(null);
      await deleteStudent(id);
      setStudents(students.filter(s => s._id !== id));
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to delete student. Please try again.';
      setError(errorMessage);
      console.error('Error deleting student:', err);
    }
  };

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Student Manager</h1>
        <p style={styles.headerSubtitle}>Simple CRUD application for managing students</p>
      </header>

      <main style={styles.main}>
        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        <StudentForm
          student={editingStudent}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />

        {loading ? (
          <div style={styles.loading}>Loading students...</div>
        ) : (
          <StudentList
            students={students}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </main>
    </div>
  );
}

const styles = {
  app: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '2rem',
    textAlign: 'center',
    marginBottom: '2rem',
  },
  headerTitle: {
    margin: 0,
    fontSize: '2.5rem',
    fontWeight: '600',
  },
  headerSubtitle: {
    margin: '0.5rem 0 0',
    fontSize: '1.1rem',
    opacity: 0.9,
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem 2rem',
  },
  error: {
    backgroundColor: '#fee',
    color: '#c33',
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '1rem',
    border: '1px solid #fcc',
  },
  loading: {
    textAlign: 'center',
    padding: '3rem',
    fontSize: '1.1rem',
    color: '#7f8c8d',
  },
};

export default App;

