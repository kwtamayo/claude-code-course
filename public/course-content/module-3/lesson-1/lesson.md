---
{
  "moduleId": "module-3",
  "lessonId": "lesson-1",
  "title": "Secrets & Environment Variables",
  "timeEstimate": "15 minutes",
  "prerequisites": ["module-2"],
  "learningObjectives": [
    "Understand why secrets must never appear in your code or Git history",
    "Create and use .env files to store sensitive configuration",
    "Use .gitignore to prevent secrets from being committed",
    "Access environment variables from the terminal"
  ],
  "validation": {
    "tasks": [
      {
        "id": "echo-env-var",
        "description": "Run echo $HOME and paste the output to confirm environment variables work",
        "type": "paste-output",
        "expectedPatterns": [
          "^/Users/"
        ],
        "hints": [
          "Run: echo $HOME",
          "You should see your home directory path, like /Users/yourname",
          "This proves your shell can read environment variables"
        ]
      },
      {
        "id": "create-env-file",
        "description": "Create a .env file in your practice repo and paste the output of cat .env",
        "type": "paste-output",
        "expectedPatterns": [
          "=",
          "(API_KEY|SECRET|TOKEN|KEY|PASSWORD)"
        ],
        "hints": [
          "In your practice repo, run: echo 'API_KEY=my-secret-key-12345' > .env",
          "Then run: cat .env",
          "You should see API_KEY=my-secret-key-12345"
        ]
      },
      {
        "id": "gitignore-env",
        "description": "Add .env to .gitignore and paste the contents of .gitignore",
        "type": "paste-output",
        "expectedPatterns": [
          "\\.env"
        ],
        "hints": [
          "Run: echo '.env' >> .gitignore",
          "Then run: cat .gitignore",
          "You should see .env listed"
        ]
      },
      {
        "id": "verify-ignored",
        "description": "Run git status to confirm .env is NOT listed as an untracked file",
        "type": "paste-output",
        "expectedPatterns": [
          "On branch (main|master)"
        ],
        "hints": [
          "Run: git status",
          "You should see .gitignore listed (it's a new/modified file) but NOT .env",
          "If .env appears, make sure your .gitignore file contains '.env' on its own line"
        ]
      },
      {
        "id": "gitignore-contents",
        "description": "Run cat .gitignore in the course project and paste the output",
        "type": "paste-output",
        "expectedPatterns": [
          "node_modules",
          "\\.env"
        ],
        "hints": [
          "Navigate to the course project: cd ~/Developer/claude-code-course",
          "Then run: cat .gitignore",
          "You should see entries like node_modules and .env"
        ]
      }
    ]
  }
}
---

# Secrets & Environment Variables

You've learned to track your code with Git and push it to GitHub. That's great — but there's a critical rule you need to learn before you start building anything:

**Never put secrets in your code.**

Secrets are things like API keys, passwords, database URLs, and authentication tokens. If they end up in your Git history or on GitHub, anyone can find them — and the consequences range from embarrassing to expensive.

## Why This Matters — Real Consequences

This isn't theoretical. Here's what happens when secrets leak:

- **AWS keys on GitHub** — Bots scan every public commit on GitHub for AWS credentials. Within minutes of pushing a key, attackers spin up servers for cryptocurrency mining. Developers have woken up to bills of $10,000+.
- **GitHub Secret Scanning** — GitHub now automatically scans for known secret patterns and alerts you. But by the time you get the alert, the key may already be compromised.
- **Git history is permanent** — Even if you delete the file in your next commit, the secret is still in your Git history. Anyone who clones the repo can find it.

The fix is simple: keep secrets out of your code entirely.

## Environment Variables

An **environment variable** is a value stored in your shell's environment — outside of any file in your project. Your system already has many of them.

Try this:

```bash
echo $HOME
```

That prints your home directory. `$HOME` is an environment variable that your system sets automatically.

::validate[echo-env-var]

Here are some common ones:

```bash
echo $USER      # Your username
echo $SHELL     # Your shell (probably /bin/zsh)
echo $PATH      # Where your system looks for programs
```

The key insight: **environment variables live on your computer, not in your code.** That makes them perfect for storing secrets.

## The .env File

In practice, developers use a file called `.env` to define environment variables for a project. Let's create one.

Go to your practice repo from Module 2:

```bash
cd ~/my-first-repo
```

Create a `.env` file with a fake API key:

```bash
echo 'API_KEY=my-secret-key-12345' > .env
```

Check what's in it:

```bash
cat .env
```

::validate[create-env-file]

This file is where you'd put real API keys, database passwords, and other sensitive values when you start building projects. Each line follows the `KEY=value` format:

```
API_KEY=sk-abc123def456
DATABASE_URL=postgres://user:password@localhost:5432/mydb
SECRET_TOKEN=eyJhbGciOiJIUzI1NiJ9
```

> **Important:** The `.env` file is for local development only. It should never, ever be committed to Git. That's what `.gitignore` is for.

## Keeping Secrets Out of Git with .gitignore

A `.gitignore` file tells Git which files to skip — they won't show up in `git status`, won't be staged, and won't be committed.

Let's protect your `.env` file:

```bash
echo '.env' >> .gitignore
```

Now check what's in `.gitignore`:

```bash
cat .gitignore
```

::validate[gitignore-env]

### Verify It's Working

This is the critical step — always confirm your secrets are actually being ignored:

```bash
git status
```

You should see `.gitignore` as a new or modified file (that's fine — `.gitignore` itself gets committed). But `.env` should **not appear anywhere** in the output. If it does, your `.gitignore` isn't working correctly.

::validate[verify-ignored]

### What Else Goes in .gitignore?

A typical `.gitignore` for a JavaScript project looks like:

```
# Environment variables (secrets!)
.env
.env.local
.env.production

# Dependencies (too large, recreated with npm install)
node_modules/

# Build output (recreated with npm run build)
dist/
build/

# OS files
.DS_Store
```

Every project should have a `.gitignore` from day one. When we start building your web dashboard in Module 4, we'll create one with all the right entries.

::validate[gitignore-contents]

## What If You Accidentally Commit a Secret?

It happens. Here's what to do:

1. **Revoke the secret immediately.** Go to wherever you got the API key and regenerate or delete it. The old one is compromised — assume someone has it.
2. **Don't just delete the file and commit again.** The secret is still in your Git history. Deleting it in a new commit doesn't remove it from old commits.
3. **For public repos:** Consider the secret burned. Rotate it and move on.

> **Prevention is easier than cleanup.** Always add `.env` to `.gitignore` before your first commit. Make it the very first thing you do when starting a new project.

## The Golden Rule

Before you start any project, do this:

```bash
# Step 1: Create .gitignore FIRST
echo '.env' > .gitignore
echo 'node_modules/' >> .gitignore

# Step 2: Then create your .env file
echo 'API_KEY=your-key-here' > .env

# Step 3: Verify
git status  # .env should NOT appear
```

This order matters. If you create `.env` and commit it before creating `.gitignore`, the damage is done.

## Quick Reference Card

```bash
# Environment variables
echo $VARIABLE_NAME              # Read an environment variable
export MY_VAR='value'            # Set a temporary environment variable

# .env file
echo 'KEY=value' > .env          # Create a .env file
cat .env                         # View your .env file

# .gitignore
echo '.env' >> .gitignore        # Add .env to .gitignore
git status                       # Verify .env is not tracked
```

## Key Concepts

| Term | Meaning |
|------|---------|
| **Secret** | Any sensitive value: API keys, passwords, tokens, database URLs |
| **Environment variable** | A key-value pair stored in your shell environment, outside your code |
| **.env file** | A project file that defines environment variables (must be gitignored) |
| **.gitignore** | A file that tells Git which files/folders to skip |
| **Secret rotation** | Replacing a compromised secret with a new one |

---

**Next:** [Lesson 2: Safe Development Practices](/course/module/3/lesson/2)

**Module Overview:** [Module 3: Security Fundamentals](/course/module/3)
