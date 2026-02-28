---
{
  "moduleId": "module-5",
  "lessonId": "lesson-2",
  "title": "Understanding the New Code",
  "timeEstimate": "15 minutes",
  "prerequisites": ["module-5-lesson-1"],
  "learningObjectives": [
    "Understand useState as a way to hold data that can change",
    "Understand useEffect as code that runs once when a component loads",
    "Read a fetch call and understand how JavaScript talks to APIs",
    "Understand props and how data flows from parent to child components",
    "Use Browser DevTools to see live API requests"
  ],
  "validation": {
    "tasks": [
      {
        "id": "verify-weather-code",
        "description": "Find your weather component file and run cat on it, then paste the output",
        "type": "paste-output",
        "expectedPatterns": [
          "(useState|useEffect|fetch)",
          "(temperature|weather|Weather)"
        ],
        "hints": [
          "First find the file: find src/ -name '*eather*' -o -name '*Weather*'",
          "Then read it: cat src/components/Weather.jsx (use your actual filename)",
          "You should see import statements, useState, useEffect, and a fetch call"
        ]
      },
      {
        "id": "verify-hooks-in-code",
        "description": "Run grep -n 'useState\\|useEffect' on your weather component and paste the output to find the hooks",
        "type": "paste-output",
        "expectedPatterns": [
          "(useState|useEffect)",
          "\\d+:"
        ],
        "hints": [
          "Run: grep -n 'useState\\|useEffect' src/components/Weather.jsx",
          "Use your actual filename if it's different",
          "You should see line numbers where these hooks appear"
        ]
      },
      {
        "id": "verify-network-tab",
        "description": "Open your dashboard in Chrome, open DevTools (Cmd+Option+I), go to the Network tab, refresh the page, and describe what you see for the open-meteo request",
        "type": "paste-output",
        "expectedPatterns": [
          "(open-meteo|forecast|200|api|temperature|weather)"
        ],
        "hints": [
          "Make sure your dev server is running (npm run dev)",
          "Open the dashboard in Chrome",
          "Press Cmd+Option+I to open DevTools",
          "Click the Network tab at the top of DevTools",
          "Refresh the page (Cmd+R)",
          "Look for a request to 'api.open-meteo.com' — click it to see details",
          "Paste what you see: the URL, status code (200), or any details from the response"
        ]
      }
    ]
  }
}
---

# Understanding the New Code

Claude Code added a weather widget to your dashboard in a few seconds. That's powerful — but you should never ship code you don't understand. In this lesson, we'll read through the new code together and learn the React concepts that make it work.

Like Module 4 Lesson 2, the goal is **recognition** — when you see these patterns later, you'll know what they are.

## What Did Claude Code Add?

Let's find the weather component. In your Terminal:

```bash
cd ~/Developer/daily-planner
find src/ -name '*eather*' -o -name '*Weather*'
```

You should see a file path like `src/components/Weather.jsx` or `src/components/WeatherWidget.jsx`. Now read the whole thing:

```bash
cat src/components/Weather.jsx
```

> **Use your actual filename.** Replace `Weather.jsx` with whatever showed up in the `find` results. If Claude Code used TypeScript, it might end in `.tsx` instead of `.jsx`.

::validate[verify-weather-code]

This file probably looks more complex than the components from Module 4. That's because it does more — it talks to the internet and updates when data arrives. Let's break it down piece by piece.

## useState — A Box That Holds Changing Data

In Module 4, your components had static content — text and layouts that never changed after the page loaded. But weather data arrives *after* the page loads. React needs a way to hold data that can change over time. That's what **useState** does.

Think of `useState` like a whiteboard in a classroom. You start with it blank (or with some default text), and anytime someone updates it, everyone in the room sees the change immediately.

Your weather component probably has something like this:

```jsx
const [temperature, setTemperature] = useState(null)
```

Here's what each part means:

| Part | What It Does |
|------|-------------|
| `temperature` | The current value on the whiteboard (starts as `null` — blank) |
| `setTemperature` | The marker — call this function to write a new value |
| `useState(null)` | Creates the whiteboard with an initial value of `null` |

When your code calls `setTemperature(68.5)`, React automatically re-renders the component — meaning the screen updates to show 68.5. You don't have to tell the browser to refresh. That's the magic of React: **change the data, and the screen updates automatically.**

Let's find the hooks in your code:

```bash
grep -n 'useState\|useEffect' src/components/Weather.jsx
```

::validate[verify-hooks-in-code]

> **Your file might have different variable names.** Claude Code might use `weather`, `data`, `weatherData`, or something else. The pattern is the same: `const [something, setSomething] = useState(initialValue)`.

## useEffect — "Do This Once When the Page Loads"

Your dashboard needs to fetch weather data when it first appears. But there's a subtlety: React components are functions, and they re-run every time something on screen changes. You don't want to call the API every single time the component re-renders — that could mean hundreds of requests.

**useEffect** solves this. It says: "Run this code once when the component first loads, and don't run it again."

Think of it like a note taped to the classroom door: "When you open this room for the first time today, check the weather forecast and write it on the whiteboard." The note only triggers once — when the room opens for the day.

Your code probably has something like this:

```jsx
useEffect(() => {
  // This code runs once, when the component first appears
  fetchWeather()
}, [])
```

The `[]` at the end (the empty array) is the key part — it means "no dependencies, run only once." You don't need to memorize this, but when you see `useEffect(() => { ... }, [])`, you'll know: this code runs once when the page loads.

## fetch — How JavaScript Talks to APIs

In Lesson 1, you used `curl` to talk to the Open-Meteo API from your Terminal. JavaScript has its own version of `curl` called **fetch**.

```jsx
const response = await fetch('https://api.open-meteo.com/v1/forecast?...')
const data = await response.json()
```

Here's the side-by-side comparison:

| Terminal (curl) | JavaScript (fetch) |
|----------------|-------------------|
| `curl 'URL'` | `fetch('URL')` |
| Output prints to your Terminal | Data goes into a variable |
| You read it with your eyes | Your code reads it and puts it on screen |

The word **await** means "wait for this to finish before continuing." API calls take time — the request has to travel across the internet to the server and back. JavaScript needs to pause and wait for the response before doing anything with the data.

> **Don't see `await` in your code?** Claude Code might have used `.then()` instead — it does the same thing with different syntax. Where `await` says "wait here," `.then()` says "when the result arrives, do this next." Both are valid ways to handle API calls. Look for `fetch(` in your code — that's the important part.

The `.json()` call at the end converts the raw response into structured data your code can use — the same JSON you saw in the Terminal with `curl`.

## JSON — Reading the Data

Quick refresher from Lesson 1. Once the API response is converted with `.json()`, it becomes a JavaScript object — structured data your code can navigate:

```javascript
{
  current: {
    temperature_2m: 68.5,
    weathercode: 1
  }
}
```

To get the temperature, your code uses: `data.current.temperature_2m` — which gets `68.5`.

Think of it like navigating folders on your computer. To get to a file, you go: `Documents → Projects → my-file.txt`. To get to the temperature, you go: `data → current → temperature_2m`. Each dot (`.`) goes one level deeper.

## Props — Passing Data Between Components

Remember Module 4 Lesson 2? The Key Concepts table mentioned: "**Props** — Settings passed from a parent component to a child (we'll use these in Module 5)." Let's talk about what that means.

Your weather component probably handles everything itself — it fetches the data, stores it with useState, and displays it. That's a perfectly good pattern for a self-contained widget.

But what happens when components need to **share** data? For example, what if App.jsx wanted to control which city the weather shows? Instead of hardcoding the coordinates inside the Weather component, App.jsx could pass them in:

```jsx
// In App.jsx — the parent passes data in:
<Weather latitude={37.77} longitude={-122.42} />
```

```jsx
// In Weather.jsx — the child receives it:
function Weather({ latitude, longitude }) {
  // Use latitude and longitude in the API call
}
```

Those values inside the curly braces (`latitude={37.77}`) are **props** — data passed from a parent component to a child. Think of it like handing someone a filled-out form. The parent fills in the values, and the child reads them.

You might not see props in your weather code right now, and that's fine. As your app grows and components need to talk to each other, props are how they do it. You'll see them naturally as you add more features.

## See the API Call in Your Browser

This is where it gets tangible. You can actually watch the API call happen using Chrome's built-in Developer Tools.

1. Make sure your dev server is running (`npm run dev`)
2. Open your dashboard in Chrome (usually `http://localhost:5173`)
3. Open DevTools: press `Cmd + Option + I`
4. Click the **Network** tab at the top of the DevTools panel
5. Refresh the page: press `Cmd + R`
6. Look for a request to `api.open-meteo.com`

You should see a line with something like `forecast?latitude=37.77...`. Click it, then:
- The **Headers** tab shows the status — look for **200** (that means "success")
- Click the **Response** tab to see the actual JSON data that came back

::validate[verify-network-tab]

This is how developers debug API issues. The Network tab shows you every request your app makes — whether it succeeded (status 200), failed (status 400 or 500), and what data came back. It's like being able to peek into the kitchen to see if your order is being prepared.

> **Pro Tip:** Anytime your app isn't showing data you expect, the Network tab is the first place to look. Is the request being made? Did it succeed? What data came back? These three questions solve most API issues.

## How It All Fits Together

Here's the full flow, from page load to data on screen:

```
Page loads
  → React renders the Weather component
    → useEffect fires (runs once)
      → fetch() calls the Open-Meteo API
        → API returns JSON data
          → setTemperature(data.current.temperature_2m)
            → React re-renders → screen shows the temperature
```

The whole thing happens in a fraction of a second. Page loads, data is fetched, screen updates. That's the pattern for every API integration you'll ever build.

## Quick Reference Card

```bash
# Explore the weather code
find src/ -name '*eather*'                                     # Find the weather file
cat src/components/Weather.jsx                                  # Read the full component
grep -n 'useState\|useEffect' src/components/Weather.jsx        # Find the hooks

# Browser DevTools
# Cmd + Option + I → Network tab → Cmd + R to refresh
# Look for requests to api.open-meteo.com
```

## Key Concepts

| Term | Meaning |
|------|---------|
| **useState** | A React hook that creates a variable whose changes automatically update the screen |
| **useEffect** | A React hook that runs code once when a component first appears on the page |
| **fetch** | JavaScript's built-in function for making API requests (like `curl`, but in code) |
| **await** | Tells JavaScript to wait for an operation (like an API call) to finish before continuing |
| **Props** | Data passed from a parent component to a child component — like handing someone a filled-out form |
| **Hooks** | Special React functions (like useState and useEffect) that let components manage data and side effects |
| **DevTools Network tab** | A browser tool that shows every web request your app makes — essential for debugging |

---

**Next:** [Lesson 3: Error Handling & Make It Yours](/course/module/5/lesson/3)

**Previous:** [Lesson 1: Your Dashboard Goes Live](/course/module/5/lesson/1)

**Module Overview:** [Module 5: API Integration](/course/module/5)
