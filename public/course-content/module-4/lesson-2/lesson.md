---
{
  "moduleId": "module-4",
  "lessonId": "lesson-2",
  "title": "Plan & Build Your Dashboard",
  "timeEstimate": "25 minutes",
  "prerequisites": ["module-4-lesson-1"],
  "learningObjectives": [
    "Use plan mode to design a project before any code is written",
    "Review and shape a plan before approving it",
    "Watch Claude Code execute an approved plan and build a full React project",
    "Run a development server and see your app in the browser",
    "Apply the security checklist from Module 3 to a new project"
  ],
  "validation": {
    "tasks": [
      {
        "id": "verify-project-structure",
        "description": "Run ls src/ in your daily-planner project and paste the output",
        "type": "paste-output",
        "expectedPatterns": [
          "(App|app|index)",
          "\\.(jsx|tsx|js|ts|css)"
        ],
        "hints": [
          "Make sure you're in the project: cd ~/Developer/daily-planner",
          "Then run: ls src/",
          "You should see files like App.jsx or App.tsx and possibly a components folder"
        ]
      },
      {
        "id": "verify-dev-server",
        "description": "Run npm run dev and paste the first few lines of output showing the local URL",
        "type": "paste-output",
        "expectedPatterns": [
          "localhost",
          "(5173|5174|5175|3000|3001)"
        ],
        "hints": [
          "In your project folder, run: npm run dev",
          "You should see a URL like http://localhost:5173/",
          "Copy the lines showing the server is ready"
        ]
      },
      {
        "id": "verify-gitignore",
        "description": "Run cat .gitignore in your project and paste the output",
        "type": "paste-output",
        "expectedPatterns": [
          "node_modules"
        ],
        "hints": [
          "Run: cat .gitignore",
          "You should see node_modules listed",
          "If the file doesn't exist, follow the instructions above to create it"
        ]
      },
      {
        "id": "verify-package-json",
        "description": "Run grep react package.json and paste the output to confirm React is installed",
        "type": "paste-output",
        "expectedPatterns": [
          "react",
          "\\d+\\."
        ],
        "hints": [
          "Run: grep react package.json",
          "You should see react and react-dom with version numbers"
        ]
      }
    ]
  }
}
---

# Plan & Build Your Dashboard

In Lesson 1 you installed Claude Code and learned about plan mode. Now you'll use it.

This lesson has two phases: first you'll design your dashboard through a planning conversation, then you'll watch Claude Code build it. By the end, you'll have a running web app in your browser.

## Set Up the Project Folder

Create the folder for your project and navigate into it:

```bash
mkdir -p ~/Developer/daily-planner
cd ~/Developer/daily-planner
```

## Launch Claude Code in Plan Mode

Start Claude Code:

```bash
claude
```

**First-time setup:** Claude Code will ask you to log in. Select option 1 (Claude account with subscription). Your browser opens — log in and authorize. You only do this once.

> **Browser didn't open?** Press `c` in your Terminal to copy the login URL, then paste it into your browser.

Once you're at the Claude Code prompt, set up your session:

**Step 1 — Enable plan mode:** Press **Shift+Tab** until the footer shows `Plan mode`. This ensures Claude Code will propose a plan before touching anything.

**Step 2 — Enable auto-accept for file edits:** Press **Shift+Tab** once more. You should see both plan mode active and auto-accept for edits enabled. When building an entire project from scratch, you don't want to manually approve every file.

> **Make this a habit.** Every time you open Claude Code: Shift+Tab to plan mode, Shift+Tab again for auto-accept. This resets when you close Claude Code, so you'll do it at the start of each session.

## Describe What You Want

Now give Claude Code your prompt. Don't think about code — just describe what you want:

```
I want to build a personal Daily Planner web app using React. It should have a calendar to see the current date and week, a task list where I can add and check off to-dos, a notes section for free writing, and a habit tracker to check off daily habits. Make it look clean and modern with some example data so I can see how it looks right away.
```

Claude Code will **not** start building yet. In plan mode, it proposes an approach first.

## Review the Plan

You'll see something like a structured breakdown — the files it plans to create, how it'll organize the components, what each piece will do.

Read through it. A few things to look for:

- **Does the structure make sense?** You should see separate files for each section (calendar, tasks, notes, habits).
- **Is there anything you don't want?** If it's proposing something you didn't ask for, say so.
- **Are there things you'd change?** This is your chance to shape it before any code is written.

When Claude Code is done proposing, it will show an approval prompt like this:

```
Claude has written up a plan and is ready to execute. Would you like to proceed?

  1. Yes, clear context and auto-accept edits
  2. Yes, auto-accept edits
  3. Yes, manually approve edits
  4. Type here to tell Claude what to change
```

Here's what each option means:

| Option | When to use it |
|---|---|
| **1. Yes, clear context + auto-accept** | Fresh start — clears the planning conversation and builds. Good if context is getting large. |
| **2. Yes, auto-accept edits** | Most common choice. Proceeds with auto-accept for file edits — no need to approve each file one by one. |
| **3. Yes, manually approve edits** | If you want to review every file before it's written. Tedious for a full project build. |
| **4. Type here to tell Claude what to change** | Use this to push back on the plan before building. |

**If you're happy with the plan:** choose option **2**.

**If you want changes first:** choose option **4** and describe what you'd like adjusted. For example:

> "Skip the calendar — just tasks, notes, and habits."

> "Keep it simpler — two columns, not a grid."

Claude Code will revise the plan and show you the approval prompt again.

:::info
**This conversation is the work.** In execute mode, you write a prompt and wait. In plan mode, you *participate* — you make decisions about your project before any code exists. The planning conversation isn't overhead; it's where the important choices happen.
:::

## Watch It Build

Once you approve, Claude Code starts building. You'll see it create files one by one — the project config, each component, the CSS, everything.

If it asks for permission to run a command like `npm install`, select option 2 ("don't ask again for this command"). You'll only need to do this once per command type.

When it finishes, exit:

```
/exit
```

## See Your Dashboard

Install dependencies if Claude Code didn't already:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

:::warning
**Port already in use?** Find the Terminal tab running your other dev server and press `Ctrl + C` to stop it, then run `npm run dev` again.
:::

Open the URL in your browser (usually `http://localhost:5173`). You should see your Daily Planner with all the sections you designed.

**Take a moment.** You went from an empty folder to a running web application — and you made real decisions about what got built before a single line of code was written.

::validate[verify-project-structure]

::validate[verify-dev-server]

## Security Checkpoint

Remember Module 3? Every project needs a `.gitignore` before its first commit. Two things must never end up on GitHub: `node_modules/` (thousands of files that don't belong to you) and `.env` (your secrets). Claude Code usually creates a `.gitignore` — but not always.

```bash
cat .gitignore
```

> **No .gitignore?** Claude Code didn't create one. Make it now:
> ```bash
> printf 'node_modules/\n.env\ndist/\n' > .gitignore
> ```

If `node_modules/` or `.env` are missing from an existing `.gitignore`:

```bash
echo 'node_modules/' >> .gitignore
echo '.env' >> .gitignore
```

::validate[verify-gitignore]

Verify React is installed:

```bash
grep react package.json
```

::validate[verify-package-json]

## What Just Happened

Compare this to how most people first use AI coding tools: paste a prompt, get code, hope it's right. You did something different — you had a conversation about what to build, shaped the approach, and *then* let it build. The output reflects decisions you made, not just defaults Claude Code chose.

That's the pattern you'll use for every new feature in this course.

## Quick Reference

```bash
# Session startup ritual
claude                    # Launch Claude Code
# Shift+Tab → plan mode
# Shift+Tab → auto-accept edits

# After building
npm install               # Install dependencies
npm run dev               # Start dev server
# Ctrl + C                # Stop dev server
```

---

**Next:** [Lesson 3: Understanding What Got Built →](/course/module/4/lesson/3)

**Previous:** [Lesson 1: Meet Claude Code](/course/module/4/lesson/1)

**Module Overview:** [Module 4: Web Dashboard - Layout & Setup](/course/module/4)
