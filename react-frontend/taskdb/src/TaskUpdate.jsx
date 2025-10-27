import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

function TaskUpdate() {
  const { taskId } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("pending")
  const [dueDate, setDueDate] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/tasks/${taskId}`)
        if (!res.ok) throw new Error("Failed to load task")
        const data = await res.json()
        setTitle(data.title)
        setDescription(data.description || "")
        setStatus(data.status)
        setDueDate(data.due_date ? data.due_date.split("T")[0] : "")
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchTask()
  }, [taskId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const updatedTask = { title, description, status, due_date: dueDate || null }

    try {
      const res = await fetch(`http://localhost:8000/api/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(updatedTask),
      })

      if (!res.ok) throw new Error("Failed to update task")
      navigate("/tasks")
    } catch (err) {
      setError(err.message)
      setSaving(false)
    }
  }

  if (loading) return <p className="text-center mt-5">Loading task...</p>
  if (error) return <div className="alert alert-danger text-center">{error}</div>

  return (
    <div className="container mt-4">
      <h2>Update Task</h2>
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

        <button type="submit" className="btn btn-primary w-100" disabled={saving}>
          {saving ? "Saving..." : "Update Task"}
        </button>

        <button
          type="button"
          className="btn btn-secondary w-100 mt-2"
          onClick={() => navigate("/tasks")}
        >
          Cancel
        </button>
      </form>
    </div>
  )
}

export default TaskUpdate
