import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import hooks

function TaskUpdate() {
  const { taskId } = useParams(); // Get ID from route params
  const navigate = useNavigate(); // Hook for navigation

  // State for form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [dueDate, setDueDate] = useState("");

  // State for loading, errors, and saving
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // 1. Fetch the existing task data when the component loads
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:8082/api/tasks/${taskId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch task");
        }
        const data = await response.json();
        
        // Populate the form with the data
        setTitle(data.title);
        setDescription(data.description || "");
        setStatus(data.status);
        // Format date for <input type="date"> which expects YYYY-MM-DD
        setDueDate(data.due_date ? data.due_date.split('T')[0] : ""); 

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [taskId]); // Re-run if taskId changes

  // 2. Handle the form submission (PUT request)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const taskData = { 
      title, 
      description, 
      status, 
      due_date: dueDate || null // Handle empty date
    };

    try {
      const response = await fetch(`http://localhost:8082/api/tasks/${taskId}`, {
        method: "PUT", // Use PUT for update
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to update task");
      }

      // If successful, navigate back to the task list
      navigate("/tasks");

    } catch (error) {
      setMessage(`Error: ${error.message}`);
      setSaving(false);
    }
  };

  // --- Render Logic ---
  if (loading) return <p>Loading task data...</p>;
  if (error) return <p style={styles.error}>{error}</p>;

  return (
    <div style={styles.container}>
      <h2>Update Task (ID: {taskId})</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text" // <-- This is where your code cut off
          placeholder="Status (e.g., pending)"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button type="submit" disabled={saving} style={styles.saveButton}>
          {saving ? "Saving..." : "Update Task"}
        </button>
      </form>
      <button 
        style={styles.backButton} 
        onClick={() => navigate("/tasks")}
      >
        Cancel
      </button>
      {message && <p style={styles.error}>{message}</p>}
    </div>
  );
}

// --- Styles ---
const styles = {
  container: {
    margin: "2rem auto",
    padding: "1.5rem",
    border: "1px solid #ddd",
    borderRadius: "10px",
    maxWidth: "400px",
    backgroundColor: "#fdfdfd",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  saveButton: {
    padding: '0.75rem',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  backButton: {
    marginTop: '0.5rem',
    backgroundColor: 'transparent',
    border: '1px solid #aaa',
    padding: '0.75rem',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
    fontSize: '1rem',
  },
  error: {
    color: 'red',
  }
};

export default TaskUpdate;