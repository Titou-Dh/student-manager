import StudentItem from './StudentItem';

const StudentList = ({ students, onEdit, onDelete }) => {
  if (students.length === 0) {
    return (
      <div style={styles.empty}>
        <p>No students yet. Add your first student above!</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Students ({students.length})</h2>
      <table style={styles.table}>
        <thead>
          <tr style={styles.headerRow}>
            <th style={styles.headerCell}>Name</th>
            <th style={styles.headerCell}>Email</th>
            <th style={styles.headerCell}>Class</th>
            <th style={styles.headerCell}>Grade</th>
            <th style={styles.headerCell}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <StudentItem
              key={student._id}
              student={student}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1.5rem',
  },
  title: {
    marginBottom: '1rem',
    color: '#333',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  headerRow: {
    backgroundColor: '#3498db',
    color: 'white',
  },
  headerCell: {
    padding: '1rem',
    textAlign: 'left',
    fontWeight: '600',
  },
  empty: {
    textAlign: 'center',
    padding: '3rem',
    color: '#7f8c8d',
    fontSize: '1.1rem',
  },
};

export default StudentList;

