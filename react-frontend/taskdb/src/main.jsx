import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// Use absolute paths from the project root, which is common in
// Vite setups when main.jsx is loaded from index.html in the root.
import App from '/src/App.jsx' 
import '/src/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
