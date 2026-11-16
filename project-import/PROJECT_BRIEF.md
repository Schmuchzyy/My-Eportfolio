# Brief: export a project for the portfolio

You built or improved one of my projects. Save its details in the format below so another Claude session can add it to the Projects section of my portfolio (https://sean-anunciacion.vercel.app). Stick to the format exactly and keep the writing short.

The Projects section is for web apps and software only. n8n workflows go in the Workflow Automation section instead (see `workflow-import/ORCHESTRATOR_BRIEF.md`).

Each project card opens a detail panel ("focus mode") with a screenshot viewer. Under each screenshot the panel shows its `title` and `description`, then the project's `overview`, `highlights`, tech stack and links.

## Where to save

```
C:\Users\Admin\Documents\My-Eportfolio\project-import\
  <slug>\
    project.json
    screenshots\
      01-cover.png
      02-....png
```

- `<slug>`: the project name in lowercase with dashes, e.g. `late-night-thoughts`.
- Copy the layout of `_example\` in the same folder.
- If you can't write files, reply with each file's full path as a heading and its content in a code block, and I'll save them.

## project.json

```json
{
  "slug": "late-night-thoughts",
  "title": "Late Night Thoughts",
  "kind": "Personal project",
  "period": "2026",
  "description": "What it is, who it's for and what makes it interesting. 25–45 words.",
  "overview": [
    "Paragraph 1: what the app does and who it's for.",
    "Paragraph 2: how it's built and the main technical choices.",
    "Optional paragraph 3: limits of the live site, or what's next."
  ],
  "highlights": [
    "One concrete thing you built or solved, under 20 words.",
    "Another one.",
    "A third one."
  ],
  "tags": ["HTML", "JavaScript", "Vercel Functions", "Gemini API"],
  "liveUrl": "https://example.vercel.app",
  "repoUrl": "https://github.com/Schmuchzyy/example",
  "screenshots": [
    {
      "file": "01-cover.png",
      "alt": "What the screenshot shows, for screen readers",
      "title": "Short heading, e.g. The example reply",
      "description": "One to three sentences: what the viewer is looking at and why that part matters."
    }
  ],
  "notesForClaude": ""
}
```

Field rules:

| Field | Rule |
|---|---|
| `kind` | e.g. `Personal project`, `Portfolio project`, `Capstone project · HAU`, `Client project`. |
| `period` | Year, or `Mon YYYY – Mon YYYY`, or `2025 – Present`. |
| `description` | 25–45 words. Shown on the project card. Plain and specific. |
| `overview` | 2–3 short paragraphs for the detail panel. |
| `highlights` | 2–4 bullets. Real things you built (a feature, a fix, a test), not adjectives. |
| `tags` | 3–6 main technologies, most important first. |
| `liveUrl` | The public, working URL. Open it first to check it loads. Otherwise `null`. |
| `repoUrl` | Public GitHub URL, or `null` if the repo is private. |
| `screenshots` | 1–5. The first is the card cover. Each needs `title` and `description` for the panel. |
| `notesForClaude` | Anything I should know: unfinished parts, demo limits, things to avoid saying. Empty string if nothing. |

## Screenshots

- PNG, at least 1280px wide, roughly 16:10 or 16:9. Desktop width for the cover.
- The cover should show the app in use with realistic sample content, not an empty screen or a login form.
- Name them `01-…png`, `02-…png` in order, matching `screenshots[].file`.

## Never include

- API keys, tokens or passwords, including in screenshots of settings screens. Show key fields empty.
- Real people's names, emails or private notes. Use made-up sample content.
- `.env` files or anything from them.

## Writing style

Plain and specific, like explaining it to a colleague. No hype words ("seamless", "powerful", "revolutionary"), no emoji.

## When you're done

Reply with the slug, the live URL, how many screenshots you saved, and anything in `notesForClaude`.
