import React from 'react'
import { useParams, Link } from 'react-router-dom'

function LessonPage() {
  const { moduleId, lessonId } = useParams()

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1>Module {moduleId} - Lesson {lessonId}</h1>
      <p>This page will display the lesson content and validation.</p>
      <Link to={`/course/module-${moduleId}`}>← Back to Module</Link>
    </div>
  )
}

export default LessonPage
