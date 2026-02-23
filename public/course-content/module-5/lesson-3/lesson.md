---
{
  "moduleId": "module-5",
  "lessonId": "lesson-3",
  "title": "Error Handling & Make It Yours",
  "timeEstimate": "15 minutes",
  "prerequisites": ["module-5-lesson-2"],
  "learningObjectives": [
    "Understand why APIs fail and what loading and error states are",
    "Use Claude Code to add loading and error handling to the weather widget",
    "Add a second API integration using Claude Code",
    "Commit and push all Module 5 changes to GitHub",
    "Optional: Use an API key with OpenWeatherMap to practice .env files"
  ],
  "validation": {
    "tasks": [
      {
        "id": "verify-error-handling",
        "description": "Search your weather component for error handling code and paste the output",
        "type": "paste-output",
        "expectedPatterns": [
          "(error|Error|loading|Loading|catch|try)"
        ],
        "hints": [
          "Run: grep -n 'error\\|Error\\|loading\\|Loading\\|catch' src/components/Weather.jsx",
          "Use your actual filename if it's different",
          "You should see references to loading state, error state, or try/catch blocks"
        ]
      },
      {
        "id": "verify-second-api",
        "description": "Run find src/ -name '*.jsx' -o -name '*.tsx' | head -15 and paste the output to confirm a new component was added",
        "type": "paste-output",
        "expectedPatterns": [
          "\\.(jsx|tsx)"
        ],
        "hints": [
          "Run: find src/ -name '*.jsx' -o -name '*.tsx' | head -15",
          "You should see more files than before — a new component for your second API",
          "If you chose a quote widget, look for something like Quote.jsx or Motivation.jsx"
        ]
      },
      {
        "id": "verify-git-commit",
        "description": "Commit your Module 5 changes and run git log --oneline -5 to show recent commits",
        "type": "paste-output",
        "expectedPatterns": [
          "[a-f0-9]{7}"
        ],
        "hints": [
          "Stage all changes: git add .",
          "Commit: git commit -m 'feat: add weather widget and API integration'",
          "Then run: git log --oneline -5"
        ]
      },
      {
        "id": "verify-git-push",
        "description": "Push to GitHub and run git status to confirm everything is clean",
        "type": "paste-output",
        "expectedPatterns": [
          "(nothing to commit|working tree clean|up to date)"
        ],
        "hints": [
          "Run: git push",
          "If you get an error about upstream, run: git push -u origin main",
          "Then run: git status to confirm everything is pushed"
        ]
      }
    ]
  }
}
---

# Error Handling & Make It Yours

Your dashboard shows live weather data — that's a huge step. But what happens when the internet is slow? Or when the API server is down? Right now, your app might show a blank space or an ugly error. Real apps handle failure gracefully.

In this lesson, you'll make your dashboard resilient, add a second live data widget, and save everything with Git.

## What Happens When APIs Fail?

Three things can go wrong when your app calls an API:

| Problem | What the User Sees | What Actually Happened |
|---------|-------------------|----------------------|
| **Slow connection** | Nothing for several seconds | The request is still traveling across the internet |
| **API is down** | Blank space or crash | The "restaurant" is closed today |
| **Bad request** | Nothing or wrong data | You "ordered" something that doesn't exist |

Right now, your weather widget probably handles none of these. While the API request is in flight (that fraction of a second), your widget might show nothing. If the request fails entirely, it might stay blank forever. A user would think your app is broken.

The fix: **loading states** ("Loading weather..." while waiting) and **error states** ("Couldn't load weather" if something goes wrong).

## Add Loading and Error Handling

Launch Claude Code:

```bash
cd ~/Developer/daily-planner
claude
```

Give it this prompt:

```
Add loading and error handling to my weather widget. While the weather data is loading, show a "Loading weather..." message. If the API request fails, show a friendly error message like "Couldn't load weather data" with a retry button. Use try/catch for error handling.
```

When Claude Code finishes:

1. Exit Claude Code: type `/exit` or press `Ctrl + C`
2. If your dev server isn't running, start it: `npm run dev`
3. Check the browser

Now let's verify the error handling code exists:

```bash
grep -n 'error\|Error\|loading\|Loading\|catch' src/components/Weather.jsx
```

> **Use your actual filename** if it's different from `Weather.jsx`.

::validate[verify-error-handling]

Here's what Claude Code likely added:

- **A loading state** — another `useState`, starting as `true`, becoming `false` when data arrives or the request fails
- **An error state** — starting as `null`, getting set to an error message if something goes wrong
- **A try/catch block** around the fetch call — "try this code, and if it fails, catch the error instead of crashing"
- **Conditional rendering** — showing different things depending on whether the data is loading, errored, or ready

> **Want to test the error handling?** Turn off your Wi-Fi, then refresh the page. You should see the error message instead of a blank space. Turn Wi-Fi back on and click the retry button (if Claude Code added one). Your weather data should reappear.

## Add a Second API

One API integration is great. Two proves you understand the pattern. Let's add another live data widget to your dashboard.

Pick one that interests you — the APIs below are all free and require no sign-up:

| Widget Idea | API | What It Returns |
|-------------|-----|----------------|
| Inspirational quote | `https://api.quotable.io/quotes/random` | A random quote with author |
| Random fun fact | `https://uselessfacts.jsph.pl/api/v2/facts/random` | A random interesting fact |
| Dad joke | `https://icanhazdadjoke.com` | A random dad joke |

> **Pick whatever interests you.** The specific API doesn't matter — the pattern is the same every time (fetch → useState → display). If you want something else entirely, tell Claude Code. This is YOUR dashboard.

Launch Claude Code and use a prompt like this (adjust for whichever API you chose):

```
Add a motivational quote widget to my Daily Planner. Fetch a random quote when the page loads using the API at https://api.quotable.io/quotes/random. Show the quote text and the author. Include loading and error handling like the weather widget. Add a "New Quote" button that fetches another random quote.
```

When Claude Code finishes, exit and check the browser:

1. Exit Claude Code: `/exit` or `Ctrl + C`
2. Restart the dev server if needed: `npm run dev`
3. Open the browser and look for your new widget

Let's verify the new component exists:

```bash
find src/ -name '*.jsx' -o -name '*.tsx' | head -15
```

::validate[verify-second-api]

You should see more files than before — the original components from Module 4, the weather component from Lesson 1, and now your new widget.

Notice how the second widget follows **the exact same pattern** as the first — `useState` to hold data, `useEffect` to fetch on load, `fetch` to call the API, loading and error states. Once you know one API integration, you know the pattern for all of them.

> **If something doesn't work,** launch `claude` and describe the issue. For example: "The quote widget shows 'Loading...' forever" or "I'm getting a CORS error." Claude Code has seen these problems before and can help fix them.

## Save Your Work

Time to commit everything you built in Module 5. This is the same Git workflow from Modules 2 and 4:

```bash
cd ~/Developer/daily-planner
git add .
git status
```

Review what's staged. You should see new files (the weather component, the second API component) and modified files (App.jsx, CSS files).

Now commit:

```bash
git commit -m 'feat: add weather widget and API integration'
```

Verify:

```bash
git log --oneline -5
```

::validate[verify-git-commit]

Push to GitHub:

```bash
git push
```

> **Getting an error?** If you see something about "no upstream branch," run: `git push -u origin main`

Confirm everything is clean:

```bash
git status
```

::validate[verify-git-push]

Go check your GitHub repo in the browser — you should see the new weather and API files.

## Optional Stretch Goal: API Keys

> **This section is optional.** If you're running short on time or energy, skip ahead to "What You've Accomplished." You can always come back to this later.

Open-Meteo is generous — it doesn't require an API key. But **most APIs do.** An API key is a secret string that identifies you to the service, like a membership card.

Remember Module 3, where you learned about `.env` files and keeping secrets safe? Here's where that knowledge pays off.

### Try OpenWeatherMap

1. Go to [openweathermap.org/api](https://openweathermap.org/api) and create a free account
2. After signing up, find your API key in your account dashboard (look for "API keys" in the menu)
3. Copy the key — it looks like a long string of letters and numbers

### Store the Key Safely

In your Terminal (not inside Claude Code), create a `.env` file:

```bash
cd ~/Developer/daily-planner
echo 'VITE_OPENWEATHER_API_KEY=paste-your-key-here' > .env
```

> **⚠️ Replace `paste-your-key-here` with your actual API key!** For example: `VITE_OPENWEATHER_API_KEY=abc123def456`

> **Why the VITE_ prefix?** Vite (your build tool) only exposes environment variables that start with `VITE_` to your app's code. This is a security feature — it prevents accidentally leaking server-side secrets to the browser. Only variables your app actually needs get the `VITE_` prefix.

### Verify .env is Protected

Make sure your `.gitignore` includes `.env` so your key doesn't get pushed to GitHub:

```bash
grep '.env' .gitignore
```

If `.env` isn't listed:

```bash
echo '.env' >> .gitignore
```

This is exactly what Module 3 taught — secrets stay local, never in the repository.

### Switch to OpenWeatherMap

Launch Claude Code and give it this prompt:

```
Switch my weather widget from Open-Meteo to OpenWeatherMap. My API key is stored in the environment variable VITE_OPENWEATHER_API_KEY. Access it in the code with import.meta.env.VITE_OPENWEATHER_API_KEY. The OpenWeatherMap API URL is: https://api.openweathermap.org/data/2.5/weather?q=San+Francisco&appid={API_KEY}&units=imperial
```

Exit Claude Code, restart the dev server, and check the browser.

> **Getting a 401 error?** New OpenWeatherMap API keys can take **up to 2 hours to activate.** If you just signed up, the key might not be ready yet. You can always switch back to Open-Meteo and try again later — both are great options.

If you completed this stretch goal, don't forget to commit:

```bash
git add .
git commit -m 'feat: switch to OpenWeatherMap with API key'
git push
```

## What You've Accomplished

Look at what you built across Module 5:

| What | How |
|------|-----|
| Learned what APIs are | Restaurant analogy, curl in Terminal |
| Connected to a live weather API | Claude Code + Open-Meteo |
| Understood new React patterns | useState, useEffect, fetch, props |
| Watched API calls in DevTools | Network tab |
| Added error handling | Loading states, try/catch, error messages |
| Added a second API integration | Same pattern, different API |
| Saved and pushed to GitHub | Git workflow from Module 2 |
| (Optional) Used an API key with .env | Module 3 payoff |

Your dashboard is no longer a static page. It's a real application that talks to the internet, handles failure gracefully, and shows live data. That's a significant milestone.

## What's Next

Right now, your tasks, notes, and habits are still hardcoded. If you refresh the page, any changes you make disappear. In **Module 6: Data Persistence**, you'll learn how to save data so it sticks around between sessions. Your dashboard is about to get a memory.

## Quick Reference Card

```bash
# API testing
curl 'URL'                              # Test an API from Terminal

# Claude Code workflow
claude                                  # Launch Claude Code
# Describe what you want → it builds → you review
# /exit to leave Claude Code

# Git workflow
git add .                               # Stage changes
git status                              # Review what's staged
git commit -m 'feat: description'       # Commit
git push                                # Push to GitHub

# Environment variables (for API keys)
echo 'VITE_KEY=value' > .env            # Create .env file
grep '.env' .gitignore                  # Verify it's protected
# Access in code: import.meta.env.VITE_KEY
```

## Key Concepts

| Term | Meaning |
|------|---------|
| **Loading state** | Showing "Loading..." while waiting for API data to arrive |
| **Error state** | Showing a friendly message when an API request fails |
| **try/catch** | JavaScript pattern: "try this code, and if it fails, catch the error instead of crashing" |
| **Conditional rendering** | Showing different UI depending on the current state (loading, error, or data ready) |
| **API key** | A secret string that identifies you to an API service — like a membership card |
| **VITE_ prefix** | Environment variables must start with `VITE_` for Vite to make them available in your app |

---

**Previous:** [Lesson 2: Understanding the New Code](/course/module/5/lesson/2)

**Module Overview:** [Module 5: API Integration](/course/module/5)
