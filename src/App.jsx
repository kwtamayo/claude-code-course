import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ROUTE_PATTERNS } from './routes'
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
        <Route path={ROUTE_PATTERNS.home} element={<HomePage />} />
        
        {/* Course overview */}
        <Route path={ROUTE_PATTERNS.course} element={<CoursePage />} />
        
        {/* Individual modules */}
        <Route path={ROUTE_PATTERNS.module} element={<ModulePage />} />
        
        {/* Individual lessons */}
        <Route path={ROUTE_PATTERNS.lesson} element={<LessonPage />} />
        
        {/* Claude Code simulator */}
        <Route path={ROUTE_PATTERNS.simulator} element={<SimulatorPage />} />
        
        {/* 404 page */}
        <Route path={ROUTE_PATTERNS.notFound} element={<NotFoundPage />} />
        <Route path={ROUTE_PATTERNS.catchAll} element={<Navigate to="/404" replace />} />
      </Routes>
    </Router>
  )
}

export default App
