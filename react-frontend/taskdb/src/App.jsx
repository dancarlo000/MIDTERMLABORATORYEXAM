import { Routes, Route, Link } from 'react-router-dom'
import TaskList from '/src/TaskList.jsx'
import TaskForm from '/src/TaskForm.jsx'
import TaskUpdate from '/src/TaskUpdate.jsx'
import '/src/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 shadow-sm">
        <Link className="navbar-brand fw-bold" to="/">Task Management Application</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/tasks" className="nav-link">Tasks</Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Routes */}
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<h2>Welcome to Task Manager! Click Tasks to view task.</h2>} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/add-task" element={<TaskForm />} />
          <Route path="/update-task/:taskId" element={<TaskUpdate />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
