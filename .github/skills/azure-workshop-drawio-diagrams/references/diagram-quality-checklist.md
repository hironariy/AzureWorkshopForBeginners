# Diagram Quality Checklist

Use this checklist before delivering a draw.io diagram or exported SVG for Azure Workshop for Beginners.

## Source And Scope

- The diagram ID matches the lesson draft, such as `L05-D01`.
- The diagram has one main learning message.
- The target audience is Azure beginners with some system-development background.
- Included details are necessary for the slide, draft, or HTML page.
- Excluded details are intentionally omitted, not forgotten.
- The diagram is not a fake screenshot. Screenshots must come from the screenshot workflow.

## Layout

- Request, deployment, and dependency flows are generally left to right.
- Layered or boundary-heavy architectures use top-to-bottom or container-based grouping.
- Sequence diagrams use numbered arrows when order matters.
- Boundaries are labeled: VNet, subnet, environment, learner scope, instructor scope, Azure-managed scope, or reference-only scope.
- Arrows have clear direction and do not cross unnecessarily.
- The most important path is visually easiest to follow.

## Azure Architecture

- Azure service diagrams use draw.io built-in Azure icons from `img/lib/azure2/`.
- Azure service icons preserve their original aspect ratio and are not stretched, squashed, or used as arbitrarily resized background art.
- Azure service labels use official service names where practical.
- Japanese labels explain learner-facing meaning around service names.
- Exact infrastructure details are shown only when they matter for the lesson.
- High availability and redundancy are represented by the correct service capability, not generic duplicated boxes.
- No icon implies a service that learners will not create or discuss.

## Readability And Accessibility

- Body labels are visually equivalent to at least 18pt at slide size.
- Important labels are visually equivalent to at least 20pt at slide size.
- Text is not clipped by containers or icons.
- Labels do not overlap lines, arrows, or other labels.
- Color is never the only way to distinguish meaning.
- Line style, labels, icons, grouping, or numbering supplement color.
- Contrast is sufficient for projection and recorded video.
- Decorative shapes are removed unless they carry meaning.

## Privacy And Publication Safety

- No subscription IDs, tenant IDs, user names, emails, resource IDs, secrets, connection strings, billing data, internal hostnames, customer names, or real environment identifiers appear.
- Example values are clearly dummy values.
- URLs and endpoints are generic unless explicitly approved for publication.
- IP addresses are avoided unless the lesson specifically teaches IP concepts and uses safe documentation examples.

## File Quality

- `.drawio` source exists under `assets/drawio/lesson-XX/`.
- Editable draw.io SVG export exists under `assets/diagrams/lesson-XX/` and uses the `.drawio.svg` suffix.
- Source and export use matching stable base filenames.
- `.drawio.svg` contains draw.io metadata, such as visible `mxfile`, `content`, `data-mxgraph`, or equivalent draw.io export metadata.
- `.drawio.svg` contains `<title>` and `<desc>`.
- `.drawio.svg` opens without blank output.
- `.drawio.svg` dimensions or viewBox are appropriate for slide use.
- The final HTML or Markdown references the exported `.drawio.svg`, not the `.drawio` source and not a plain `.svg`.