// Course structure and metadata
export const courseStructure = {
  modules: [
    {
      id: 0,
      title: 'Clean Slate Setup',
      description: 'Prepare your development environment from scratch',
      timeEstimate: '30 minutes',
      lessons: [
        {
          id: 1,
          title: 'Environment Discovery',
          timeEstimate: '10 minutes',
        },
        {
          id: 2,
          title: 'Clean Slate Script',
          timeEstimate: '10 minutes',
        },
        {
          id: 3,
          title: 'Fresh Installation',
          timeEstimate: '10 minutes',
        },
      ],
    },
    {
      id: 1,
      title: 'Command Line Basics',
      description: 'Master the terminal and essential commands',
      timeEstimate: '60 minutes',
      lessons: [],
    },
    {
      id: 2,
      title: 'Git Fundamentals',
      description: 'Learn version control with Git and GitHub',
      timeEstimate: '60 minutes',
      lessons: [],
    },
    {
      id: 3,
      title: 'Security & Cursor Introduction',
      description: 'Security best practices and IDE setup',
      timeEstimate: '30 minutes',
      lessons: [],
    },
    {
      id: 4,
      title: 'Web Dashboard - Layout & Setup',
      description: 'Start building your personal dashboard',
      timeEstimate: '60 minutes',
      lessons: [],
    },
    {
      id: 5,
      title: 'API Integration',
      description: 'Connect to external APIs for live data',
      timeEstimate: '45 minutes',
      lessons: [],
    },
    {
      id: 6,
      title: 'Data Persistence',
      description: 'Save user data locally',
      timeEstimate: '45 minutes',
      lessons: [],
    },
    {
      id: 7,
      title: 'Backend & Database',
      description: 'Build a backend to store data permanently',
      timeEstimate: '60 minutes',
      lessons: [],
    },
    {
      id: 8,
      title: 'Web Deployment',
      description: 'Deploy your dashboard to the internet',
      timeEstimate: '30 minutes',
      lessons: [],
    },
    {
      id: 9,
      title: 'Refactoring for Mobile API',
      description: 'Add API endpoints for the iOS app',
      timeEstimate: '45 minutes',
      lessons: [],
    },
    {
      id: 10,
      title: 'iOS App Development',
      description: 'Build the mobile companion app',
      timeEstimate: '90 minutes',
      lessons: [],
    },
    {
      id: 11,
      title: 'iOS Deployment',
      description: 'Publish to TestFlight and App Store',
      timeEstimate: '45 minutes',
      lessons: [],
    },
    {
      id: 12,
      title: 'Capstone & Showcase',
      description: 'Polish your projects and plan next steps',
      timeEstimate: '60 minutes',
      lessons: [],
    },
  ],
}

// Get total course time
export const getTotalCourseTime = () => {
  const totalMinutes = courseStructure.modules.reduce((acc, module) => {
    const minutes = parseInt(module.timeEstimate)
    return acc + minutes
  }, 0)
  
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  
  return `${hours}h ${minutes}m`
}

// Get module by ID
export const getModule = (moduleId) => {
  return courseStructure.modules.find(m => m.id === parseInt(moduleId))
}

// Get lesson by module ID and lesson ID
export const getLesson = (moduleId, lessonId) => {
  const module = getModule(moduleId)
  if (!module) return null
  
  return module.lessons.find(l => l.id === parseInt(lessonId))
}

// Calculate progress
export const getProgress = () => {
  // This will read from localStorage later
  // For now, return 0
  return {
    completedModules: 0,
    completedLessons: 0,
    totalModules: courseStructure.modules.length,
    totalLessons: courseStructure.modules.reduce((acc, m) => acc + m.lessons.length, 0),
    percentComplete: 0,
  }
}

// Load lesson content (for now, returns placeholder)
export const loadLessonContent = async (moduleId, lessonId) => {
  // In a real app, this would fetch the markdown file
  // For now, we'll return placeholder content
  
  const module = getModule(moduleId)
  const lesson = getLesson(moduleId, lessonId)
  
  if (!module || !lesson) {
    return null
  }
  
  // TODO: Actually fetch and parse the markdown file
  // For MVP, return structured placeholder
  return {
    module,
    lesson,
    content: `# ${lesson.title}\n\nLesson content will be loaded from markdown files.\n\nFor now, this is a placeholder.`,
    metadata: {
      timeEstimate: lesson.timeEstimate,
      prerequisites: [],
      learningObjectives: [],
    },
    validation: {
      tasks: [],
    },
  }
}
