---
{
  "moduleId": "module-0",
  "lessonId": "lesson-3",
  "title": "Fresh Installation",
  "timeEstimate": "10 minutes",
  "prerequisites": ["module-0-lesson-2"],
  "learningObjectives": [
    "Install Homebrew package manager correctly",
    "Install Node.js and npm via Homebrew",
    "Verify installations are working",
    "Understand the importance of proper installation order"
  ],
  "validation": {
    "tasks": [
      {
        "id": "verify-homebrew",
        "description": "Verify Homebrew is installed and working",
        "type": "paste-output",
        "expectedPatterns": [
          "Homebrew",
          "/opt/homebrew|/usr/local",
          "\\d+\\.\\d+\\.\\d+"
        ],
        "hints": [
          "Run 'brew --version' to check",
          "You should see a version number like 4.2.0"
        ]
      },
      {
        "id": "verify-node",
        "description": "Verify Node.js is installed via Homebrew",
        "type": "paste-output",
        "expectedPatterns": [
          "v\\d+\\.\\d+\\.\\d+",
          "node"
        ],
        "hints": [
          "Run 'node --version' to check",
          "You should see something like 'v20.11.0'"
        ]
      },
      {
        "id": "verify-npm",
        "description": "Verify npm is installed with Node",
        "type": "paste-output",
        "expectedPatterns": [
          "\\d+\\.\\d+\\.\\d+",
          "npm"
        ],
        "hints": [
          "Run 'npm --version' to check",
          "npm comes bundled with Node.js"
        ]
      },
      {
        "id": "test-install",
        "description": "Test that you can install a package",
        "type": "paste-output",
        "expectedPatterns": [
          "added",
          "packages"
        ],
        "hints": [
          "Try: npm install -g cowsay",
          "This installs a fun test package globally"
        ]
      }
    ]
  }
}
---

# Lesson 3: Fresh Installation

You've discovered what's on your system and understand what you need. Now let's install everything fresh and properly!

## Installation Order Matters

We'll install in this specific order because each tool depends on the previous one:

1. **Homebrew** - Package manager (the "app store" for developers)
2. **Git** - Version control (likely already installed, but we'll update it)
3. **Node.js** - JavaScript runtime (includes npm)

## Part 1: Installing Homebrew

### What is Homebrew?

Homebrew is a **package manager** - think of it as the App Store for command-line tools. Instead of downloading installers from websites, you type:

```bash
brew install something
```

And it handles everything!

### The Installation Command

**Important**: Read what this command does before running it!

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

**Breaking it down:**
- `/bin/bash -c` = Run a bash command
- `curl -fsSL [URL]` = Download a script from GitHub
- The script is from Homebrew's official repository
- `$(...)` = Execute what's downloaded

### Run the Installation

Copy that command and run it. You'll see:

1. **Explanation of what will be installed**
   - Read this! It tells you exactly what Homebrew will do
   
2. **Password prompt**
   - Enter your Mac password
   - You won't see characters as you type (normal!)
   
3. **Installation progress**
   - Takes 5-10 minutes
   - Don't close Terminal!

4. **"Next steps" instructions**
   - **IMPORTANT**: You might see a message about adding Homebrew to your PATH
   - If you see commands to run, copy and run them!

### Add Homebrew to Your PATH (If Needed)

If you're on **Apple Silicon Mac (M1/M2/M3)**, you'll need to run:

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

If you're on **Intel Mac**, this happens automatically.

### Verify Homebrew Works

```bash
brew --version
```

You should see:
```
Homebrew 4.2.0
```

**If you see "command not found":**
- Close Terminal completely
- Open a new Terminal window
- Try again

## Part 2: Update Git

macOS comes with an old version of Git. Let's get the latest:

```bash
brew install git
```

**Verify:**
```bash
git --version
```

Should show something like:
```
git version 2.43.0
```

## Part 3: Install Node.js

This is what we'll use to run JavaScript and build the course projects:

```bash
brew install node
```

This installs both:
- **Node.js** - JavaScript runtime
- **npm** - Node Package Manager

**Verify Node.js:**
```bash
node --version
```

Should show:
```
v20.11.0
```

**Verify npm:**
```bash
npm --version
```

Should show:
```
10.2.4
```

## Part 4: Test Your Setup

Let's make sure everything works by installing a fun test package:

```bash
npm install -g cowsay
```

**What this does:**
- `npm install` = install a package
- `-g` = globally (available everywhere)
- `cowsay` = a fun program that makes ASCII art cows

**Run it:**
```bash
cowsay "I installed development tools!"
```

You should see:
```
 _________________________________
< I installed development tools! >
 ---------------------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```

If you see the cow, **everything is working!** 🎉

## Part 5: Set Up Your Shell

Let's make your Terminal more friendly. We'll configure your shell profile:

```bash
# Open your shell config file
nano ~/.zshrc
```

**Add these helpful aliases at the end:**

```bash
# Helpful aliases for the course
alias ll='ls -la'
alias ..='cd ..'
alias ~='cd ~'
alias projects='cd ~/Developer'

# Git shortcuts
alias gs='git status'
alias ga='git add'
alias gc='git commit'
alias gp='git push'

# npm shortcuts
alias ni='npm install'
alias ns='npm start'
alias nt='npm test'
```

**Save:** `Ctrl+X`, then `Y`, then `Enter`

**Apply changes:**
```bash
source ~/.zshrc
```

**Test an alias:**
```bash
ll
```

Should show a detailed file listing!

## What You've Accomplished

🎉 **Amazing work!** You've built a complete development environment from scratch:

- ✅ Installed Homebrew package manager
- ✅ Updated Git to latest version
- ✅ Installed Node.js and npm
- ✅ Verified everything works
- ✅ Set up helpful shell aliases

## Verify Everything One More Time

Run the discovery script from Lesson 2:

```bash
cd ~/course-workspace
./discover.sh
```

You should now see:
```
✓ Homebrew installed
✓ Git installed
✓ Node.js installed
✓ npm installed
```

**Save this report:**
```bash
./discover.sh > final-setup-report.txt
```

## Understanding What You Have

### Homebrew (`/opt/homebrew` or `/usr/local`)
- Package manager
- Updates automatically
- Use for installing most dev tools

### Git (`/usr/local/bin/git` or `/opt/homebrew/bin/git`)
- Version control
- Newer than Apple's default Git
- Essential for all development

### Node.js (`/opt/homebrew/bin/node`)
- JavaScript runtime
- Includes npm for packages
- What we'll use to build projects

### npm (`/opt/homebrew/bin/npm`)
- Package manager for JavaScript
- Comes with Node
- Install with `npm install`

## Key Concepts

**Package Manager**: Software that installs and updates other software  
**PATH**: List of directories where your computer looks for programs  
**Global Install**: Available everywhere on your system (vs. project-specific)  
**Shell Profile**: Configuration file that runs when you open Terminal  
**Alias**: Shortcut command you create

## Troubleshooting

### "Homebrew: command not found"
**Solution**: Close Terminal completely, open new window, try again. Homebrew needs a fresh shell to work.

### "Permission denied" during npm install
**Solution**: Don't use `sudo` with Homebrew installs! If you see permission errors:
```bash
sudo chown -R $(whoami) /opt/homebrew
```

### npm install fails with EACCES error
**Solution**: npm was installed with wrong permissions. Fix:
```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.zprofile
source ~/.zprofile
```

### "xcrun: error" when using Git
**Solution**: Need to accept Xcode license:
```bash
sudo xcodebuild -license accept
```

### Installation takes forever
**Solution**: Normal! Homebrew installs can take 10-15 minutes on first run. Be patient.

## Clean vs. Messy Installation

**If you followed this lesson**, you have:
- ✅ Clean Homebrew install
- ✅ Correct permissions
- ✅ Up-to-date tools
- ✅ Everything in the right place

**If you installed things randomly before**, you might have:
- ❌ Mixed permissions
- ❌ Multiple versions of the same tool
- ❌ Tools in wrong locations
- ❌ Permission errors when installing

**That's why starting fresh matters!**

## Next Steps

You now have a complete development environment! In the next modules, you'll learn to:
- Use the command line effectively
- Master Git and GitHub
- Write and run code
- Build real applications

---

**Next:** [Module 1: Command Line Basics →](../../module-1/README.md)  
**Back:** [Lesson 2: Clean Slate Script ←](../lesson-2/lesson.md)  
**Module Overview:** [Module 0: Clean Slate Setup](../README.md)
