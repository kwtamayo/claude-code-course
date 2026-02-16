---
{
  "moduleId": "module-1",
  "lessonId": "lesson-2",
  "title": "Working with Files",
  "timeEstimate": "20 minutes",
  "prerequisites": ["module-1-lesson-1"],
  "learningObjectives": [
    "Create folders with mkdir",
    "Create files with touch",
    "Read file contents with cat",
    "Copy, move, and rename files",
    "Delete files and folders safely"
  ],
  "validation": {
    "tasks": [
      {
        "id": "command-mkdir",
        "description": "What command creates a folder called 'projects'?",
        "type": "command-match",
        "acceptableAnswers": ["mkdir projects"],
        "hints": [
          "mkdir stands for 'make directory'",
          "Try: mkdir projects"
        ]
      },
      {
        "id": "command-touch",
        "description": "What command creates an empty file called 'notes.txt'?",
        "type": "command-match",
        "acceptableAnswers": ["touch notes.txt"],
        "hints": [
          "touch creates a new empty file",
          "Try: touch notes.txt"
        ]
      },
      {
        "id": "command-rename",
        "description": "What command renames 'old.txt' to 'new.txt'?",
        "type": "command-match",
        "acceptableAnswers": ["mv old.txt new.txt"],
        "hints": [
          "There's no dedicated rename command — you use mv (move)",
          "Moving a file to a new name in the same folder renames it",
          "Try: mv old.txt new.txt"
        ]
      },
      {
        "id": "command-copy",
        "description": "What command copies 'readme.md' into a folder called 'backup'?",
        "type": "command-match",
        "acceptableAnswers": ["cp readme.md backup", "cp readme.md backup/", "cp readme.md backup/readme.md"],
        "hints": [
          "cp takes two arguments: source and destination",
          "Try: cp readme.md backup/"
        ]
      },
      {
        "id": "command-remove-folder",
        "description": "What command deletes a folder called 'temp' and everything inside it?",
        "type": "command-match",
        "acceptableAnswers": ["rm -r temp", "rm -r temp/", "rm -rf temp", "rm -rf temp/"],
        "hints": [
          "rm alone only deletes files, not folders",
          "The -r flag means 'recursive' — it goes into the folder and deletes everything",
          "Try: rm -r temp"
        ]
      }
    ]
  }
}
---

# Working with Files

In the last lesson you learned to navigate — now it's time to actually **create, copy, move, and delete** things. These are the commands you'll use every time you work on a project.

Let's practice in a safe sandbox. First, create a practice folder:

```bash
mkdir ~/command-practice
cd ~/command-practice
```

We'll do all our experiments here so we don't accidentally mess with anything important.

---

## Creating Folders — `mkdir`

`mkdir` stands for **make directory**.

```bash
mkdir my-folder
```

This creates a new folder called `my-folder` inside your current directory.

### Create Nested Folders

What if you want to create a folder inside a folder that doesn't exist yet?

```bash
mkdir -p projects/web/dashboard
```

The `-p` flag creates the entire path — it makes `projects`, then `web` inside it, then `dashboard` inside that. Without `-p`, this would fail because `projects` doesn't exist yet.

**Try it:**

```bash
mkdir -p projects/web/dashboard
ls projects
ls projects/web
```

You should see the nested structure you just created.

::validate[command-mkdir]

---

## Creating Files — `touch`

`touch` creates an empty file. If the file already exists, it updates its timestamp (that's actually its original purpose, but everyone uses it to create files).

```bash
touch notes.txt
```

Creates a new empty file called `notes.txt`.

**Create a few files:**

```bash
touch readme.md
touch index.html
touch style.css
ls
```

You should see all three files plus the `projects` folder from earlier.

::validate[command-touch]

---

## Reading Files — `cat`

`cat` displays the contents of a file right in your terminal. The name comes from "concatenate" (joining things together), but it's most commonly used to just read a file.

Right now our files are empty, so let's put something in one. Run this:

```bash
echo 'Hello from the command line!' > notes.txt
```

**What happened?** `echo` prints text, and `>` redirects that text into a file instead of showing it on screen. This is called **output redirection**.

Now read it:

```bash
cat notes.txt
```

You should see: `Hello from the command line!`

### Add More Content

```bash
echo "This is a second line." >> notes.txt
cat notes.txt
```

Notice the **double arrow `>>`** — this *appends* to the file. A single `>` would *overwrite* it.

| Operator | Meaning |
|----------|---------|
| `>` | Write to file (replaces existing content) |
| `>>` | Append to file (adds to the end) |

---

## Copying Files — `cp`

`cp` copies a file from one location to another.

```bash
cp notes.txt notes-backup.txt
```

Now you have two files with the same content. The original is untouched.

### Copy into a Folder

```bash
mkdir backup
cp notes.txt backup/
```

This copies `notes.txt` into the `backup` folder. The original stays where it is.

### Copy a Folder

To copy an entire folder, you need the `-r` (recursive) flag:

```bash
cp -r projects projects-copy
```

Without `-r`, `cp` refuses to copy directories — it doesn't know to go inside and copy everything.

::validate[command-copy]

---

## Moving and Renaming — `mv`

`mv` does two things depending on how you use it:

### Move a File

```bash
mv style.css projects/
```

This moves `style.css` into the `projects` folder. The original is gone from the current directory.

### Rename a File

```bash
mv readme.md README.md
```

Moving a file to a new name in the **same folder** is how you rename. There's no dedicated rename command.

### Move and Rename at Once

```bash
mv index.html projects/web/index.html
```

This moves the file AND keeps (or changes) its name in one step.

::validate[command-rename]

---

## Deleting Files — `rm`

`rm` removes files. **There is no undo.** Deleted files don't go to the Trash — they're gone.

```bash
rm notes-backup.txt
```

### Delete a Folder

`rm` alone won't delete folders. You need the `-r` flag:

```bash
rm -r projects-copy
```

The `-r` means **recursive** — it goes into the folder and deletes everything inside, then the folder itself.

### The Danger Zone

You'll sometimes see `rm -rf` in tutorials. The `-f` flag means **force** — no confirmation prompts.

**Rules for safe deletion:**
1. **Always double-check what you're deleting** — run `ls` first
2. **Never run `rm -rf /`** — this tries to delete your entire system
3. **Never run `rm -rf ~`** — this deletes your entire home directory
4. **Be extra careful with wildcards** — `rm *.txt` deletes all .txt files
5. **When in doubt, don't.** You can always delete later

::validate[command-remove-folder]

---

## Clean Up

Let's clean up our practice area:

```bash
cd ~
rm -r command-practice
```

Everything we created is gone. This is fine — it was just practice.

---

## Quick Reference

| Command | What it does | Example |
|---------|-------------|---------|
| `mkdir` | Create a folder | `mkdir my-folder` |
| `mkdir -p` | Create nested folders | `mkdir -p a/b/c` |
| `touch` | Create an empty file | `touch file.txt` |
| `cat` | Read a file | `cat file.txt` |
| `echo "text" > file` | Write text to a file | `echo "hello" > file.txt` |
| `echo "text" >> file` | Append text to a file | `echo "more" >> file.txt` |
| `cp` | Copy a file | `cp source.txt dest.txt` |
| `cp -r` | Copy a folder | `cp -r folder/ copy/` |
| `mv` | Move or rename | `mv old.txt new.txt` |
| `rm` | Delete a file | `rm file.txt` |
| `rm -r` | Delete a folder | `rm -r folder/` |

---

## Key Concepts

| Term | Meaning |
|------|---------|
| **Redirect (`>`)** | Send command output to a file |
| **Append (`>>`)** | Add to the end of a file |
| **Recursive (`-r`)** | Apply to a folder and everything inside it |
| **Force (`-f`)** | Skip confirmation prompts |

---

**Next:** [Lesson 3: Putting It All Together →](/course/module/1/lesson/3)
**Previous:** [Lesson 1: Navigating the File System →](/course/module/1/lesson/1)
**Module Overview:** [Module 1: Command Line Basics](/course/module/1)
