import React, { useState, useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ROUTES } from '../routes'
import { getModule, getLesson, loadLessonContent } from '../utils/courseLoader'
import ValidationTask from '../components/ValidationTask'
import '../styles/LessonPage.css'

function LessonPage() {
  const { moduleId, lessonId } = useParams()
  const [lessonData, setLessonData] = useState(null)
  const [loading, setLoading] = useState(true)

  const module = getModule(moduleId)
  const lesson = getLesson(moduleId, lessonId)

  useEffect(() => {
    async function fetchLesson() {
      setLoading(true)
      const data = await loadLessonContent(moduleId, lessonId)
      setLessonData(data)
      setLoading(false)
    }
    fetchLesson()
  }, [moduleId, lessonId])

  // If module or lesson doesn't exist, redirect to 404
  if (!module || !lesson) {
    return <Navigate to={ROUTES.notFound()} replace />
  }

  if (loading) {
    return (
      <div className="lesson-page">
        <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
          <div className="spinner"></div>
          <p>Loading lesson...</p>
        </div>
      </div>
    )
  }

  // Find previous and next lessons
  const currentLessonIndex = module.lessons.findIndex(l => l.id === parseInt(lessonId))
  const previousLesson = currentLessonIndex > 0 ? module.lessons[currentLessonIndex - 1] : null
  const nextLesson = currentLessonIndex < module.lessons.length - 1 ? module.lessons[currentLessonIndex + 1] : null

  return (
    <div className="lesson-page">
      <header className="lesson-header">
        <div className="container">
          <Link to={ROUTES.module(moduleId)} className="back-link">
            ← Back to Module {moduleId}
          </Link>
          <div className="lesson-breadcrumb">
            <span className="breadcrumb-item">{module.title}</span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-item current">{lesson.title}</span>
          </div>
          <h1>{lesson.title}</h1>
          <div className="lesson-meta">
            <span className="meta-badge">⏱️ {lesson.timeEstimate}</span>
            <span className="meta-badge">📚 Lesson {lessonId}</span>
          </div>
        </div>
      </header>

      <main className="lesson-content">
        <div className="container">
          <div className="content-wrapper">
            <div className="lesson-body">
              {/* Render markdown content properly */}
              <div className="markdown-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {lessonData?.content}
                </ReactMarkdown>
              </div>

              {lessonData?.validation?.tasks?.length > 0 && (
                <div className="validation-section">
                  <h2>Tasks</h2>
                  <div className="task-list">
                    {lessonData.validation.tasks.map((task, index) => (
                      <ValidationTask
                        key={task.id ?? index}
                        task={task}
                        taskNumber={index + 1}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className="lesson-sidebar">
              <div className="sidebar-card">
                <h3>Learning Objectives</h3>
                {lessonData?.metadata?.learningObjectives?.length > 0 ? (
                  <ul>
                    {lessonData.metadata.learningObjectives.map((obj, index) => (
                      <li key={index}>{obj}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted">Master the concepts in this lesson</p>
                )}
              </div>

              <div className="sidebar-card">
                <h3>Progress</h3>
                <div className="progress-indicator">
                  <p className="text-muted">
                    Lesson {currentLessonIndex + 1} of {module.lessons.length}
                  </p>
                  <div className="progress-bar">
                    <div 
                      className="progress-bar-fill" 
                      style={{ width: `${((currentLessonIndex + 1) / module.lessons.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </aside>
          </div>

          <nav className="lesson-navigation">
            <div className="nav-buttons">
              {previousLesson ? (
                <Link 
                  to={ROUTES.lesson(moduleId, previousLesson.id)}
                  className="nav-button nav-prev"
                >
                  <span className="nav-label">Previous</span>
                  <span className="nav-title">{previousLesson.title}</span>
                </Link>
              ) : (
                <div className="nav-button nav-disabled">
                  <span className="nav-label">No previous lesson</span>
                </div>
              )}

              {nextLesson ? (
                <Link 
                  to={ROUTES.lesson(moduleId, nextLesson.id)}
                  className="nav-button nav-next"
                >
                  <span className="nav-label">Next</span>
                  <span className="nav-title">{nextLesson.title}</span>
                </Link>
              ) : (
                <Link 
                  to={ROUTES.module(moduleId)}
                  className="nav-button nav-next"
                >
                  <span className="nav-label">Complete</span>
                  <span className="nav-title">Back to Module</span>
                </Link>
              )}
            </div>
          </nav>
        </div>
      </main>
    </div>
  )
}

export default LessonPage
