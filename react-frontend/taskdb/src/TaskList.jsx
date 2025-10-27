import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

function TaskList() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchTasks = async () => {
    setLoading(true)
    try {
      const response = await fetch("http://localhost:8000/api/tasks")
      if (!response.ok) throw new Error("Failed to fetch tasks")
      const data = await response.json()
      setTasks(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleDelete = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return
    try {
      const response = await fetch(`http://localhost:8000/api/tasks/${taskId}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete task")
      setTasks(tasks.filter((task) => task.id !== taskId))
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2">Loading tasks...</p>
      </div>
    )

  if (error)
    return <div className="alert alert-danger text-center mt-4">Error: {error}</div>

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Task List</h2>
        <Link to="/add-task" className="btn btn-success">+ Add Task</Link>
      </div>

      {tasks.length === 0 ? (
        <div className="alert alert-info text-center">No tasks found.</div>
      ) : (
        <div className="list-group">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="list-group-item d-flex justify-content-between align-items-start"
            >
              <div>
                <h5>{task.title}</h5>
                <p className="mb-1">{task.description || "No description."}</p>
                <small className="text-muted">
                  Status: {task.status}{" "}
                  {task.due_date && <>| Due: {task.due_date}</>}
                </small>
              </div>
              <div>
                <Link
                  to={`/update-task/${task.id}`}
                  className="btn btn-primary btn-sm me-2"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TaskList
