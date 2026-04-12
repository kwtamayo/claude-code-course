import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../routes'
import { courseStructure, getTotalCourseTime, getProgress } from '../utils/courseLoader'
import '../styles/CoursePage.css'

function CoursePage() {
  const progress = getProgress()
  const totalTime = getTotalCourseTime()

  return (
    <div className="course-page">
      <header className="course-header">
        <div className="container">
          <Link to="/" className="back-link">← Back to Home</Link>
          <h1>Course Overview</h1>
          <p className="course-subtitle">
            Five modules. One real project shipped to the internet.
          </p>
          <div className="course-stats">
            <div className="stat">
              <span className="stat-value">{courseStructure.modules.length}</span>
              <span className="stat-label">Modules</span>
            </div>
            <div className="stat">
              <span className="stat-value">{totalTime}</span>
              <span className="stat-label">Total Time</span>
            </div>
            <div className="stat">
              <span className="stat-value">{progress.percentComplete}%</span>
              <span className="stat-label">Complete</span>
            </div>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${progress.percentComplete}%` }}
            />
          </div>
        </div>
      </header>

      <main className="container">
        <div className="modules-grid">
          {courseStructure.modules.map((module) => (
            <Link
              key={module.id}
              to={ROUTES.module(module.id)}
              className="module-card"
            >
              <div className="module-header">
                <span className="module-number">Module {module.id}</span>
                <span className="module-time">⏱️ {module.timeEstimate}</span>
              </div>
              <h2 className="module-title">{module.title}</h2>
              <p className="module-description">{module.description}</p>
              <div className="module-footer">
                <span className="lesson-count">
                  {module.lessons.length} lesson{module.lessons.length !== 1 ? 's' : ''}
                </span>
                <span className="module-arrow">→</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="learning-path">
          <h2>What You&apos;re Building Toward</h2>
          <div className="path-phases">
            <div className="path-phase">
              <h3>Get Comfortable</h3>
              <p>Modules 1–2 • Setup and collaboration skills</p>
              <ul>
                <li>Terminal without fear</li>
                <li>Tools installed and working</li>
                <li>Prompting with intention</li>
              </ul>
            </div>
            <div className="path-phase">
              <h3>Build and Ship</h3>
              <p>Modules 3–4 • Real project, live on the internet</p>
              <ul>
                <li>Git and GitHub basics</li>
                <li>Link-in-bio site from scratch</li>
                <li>Deployed to Vercel</li>
              </ul>
            </div>
            <div className="path-phase">
              <h3>Go Independent</h3>
              <p>Module 5 • Your idea, your build</p>
              <ul>
                <li>Scope your own project</li>
                <li>Build without hand-holding</li>
                <li>Deploy it yourself</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="start-prompt">
          <h2>Ready to Begin?</h2>
          <p>Start with Module 1 — you&apos;re not going to break anything.</p>
          <Link to={ROUTES.module(1)} className="btn btn-primary btn-large">
            Start Module 1
          </Link>
        </div>
      </main>
    </div>
  )
}

export default CoursePage
