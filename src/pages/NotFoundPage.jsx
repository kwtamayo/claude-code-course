import React from 'react'
import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      textAlign: 'center' 
    }}>
      <div>
        <h1 style={{ fontSize: '6rem', margin: 0 }}>404</h1>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Page Not Found</h2>
        <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
          The page you're looking for doesn't exist.
        </p>
        <Link to="/" className="btn btn-primary">
          Go Home
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
