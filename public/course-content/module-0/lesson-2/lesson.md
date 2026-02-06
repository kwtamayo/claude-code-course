---
{
  "moduleId": "module-0",
  "lessonId": "lesson-2",
  "title": "Troubleshooting Guide",
  "timeEstimate": "As needed",
  "prerequisites": ["module-0-lesson-1"],
  "learningObjectives": [
    "Diagnose common installation problems",
    "Fix permission issues",
    "Resolve PATH problems",
    "Know when to start fresh"
  ],
  "validation": {
    "tasks": []
  }
}
---

# Troubleshooting Guide

**Only here if something went wrong in Lesson 1!** This is a reference guide for common issues.

## Quick Diagnosis

Run this to check your setup:

```bash
echo "=== System Check ==="
echo "macOS: $(sw_vers -productVersion)"
echo "Homebrew: $(brew --version 2>&1 | head -1)"
echo "Git: $(git --version 2>&1)"
echo "Node: $(node --version 2>&1)"
echo "npm: $(npm --version 2>&1)"
```

---

## Common Issues

### 1. "command not found: brew"

**Symptoms:** Homebrew commands don't work

**Causes:**
- Homebrew not installed
- Not in your PATH
- Need to restart Terminal

**Solutions:**

**Try 1:** Restart Terminal
- Close Terminal completely (Cmd+Q)
- Open new Terminal
- Try `brew --version` again

**Try 2:** Add to PATH manually

For Apple Silicon (M1/M2/M3):
```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
source ~/.zprofile
```

For Intel Mac:
```bash
echo 'eval "$(/usr/local/bin/brew shellenv)"' >> ~/.zprofile
source ~/.zprofile
```

**Try 3:** Reinstall Homebrew
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

---

### 2. Permission Errors

**Symptoms:**
- "Permission denied"
- "EACCES" errors
- Can't write to `/usr/local` or `/opt/homebrew`

**Cause:** Files owned by root or another user

**Solution - Fix Homebrew Permissions:**

For Apple Silicon:
```bash
sudo chown -R $(whoami) /opt/homebrew
```

For Intel Mac:
```bash
sudo chown -R $(whoami) /usr/local
```

**Solution - Fix npm Permissions:**

```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.zprofile
source ~/.zprofile
```

**Never use `sudo npm install`!** This causes more permission problems.

---

### 3. Multiple Versions Conflicts

**Symptoms:**
- Commands behave unexpectedly
- Old versions still showing up
- "which node" shows wrong location

**Diagnosis:**

```bash
which -a node
which -a npm
which -a git
```

If you see multiple paths, you have conflicts.

**Solution - Clean PATH:**

1. **Check your shell config:**

```bash
cat ~/.zshrc
cat ~/.zprofile
cat ~/.bash_profile
```

Look for duplicate PATH additions or old version managers (nvm, rvm, etc.)

2. **Clean up duplicates:**

```bash
nano ~/.zprofile
```

Remove any old PATH additions. Should look like:

```bash
# Homebrew
eval "$(/opt/homebrew/bin/brew shellenv)"

# npm global
export PATH=~/.npm-global/bin:$PATH
```

Save and restart Terminal.

---

### 4. Git Issues

**Problem: "xcrun: error"**

```bash
sudo xcodebuild -license accept
```

**Problem: Old Git version**

```bash
brew install git
# Then restart Terminal
```

**Problem: Git not configured**

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

---

### 5. Node/npm Issues

**Problem: "node: command not found"**

```bash
brew install node
```

**Problem: npm install fails globally**

Fix permissions (see Permission Errors above)

**Problem: Old Node version**

```bash
brew upgrade node
```

---

### 6. Homebrew Issues

**Problem: "brew update" fails**

```bash
brew update --force --quiet
```

**Problem: "Permission denied" during brew install**

```bash
sudo chown -R $(whoami) $(brew --prefix)
```

**Problem: Homebrew says "shallow clone"**

```bash
git -C /opt/homebrew/Library/Taps/homebrew/homebrew-core fetch --unshallow
git -C /opt/homebrew/Library/Taps/homebrew/homebrew-cask fetch --unshallow
```

---

## Nuclear Option: Start Completely Fresh

If nothing works and you want to start over:

### 1. Uninstall Everything

**Uninstall Homebrew:**

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/uninstall.sh)"
```

**Remove Node (if not via Homebrew):**

```bash
sudo rm -rf /usr/local/lib/node_modules
sudo rm -rf /usr/local/bin/node
sudo rm -rf /usr/local/bin/npm
```

**Clean shell configs:**

```bash
nano ~/.zprofile
# Remove all Homebrew, Node, npm lines
# Save and exit
```

### 2. Restart Mac

Yes, actually restart. It clears everything.

### 3. Go Back to Lesson 1

Start fresh from the beginning. This time it should work cleanly!

---

## Prevention Tips

**To avoid future problems:**

1. **Always use Homebrew** for installing dev tools
2. **Never use `sudo` with Homebrew or npm**
3. **Keep one version of each tool** (uninstall old ones)
4. **Update regularly:**
   ```bash
   brew update
   brew upgrade
   ```
5. **Close and reopen Terminal** after installing

---

## Still Stuck?

### Check System Requirements

**Minimum:**
- macOS 10.15 (Catalina) or higher
- 5GB free disk space
- Internet connection
- Not using work/school computer with restrictions

### Get Help

1. **Check error message carefully** - often tells you exactly what's wrong
2. **Search the error** - Google the exact error message
3. **Check official docs:**
   - [Homebrew Troubleshooting](https://docs.brew.sh/Troubleshooting)
   - [Node.js Issues](https://github.com/nodejs/node/issues)
   - [Git Help](https://git-scm.com/docs)

4. **Ask for help:**
   - Open an issue on our [GitHub](https://github.com/kwtamayo/claude-code-course/issues)
   - Include: error message, macOS version, what you tried

---

## Understanding What Went Wrong

Common reasons for problems:

**Previous installations:** Old tools installed incorrectly
**Mixed installers:** Tools installed from different sources
**Permission issues:** Files owned by wrong user
**PATH problems:** Computer can't find your tools
**Old macOS:** Need to update your operating system

**The good news:** Once you get it working, it usually stays working!

---

**Back to:** [Lesson 1: Setup →](/course/module/0/lesson/1)  
**Continue to:** [Module 1: Command Line Basics →](/course)
