import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../routes'
import '../styles/HomePage.css'

function HomePage() {
  return (
    <div className="home-page">
      <header className="hero">
        <div className="container">
          <h1 className="hero-title">
            Learn Software Development<br />
            <span className="hero-highlight">in a Weekend</span>
          </h1>
          <p className="hero-subtitle">
            An interactive course that teaches you the complete development lifecycle
            using Claude Code and Cursor IDE
          </p>
          <div className="hero-cta">
            <Link to={ROUTES.course()} className="btn btn-primary btn-large">
              Start Learning
            </Link>
            <a href="https://github.com/kwtamayo/claude-code-course" 
               className="btn btn-secondary btn-large"
               target="_blank"
               rel="noopener noreferrer">
              View on GitHub
            </a>
          </div>
        </div>
      </header>

      <section className="features">
        <div className="container">
          <h2 className="section-title">What You'll Build</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🌐</div>
              <h3>Personal Dashboard</h3>
              <p>A fully-functional web app with weather, news, to-do lists, and notes. Deployed live on the internet.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>iOS Companion App</h3>
              <p>Mobile version that syncs with your dashboard. Published to TestFlight or the App Store.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Real-World Skills</h3>
              <p>Command line, Git, deployment, testing, debugging, and security. Everything you need.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="timeline">
        <div className="container">
          <h2 className="section-title">Your Learning Journey</h2>
          <div className="timeline-items">
            <div className="timeline-item">
              <div className="timeline-marker">1</div>
              <div className="timeline-content">
                <h3>Fundamentals (3 hours)</h3>
                <p>Command line, Git, and Cursor basics in a safe, simulated environment</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker">2</div>
              <div className="timeline-content">
                <h3>Web Development (4 hours)</h3>
                <p>Build and deploy your personal dashboard with React and APIs</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker">3</div>
              <div className="timeline-content">
                <h3>iOS Development (3 hours)</h3>
                <p>Create a mobile app and publish to TestFlight or App Store</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker">4</div>
              <div className="timeline-content">
                <h3>Showcase (1 hour)</h3>
                <p>Polish your projects and document your learning journey</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to Start?</h2>
          <p>No coding experience required. Just bring curiosity and a weekend.</p>
          <Link to={ROUTES.course()} className="btn btn-primary btn-large">
            Begin Your Journey
          </Link>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>Built with ❤️ using Claude Code</p>
          <div className="footer-links">
            <a href="https://github.com/kwtamayo/claude-code-course/issues" target="_blank" rel="noopener noreferrer">
              Report Issue
            </a>
            <a href="https://github.com/kwtamayo/claude-code-course/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">
              License
            </a>
            <a href="https://github.com/kwtamayo/claude-code-course" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
