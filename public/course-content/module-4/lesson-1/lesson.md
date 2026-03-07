---
{
  "moduleId": "module-4",
  "lessonId": "lesson-1",
  "title": "Meet Claude Code",
  "timeEstimate": "10 minutes",
  "prerequisites": ["module-3"],
  "learningObjectives": [
    "Understand what Claude Code is and how it differs from Claude in the browser",
    "Install Claude Code and verify it works",
    "Understand the difference between plan mode and execute mode"
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
      }
    ]
  }
}
---

# Meet Claude Code

You've used Claude in the browser. Claude Code is different — it runs directly in your Terminal, reads your files, writes code, and runs commands on your computer. It's not a chatbot. It's a collaborator that works inside your project.

Here's how it works:

1. You open Claude Code inside a project folder
2. You describe what you want to build or change
3. Claude Code reads your existing files, writes new code, and sets things up
4. You review what it built and decide what to do next

Think of it as a pair programmer who can type very fast and never gets tired. You provide direction — it does the heavy lifting. But here's the key: **you stay in the loop.** Claude Code doesn't make decisions without showing you what it's doing.

## Install Claude Code

```bash
npm install -g @anthropic-ai/claude-code
```

Verify it worked:

```bash
claude --version
```

You should see a version number.

::validate[verify-claude-code]

> **Getting "command not found"?** If you have the Claude desktop app, it bundles its own copy of Claude Code — but doesn't add the `claude` command to your Terminal. The `npm install` above fixes this.

> **Getting a permission error?** Try: `sudo npm install -g @anthropic-ai/claude-code`

## How You'll Work With It

Every time you use Claude Code, you'll do two things before typing anything:

**1. The permissions ritual (Shift+Tab)**
Claude Code asks for permission before editing files. That's safe, but when building an entire project it means approving dozens of files one by one. Press **Shift+Tab** at the start of each session to enable auto-accept for file edits. You'll still be asked about running commands — that's intentional.

**2. Choose your mode**
Claude Code has two modes, and choosing the right one is one of the most important habits you'll build:

| Mode | What happens | When to use it |
|---|---|---|
| **Plan mode** | Claude Code proposes an approach and waits for your approval before touching anything | When you're starting something new or aren't sure exactly what you want |
| **Execute mode** | Claude Code reads your prompt and starts building immediately | When the task is specific and well-defined |

You switch between modes with **Shift+Tab** — it cycles through options and shows the current mode at the bottom of the screen.

**The habit to build:** default to plan mode for anything new. Execute mode is the fast path you use once you already know what you want. Most mistakes happen when people execute before they've thought through what they're asking for.

In the next lesson, you'll use Claude Code for the first time — and you'll start in plan mode.

## Slash Commands

Claude Code has built-in commands that start with `/`. You'll learn them as you need them — there's no need to memorize them upfront.

The first one you'll use is `/exit` to end a Claude Code session. Others like `/clear`, `/compact`, and `/model` will come up in later modules at the moment they become useful.

You can also create your own custom commands — repeatable prompts you invoke with a `/` that Claude Code runs on demand. This course already uses one behind the scenes. We'll build your own in a later module.

Whenever you see a `/command` in a lesson, that's Claude Code's vocabulary — not something you type in your regular Terminal.

## What's Next

In **Lesson 2**, you'll design your Daily Planner dashboard with Claude Code in plan mode, review and approve what it proposes, then watch it build. By the end of that lesson, you'll have a running web app in your browser.

---

**Next:** [Lesson 2: Plan & Build Your Dashboard →](/course/module/4/lesson/2)

**Module Overview:** [Module 4: Web Dashboard - Layout & Setup](/course/module/4)
