import React from 'react'
import { Link } from 'react-router-dom'

function SimulatorPage() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
        <Link to="/course">← Exit Simulator</Link>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1>Claude Code Simulator</h1>
          <p>This will be the interactive Claude Code simulation environment.</p>
          <p style={{ marginTop: '1rem', color: '#6b7280' }}>Coming soon...</p>
        </div>
      </div>
    </div>
  )
}

export default SimulatorPage
