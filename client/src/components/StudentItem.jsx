const StudentItem = ({ student, onEdit, onDelete, index }) => {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${student.name}?`)) {
      onDelete(student._id);
    }
  };

  return (
    <tr 
      style={{
        ...styles.row,
        animationDelay: `${index * 0.1}s`,
      }}
      className="student-row"
    >
      <td style={styles.cell}>
        <span style={styles.name}>{student.name}</span>
      </td>
      <td style={styles.cell}>
        <span style={styles.email}>{student.email}</span>
      </td>
      <td style={styles.cell}>
        <span style={styles.class}>{student.class || '-'}</span>
      </td>
      <td style={styles.cell}>
        {student.grade !== undefined ? (
          <span style={{
            ...styles.grade,
            ...(student.grade >= 80 ? styles.gradeHigh : 
                student.grade >= 60 ? styles.gradeMedium : 
                styles.gradeLow)
          }}>
            {student.grade}
          </span>
        ) : (
          <span style={styles.noGrade}>-</span>
        )}
      </td>
      <td style={styles.cell}>
        <div style={styles.actions}>
          <button 
            onClick={() => onEdit(student)} 
            style={styles.editButton}
            title="Edit student"
          >
            <span style={styles.buttonIcon}>✏️</span>
            Edit
          </button>
          <button 
            onClick={handleDelete} 
            style={styles.deleteButton}
            title="Delete student"
          >
            <span style={styles.buttonIcon}>🗑️</span>
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

const styles = {
  row: {
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    animation: 'fadeIn 0.5s ease-out both',
  },
  cell: {
    padding: '1.25rem 1rem',
    textAlign: 'left',
    color: '#e0e0e0',
  },
  name: {
    fontWeight: '600',
    color: '#e0e0e0',
    fontSize: '1rem',
  },
  email: {
    color: 'rgba(224, 224, 224, 0.8)',
    fontSize: '0.95rem',
  },
  class: {
    color: 'rgba(224, 224, 224, 0.7)',
    fontSize: '0.95rem',
  },
  grade: {
    display: 'inline-block',
    padding: '0.25rem 0.75rem',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '0.9rem',
  },
  gradeHigh: {
    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(22, 163, 74, 0.2) 100%)',
    color: '#4ade80',
    border: '1px solid rgba(34, 197, 94, 0.3)',
  },
  gradeMedium: {
    background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(245, 158, 11, 0.2) 100%)',
    color: '#fbbf24',
    border: '1px solid rgba(251, 191, 36, 0.3)',
  },
  gradeLow: {
    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.2) 100%)',
    color: '#f87171',
    border: '1px solid rgba(239, 68, 68, 0.3)',
  },
  noGrade: {
    color: 'rgba(224, 224, 224, 0.4)',
  },
  actions: {
    display: 'flex',
    gap: '0.75rem',
  },
  editButton: {
    padding: '0.6rem 1.2rem',
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%)',
    color: '#c7d2fe',
    border: '1px solid rgba(102, 126, 234, 0.4)',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    backdropFilter: 'blur(10px)',
  },
  deleteButton: {
    padding: '0.6rem 1.2rem',
    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.3) 0%, rgba(220, 38, 38, 0.3) 100%)',
    color: '#fca5a5',
    border: '1px solid rgba(239, 68, 68, 0.4)',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    backdropFilter: 'blur(10px)',
  },
  buttonIcon: {
    fontSize: '1rem',
  },
};

// Add hover effects for table rows
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    .student-row {
      cursor: default;
    }
    .student-row:hover {
      background: linear-gradient(90deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%) !important;
      transform: translateX(5px);
    }
    .student-row:hover td {
      color: #fff !important;
    }
    button:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3) !important;
    }
    button:active {
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(styleSheet);
}

export default StudentItem;
