# CLAUDE.md — Claude Code Course

## Project Overview

An interactive web-based course platform teaching software development using Claude Code and VS Code. Weekend-intensive format (8-12 hours), macOS/iOS focused, designed for tech-savvy non-developers. Students build a personal web dashboard and an iOS companion app, deployed to Vercel and TestFlight.

**GitHub:** https://github.com/kwtamayo/claude-code-course  
**Dev server:** http://localhost:3000  

---

## Working Philosophy

You are a collaborative building partner, not a code typewriter. Follow these principles:

- **Start with the end vision.** Define "done," work backward through dependencies, then implement. This prevents building the wrong thing efficiently.
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

**Project slash commands** (`.claude/commands/`):
- `/review-lesson` — Check lesson content quality

---

## Tech Stack

```
Frontend:   React 18.2 + Vite 5.0
Routing:    React Router 6.20
Markdown:   react-markdown 9.0 + remark-gfm 4.0
Styling:    Plain CSS with CSS variables (no Tailwind)
Linting:    ESLint 9.x
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
│   ├── components/
│   │   └── ValidationTask.jsx   # Inline validation UI for paste-output tasks
│   ├── pages/
│   │   ├── HomePage.jsx         # Landing page
│   │   ├── CoursePage.jsx       # All 13 modules overview
│   │   ├── ModulePage.jsx       # Lessons within a module
│   │   ├── LessonPage.jsx       # Markdown content + validation
│   │   ├── SimulatorPage.jsx    # Placeholder
│   │   └── NotFoundPage.jsx
│   ├── styles/                  # Component-scoped CSS files
│   ├── utils/
│   │   ├── courseLoader.js              # Course structure, data fetching
│   │   └── remarkValidateDirective.js   # Remark plugin for ::validate directives
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

Core infrastructure complete: React + Vite + React Router, markdown rendering with `remark-directive`, validation system (`paste-output` + `command-match`), CSS design system, localStorage persistence. See module status below.

### 🚧 Next

- **Surface progress % on CoursePage** — read localStorage to show completion per module
- **Module 6 content** — Data Persistence
- **Dogfood Module 5** — test all 3 lessons as a student would

### Module Status

| Module | Title | Status |
|--------|-------|--------|
| 0 | Setup Your Environment | ✅ Complete |
| 1 | Command Line Basics | ✅ Complete |
| 2 | Git Fundamentals | ✅ Complete |
| 3 | Security Fundamentals | ✅ Complete |
| 4 | Web Dashboard Layout | ✅ Complete |
| 5 | API Integration | ✅ Complete |
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

When stuck, escalate in order: **1. Rephrase** (exact error + expected vs. actual) → **2. Add Context** (ask "what do you think is happening?" before fixing) → **3. Step Back** (ask "walk me through what this code does") → **4. Revert and Retry** (`git stash`, try a different approach).

If all 4 steps completed twice with no progress, say so. Suggest simplifying or decomposing.

**Know when to reset:** Thread circling after 2-3 attempts? `/clear` and start fresh. Avoid sunk-cost fallacy — a clean start is often faster. Each new feature deserves fresh context.

**For routing bugs:** Always check `src/routes.js` first, then verify links use `ROUTES.*` functions, not hardcoded strings.

---

## Student Context

- **Machine:** Apple Silicon Mac (M1/M2/M3) — Homebrew at `/opt/homebrew`
- **Shell:** zsh
- **Tools installed:** Homebrew, Git, Node.js, npm
- **IDE:** VS Code
- **GitHub:** https://github.com/kwtamayo/claude-code-course
- **Learning style:** Practical, wants to understand WHY, pushes back on unnecessary complexity

