# Contributing

Contributions are welcome — bug fixes, lesson improvements, and platform enhancements.

## Reporting Bugs

Open a GitHub issue. Include:
- What you expected to happen
- What actually happened
- Your browser and OS
- Any console errors (open DevTools with Cmd+Option+I)

## Improving Lesson Content

Lesson files live in `public/course-content/module-N/lesson-N/lesson.md`. They're plain markdown — fix a typo, clarify a step, improve an example. See [SETUP.md](./SETUP.md) for the frontmatter format and callout syntax.

**Content guidelines:**
- Tone is lightweight, not prescriptive
- Every technical step should teach a judgment skill, not just a command
- Prompts in lessons should pass the "would a non-technical student write this?" test — plain English over jargon
- Validation patterns should be flexible enough to handle variation in tool output

## Contributing to the Platform

For anything beyond content fixes, open an issue first to discuss the approach.

When ready to submit:

```bash
git checkout -b your-branch-name
# make changes
npm run lint      # must pass
npm run build     # must pass
git push origin your-branch-name
```

Then open a pull request against `main`.

## License

By contributing, you agree your work will be licensed under the MIT License.
