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
      <h2 style={styles.title}>{student ? 'Edit Student' : 'Add New Student'}</h2>
      
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
    maxWidth: '500px',
    margin: '0 auto 2rem',
    padding: '1.5rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  title: {
    marginTop: 0,
    marginBottom: '1.5rem',
    color: '#333',
  },
  formGroup: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '500',
    color: '#555',
  },
  required: {
    color: '#e74c3c',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    boxSizing: 'border-box',
  },
  buttonGroup: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: '1.5rem',
  },
  submitButton: {
    flex: 1,
    padding: '0.75rem',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    fontWeight: '500',
  },
  cancelButton: {
    flex: 1,
    padding: '0.75rem',
    backgroundColor: '#95a5a6',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    fontWeight: '500',
  },
};

export default StudentForm;

