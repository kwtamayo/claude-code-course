import React from 'react'
import { useParams, Link } from 'react-router-dom'

function ModulePage() {
  const { moduleId } = useParams()

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1>Module {moduleId}</h1>
      <p>This page will show all lessons in this module.</p>
      <Link to="/course">← Back to Course</Link>
    </div>
  )
}

export default ModulePage
