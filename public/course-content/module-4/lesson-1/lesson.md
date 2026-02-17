---
{
  "moduleId": "module-4",
  "lessonId": "lesson-1",
  "title": "Your First Project with Claude Code",
  "timeEstimate": "20 minutes",
  "prerequisites": ["module-3"],
  "learningObjectives": [
    "Understand what Claude Code is and how it works as a development tool",
    "Use an effective prompt to scaffold a complete React project",
    "Run a development server and see your app in the browser",
    "Apply the security checklist from Module 3 to a new project"
  ],
  "validation": {
    "tasks": [
      {
        "id": "verify-claude-code",
        "description": "Verify Claude Code is installed by running claude --version and pasting the output",
        "type": "paste-output",
        "expectedPatterns": [
          "\\d+\\.\\d+"
        ],
        "hints": [
          "Run: claude --version",
          "If you see 'command not found', run: npm install -g @anthropic-ai/claude-code",
          "The Claude desktop app has its own copy but doesn't add it to your Terminal — the npm install fixes this"
        ]
      },
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
          "If the file doesn't exist, we'll fix that — keep going"
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
          "You should see react and react-dom with version numbers",
          "If no output, you may not be in the right directory"
        ]
      }
    ]
  }
}
---

# Your First Project with Claude Code

You've learned the terminal. You've learned Git. You've learned how to keep secrets safe. Now it's time to use all of that to **build something real**.

In this lesson, you'll create a Daily Planner dashboard — a web app with a calendar, task list, notes, and habit tracker. And you won't be writing it from scratch. You'll use **Claude Code** to generate the entire project, then spend the rest of this module understanding and customizing it.

By the end of this lesson, you'll have a working web app running on your computer. Let's go.

## What is Claude Code?

Claude Code is an AI tool that runs directly in your Terminal. It's not a chatbot in a browser — it's an agent that can read your files, write code, and run commands on your computer.

Here's how it works:

1. You open Claude Code in a project folder
2. You describe what you want to build
3. Claude Code creates the files, writes the code, and sets everything up
4. You review what it built, then iterate

Think of it as a pair programming partner who can type very fast. You provide the direction — it does the heavy lifting. But you still need to understand what it produces. That's what this module is about.

> **Important:** Claude Code is a tool, not a replacement for understanding. Throughout this course, we'll always review what Claude Code generates so you know what's happening in your project.

## Install Claude Code

Open your Terminal and install Claude Code globally:

```bash
npm install -g @anthropic-ai/claude-code
```

Verify it's installed:

```bash
claude --version
```

You should see a version number.

::validate[verify-claude-code]

> **Getting "command not found"?** If you have the Claude desktop app installed, it bundles its own copy of Claude Code — but it doesn't add the `claude` command to your Terminal's PATH. Running `npm install -g @anthropic-ai/claude-code` installs the standalone version that works from any Terminal window. This is what you want.

> **Getting a permission error?** Try: `sudo npm install -g @anthropic-ai/claude-code` and enter your password. On Apple Silicon Macs, this is rarely needed if you installed Node via Homebrew in Module 0.

## Writing a Good Prompt

Before you use Claude Code, let's talk about what makes a good prompt. You don't need to know any programming terminology — just describe what you want clearly.

A good prompt has two parts:

| Part | Purpose | Example |
|------|---------|---------|
| **What** you're building | The big picture | "A Daily Planner web app" |
| **What it should have** | The specific pieces | "Calendar, task list, notes, habit tracker" |

That's it. Claude Code handles the technical decisions — what language to use, how to organize the files, how to style it. You just describe what you want, and it figures out how to build it.

## Create Your Daily Planner

First, create the project folder and navigate into it:

```bash
mkdir -p ~/Developer/daily-planner
cd ~/Developer/daily-planner
```

Now launch Claude Code:

```bash
claude
```

### First-Time Setup

The first time you run `claude`, it will ask you to log in. You'll see a menu like this:

```
Select login method:
❯ 1. Claude account with subscription
  2. Anthropic Console account
  3. 3rd-party platform
```

**Select option 1** (Claude account with subscription). This opens your browser — log in with your Claude account, authorize the connection, and return to your Terminal. You only need to do this once.

> **Browser didn't open?** Press `c` in your Terminal to copy the login URL, then paste it into your browser manually.

> **Don't have a Claude subscription?** You'll need a Claude Pro, Max, Team, or Enterprise plan to use Claude Code. Visit [claude.ai](https://claude.ai) to sign up.

### Give Claude Code Your Prompt

Once you're logged in, Claude Code will show a prompt where you can type. Paste this prompt:

```
Build me a Daily Planner web app with a calendar, task list, notes section, and habit tracker. Make it look clean and modern with some example data so I can see how it looks right away.
```

That's it — two sentences. Claude Code will decide how to build it, what tools to use, and how to organize the code. You'll explore all of those decisions in Lesson 2.

### What Happens Next

Claude Code will start creating your project. You'll see it:

1. **Initialize a Vite + React project** — this creates the base project structure
2. **Create component files** — one for each section of your dashboard
3. **Write CSS** — styling for the layout and individual components
4. **Set up configuration** — `.gitignore`, `package.json`, and more

This may take a minute or two. Along the way, Claude Code will ask for your permission before it does anything. There are two types of prompts you'll see:

**File creation/editing:**
```
Do you want to create Calendar.jsx?
❯ 1. Yes
  2. Yes, allow all edits during this session (shift+tab)
  3. No
```

**Running commands:**
```
Bash command: npm run dev
Do you want to proceed?
❯ 1. Yes
  2. Yes, and don't ask again for npm run dev commands
  3. No
```

For both types, **select option 2** each time. This tells Claude Code "I trust you for this session — go ahead." Since it's building an entire project from scratch, there will be many files to create and commands to run. You don't want to approve each one individually.

> **Don't worry if your output looks slightly different.** Claude Code may name files or organize things a bit differently each time. That's normal — the important thing is that you end up with a working project.

When Claude Code finishes, exit it by typing `/exit` or pressing `Ctrl + C`. You're back in your regular Terminal now.

Verify the project structure:

```bash
ls src/
```

You should see source code files — things like `App.jsx`, `main.jsx`, and possibly a `components/` folder. The exact names may vary, and that's fine.

::validate[verify-project-structure]

## Run Your Dashboard

Now let's see it in action. First, make sure all dependencies are installed:

```bash
npm install
```

Then start the development server:

```bash
npm run dev
```

::validate[verify-dev-server]

Open the URL shown in your Terminal (usually `http://localhost:5173`) in your browser. You should see your Daily Planner dashboard with all four sections.

**Take a moment.** You just went from an empty folder to a running web application. Every section you see — the calendar, the task list, the notes, the habit tracker — is a separate piece of code that Claude Code generated for you.

> **To stop the dev server,** press `Ctrl + C` in your Terminal. You can restart it anytime with `npm run dev`.

## Security Checkpoint

Remember the security checklist from Module 3? Let's apply it to your new project.

Check that `.gitignore` exists and has the right entries:

```bash
cat .gitignore
```

::validate[verify-gitignore]

Verify React is properly listed as a dependency:

```bash
grep react package.json
```

::validate[verify-package-json]

If your `.gitignore` is missing `node_modules/` or `.env`, add them now:

```bash
echo 'node_modules/' >> .gitignore
echo '.env' >> .gitignore
```

Good habits start from the first project.

## What Just Happened?

Let's step back and appreciate what you just did:

1. **Installed a development tool** (Claude Code) using npm
2. **Wrote a prompt** that described a complete web application
3. **Generated an entire project** with multiple components and styling
4. **Ran a development server** and saw your app in a browser
5. **Verified security** by checking `.gitignore`

In the next lesson, we'll look under the hood — you'll understand every file Claude Code created and learn the vocabulary of React development.

## Quick Reference Card

```bash
# Claude Code
npm install -g @anthropic-ai/claude-code   # Install Claude Code
claude --version                            # Verify installation
claude                                      # Launch Claude Code in current folder

# Project setup
mkdir -p ~/Developer/project-name           # Create project folder
cd ~/Developer/project-name                 # Navigate to it
npm install                                 # Install dependencies

# Development
npm run dev                                 # Start dev server
# Ctrl + C                                  # Stop dev server
```

## Key Concepts

| Term | Meaning |
|------|---------|
| **Claude Code** | An AI development tool that runs in your Terminal — reads, writes, and runs code |
| **Prompt** | The instructions you give Claude Code describing what to build |
| **Scaffold** | Generate the initial structure of a project — files, folders, configuration |
| **Development server** | A local server that runs your app and auto-refreshes when you make changes |
| **Vite** | A fast build tool for web projects — handles bundling, dev server, and more |
| **Dependencies** | External packages your project needs (listed in package.json) |

---

**Next:** [Lesson 2: Understanding What Got Built →](/course/module/4/lesson/2)

**Module Overview:** [Module 4: Web Dashboard - Layout & Setup](/course/module/4)
