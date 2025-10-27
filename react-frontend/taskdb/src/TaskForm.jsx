import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [dueDate, setDueDate] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const taskData = { 
      title, 
      description, 
      status, 
      due_date: dueDate || null // Send null if date is empty
    };

    try {
      const response = await fetch("http://localhost:8000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to create task");
      }

      // If successful, navigate back to the task list
      navigate("/tasks");

    } catch (error) {
      setMessage(`Error: ${error.message}`);
      setSaving(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Add New Task</h2>
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
          type="text"
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
          {saving ? "Saving..." : "Save Task"}
        </button>
      </form>
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
  error: {
    color: 'red',
  }
};

export default TaskForm;