---
{
  "moduleId": "module-0",
  "lessonId": "lesson-2",
  "title": "Clean Slate Script",
  "timeEstimate": "10 minutes",
  "prerequisites": ["module-0-lesson-1"],
  "learningObjectives": [
    "Create and run a bash script",
    "Understand script output and system scanning",
    "Identify what needs to be cleaned up",
    "Make informed decisions about removing software"
  ],
  "validation": {
    "tasks": [
      {
        "id": "create-script",
        "description": "Create the discovery script file",
        "type": "paste-output",
        "expectedPatterns": [
          "discover.sh",
          "-rw-r--r--"
        ],
        "hints": [
          "Use the 'touch' command to create a file",
          "Use 'ls -la' to verify the file was created"
        ]
      },
      {
        "id": "make-executable",
        "description": "Make the script executable",
        "type": "paste-output",
        "expectedPatterns": [
          "-rwxr-xr-x",
          "discover.sh"
        ],
        "hints": [
          "Use 'chmod +x discover.sh' to make it executable",
          "The 'x' in permissions means executable"
        ]
      },
      {
        "id": "run-script",
        "description": "Run the discovery script",
        "type": "paste-output",
        "expectedPatterns": [
          "System Discovery Report",
          "macOS Version"
        ],
        "hints": [
          "Run the script with './discover.sh'",
          "Make sure you're in the directory where the script is"
        ]
      }
    ]
  }
}
---

# Lesson 2: Clean Slate Script

Now that you know what's on your system, let's create a script that helps you make informed decisions about what to keep and what to remove.

## What is a Script?

A **script** is a file containing commands that the computer can run automatically. Instead of typing commands one by one, you put them all in a file and run them together.

**Think of it like a recipe:**
- A recipe lists steps in order
- You follow them one by one
- Scripts do the same, but for the computer

## Step 1: Create a New Directory

Let's keep our work organized. Create a folder for this course:

```bash
mkdir -p ~/course-workspace
cd ~/course-workspace
```

**What this does:**
- `mkdir -p` creates a directory (the `-p` flag means "create parent directories if needed")
- `~/course-workspace` means a folder called "course-workspace" in your home directory
- `cd` changes to that directory

## Step 2: Create the Discovery Script

Now let's create our first script file:

```bash
touch discover.sh
```

**Verify it was created:**
```bash
ls -la discover.sh
```

You should see:
```
-rw-r--r--  1 yourusername  staff  0 Jan 30 12:00 discover.sh
```

## Step 3: Add Content to the Script

We'll use `nano` to edit the file:

```bash
nano discover.sh
```

**Copy and paste this entire script:**

```bash
#!/bin/bash

# System Discovery Script
# This script scans your Mac for development tools

echo "=================================="
echo "System Discovery Report"
echo "=================================="
echo ""

# Check macOS version
echo "📍 macOS Version:"
sw_vers
echo ""

# Check for Homebrew
echo "📦 Homebrew:"
if command -v brew &> /dev/null; then
    echo "✓ Installed"
    brew --version
    echo "Location: $(which brew)"
    
    # Check for permission issues
    BREW_PREFIX=$(brew --prefix)
    if [ ! -w "$BREW_PREFIX" ]; then
        echo "⚠️  WARNING: Permission issues detected"
    fi
else
    echo "✗ Not installed"
fi
echo ""

# Check for Git
echo "🔀 Git:"
if command -v git &> /dev/null; then
    echo "✓ Installed"
    git --version
    echo "Location: $(which git)"
else
    echo "✗ Not installed"
fi
echo ""

# Check for Node.js
echo "🟢 Node.js:"
if command -v node &> /dev/null; then
    echo "✓ Installed"
    node --version
    echo "npm version: $(npm --version)"
    echo "Location: $(which node)"
else
    echo "✗ Not installed"
fi
echo ""

# Check for Python
echo "🐍 Python:"
if command -v python3 &> /dev/null; then
    echo "✓ Installed"
    python3 --version
    echo "Location: $(which python3)"
else
    echo "✗ Not installed"
fi
echo ""

# Check disk space
echo "💾 Disk Space:"
df -h / | tail -1 | awk '{print "Available: " $4 " of " $2}'
echo ""

echo "=================================="
echo "Report Complete"
echo "=================================="
```

**Save the file:**
- Press `Ctrl+X`
- Press `Y` to confirm
- Press `Enter` to save

## Step 4: Make the Script Executable

Right now, the file exists but can't be run. We need to give it "execute" permission:

```bash
chmod +x discover.sh
```

**Verify permissions changed:**
```bash
ls -la discover.sh
```

Now you should see:
```
-rwxr-xr-x  1 yourusername  staff  1234 Jan 30 12:00 discover.sh
```

**Notice the 'x'** - that means "executable"!

## Step 5: Run Your Script

```bash
./discover.sh
```

**What `./` means:**
- `.` = current directory
- `/` = path separator
- `discover.sh` = the script name
- Together: "run discover.sh from the current directory"

## Understanding the Output

Your script will show you:

### ✓ Green Checkmarks
Things that ARE installed on your system

### ✗ Red X's  
Things that are NOT installed

### ⚠️ Warnings
Things that might cause problems (like permission issues)

## What to Look For

**Ideal "Clean Slate" Result:**
```
✗ Homebrew not installed
✗ Node.js not installed
✓ Git installed (but might be Apple's default version)
```

**Common "Messy" Result:**
```
✓ Homebrew installed
⚠️ WARNING: Permission issues detected
✓ Node.js installed (v14.2.0)
✓ Python installed
```

## Making Decisions

Based on your output, you'll decide:

### Scenario A: Mostly Clean
If you see mostly ✗ symbols, you're in great shape! You can skip cleanup and go straight to fresh installation.

### Scenario B: Some Old Stuff
If you have some ✓ symbols but no ⚠️ warnings, you might want to keep things as-is or do selective cleanup.

### Scenario C: Messy with Warnings
If you see ⚠️ symbols (especially permission issues), you'll benefit from a full cleanup and fresh start.

## Save Your Report

Let's save the output for reference:

```bash
./discover.sh > system-report.txt
```

**This creates a file with your report.** You can view it anytime:

```bash
cat system-report.txt
```

## What You've Learned

🎉 Congratulations! You just:
- ✅ Created your first bash script
- ✅ Made a file executable
- ✅ Ran a script from the command line
- ✅ Understood file permissions
- ✅ Learned to redirect output to a file

## Key Concepts

**Script**: A file containing commands to run automatically  
**Executable**: A file that can be run as a program  
**Permissions**: Rules about who can read, write, or execute a file  
**`chmod`**: Command to change file permissions  
**`./`**: Means "run from current directory"

## Troubleshooting

### "Permission denied"
You forgot to run `chmod +x discover.sh`. Go back to Step 4.

### "No such file or directory"
You're not in the right directory. Run:
```bash
cd ~/course-workspace
ls
```
You should see `discover.sh` listed.

### "Command not found: brew" (or similar)
That's expected! The script is CHECKING if things are installed. If they're not, it says so.

### Script runs but shows nothing
Make sure you copied the entire script. It's long! Scroll up in nano to verify.

---

**Next:** [Lesson 3: Fresh Installation →](../lesson-3/lesson.md)  
**Back:** [Lesson 1: Environment Discovery ←](../lesson-1/lesson.md)
