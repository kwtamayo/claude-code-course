import React, { useState, useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkDirective from 'remark-directive'
import { remarkValidateDirective } from '../utils/remarkValidateDirective'
import { ROUTES } from '../routes'
import { getModule, getLesson, loadLessonContent } from '../utils/courseLoader'
import ValidationTask from '../components/ValidationTask'
import '../styles/LessonPage.css'

// Build the localStorage key for a given module/lesson pair
function getStorageKey(moduleId, lessonId) {
  return `module-${moduleId}-lesson-${lessonId}`
}

// Read completed tasks from localStorage
function loadCompletedTasks(moduleId, lessonId) {
  try {
    const stored = localStorage.getItem(getStorageKey(moduleId, lessonId))
    if (stored) {
      const parsed = JSON.parse(stored)
      return parsed.completedTasks || []
    }
  } catch (e) {
    console.error('Failed to read progress from localStorage:', e)
  }
  return []
}

// Save a completed task to localStorage
function saveCompletedTask(moduleId, lessonId, taskId) {
  const key = getStorageKey(moduleId, lessonId)
  try {
    const existing = localStorage.getItem(key)
    const data = existing ? JSON.parse(existing) : { completedTasks: [] }

    if (!data.completedTasks.includes(taskId)) {
      data.completedTasks.push(taskId)
    }
    data.lastUpdated = new Date().toISOString()

    localStorage.setItem(key, JSON.stringify(data))
  } catch (e) {
    console.error('Failed to save progress to localStorage:', e)
  }
}

function LessonPage() {
  const { moduleId, lessonId } = useParams()
  const [lessonData, setLessonData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [completedTasks, setCompletedTasks] = useState([])

  const module = getModule(moduleId)
  const lesson = getLesson(moduleId, lessonId)

  // Load lesson content
  useEffect(() => {
    async function fetchLesson() {
      setLoading(true)
      const data = await loadLessonContent(moduleId, lessonId)
      setLessonData(data)
      setLoading(false)
    }
    fetchLesson()
  }, [moduleId, lessonId])

  // Load completed tasks from localStorage
  useEffect(() => {
    setCompletedTasks(loadCompletedTasks(moduleId, lessonId))
  }, [moduleId, lessonId])

  // Called when a student successfully validates a task
  const handleTaskComplete = (taskId) => {
    saveCompletedTask(moduleId, lessonId, taskId)
    setCompletedTasks(prev =>
      prev.includes(taskId) ? prev : [...prev, taskId]
    )
  }

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
              {/* Render markdown content with inline validation directives */}
              <div className="markdown-content">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkDirective, remarkValidateDirective]}
                  components={{
                    // Map ::validate[task-id] directives to ValidationTask components
                    validate: ({ taskId }) => {
                      const tasks = lessonData?.validation?.tasks || []
                      const task = tasks.find(t => t.id === taskId)
                      if (!task) return null

                      const taskNumber = tasks.indexOf(task) + 1
                      return (
                        <ValidationTask
                          task={task}
                          taskNumber={taskNumber}
                          isCompleted={completedTasks.includes(task.id)}
                          onComplete={handleTaskComplete}
                        />
                      )
                    },
                  }}
                >
                  {lessonData?.content}
                </ReactMarkdown>
              </div>
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
