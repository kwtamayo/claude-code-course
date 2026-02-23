---
{
  "moduleId": "module-4",
  "lessonId": "lesson-3",
  "title": "Making It Yours",
  "timeEstimate": "20 minutes",
  "prerequisites": ["module-4-lesson-2"],
  "learningObjectives": [
    "Edit component text and see live changes via hot module replacement",
    "Modify CSS values to customize the dashboard's appearance",
    "Use Claude Code to make iterative changes to your project",
    "Initialize a Git repository and make a meaningful first commit",
    "Push your project to GitHub"
  ],
  "validation": {
    "tasks": [
      {
        "id": "verify-heading-change",
        "description": "Change the dashboard title to include your name, then run grep -ri 'your-name' src/ and paste the output (using your actual name)",
        "type": "paste-output",
        "expectedPatterns": [
          "src/"
        ],
        "hints": [
          "Open the App file in VS Code: code src/App.jsx (or App.tsx)",
          "Find the main heading or title text",
          "Change it to include your name, like 'Alex's Daily Planner'",
          "Save the file, then search for it: grep -ri 'alex' src/ (use your own name)"
        ]
      },
      {
        "id": "verify-git-init",
        "description": "Run git status in your daily-planner project and paste the first few lines",
        "type": "paste-output",
        "expectedPatterns": [
          "On branch (main|master)"
        ],
        "hints": [
          "Navigate to your project: cd ~/Developer/daily-planner",
          "If not a git repo yet, run: git init",
          "Then run: git status"
        ]
      },
      {
        "id": "verify-first-commit",
        "description": "Stage and commit your project, then run git log --oneline and paste the output",
        "type": "paste-output",
        "expectedPatterns": [
          "[a-f0-9]{7}"
        ],
        "hints": [
          "Stage all files: git add .",
          "Commit: git commit -m 'Initial commit: Daily Planner dashboard'",
          "Then run: git log --oneline"
        ]
      },
      {
        "id": "verify-github-push",
        "description": "After pushing to GitHub, run git remote -v and paste the output",
        "type": "paste-output",
        "expectedPatterns": [
          "origin.*github\\.com",
          "(fetch|push)"
        ],
        "hints": [
          "Create a new repo on GitHub called 'daily-planner'",
          "Add the remote: git remote add origin https://github.com/yourusername/daily-planner.git",
          "Push: git push -u origin main",
          "Then run: git remote -v"
        ]
      }
    ]
  }
}
---

# Making It Yours

You have a running dashboard that Claude Code built. You understand how the files fit together. Now let's make it **yours** — customize it, save it with Git, and push it to GitHub.

This is the lesson where you stop being a spectator and start being a builder.

## The Magic of Hot Reload

Start your dev server if it's not already running:

```bash
cd ~/Developer/daily-planner
npm run dev
```

Open the URL in your browser (usually `http://localhost:5173`). Now here's the magic: **leave the browser open and edit a file.** The browser updates automatically — no refresh needed.

This is called **hot module replacement** (HMR). Vite watches your files and pushes changes to the browser the instant you save. It makes development feel immediate and interactive.

### Change the Title

Open a new Terminal tab (`Cmd + T`) — your dev server is running in the current one and needs to stay running. Then open the main App file in VS Code:

```bash
code src/App.jsx
```

> **File not found?** Try `code src/App.tsx` — Claude Code may have used TypeScript.

Find the main heading or title text. Use `Cmd + F` in VS Code to search for words like "Planner" or "Dashboard" — that should find it. It's usually inside an `<h1>` or `<h2>` tag. Change it to include your name:

```
Alex's Daily Planner
```

Save the file (`Cmd + S`). Watch your browser — it updates instantly.

::validate[verify-heading-change]

### Change a Color

Now let's change how it looks. Open one of the CSS files:

```bash
code src/App.css
```

Use `Cmd + F` to search for `#` — this finds **hex color codes** like `#7c3aed` (purple) or `#3b82f6` (blue). Pick any hex code you find and change it to a different one:

- `#3b82f6` — blue
- `#10b981` — green
- `#f59e0b` — amber
- `#ef4444` — red

Save the file and watch the browser update.

> **Seeing `var(--something)` instead of colors?** Those are CSS variables — named shortcuts for color values. Look near the top of the file for a `:root {` section where they're defined. That's where you'll find the actual hex codes to change.

> **Don't worry about "breaking" things.** CSS changes are purely visual — you can always change them back. This is what branches are for, too (remember Module 2?).

## Use Claude Code for a Bigger Change

Editing individual values is fine, but Claude Code can handle larger changes. Let's use it to update the color scheme of your entire dashboard.

Open a new Terminal tab (or stop the dev server with `Ctrl + C`) and launch Claude Code:

```bash
cd ~/Developer/daily-planner
claude
```

Try a prompt like:

```
Change the color scheme of my dashboard to use blue as the primary color. Update the header, buttons, and accent colors to use a cohesive blue palette.
```

Claude Code will read your existing CSS files and update them. When it's done:

1. Exit Claude Code: type `/exit` or press `Ctrl + C`
2. If your dev server stopped, restart it: `npm run dev`
3. Check the browser — your dashboard should look different.

This is the workflow you'll use going forward:

1. **Want a small change?** Edit the file yourself in VS Code.
2. **Want a bigger change?** Describe it to Claude Code and let it handle multiple files.
3. **Either way:** Review what changed and make sure you're happy with it.

> **Experiment freely.** Try asking Claude Code for other changes — a different layout, rounded corners, a dark mode. The worst that can happen is you don't like it, and you can always ask Claude Code to undo it or use `git checkout` to revert (once we set up Git next).

This is how real development works — you try something, see what happens, and adjust. And when you hit a wall or get an error you don't understand, you describe it to Claude Code and work through it together. You're never stuck alone.

## Save Your Work with Git

Time to use everything you learned in Module 2. Your project isn't tracked by Git yet — let's fix that.

### Initialize the Repository

```bash
cd ~/Developer/daily-planner
git init
```

Check the status:

```bash
git status
```

You'll see a lot of untracked files — that's everything Claude Code created. But notice: `node_modules/` should NOT appear in the list because your `.gitignore` is protecting it.

::validate[verify-git-init]

### Your First Commit

Stage everything:

```bash
git add .
```

Now run `git status` again:

```bash
git status
```

Notice how the files changed from **red** (untracked) to **green** (staged). That means Git is ready to include them in your next commit.

Now commit:

```bash
git commit -m 'Initial commit: Daily Planner dashboard'
```

Check your history:

```bash
git log --oneline
```

::validate[verify-first-commit]

You now have a snapshot of your project that you can always return to. Every change from here forward is tracked.

## Push to GitHub

Let's back up your project to GitHub — just like you did in Module 2 Lesson 2.

### Step 1: Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click **+** → **New repository**
3. Name it `daily-planner`
4. Leave it as **Public** (or choose Private if you prefer)
5. **Do NOT** check any initialization boxes (no README, no .gitignore — you already have these)
6. Click **Create repository**

### Step 2: Connect and Push

Copy the HTTPS URL from GitHub, then run these commands — but **replace `yourusername` with your actual GitHub username first:**

```bash
git remote add origin https://github.com/yourusername/daily-planner.git
git push -u origin main
```

> **⚠️ Don't copy this literally!** Change `yourusername` to YOUR GitHub username. For example, if your username is `alexsmith`, the URL would be `https://github.com/alexsmith/daily-planner.git`.

> **Getting "Authentication failed"?** This usually means you didn't replace `yourusername`, or GitHub needs you to use a personal access token instead of your password. To fix the URL: `git remote set-url origin https://github.com/YOUR-ACTUAL-USERNAME/daily-planner.git`. For token setup, see [GitHub's guide](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).

Verify the connection:

```bash
git remote -v
```

::validate[verify-github-push]

Go check GitHub in your browser — your entire Daily Planner project should be there, with all its files and your commit history.

## What You've Accomplished

Look at what you did across these three lessons:

| What | How |
|------|-----|
| Scaffolded a full React project | Claude Code + a well-crafted prompt |
| Understood the file structure | Reading code with `ls`, `head`, and VS Code |
| Learned React vocabulary | Components, JSX, imports, App.jsx |
| Customized the dashboard | Direct editing + Claude Code for bigger changes |
| Version controlled your project | `git init`, `add`, `commit` |
| Backed up to the cloud | `git push` to GitHub |

You went from zero to a personalized, version-controlled web application hosted on GitHub. That's a real accomplishment.

## What's Next

Right now your dashboard shows **static placeholder data** — the tasks, calendar events, and habits are hardcoded. In Module 5, you'll connect it to real APIs to bring in live data like weather, news, or anything else you want on your daily planner.

Your dashboard is about to come alive.

## Quick Reference Card

```bash
# Claude Code workflow
claude                              # Start Claude Code in current folder
# Describe what you want → Claude Code builds it
# Review → iterate

# Development
npm run dev                         # Start dev server (with hot reload)
code src/App.jsx                    # Open a file in VS Code
# Cmd + S                           # Save file → browser auto-updates

# Git (for your project)
git init                            # Initialize repo
git add .                           # Stage all files
git commit -m 'message'             # Commit snapshot
git remote add origin URL           # Connect to GitHub
git push -u origin main             # First push to GitHub
git push                            # Subsequent pushes
```

## Key Concepts

| Term | Meaning |
|------|---------|
| **Hot module replacement (HMR)** | Vite feature that instantly updates the browser when you save a file |
| **Iterative prompting** | Using Claude Code repeatedly to refine your project — small changes, one at a time |
| **CSS color values** | Named colors (`blue`), hex codes (`#3b82f6`), or RGB values that define colors |
| **git init** | Initialize a new Git repository in the current folder |
| **Origin** | The conventional name for your main remote (GitHub) |

---

**Previous:** [Lesson 2: Understanding What Got Built](/course/module/4/lesson/2)

**Module Overview:** [Module 4: Web Dashboard - Layout & Setup](/course/module/4)
