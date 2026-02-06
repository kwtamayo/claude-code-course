import React from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { ROUTES } from '../routes'
import { getModule } from '../utils/courseLoader'
import '../styles/ModulePage.css'

function ModulePage() {
  const { moduleId } = useParams()
  const module = getModule(moduleId)

  // If module doesn't exist, redirect to 404
  if (!module) {
    return <Navigate to="/404" replace />
  }

  const hasLessons = module.lessons && module.lessons.length > 0

  return (
    <div className="module-page">
      <header className="module-header">
        <div className="container">
          <Link to={ROUTES.course()} className="back-link">← Back to Course</Link>
          <div className="module-badge">Module {module.id}</div>
          <h1>{module.title}</h1>
          <p className="module-intro">{module.description}</p>
          <div className="module-meta">
            <span className="meta-item">⏱️ {module.timeEstimate}</span>
            <span className="meta-item">
              📚 {module.lessons.length} lesson{module.lessons.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </header>

      <main className="container">
        {hasLessons ? (
          <div className="lessons-list">
            {module.lessons.map((lesson, index) => (
              <Link
                key={lesson.id}
                to={ROUTES.lesson(moduleId, lesson.id)}
                className="lesson-card"
              >
                <div className="lesson-number">{index + 1}</div>
                <div className="lesson-content">
                  <h3 className="lesson-title">{lesson.title}</h3>
                  <div className="lesson-meta">
                    <span className="lesson-time">⏱️ {lesson.timeEstimate}</span>
                  </div>
                </div>
                <div className="lesson-arrow">→</div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="no-lessons">
            <h2>📝 Coming Soon</h2>
            <p>Lessons for this module are currently being developed.</p>
            <p className="hint">
              Module 0 has lessons available! Check it out to see the full lesson experience.
            </p>
            <Link to={ROUTES.module(0)} className="btn btn-primary">
              Go to Module 0
            </Link>
          </div>
        )}

        <div className="module-navigation">
          {module.id > 0 && (
            <Link to={ROUTES.module(module.id - 1)} className="nav-button nav-prev">
              ← Previous Module
            </Link>
          )}
          {module.id < 12 && (
            <Link to={ROUTES.module(module.id + 1)} className="nav-button nav-next">
              Next Module →
            </Link>
          )}
        </div>
      </main>
    </div>
  )
}

export default ModulePage
