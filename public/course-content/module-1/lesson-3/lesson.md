---
{
  "moduleId": "module-1",
  "lessonId": "lesson-3",
  "title": "Putting It All Together",
  "timeEstimate": "20 minutes",
  "prerequisites": ["module-1-lesson-2"],
  "learningObjectives": [
    "Build a project folder structure from scratch",
    "Use open to bridge Terminal and Finder",
    "Chain commands efficiently",
    "Understand how these skills connect to the rest of the course"
  ],
  "validation": {
    "tasks": [
      {
        "id": "verify-structure",
        "description": "Create the project structure below, then run 'ls -R ~/my-dashboard' and paste the output",
        "type": "paste-output",
        "expectedPatterns": [
          "src",
          "public",
          "index\\.html"
        ],
        "hints": [
          "Run: mkdir -p ~/my-dashboard/src ~/my-dashboard/public",
          "Run: touch ~/my-dashboard/src/App.jsx ~/my-dashboard/src/main.jsx ~/my-dashboard/public/index.html ~/my-dashboard/README.md",
          "Then run: ls -R ~/my-dashboard"
        ]
      },
      {
        "id": "command-open-finder",
        "description": "What command opens the current folder in Finder?",
        "type": "command-match",
        "acceptableAnswers": ["open .", "open ./"],
        "hints": [
          "open launches files or folders in their default app",
          "The dot (.) means 'current directory'",
          "Try: open ."
        ]
      },
      {
        "id": "command-chain",
        "description": "Write a single line that creates a folder called 'test' AND creates a file called 'test/hello.txt' inside it",
        "type": "command-match",
        "acceptableAnswers": [
          "mkdir test && touch test/hello.txt",
          "mkdir test && touch test/hello.txt",
          "mkdir -p test && touch test/hello.txt"
        ],
        "hints": [
          "Use && to chain two commands on one line",
          "The second command only runs if the first succeeds",
          "Try: mkdir test && touch test/hello.txt"
        ]
      },
      {
        "id": "command-clear",
        "description": "What command clears the terminal screen?",
        "type": "command-match",
        "acceptableAnswers": ["clear"],
        "hints": [
          "It's a simple one-word command",
          "You can also use Cmd+K on macOS"
        ]
      }
    ]
  }
}
---

# Putting It All Together

You know how to navigate and work with files. Now let's use those skills to do something real — build a project folder structure from scratch, the same way developers set up new projects.

---

## Build a Project Structure

Every web project follows a similar pattern. Let's create one:

```
my-dashboard/
├── src/            ← Your source code
│   ├── App.jsx
│   └── main.jsx
├── public/         ← Static files (images, icons)
│   └── index.html
└── README.md       ← Project description
```

### Step 1: Create the Folders

```bash
mkdir -p ~/my-dashboard/src ~/my-dashboard/public
```

One command, two folders. The `-p` flag creates `my-dashboard` and its subfolders in one go.

### Step 2: Create the Files

```bash
touch ~/my-dashboard/src/App.jsx
touch ~/my-dashboard/src/main.jsx
touch ~/my-dashboard/public/index.html
touch ~/my-dashboard/README.md
```

### Step 3: Verify It

```bash
ls -R ~/my-dashboard
```

`ls -R` lists everything **recursively** — it shows the contents of every subfolder too. You should see the full tree.

::validate[verify-structure]

---

## Open Finder from Terminal — `open`

Here's a command that bridges Terminal and the graphical world you're used to:

```bash
cd ~/my-dashboard
open .
```

This opens the current folder in **Finder**. The dot `.` means "right here." You'll see the same files and folders you just created, but in the familiar Finder view.

Other handy uses:

```bash
open ~/Desktop          # Open your Desktop in Finder
open README.md          # Open a file in its default app
open -a "Visual Studio Code" .   # Open current folder in VS Code
```

That last one is the same as `code .` — but `open -a` works for any application.

::validate[command-open-finder]

---

## Chaining Commands — `&&`

You've been running commands one at a time. But you can chain them:

```bash
mkdir test-folder && cd test-folder && touch hello.txt
```

`&&` means "if the previous command succeeds, run the next one." This is useful when commands depend on each other — you can't `cd` into a folder that doesn't exist yet, so you create it first.

**Why not just use `;`?**

```bash
mkdir test-folder ; cd test-folder ; touch hello.txt
```

The semicolon `;` runs the next command **no matter what** — even if the previous one failed. With `&&`, if `mkdir` fails (maybe the folder already exists), it stops. That's usually what you want.

| Operator | Meaning |
|----------|---------|
| `&&` | Run next command only if previous succeeded |
| `;` | Run next command regardless |

::validate[command-chain]

---

## A Few More Useful Commands

These come up constantly. Worth knowing now:

### `clear` — Clean Up the Screen

```bash
clear
```

When your terminal gets cluttered with output, `clear` gives you a fresh screen. On macOS you can also press `Cmd + K`.

::validate[command-clear]

### `history` — See Past Commands

```bash
history
```

Shows every command you've recently run. Useful when you can't remember what you did. You can also press the **up arrow** to cycle through previous commands one at a time.

### `which` — Find Where a Command Lives

```bash
which node
which git
```

This shows you the file path of a command. Useful for debugging when you have multiple versions installed (you saw this in Module 0 troubleshooting).

### `man` — Read the Manual

```bash
man ls
```

Opens the full manual page for any command. Press `q` to quit. These are dense but comprehensive — good for when you need to find a specific flag.

---

## Clean Up

Let's remove the practice project:

```bash
rm -r ~/my-dashboard
```

Don't worry — in Module 4, you'll create the real dashboard project with Claude Code.

---

## What You've Learned in Module 1

You now have the core command line skills that every developer uses daily:

**Navigation:**
- `pwd` — where am I?
- `ls` — what's here?
- `cd` — move around
- Absolute vs relative paths

**File Operations:**
- `mkdir` — create folders
- `touch` — create files
- `cat` — read files
- `cp` — copy
- `mv` — move and rename
- `rm` — delete (carefully!)

**Productivity:**
- Tab completion
- `&&` for chaining commands
- `open .` to bridge Terminal and Finder
- `clear`, `history`, `which`

**These aren't just theory** — you'll use every one of these commands throughout this course. In the next module, you'll learn Git, which builds directly on top of the terminal skills you just practiced.

---

## Quick Reference Card

```bash
# Navigation
pwd                     # Where am I?
ls                      # What's here?
ls -la                  # Detailed list with hidden files
cd folder               # Go into a folder
cd ..                   # Go up one level
cd ~                    # Go home

# File operations
mkdir folder            # Create a folder
mkdir -p a/b/c          # Create nested folders
touch file.txt          # Create a file
cat file.txt            # Read a file
cp source dest          # Copy
mv source dest          # Move or rename
rm file.txt             # Delete a file
rm -r folder            # Delete a folder

# Useful extras
open .                  # Open current folder in Finder
clear                   # Clear the screen
history                 # See past commands
which command           # Find where a command is installed
man command             # Read the manual
```

---

**Next:** [Module 2: Git Fundamentals →](/course/module/2)
**Module Overview:** [Module 1: Command Line Basics](/course/module/1)
