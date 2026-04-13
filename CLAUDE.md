# CLAUDE.md — Claude Code Course

## Project Overview

This course is for the tech-savvy professional who's always been curious about software development but too intimidated to go deep. It teaches the foundational technical skills, but more importantly, it teaches you how to work with AI as a collaborator — how to communicate with it, how to know when it's wrong, how to get unstuck when it loops, and how to maintain momentum across sessions. You'll ship a real project to the internet. And you'll walk away with the confidence and judgment to build the next one on your own.

The course platform itself is a React web app — built by a non-developer using the same AI-assisted workflow it teaches. The app is the proof of concept.

**GitHub:** https://github.com/kwtamayo/claude-code-course  
**Dev server:** http://localhost:3000  

---

## Working Philosophy

You are a collaborative building partner, not a code typewriter. Follow these principles:

- **Start with the end vision.** Before jumping into implementation, clarify what success looks like. Then work backward to identify the steps needed. This prevents building the wrong thing efficiently.
- **Always discuss approach before writing code.** Ask clarifying questions first.
- **Break work into small, focused tasks** — one feature or fix per conversation.
- **When something is vague, clarify before implementing.**
- **When stuck, explain what you think is happening** before suggesting fixes.
- **Propose alternatives when you see a better path.** Push back constructively.
- **Explain WHY, not just WHAT.** This student is learning, not just shipping.

---

## Vision-First Development

Before implementing features:

1. **Define the end state** - What does "done" look like for students?
2. **Work backward** - What capabilities are needed to reach that state?
3. **Identify dependencies** - What must exist before this can work?
4. **Then implement** - Now the path forward is clear

---

## Commands

```bash
npm run dev        # Start dev server at http://localhost:3000
npm run build      # Production build (not needed yet)
npm run lint       # Run ESLint
npm install        # Install dependencies after cloning
```

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
│       └── module-1/            # One folder per module
│           └── lesson-1/lesson.md
├── src/
│   ├── components/
│   │   └── ValidationTask.jsx   # "Check My Work" task UI
│   ├── pages/
│   │   ├── HomePage.jsx         # Landing page
│   │   ├── CoursePage.jsx       # All modules overview
│   │   ├── ModulePage.jsx       # Lessons within a module
│   │   ├── LessonPage.jsx       # Markdown content + validation
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
import { ROUTES, ROUTE_PATTERNS } from './routes'

// ROUTES — functions that generate URLs for <Link> components
ROUTES.module(1)        // → "/course/module/1"
ROUTES.lesson(1, 1)     // → "/course/module/1/lesson/1"

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
```

**Markdown files must use route URLs, not file paths:**
```markdown
<!-- ✅ CORRECT -->
[Next Lesson](/course/module/1/lesson/2)

<!-- ❌ WRONG — causes 404s -->
[Next Lesson](../lesson-2/lesson.md)
```

### Course Content

Lesson files live in `public/course-content/` and are fetched at runtime via `fetch()`.

**Lesson frontmatter structure (JSON between `---` delimiters):**
```json
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
        "description": "What the student needs to do",
        "type": "paste-output",
        "expectedPatterns": ["regex pattern"],
        "hints": ["Helpful hint"]
      }
    ]
  }
}
```

---

## Current State

### ✅ Platform Infrastructure (Complete)

- React + Vite + React Router infrastructure
- Routes system (`src/routes.js`) — bulletproof navigation
- All pages built: Home, Course, Module, Lesson, 404
- Markdown rendering with syntax highlighting
- ValidationTask component (display, pattern matching, hints — working)
- Professional CSS design system
- Full navigation: Home → Course → Module → Lesson
- ESLint configured

### 🚧 Course Redesign (In Progress)

The course has been repositioned from "learn to code in a weekend" to "learn to work with AI as a collaborator." All content is being rewritten. The platform infrastructure is solid and stays. The content and module structure is changing.

**What needs to happen:**
1. Update `courseLoader.js` — replace 13-module structure with new 5-module structure
2. Update `CoursePage.jsx` — reflect new modules
3. Update `HomePage.jsx` — new positioning copy
4. Write new lesson content for all modules
5. Revisit validation approach — less prescriptive copy/paste, more exploratory
6. Add localStorage progress tracking (deferred until content is written)

### 📋 New Module Structure

| Module | Title | Focus | Status |
|--------|-------|-------|--------|
| 1 | You're Not Going to Break Anything | Terminal comfort, tools install, environment setup | ⏳ Content needed |
| 2 | How to Talk to Your AI | Prompting, scoping, CLAUDE.md, context management | ⏳ Content needed |
| 3 | Build Something Real | Git/GitHub intro → guided bio site build → judgment skills → debugging | ⏳ Content needed |
| 4 | Put It on the Internet | Deploy to Vercel | ⏳ Content needed |
| 5 | Now Do It Again | Independent project, no hand-holding | ⏳ Content needed |

**Student project:** Link-in-bio site (built in Module 3, deployed in Module 4)

### Key Design Principles for Content

- **Tone is lightweight and light-hearted.** Not prescriptive. Not compliance-driven.
- **Teach judgment, not just commands.** Every technical step is a vehicle for a collaboration skill.
- **Name the feelings.** Intimidation, frustration, the blank terminal. Acknowledge them directly.
- **Validation should feel exploratory, not like a test.** "Did it work? Great." over "Paste your output to prove it."
- **The meta layer is the differentiator.** When to trust AI output, when to push back, when to change your approach entirely.

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

**Know when to reset:**
- Thread circling after 2-3 fix attempts? `/clear` and start fresh
- Context getting muddled? Summarize key points and begin new session
- Avoid sunk-cost fallacy — sometimes a clean start is faster than debugging a confused thread

Use `/clear` liberally. Each new feature deserves fresh context.

**For routing bugs:** Always check `src/routes.js` first, then verify links use `ROUTES.*` functions, not hardcoded strings.

---

## Builder Context

- **Machine:** Apple Silicon Mac (M1/M2/M3) — Homebrew at `/opt/homebrew`
- **Shell:** zsh
- **Tools installed:** Homebrew, Git, Node.js, npm
- **IDE:** Cursor
- **GitHub:** https://github.com/kwtamayo/claude-code-course
- **Learning style:** Practical, wants to understand WHY, pushes back on unnecessary complexity
- **Not a developer.** All technical explanations must be complete — no skipped steps, no assumed knowledge.

---

## When Compacting

Always preserve:
- List of modified files
- Current feature in progress
- Any unresolved routing issues
- Which modules have content vs. need content
- The new course positioning (judgment + collaboration, not "learn to code")

---

## Session Handoffs

When switching between sessions or Claude instances, create a brief handoff to maintain momentum.

**Include:**
- What was just completed
- Current state (working/blocked)
- Files modified in this session
- Next immediate task
- Any unresolved questions

**Example handoff:**
```
Completed: Rewrote courseLoader.js with new 5-module structure
Status: Working — CoursePage renders new modules
Files: courseLoader.js, CoursePage.jsx
Next: Write Module 1 lesson content
Question: How many lessons should Module 1 have?
```
