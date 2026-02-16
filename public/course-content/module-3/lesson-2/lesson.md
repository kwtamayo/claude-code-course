---
{
  "moduleId": "module-3",
  "lessonId": "lesson-2",
  "title": "Safe Development Practices",
  "timeEstimate": "15 minutes",
  "prerequisites": ["module-3-lesson-1"],
  "learningObjectives": [
    "Understand what node_modules is and why it's never committed to Git",
    "Use npm audit to check for known vulnerabilities in dependencies",
    "Recognize HTTPS and why it matters for web applications",
    "Follow a pre-build security checklist for new projects"
  ],
  "validation": {
    "tasks": [
      {
        "id": "verify-node-modules-ignored",
        "description": "Confirm node_modules is in .gitignore for the course project",
        "type": "paste-output",
        "expectedPatterns": [
          "node_modules"
        ],
        "hints": [
          "Go to the course project folder: cd ~/Developer/claude-code-course",
          "Then run: cat .gitignore",
          "You should see node_modules listed"
        ]
      },
      {
        "id": "run-npm-audit",
        "description": "Run npm audit in the course project and paste the output",
        "type": "paste-output",
        "expectedPatterns": [
          "(found 0 vulnerabilities|found \\d+ vulnerabilit|no known vulnerabilities)"
        ],
        "hints": [
          "Navigate to the course project: cd ~/Developer/claude-code-course",
          "Then run: npm audit",
          "It will show a report of known vulnerabilities (hopefully zero!)"
        ]
      },
      {
        "id": "npm-audit-fix-check",
        "description": "Run npm audit fix (if needed) then npm audit again, and paste the final output",
        "type": "paste-output",
        "expectedPatterns": [
          "(found 0 vulnerabilities|found \\d+ vulnerabilit|no known vulnerabilities)"
        ],
        "hints": [
          "If npm audit found issues, run: npm audit fix",
          "Then run: npm audit",
          "Paste the final audit result"
        ]
      },
      {
        "id": "node-modules-size",
        "description": "Run du -sh node_modules in the course project and paste the output to see how large it is",
        "type": "paste-output",
        "expectedPatterns": [
          "\\d+M.*node_modules"
        ],
        "hints": [
          "Navigate to the course project: cd ~/Developer/claude-code-course",
          "Then run: du -sh node_modules",
          "You'll see the total size — this is why we never commit it!"
        ]
      }
    ]
  }
}
---

# Safe Development Practices

In Lesson 1, you learned to keep secrets out of your code. Now let's talk about the other side of security: the code you bring *into* your project.

When you build a web app, you don't write everything from scratch. You use **packages** — pre-built code written by other developers. This is powerful, but it comes with responsibility. You need to know what you're installing and how to check that it's safe.

## Understanding node_modules

When you ran `npm install` in Module 0, something happened behind the scenes. npm downloaded all the project's dependencies into a folder called `node_modules/`.

Take a look:

```bash
cd ~/Developer/claude-code-course
ls node_modules | head -20
```

That's just the first 20 entries. In a typical project, `node_modules` contains hundreds or thousands of packages — and each of those packages can depend on other packages.

### Why node_modules Is Never Committed

Two reasons:

1. **Size.** It can be hundreds of megabytes. Pushing that to GitHub would be slow and wasteful.
2. **Reproducibility.** Anyone who clones your project can recreate `node_modules` by running `npm install`. The `package.json` and `package-lock.json` files tell npm exactly what to download.

This is why every Node.js project's `.gitignore` includes `node_modules/`. Let's verify the course project has this:

```bash
cat .gitignore
```

You should see `node_modules` listed.

::validate[verify-node-modules-ignored]

How big is it, exactly? Check for yourself:

```bash
du -sh node_modules
```

::validate[node-modules-size]

## Checking for Vulnerabilities with npm audit

Here's the tricky part about dependencies: sometimes a package you installed six months ago gets a security vulnerability discovered in it. How do you know?

npm has a built-in tool for this:

```bash
npm audit
```

This checks every package in your project against a database of known vulnerabilities. Run it now in the course project:

```bash
cd ~/Developer/claude-code-course
npm audit
```

::validate[run-npm-audit]

### Reading the Output

If everything is clean, you'll see:

```
found 0 vulnerabilities
```

If there are issues, npm will show:
- **Severity** — low, moderate, high, or critical
- **Package name** — which dependency has the problem
- **Fix available** — whether running `npm audit fix` can resolve it

For most issues:

```bash
npm audit fix
```

This updates packages to patched versions when possible. For critical issues that can't be auto-fixed, npm will tell you what to do.

> **Good habit:** Run `npm audit` periodically, especially before deploying your project. Think of it like a health checkup for your dependencies.

::validate[npm-audit-fix-check]

## HTTPS — Why It Matters

When you visit a website, your browser communicates with a server. That communication can be:

- **HTTP** — unencrypted. Anyone between you and the server can read the data.
- **HTTPS** — encrypted. The data is scrambled in transit. Only you and the server can read it.

### How to Tell

Look at your browser's address bar:
- A **lock icon** means HTTPS is active
- `https://` in the URL confirms it

### Why You Should Care

When you deploy your web dashboard in Module 8, it will be served over HTTPS automatically (Vercel handles this). But the concept matters because:

- **API calls should use HTTPS.** When your dashboard fetches weather data or news, that request should go over `https://`, not `http://`.
- **Users trust HTTPS.** Browsers show warnings for non-HTTPS sites.
- **Secrets in transit.** If your app sends an API key to a server over HTTP, anyone on the network can intercept it.

You don't need to configure HTTPS yourself — modern hosting platforms do it for you. But you should understand *why* it exists and always verify your URLs start with `https://`.

## The Principle of Least Privilege

One last concept that will serve you well throughout this course and beyond:

**Only give access to what's needed, nothing more.**

This applies everywhere:
- **API keys** — If a service offers read-only keys, use those instead of full-access keys
- **File permissions** — Don't make everything world-readable
- **GitHub repos** — Keep repos private unless you have a reason to make them public
- **Environment variables** — Only put what each part of your app actually needs

You don't need to memorize rules for this. Just ask yourself: *"Does this thing need this level of access?"* If the answer is no, restrict it.

## Your Pre-Build Security Checklist

Before you start building your web dashboard in Module 4, here's what you now know to do for every new project:

```
[ ] Create .gitignore BEFORE your first commit
[ ] Add .env and node_modules/ to .gitignore
[ ] Store all secrets in .env, never in code
[ ] Run npm audit after installing dependencies
[ ] Use https:// URLs for all API calls
[ ] Keep repos private unless sharing intentionally
[ ] Use read-only API keys when available
```

We'll reference this checklist when we set up the dashboard project. For now, the important thing is that you understand *why* each item matters.

## Quick Reference Card

```bash
# Dependencies
npm install                      # Install packages from package.json
npm audit                        # Check for known vulnerabilities
npm audit fix                    # Auto-fix what it can

# Security files every project needs
.gitignore                       # Lists files Git should ignore
.env                             # Stores secrets (must be in .gitignore!)
package-lock.json                # Locks exact dependency versions

# Verify your setup
cat .gitignore                   # Check what's being ignored
git status                       # Confirm secrets aren't tracked
npm audit                        # Check dependency health
```

## Key Concepts

| Term | Meaning |
|------|---------|
| **node_modules** | Folder where npm installs all project dependencies — never commit this |
| **npm audit** | Command that checks your dependencies for known security vulnerabilities |
| **Dependency** | A package your project relies on (listed in package.json) |
| **HTTPS** | Encrypted communication between browser and server — always use this |
| **Least privilege** | Only grant the minimum access needed — a core security principle |
| **package-lock.json** | Locks exact versions of every dependency for reproducible installs |

---

**Previous:** [Lesson 1: Secrets & Environment Variables](/course/module/3/lesson/1)

**Module Overview:** [Module 3: Security Fundamentals](/course/module/3)
