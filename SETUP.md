# Platform Developer Setup

This guide is for contributors working on the course platform itself — the React app that renders lessons, handles routing, and runs the validation system. If you're a student looking to get started, the [README](./README.md) has what you need.

## Prerequisites

- Node.js v18+
- Git
- A code editor (the course uses Cursor)

## Local Setup

```bash
git clone https://github.com/kwtamayo/claude-code-course.git
cd claude-code-course
npm install
npm run dev
```

The dev server runs at [http://localhost:3000](http://localhost:3000).

## Key Commands

```bash
npm run dev      # Start dev server (port 3000, strictPort — won't silently switch)
npm run build    # Production build
npm run lint     # Run ESLint
```

## Project Structure

```
src/
├── components/
│   ├── ValidationTask.jsx       # "Check My Work" task UI
│   └── Callout.jsx              # :::info / :::warning callout blocks
├── pages/
│   ├── HomePage.jsx
│   ├── CoursePage.jsx
│   ├── ModulePage.jsx
│   ├── LessonPage.jsx
│   └── NotFoundPage.jsx
├── styles/                      # Component-scoped CSS files
├── utils/
│   ├── courseLoader.js          # Course structure + lesson fetching
│   └── remarkCalloutDirective.js  # Remark plugin for callout syntax
├── routes.js                    # ⚠️ Single source of truth for all routes
├── App.jsx
└── main.jsx

public/
└── course-content/
    ├── module-1/                # One folder per module
    │   └── lesson-1/
    │       └── lesson.md
    └── ...
```

## Architecture Notes

### Routing

`src/routes.js` is the single source of truth for all URLs. Never hardcode route strings anywhere else.

```javascript
import { ROUTES } from './routes'

ROUTES.module(1)        // → "/course/module/1"
ROUTES.lesson(1, 2)     // → "/course/module/1/lesson/2"
```

Always use `ROUTES.*` functions in `<Link>` components. Hardcoded strings cause 404s that are hard to trace.

### Course Structure

`src/utils/courseLoader.js` defines the module/lesson metadata and handles fetching lesson markdown at runtime. When adding a new module or lesson:

1. Add the entry to `courseStructure` in `courseLoader.js`
2. Create the markdown file at `public/course-content/module-N/lesson-N/lesson.md`

### Lesson Frontmatter

Each lesson markdown file starts with a JSON frontmatter block:

```
---
{
  "moduleId": "module-1",
  "lessonId": "lesson-1",
  "title": "Lesson Title",
  "timeEstimate": "20 minutes",
  "prerequisites": [],
  "learningObjectives": ["..."],
  "validation": {
    "tasks": [
      {
        "id": "task-id",
        "description": "What the student does",
        "type": "paste-output",
        "expectedPatterns": ["regex pattern"],
        "hints": ["Helpful hint"]
      }
    ]
  }
}
---

Lesson content starts here...
```

### Callout Syntax

Use custom directives in markdown for callouts:

```
:::info
This is an info callout.
:::

:::warning
This is a warning callout.
:::
```

These are transformed by the remark plugin in `src/utils/remarkCalloutDirective.js` and rendered by `src/components/Callout.jsx`.

### CSS

Plain CSS with variables — no Tailwind. Global variables are defined in `src/styles/index.css`. Each page/component has its own scoped stylesheet. Dark mode uses `@media (prefers-color-scheme: dark)`.
