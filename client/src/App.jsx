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
      {/* Decorative Ellipses */}
      <div style={styles.ellipse1}></div>
      <div style={styles.ellipse2}></div>
      <div style={styles.ellipse3}></div>
      <div style={styles.ellipse4}></div>

      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.headerTitle}>Student Manager</h1>
          <p style={styles.headerSubtitle}>Simple CRUD application for managing students</p>
        </div>
      </header>

      <main style={styles.main}>
        {error && (
          <div style={styles.error} className="fade-in">
            <span style={styles.errorIcon}>⚠️</span>
            {error}
          </div>
        )}

        <StudentForm
          student={editingStudent}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />

        {loading ? (
          <div style={styles.loading}>
            <div style={styles.loader}></div>
            <p>Loading students...</p>
          </div>
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
    background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1422 100%)',
    position: 'relative',
    overflow: 'hidden',
  },
  // Decorative Ellipses
  ellipse1: {
    position: 'fixed',
    width: '600px',
    height: '600px',
    background: 'radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)',
    borderRadius: '50%',
    top: '-200px',
    left: '-200px',
    animation: 'float 20s ease-in-out infinite',
    zIndex: 0,
  },
  ellipse2: {
    position: 'fixed',
    width: '500px',
    height: '500px',
    background: 'radial-gradient(circle, rgba(118, 75, 162, 0.15) 0%, transparent 70%)',
    borderRadius: '50%',
    top: '50%',
    right: '-150px',
    animation: 'float 15s ease-in-out infinite reverse',
    zIndex: 0,
  },
  ellipse3: {
    position: 'fixed',
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)',
    borderRadius: '50%',
    bottom: '-100px',
    left: '20%',
    animation: 'float 18s ease-in-out infinite',
    zIndex: 0,
  },
  ellipse4: {
    position: 'fixed',
    width: '350px',
    height: '350px',
    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
    borderRadius: '50%',
    top: '20%',
    left: '50%',
    animation: 'float 22s ease-in-out infinite reverse',
    zIndex: 0,
  },
  header: {
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '3rem 2rem',
    textAlign: 'center',
    marginBottom: '3rem',
    position: 'relative',
    zIndex: 1,
    animation: 'fadeIn 0.8s ease-out',
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  headerTitle: {
    margin: 0,
    fontSize: '3rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #ec4899 100%)',
    backgroundSize: '200% 200%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    animation: 'gradient 5s ease infinite',
    textShadow: '0 0 30px rgba(102, 126, 234, 0.3)',
    letterSpacing: '-0.02em',
  },
  headerSubtitle: {
    margin: '1rem 0 0',
    fontSize: '1.2rem',
    color: 'rgba(224, 224, 224, 0.8)',
    fontWeight: '300',
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem 4rem',
    position: 'relative',
    zIndex: 1,
  },
  error: {
    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.2) 100%)',
    backdropFilter: 'blur(10px)',
    color: '#ff6b6b',
    padding: '1rem 1.5rem',
    borderRadius: '12px',
    marginBottom: '2rem',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    animation: 'slideIn 0.5s ease-out',
    boxShadow: '0 4px 20px rgba(239, 68, 68, 0.2)',
  },
  errorIcon: {
    fontSize: '1.5rem',
  },
  loading: {
    textAlign: 'center',
    padding: '4rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.5rem',
  },
  loader: {
    width: '50px',
    height: '50px',
    border: '4px solid rgba(102, 126, 234, 0.2)',
    borderTop: '4px solid #667eea',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
};

// Add spin animation
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .fade-in {
    animation: fadeIn 0.5s ease-out;
  }
`;
document.head.appendChild(styleSheet);

export default App;
