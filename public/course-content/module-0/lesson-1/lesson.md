---
{
  "moduleId": "module-0",
  "lessonId": "lesson-1",
  "title": "Setup Your Development Environment",
  "timeEstimate": "30 minutes",
  "prerequisites": [],
  "learningObjectives": [
    "Open and use the Terminal application",
    "Check what development tools are installed",
    "Install missing tools (Homebrew, Git, Node.js)",
    "Install and configure VS Code as your code editor",
    "Understand how VS Code and Claude Code work together",
    "Verify your setup is working correctly"
  ],
  "validation": {
    "tasks": [
      {
        "id": "verify-macos",
        "description": "Verify your macOS version is 10.15 or higher",
        "type": "paste-output",
        "expectedPatterns": [
          "ProductVersion.*1[1-9]\\.",
          "ProductVersion.*[2-9][0-9]\\."
        ],
        "hints": [
          "Run: sw_vers",
          "Look for ProductVersion line",
          "You need version 10.15 (Catalina) or higher"
        ]
      },
      {
        "id": "verify-homebrew",
        "description": "Verify Homebrew is installed",
        "type": "paste-output",
        "expectedPatterns": [
          "Homebrew \\d+",
          "/opt/homebrew|/usr/local"
        ],
        "hints": [
          "Run: brew --version",
          "If not installed, follow installation instructions in lesson"
        ]
      },
      {
        "id": "verify-node",
        "description": "Verify Node.js is installed",
        "type": "paste-output",
        "expectedPatterns": [
          "v\\d+\\.\\d+\\.\\d+"
        ],
        "hints": [
          "Run: node --version",
          "You should see v18.0.0 or higher"
        ]
      },
      {
        "id": "verify-git",
        "description": "Verify Git is installed",
        "type": "paste-output",
        "expectedPatterns": [
          "git version \\d+"
        ],
        "hints": [
          "Run: git --version",
          "Any version 2.0 or higher is fine"
        ]
      },
      {
        "id": "verify-vscode",
        "description": "Verify VS Code is installed and the 'code' command works",
        "type": "paste-output",
        "expectedPatterns": [
          "\\d+\\.\\d+\\.\\d+"
        ],
        "hints": [
          "Run: code --version",
          "If 'command not found', open VS Code and install the shell command (see lesson)"
        ]
      }
    ]
  }
}
---

# Setup Your Development Environment

Welcome! In this lesson, you'll set up everything you need to start coding. Don't worry if you're new to this - we'll go step by step.

## What You'll Install

By the end of this lesson, you'll have:

- **Terminal** (already on your Mac)
- **Homebrew** (package manager - like an app store for developers)
- **Git** (version control - tracks code changes)
- **Node.js** (runs JavaScript outside browsers)
- **VS Code** (code editor - where you'll read and browse your code)

**Total time:** About 30 minutes

---

## Step 1: Open Terminal

**What is Terminal?** It's an app that lets you control your computer using text commands instead of clicking.

### Find Terminal:

**Method 1 (Easiest):**
1. Press `Cmd + Space` to open Spotlight
2. Type "Terminal"
3. Press Enter

**Method 2:**
1. Open Finder
2. Go to Applications → Utilities
3. Double-click Terminal

You'll see a window with text like:
```
yourusername@Macs-MacBook-Pro ~ %
```

**This is your "prompt"** - it means Terminal is ready for commands!

---

## Step 2: Check Your macOS Version

Let's make sure your Mac is compatible with this course.

**Type this and press Enter:**

```bash
sw_vers
```

**You'll see something like:**
```
ProductName:        macOS
ProductVersion:     14.2.1
BuildVersion:       23C71
```

**✅ You're good if:** ProductVersion is **10.15 or higher**  
**❌ If lower:** You'll need to update macOS first

---

## Step 3: Check What's Already Installed

Let's see what you already have. Try each command:

### Check for Homebrew:

```bash
brew --version
```

**If you see:** `Homebrew 4.x.x` → ✅ Already installed! Skip to Step 4  
**If you see:** `command not found` → ⬇️ Continue to install it

### Check for Git:

```bash
git --version
```

**If you see:** `git version 2.x` → ✅ You have it!  
**If you see:** Popup asking to install → ❌ Click "Not Now" (we'll do it properly)

### Check for Node.js:

```bash
node --version
```

**If you see:** `v18.x.x` or higher → ✅ You have it!  
**If you see:** `command not found` → ⬇️ We'll install it

---

## Step 4: Install What's Missing

### A. Install Homebrew (If You Don't Have It)

Homebrew is **essential** - it makes installing everything else easy.

**Run this command:**

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

**What happens:**
1. **Explains what it will do** - read it!
2. **Asks for your password** - type it (you won't see characters, that's normal)
3. **Installs for 5-10 minutes** - be patient, don't close Terminal!
4. **Shows "Next steps"** - read carefully!

**IMPORTANT - Apple Silicon Macs (M1/M2/M3):**

If you see a message about adding Homebrew to your PATH, run these commands:

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

**Intel Macs:** This happens automatically.

**Not sure which Mac you have?** Click the Apple logo → "About This Mac" → Look for "Chip" (if it says M1/M2/M3, it's Apple Silicon)

**Verify Homebrew works:**

```bash
brew --version
```

You should see: `Homebrew 4.x.x`

**If "command not found":**
- Close Terminal completely
- Open a new Terminal window
- Try again

---

### B. Install Git (If You Don't Have It)

**Check again:**

```bash
git --version
```

**If you don't have it or have an old version:**

```bash
brew install git
```

Takes 2-3 minutes.

**Verify:**

```bash
git --version
```

Should show: `git version 2.43.0` (or similar)

---

### C. Install Node.js (If You Don't Have It)

**Check again:**

```bash
node --version
```

**If you don't have it:**

```bash
brew install node
```

Takes 3-5 minutes. This installs both Node.js AND npm (package manager).

**Verify Node:**

```bash
node --version
```

Should show: `v20.11.0` (or similar)

**Verify npm:**

```bash
npm --version
```

Should show: `10.2.4` (or similar)

---

## Step 5: Test Everything Works

Let's make sure your setup is solid!

### Quick Test: Install a Fun Package

```bash
npm install -g cowsay
```

**What this does:** Installs a silly program globally (available everywhere)

**Now run it:**

```bash
cowsay "My dev environment works!"
```

**If you see an ASCII cow, you're ready to code!** 🐮

```
 ____________________________
< My dev environment works! >
 ----------------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```

---

## Step 6: Configure Git (Important!)

Git needs to know who you are for tracking changes.

**Set your name:**

```bash
git config --global user.name "Your Name"
```

**Set your email:**

```bash
git config --global user.email "your.email@example.com"
```

**Use the email associated with your GitHub account** if you have one!

**Verify it worked:**

```bash
git config --global user.name
git config --global user.email
```

---

## Step 7: Install VS Code

**What is VS Code?** It's a free code editor made by Microsoft. Think of it as a word processor, but built specifically for writing code. It shows your files with color-coded syntax, catches errors, and has a built-in terminal.

**Why VS Code?** It's the most popular code editor in the world, it's free, and it works great alongside Claude Code.

### Download and Install:

1. Go to [code.visualstudio.com](https://code.visualstudio.com)
2. Click the big **Download** button (it auto-detects your Mac)
3. Open the downloaded `.zip` file
4. Drag **Visual Studio Code** to your Applications folder
5. Open VS Code from Applications (or Spotlight: `Cmd + Space`, type "Visual Studio Code")

### Install the `code` Command

This lets you open VS Code from Terminal — you'll use this constantly.

1. Open VS Code
2. Press `Cmd + Shift + P` to open the **Command Palette**
3. Type: `shell command`
4. Click **"Shell Command: Install 'code' command in PATH"**
5. You'll see a success message

**Verify it works:**

```bash
code --version
```

You should see a version number like `1.96.0`.

**Try opening a folder:**

```bash
mkdir ~/test-project
code ~/test-project
```

VS Code should open with that folder in the sidebar. You can delete the test folder later.

---

## Step 8: Set Up VS Code for This Course

### Quick Orientation

When VS Code opens, you'll see:

- **Sidebar (left)** — File explorer, search, extensions
- **Editor (center)** — Where you read and edit code
- **Terminal (bottom)** — A built-in terminal (same as the Terminal app!)
- **Status Bar (bottom edge)** — Info about your current file

**Open the built-in terminal:** Press `` Ctrl + ` `` (backtick, the key above Tab)

This terminal works exactly like the Terminal app. You can run all the same commands here.

### Install the ESLint Extension

Extensions add features to VS Code. ESLint catches code mistakes as you type.

1. Click the **Extensions icon** in the sidebar (looks like 4 squares)
2. Search for **"ESLint"**
3. Click **Install** on the one by Microsoft (it has millions of downloads)

That's it! ESLint will now underline problems in your code with yellow and red squiggles.

### How VS Code and Claude Code Work Together

This is important to understand:

- **Claude Code** runs in your **Terminal**. It's an AI agent that reads your project, writes code, runs commands, and builds features for you.
- **VS Code** is where you **see your files**. It shows you what Claude Code created or changed, with syntax highlighting and error detection.

**The workflow:**
1. You tell Claude Code what to build (in Terminal)
2. Claude Code writes the code
3. You see the changes appear in VS Code
4. You review, test, and iterate

They're complementary tools — Claude Code is the builder, VS Code is the viewer. You don't need an AI inside your editor because Claude Code handles that from the terminal.

---

## What You've Accomplished

🎉 **Congratulations!** You now have a complete development environment:

- ✅ Terminal - Your command center
- ✅ Homebrew - Package manager
- ✅ Git - Version control
- ✅ Node.js & npm - JavaScript runtime and packages
- ✅ VS Code - Code editor with ESLint

You're ready to start coding!

---

## Quick Reference

**Commands you'll use often:**

```bash
# Check versions
brew --version
git --version
node --version
npm --version
code --version

# Open a project in VS Code
code ~/my-project

# Install packages with Homebrew
brew install <package-name>

# Install JavaScript packages with npm
npm install <package-name>

# Update Homebrew
brew update
brew upgrade
```

---

## Troubleshooting

### "Permission denied" errors

**Don't use `sudo` with Homebrew!** If you have permission issues:

```bash
sudo chown -R $(whoami) /opt/homebrew
```

Or for Intel Macs:

```bash
sudo chown -R $(whoami) /usr/local
```

### "Command not found: brew"

**Solution:**
1. Close Terminal completely (Cmd+Q)
2. Open new Terminal
3. Try again

Still not working? You may need to add Homebrew to your PATH manually:

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
source ~/.zprofile
```

### npm install fails with EACCES

**Solution:** npm installed with wrong permissions. Fix it:

```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.zprofile
source ~/.zprofile
```

### Git shows "xcrun: error"

**Solution:** Accept Xcode license:

```bash
sudo xcodebuild -license accept
```

### "command not found: code"

**Solution:** The `code` shell command isn't installed yet.

1. Open VS Code manually (from Applications)
2. Press `Cmd + Shift + P`
3. Type `shell command` and select **"Install 'code' command in PATH"**
4. Restart Terminal and try again

### VS Code opens but no folder in sidebar

Make sure you're opening a folder, not just a file:
```bash
code ~/my-project    # Opens a folder ✅
code ~/file.js       # Opens just one file
```

### Installation taking forever?

**This is normal!** First-time Homebrew installs can take 10-15 minutes. Be patient, don't close Terminal.

### Still stuck?

Check [Lesson 2: Troubleshooting Guide](/course/module/0/lesson/2) for more help!

---

## Key Concepts You Learned

**Terminal**: Application for running text commands
**Command**: Instruction you type and execute
**Package Manager**: Tool that installs other tools (Homebrew, npm)
**Version Control**: System for tracking code changes (Git)
**Runtime**: Environment where code runs (Node.js for JavaScript)
**Code Editor**: Application for viewing and editing code (VS Code)
**Extension**: Plugin that adds features to VS Code (like ESLint)
**Global Install**: Available everywhere on your system

---

**Next:** [Module 1: Command Line Basics →](/course)  
**Having issues?** [Lesson 2: Troubleshooting →](/course/module/0/lesson/2)  
**Module Overview:** [Module 0: Setup](/course/module/0)
