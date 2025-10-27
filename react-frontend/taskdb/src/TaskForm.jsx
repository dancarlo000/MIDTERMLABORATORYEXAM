import { useState } from "react"
import { useNavigate } from "react-router-dom"

function TaskForm() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("pending")
  const [dueDate, setDueDate] = useState("")
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage("")

    const taskData = { title, description, status, due_date: dueDate || null }

    try {
      const response = await fetch("http://localhost:8000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(taskData),
      })

      if (!response.ok) throw new Error("Failed to create task")
      navigate("/tasks")
    } catch (error) {
      setMessage(error.message)
      setSaving(false)
    }
  }

  return (
    <div className="container mt-4">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light shadow-sm">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Due Date</label>
          <input
            type="date"
            className="form-control"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-success w-100" disabled={saving}>
          {saving ? "Saving..." : "Save Task"}
        </button>

        {message && <div className="alert alert-danger mt-3">{message}</div>}
      </form>
    </div>
  )
}

export default TaskForm
