# Brief: export n8n workflows for the portfolio

You're connected to my n8n through MCP. Pull the workflows I want to show on my portfolio and save each one in the format below. Another Claude session will read the folder and put the workflows on the site, so stick to the format exactly and keep the writing short.

## Which workflows

Only the ones I name. If I didn't name any, list my workflows (name, active or not, last run status) and ask me which ones to export before writing anything.

## Where to save

```
C:\Users\Admin\Documents\My-Eportfolio\workflow-import\
  <slug>\
    workflow.json
    screenshots\
      01-canvas.png
      02-....png
```

- `<slug>`: the workflow name in lowercase with dashes, e.g. `ai-lead-scraper`.
- Copy the layout of `_example\` in the same folder.
- If you can't write files, reply with each file's full path as a heading and its content in a code block, and I'll save them.

## workflow.json

```json
{
  "slug": "ai-lead-scraper",
  "title": "AI Lead Scraper",
  "description": "One or two sentences for the card. What it does and for whom. Max 30 words.",
  "overview": [
    "Paragraph 1: what starts it and what it does, step by step, in plain words.",
    "Paragraph 2: the useful detail, e.g. how it handles errors, duplicates or approvals."
  ],
  "flow": ["Schedule", "HTTP Request", "OpenAI", "Google Sheets"],
  "tools": ["n8n", "OpenAI", "Google Sheets"],
  "status": "live",
  "result": null,
  "link": null,
  "screenshots": [
    {
      "file": "01-canvas.png",
      "alt": "n8n canvas for the AI Lead Scraper workflow",
      "title": "The full workflow in n8n",
      "description": ["One or two short paragraphs: what this screenshot shows and why it matters."]
    }
  ],
  "screenshotsNeeded": [],
  "n8n": { "workflowId": "123", "active": true, "lastRun": "success", "nodeCount": 9 },
  "notesForClaude": ""
}
```

Field rules:

| Field | Rule |
|---|---|
| `description` | Max 30 words. Shown on the card. |
| `overview` | 1–3 short paragraphs. Describe only what the workflow actually does; read the nodes, don't guess. |
| `flow` | 3–6 steps in order, 1–3 words each. Group small nodes (Set, IF, Merge) into the step they serve. |
| `tools` | Apps and services used. Always include `n8n`. No node types like "Set" or "Code". |
| `status` | `live` = active and its last run succeeded. `in-progress` = built but inactive or failing. `concept` = sketch or not working yet. |
| `result` | A measured outcome I told you about, e.g. `"Saves ~5 hrs/week"`. Never estimate one yourself. Otherwise `null`. |
| `link` | Public link to a write-up or video only if I give you one. Never an n8n editor or webhook URL. Otherwise `null`. |
| `screenshots` | Ordered as you'd walk someone through it. 1–4 per workflow. |
| `screenshotsNeeded` | If you can't capture screenshots, list the shots I should take myself, e.g. `"01-canvas.png: whole canvas, zoomed to fit"`. |
| `notesForClaude` | Anything uncertain or worth knowing. Empty string if nothing. |

## Screenshots

- PNG, at least 1600px wide, roughly 16:9. Wide shots of the canvas work best.
- Good set: the whole canvas, then 1–3 key nodes or a successful execution.
- Name them `01-…png`, `02-…png` in viewing order, matching `screenshots[].file`.

## Never include (the site is public)

- API keys, tokens, passwords, credential names or IDs
- Webhook URLs, n8n instance URLs, Google Sheet/Doc IDs, database connection strings
- Real people's names, emails or phone numbers, or customer data from executions. Blur them in screenshots.
- The raw workflow export JSON

If a screenshot can't be taken without showing something on this list, skip it and add it to `screenshotsNeeded` with a note.

## Writing style

Plain and specific, like explaining it to a colleague. No hype words ("seamless", "powerful", "revolutionary"), no emoji. Short sentences.

## When you're done

Reply with a short list: each slug, its status, how many screenshots were saved, and anything in `screenshotsNeeded`.
