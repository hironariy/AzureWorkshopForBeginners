---
name: azure-workshop-drawio-diagrams
description: "Use when creating, updating, reviewing, or validating Azure Workshop draw.io diagrams, Azure architecture diagrams, Azure service relationship diagrams, network diagrams, LXX-DYY assets, .drawio.svg export files, and img/lib/azure2 icon usage. Enforces @drawio/mcp workflow, draw.io editable SVG exports, Azure built-in SVG icons, diagram validation, privacy review, 構成図, アーキテクチャ図, and slide-ready diagram quality."
argument-hint: "第5回の L05-D01 構成図を draw.io と img/lib/azure2 アイコンで作成してください"
user-invocable: true
---

# Azure Workshop Draw.io Diagrams

Use this skill when a task involves finished diagram assets for Azure Workshop for Beginners, especially draw.io diagrams, Azure service architecture diagrams, service relationship diagrams, network diagrams, sequence diagrams, and exported SVGs for Markdown, HTML, presentation HTML, or PowerPoint.

This skill turns draft diagram ideas into draw.io-authored, slide-ready `.drawio.svg` exports. It also prevents hand-coded Azure architecture SVGs or plain `.svg` files from becoming final assets.

## Required Inputs

Before creating or editing diagrams, collect:

1. The target lesson number and diagram IDs, such as `L05-D01`.
2. The relevant draft sections: `## 図表・スクリーンショット素材一覧` and `## 図表案`.
3. The target output paths under `assets/drawio/lesson-XX/` and `assets/diagrams/lesson-XX/`.
4. Whether each asset is a conceptual diagram, Azure service architecture diagram, network diagram, service relationship diagram, sequence diagram, table, or screenshot.
5. Any current HTML or Markdown references that must keep stable SVG paths.

Also read `.github/instructions/drawio.instructions.md` for the repository-wide draw.io rules.

## Diagram Classification

Classify each visual before making it:

- `Conceptual diagram`: Explains roles, responsibility, sequence, or a mental model without depicting specific Azure services. Use draw.io shapes; Azure icons are optional and usually unnecessary.
- `Azure architecture diagram`: Shows Azure services, hosting topology, deployment structure, service composition, or production-like configuration. Azure service icons are mandatory.
- `Azure network diagram`: Shows VNet, subnet, NSG, route table, Private Endpoint, Private DNS Zone, firewall, gateway, or traffic paths. Azure service icons are mandatory for Azure resources.
- `Azure service relationship diagram`: Shows dependencies among Azure services, applications, registries, databases, monitoring, identity, or storage. Azure service icons are mandatory.
- `Sequence diagram`: Shows order of operations. Use numbered arrows and service icons when Azure services participate.
- `Screenshot`: Do not create a fake diagram. Use screenshot acquisition or masking workflows instead.

If classification is unclear and it changes icon requirements or asset format, ask before creating final assets.

## Planning Procedure

For each diagram, write a short plan before using draw.io:

1. `ID`: stable ID such as `L05-D01`.
2. `Purpose`: the single learning message.
3. `Audience`: Azure beginners with some system-development background.
4. `Type`: one classification from the list above.
5. `Included`: services, roles, boundaries, arrows, states, and labels that matter.
6. `Excluded`: details that would distract from the slide or draft.
7. `Layout`: left-to-right flow, top-to-bottom layers, grouped containers, or sequence.
8. `Source`: `assets/drawio/lesson-XX/l<XX>-d<YY>-<slug>.drawio`, if a separate source file is kept.
9. `Export`: `assets/diagrams/lesson-XX/l<XX>-d<YY>-<slug>.drawio.svg`.

Use stable filenames. Once a `.drawio.svg` is referenced by Markdown, HTML, or presentation HTML, keep the path stable unless the user approves a rename.

## Creation Procedure

1. Use the draw.io MCP server configured in `.vscode/mcp.json` (`npx -y @drawio/mcp`) for creating and editing diagrams when available.
2. Store optional separate editable sources under `assets/drawio/lesson-XX/`.
3. Export final diagrams as editable draw.io SVG files under `assets/diagrams/lesson-XX/` with the `.drawio.svg` suffix.
4. Insert `.drawio.svg` files into HTML, Markdown, and presentation HTML. Do not insert plain `.svg` diagram exports.
5. Keep the `.drawio.svg` export in version control. If a separate `.drawio` source exists, keep it together with the `.drawio.svg` export.
6. When exporting from draw.io/diagrams.net, use an editable SVG export mode that embeds the draw.io diagram data, such as the option commonly shown as `Include a copy of my diagram`.
7. Prefer readable, uncompressed `.drawio` XML when the tool offers that option so icon references can be reviewed.
8. Add meaningful SVG `<title>` and `<desc>` elements during export or post-export cleanup.
9. Update HTML or Markdown references only after validating the source and export.

If the draw.io MCP server or draw.io export path is unavailable, stop and report that clearly. Do not silently replace the workflow with hand-coded Azure architecture SVGs or plain `.svg` files. A temporary non-final sketch is acceptable only when clearly marked as provisional.

## Azure Icon Rules

For Azure architecture, network, service relationship, hosting, or deployment diagrams:

- Use draw.io built-in Azure SVG icons referenced from `img/lib/azure2/`.
- Do not use inline SVG copies of Azure icons.
- Do not use base64-encoded Azure icons.
- Do not use externally downloaded Azure icons.
- Do not hand-draw service icons or invent icons.
- Preserve the original aspect ratio of every Azure icon. In draw.io, keep the icon's aspect ratio locked and use fixed-aspect image styles such as `aspect=fixed`; do not stretch icons to fit arbitrary boxes.
- Do not use draw.io image styles that distort Azure icons, such as `imageAspect=0`, unless the exact draw.io export format proves it still preserves the icon's original ratio.
- Do not set text background color on Azure icon labels.
- Use official Azure service names where practical, with Japanese explanatory labels for learner context.
- If the exact Azure icon is unavailable, use a neutral labeled box and record the intended service and reason in the diagram plan or SVG description.

Load [Azure icon usage](./references/azure-icon-usage.md) when choosing icons or reviewing icon compliance.

## Design Quality Rules

- One diagram should communicate one main learning message.
- Use Japanese learner-facing labels unless the service name is normally written in English.
- Show communication direction with arrows.
- Use numbered steps when order matters.
- Show ownership, network, or management boundaries with labeled containers.
- Mark what learners build, what instructors prepare, and what is reference-only when that distinction matters.
- Do not rely on color alone; combine labels, icons, grouping, line styles, and arrows.
- Keep body text visually equivalent to at least 18pt and important labels at least 20pt.
- If a diagram becomes crowded, split it rather than shrinking text.
- Avoid decorative shapes that do not carry meaning.

Load [diagram quality checklist](./references/diagram-quality-checklist.md) for detailed review criteria before final delivery.

## Workshop Patterns

- Web 3-tier: show `Web 層`, `AP 層`, and `DB 層` as logical roles. Do not imply that three physical servers are required.
- Azure IaaS: show VNet, subnets, NSG, Web/AP VM groups, Application Gateway or Load Balancer only when relevant to the learning goal.
- Database: show high availability, replication, backup, or zone redundancy as database capabilities. Do not use generic load balancing for DB redundancy unless explaining a DB-supported pattern.
- Container Apps: show Azure Container Apps Environment, Web/API Container Apps, Azure Container Registry, and Azure Database for PostgreSQL distinctly.
- Networking: label VNet, subnet, NSG, route table, Private Endpoint, Private DNS Zone, gateway, firewall, and DNS flow when included.
- Responsibility: label what Azure provides, what learners configure, what instructors prepare, and what is only reference material.

## Validation Procedure

Before finishing:

1. Confirm every final diagram export uses the `.drawio.svg` suffix, not plain `.svg`.
2. Confirm Azure service diagrams use `img/lib/azure2/` references for Azure icons.
3. Confirm Azure icons preserve their original aspect ratio and are not stretched, squashed, or fitted into non-proportional frames.
4. Confirm there are no inline, base64, external, or invented Azure service icons.
5. Confirm `.drawio.svg` files contain embedded draw.io metadata, such as visible `mxfile`, `content`, `data-mxgraph`, or equivalent draw.io export metadata.
6. Confirm `.drawio.svg` files contain `<title>` and `<desc>`.
7. Confirm `.drawio.svg` files parse as XML or at least pass the strongest available static XML check.
8. Confirm labels are not clipped and lines do not overlap confusingly.
9. Confirm the diagram is readable at slide size.
10. Confirm no sensitive values appear: subscription IDs, tenant IDs, user names, emails, secrets, connection strings, resource IDs, endpoints, IP addresses, billing data, or customer/internal names.
11. Confirm final HTML or Markdown references point to `assets/diagrams/lesson-XX/*.drawio.svg`, not `assets/drawio/` and not plain `*.svg`.

Use the validator when applicable:

```bash
node .github/skills/azure-workshop-drawio-diagrams/scripts/validate-drawio-diagrams.mjs lesson-02 --report-only
```

Use `--all` to scan all lesson diagram directories. Omit `--report-only` when you want failures to return a non-zero exit code.

## Existing Legacy Assets

Existing plain SVGs under `assets/diagrams/lesson-02/` are legacy assets until migrated. When the user asks to remake existing diagrams, export editable draw.io SVGs under `assets/diagrams/lesson-02/` using `.drawio.svg` filenames, update HTML references to those `.drawio.svg` files, and validate the new assets before finishing. Keep optional separate `.drawio` sources under `assets/drawio/lesson-02/` only when they help review or future editing.