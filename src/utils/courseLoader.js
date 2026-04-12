// Course structure and metadata
export const courseStructure = {
  modules: [
    {
      id: 1,
      title: "You're Not Going to Break Anything",
      description: 'Terminal comfort, tools installation (Homebrew, Node, Git, Cursor), environment setup. The goal is comfort, not mastery.',
      timeEstimate: '45 minutes',
      lessons: [],
    },
    {
      id: 2,
      title: 'How to Talk to Your AI',
      description: 'Prompting, scoping requests, CLAUDE.md as a communication tool, context management. The collaboration skills that make AI-assisted development actually work.',
      timeEstimate: '45 minutes',
      lessons: [],
    },
    {
      id: 3,
      title: 'Build Something Real',
      description: 'Git/GitHub intro, then a guided build of a link-in-bio site. Each phase teaches a judgment skill: reading AI output, debugging when you don\'t understand the code, knowing when to push back.',
      timeEstimate: '90 minutes',
      lessons: [],
    },
    {
      id: 4,
      title: 'Put It on the Internet',
      description: 'Deploy the bio site to Vercel. Short but critical — the moment the project becomes real.',
      timeEstimate: '30 minutes',
      lessons: [],
    },
    {
      id: 5,
      title: 'Now Do It Again',
      description: 'Student picks their own idea, scopes it, builds it, deploys it. Frameworks and prompts, not step-by-step instructions. Training wheels off.',
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
