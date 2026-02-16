---
{
  "moduleId": "module-2",
  "lessonId": "lesson-2",
  "title": "Working with GitHub",
  "timeEstimate": "20 minutes",
  "prerequisites": ["module-2-lesson-1"],
  "learningObjectives": [
    "Understand the difference between Git and GitHub",
    "Create a repository on GitHub and connect it to your local repo",
    "Push your code to GitHub",
    "Clone an existing repository",
    "Use the pull-push workflow to keep local and remote in sync"
  ],
  "validation": {
    "tasks": [
      {
        "id": "github-repo-url",
        "description": "Paste the URL of your new GitHub repository",
        "type": "paste-output",
        "expectedPatterns": [
          "github\\.com/.+/my-first-repo"
        ],
        "hints": [
          "Go to github.com, create a new repo called 'my-first-repo'",
          "The URL will look like: https://github.com/yourusername/my-first-repo",
          "Copy it from your browser's address bar after creating the repo"
        ]
      },
      {
        "id": "verify-remote",
        "description": "Paste the output of git remote -v to confirm your remote is set up",
        "type": "paste-output",
        "expectedPatterns": [
          "origin.*github\\.com",
          "(fetch|push)"
        ],
        "hints": [
          "Run: git remote -v",
          "You should see 'origin' with your GitHub URL for both fetch and push",
          "If empty, run: git remote add origin https://github.com/yourusername/my-first-repo.git"
        ]
      },
      {
        "id": "verify-push",
        "description": "After pushing, run git log and paste just the first few lines showing origin/main",
        "type": "paste-output",
        "expectedPatterns": [
          "commit [a-f0-9]",
          "(origin/main|origin/master)"
        ],
        "hints": [
          "After pushing, run: git log",
          "Copy the first 3-4 lines — you should see 'origin/main' next to your latest commit",
          "If not, run: git push -u origin main"
        ]
      },
      {
        "id": "clone-log-output",
        "description": "Clone your repo to a new folder and paste the git log --oneline from the clone",
        "type": "paste-output",
        "expectedPatterns": [
          "[a-f0-9]{7}"
        ],
        "hints": [
          "Run: git clone https://github.com/yourusername/my-first-repo.git ~/Desktop/my-first-repo-clone",
          "Then: cd ~/Desktop/my-first-repo-clone && git log --oneline",
          "You should see the same commits as your original repo"
        ]
      },
      {
        "id": "pull-output",
        "description": "Run git pull in your original repo and paste the output",
        "type": "paste-output",
        "expectedPatterns": [
          "(Already up to date|Updating|Fast-forward|Current branch)"
        ],
        "hints": [
          "Go back to your original repo: cd ~/my-first-repo",
          "Then run: git pull",
          "You should see 'Already up to date.' since nothing changed on the remote"
        ]
      }
    ]
  }
}
---

# Working with GitHub

In Lesson 1, everything you did with Git was local — on your computer only. That's useful, but what if your computer dies? What if you want to work from a different machine? What if you want to share your code?

That's where **GitHub** comes in.

## Git vs. GitHub

This distinction trips up a lot of people, so let's be clear:

| | Git | GitHub |
|---|---|---|
| **What** | A tool on your computer | A website (github.com) |
| **Where** | Runs locally | Runs in the cloud |
| **Purpose** | Tracks changes to your files | Stores your repos online, adds collaboration features |
| **Required?** | Yes — it's the engine | No — but almost everyone uses it |

**Git** is the version control system you installed in Module 0. **GitHub** is a cloud service that hosts Git repositories. Think of Git as the camera and GitHub as the photo cloud.

There are alternatives to GitHub (GitLab, Bitbucket), but GitHub is the industry standard and what we'll use in this course.

## Creating a GitHub Repository

Let's put your `my-first-repo` on GitHub.

### Step 1: Go to GitHub

Open [github.com](https://github.com) in your browser and sign in. If you don't have an account yet, create one — it's free.

### Step 2: Create a New Repository

1. Click the **+** button in the top-right corner, then **New repository**
2. Set the **Repository name** to `my-first-repo`
3. Leave it as **Public** (you can change this later)
4. **Do NOT** check any of the initialization boxes (no README, no .gitignore, no license) — we already have commits locally
5. Click **Create repository**

> **Why no initialization?** You already have a local repo with commits. If GitHub also creates a README, the two histories will conflict. Starting empty lets you push your existing work cleanly.

### Step 3: Copy the Repository URL

After creating the repo, GitHub shows a setup page. Copy the **HTTPS URL** — it looks like:

```
https://github.com/yourusername/my-first-repo.git
```

::validate[github-repo-url]

## Connecting Local to Remote

Now you need to tell your local repo where the remote copy lives. Make sure you're in your repo folder:

```bash
cd ~/my-first-repo
```

Then add the remote:

```bash
git remote add origin https://github.com/yourusername/my-first-repo.git
```

Let's break this down:
- `git remote add` — "add a new remote connection"
- `origin` — the name for this remote (a convention, like naming your Wi-Fi network)
- The URL — where the remote repo lives

**Verify it worked:**

```bash
git remote -v
```

You should see your GitHub URL listed for both `fetch` (downloading) and `push` (uploading).

::validate[verify-remote]

## Pushing Your Code

Time to upload your commits to GitHub:

```bash
git push -u origin main
```

Breaking this down:
- `git push` — upload commits to a remote
- `-u` — set this as the default remote branch (you only need `-u` the first time)
- `origin` — which remote to push to
- `main` — which branch to push

### Authentication

The first time you push, Git will ask you to authenticate with GitHub. On macOS, you'll likely see a browser window pop up asking you to sign in to GitHub. Follow the prompts — macOS Keychain will remember your credentials so you won't have to sign in again.

> **If authentication fails:** GitHub no longer accepts passwords for Git operations. You need to either sign in via the browser popup or set up a Personal Access Token. See GitHub's documentation on authentication if you run into issues.

After pushing, check your history:

```bash
git log
```

You should now see `origin/main` next to your latest commit — this means Git knows the remote is in sync.

**Go check GitHub!** Refresh your repository page in the browser. Your files and commits should be there.

::validate[verify-push]

## Cloning a Repository

What if you want to download someone else's repo, or get your own repo on a different computer? That's what `git clone` does.

Let's practice by cloning a public repository. Go to a temporary folder:

```bash
cd ~/Desktop
```

Now clone:

```bash
git clone https://github.com/yourusername/my-first-repo.git my-first-repo-clone
```

This creates a new folder called `my-first-repo-clone` with all the files and full commit history. It's an exact copy.

```bash
cd my-first-repo-clone
git log --oneline
```

You should see the same commits you pushed. Cloning is how you get a project started on a new computer, or how you start working on someone else's code.

> **Clean up when done:** This was just for practice. You can delete the clone:
> ```bash
> cd ~/Desktop
> rm -rf my-first-repo-clone
> ```

::validate[clone-log-output]

## The Pull-Push Cycle

Once your repo lives on both your computer and GitHub, you need to keep them in sync. The workflow looks like this:

```
  ┌──────────────┐         ┌──────────────┐
  │  Your Mac     │  push → │   GitHub      │
  │  (local)      │ ← pull  │   (remote)    │
  └──────────────┘         └──────────────┘
```

**The daily workflow:**

1. **`git pull`** — bring down any changes from GitHub (good habit to start with this)
2. **Make changes** — edit files, create new ones
3. **`git add`** — stage your changes
4. **`git commit -m 'message'`** — save a snapshot
5. **`git push`** — upload to GitHub

After the initial `git push -u origin main`, future pushes are just:

```bash
git push
```

And to bring down changes (if you edited something on GitHub directly, or pushed from another computer):

```bash
git pull
```

Let's try it. Make a change to your README and push it:

```bash
cd ~/my-first-repo
echo 'Learning Git is going well so far.' >> README.md
git add README.md
git commit -m 'Add progress note to README'
git push
```

::validate[pull-output]

## Quick Reference Card

```bash
# GitHub setup (once per repo)
git remote add origin https://github.com/user/repo.git
git remote -v                       # Verify remote connection
git push -u origin main             # First push (sets default)

# Daily workflow
git pull                            # Get latest from GitHub
# ... make changes ...
git add .                           # Stage changes
git commit -m 'Describe the change' # Commit
git push                            # Upload to GitHub

# Get a copy of any repo
git clone https://github.com/user/repo.git
git clone https://github.com/user/repo.git folder-name  # Custom folder name
```

## Key Concepts

| Term | Meaning |
|------|---------|
| **Remote** | A version of your repo hosted somewhere else (like GitHub) |
| **Origin** | The conventional name for your main remote |
| **Push** | Upload your local commits to the remote |
| **Pull** | Download remote commits to your local repo |
| **Clone** | Create a full copy of a remote repo on your computer |
| **HTTPS** | The connection method we use for GitHub (browser-based auth) |
| **Upstream** | The remote branch your local branch tracks (set with `-u`) |

---

**Next:** [Lesson 3: Branches and Workflow →](/course/module/2/lesson/3)

**Previous:** [Lesson 1: Git Basics](/course/module/2/lesson/1)

**Module Overview:** [Module 2: Git Fundamentals](/course/module/2)
