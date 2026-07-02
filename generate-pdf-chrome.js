#!/usr/bin/env node
//
// Builds the book PDF using only Node built-ins (fs, path, child_process) and
// the system-installed Google Chrome. No npm packages, no node_modules.
//
// markdown-it and mermaid run as vendored plain browser bundles
// (vendor/markdown-it.min.js, vendor/mermaid.min.js) executed by Chrome
// itself inside the generated HTML page — Chrome is the only JS engine
// involved, the same way it would be if you opened the file and hit
// Cmd+P > Save as PDF.

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const rootDir = __dirname;
const bookDir = path.join(rootDir, 'book');
const vendorDir = path.join(rootDir, 'vendor');
const cssPath = path.join(bookDir, 'pdf-export.css');
const outputHtmlPath = path.join(bookDir, 'temp-for-pdf.html');
const outputPdfPath = path.join(bookDir, 'umbraco-cache-for-intelligent-dummies.pdf');

function printUsage() {
  console.log(`Usage: node generate-pdf-chrome.js [--check-chrome]

Options:
  --check-chrome  Resolve Chrome, print its version, then exit.`);
}

function resolveChromePath() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;

  if (process.platform === 'darwin') {
    return '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  }

  if (process.platform === 'win32') {
    const candidates = [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    ];
    const found = candidates.find(p => fs.existsSync(p));
    if (found) return found;
    throw new Error('Could not find Chrome on Windows. Set the CHROME_PATH env var.');
  }

  // Linux (e.g. GitHub Actions ubuntu-latest runners ship google-chrome-stable).
  const candidates = ['google-chrome-stable', 'google-chrome', 'chromium-browser', 'chromium'];
  for (const bin of candidates) {
    try {
      execFileSync('which', [bin], { stdio: 'ignore' });
      return bin;
    } catch {
      // try the next candidate
    }
  }
  throw new Error(
    `Could not find a Chrome/Chromium binary (tried: ${candidates.join(', ')}). Set the CHROME_PATH env var.`
  );
}

const CHROME_PATH = resolveChromePath();

function getChromeArgs() {
  const args = [
    '--headless',
    '--disable-gpu',
    '--no-pdf-header-footer',
    '--run-all-compositor-stages-before-draw',
    '--virtual-time-budget=20000',
    `--print-to-pdf=${outputPdfPath}`,
    `file://${outputHtmlPath}`,
  ];

  if (process.env.CI) {
    args.unshift('--disable-dev-shm-usage', '--no-sandbox');
  }

  return args;
}

function checkChrome() {
  console.log(`Chrome path: ${CHROME_PATH}`);
  execFileSync(CHROME_PATH, ['--version'], { stdio: 'inherit' });
}

const chapters = [
  '00-cover.md',
  '00b-how-to-find-things.md',
  '01-the-big-picture.md',
  '02-the-published-object.md',
  '03-website-output-caching.md',
  '04-the-content-delivery-api.md',
  '04b-edge-cache-in-front-of-the-cda.md',
  '05-published-cache-and-load-balancing.md',
  '06-hybrid-cache-engine.md',
  '07-nucache-vs-hybrid-cache.md',
  '08-cache-busting-and-invalidation.md',
  '09-hq-extensions-and-cache.md',
  '10-cache-settings-talks-and-field-notes.md',
  '11-small-local-cache-example-with-tags.md',
  '12-storage-providers-and-media-caching.md',
  '13-examine-indexes-and-cache-adjacent-querying.md',
  '14-lessons-from-the-issue-tracker.md',
  '15-reading-the-cache-code.md',
  '16-appendix-sources.md',
  '17-appendix-umbfyi-archive-notes.md',
];

function main() {
  console.log('Reading chapters...');
  const [coverChapter, ...bodyChapters] = chapters;
  const coverMarkdown = fs.readFileSync(path.join(bookDir, coverChapter), 'utf-8');
  const bodyMarkdown = bodyChapters
    .map(chapter => fs.readFileSync(path.join(bookDir, chapter), 'utf-8'))
    .join('\n\n');

  const markdownItSrc = fs.readFileSync(path.join(vendorDir, 'markdown-it.min.js'), 'utf-8');
  const mermaidSrc = fs.readFileSync(path.join(vendorDir, 'mermaid.min.js'), 'utf-8');
  const cssContent = fs.readFileSync(cssPath, 'utf-8');

  // Markdown is embedded as base64 so no escaping is needed for quotes,
  // backticks, or template-literal syntax that appears in the book text.
  const coverB64 = Buffer.from(coverMarkdown, 'utf-8').toString('base64');
  const bodyB64 = Buffer.from(bodyMarkdown, 'utf-8').toString('base64');

  const html = buildHtml({ markdownItSrc, mermaidSrc, cssContent, coverB64, bodyB64 });
  fs.writeFileSync(outputHtmlPath, html);
  console.log('✓ HTML built (markdown + mermaid render live in Chrome on load)');

  console.log('Rendering PDF with Chrome headless...');
  execFileSync(CHROME_PATH, getChromeArgs(), { stdio: 'inherit' });

  if (fs.existsSync(outputPdfPath)) {
    const stats = fs.statSync(outputPdfPath);
    console.log('✓ PDF generated successfully!');
    console.log(`  Location: ${outputPdfPath}`);
    console.log(`  File size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
    fs.unlinkSync(outputHtmlPath);
    console.log('✓ Temporary files cleaned up');
  } else {
    console.error('✗ PDF was not created');
    process.exit(1);
  }
}

function buildHtml({ markdownItSrc, mermaidSrc, cssContent, coverB64, bodyB64 }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Umbraco Cache for Intelligent Dummies</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  line-height: 1.7;
  color: #333;
  background: white;
}

@page { size: A4; margin: 2cm; }
@page :first { margin: 0; }

img { max-width: 100%; height: auto; display: block; margin: 1.5rem auto; }

pre, code {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Courier New', monospace;
  font-size: 0.9em;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 3px;
}
code { padding: 2px 6px; }
pre { padding: 12px; overflow-x: auto; margin: 1rem 0; }
pre code { background: none; border: none; padding: 0; }

a { color: #0066cc; text-decoration: none; }
a:hover { text-decoration: underline; }

h1, h2, h3, h4, h5, h6 {
  margin-top: 2.4em;
  margin-bottom: 0.75em;
  font-weight: 600;
  line-height: 1.3;
}

/* Keep a heading glued to the start of what follows it, so a page
   break never strands a heading above just one orphaned line/item. */
h2 + p, h2 + ul, h2 + ol, h2 + blockquote,
h3 + p, h3 + ul, h3 + ol, h3 + blockquote,
h4 + p, h4 + ul, h4 + ol, h4 + blockquote,
h2 + p + ul, h2 + p + ol,
h3 + p + ul, h3 + p + ol,
h4 + p + ul, h4 + p + ol {
  page-break-inside: avoid;
  break-inside: avoid;
}

p, li { orphans: 3; widows: 3; }

h1 {
  font-size: 2.2em;
  border-bottom: 3px solid #0066cc;
  padding-bottom: 0.4em;
  margin-top: 0;
  page-break-after: avoid;
  page-break-before: always;
}

.cover-page {
  page-break-after: always;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
}
.cover-page img {
  width: 100%;
  height: 100vh;
  max-width: none;
  object-fit: cover;
  margin: 0;
  display: block;
}

h2 { font-size: 1.8em; border-bottom: 2px solid #0066cc; padding-bottom: 0.3em; page-break-after: avoid; }
h3 { font-size: 1.4em; page-break-after: avoid; }
h4, h5, h6 { font-size: 1.1em; page-break-after: avoid; }

p { margin-bottom: 1em; }
ul, ol { margin: 1em 0; padding-left: 2em; }
li { margin-bottom: 0.5em; }

blockquote {
  border-left: 4px solid #ddd;
  padding-left: 1.5em;
  color: #666;
  font-style: italic;
}

table { border-collapse: collapse; width: 100%; margin: 1.5em 0; }
table th, table td { border: 1px solid #ddd; padding: 0.75em; text-align: left; }
table th { background-color: #f9f9f9; font-weight: bold; }
table tr:nth-child(even) { background-color: #f9f9f9; }

.mermaid { display: flex; justify-content: center; margin: 2rem auto; background: white; }
.mermaid svg { max-width: 100%; height: auto; }

.pdf-keep-together {
  break-inside: avoid;
  page-break-inside: avoid;
  -webkit-column-break-inside: avoid;
  margin: 1rem 0;
}

${cssContent}
</style>
</head>
<body>
<div id="cover"></div>
<div id="content"></div>

<script>${markdownItSrc}</script>
<script>${mermaidSrc}</script>
<script>
  function decodeBase64Utf8(b64) {
    const bytes = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
    return new TextDecoder('utf-8').decode(bytes);
  }

  const coverMarkdown = decodeBase64Utf8("${coverB64}");
  const bodyMarkdown = decodeBase64Utf8("${bodyB64}");

  const md = window.markdownit({ html: true, linkify: true, typographer: true, breaks: true });

  // Route \`\`\`mermaid fenced blocks to mermaid's own class convention so
  // mermaid.run() picks them up and renders them to inline SVG.
  const defaultFence = md.renderer.rules.fence || function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };
  md.renderer.rules.fence = function (tokens, idx, options, env, self) {
    const token = tokens[idx];
    if (token.info.trim() === 'mermaid') {
      return '<pre class="mermaid">' + md.utils.escapeHtml(token.content) + '</pre>';
    }
    return defaultFence(tokens, idx, options, env, self);
  };

  document.getElementById('cover').innerHTML =
    '<div class="cover-page">' + md.render(coverMarkdown) + '</div>';
  document.getElementById('content').innerHTML = md.render(bodyMarkdown);

  mermaid.initialize({ startOnLoad: false, theme: 'default', securityLevel: 'loose' });

  window.__renderComplete = false;
  window.__renderError = null;

  mermaid.run()
    .catch(error => {
      window.__renderError = error && error.message ? error.message : String(error);
      const warning = document.createElement('pre');
      warning.style.whiteSpace = 'pre-wrap';
      warning.style.color = '#b00020';
      warning.textContent = 'Mermaid render error: ' + window.__renderError;
      document.body.prepend(warning);
    })
    .finally(() => {
      document.documentElement.setAttribute('data-render-complete', 'true');
      window.__renderComplete = true;
    });
</script>
</body>
</html>`;
}

const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  printUsage();
} else if (args.includes('--check-chrome')) {
  checkChrome();
} else if (args.length > 0) {
  console.error(`Unknown argument: ${args[0]}`);
  printUsage();
  process.exit(1);
} else {
  main();
}
