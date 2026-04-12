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
            Build Real Things<br />
            <span className="hero-highlight">With AI as Your Partner</span>
          </h1>
          <p className="hero-subtitle">
            A course for the tech-savvy professional who&apos;s always been curious about software
            but too intimidated to start. You&apos;ll ship something real to the internet —
            and walk away knowing how to build the next one on your own.
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
          <h2 className="section-title">This Is Different</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>AI as a Collaborator</h3>
              <p>Not a code generator you prompt blindly. You&apos;ll learn when to trust it, when to push back, and when to change your approach entirely.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Ship a Real Project</h3>
              <p>You&apos;ll build a link-in-bio site and deploy it to the internet. Not a toy. Not a tutorial clone. Something you made, live on a real URL.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🧠</div>
              <h3>Judgment Over Commands</h3>
              <p>Every technical step is a vehicle for a collaboration skill. How to read AI output. How to debug when you don&apos;t understand the code. How to get unstuck.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="timeline">
        <div className="container">
          <h2 className="section-title">Five Modules. One Real Project.</h2>
          <div className="timeline-items">
            <div className="timeline-item">
              <div className="timeline-marker">1</div>
              <div className="timeline-content">
                <h3>You&apos;re Not Going to Break Anything</h3>
                <p>Get comfortable with the terminal, install your tools, and realize it&apos;s less scary than it looks.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker">2</div>
              <div className="timeline-content">
                <h3>How to Talk to Your AI</h3>
                <p>Prompting, scoping, context management. The collaboration skills that make the difference between spinning and shipping.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker">3</div>
              <div className="timeline-content">
                <h3>Build Something Real</h3>
                <p>Git basics, then a guided build of a link-in-bio site. You&apos;ll write code, read AI output, debug things you don&apos;t fully understand, and ship anyway.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker">4</div>
              <div className="timeline-content">
                <h3>Put It on the Internet</h3>
                <p>Deploy to Vercel. The moment the project stops being practice and becomes real.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker">5</div>
              <div className="timeline-content">
                <h3>Now Do It Again</h3>
                <p>Pick your own idea. Scope it. Build it. Deploy it. Frameworks and prompts, not step-by-step instructions. Training wheels off.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Built by a non-developer. Taught by example.</h2>
          <p>This course platform was built using the same AI-assisted workflow it teaches. The app is the proof of concept.</p>
          <Link to={ROUTES.course()} className="btn btn-primary btn-large">
            Start Module 1
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
