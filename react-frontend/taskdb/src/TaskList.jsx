import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // For the "Update" button

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch tasks
  const fetchTasks = async () => {
    setLoading(true);
    try {
      // Make sure this URL is correct!
      const response = await fetch("http://localhost:8082/api/tasks");
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch tasks when component mounts
  useEffect(() => {
    fetchTasks();
  }, []); // Empty array means this runs once on mount

  // --- Delete Task Handler ---
  const handleDelete = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        const response = await fetch(`http://localhost:8082/api/tasks/${taskId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete task");
        }

        // If delete is successful, filter it out of the list
        setTasks(tasks.filter(task => task.id !== taskId));

      } catch (err) {
        setError(err.message);
      }
    }
  };

  // --- Render Logic ---
  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p style={styles.error}>Error fetching tasks: {error}</p>;

  return (
    <div style={styles.container}>
      <h2>Task List</h2>
      <ul style={styles.list}>
        {tasks.length === 0 && <p>No tasks found.</p>}
        {tasks.map((task) => (
          <li key={task.id} style={styles.listItem}>
            <div>
              <strong>{task.title}</strong> (Status: {task.status})
              <p>{task.description || "No description."}</p>
              {task.due_date && <small>Due: {task.due_date}</small>}
            </div>
            <div style={styles.buttonGroup}>
              {/* UPDATE Button */}
              <Link to={`/update-task/${task.id}`} style={styles.updateButton}>
                Update
              </Link>
              {/* DELETE Button */}
              <button
                onClick={() => handleDelete(task.id)}
                style={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// --- Styles ---
const styles = {
  container: {
    margin: "0 auto",
    maxWidth: "700px",
  },
  error: {
    color: 'red',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    padding: '1rem',
    border: '1px solid #eee',
    borderRadius: '8px',
    marginBottom: '1rem',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonGroup: {
    display: 'flex',
    gap: '0.5rem',
  },
  updateButton: {
    padding: '0.4rem 0.8rem',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '0.9rem',
  },
  deleteButton: {
    padding: '0.4rem 0.8rem',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  }
};

export default TaskList;