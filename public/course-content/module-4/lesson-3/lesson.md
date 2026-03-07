---
{
  "moduleId": "module-4",
  "lessonId": "lesson-3",
  "title": "Understanding What Got Built",
  "timeEstimate": "20 minutes",
  "prerequisites": ["module-4-lesson-2"],
  "learningObjectives": [
    "Understand the role of each file in a Vite + React project",
    "Recognize JSX as HTML-like syntax inside JavaScript",
    "Understand components as reusable building blocks of a UI",
    "Read a React component and identify its structure",
    "See how App.jsx composes the dashboard from smaller components"
  ],
  "validation": {
    "tasks": [
      {
        "id": "verify-app-file",
        "description": "Run head -30 src/App.jsx (or App.tsx) and paste the output to see the main app file",
        "type": "paste-output",
        "expectedPatterns": [
          "(import|from|require)",
          "(function|const|export|return)"
        ],
        "hints": [
          "Run: head -30 src/App.jsx",
          "If that doesn't work, try: head -30 src/App.tsx",
          "You should see import statements and a function that puts your dashboard together"
        ]
      },
      {
        "id": "verify-project-files",
        "description": "Run find src/ -name '*.jsx' -o -name '*.tsx' | head -10 and paste the output to see all your source files",
        "type": "paste-output",
        "expectedPatterns": [
          "src/",
          "\\.(jsx|tsx)"
        ],
        "hints": [
          "Run: find src/ -name '*.jsx' -o -name '*.tsx' | head -10",
          "This finds all React files in your project",
          "You should see several files — one for each section of your dashboard"
        ]
      },
      {
        "id": "verify-component-structure",
        "description": "Pick any component file from the list above, run cat on it, and paste the output",
        "type": "paste-output",
        "expectedPatterns": [
          "(function|const|export)",
          "(return|=>)"
        ],
        "hints": [
          "Choose one of the files from the previous step (not App.jsx)",
          "Run: cat src/components/Calendar.jsx (or whatever your file is called)",
          "Scroll through and look for: imports, a function definition, a return with JSX, and an export"
        ]
      }
    ]
  }
}
---

# Understanding What Got Built

You designed a dashboard, approved a plan, and watched Claude Code build it. Now let's understand what's actually in those files — because you should never work with code you can't read.

You don't need to memorize anything here. The goal is **recognition** — when you see these patterns later, you'll know what they are.

## The Project Map

Let's start with the big picture. In your Terminal:

```bash
cd ~/Developer/daily-planner
ls
```

You'll see something like this (your exact files may vary slightly):

| File/Folder | What It Does |
|-------------|-------------|
| `package.json` | Lists your project's dependencies and scripts (like `npm run dev`) |
| `package-lock.json` | Locks exact versions of every dependency for consistent installs |
| `vite.config.js` | Configuration for Vite, the build tool that runs your dev server |
| `index.html` | The single HTML page that loads your React app |
| `node_modules/` | Downloaded dependencies — never edit, never commit |
| `public/` | Static files like images or icons |
| `src/` | **Your source code — this is where everything important lives** |
| `.gitignore` | Files Git should ignore (you verified this in Lesson 2!) |

The most important folder is `src/`. That's where your dashboard code lives.

## Inside src/

| File | Purpose |
|------|---------|
| `main.jsx` (or `main.tsx`) | The **entry point** — the first file that runs. It loads your App into the browser. |
| `App.jsx` (or `App.tsx`) | The **root component** — assembles all the pieces of your dashboard together. |
| `.css` files | Styles — colors, spacing, layout. |
| `components/` | A folder containing each section of your dashboard as a separate file. |

> **Your filenames might be slightly different.** Claude Code might use `.tsx` instead of `.jsx`, or organize files differently. That's fine — the concepts are the same.

Think of it like a building: `main.jsx` is the foundation, `App.jsx` is the blueprint, and the component files are the individual rooms.

## Your Source Files

Let's see all the React files in your project:

```bash
find src/ -name '*.jsx' -o -name '*.tsx' | head -10
```

::validate[verify-project-files]

You should see several files — one for each section of your dashboard, plus the main App file. Notice how Claude Code broke your dashboard into separate pieces, just as it proposed in the plan.

This separation is intentional. In React, you break your interface into **components** — small, self-contained pieces that each handle one job. This makes code easier to understand, easier to change, and easier to reuse.

## What is a Component?

A component is a **function that returns what should appear on screen**. That's it. Every piece of your dashboard — the calendar, the task list, even the header — is a component.

Every React component has **four ingredients**. They won't always appear in this exact order — real code is messier than textbook examples — but every component has them:

```
1. Imports                     ← bring in tools and styles
2. A function                  ← the component itself
3. A return with JSX           ← describe what it looks like
4. An export                   ← make it available to other files
```

Let's see these in action.

## Reading the Main App File

Your App component is the **root** — it pulls in all the other components and arranges them on the page.

```bash
head -30 src/App.jsx
```

> **Getting "No such file"?** Try `head -30 src/App.tsx` instead.

::validate[verify-app-file]

At the top, you'll see `import` statements. Each one brings in a component or a style file. Something like:

```jsx
import Calendar from './components/Calendar'
import TaskList from './components/TaskList'
```

Further down, you'll see something like:

```jsx
function App() {
  return (
    <div className="app">
      <Calendar />
      <TaskList />
      <Notes />
      <HabitTracker />
    </div>
  )
}
```

Those angle brackets (`<Calendar />`, `<TaskList />`) aren't HTML — they're **JSX**. Each one says "render this component here." Compare this to the plan Claude Code proposed in Lesson 2: the file structure you approved is exactly what got built.

## What is JSX?

JSX looks like HTML, but it lives inside JavaScript files. React uses it to describe what should appear on screen.

| HTML | JSX |
|------|-----|
| `<div class="box">` | `<div className="box">` |
| `<h1>Hello</h1>` | `<h1>Hello</h1>` |
| Self-closing: `<img>` | Self-closing: `<img />` |

The main differences: JSX uses `className` instead of `class` (because `class` is a reserved word in JavaScript), and all tags must be closed.

## Reading a Component

Now let's look inside one of your components. Pick any component file from the `find` output above (not the App file) and read the whole thing:

```bash
cat src/components/Calendar.jsx
```

> **Use your own filename** — whatever path showed up in your `find` results.

::validate[verify-component-structure]

Don't worry if the code looks complex. Scan for the four ingredients:

1. **Imports** — lines starting with `import` at the top
2. **A function** — look for `function Calendar()` or `const Calendar = () =>`
3. **A return with JSX** — inside the function, `return (` followed by angle brackets
4. **An export** — usually `export default Calendar` at the bottom

## How It All Fits Together

```
Browser loads index.html
  → index.html loads main.jsx
    → main.jsx renders <App />
      → App.jsx imports and renders your components:
        → <Calendar />
        → <TaskList />
        → <Notes />
        → <HabitTracker />
```

App is the conductor. Each component is a musician. The plan you approved in Lesson 2 was the sheet music.

## Quick Reference Card

```bash
# Explore your project
ls                                                      # See top-level files
ls src/                                                 # See source files
find src/ -name '*.jsx' -o -name '*.tsx' | head -10     # Find all React files
head -30 src/App.jsx                                    # See the main App file
cat src/components/SomeComponent.jsx                    # Read a component file
```

## Key Concepts

| Term | Meaning |
|------|---------|
| **JSX** | HTML-like syntax inside JavaScript — describes what appears on screen |
| **Component** | A function that returns JSX — one self-contained piece of your UI |
| **Import/Export** | How JavaScript files share code with each other |
| **App.jsx** | The root component that assembles all other components |
| **main.jsx** | The entry point that loads App into the browser |
| **Props** | Settings passed from a parent component to a child (we'll use these in Module 5) |

---

**Next:** [Lesson 4: Making It Yours →](/course/module/4/lesson/4)

**Previous:** [Lesson 2: Plan & Build Your Dashboard](/course/module/4/lesson/2)

**Module Overview:** [Module 4: Web Dashboard - Layout & Setup](/course/module/4)
