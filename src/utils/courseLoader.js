// Course structure and metadata
export const courseStructure = {
  modules: [
    {
      id: 0,
      title: 'Setup Your Environment',
      description: 'Get your Mac ready for development in one streamlined lesson',
      timeEstimate: '30 minutes',
      lessons: [
        {
          id: 1,
          title: 'Setup Your Development Environment',
          timeEstimate: '30 minutes',
        },
        {
          id: 2,
          title: 'Troubleshooting Guide',
          timeEstimate: 'As needed',
          optional: true,
        },
      ],
    },
    {
      id: 1,
      title: 'Command Line Basics',
      description: 'Master the terminal and essential commands',
      timeEstimate: '60 minutes',
      lessons: [
        {
          id: 1,
          title: 'Navigating the File System',
          timeEstimate: '20 minutes',
        },
        {
          id: 2,
          title: 'Working with Files',
          timeEstimate: '20 minutes',
        },
        {
          id: 3,
          title: 'Putting It All Together',
          timeEstimate: '20 minutes',
        },
      ],
    },
    {
      id: 2,
      title: 'Git Fundamentals',
      description: 'Learn version control with Git and GitHub',
      timeEstimate: '60 minutes',
      lessons: [
        {
          id: 1,
          title: 'Git Basics',
          timeEstimate: '20 minutes',
        },
        {
          id: 2,
          title: 'Working with GitHub',
          timeEstimate: '20 minutes',
        },
        {
          id: 3,
          title: 'Branches and Workflow',
          timeEstimate: '20 minutes',
        },
      ],
    },
    {
      id: 3,
      title: 'Security Fundamentals',
      description: 'Security best practices for developers',
      timeEstimate: '30 minutes',
      lessons: [
        {
          id: 1,
          title: 'Secrets & Environment Variables',
          timeEstimate: '15 minutes',
        },
        {
          id: 2,
          title: 'Safe Development Practices',
          timeEstimate: '15 minutes',
        },
      ],
    },
    {
      id: 4,
      title: 'Web Dashboard - Layout & Setup',
      description: 'Plan, build, and understand your personal dashboard',
      timeEstimate: '75 minutes',
      lessons: [
        {
          id: 1,
          title: 'Meet Claude Code',
          timeEstimate: '10 minutes',
        },
        {
          id: 2,
          title: 'Plan & Build Your Dashboard',
          timeEstimate: '25 minutes',
        },
        {
          id: 3,
          title: 'Understanding What Got Built',
          timeEstimate: '20 minutes',
        },
        {
          id: 4,
          title: 'Making It Yours',
          timeEstimate: '20 minutes',
        },
      ],
    },
    {
      id: 5,
      title: 'API Integration',
      description: 'Connect to external APIs for live data',
      timeEstimate: '45 minutes',
      lessons: [
        {
          id: 1,
          title: 'Your Dashboard Goes Live',
          timeEstimate: '15 minutes',
        },
        {
          id: 2,
          title: 'Understanding the New Code',
          timeEstimate: '15 minutes',
        },
        {
          id: 3,
          title: 'Error Handling & Make It Yours',
          timeEstimate: '15 minutes',
        },
      ],
    },
    {
      id: 6,
      title: 'Data Persistence',
      description: 'Save user data locally and customize your dashboard',
      timeEstimate: '35 minutes',
      lessons: [
        {
          id: 1,
          title: "Your Dashboard's Memory",
          timeEstimate: '15 minutes',
        },
        {
          id: 2,
          title: 'Plan Before You Build',
          timeEstimate: '20 minutes',
        },
      ],
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

// Load lesson content (fetches actual markdown file)
export const loadLessonContent = async (moduleId, lessonId) => {
  const module = getModule(moduleId)
  const lesson = getLesson(moduleId, lessonId)
  
  if (!module || !lesson) {
    return null
  }
  
  try {
    // Fetch the markdown file from course-content
    const response = await fetch(`/course-content/module-${moduleId}/lesson-${lessonId}/lesson.md`)
    
    if (!response.ok) {
      console.warn(`Lesson file not found: module-${moduleId}/lesson-${lessonId}/lesson.md`)
      // Return placeholder if file doesn't exist
      return {
        module,
        lesson,
        content: `# ${lesson.title}\n\n*Lesson content coming soon!*\n\nThis lesson is currently being developed.`,
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
    
    const markdown = await response.text()
    
    // Parse frontmatter (the JSON metadata at the top)
    const frontmatterMatch = markdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
    
    let metadata = {
      timeEstimate: lesson.timeEstimate,
      prerequisites: [],
      learningObjectives: [],
    }
    let validation = {
      tasks: [],
    }
    let content = markdown
    
    if (frontmatterMatch) {
      try {
        const frontmatter = JSON.parse(frontmatterMatch[1])
        content = frontmatterMatch[2] // Content after frontmatter
        
        metadata = {
          timeEstimate: frontmatter.timeEstimate || lesson.timeEstimate,
          prerequisites: frontmatter.prerequisites || [],
          learningObjectives: frontmatter.learningObjectives || [],
        }
        
        validation = frontmatter.validation || { tasks: [] }
      } catch (e) {
        console.error('Failed to parse lesson frontmatter:', e)
      }
    }
    
    return {
      module,
      lesson,
      content,
      metadata,
      validation,
    }
  } catch (error) {
    console.error('Error loading lesson:', error)
    return null
  }
}
