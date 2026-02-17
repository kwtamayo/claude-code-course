---
{
  "moduleId": "module-4",
  "lessonId": "lesson-2",
  "title": "Understanding What Got Built",
  "timeEstimate": "20 minutes",
  "prerequisites": ["module-4-lesson-1"],
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
        "id": "verify-src-contents",
        "description": "Run ls src/ in your daily-planner project and paste the output",
        "type": "paste-output",
        "expectedPatterns": [
          "(App|app|index)",
          "\\.(jsx|tsx|js|ts|css)"
        ],
        "hints": [
          "Navigate to your project: cd ~/Developer/daily-planner",
          "Then run: ls src/",
          "You should see source files like App.jsx or App.tsx, and possibly a components folder"
        ]
      },
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
        "description": "Pick any component file from the list above, run head -15 on it, and paste the output",
        "type": "paste-output",
        "expectedPatterns": [
          "(function|const|export)",
          "(return|=>)"
        ],
        "hints": [
          "Choose one of the files from the previous step (not App.jsx)",
          "Run: head -15 src/components/Calendar.jsx (or whatever your file is called)",
          "You should see a function that returns JSX (HTML-like code)"
        ]
      }
    ]
  }
}
---

# Understanding What Got Built

Claude Code generated your entire Daily Planner in minutes. That's powerful — but you should never deploy code you don't understand. In this lesson, we'll take a tour of what got built so you can confidently read and navigate your project.

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
| `.gitignore` | Files Git should ignore (you verified this in Lesson 1!) |

The most important folder is `src/`. That's where your dashboard code lives.

## Inside src/

```bash
ls src/
```

::validate[verify-src-contents]

Here's what the key files typically are:

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

You should see several files — one for each section of your dashboard (calendar, tasks, notes, habits), plus the main App file. Claude Code broke your dashboard into separate pieces.

This separation is intentional. In React, you break your interface into **components** — small, self-contained pieces that each handle one job. This makes code easier to understand, easier to change, and easier to reuse.

## What is a Component?

A component is a **function that returns what should appear on screen**. That's it. Every piece of your dashboard — the calendar, the task list, even the header — is a component.

Here's the pattern every React component follows:

```
1. Import what you need        ← bring in tools and styles
2. Define a function           ← the component itself
3. Return JSX                  ← describe what it looks like
4. Export the function         ← make it available to other files
```

Let's see this in action.

## Reading the Main App File

Your App component is the **root** — it pulls in all the other components and arranges them on the page.

```bash
head -30 src/App.jsx
```

> **Getting "No such file"?** Try `head -30 src/App.tsx` instead. Claude Code may have used TypeScript (`.tsx`) rather than JavaScript (`.jsx`). Both work the same way for our purposes.

::validate[verify-app-file]

At the top, you'll see `import` statements. Each one brings in a component or a style file. Something like:

```jsx
import Calendar from './components/Calendar'
import TaskList from './components/TaskList'
```

These imports tell JavaScript: "Go find this file and make its component available here." The `./` means "in the current directory."

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

Those angle brackets (`<Calendar />`, `<TaskList />`) aren't HTML — they're **JSX**. Each one says "render this component here." Your exact component names will depend on what Claude Code chose, but the pattern is the same: the App component assembles your dashboard by placing each section where it belongs.

## What is JSX?

JSX looks like HTML, but it lives inside JavaScript files. React uses it to describe what should appear on screen.

If you've seen HTML before, JSX will look familiar:

| HTML | JSX |
|------|-----|
| `<div class="box">` | `<div className="box">` |
| `<h1>Hello</h1>` | `<h1>Hello</h1>` |
| Self-closing: `<img>` | Self-closing: `<img />` |

The main differences: JSX uses `className` instead of `class` (because `class` is a reserved word in JavaScript), and all tags must be closed.

Don't overthink this. JSX is just a way to write HTML inside JavaScript. You'll get comfortable with it as you make changes in Lesson 3.

## Reading a Component

Let's look inside one of your components. Pick any component file from the `find` output above (not the App file) and look at the first 15 lines:

```bash
head -15 src/components/Calendar.jsx
```

> **Use your own filename.** Replace `src/components/Calendar.jsx` with whatever path showed up in your `find` results. For example, it might be `src/components/TaskList.tsx` or `src/Calendar.jsx`.

::validate[verify-component-structure]

You'll see the four-part pattern:

```jsx
// 1. Import what you need
import './Calendar.css'

// 2. Define a function (this IS the component)
function Calendar() {
  // ... some logic here ...

  // 3. Return JSX (what appears on screen)
  return (
    <div className="calendar">
      <h2>Calendar</h2>
      {/* ... calendar grid ... */}
    </div>
  )
}

// 4. Export it
export default Calendar
```

**That's a complete React component.** A function that returns JSX. Everything inside the `return (...)` describes what this section of your dashboard looks like.

> **You might see `const Calendar = () => {`** instead of `function Calendar()`. These are two ways to write the same thing in JavaScript. Both work — Claude Code might use either style.

## How It All Fits Together

Here's the full picture:

```
Browser loads index.html
  → index.html loads main.jsx (or main.tsx)
    → main.jsx renders <App />
      → App.jsx imports and renders your components:
        → <Calendar />
        → <TaskList />
        → <Notes />
        → <HabitTracker />
```

Your component names will be different — that's expected. The pattern is the same: App is the conductor that puts all the pieces on stage.

## Quick Reference Card

```bash
# Explore your project
ls                                                      # See top-level files
ls src/                                                 # See source files
find src/ -name '*.jsx' -o -name '*.tsx' | head -10     # Find all React files
head -30 src/App.jsx                                    # See the main App file
head -15 src/components/SomeComponent.jsx               # See a component file
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

**Next:** [Lesson 3: Making It Yours →](/course/module/4/lesson/3)

**Previous:** [Lesson 1: Your First Project with Claude Code](/course/module/4/lesson/1)

**Module Overview:** [Module 4: Web Dashboard - Layout & Setup](/course/module/4)
