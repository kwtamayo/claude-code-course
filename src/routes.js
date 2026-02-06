// Route patterns - Single source of truth
// Change route URLs here and they update everywhere!

export const ROUTES = {
  // Home
  home: () => '/',
  
  // Course
  course: () => '/course',
  
  // Modules
  module: (moduleId) => `/course/module/${moduleId}`,
  
  // Lessons
  lesson: (moduleId, lessonId) => `/course/module/${moduleId}/lesson/${lessonId}`,
  
  // Simulator
  simulator: () => '/simulator',
  
  // 404
  notFound: () => '/404',
}

// Helper function for dynamic routing in React Router
// These match the patterns above but with :params for Route definitions
export const ROUTE_PATTERNS = {
  home: '/',
  course: '/course',
  module: '/course/module/:moduleId',
  lesson: '/course/module/:moduleId/lesson/:lessonId',
  simulator: '/simulator',
  notFound: '/404',
  catchAll: '*',
}
