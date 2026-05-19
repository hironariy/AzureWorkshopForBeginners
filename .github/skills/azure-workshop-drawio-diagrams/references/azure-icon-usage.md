# Azure Icon Usage

Azure service architecture diagrams in this workshop must use draw.io built-in Azure SVG icons through `img/lib/azure2/` references.

## Mandatory Cases

Use `img/lib/azure2/` Azure icons when the diagram shows any of these:

- Azure service composition or architecture.
- Azure hosting topology for VM, App Service, Container Apps, Functions, Static Web Apps, AKS, or related services.
- Azure network topology with VNet, subnet, NSG, route table, Private Endpoint, Private DNS Zone, gateway, firewall, or load balancing.
- Azure deployment flow involving ACR, Container Apps, VM, PostgreSQL, Storage, Key Vault, Monitor, Application Insights, Log Analytics, or identity.
- Azure service relationship diagrams for course lessons or slide decks.

## Optional Cases

Azure icons are usually unnecessary when the diagram is purely conceptual:

- Web 3-tier as logical roles only.
- Responsibility comparison without specific Azure services.
- General request/response sequence without Azure resources.
- Conceptual explanation of Web, AP, and DB roles.

Even for conceptual diagrams, use draw.io-authored `.drawio.svg` exports when the asset is a final workshop diagram.

## Prohibited Icon Sources

- Inline SVG copies of Azure icons.
- Base64-encoded Azure icons.
- External downloaded Azure icon files.
- Hand-drawn service icon lookalikes.
- Generic colored boxes pretending to be official Azure services when an Azure icon exists.

## Label Rules

- Use official Azure service names where practical: `Azure Virtual Machines`, `Azure Container Apps`, `Azure Container Registry`, `Azure Database for PostgreSQL`, `Azure Functions`, `Azure Static Web Apps`, `Azure Monitor`, `Log Analytics workspace`, `Application Insights`.
- Add concise Japanese learner-facing labels around service names, such as `コンテナ実行環境`, `イメージ保管`, or `監視データの保存先`.
- Do not set text background color on Azure icon labels.
- Do not place long explanations directly under small service icons. Put explanations in nearby callouts or grouped captions.

## Aspect Ratio Rules

- Preserve the original aspect ratio of every Azure icon.
- In draw.io, keep the icon's aspect ratio locked when resizing.
- Use fixed-aspect image styles, such as `aspect=fixed`, for Azure icon image cells.
- Do not stretch Azure icons horizontally or vertically to fit arbitrary card, lane, or container dimensions.
- Do not use styles that intentionally distort image proportions, such as `imageAspect=0`, unless you have verified that the specific export still preserves the source icon ratio.
- If more label space is needed, increase the surrounding container or move the label outside the icon area instead of stretching the icon.

## Missing Exact Icon

If the exact draw.io Azure icon cannot be found:

1. Use the closest official Azure category icon only when it would not mislead learners.
2. Otherwise use a neutral labeled box.
3. Record the intended service and reason in the diagram plan or SVG `<desc>`.
4. Do not invent an icon.

## Review Heuristic

For Azure diagrams, the `.drawio` source or editable `.drawio.svg` export should include visible `img/lib/azure2/` references when saved in readable XML. If the embedded draw.io metadata is compressed and icon paths are not inspectable, keep a readable separate `.drawio` source for review or report the limitation explicitly.