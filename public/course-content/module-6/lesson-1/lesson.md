---
{
  "moduleId": "module-6",
  "lessonId": "lesson-1",
  "title": "Your Dashboard's Memory",
  "timeEstimate": "15 minutes",
  "prerequisites": ["module-5-lesson-3"],
  "learningObjectives": [
    "Understand what localStorage is and how it works",
    "Read and understand the persistence code Claude Code generated for your dashboard",
    "Learn when to use /clear and /compact to manage Claude Code context"
  ],
  "validation": {
    "tasks": [
      {
        "id": "verify-localstorage",
        "description": "Run grep -rn 'localStorage' src/ and paste the output",
        "type": "paste-output",
        "expectedPatterns": ["localStorage"],
        "hints": [
          "Run: grep -rn 'localStorage' src/",
          "You should see lines from your component files showing localStorage.getItem or localStorage.setItem",
          "If you see nothing, follow the callout above before continuing"
        ]
      }
    ]
  }
}
---

# Your Dashboard's Memory

When Claude Code built your dashboard in Module 4, it made a lot of decisions without asking. File names, folder structure, how components talk to each other — and how your data gets stored between sessions.

One of the most important skills in AI-assisted development is being able to **read and understand code that was generated for you**. Not just accept it — understand it. That's what this lesson is about.

Let's look at how your dashboard handles data persistence.

## What is localStorage?

Browsers include a small built-in storage area called **localStorage** — a simple key-value store that persists between page refreshes and browser restarts.

Think of it as a sticky note inside the browser. Your app writes something down, and it's still there next time — even after you close the tab.

```
localStorage.setItem('tasks', '[...]')   // write
localStorage.getItem('tasks')            // read later
```

It lives only on this device, in this browser. It has a ~5MB limit. But for a personal dashboard, it's exactly the right tool.

## What Claude Code Built

Let's see how your dashboard is actually storing data. Run this in your `daily-planner` folder:

```bash
cd ~/Developer/daily-planner
grep -rn 'localStorage' src/
```

You'll likely see output from several component files — lines showing `localStorage.getItem` and `localStorage.setItem` scattered across your task list, habit tracker, and notes components.

**Claude Code added this automatically.** Persistence for interactive widgets is considered a best practice, so it included it without being asked. That's one of the benefits of AI-assisted development — it brings experience to your code.

:::info
**If grep shows no output**, Claude Code took a different approach with your project. Add persistence now with this prompt, then continue:

```
Add localStorage persistence to my task list, habit tracker, and notes components so their data is saved between page refreshes.
```
:::

::validate[verify-localstorage]

## Understanding the Pattern

Somewhere in your components, you'll find some version of this pattern:

```javascript
// 1. Read saved data when the component loads
const [tasks, setTasks] = useState(() => {
  return JSON.parse(localStorage.getItem('tasks') || '[]')
})

// 2. Write data back whenever it changes
function addTask(task) {
  const next = [...tasks, task]
  setTasks(next)
  localStorage.setItem('tasks', JSON.stringify(next))
}
```

Three moving parts:

| Part | What it does |
|---|---|
| **Read on load** | `useState` initializes from localStorage instead of hardcoded data |
| **Write on change** | Every update saves the new value back |
| **JSON** | localStorage only stores strings, so arrays and objects get converted |

Open one of your component files — `TaskList.jsx` or `HabitTracker.jsx` — and find this pattern in your actual code. It won't look identical to the example above, but the structure will be the same: read on load, write on change.

This is what it means to read generated code: not just knowing it works, but understanding *why* it works.

## Managing Context: /clear and /compact

You've been using Claude Code across multiple sessions now. Something worth knowing: **every message in a session uses up context**. Claude Code can only hold a certain amount of conversation history at once. As sessions get longer, it starts to lose track of earlier details — a problem called context rot.

Two commands help:

**`/compact`** — Summarizes the conversation so far into a shorter form. Use this when you want to keep working in the same session but free up space.

**`/clear`** — Wipes the conversation entirely and starts fresh. Use this when you're switching to a new task, or when a conversation has gone off-track and a clean start is faster.

A simple rule:
- Starting something new? `/clear` first.
- Mid-task and running long? `/compact` to make room.
- Circling without progress? `/clear` and try a different approach.

In Lesson 2, you'll start a fresh Claude Code session for the settings panel. That's a perfect `/clear` moment — new task, clean slate.

## What's Next

Your dashboard stores its data. But everything about how it *looks and behaves* — the city in the weather widget, what widgets appear, how it greets you — is still locked in the code.

In **Lesson 2**, you'll use plan mode to add a settings panel that makes your dashboard configurable. And you'll see why some tasks are worth planning before building.

---

**Next:** [Lesson 2: Plan Before You Build](/course/module/6/lesson/2)

**Module Overview:** [Module 6: Data Persistence](/course/module/6)
