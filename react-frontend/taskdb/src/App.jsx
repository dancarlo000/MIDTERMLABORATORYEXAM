import { Routes, Route, Link } from 'react-router-dom'
import TaskList from '/src/TaskList.jsx' 
import TaskForm from '/src/TaskForm.jsx' 
import TaskUpdate from '/src/TaskUpdate.jsx' 
import '/src/App.css' 

function App() {
 
  return (
    <div className="App">
      {/* 1. Navigation Bar */}
      <nav style={styles.nav}>
        <Link to="/" style={styles.navLink}>Home</Link>
        <Link to="/tasks" style={styles.navLink}>Tasks</Link>
      </nav>

      {/* 2. Page Content Area */}
      <main style={styles.content}>
        <Routes>
          <Route path="/" element={<h2>Welcome! Click 'Tasks' to start.</h2>} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/add-task" element={<TaskForm />} />
          <Route path="/update-task/:taskId" element={<TaskUpdate />} />
        </Routes>
      </main>
    </div>
  )
}

const styles = {
  nav: {
    display: 'flex',
    gap: '1rem',
    padding: '1rem',
    backgroundColor: '#f4f4f4',
    borderBottom: '1px solid #ddd',
  },
  navLink: {
    textDecoration: 'none',
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: '1.1rem',
  },
  content: {
    padding: '1rem 2rem',
  }
}

export default App;