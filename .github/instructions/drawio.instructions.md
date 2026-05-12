---
description: "Use when creating or updating draw.io diagrams, Azure architecture diagrams, Azure service relationship diagrams, network diagrams, sequence diagrams, or SVG diagram assets for this workshop. Covers draw.io MCP usage, Azure icon rules, accessibility, export rules, and screenshot separation."
---

# draw.io Diagram Guidelines

These instructions apply when designing or editing diagrams for Azure Workshop for Beginners, especially when using the `drawio` MCP server configured in `.vscode/mcp.json`.

## When To Use draw.io

- Use draw.io diagrams for architecture, service relationships, communication paths, responsibility boundaries, network topology, DNS/name-resolution flow, deployment flow, and sequence-style explanations.
- Prefer generated diagrams over screenshots when the goal is to explain structure, responsibility, or flow.
- Do not fake Azure Portal screenshots. If a slide or HTML page needs a screenshot, write a screenshot acquisition instruction instead.
- Before creating a diagram, state a short diagram plan: purpose, audience, included services, excluded details, layout direction, and file names.

## File And Asset Naming

- Store editable draw.io source files under `assets/drawio/lesson-XX/`.
- Store exported SVG files under `assets/diagrams/lesson-XX/`.
- Use the material's diagram ID in the file name when available. Example: `l02-d15-azure-iaas-web-3tier.drawio` and `l02-d15-azure-iaas-web-3tier.svg`.
- Keep one main concept per diagram. If a diagram becomes crowded, split it into multiple diagrams rather than shrinking text.
- Keep diagram IDs stable once referenced from Markdown, HTML, or presentation files.

## Azure Icon Rules

- Use draw.io built-in Azure SVG icons, not inline SVG copied into the document.
- Reference Azure icons from draw.io's Azure icon library paths such as `img/lib/azure2/`.
- Do not set text background color on Azure icon labels.
- Use official Azure service names in labels where practical. Use Japanese explanatory labels for learner-facing context.
- Do not invent Azure service icons. If the exact icon is unavailable, use a neutral labeled box and note the intended service.

## Diagram Design Rules

- Use Japanese labels for learner-facing diagrams unless the source service name is normally written in English.
- Show communication direction with arrows.
- Show management or ownership boundaries with labeled containers.
- Mark what learners build, what instructors prepare, and what is only shown for reference when the distinction matters.
- Do not rely on color alone. Use labels, line style, grouping, or icons in addition to color.
- Use clear spacing and avoid crossing lines. Prefer left-to-right flow for request/response and top-to-bottom flow for layered architectures.
- Keep text readable in PowerPoint and HTML. Use a minimum visual size equivalent to 18pt body text and 20pt important labels.
- Avoid decorative shapes that do not carry meaning.

## Azure Workshop Conventions

- For Web 3-tier diagrams, show Web 層, AP 層, and DB 層 as logical roles. Do not imply that Web 3-tier always requires exactly three servers.
- For Azure IaaS Web 3-tier examples, show Web and AP layers as scalable/redundant through Azure Load Balancer or Application Gateway when availability is relevant.
- For DB layers, show redundancy as a database capability such as high availability, replication, or zone redundancy. Do not show DB redundancy as simple load balancing unless specifically explaining read replicas or a DB-specific pattern.
- For Container Apps diagrams, show Azure Container Apps Environment, container apps, Azure Container Registry, and database dependencies distinctly.
- For networking diagrams, explicitly label VNet, subnet, NSG, route table, Private Endpoint, and Private DNS Zone when they are part of the learning goal.
- For DNS or request flows, use numbered steps when sequence matters.

## Screenshot Separation

- Treat screenshots as separate assets from diagrams.
- In Markdown drafts, identify diagrams with `LXX-DYY` IDs and screenshots with `LXX-SSYY` IDs.
- If screenshots are needed, specify: target service, Azure Portal screen name, timing, click target, input value, expected state, and masking requirements.
- Mask or avoid subscription IDs, tenant IDs, user names, email addresses, resource IDs, secrets, connection strings, Service Principal credentials, and billing information.

## Export And Review

- Export final diagrams as SVG for insertion into HTML, presentation HTML, and PowerPoint.
- Keep the editable `.drawio` file alongside the exported SVG.
- After export, verify that labels are not clipped, lines do not overlap confusingly, colors are accessible, and the diagram remains readable at slide size.
- Check that the exported SVG does not embed secrets, internal tenant details, customer names, personal information, or private environment identifiers.

## Working Pattern

1. Read the relevant lesson draft and collect the diagram IDs, purposes, and target slides.
2. Confirm whether each asset is a diagram, table, or screenshot.
3. Draft the diagram plan before using the draw.io MCP server.
4. Create or update the `.drawio` source.
5. Export SVG.
6. Update the lesson Markdown with the asset path and any remaining screenshot acquisition notes.
7. Run a quick review for readability, accessibility, naming, and confidential information.