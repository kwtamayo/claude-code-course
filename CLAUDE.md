# CLAUDE.md — Claude Code Course

## Project Overview

An interactive web-based course platform teaching software development using Claude Code and Cursor IDE. Weekend-intensive format (8-12 hours), macOS/iOS focused, designed for tech-savvy non-developers. Students build a personal web dashboard and an iOS companion app, deployed to Vercel and TestFlight.

**GitHub:** https://github.com/kwtamayo/claude-code-course  
**Dev server:** http://localhost:3000  

---

## Working Philosophy

You are a collaborative building partner, not a code typewriter. Follow these principles:

- **Always discuss approach before writing code.** Ask clarifying questions first.
- **Break work into small, focused tasks** — one feature or fix per conversation.
- **When something is vague, clarify before implementing.**
- **When stuck, explain what you think is happening** before suggesting fixes.
- **Propose alternatives when you see a better path.** Push back constructively.
- **Use multiple perspectives.** When reviewing code or making decisions, consider asking different AI models to critique each other's work.
- **Explain WHY, not just WHAT.** This student is learning, not just shipping.

---

## Commands

```bash
npm run dev        # Start dev server at http://localhost:3000
npm run build      # Production build (not needed yet)
npm run lint       # Run ESLint
npm install        # Install dependencies after cloning
```

---

## Custom Slash Commands

Create reusable workflows by saving prompts as markdown files. This is essential for building repeatable course development workflows.

**Project commands** (shared via git):  
`.claude/commands/` - Available in this project only

**Personal commands** (your toolkit):  
`~/.claude/commands/` - Available across all your projects

**Quick example:**
```bash
# Create a command to review lesson content
mkdir -p .claude/commands
echo "Review this lesson for clarity, accuracy, and proper markdown formatting" > .claude/commands/review-lesson.md
```

**Usage:** `/review-lesson`

**With arguments:**
```bash
# Create a command that takes module and lesson numbers
echo "Create a new lesson outline for Module $1, Lesson $2" > .claude/commands/new-lesson.md
```

**Usage:** `/new-lesson 3 1`

**Our project commands:**
- `/review-lesson` - Check lesson content quality
- [Add more as we create them]

---

## Tech Stack

```
Frontend:   React 18.2 + Vite 5.0
Routing:    React Router 6.20
Markdown:   react-markdown 9.0 + remark-gfm 4.0
Styling:    Plain CSS with CSS variables (no Tailwind)
Linting:    ESLint 8.x
Hosting:    Vercel (not yet deployed)
```

---

## Project Structure

```
claude-code-course/
├── public/
│   └── course-content/          # Markdown lesson files (served as static assets)
│       └── module-0/
│           ├── lesson-1/lesson.md
│           └── lesson-2/lesson.md
├── src/
│   ├── components/              # Empty — future use
│   ├── pages/
│   │   ├── HomePage.jsx         # Landing page
│   │   ├── CoursePage.jsx       # All 13 modules overview
│   │   ├── ModulePage.jsx       # Lessons within a module
│   │   ├── LessonPage.jsx       # Markdown content + validation
│   │   ├── SimulatorPage.jsx    # Placeholder
│   │   └── NotFoundPage.jsx
│   ├── styles/                  # Component-scoped CSS files
│   ├── utils/
│   │   └── courseLoader.js      # Course structure, data fetching
│   ├── routes.js                # ⚠️ SINGLE SOURCE OF TRUTH for routes
│   ├── App.jsx
│   └── main.jsx
```

---

## Critical Architecture Rules

### Routing — READ THIS FIRST

**`src/routes.js` is the single source of truth for ALL routes.**  
Never hardcode route strings anywhere else.

```javascript
// routes.js exports two things:
import { ROUTES, ROUTE_PATTERNS } from './routes'

// ROUTES — functions that generate URLs for <Link> components
ROUTES.module(0)        // → "/course/module/0"
ROUTES.lesson(0, 1)     // → "/course/module/0/lesson/1"

// ROUTE_PATTERNS — patterns for <Route> definitions in App.jsx
ROUTE_PATTERNS.module   // → "/course/module/:moduleId"
ROUTE_PATTERNS.lesson   // → "/course/module/:moduleId/lesson/:lessonId"
```

**NEVER use hyphens before URL parameters:**
```javascript
// ✅ CORRECT
<Route path="/course/module/:moduleId" />
<Link to={ROUTES.module(module.id)} />

// ❌ WRONG — causes 404s
<Route path="/course/module-:moduleId" />
<Link to={`/course/module-${module.id}`} />
```

**Markdown files must use route URLs, not file paths:**
```markdown
<!-- ✅ CORRECT -->
[Troubleshooting](/course/module/0/lesson/2)

<!-- ❌ WRONG — causes 404s -->
[Troubleshooting](../lesson-2/lesson.md)
```

### Course Content

Lesson files live in `public/course-content/` and are fetched at runtime via `fetch()`.

**Lesson frontmatter structure (JSON between `---` delimiters):**
```json
{
  "moduleId": "module-0",
  "lessonId": "lesson-1",
  "title": "Lesson Title",
  "timeEstimate": "20 minutes",
  "prerequisites": [],
  "learningObjectives": ["..."],
  "validation": {
    "tasks": [
      {
        "id": "verify-homebrew",
        "description": "Verify Homebrew is installed",
        "type": "paste-output",
        "expectedPatterns": ["Homebrew \\d+"],
        "hints": ["Run: brew --version"]
      }
    ]
  }
}
```

---

## Current State

### ✅ Complete

- React + Vite + React Router infrastructure
- Routes system (`src/routes.js`) — bulletproof navigation
- ESLint configured
- All pages built: Home, Course, Module, Lesson, 404
- Module 0 complete (2 lessons):
  - Lesson 1: Setup Your Development Environment (20 min)
  - Lesson 2: Troubleshooting Guide (optional)
- Markdown rendering with syntax highlighting
- Professional CSS design system
- Full navigation: Home → Course → Module → Lesson (working!)
- Validation tasks defined in lesson frontmatter (data ready, UI not built)

### 🚧 Next: Validation System

Tasks already defined in lesson frontmatter — just need the UI and logic.

**Implementation plan:**
1. Read validation tasks from `lessonData`
2. Render task cards with "Check My Work" buttons  
3. Textarea for `paste-output` type tasks
4. Pattern matching against `expectedPatterns` (regex)
5. Feedback UI: ✅ success / ❌ failure / 💡 hints
6. Persist completed tasks to `localStorage`
7. Surface progress % on CoursePage

```javascript
// Core validation logic (to build)
function validateTask(task, userInput) {
  for (const pattern of task.expectedPatterns) {
    if (new RegExp(pattern).test(userInput)) {
      return { success: true, message: "Great job!" }
    }
  }
  return { success: false, message: "Not quite. Try again?", hints: task.hints }
}

// localStorage structure
{
  "module-0-lesson-1": {
    "completedTasks": ["verify-homebrew", "verify-node"],
    "lastUpdated": "2026-02-10T10:30:00Z"
  }
}
```

### 📋 Module Status

| Module | Title | Status |
|--------|-------|--------|
| 0 | Setup Your Environment | ✅ Complete |
| 1 | Command Line Basics | ⏳ Content needed |
| 2 | Git Fundamentals | ⏳ Content needed |
| 3 | Security & Cursor Introduction | ⏳ Content needed |
| 4 | Web Dashboard Layout | ⏳ Content needed |
| 5 | API Integration | ⏳ Content needed |
| 6 | Data Persistence | ⏳ Content needed |
| 7 | Backend & Database | ⏳ Content needed |
| 8 | Web Deployment | ⏳ Content needed |
| 9 | Refactoring for Mobile API | ⏳ Content needed |
| 10 | iOS App Development | ⏳ Content needed |
| 11 | iOS Deployment | ⏳ Content needed |
| 12 | Capstone & Showcase | ⏳ Content needed |

---

## Code Conventions

- **Functional components with hooks** (no class components)
- **Plain CSS** — CSS variables for theming, component-scoped stylesheets
- **No Tailwind, no inline styles**
- **No prop-types** (disabled in ESLint — learning project)
- **ES modules** throughout (`import`/`export`)
- **Descriptive variable names** — this is a teaching codebase, clarity over brevity

---

## File Boundaries

| Zone | Rule |
|------|------|
| `src/` | Safe to edit freely |
| `public/course-content/` | Safe to edit |
| `node_modules/` | Never touch |
| `package-lock.json` | Never touch |
| `.env` | Never touch (doesn't exist yet) |

---

## Design Direction

- Clean, professional, educational feel
- Purple primary color (`#7c3aed`) — already in CSS variables
- Dark code blocks, light content areas
- Mobile-responsive (students may use tablets)
- Reference: Linear, Notion, Khan Academy

---

## Git Workflow

```bash
# Feature work
git add .
git commit -m "feat: description of what changed"
git push origin main

# Switching computers — always push before leaving!
git add . && git commit -m "wip: save before switching" && git push origin main

# On new computer
git pull origin main
```

**Commit prefixes:** `feat:` `fix:` `docs:` `refactor:` `wip:`

---

## Debugging Escalation

When stuck, escalate through these steps **in order**:

### Step 1: Rephrase
- Describe expected vs. actual behavior with specificity
- Include **exact error message** and file/line location
- Show what you tried

### Step 2: Add Context
- Paste error output + relevant code + attempts made
- Ask: **"What do you think is happening?"** (diagnose before fix)

### Step 3: Step Back
- Stop trying to fix it
- Ask: **"Walk me through what this code does step by step"**
- Ask: **"What assumptions is this code making?"**
- Often reveals the real issue

### Step 4: Revert and Retry
- If steps 1-3 fail twice, **the approach may be wrong**
- `git stash` or checkout to known good state
- Try fundamentally different approach
- Consider decomposing feature further

**CRITICAL:** If all 4 steps completed twice with no progress, say so.  
Suggest simplifying the requirement or breaking into smaller pieces.

**For routing bugs:** Always check `src/routes.js` first, then verify links use `ROUTES.*` functions, not hardcoded strings.

---

## Student Context

- **Machine:** Apple Silicon Mac (M1/M2/M3) — Homebrew at `/opt/homebrew`
- **Shell:** zsh
- **Tools installed:** Homebrew, Git, Node.js, npm
- **IDE:** Cursor (recently installed)
- **GitHub:** https://github.com/kwtamayo/claude-code-course
- **Learning style:** Practical, wants to understand WHY, pushes back on unnecessary complexity

---

## When Compacting

Always preserve:
- List of modified files
- Current feature in progress
- Any unresolved routing issues
- Validation system implementation state
- Which modules have content vs. need content
