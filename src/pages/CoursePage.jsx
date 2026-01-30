import React from 'react'
import { Link } from 'react-router-dom'

function CoursePage() {
  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1>Course Overview</h1>
      <p>This page will show all modules and overall progress.</p>
      <Link to="/">← Back to Home</Link>
    </div>
  )
}

export default CoursePage
