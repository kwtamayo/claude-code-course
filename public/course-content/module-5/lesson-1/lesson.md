---
{
  "moduleId": "module-5",
  "lessonId": "lesson-1",
  "title": "Your Dashboard Goes Live",
  "timeEstimate": "15 minutes",
  "prerequisites": ["module-4"],
  "learningObjectives": [
    "Understand what an API is and why apps use them",
    "Use curl to make an API request from the Terminal",
    "Read JSON data returned by an API",
    "Use Claude Code to add a live weather widget to your Daily Planner"
  ],
  "validation": {
    "tasks": [
      {
        "id": "verify-curl-weather",
        "description": "Run the curl command to fetch weather data from Open-Meteo and paste the output",
        "type": "paste-output",
        "expectedPatterns": [
          "temperature_2m",
          "\\d+\\.?\\d*"
        ],
        "hints": [
          "Make sure you're connected to the internet",
          "Run: curl 'https://api.open-meteo.com/v1/forecast?latitude=37.7749&longitude=-122.4194&current=temperature_2m,weathercode&temperature_unit=fahrenheit'",
          "You should see JSON data with a temperature value"
        ]
      },
      {
        "id": "verify-weather-widget",
        "description": "After Claude Code adds the weather widget, run npm run dev and paste the first few lines of output showing the server is running",
        "type": "paste-output",
        "expectedPatterns": [
          "localhost",
          "(5173|5174|5175|3000|3001)"
        ],
        "hints": [
          "Navigate to your project: cd ~/Developer/daily-planner",
          "Run: npm run dev",
          "Open the URL in your browser — you should see a weather section on your dashboard",
          "If you don't see weather data, check your internet connection"
        ]
      },
      {
        "id": "verify-weather-component",
        "description": "Run find src/ -name '*.jsx' -o -name '*.tsx' | head -15 and paste the output to see the new weather file",
        "type": "paste-output",
        "expectedPatterns": [
          "(weather|Weather|forecast|Forecast)",
          "\\.(jsx|tsx)"
        ],
        "hints": [
          "Run: find src/ -name '*.jsx' -o -name '*.tsx' | head -15",
          "You should see a new file with 'weather' or 'Weather' in the name",
          "If you don't see one, Claude Code may have added the weather code directly to App.jsx — that's okay too"
        ]
      }
    ]
  }
}
---

# Your Dashboard Goes Live

Your Daily Planner looks great, but every piece of data in it is fake. The tasks, calendar events, and habits were all hardcoded — you typed them in (or Claude Code did). Real apps get their data from the outside world.

In this lesson, you'll connect your dashboard to the internet and see **live weather data** appear. This is the moment your project goes from a static page to a living application.

## What is an API?

An **API** (Application Programming Interface) is how apps talk to servers to get data. The easiest way to understand it is with a restaurant analogy:

| Restaurant | API |
|-----------|-----|
| You (the customer) | Your app |
| The menu | The API documentation |
| Your order | The API request |
| The kitchen | The API server |
| Your food | The data that comes back |

You don't need to know how the kitchen works — you just order from the menu. The menu tells you what's available and how to ask for it. You place your order, wait a moment, and your food arrives.

APIs work the same way. Your app sends a request to a server ("What's the weather in San Francisco?"), the server processes it, and sends back data ("68.5°F, partly cloudy"). Your app doesn't need to know how the server calculates the weather — it just needs to know what to ask for and what the response looks like.

> **Why does this matter?** Without APIs, every app would need to collect its own data. Your Daily Planner would need its own weather station, its own news reporters, its own database of everything. APIs let apps share data — one weather service provides data to thousands of apps.

## See It in Action

Before adding anything to your dashboard, let's see an API in action from the Terminal. You already know `curl` isn't anything new — it's a Terminal command that makes web requests, just like a browser does, but in text form.

Make sure you're connected to the internet, then run:

```bash
curl 'https://api.open-meteo.com/v1/forecast?latitude=37.7749&longitude=-122.4194&current=temperature_2m,weathercode&temperature_unit=fahrenheit'
```

::validate[verify-curl-weather]

You should see a block of text that looks something like this (your numbers will be different):

```json
{"latitude":37.775,"longitude":-122.42,"current":{"temperature_2m":68.5,"weathercode":1},...}
```

That's **JSON** (JavaScript Object Notation) — the language APIs speak. It looks messy in the Terminal, but it's structured data. The important parts: `temperature_2m` is the current temperature, and `weathercode` is a number that represents the weather condition (0 = clear, 1 = mainly clear, 2 = partly cloudy, etc.).

> **Want it formatted nicely?** Try adding `| python3 -m json.tool` to the end of the curl command. Python will format the JSON with indentation so it's easier to read.

Let's break down that URL so you understand what you just asked for:

| Part | Meaning |
|------|---------|
| `api.open-meteo.com` | The "restaurant" (the server) |
| `/v1/forecast` | The "menu item" (the specific data you want — a forecast) |
| `latitude=37.7749` | San Francisco's latitude |
| `longitude=-122.4194` | San Francisco's longitude |
| `current=temperature_2m,weathercode` | "I want the current temperature and weather condition" |
| `temperature_unit=fahrenheit` | "In Fahrenheit, please" |

The URL is essentially your order: "Hey Open-Meteo, give me the current temperature and weather condition for San Francisco, in Fahrenheit."

> **Good to know:** 37.7749, -122.4194 is San Francisco. You'll customize this to your own city later in Lesson 3. For now, we'll use these coordinates to keep things simple.

## Add Weather to Your Dashboard

Now let's bring this live data into your Daily Planner. Navigate to your project and launch Claude Code:

```bash
cd ~/Developer/daily-planner
claude
```

Give Claude Code this prompt:

```
Add a weather widget to my Daily Planner that shows the current temperature and weather condition. Use the Open-Meteo API (no API key needed). The API URL is: https://api.open-meteo.com/v1/forecast?latitude=37.7749&longitude=-122.4194&current=temperature_2m,weathercode&temperature_unit=fahrenheit

Show the temperature and a simple description of the weather (sunny, cloudy, rainy, etc). Style it to match the rest of the dashboard.
```

When Claude Code asks for permission to create or edit files, **select "Yes, allow all edits during this session"** (option 2). You learned this in Module 4 — it lets Claude Code work without stopping for approval on every file.

Claude Code will:

1. **Create a new Weather component** (or add weather code to an existing file)
2. **Add code to fetch data** from the Open-Meteo API when the page loads
3. **Display the temperature and condition** in your dashboard
4. **Style it** to match your existing design

When Claude Code finishes, exit and run the dev server:

1. Exit Claude Code: type `/exit` or press `Ctrl + C`
2. Start the dev server: `npm run dev`
3. Open the URL in your browser

```bash
npm run dev
```

::validate[verify-weather-widget]

Open the URL (usually `http://localhost:5173`) and look for the weather section. You should see a **real temperature** — not placeholder text. That number came from the internet, just like when you ran `curl`.

> **Don't see weather data?** Make sure you're connected to the internet. If you see an error or blank space instead of weather, that's actually common — APIs don't always work perfectly. We'll add proper error handling in Lesson 3.

> **If something went wrong during the build,** launch `claude` again and describe the problem. For example: "The weather widget isn't showing any data" or "I'm getting an error in the browser console." Claude Code can diagnose and fix issues.

## What Did Claude Code Add?

Let's see what new files appeared:

```bash
find src/ -name '*.jsx' -o -name '*.tsx' | head -15
```

::validate[verify-weather-component]

You should see a new file with "Weather" or "weather" in the name — something like `Weather.jsx` or `WeatherWidget.jsx`. Claude Code created a new component, just like the Calendar, TaskList, and other components from Module 4.

The new code does two things you haven't seen before:

1. **Fetches data from the internet** — like `curl`, but in JavaScript
2. **Updates the screen when the data arrives** — using React features called "hooks"

Don't worry about understanding the code yet. That's what Lesson 2 is for. The important thing right now is that **it works** — your dashboard is showing live data.

## What Just Happened?

Look at what you just did:

1. **Learned what an API is** — a way for apps to request data from servers
2. **Made an API request from the Terminal** with `curl`
3. **Read JSON data** — the language APIs speak
4. **Used Claude Code to connect your dashboard** to a live weather API
5. **Saw real data in your browser** — a temperature that came from the internet

Your dashboard is no longer static. It talks to the outside world. In the next lesson, we'll look at the code Claude Code wrote and understand exactly how it works.

## Quick Reference Card

```bash
# API basics
curl 'URL'                              # Make an API request from Terminal
curl 'URL' | python3 -m json.tool       # Same, with readable formatting

# Development
cd ~/Developer/daily-planner
claude                                  # Launch Claude Code
npm run dev                             # Start dev server
```

## Key Concepts

| Term | Meaning |
|------|---------|
| **API** | Application Programming Interface — a way for apps to request data from servers |
| **JSON** | JavaScript Object Notation — the structured data format that APIs use to send and receive data |
| **Endpoint** | A specific URL that provides specific data (like `/v1/forecast` for weather) |
| **curl** | A Terminal command for making web requests — useful for testing APIs |
| **Parameters** | Values in the URL that tell the API what you want (`latitude=37.77`, `temperature_unit=fahrenheit`) |
| **Open-Meteo** | A free weather API that doesn't require an API key — perfect for learning |

---

**Next:** [Lesson 2: Understanding the New Code](/course/module/5/lesson/2)

**Module Overview:** [Module 5: API Integration](/course/module/5)
