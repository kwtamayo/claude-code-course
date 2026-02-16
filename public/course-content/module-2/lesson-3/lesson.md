---
{
  "moduleId": "module-2",
  "lessonId": "lesson-3",
  "title": "Branches and Workflow",
  "timeEstimate": "20 minutes",
  "prerequisites": ["module-2-lesson-2"],
  "learningObjectives": [
    "Understand why branches exist and when to use them",
    "Create, switch between, and delete branches",
    "Merge a branch back into main",
    "Push branches to GitHub",
    "Follow a professional Git workflow"
  ],
  "validation": {
    "tasks": [
      {
        "id": "create-branch",
        "description": "Create a new branch and paste the output of git branch",
        "type": "paste-output",
        "expectedPatterns": [
          "(main|master)",
          "\\*"
        ],
        "hints": [
          "Create a branch: git branch add-about-page",
          "Then list branches: git branch",
          "The asterisk (*) shows which branch you're on"
        ]
      },
      {
        "id": "branch-commit-log",
        "description": "Switch to your branch, make a commit, and paste git log --oneline",
        "type": "paste-output",
        "expectedPatterns": [
          "[a-f0-9]{7}"
        ],
        "hints": [
          "Switch: git switch add-about-page",
          "Make a change, then: git add . && git commit -m 'Add about page'",
          "Then run: git log --oneline"
        ]
      },
      {
        "id": "command-merge",
        "description": "You're on the main branch. What command merges a branch called 'feature' into main?",
        "type": "command-match",
        "acceptableAnswers": ["git merge feature", "git merge feature/"],
        "hints": [
          "First make sure you're on main (the branch you want to merge INTO)",
          "Then use git merge followed by the branch name",
          "Try: git merge feature"
        ]
      },
      {
        "id": "command-switch-branch",
        "description": "What command switches you to a branch called 'dev'?",
        "type": "command-match",
        "acceptableAnswers": ["git switch dev", "git checkout dev"],
        "hints": [
          "The modern command is 'git switch' followed by the branch name",
          "The older equivalent is 'git checkout' — both work",
          "Try: git switch dev"
        ]
      },
      {
        "id": "command-create-switch",
        "description": "What single command creates a new branch called 'feature' AND switches to it?",
        "type": "command-match",
        "acceptableAnswers": ["git switch -c feature", "git checkout -b feature"],
        "hints": [
          "You can combine creating and switching into one command",
          "With git switch, add the -c flag (for 'create')",
          "Try: git switch -c feature"
        ]
      }
    ]
  }
}
---

# Branches and Workflow

So far, your Git history is a straight line — one commit after another. That works fine when you're working on one thing at a time. But what if you want to try something experimental without risking your working code?

That's what **branches** are for.

## Why Branches?

Imagine you have a working website. You want to add a new feature, but you're not sure it'll work out. Without branches, you'd have to either:

1. Make changes directly and hope they work (risky)
2. Copy the entire project folder as a backup (messy)

Branches solve this elegantly. A branch is like a **parallel timeline** — you can make changes there without affecting your main code. If the experiment works, you merge it back. If not, you delete the branch and nothing was harmed.

```
main:     A --- B --- C
                       \
feature:                D --- E    (experimental work here)
```

In this diagram, commits A, B, and C are on `main`. The `feature` branch splits off from C, and you can add commits D and E without affecting `main` at all.

## Creating a Branch

Make sure you're in your practice repo:

```bash
cd ~/my-first-repo
```

Create a new branch:

```bash
git branch add-about-page
```

This creates the branch but doesn't switch to it. List your branches:

```bash
git branch
```

You'll see:

```
  add-about-page
* main
```

The `*` tells you which branch you're currently on. You're still on `main`.

::validate[create-branch]

## Switching Branches

To move to your new branch:

```bash
git switch add-about-page
```

> **Historical note:** You might see `git checkout` in older tutorials. It does the same thing, but `git switch` was introduced to make the command clearer. Both work — we'll use `git switch` in this course.

Run `git branch` again — the `*` should now be next to `add-about-page`.

### Make Some Changes

Now that you're on the branch, let's make changes. These changes only exist on this branch:

```bash
echo '# About' > about.md
echo 'This project is where I learned Git.' >> about.md
git add about.md
git commit -m 'Add about page'
```

Check your log:

```bash
git log --oneline
```

You should see your new commit on top of the ones from before.

::validate[branch-commit-log]

### The Magic: Switching Back

Now watch what happens when you switch back to `main`:

```bash
git switch main
ls
```

The `about.md` file is **gone**. It only exists on the `add-about-page` branch. Switch back:

```bash
git switch add-about-page
ls
```

It's back. This is the power of branches — each one is its own self-contained timeline.

## Merging a Branch

Your experiment worked — the about page looks good. Time to bring those changes into `main`.

### Step 1: Switch to the Target Branch

You always merge **into** the branch you're currently on. So switch to `main` first:

```bash
git switch main
```

### Step 2: Merge

```bash
git merge add-about-page
```

Git will show something like:

```
Updating abc1234..def5678
Fast-forward
 about.md | 2 ++
 1 file changed, 2 insertions(+)
 create mode 100644 about.md
```

**"Fast-forward"** means Git just moved the `main` pointer forward — the simplest kind of merge. No conflicts, no drama.

Now check:

```bash
ls
```

The `about.md` file is now on `main`. The merge brought your branch's work into the main timeline.

### Step 3: Clean Up

The branch served its purpose. Delete it:

```bash
git branch -d add-about-page
```

The `-d` flag only deletes the branch if it's been merged. This is a safety net — Git won't let you accidentally delete unmerged work.

::validate[command-merge]

## Switching and Creating in One Step

Creating a branch and then switching to it is so common that there's a shortcut:

```bash
git switch -c feature-name
```

The `-c` flag means "create." This is equivalent to:

```bash
git branch feature-name
git switch feature-name
```

You'll use this shortcut almost every time.

::validate[command-switch-branch]

::validate[command-create-switch]

## Pushing Branches to GitHub

Branches are local by default. To share a branch (or back it up to GitHub):

```bash
git push origin branch-name
```

For example, if you created a branch called `experiment`:

```bash
git switch -c experiment
echo '# Experiment' > experiment.md
git add experiment.md
git commit -m 'Start experiment'
git push origin experiment
```

You'll see the branch appear on GitHub. When you're done experimenting:

```bash
git switch main
git merge experiment
git push
git branch -d experiment
```

## A Professional Workflow

Here's the workflow you'll use for every feature or change going forward:

```
1. git pull                        ← Start with latest code
2. git switch -c feature-name      ← Create a branch for your work
3. ... make changes ...            ← Write code, edit files
4. git add .                       ← Stage your changes
5. git commit -m 'Description'     ← Save a snapshot
6. git push origin feature-name    ← Back up to GitHub
7. git switch main                 ← Go back to main
8. git merge feature-name          ← Bring in your changes
9. git push                        ← Update main on GitHub
10. git branch -d feature-name     ← Clean up
```

This might feel like a lot of steps now, but it becomes muscle memory fast. The key idea is: **never work directly on `main`**. Always use a branch.

> **In team settings**, steps 7-8 are usually done through a "Pull Request" on GitHub instead of a local merge. We'll cover that workflow when we get to collaboration. For now, merging locally works great.

## Branch Naming Conventions

Good branch names describe what you're working on:

| Convention | Example | Use For |
|-----------|---------|---------|
| `feature/` | `feature/dark-mode` | New features |
| `fix/` | `fix/login-bug` | Bug fixes |
| `experiment/` | `experiment/new-layout` | Things you might throw away |

Keep names lowercase, use hyphens instead of spaces, and keep them short but descriptive.

## Quick Reference Card

```bash
# Branch basics
git branch                          # List branches
git branch branch-name              # Create a branch
git switch branch-name              # Switch to a branch
git switch -c branch-name           # Create AND switch (shortcut)

# Merging
git switch main                     # Go to target branch first
git merge branch-name               # Merge branch into current branch
git branch -d branch-name           # Delete merged branch

# Remote branches
git push origin branch-name         # Push branch to GitHub
git push                            # Push current branch (after -u)

# Workflow
git pull                            # Get latest
git switch -c feature/my-feature    # Create branch
# ... work, add, commit ...
git push origin feature/my-feature  # Push branch
git switch main && git merge feature/my-feature  # Merge
git push                            # Update remote
git branch -d feature/my-feature    # Clean up
```

## Key Concepts

| Term | Meaning |
|------|---------|
| **Branch** | A parallel timeline of commits, isolated from other branches |
| **main** | The default branch — your stable, working code |
| **Switch** | Move from one branch to another |
| **Merge** | Combine one branch's commits into another branch |
| **Fast-forward** | The simplest merge — just moving the pointer forward |
| **Feature branch** | A branch created for a specific piece of work |

---

**Previous:** [Lesson 2: Working with GitHub](/course/module/2/lesson/2)

**Module Overview:** [Module 2: Git Fundamentals](/course/module/2)
