# Learning Claude Code by Teaching Claude Code

**The Premise:** I learned Claude Code by using Claude to build a course that teaches Claude Code.

**Or, in Xzibit terms:** Yo dawg, I heard you like learning, so I put Claude in your Claude so you can learn Claude Code while you build a course about Claude Code that teaches Claude Code using Claude Code.

**Why this works:** Teaching forces clarity. Building something real beats following tutorials. And encountering actual problems beats hypothetical scenarios every time. The course content IS the learning journey.

**Timeline:** Jan 30 – Feb 21, 2026
**Tools:** Claude Chat (Phase 1) → Claude Code (Phase 2)
**GitHub:** https://github.com/kwtamayo/claude-code-course

---

## Phase 1: Claude Chat — Building the Platform

*Jan 30 – Feb 14, 2026. Built the course platform (React + Vite + React Router), designed the architecture, created Modules 0-2.*

### Teaching Moments

#### 1. Vision-First Development

**What happened:** Started with "I want to build a coding course." Claude didn't write a single line of code — it asked clarifying questions first. Who's the audience? What's the format? What should students build?

**Why it matters:** 20 minutes of planning saved hours of rework. We defined "done" before writing any code, which meant every decision had a clear target.

**How it shaped the course:** This became a core principle in CLAUDE.md: "Start with the end vision. Define done, work backward through dependencies, then implement."

---

#### 2. The Routing Bug Saga

**What happened:** Navigation kept breaking with 404 errors. The same bug appeared **three times** — initial setup, after a Module 0 refactor, and during the routes system implementation.

**The problem:**
```javascript
// WRONG — causes 404s:
<Route path="/course/module-:moduleId" />

// CORRECT:
<Route path="/course/module/:moduleId" />
```

A hyphen before the `:moduleId` parameter breaks React Router's pattern matching. Simple typo, catastrophic result.

**Why it kept happening:** Multiple files needed to change together, and there was no single source of truth. Change the route in one file, forget another, get a 404.

**The breakthrough:** Created `src/routes.js` — one file that defines ALL routes. Change it once, everything updates.

```javascript
export const ROUTES = {
  module: (id) => `/course/module/${id}`,
  lesson: (moduleId, lessonId) => `/course/module/${moduleId}/lesson/${lessonId}`
}
```

**The lesson:** DRY (Don't Repeat Yourself) isn't about less code — it's about preventing bugs by having one source of truth.

---

#### 3. "Why Does It Keep Happening?"

**What happened:** After fixing the routing bug for the third time, I asked Claude: "Before I make the fix, WHY does this keep happening? Would the linter catch this?"

**Claude's answer:** ESLint can't catch logical mismatches between route patterns and link generation. TypeScript or integration tests could, but the real fix is a system that makes the bug impossible — hence `routes.js`.

**The lesson:** The best debugging question is "why is this possible?" not "how do I fix this?" Understanding the root cause prevents future occurrences. Fixing the symptom just delays the next one.

---

#### 4. Pushing Back on Complexity

**What happened:** Claude created Module 0 with 3 lessons: (1) check what's installed, (2) create a script to check what's installed (redundant!), (3) install stuff.

I said: "This feels like overkill. Can we streamline?"

**The result:** Condensed to 2 lessons — Check + Install in one flow, and a Troubleshooting guide (optional). Students want to get coding, not run installation scripts.

**The lesson:** AI suggestions aren't gospel. You're still the product manager. Push back when something feels wrong — you know your users better than the AI does.

---

#### 5. Understanding Before Implementing

**What happened:** Before implementing the routes system, I asked Claude to explain what `ROUTES.module(id)` actually does. We walked through arrow functions, template literals, and why this pattern prevents bugs.

```javascript
// This looked confusing at first:
module: (id) => `/course/module/${id}`

// Is shorthand for:
module: function(id) {
  return `/course/module/${id}`
}
```

**The lesson:** Slow down to speed up. Understanding the pattern once saves you from memorizing syntax forever. This is how the course teaches too — explain WHY before WHAT.

---

#### 6. Git as a Safety Net

**What happened:** Working across two laptops, needed to sync changes. Almost started work on the new laptop before pulling — that would have caused merge conflicts.

**The workflow:**
```bash
# Before leaving a machine:
git add . && git commit -m "wip: save before switching" && git push

# On the new machine:
git pull origin main
```

**The lesson:** Git isn't just for teams — it's for YOU across devices and time. Treat `git push` like hitting "Save" before closing a document.

---

#### 7. File Paths vs. Routes

**What happened:** Links worked in some parts of the page but 404'd in others. The culprit was markdown content using file paths instead of route URLs:

```markdown
<!-- BROKE — file path: -->
[Troubleshooting](../lesson-2/lesson.md)

<!-- WORKS — route URL: -->
[Troubleshooting](/course/module/0/lesson/2)
```

**The lesson:** React Router uses routes (URLs), not file paths. Markdown files are content, not code — they need route URLs. SPAs work differently than static sites.

---

### Got Stuck

#### The Hyphen Bug (3x)

**Problem:** Navigation returning 404s, no obvious error messages.

**How we debugged:**
1. Checked file integrity — files were correct ✅
2. Added console.logs — routes never matched ❌
3. Tested with hardcoded route — worked, proving routing was functional ✅
4. Compared pattern to URL — found the hyphen vs. slash mismatch

**Fix:** Immediate: fixed the hyphen. Long-term: created `routes.js`.

---

#### ESLint Version Conflict

**Problem:** `npm install` failing with confusing errors about ESLint 9 vs 8.

**How we solved:** Read the error carefully. The `.eslintrc.json` config format requires ESLint 8 (ESLint 9 uses flat config). Downgraded with `npm install eslint@8`.

**Lesson:** Config file format determines version needs. Newer isn't always better.

---

#### Download Shows 0 Bytes

**Problem:** A file download from Claude Chat appeared empty (0 bytes).

**How we debugged:** Verified with `ls -lh` that the file existed and was 19K on Claude's side. The problem was the browser download, not the file.

**Fix:** Copy/paste as workaround. Sometimes the problem is the tool, not your code.

---

#### Validation Not Working on New Laptop

**Problem:** Cloned repo on new machine, but validation features were missing.

**How we solved:** `git pull origin main`. The laptop had been cloned before the latest push.

**Lesson:** GitHub isn't Dropbox — it doesn't auto-sync. Pull before you start, push before you leave.

---

## Phase 2: Claude Code — Building the Content

*Feb 16 – Feb 21, 2026. Switched from Claude Chat to Claude Code. Built Modules 3-4, dogfooded the course, discovered the gap between "works in theory" and "works for a real student."*

### Teaching Moments

#### 8. Cursor → VS Code Pivot

**What happened:** The course originally taught Cursor (an AI-powered editor). We pivoted to VS Code — a neutral, widely-used IDE.

**Why it matters:** Teaching Cursor alongside Claude Code would confuse the AI narrative. Students should learn ONE AI tool deeply (Claude Code), not juggle two. VS Code is the industry standard and has no competing AI agenda.

**The change:** Renamed Module 3 from "Security & Cursor Introduction" to "Security Fundamentals." Touched 6 files.

---

#### 9. Validation Rigor Escalation

**What happened:** Module 1 used `command-match` validation (type the command, we check if it's correct). For Module 3, we switched to `paste-output` (run the command, paste what you see).

**Why it matters:** `command-match` is forgiving — great for beginners building muscle memory with `cd`, `ls`, `mkdir`. But by Module 3, students should be running real commands and seeing real output. `paste-output` forces authenticity.

**The lesson:** Validation difficulty should escalate with the course. Forgiving early, authentic later. Different validation types serve different pedagogical goals.

---

#### 10. Inline Validation (Not Grouped at Bottom)

**What happened:** Originally, all validation tasks were grouped at the bottom of each lesson. We moved them inline using custom markdown directives: `::validate[task-id]`.

**Why it matters:** Students should validate as they go, not scroll back and forth. Inline placement creates a natural checkpoint flow — do the thing, verify it worked, move on.

**The implementation:** Built a custom remark plugin (`remarkValidateDirective.js`) that transforms `::validate[task-id]` markers into React components. Progress persists in localStorage.

---

#### 11. Plain-English Prompting

**What happened:** The original Module 4 prompt was technical: "Use Vite + React, separate components in src/components/, Plain CSS (no Tailwind)..." A non-developer student would never write that.

**The fix:** Rewrote it as plain English: *"Build me a Daily Planner web app using React with a calendar, task list, notes section, and habit tracker. Make it look clean and modern with some example data so I can see how it looks right away."*

**The lesson:** If your students don't have the vocabulary, give them the words — but explain why those words matter. We kept "using React" and taught students what React is and why specifying it matters, without requiring them to understand it.

---

#### 12. "using React" as Minimum Viable Direction

**What happened:** The plain-English prompt (without "using React") produced a **single `index.html` file** instead of a project. Claude Code took the simplest path.

**Why it matters:** Without specifying a framework, Claude Code's default is "the least complex thing that works." For a single-page planner, that's one HTML file. But the entire module assumes a React project with `src/`, components, `package.json`, etc.

**The fix:** Added two words — "using React" — and framed it as a teaching moment: React is one of many frameworks, students don't need to know it yet, and specifying it tells Claude Code to create a proper project structure.

**The broader lesson:** When working with AI, you sometimes need to specify just enough technical direction to get the right architecture, even if the user doesn't fully understand the implications yet.

---

#### 13. Developer-Focused Example Data

**What happened:** Claude Code generated sample tasks like "Review pull requests," "Morning standup," and "Ship the dashboard redesign." A non-technical student would have no idea what these mean.

**Why it matters:** Claude's training data skews toward developer workflows. When it generates example content, it defaults to what it knows — which is software development.

**The fix:** Added "Use everyday tasks like groceries, exercise, and errands for the example data" to the prompt. One sentence, completely different user experience.

---

#### 14. .gitignore Isn't Guaranteed

**What happened:** The lesson's Security Checkpoint asked students to `cat .gitignore`. During testing, it didn't exist — Claude Code hadn't created one.

**Why it matters:** You can't assume Claude Code handles security defaults. The lesson needs to handle the "file doesn't exist" case gracefully.

**The fix:** Added a callout with a `printf` command to create `.gitignore` if missing, plus fallback `echo >>` commands for incomplete ones.

---

#### 15. "Ask Claude Code for Help" as a Recurring Theme

**What happened:** Non-technical students won't instinctively think "I should ask Claude Code about this error." They need to be told — repeatedly, in different contexts.

**The fix:** Added 4 contextual tips across Lessons 1 and 3:
- After install troubleshooting: "Still stuck? Launch `claude` and describe the error."
- During the build: "If something goes wrong, don't panic. Tell Claude Code what happened."
- End of Lesson 1: "Anytime you're confused, open Claude Code and ask."
- Lesson 3 iteration: "When you hit a wall, describe it to Claude Code. You're never stuck alone."

**The lesson:** For beginners, repetition isn't redundant — it's how learning sticks. Same concept, different context, different wording.

---

#### 16. Accessibility Matters from Day One

**What happened:** I have protonopia (red-green color vision deficiency). The module card labels — light purple text on a purple gradient background — were unreadable.

**The fix:** Changed `.module-number` and `.module-time` to white text with a dark semi-transparent background. High contrast, works for everyone.

**The lesson:** Accessibility isn't a nice-to-have — it's a requirement. If the course creator can't read the course, neither can some students.

---

#### 17. CLAUDE.md Bloat

**What happened:** CLAUDE.md grew from a lean architecture reference to 409 lines of accumulated changelog entries, tutorial content, duplicate tracking, and implementation details.

**The fix:** Slimmed to 255 lines. Removed duplicate module tracking (two places tracking the same info), cut the slash commands tutorial (Claude already knows this), merged overlapping sections, condensed the debugging guide.

**The lesson:** Documentation needs pruning just like code. If it grows unchecked, it becomes noise — and the AI reading it wastes context on irrelevant details.

---

### Got Stuck

#### `claude` Command Not Found

**Problem:** Ran `claude --version` and got `zsh: command not found: claude`.

**What happened:** The Claude desktop app bundles its own Claude Code binary at `~/Library/Application Support/Claude/claude-code/X.X.X/claude` — but doesn't add it to PATH. So `claude` doesn't exist in a regular Terminal.

**Fix:** Install via npm: `npm install -g @anthropic-ai/claude-code`. Added troubleshooting callout in the lesson explaining both installation paths.

---

#### Auth Flow Undocumented

**Problem:** First time running `claude`, it prompted for a login method (3 options). This wasn't in the lesson.

**Fix:** Added a "First-Time Setup" section guiding students to select option 1 (Claude subscription), complete the browser OAuth flow, and handle edge cases ("Browser didn't open?" → press `c` to copy URL).

---

#### Two Different Permission Prompts

**Problem:** Claude Code has two separate approval flows — one for file edits, one for bash commands. The lesson only documented file edits.

**Fix:** Added examples of both prompt types and guidance to select option 2 ("allow all during this session") for each.

---

#### Student Typed Terminal Command Inside Claude Code

**Problem:** After Claude Code finished building, the lesson said to run `ls src/`. A student ran that *inside Claude Code* instead of exiting first.

**Fix:** Added explicit instruction: "When Claude Code finishes, exit it by typing `/exit` or pressing `Ctrl + C`. You're back in your regular Terminal now."

**Lesson:** Never assume students know which tool they're in. Be explicit about context switches.

---

#### npm audit Pattern Mismatch

**Problem:** Module 3's validation expected "found X vulnerabilities" but npm's actual output says "X moderate severity vulnerabilities" — no "found" prefix.

**Fix:** Updated regex from `found \d+ vulnerabilit` to `\d+ .* vulnerabilit` to match npm's current output format.

**Lesson:** External tool output changes over time. Validation patterns need to be flexible.

---

#### Module 3 Path References

**Problem:** Lessons referenced `~/Developer/claude-code-course` — the developer's path, not the student's. Students don't have this directory.

**Fix:** Added a "Clone the Course Project" section at the beginning of Module 3 Lesson 2. Students clone the repo, reinforcing git skills from Module 2.

**Lesson:** Always dogfood from a student's perspective, not a developer's.

---

#### Plain Prompt → Single index.html

**Problem:** The plain-English prompt (no framework specified) produced one HTML file instead of a React project with `src/`, components, etc.

**Fix:** Added "using React" to the prompt and framed it as a teaching moment about frameworks. Also loosened all validation patterns across all 3 lessons to accommodate Claude Code's variable output.

**Lesson:** Claude Code optimizes for simplicity. If you want structure, you need to say so — even if it's just two words.

---

## Patterns That Emerged

### 1. Four-Step Debugging Escalation

When stuck: **Rephrase** (exact error + expected vs. actual) → **Add Context** (ask "what do you think is happening?") → **Step Back** (ask "walk me through what this code does") → **Revert and Retry** (git stash, try different approach).

This emerged from the routing bug saga and became a documented pattern in CLAUDE.md.

### 2. Test Immediately

Claude creates code → test while context is fresh → debug together if broken → commit when working. Making 5 changes before testing = harder to debug. This applies to both Claude Chat (download and test) and Claude Code (run the server).

### 3. Single Source of Truth

Applied to routes (`routes.js`), course structure (`courseLoader.js`), and design tokens (CSS variables). When multiple files need the same info, create ONE source and import it. Born from the routing bug hitting three times.

### 4. Documentation-Driven Development

Write the docs/content first, build features to match. Module lessons were written before the validation system existed. CLAUDE.md was written before switching to Claude Code. Forces clarity of vision.

### 5. Dogfooding Catches What Code Review Misses

Every Phase 2 "Got Stuck" entry was discovered by actually doing the lesson as a student — not by reading the code. Path references, missing .gitignore, auth flow, permission prompts, terminal context confusion — none of these are visible in a code review.

---

## Actionable Takeaways for Colleagues

1. **Try AI pair programming** — Start with a real project, not tutorials
2. **Ask "why" not just "what"** — Understanding prevents future bugs
3. **Push back when something feels wrong** — AI suggestions aren't gospel
4. **Build something you want to exist** — Motivation is built-in
5. **Document as you go** — Future you will thank you
6. **Git is your safety net** — Commit early, commit often
7. **Teaching forces clarity** — The best way to learn is to teach
8. **Dogfood your own product** — Use it the way your users will
9. **Accessibility isn't optional** — If you can't use it, neither can some of your users

---

*Last Updated: February 21, 2026*
*Status: Modules 0-4 complete, Module 5 next*
*Total Sessions: 5+ major sessions across Claude Chat and Claude Code*
*Bugs Fixed: Too many to count*
*Xzibit Memes Made: 1 (and counting)*
