import StudentItem from './StudentItem';

const StudentList = ({ students, onEdit, onDelete }) => {
  if (students.length === 0) {
    return (
      <div style={styles.empty}>
        <div style={styles.emptyIcon}>📚</div>
        <p style={styles.emptyText}>No students yet. Add your first student above!</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>
        <span style={styles.titleIcon}>👥</span>
        Students <span style={styles.count}>({students.length})</span>
      </h2>
      <div style={styles.tableWrapper}>
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
            {students.map((student, index) => (
              <StudentItem
                key={student._id}
                student={student}
                onEdit={onEdit}
                onDelete={onDelete}
                index={index}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1.5rem',
    animation: 'fadeIn 0.8s ease-out',
  },
  title: {
    marginBottom: '1.5rem',
    color: '#e0e0e0',
    fontSize: '2rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  titleIcon: {
    WebkitTextFillColor: '#667eea',
    filter: 'drop-shadow(0 0 8px rgba(102, 126, 234, 0.5))',
  },
  count: {
    fontSize: '1.2rem',
    fontWeight: '400',
    color: 'rgba(224, 224, 224, 0.6)',
    WebkitTextFillColor: 'rgba(224, 224, 224, 0.6)',
  },
  tableWrapper: {
    background: 'linear-gradient(135deg, rgba(30, 30, 50, 0.8) 0%, rgba(20, 20, 40, 0.8) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  headerRow: {
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%)',
    backdropFilter: 'blur(10px)',
  },
  headerCell: {
    padding: '1.25rem 1rem',
    textAlign: 'left',
    fontWeight: '600',
    color: '#e0e0e0',
    fontSize: '0.95rem',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    borderBottom: '2px solid rgba(102, 126, 234, 0.3)',
  },
  empty: {
    textAlign: 'center',
    padding: '5rem 2rem',
    background: 'linear-gradient(135deg, rgba(30, 30, 50, 0.6) 0%, rgba(20, 20, 40, 0.6) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    animation: 'fadeIn 0.8s ease-out',
  },
  emptyIcon: {
    fontSize: '4rem',
    marginBottom: '1rem',
    animation: 'float 3s ease-in-out infinite',
    filter: 'drop-shadow(0 0 20px rgba(102, 126, 234, 0.3))',
  },
  emptyText: {
    color: 'rgba(224, 224, 224, 0.7)',
    fontSize: '1.2rem',
    fontWeight: '300',
  },
};

export default StudentList;
