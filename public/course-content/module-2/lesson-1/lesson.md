---
{
  "moduleId": "module-2",
  "lessonId": "lesson-1",
  "title": "Git Basics",
  "timeEstimate": "20 minutes",
  "prerequisites": ["module-1"],
  "learningObjectives": [
    "Understand what version control is and why developers use it",
    "Configure Git with your name and email",
    "Create a Git repository and make your first commit",
    "View commit history and see changes between versions"
  ],
  "validation": {
    "tasks": [
      {
        "id": "verify-git-config",
        "description": "Verify your Git name and email are configured",
        "type": "paste-output",
        "expectedPatterns": [
          "user\\.name=",
          "user\\.email="
        ],
        "hints": [
          "Run: git config --global --list",
          "You should see user.name and user.email in the output",
          "If not set, run: git config --global user.name 'Your Name'"
        ]
      },
      {
        "id": "create-repo-status",
        "description": "Show git status in your new repository",
        "type": "paste-output",
        "expectedPatterns": [
          "On branch (main|master)"
        ],
        "hints": [
          "First create the repo: mkdir ~/my-first-repo && cd ~/my-first-repo && git init",
          "Then run: git status",
          "You should see 'On branch main' at the top"
        ]
      },
      {
        "id": "first-commit-log",
        "description": "Show your git log after making your first commit",
        "type": "paste-output",
        "expectedPatterns": [
          "commit [a-f0-9]",
          "(Initial commit|first commit|README|readme)"
        ],
        "hints": [
          "After committing, run: git log",
          "You should see your commit with its message",
          "If you haven't committed yet: git add README.md && git commit -m 'Initial commit'"
        ]
      },
      {
        "id": "command-compact-log",
        "description": "What command shows a compact, one-line-per-commit history?",
        "type": "command-match",
        "acceptableAnswers": ["git log --oneline"],
        "hints": [
          "It's a variation of git log with a flag",
          "The flag tells Git to show each commit on one line",
          "Try: git log --oneline"
        ]
      },
      {
        "id": "command-see-changes",
        "description": "What command shows the changes you've made but haven't staged yet?",
        "type": "command-match",
        "acceptableAnswers": ["git diff", "git diff ."],
        "hints": [
          "This command shows the 'difference' between your working files and the last commit",
          "It's two words, starting with 'git'",
          "Try: git diff"
        ]
      }
    ]
  }
}
---

# Git Basics

In Module 1, you learned to create, move, and organize files from the terminal. But what happens when you make a change you regret? What if you want to go back to how things were yesterday? That's where **Git** comes in.

Git is a **version control system** — it tracks every change you make to your files and lets you travel back in time to any previous version. Think of it like the version history in Google Docs, but far more powerful and built for code.

By the end of this lesson, you'll have your own Git repository with real commits — snapshots of your work that you can always return to.

## Why Git Matters

Every professional developer uses Git. Here's why:

- **Undo anything.** Made a mistake? Roll back to a working version.
- **Experiment safely.** Try something risky without fear — you can always go back.
- **Track progress.** See exactly what changed, when, and why.
- **Collaborate.** Work with others without overwriting each other's code (we'll cover this later).

You already have Git installed (we verified that in Module 0). Now let's set it up.

## First-Time Setup

Before you make your first commit, Git needs to know who you are. This information gets attached to every commit you make — like signing your work.

Run these two commands, replacing the placeholder text with your actual name and email:

```bash
git config --global user.name 'Your Name'
git config --global user.email 'your@email.com'
```

> **Use the email associated with your GitHub account** (or the one you plan to use). This connects your commits to your GitHub profile later.

The `--global` flag means this applies to all Git repositories on your computer. You only need to do this once.

**Verify it worked:**

```bash
git config --global --list
```

You should see your name and email in the output.

::validate[verify-git-config]

## Creating Your First Repository

A **repository** (or "repo") is a project folder that Git is tracking. Let's create one:

```bash
mkdir ~/my-first-repo
cd ~/my-first-repo
git init
```

You should see:

```
Initialized empty Git repository in /Users/yourname/my-first-repo/.git/
```

That `.git/` folder is where Git stores all its tracking data. You'll never need to touch it directly — Git manages it for you.

Now check the status of your new repo:

```bash
git status
```

This is your **dashboard** — it tells you what Git sees right now. You'll run this command constantly. Get comfortable with it.

::validate[create-repo-status]

## The Stage-and-Commit Workflow

Git doesn't automatically save every change. Instead, you choose what to save and when. This happens in two steps:

| Step | Command | What It Does |
|------|---------|-------------|
| **Stage** | `git add filename` | Select changes to include in the next snapshot |
| **Commit** | `git commit -m 'message'` | Save a permanent snapshot with a description |

Think of it like taking a photo:
1. **Stage** = arrange who's in the frame
2. **Commit** = click the shutter

### Why Two Steps?

You might change five files but only want to save three of them right now. Staging lets you be selective about what goes into each snapshot.

### Your First Commit

Let's create a file and commit it:

```bash
echo '# My First Repo' > README.md
```

Check what Git sees:

```bash
git status
```

Git shows `README.md` as an **untracked file** — it exists, but Git isn't tracking it yet. Let's fix that:

```bash
git add README.md
```

Run `git status` again. Now the file is under **"Changes to be committed"** — it's staged and ready.

Now save the snapshot:

```bash
git commit -m 'Initial commit'
```

The `-m` flag lets you write a commit message inline. Every commit needs a message describing what changed and why. Good messages save you (and your team) hours of confusion later.

**Check the history:**

```bash
git log
```

You should see your commit with your name, email, date, and message. That's your first piece of recorded history.

::validate[first-commit-log]

## Viewing History

As you make more commits, the history grows. Here are the key commands:

**Full log:**

```bash
git log
```

Shows everything — commit hash, author, date, and message. Press `q` to exit if the log is long.

**Compact log:**

```bash
git log --oneline
```

Shows each commit on one line — just the short hash and message. This is what you'll use most often.

::validate[command-compact-log]

## Making More Changes

Let's make a change and see how Git tracks it.

Edit your README:

```bash
echo 'This is my practice repository for learning Git.' >> README.md
```

Now check what Git sees:

```bash
git status
```

Git shows `README.md` as **modified**. But what exactly changed? That's where `git diff` comes in:

```bash
git diff
```

This shows the exact lines that were added (green with `+`) or removed (red with `-`). It's incredibly useful for reviewing your own work before committing.

::validate[command-see-changes]

Now stage and commit this change:

```bash
git add README.md
git commit -m 'Add description to README'
```

Check your history again:

```bash
git log --oneline
```

You should see two commits now — your complete project history so far.

## Quick Reference Card

```bash
# First-time setup (once per computer)
git config --global user.name 'Your Name'
git config --global user.email 'your@email.com'
git config --global --list        # Verify config

# Create a repository
git init                           # Initialize Git in current folder

# Daily workflow
git status                         # Check what's changed
git diff                           # See exact changes (before staging)
git add filename                   # Stage a file
git add .                          # Stage all changes
git commit -m 'Your message'       # Save a snapshot

# View history
git log                            # Full history
git log --oneline                  # Compact history
```

## Key Concepts

| Term | Meaning |
|------|---------|
| **Repository (repo)** | A project folder tracked by Git |
| **Commit** | A saved snapshot of your project at a point in time |
| **Staging area** | The "holding zone" where you prepare changes before committing |
| **Commit message** | A description of what changed and why |
| **Untracked** | A file Git doesn't know about yet |
| **Modified** | A tracked file that has changes not yet staged |
| **Staged** | Changes ready to be included in the next commit |

---

**Next:** [Lesson 2: Working with GitHub →](/course/module/2/lesson/2)

**Module Overview:** [Module 2: Git Fundamentals](/course/module/2)
