---
{
  "moduleId": "module-4",
  "lessonId": "lesson-4",
  "title": "Making It Yours",
  "timeEstimate": "20 minutes",
  "prerequisites": ["module-4-lesson-3"],
  "learningObjectives": [
    "Edit component text and see live changes via hot module replacement",
    "Modify CSS values to customize the dashboard's appearance",
    "Use Claude Code in execute mode for well-defined changes",
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

You have a running dashboard. You understand how the files fit together. Now let's make it **yours** — customize it, save it with Git, and push it to GitHub.

## The Magic of Hot Reload

Start your dev server if it's not already running:

```bash
cd ~/Developer/daily-planner
npm run dev
```

Open the URL in your browser. Now here's the magic: **leave the browser open and edit a file.** The browser updates automatically — no refresh needed.

This is called **hot module replacement** (HMR). Vite watches your files and pushes changes to the browser the instant you save. It makes development feel immediate and interactive.

### Change the Title

Open a new Terminal tab (`Cmd + T`) — your dev server needs to keep running. Then open the main App file in VS Code:

```bash
code src/App.jsx
```

> **File not found?** Try `code src/App.tsx`

Find the main heading or title text. Use `Cmd + F` in VS Code to search for "Planner" or "Dashboard" — that should find it. Change it to include your name:

```
Alex's Daily Planner
```

Save the file (`Cmd + S`). Watch your browser update instantly.

::validate[verify-heading-change]

### Change a Color

Open a CSS file:

```bash
code src/App.css
```

Use `Cmd + F` to search for `#` — this finds hex color codes like `#7c3aed` (purple) or `#3b82f6` (blue). Pick one and swap it:

- `#3b82f6` — blue
- `#10b981` — green
- `#f59e0b` — amber
- `#ef4444` — red

Save and watch it update.

> **Seeing `var(--something)` instead of colors?** Look near the top of the file for a `:root {` section — that's where CSS variables are defined. Change the values there.

## Use Claude Code for a Bigger Change

Editing individual values is fine for small tweaks. Claude Code handles larger changes — multiple files at once. This is a good moment to notice when to use each:

- **Edit directly** when you know exactly which line to change
- **Use Claude Code** when the change spans multiple files or you're not sure where to look
- **Plan mode** is for figuring out *what* to build. **Execute mode** is for specific, well-defined changes like this one

Launch Claude Code:

```bash
claude
```

This time, **don't** switch to plan mode. Press Shift+Tab once for auto-accept edits, then give it a specific prompt:

```
Change the color scheme of my dashboard to use blue as the primary color. Update the header, buttons, and accent colors to use a cohesive blue palette.
```

Claude Code will read your existing CSS and update it across files. When done:

1. `/exit` to leave Claude Code
2. Restart dev server if needed: `npm run dev`
3. Check the browser

This is the workflow going forward: specific change → execute mode. Open-ended question → plan mode.

> **Experiment freely.** Try other prompts — different layouts, dark mode, rounded corners. The worst outcome is you don't like it, and you can ask Claude Code to revert it. Or use `git checkout` once we set up Git.

## Save Your Work with Git

Time to put everything you learned in Module 2 to use.

### Initialize the Repository

```bash
cd ~/Developer/daily-planner
git init
git status
```

You'll see a lot of untracked files — everything Claude Code created. Notice `node_modules/` should NOT appear because your `.gitignore` is protecting it.

::validate[verify-git-init]

### Your First Commit

```bash
git add .
git status
```

Files changed from red (untracked) to green (staged). Now commit:

```bash
git commit -m 'Initial commit: Daily Planner dashboard'
git log --oneline
```

::validate[verify-first-commit]

You now have a snapshot you can always return to.

## Push to GitHub

### Step 1: Create the Repository

1. Go to [github.com](https://github.com) and sign in
2. Click **+** → **New repository**
3. Name it `daily-planner`
4. Leave it Public (or Private if you prefer)
5. **Do NOT** check any initialization boxes — you already have everything
6. Click **Create repository**

### Step 2: Connect and Push

```bash
git remote add origin https://github.com/yourusername/daily-planner.git
git push -u origin main
```

> **⚠️ Replace `yourusername` with your actual GitHub username.**

> **Getting "Authentication failed"?** Fix the URL: `git remote set-url origin https://github.com/YOUR-ACTUAL-USERNAME/daily-planner.git`

```bash
git remote -v
```

::validate[verify-github-push]

## What You've Accomplished

Across these four lessons:

| What | How |
|------|-----|
| Installed Claude Code | npm install -g |
| Used plan mode to design your dashboard | Shift+Tab → describe → review → approve |
| Built a full React project | Claude Code executed the approved plan |
| Understood the file structure | Reading code with ls, head, cat |
| Learned React vocabulary | Components, JSX, imports, App.jsx |
| Customized the dashboard | Direct editing + Claude Code in execute mode |
| Version controlled your project | git init, add, commit |
| Backed up to GitHub | git push |

You went from zero to a personalized, version-controlled web application on GitHub. And you did it by designing before building — the habit that separates thoughtful developers from frustrated ones.

## What's Next

Your dashboard shows static placeholder data. In **Module 5**, you'll connect it to real APIs — live weather, quotes, anything you want. Your dashboard is about to start talking to the internet.

## Quick Reference

```bash
# Claude Code — execute mode (specific changes)
claude                              # Launch
# Shift+Tab once: auto-accept edits
# Describe the specific change
/exit                               # Leave

# Development
npm run dev                         # Start dev server
code src/App.jsx                    # Open in VS Code
# Cmd + S → browser auto-updates

# Git
git init && git add . && git commit -m 'message'
git remote add origin URL
git push -u origin main
```

---

**Previous:** [Lesson 3: Understanding What Got Built](/course/module/4/lesson/3)

**Module Overview:** [Module 4: Web Dashboard - Layout & Setup](/course/module/4)
