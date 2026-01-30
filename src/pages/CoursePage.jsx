import React from 'react'
import { Link } from 'react-router-dom'
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
            Your weekend journey to becoming a developer
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
              to={`/course/module-${module.id}`}
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
          <h2>Your Learning Path</h2>
          <div className="path-phases">
            <div className="path-phase">
              <h3>Phase 1: Fundamentals</h3>
              <p>Modules 0-3 • Browser-based learning</p>
              <ul>
                <li>Safe, simulated environment</li>
                <li>Command line and Git basics</li>
                <li>Security fundamentals</li>
              </ul>
            </div>
            <div className="path-phase">
              <h3>Phase 2: Web Development</h3>
              <p>Modules 4-8 • Real development</p>
              <ul>
                <li>Build your dashboard</li>
                <li>APIs and databases</li>
                <li>Deploy to the internet</li>
              </ul>
            </div>
            <div className="path-phase">
              <h3>Phase 3: Mobile Development</h3>
              <p>Modules 9-11 • iOS app creation</p>
              <ul>
                <li>Swift and SwiftUI</li>
                <li>Mobile API integration</li>
                <li>App Store deployment</li>
              </ul>
            </div>
            <div className="path-phase">
              <h3>Phase 4: Showcase</h3>
              <p>Module 12 • Capstone project</p>
              <ul>
                <li>Polish your work</li>
                <li>Document your journey</li>
                <li>Plan next steps</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="start-prompt">
          <h2>Ready to Begin?</h2>
          <p>Start with Module 0 to set up your development environment</p>
          <Link to="/course/module-0" className="btn btn-primary btn-large">
            Start Module 0
          </Link>
        </div>
      </main>
    </div>
  )
}

export default CoursePage
