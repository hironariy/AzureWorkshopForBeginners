#!/usr/bin/env node

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, '../../../..');
const diagramsRoot = join(repoRoot, 'assets/diagrams');
const drawioRoot = join(repoRoot, 'assets/drawio');

const args = process.argv.slice(2);
const flags = new Set(args.filter((arg) => arg.startsWith('--')));
const targets = args.filter((arg) => !arg.startsWith('--'));

const reportOnly = flags.has('--report-only');
const scanAll = flags.has('--all');
const strictAll = flags.has('--strict-all');

const azureTerms = [
  /\bazure\b/i,
  /virtual machines?|\bvm\b/i,
  /container apps?|\baca\b/i,
  /container registry|\bacr\b/i,
  /postgresql|database for postgresql/i,
  /static web apps?/i,
  /functions?/i,
  /application gateway/i,
  /load balancer/i,
  /public ip/i,
  /\bvnet\b|virtual network/i,
  /subnet/i,
  /\bnsg\b|network security group/i,
  /private endpoint/i,
  /private dns/i,
  /route table/i,
  /key vault/i,
  /storage account/i,
  /monitor|log analytics|application insights/i,
  /managed identity|entra/i,
];

const sensitivePatterns = [
  ['email address', /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi],
  ['uuid-like value', /\b[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\b/gi],
  ['connection string keyword', /\b(AccountKey|SharedAccessKey|SharedAccessSignature|DefaultEndpointsProtocol|ConnectionString|client_secret|password|secret)\b/gi],
  ['ip address', /\b(?:\d{1,3}\.){3}\d{1,3}\b/g],
  ['url or endpoint', /https?:\/\/[^\s"'<>]+/gi],
];

const safeUrlPrefixes = [
  'http://www.w3.org/',
  'https://www.w3.org/',
  'https://www.drawio.com/',
  'https://app.diagrams.net/',
];

function usage() {
  return [
    'Usage:',
    '  node .github/skills/azure-workshop-drawio-diagrams/scripts/validate-drawio-diagrams.mjs lesson-02',
    '  node .github/skills/azure-workshop-drawio-diagrams/scripts/validate-drawio-diagrams.mjs assets/diagrams/lesson-02 --report-only',
    '  node .github/skills/azure-workshop-drawio-diagrams/scripts/validate-drawio-diagrams.mjs --all',
    '',
    'Flags:',
    '  --all          Scan all assets/diagrams/lesson-* directories.',
    '  --strict-all   Treat every .drawio.svg as requiring Azure icon path validation.',
    '  --report-only  Print failures but exit with code 0.',
  ].join('\n');
}

function exists(path) {
  try {
    statSync(path);
    return true;
  } catch {
    return false;
  }
}

function isDirectory(path) {
  try {
    return statSync(path).isDirectory();
  } catch {
    return false;
  }
}

function rel(path) {
  return relative(repoRoot, path).replaceAll('\\', '/');
}

function resolveLessonDirectory(target) {
  if (!target || /^\d+$/.test(target)) {
    const lesson = String(target || '').padStart(2, '0');
    return join(diagramsRoot, `lesson-${lesson}`);
  }

  if (/^lesson-\d+$/i.test(target)) {
    return join(diagramsRoot, target.toLowerCase());
  }

  if (/^assets\/diagrams\/lesson-\d+$/i.test(target)) {
    return resolve(repoRoot, target);
  }

  const absolute = resolve(repoRoot, target);
  if (absolute.startsWith(`${diagramsRoot}/`) || absolute === diagramsRoot || isDirectory(absolute)) {
    return absolute;
  }

  return join(diagramsRoot, target);
}

function listLessonDirectories() {
  if (!isDirectory(diagramsRoot)) return [];
  return readdirSync(diagramsRoot)
    .filter((entry) => /^lesson-\d+$/i.test(entry))
    .map((entry) => join(diagramsRoot, entry))
    .filter(isDirectory);
}

function read(path) {
  return readFileSync(path, 'utf8');
}

function hasAzureTerms(text) {
  return azureTerms.some((pattern) => pattern.test(text));
}

function looksLikeSvgXml(content) {
  return /<svg[\s>]/i.test(content) && /<\/svg>/i.test(content);
}

function hasReasonableDimensions(content) {
  const viewBox = content.match(/viewBox=["']\s*[-\d.]+\s+[-\d.]+\s+([\d.]+)\s+([\d.]+)\s*["']/i);
  if (viewBox) {
    const width = Number(viewBox[1]);
    const height = Number(viewBox[2]);
    return width >= 640 && height >= 360;
  }

  const width = content.match(/\bwidth=["']([\d.]+)(?:px)?["']/i);
  const height = content.match(/\bheight=["']([\d.]+)(?:px)?["']/i);
  if (!width || !height) return false;
  return Number(width[1]) >= 640 && Number(height[1]) >= 360;
}

function collectSensitiveFindings(content) {
  const findings = [];

  for (const [label, pattern] of sensitivePatterns) {
    const matches = [...content.matchAll(pattern)].map((match) => match[0]);
    const filtered = matches.filter((value) => {
      if (label === 'url or endpoint') {
        return !safeUrlPrefixes.some((prefix) => value.startsWith(prefix));
      }
      if (label === 'ip address') {
        return !value.startsWith('127.') && value !== '0.0.0.0';
      }
      return true;
    });

    if (filtered.length > 0) {
      findings.push(`${label}: ${[...new Set(filtered)].slice(0, 3).join(', ')}`);
    }
  }

  return findings;
}

function drawioSourceForSvg(svgPath, sourceDir) {
  const fileName = svgPath.split('/').pop() || svgPath;
  const sourceBase = fileName.replace(/\.drawio\.svg$/i, '.drawio').replace(/\.svg$/i, '.drawio');
  return join(sourceDir, sourceBase);
}

function hasDrawioSvgMetadata(content) {
  return /<mxfile[\s>]/i.test(content)
    || /\bdata-mxgraph=/i.test(content)
    || /\bcontent=/i.test(content)
    || /draw\.io|diagrams\.net|mxGraphModel/i.test(content);
}

function validateSvg(svgPath, drawioPath) {
  const failures = [];
  const warnings = [];
  const svgContent = read(svgPath);
  const baseName = svgPath.split('/').pop() || svgPath;
  const combinedText = `${baseName}\n${svgContent}`;
  const requiresAzureIcons = strictAll || hasAzureTerms(combinedText);

  if (!/\.drawio\.svg$/i.test(baseName)) {
    failures.push('Final diagram export must use the .drawio.svg suffix, not a plain .svg filename.');
  }

  if (!looksLikeSvgXml(svgContent)) {
    failures.push('SVG does not contain a recognizable <svg> root and closing tag.');
  }

  if (!/<title>[\s\S]*?<\/title>/i.test(svgContent)) {
    failures.push('SVG is missing a literal <title> element.');
  }

  if (!/<desc>[\s\S]*?<\/desc>/i.test(svgContent)) {
    failures.push('SVG is missing a literal <desc> element.');
  }

  if (!hasReasonableDimensions(svgContent)) {
    warnings.push('SVG has no slide-sized viewBox or width/height; verify it is not blank or tiny.');
  }

  if (!hasDrawioSvgMetadata(svgContent)) {
    failures.push('SVG does not expose draw.io editable metadata. Export from draw.io as editable SVG, commonly with "Include a copy of my diagram" enabled.');
  }

  const svgSensitiveFindings = collectSensitiveFindings(svgContent);
  for (const finding of svgSensitiveFindings) {
    failures.push(`Possible sensitive value in SVG: ${finding}`);
  }

  const drawioContent = exists(drawioPath) ? read(drawioPath) : svgContent;
  const drawioSensitiveFindings = collectSensitiveFindings(drawioContent);
  for (const finding of drawioSensitiveFindings) {
    failures.push(`Possible sensitive value in draw.io metadata/source: ${finding}`);
  }

  if (/data:image\/svg\+xml|;base64,|image\/svg\+xml/i.test(drawioContent)) {
    failures.push('draw.io source appears to embed inline/base64 SVG image data. Use img/lib/azure2/ references for Azure icons.');
  }

  if (/labelBackgroundColor/i.test(drawioContent)) {
    warnings.push('draw.io source contains labelBackgroundColor; Azure icon label backgrounds should not be set.');
  }

  if (requiresAzureIcons && !/img\/lib\/azure2\//i.test(drawioContent)) {
    failures.push('Azure-related diagram does not expose img/lib/azure2/ icon references in the draw.io source. Save uncompressed/readable XML or replace icons.');
  }

  if (/img\/lib\/azure2\//i.test(drawioContent) && /imageAspect=0/i.test(drawioContent)) {
    failures.push('Azure icon image cells use imageAspect=0, which can distort icon proportions. Preserve Azure icon aspect ratio with fixed-aspect image sizing.');
  }

  if (/img\/lib\/azure2\//i.test(drawioContent) && !/aspect=fixed/i.test(drawioContent)) {
    warnings.push('Azure icon references were found, but no aspect=fixed style was detected. Verify icon aspect ratios are locked in draw.io.');
  }

  if (exists(drawioPath) && !/<mxfile[\s>]/i.test(drawioContent)) {
    warnings.push('draw.io source does not contain a visible <mxfile> root; verify it is a valid .drawio file.');
  }

  return { failures, warnings, requiresAzureIcons };
}

function validateLessonDirectory(lessonDir) {
  const lessonName = lessonDir.split('/').pop();
  const sourceDir = join(drawioRoot, lessonName);

  if (!isDirectory(lessonDir)) {
    return {
      lessonName,
      files: 0,
      failures: [`Missing diagram directory: ${rel(lessonDir)}`],
      warnings: [],
      details: [],
    };
  }

  const svgFiles = readdirSync(lessonDir)
    .filter((entry) => entry.toLowerCase().endsWith('.svg'))
    .sort()
    .map((entry) => join(lessonDir, entry));

  const summary = { lessonName, files: svgFiles.length, failures: [], warnings: [], details: [] };

  for (const svgPath of svgFiles) {
    const drawioPath = drawioSourceForSvg(svgPath, sourceDir);
    const result = validateSvg(svgPath, drawioPath);

    for (const failure of result.failures) {
      summary.failures.push(`${rel(svgPath)}: ${failure}`);
    }
    for (const warning of result.warnings) {
      summary.warnings.push(`${rel(svgPath)}: ${warning}`);
    }
    summary.details.push({ path: rel(svgPath), requiresAzureIcons: result.requiresAzureIcons });
  }

  if (svgFiles.length === 0) {
    summary.warnings.push(`${rel(lessonDir)}: No SVG files found.`);
  }

  return summary;
}

let lessonDirs = [];
if (scanAll) {
  lessonDirs = listLessonDirectories();
} else if (targets.length > 0) {
  lessonDirs = targets.map(resolveLessonDirectory);
} else {
  console.error(usage());
  process.exit(reportOnly ? 0 : 2);
}

const summaries = lessonDirs.map(validateLessonDirectory);
const failures = summaries.flatMap((summary) => summary.failures);
const warnings = summaries.flatMap((summary) => summary.warnings);
const fileCount = summaries.reduce((total, summary) => total + summary.files, 0);

for (const summary of summaries) {
  console.log(`\n${summary.lessonName}: ${summary.files} SVG file(s)`);
  const azureCount = summary.details.filter((detail) => detail.requiresAzureIcons).length;
  console.log(`  Azure-related diagrams detected: ${azureCount}`);
}

for (const warning of warnings) {
  console.warn(`WARN: ${warning}`);
}

for (const failure of failures) {
  console.error(`FAIL: ${failure}`);
}

console.log(`\nSummary: ${fileCount} SVG file(s), ${warnings.length} warning(s), ${failures.length} failure(s).`);

if (failures.length > 0 && !reportOnly) {
  process.exit(1);
}