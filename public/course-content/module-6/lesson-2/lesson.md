---
{
  "moduleId": "module-6",
  "lessonId": "lesson-2",
  "title": "Plan Before You Build",
  "timeEstimate": "20 minutes",
  "prerequisites": ["module-6-lesson-1"],
  "learningObjectives": [
    "Understand what plan mode is and when to use it",
    "Use plan mode to add a settings panel to your dashboard",
    "Practice reviewing and pushing back on a plan before building",
    "Save settings to localStorage so they persist between sessions"
  ],
  "validation": {
    "tasks": [
      {
        "id": "verify-settings-component",
        "description": "Run find src/ -name '*.jsx' | head -20 and paste the output to confirm a Settings component was created",
        "type": "paste-output",
        "expectedPatterns": ["[Ss]etting"],
        "hints": [
          "Run: find src/ -name '*.jsx' | head -20",
          "You should see a new file like Settings.jsx or SettingsPanel.jsx",
          "If you don't see it, check that Claude Code finished building before you exited"
        ]
      },
      {
        "id": "verify-settings-storage",
        "description": "Run grep -rn 'settings\\|Settings' src/ | grep -i 'localStorage\\|useState' and paste the output",
        "type": "paste-output",
        "expectedPatterns": ["(localStorage|useState)"],
        "hints": [
          "Run: grep -rn 'settings\\|Settings' src/ | grep -i 'localStorage\\|useState'",
          "You should see lines where settings are being saved to localStorage or loaded into state",
          "This confirms the settings panel actually persists your preferences"
        ]
      },
      {
        "id": "verify-git-push",
        "description": "Commit your Module 6 changes and run git log --oneline -5",
        "type": "paste-output",
        "expectedPatterns": ["[a-f0-9]{7}"],
        "hints": [
          "Stage your changes: git add .",
          "Commit: git commit -m 'feat: add settings panel with localStorage persistence'",
          "Push: git push",
          "Then run: git log --oneline -5"
        ]
      }
    ]
  }
}
---

# Plan Before You Build

You used plan mode in Module 4 to design your dashboard. You're using it again here — and that's intentional. Plan mode isn't a special technique for complex tasks. It's the right default any time the details aren't fully worked out.

A settings panel is a good example. You know you want one. But what settings? Where does it live? How does it open? Those are real decisions worth making before any code gets written.

## The Settings Panel

Your dashboard works, but everything about it is locked in code. Your weather widget's city, how your dashboard looks, which widgets appear — if you want to change any of it, you'd have to edit the code.

A settings panel fixes that. You'll add a place where users can configure their dashboard and have those preferences saved automatically.

**Choose 2–3 settings that matter to you:**

| Setting | What it does |
|---|---|
| **Display name** | Shows a personalized greeting ("Good morning, Alex") |
| **City** | Controls the location used by your weather widget |
| **Theme** | Switches between light and dark mode |
| **Date format** | MM/DD/YYYY vs. DD/MM/YYYY |
| **Widget visibility** | Show or hide specific widgets |

Pick the ones that feel useful to you. There's no wrong answer — this is your dashboard.

:::info
**This lesson gives you a curated list of options.** That's intentional — it keeps everyone's project consistent and makes it easier to validate. But this is not how Claude Code works in practice. When you're building your own projects, you can describe something as vague as "I want my app to feel more personal" and work through the details together in plan mode. The constraints here are training wheels. The ceiling is much higher.
:::

## Build It

Clear your Claude Code context first — this is a new task, clean slate:

```bash
cd ~/Developer/daily-planner
claude
```

Once you're in Claude Code, press **Shift+Tab** to switch to plan mode. You should see the mode indicator change.

Now give it your prompt, filling in the settings you chose:

```
Add a settings panel to my Daily Planner dashboard. I want to be able to customize: [your chosen settings]. Save the settings to localStorage so they persist when I refresh the page.
```

For example, if you chose display name, city, and theme:

```
Add a settings panel to my Daily Planner dashboard. I want to be able to customize: my display name, the city for the weather widget, and light/dark theme. Save the settings to localStorage so they persist when I refresh the page.
```

## Review the Plan

Claude Code will propose an approach before touching any code. Read it carefully.

Things worth looking for:
- **Scope** — Is it building more than you asked for? It's fine to say "skip the theme for now, just name and city."
- **Where the settings panel will live** — A modal? A dedicated page? A sidebar? Make sure you're happy with the answer.
- **How settings will apply** — Will changing the city update the weather widget immediately, or after a refresh? Either is fine, but know what you're getting.

You can respond with feedback before approving. Some examples:

> "Simplify — just a modal with two fields, no tabs."

> "Don't add a dedicated settings page. A gear icon that opens a modal is enough."

> "That's good, go ahead."

When you're satisfied, approve the plan. Claude Code will build.

## Verify It Works

Exit Claude Code and check the browser:

```bash
/exit
```

Open your dashboard and look for the settings UI — likely a gear icon or a Settings button. Open it, change one of your settings, close it, and refresh the page. The setting should still be there.

Run this to confirm a Settings component was created:

```bash
find src/ -name '*.jsx' | head -20
```

::validate[verify-settings-component]

And confirm the settings are being saved:

```bash
grep -rn 'settings\|Settings' src/ | grep -i 'localStorage\|useState'
```

::validate[verify-settings-storage]

## Save Your Work

```bash
git add .
git commit -m 'feat: add settings panel with localStorage persistence'
git push
git log --oneline -5
```

::validate[verify-git-push]

## What You've Built

| What | How |
|---|---|
| Learned what localStorage is | Inspected your own code |
| Confirmed or added data persistence | grep + Claude Code |
| Used plan mode for the first time | Shift+Tab before prompting |
| Negotiated a plan before building | Reviewed and pushed back |
| Built a settings panel | Open-ended Claude Code session |
| Saved user preferences | localStorage persisting settings |

## What's Next

Your dashboard lives on your computer. Only you can see it, and only in your browser. In **Module 7: Backend & Database**, you'll add a server that stores data permanently — which means it survives browser clears, works across devices, and sets you up for the iOS app later.

---

**Previous:** [Lesson 1: Your Dashboard's Memory](/course/module/6/lesson/1)

**Module Overview:** [Module 6: Data Persistence](/course/module/6)
