import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CoursePage from './pages/CoursePage'
import ModulePage from './pages/ModulePage'
import LessonPage from './pages/LessonPage'
import SimulatorPage from './pages/SimulatorPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Router>
      <Routes>
        {/* Home page */}
        <Route path="/" element={<HomePage />} />
        
        {/* Course overview */}
        <Route path="/course" element={<CoursePage />} />
  
	{/* TEST ROUTE - ADD THIS */}
	<Route path="/test/:id" element={<div style={{padding: '2rem'}}>
  		<h1>Test Route Works!</h1>
  		<p>ID from URL: {window.location.pathname}</p>
	</div>} />
	      
        {/* Individual modules */}
        <Route path="/course/module/:moduleId" element={<ModulePage />} />	
        
        {/* Individual lessons */}
        <Route path="/course/module/:moduleId/lesson/:lessonId" element={<LessonPage />} />
        
        {/* Claude Code simulator */}
        <Route path="/simulator" element={<SimulatorPage />} />
        
        {/* 404 page */}
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Router>
  )
}

export default App
