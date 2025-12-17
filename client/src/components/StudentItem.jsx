const StudentItem = ({ student, onEdit, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${student.name}?`)) {
      onDelete(student._id);
    }
  };

  return (
    <tr style={styles.row}>
      <td style={styles.cell}>{student.name}</td>
      <td style={styles.cell}>{student.email}</td>
      <td style={styles.cell}>{student.class || '-'}</td>
      <td style={styles.cell}>{student.grade !== undefined ? student.grade : '-'}</td>
      <td style={styles.cell}>
        <div style={styles.actions}>
          <button onClick={() => onEdit(student)} style={styles.editButton}>
            Edit
          </button>
          <button onClick={handleDelete} style={styles.deleteButton}>
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

const styles = {
  row: {
    borderBottom: '1px solid #eee',
  },
  cell: {
    padding: '0.75rem',
    textAlign: 'left',
  },
  actions: {
    display: 'flex',
    gap: '0.5rem',
  },
  editButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  deleteButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
};

export default StudentItem;

