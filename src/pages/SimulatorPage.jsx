import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../routes'
import '../styles/SimulatorPage.css'

function SimulatorPage() {
  return (
    <div className="simulator-page">
      <div className="simulator-header">
        <Link to={ROUTES.course()}>← Exit Simulator</Link>
      </div>
      <div className="simulator-body">
        <div className="simulator-placeholder">
          <h1>Claude Code Simulator</h1>
          <p>This will be the interactive Claude Code simulation environment.</p>
          <p>Coming soon...</p>
        </div>
      </div>
    </div>
  )
}

export default SimulatorPage
