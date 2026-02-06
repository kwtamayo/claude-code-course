---
{
  "moduleId": "module-0",
  "lessonId": "lesson-1",
  "title": "Environment Discovery",
  "timeEstimate": "10 minutes",
  "prerequisites": [],
  "learningObjectives": [
    "Open and use the Terminal application",
    "Run basic command-line commands",
    "Understand what's currently installed on your system",
    "Identify potential conflicts for the course"
  ],
  "validation": {
    "tasks": [
      {
        "id": "open-terminal",
        "description": "Open the Terminal application",
        "check": "terminal_opened",
        "hint": "Find Terminal in Applications > Utilities, or use Spotlight (Cmd+Space) and type 'Terminal'"
      },
      {
        "id": "check-macos-version",
        "description": "Check your macOS version",
        "command": "sw_vers",
        "check": "command_executed('sw_vers')",
        "hint": "Type 'sw_vers' and press Enter to see your macOS version"
      },
      {
        "id": "check-homebrew",
        "description": "Check if Homebrew is installed",
        "command": "brew --version",
        "check": "command_attempted('brew --version')",
        "hint": "Type 'brew --version' and press Enter. It's okay if you get an error!"
      },
      {
        "id": "check-git",
        "description": "Check if Git is installed",
        "command": "git --version",
        "check": "command_attempted('git --version')",
        "hint": "Type 'git --version' and press Enter"
      },
      {
        "id": "check-node",
        "description": "Check if Node.js is installed",
        "command": "node --version",
        "check": "command_attempted('node --version')",
        "hint": "Type 'node --version' and press Enter. It's okay if it's not installed!"
      }
    ]
  },
  "solution": {
    "commands": [
      "# Open Terminal (use Spotlight: Cmd+Space, type 'Terminal')",
      "sw_vers",
      "brew --version",
      "git --version",
      "node --version"
    ]
  }
}
---

# Lesson 1: Environment Discovery

Welcome to your first lesson! In this lesson, you'll learn to use the **Terminal** - a powerful tool that lets you control your computer using text commands instead of clicking with your mouse.

Don't worry if this feels unfamiliar - we'll take it step by step.

## What is the Terminal?

The Terminal is an application that gives you direct access to your computer's command line. Think of it like having a conversation with your computer using text commands.

**Why use Terminal instead of clicking around?**
- It's faster once you learn it
- It's more powerful (you can do things impossible with clicks)
- It's essential for software development
- It's how you'll use Claude Code and most development tools

## Step 1: Open Terminal

There are several ways to open Terminal on a Mac:

### Method 1: Spotlight Search (Easiest)
1. Press **Cmd + Space** (this opens Spotlight)
2. Type **Terminal**
3. Press **Enter** when you see the Terminal app

### Method 2: Through Applications
1. Open **Finder**
2. Go to **Applications** folder
3. Open the **Utilities** folder
4. Double-click **Terminal**

### Method 3: Launchpad
1. Open **Launchpad** (F4 or pinch gesture on trackpad)
2. Type **Terminal** in the search
3. Click the Terminal icon

**You should now see a window that looks something like this:**

```
Last login: Fri Jan 30 10:30:25 on ttys000
yourusername@Macs-MacBook-Pro ~ %
```

The `%` or `$` at the end is the **prompt** - it means Terminal is ready for you to type a command!

## Step 2: Your First Command - Check macOS Version

Let's run your first command! We're going to check what version of macOS you're running.

**Type this exactly and press Enter:**

```bash
sw_vers
```

**What you'll see:**

```
ProductName:        macOS
ProductVersion:     14.2.1
BuildVersion:       23C71
```

**What this means:**
- `ProductName`: The operating system name
- `ProductVersion`: Your macOS version number (we need 10.15 or higher for this course)
- `BuildVersion`: The specific build identifier

✅ **Validation Check:** Your macOS version should be 10.15 or higher.

## Step 3: Check for Homebrew

**Homebrew** is a "package manager" - think of it like an App Store for developer tools. Let's see if you already have it installed.

**Type this and press Enter:**

```bash
brew --version
```

**You'll see one of two results:**

### If Homebrew IS installed:
```
Homebrew 4.2.0
```

### If Homebrew is NOT installed:
```
zsh: command not found: brew
```

**Both are fine!** We're just checking what you have. Make note of whether you saw a version number or "command not found".

## Step 4: Check for Git

**Git** is version control software - it tracks changes to your code. Let's check if it's installed.

**Type this and press Enter:**

```bash
git --version
```

**Possible results:**

### If Git IS installed:
```
git version 2.39.2
```

### If Git is NOT installed, macOS might prompt you:
```
The "git" command requires the command line developer tools.
Would you like to install the tools now?
```

**Don't click Install yet!** Just click "Not Now" - we'll install everything properly in Lesson 3.

## Step 5: Check for Node.js

**Node.js** lets you run JavaScript outside of a web browser. Let's see if you have it.

**Type this and press Enter:**

```bash
node --version
```

**Possible results:**

### If Node.js IS installed:
```
v18.19.0
```

### If Node.js is NOT installed:
```
zsh: command not found: node
```

Again, both are fine! We're gathering information.

## Understanding Your Results

Based on what you saw, you fall into one of these categories:

### Scenario A: Nothing is installed
- You saw "command not found" for brew, git, and node
- **This is actually ideal!** Clean slate, easy setup ahead.

### Scenario B: Some things are installed
- You have some tools but not others
- **This is common!** We'll remove conflicts and reinstall everything consistently.

### Scenario C: Everything is installed
- You saw version numbers for all tools
- **We'll still need to check versions match what the course expects**

## What You've Learned

🎉 Congratulations! You've just:
- ✅ Opened and used the Terminal
- ✅ Run your first command-line commands
- ✅ Discovered what's currently on your system
- ✅ Learned what tools developers use

## Next Steps

Now that you know what's on your system, we'll:
1. Create a discovery report (Lesson 2)
2. Safely remove any conflicts
3. Install everything fresh and properly

## Troubleshooting

### "I can't find Terminal"
- Make sure you're on a Mac (this course requires macOS)
- Try the Spotlight method (Cmd + Space, type "Terminal")
- Terminal is built into macOS, so it's definitely there!

### "The commands aren't working"
- Make sure you're pressing Enter after typing each command
- Check for typos - commands must be typed exactly
- Make sure there are no extra spaces before the command

### "I got a different message"
- That's okay! Every system is a bit different
- As long as you saw either a version number OR "command not found", you're good
- Note down what you saw - it might be helpful later

## Key Concepts

**Terminal**: An application for running text commands  
**Command**: An instruction you type and run by pressing Enter  
**Package Manager**: Software that installs other software (like Homebrew)  
**Version Control**: Software that tracks changes to files (like Git)

---

**Ready for the next lesson?**

**Next:** [Lesson 2: Clean Slate Script →](../lesson-2/lesson.md)  
**Back:** [Module 0 Overview](../README.md)
