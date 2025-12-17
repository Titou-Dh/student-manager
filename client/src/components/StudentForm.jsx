import { useState, useEffect } from 'react';

const StudentForm = ({ student, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    class: '',
    grade: '',
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || '',
        email: student.email || '',
        class: student.class || '',
        grade: student.grade || '',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        class: '',
        grade: '',
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      grade: formData.grade ? Number(formData.grade) : undefined,
    };
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.title}>
        {student ? (
          <>
            <span style={styles.icon}>✏️</span> Edit Student
          </>
        ) : (
          <>
            <span style={styles.icon}>➕</span> Add New Student
          </>
        )}
      </h2>
      
      <div style={styles.formGroup}>
        <label style={styles.label}>
          Name <span style={styles.required}>*</span>
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
          placeholder="Enter student name"
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>
          Email <span style={styles.required}>*</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
          placeholder="student@example.com"
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Class</label>
        <input
          type="text"
          name="class"
          value={formData.class}
          onChange={handleChange}
          style={styles.input}
          placeholder="Enter class name"
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Grade</label>
        <input
          type="number"
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          min="0"
          max="100"
          style={styles.input}
          placeholder="0-100"
        />
      </div>

      <div style={styles.buttonGroup}>
        <button type="submit" style={styles.submitButton}>
          {student ? 'Update Student' : 'Add Student'}
        </button>
        {student && (
          <button type="button" onClick={onCancel} style={styles.cancelButton}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

const styles = {
  form: {
    maxWidth: '600px',
    margin: '0 auto 3rem',
    padding: '2.5rem',
    background: 'linear-gradient(135deg, rgba(30, 30, 50, 0.8) 0%, rgba(20, 20, 40, 0.8) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    animation: 'fadeIn 0.6s ease-out',
    position: 'relative',
    overflow: 'hidden',
  },
  formGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.75rem',
    fontWeight: '500',
    color: '#e0e0e0',
    fontSize: '0.95rem',
    letterSpacing: '0.3px',
  },
  required: {
    color: '#ff6b6b',
    fontWeight: '600',
  },
  input: {
    width: '100%',
    padding: '1rem',
    background: 'rgba(15, 20, 35, 0.6)',
    border: '1px solid rgba(102, 126, 234, 0.3)',
    borderRadius: '12px',
    fontSize: '1rem',
    color: '#e0e0e0',
    boxSizing: 'border-box',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  title: {
    marginTop: 0,
    marginBottom: '2rem',
    color: '#e0e0e0',
    fontSize: '1.8rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  icon: {
    fontSize: '1.5rem',
    WebkitTextFillColor: '#667eea',
    filter: 'drop-shadow(0 0 8px rgba(102, 126, 234, 0.5))',
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    marginTop: '2rem',
  },
  submitButton: {
    flex: 1,
    padding: '1rem 2rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
    position: 'relative',
    overflow: 'hidden',
  },
  cancelButton: {
    flex: 1,
    padding: '1rem 2rem',
    background: 'rgba(148, 163, 184, 0.2)',
    color: '#cbd5e1',
    border: '1px solid rgba(148, 163, 184, 0.3)',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    backdropFilter: 'blur(10px)',
  },
};

// Add input focus styles dynamically
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    input:focus {
      border-color: #667eea !important;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2), 0 0 20px rgba(102, 126, 234, 0.3) !important;
      background: rgba(15, 20, 35, 0.8) !important;
    }
    input::placeholder {
      color: rgba(224, 224, 224, 0.4);
    }
    button:hover {
      transform: translateY(-2px) !important;
    }
    button:active {
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(styleSheet);
}

export default StudentForm;
