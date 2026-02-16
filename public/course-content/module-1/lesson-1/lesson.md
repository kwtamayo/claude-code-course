---
{
  "moduleId": "module-1",
  "lessonId": "lesson-1",
  "title": "Navigating the File System",
  "timeEstimate": "20 minutes",
  "prerequisites": ["module-0-lesson-1"],
  "learningObjectives": [
    "Understand how files and folders are organized on your Mac",
    "Use pwd to find your current location",
    "Use ls to see what's in a folder",
    "Use cd to move between folders",
    "Understand absolute vs relative paths"
  ],
  "validation": {
    "tasks": [
      {
        "id": "use-pwd",
        "description": "Run pwd and paste the output to confirm it works",
        "type": "paste-output",
        "expectedPatterns": [
          "^/Users/",
          "^/home/"
        ],
        "hints": [
          "Type: pwd",
          "You should see something like /Users/yourname"
        ]
      },
      {
        "id": "list-home",
        "description": "Run ls in your home directory and paste the output",
        "type": "paste-output",
        "expectedPatterns": [
          "Desktop|Documents|Downloads"
        ],
        "hints": [
          "First run: cd ~",
          "Then run: ls",
          "You should see folders like Desktop, Documents, Downloads"
        ]
      },
      {
        "id": "command-go-home",
        "description": "What command takes you to your home directory?",
        "type": "command-match",
        "acceptableAnswers": ["cd ~", "cd", "cd ~/"],
        "hints": [
          "The tilde ~ is a shortcut for your home directory",
          "Try: cd ~"
        ]
      },
      {
        "id": "command-go-up",
        "description": "What command moves you up one directory?",
        "type": "command-match",
        "acceptableAnswers": ["cd ..", "cd ../" ],
        "hints": [
          "Two dots (..) means 'parent directory'",
          "Try: cd .."
        ]
      },
      {
        "id": "command-list-details",
        "description": "What command shows a detailed list of files, including hidden ones?",
        "type": "command-match",
        "acceptableAnswers": ["ls -la", "ls -al", "ls -la .", "ls -al ."],
        "hints": [
          "Combine the -l (long) and -a (all) flags",
          "Try: ls -la"
        ]
      }
    ]
  }
}
---

# Navigating the File System

In Module 0 you set up your tools. Now it's time to actually use them. The terminal is your main tool for telling the computer what to do — and the first skill is knowing **where you are** and **how to move around**.

## How Your Computer Organizes Files

Your Mac organizes everything in a tree of folders (also called **directories**). It starts from a single root folder called `/` and branches out from there.

Here's a simplified view:

```
/                          ← Root (the very top)
├── Users/
│   └── yourname/          ← Your home directory (~)
│       ├── Desktop/
│       ├── Documents/
│       ├── Downloads/
│       └── Developer/     ← Where your code projects live
├── Applications/
└── System/
```

When you open Terminal, you start in your **home directory** — that's `/Users/yourname`. Everything you do in this course happens somewhere inside this tree.

---

## Where Am I? — `pwd`

The first command to learn: **print working directory**. Try it:

```bash
pwd
```

You should see something like:

```
/Users/yourname
```

That's your **home directory**. Think of it as your starting point.

::validate[use-pwd]

---

## What's Here? — `ls`

Now that you know *where* you are, let's see *what's here*.

```bash
ls
```

`ls` lists the contents of your current directory. You'll see folders like `Desktop`, `Documents`, `Downloads`.

### See More Detail

```bash
ls -l
```

The `-l` flag shows a **long listing** — file sizes, dates, permissions. Flags are options that modify how a command behaves. They usually start with a dash.

### See Hidden Files

```bash
ls -a
```

The `-a` flag shows **all** files, including hidden ones. Hidden files start with a dot (like `.zshrc` — your shell config file).

### Combine Flags

```bash
ls -la
```

This combines both: detailed view of everything, including hidden files. You'll use this often.

**Go to your home directory and list its contents:**

```bash
cd ~
ls
```

::validate[list-home]

---

## Moving Around — `cd`

`cd` stands for **change directory**. It's how you move through the folder tree.

### Go to a Specific Folder

```bash
cd Documents
```

This moves you *into* the Documents folder. Now if you run `pwd`, you'll see `/Users/yourname/Documents`.

### Go Back Up

```bash
cd ..
```

Two dots `..` means "the parent directory" — one level up. So from `/Users/yourname/Documents`, `cd ..` takes you back to `/Users/yourname`.

### Go Straight Home

```bash
cd ~
```

The tilde `~` is a shortcut for your home directory. No matter where you are, `cd ~` takes you home. You can also just type `cd` with nothing after it — same result.

### Go to an Absolute Path

```bash
cd /Users/yourname/Desktop
```

An **absolute path** starts with `/` and spells out the full location from root. It works no matter where you currently are.

### Go to a Relative Path

```bash
cd Documents/projects
```

A **relative path** doesn't start with `/` — it's relative to where you are now. This only works if `Documents/projects` exists inside your current directory.

::validate[command-go-home]

::validate[command-go-up]

---

## Absolute vs Relative — Why It Matters

This is worth understanding clearly because it comes up constantly.

| Type | Starts with | Example | Meaning |
|------|-------------|---------|---------|
| **Absolute** | `/` | `/Users/yourname/Desktop` | Full path from root — always works |
| **Relative** | Anything else | `Desktop` or `../Documents` | Relative to where you are now |

**Analogy:** Absolute is like a full street address ("123 Main St, San Francisco"). Relative is like directions from where you are ("go two blocks north").

---

## Shortcuts to Remember

| Shortcut | Meaning |
|----------|---------|
| `~` | Your home directory |
| `.` | Current directory (where you are now) |
| `..` | Parent directory (one level up) |
| `/` | Root directory (the very top) |

Try chaining them:

```bash
cd ~/Desktop
```

This goes to your Desktop no matter where you are. It's an absolute path using the `~` shortcut.

```bash
cd ../../
```

This goes up two levels. If you're in `/Users/yourname/Documents/projects`, this takes you to `/Users/yourname`.

---

## Tab Completion — Your Best Friend

Here's a productivity tip: **press Tab to autocomplete**.

1. Type `cd Docu` and press **Tab**
2. Terminal fills in `cd Documents/`

This works for any file or folder name. If there are multiple matches, press Tab twice to see all options.

**You'll save a lot of typing this way.** Get in the habit now.

---

## Check Your Understanding

::validate[command-list-details]

---

## Key Concepts

| Term | Meaning |
|------|---------|
| **Directory** | A folder |
| **Working directory** | The folder you're currently in |
| **Path** | The location of a file or folder |
| **Absolute path** | Full path from root (`/Users/...`) |
| **Relative path** | Path from your current location |
| **Flag** | An option that modifies a command (`-l`, `-a`) |
| **Home directory** | Your personal folder (`~` or `/Users/yourname`) |

---

**Next:** [Lesson 2: Working with Files →](/course/module/1/lesson/2)
**Module Overview:** [Module 1: Command Line Basics](/course/module/1)
