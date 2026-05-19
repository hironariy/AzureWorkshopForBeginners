---
description: "Create HTML presentation slides for Azure Workshop lessons 02 and 03 from existing drafts and screenshots. Use when starting a new session to generate materials/presentation-html/lesson-02.html and lesson-03.html."
name: "Create Lesson 02-03 HTML Presentations"
agent: "agent"
tools: [read, edit, search, execute]
argument-hint: "第2回と第3回の HTML プレゼンテーションスライドを作成してください"
---

You are working in the `AzureWorkshopForBeginners` repository. Create the HTML presentation slide files for Lesson 02 and Lesson 03.

## Goal

Create these two intermediate artifacts for review:

- `materials/presentation-html/lesson-02.html`
- `materials/presentation-html/lesson-03.html`

These are HTML presentation files, not the detailed GitHub Pages HTML manuals and not PowerPoint files. They will later be used as reference material for Microsoft 365 Copilot Cowork / PowerPoint generation.

## Read First

Before editing, read these files:

1. `plan/InitialRequirement.md`
2. `plan/CourseDesign.md`
3. `plan/LessonDesign.md`
4. `materials/drafts/lesson-02.md`
5. `materials/drafts/lesson-03.md`
6. `materials/tips/edge-devtools-fixed-screenshot.md`
7. `.github/agents/screenshot-masker.agent.md`

Use the lesson drafts as the source of truth for slide titles, learning goals, structure, diagrams, screenshots, cleanup, and quiz content.

## Current Screenshot State

Screenshots have already been captured for Lesson 02 and Lesson 03.

Source screenshots are in:

- `materials/images/screenshots-not-masked/L02-SS01.png`
- `materials/images/screenshots-not-masked/L02-SS02.png`
- `materials/images/screenshots-not-masked/L02-SS03.png`
- `materials/images/screenshots-not-masked/L03-SS01.png` through `materials/images/screenshots-not-masked/L03-SS20.png`

Existing masked Lesson 02 images are in:

- `materials/images/screenshots/L02-SS01-masked.png`
- `materials/images/screenshots/L02-SS02-masked.png`
- `materials/images/screenshots/L02-SS03-masked.png`

Existing masked Lesson 03 images have also been created and stored in:

- `materials/images/screenshots/L03-SS01-masked.png` through `materials/images/screenshots/L03-SS20-masked.png`

`materials/images/screenshots-not-masked/*` is ignored by `.gitignore` and must not be referenced from the final presentation HTML. Use only publication-safe masked images from `materials/images/screenshots/` in the presentation files.

## Important Lesson 03 Screenshot Note

Some Lesson 03 screenshots are dummy/provisional screenshots.

Reason: several screens can only be captured as final, fully accurate hands-on evidence after VM custom data / Custom Script installs NGINX, creates the custom page, and configures the expected web output. The current Lesson 03 screenshots were captured for slide-production continuity and some are placeholders for that final flow.

Treat the Lesson 03 screenshots as follows:

- Use the existing `materials/images/screenshots/L03-SSxx-masked.png` files in the HTML presentation.
- Do not rewrite the lesson narrative to match a dummy screenshot if it conflicts with `materials/drafts/lesson-03.md`.
- Prefer the draft's intended flow: VM creation, Custom data/cloud-init, NGINX installation, custom page display, resource review, NSG check, cleanup.
- For screenshots related to Custom data, NGINX custom page display, deployment completion, Public IP, Run command, and cleanup, assume they may be provisional unless visual inspection proves otherwise.
- In the final response, mention any screenshot that appears dummy or inconsistent and mark it as needing later recapture.

Likely provisional/dummy-sensitive Lesson 03 IDs include at least:

- `L03-SS10` Custom data / cloud-init
- `L03-SS13` deployment completion
- `L03-SS14` VM Overview / Public IP
- `L03-SS16` browser NGINX custom page
- `L03-SS18` Run command recovery reference

This list is a caution, not a replacement for visual inspection.

## Screenshot Preparation Status

Lesson 03 masked screenshots have already been created for all `L03-SS01` through `L03-SS20` images. Do not redo the masking work unless a file is missing, visibly broken, or still exposes sensitive information.

Before using screenshots in `lesson-03.html`, verify the existing masked copies:

- Read `materials/drafts/lesson-03.md` `## スクリーンショット取得指示` for each `L03-SSxx` row.
- Confirm the corresponding masked image exists at `materials/images/screenshots/L03-SSxx-masked.png`.
- Confirm the HTML presentation references only `materials/images/screenshots/L03-SSxx-masked.png`, never `materials/images/screenshots-not-masked/L03-SSxx.png`.
- Open or inspect the masked images used by the deck and verify that no account, subscription, tenant, resource ID, secret, Public IP, or internal resource detail remains visible.
- If a masked image is missing or unsafe, regenerate it using the behavior described in `.github/agents/screenshot-masker.agent.md`: source from `materials/images/screenshots-not-masked/L03-SSxx.png`, output to `materials/images/screenshots/L03-SSxx-masked.png`, keep source unmodified, use opaque black rectangular masks, preserve dimensions, and delete temporary scripts after use.

Lesson 02 already has masked images, but still inspect them quickly before using them.

## Presentation Requirements

Follow `plan/CourseDesign.md` Gate 3:

- One main message per slide.
- Every slide should have a clear title and short lead sentence.
- Keep text concise enough for presentation use; do not paste the full Markdown draft into slides.
- Use diagrams and screenshots where they clarify the point.
- Make the slide count feasible for a 50-minute lecture/hands-on slot plus 10-minute QA.
- Do not create PowerPoint files.
- Do not create Azure resources.
- Do not use IaC or ask learners to use IaC.
- Keep hands-on learner operations Portal-first. CLI, if mentioned, must be Azure Cloud Shell only.

## Suggested Output Structure

Use self-contained HTML files with embedded CSS. Keep dependencies minimal.

Recommended structure for each file:

- A full HTML document.
- A `<main class="deck">` containing slide sections.
- One `<section class="slide">` per slide.
- Speaker-friendly slide titles and lead text.
- Images referenced by relative paths from `materials/presentation-html/` to `../images/screenshots/...`.
- Diagram placeholders for `L02-Dxx` and `L03-Dxx` where diagrams have not yet been created.
- A short production note area only if needed; do not show visible notes that distract learners during the slide deck.

Example image path from `materials/presentation-html/lesson-02.html`:

```html
<img src="../images/screenshots/L02-SS01-masked.png" alt="Azure Portal の Virtual Machines 一覧画面" />
```

## Lesson 02 Guidance

Lesson 02 is lecture-only. Use the draft's 33-slide outline as the primary structure, but condense if needed while preserving the learning story:

- Web 3-tier application basics.
- Why Web 3-tier is learned before the hands-on lessons.
- Browser, Web layer, AP layer, DB layer.
- Monolithic vs Web 3-tier.
- Static vs dynamic content.
- Azure IaaS and Container Apps examples.
- SPA and database type introduction.
- Connection to Lessons 03-06.

Screenshots `L02-SS01` to `L02-SS03` are optional reference images. Use them sparingly as preview/bridge visuals, not as the core explanation. The main visuals for Lesson 02 can be clean diagram placeholders if actual diagrams do not exist yet.

## Lesson 03 Guidance

Lesson 03 is lecture + hands-on. Use the draft's 46-slide outline as the primary structure, but keep the presentation paced for 50 minutes:

- Quick review of Lesson 02 Web layer.
- Azure IaaS and Azure VM surrounding resources.
- VM, OS image, size, disk, NIC, VNet, subnet, Public IP, NSG.
- Completed architecture: browser -> Public IP -> NSG -> Azure VM -> NGINX.
- Hands-on flow: sign in, resource group, VM create, Custom data, review/create, deployment, VM overview, browser test, NSG check, cleanup.
- Troubleshooting and skip path.
- Cost and cleanup emphasis.
- Quiz and next lesson connection.

Use the existing masked screenshots for the hands-on slides. If a screenshot is dummy/provisional, still use it only as a visual aid and keep the text faithful to the intended final hands-on flow.

## Visual And Accessibility Requirements

- Use responsive layout that works at common presentation sizes.
- Keep font sizes presentation-friendly.
- Do not rely on color alone; use labels and text.
- Give every image meaningful `alt` text.
- Avoid cramming long tables into one slide; split or simplify.
- Use neutral, professional styling suitable for an Azure beginner workshop.
- Keep screenshots large enough to read. Crop only if it improves clarity and does not hide required context.

## Validation Before Finishing

After creating or updating files:

1. Run available diagnostics on `materials/presentation-html/lesson-02.html` and `materials/presentation-html/lesson-03.html`.
2. Confirm both files exist.
3. Confirm no HTML file references `screenshots-not-masked`.
4. Confirm every referenced `../images/screenshots/*-masked.png` file exists.
5. Confirm Lesson 03 masked screenshots used by the deck exist; expected files are `L03-SS01-masked.png` through `L03-SS20-masked.png` under `materials/images/screenshots/`.
6. Confirm no temporary masking script remains in the repository.
7. If possible, open the HTML files in a browser or run a local preview and visually inspect at least the first few slides and screenshot slides.
8. In the final response, summarize created files, screenshot masking status, dummy/provisional screenshot caveats, and any remaining recapture needs.

## Final Response Format

Return a concise Japanese summary with:

- Created/updated HTML files.
- Screenshot files used, and any masked files regenerated only if necessary.
- Validation performed.
- Remaining caveats, especially Lesson 03 dummy/provisional screenshots.