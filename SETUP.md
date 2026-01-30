# Setup Instructions for Local Development

This guide will help you get this code onto your personal laptop and push it to your GitHub repository.

## What We've Built So Far

✅ Project structure with React + Vite  
✅ Home page with hero, features, and timeline  
✅ Routing setup for all course pages  
✅ Module 0 overview and Lesson 1 content  
✅ Base CSS styles  
✅ Package configuration  

## Prerequisites

On your personal laptop, you'll need:
- Git installed
- Node.js installed (v18 or higher recommended)
- A code editor (VS Code, Cursor, or any text editor)
- Terminal access

## Step-by-Step Setup

### 1. Clone Your GitHub Repo

Open Terminal and run:

```bash
# Navigate to where you want the project
cd ~/Documents  # or wherever you keep projects

# Clone your repo
git clone https://github.com/kwtamayo/claude-code-course.git
cd claude-code-course
```

### 2. Download the Code I Built

I'll provide you with a ZIP file or tar.gz containing all the files I created. Download it and extract it.

### 3. Copy Files to Your Repo

Copy all the files from the extracted folder into your cloned repo:

```bash
# From the directory where you extracted my files:
cp -r * /path/to/your/claude-code-course/

# Or manually drag and drop the files in Finder
```

### 4. Check What Changed

See what files were added:

```bash
cd /path/to/your/claude-code-course
git status
```

You should see a list of new files in red (untracked files).

### 5. Add All Files to Git

```bash
git add .
```

### 6. Commit the Changes

```bash
git commit -m "Initial course platform setup - home page, routing, and Module 0 Lesson 1"
```

### 7. Push to GitHub

```bash
git push origin main
```

Or if your default branch is called something else:

```bash
git push origin master  # or whatever your branch is called
```

### 8. Install Dependencies

```bash
npm install
```

This will download all the required packages (React, Vite, etc.) into a `node_modules` folder.

### 9. Run the Development Server

```bash
npm run dev
```

You should see output like:

```
  VITE v5.0.0  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### 10. Open in Browser

Open http://localhost:3000 in your browser. You should see the course home page!

## What You Should See

**Home Page** (`/`)
- Hero section with gradient background
- "Learn Software Development in a Weekend" title
- Features grid showing what you'll build
- Timeline of the learning journey
- Call-to-action buttons
- Footer

**Course Page** (`/course`)
- Placeholder showing "Course Overview"

**Simulator** (`/simulator`)
- Placeholder for the Claude Code simulator

## Next Steps

Once you verify everything is working:

1. ✅ Code is pushed to GitHub
2. ✅ Development server runs locally
3. ✅ Home page displays correctly

We can continue building:
- Complete Module 0 (Lessons 2 & 3)
- Module 1 content
- The Claude Code simulator
- Course overview page with module navigation
- Validation system

## Troubleshooting

### "git: command not found"
You need to install Git first. On macOS:
```bash
# Install Xcode Command Line Tools
xcode-select --install
```

### "npm: command not found"
You need to install Node.js. Download from https://nodejs.org or use Homebrew:
```bash
# Install Homebrew first if needed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node
```

### Port 3000 already in use
Something else is using that port. Either:
- Close the other application
- Or change the port in `vite.config.js`

### Files look different in browser
- Clear your browser cache
- Make sure you saved all files
- Check the browser console for errors (F12 or Cmd+Option+I)

## File Structure Overview

```
claude-code-course/
├── public/              # Static files
├── src/
│   ├── components/      # Reusable React components (empty for now)
│   ├── pages/           # Page components
│   │   ├── HomePage.jsx
│   │   ├── CoursePage.jsx
│   │   ├── ModulePage.jsx
│   │   ├── LessonPage.jsx
│   │   ├── SimulatorPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── styles/          # CSS files
│   │   ├── index.css    # Global styles
│   │   └── HomePage.css # Home page specific styles
│   ├── utils/           # Utility functions (empty for now)
│   ├── App.jsx          # Main app with routing
│   └── main.jsx         # React entry point
├── course-content/
│   ├── module-0/
│   │   ├── README.md
│   │   └── lesson-1/
│   │       └── lesson.md
│   ├── module-1/ through module-12/ (empty for now)
│   └── shared-assets/
├── index.html           # HTML entry point
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── .gitignore          # Files to ignore in Git
├── README.md           # Main project README
└── CONTRIBUTING.md     # Contribution guidelines
```

---

**Ready to continue building?** Let me know once you have everything running locally!
