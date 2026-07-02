#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

const ROOT = process.cwd();
const BOOK_DIR = path.join(ROOT, 'book');
const ASSET_DIR = path.join(BOOK_DIR, 'assets');

const TARGET_FILES = fs
  .readdirSync(BOOK_DIR)
  .filter((file) => /^\d{2}-.+\.md$/.test(file))
  .map((file) => path.join(BOOK_DIR, file));

const palette = {
  ink: '#2f3142',
  muted: '#6b708c',
  line: '#cf95b6',
  pale: '#fdf1f7',
  pale2: '#fdeff6',
  pale3: '#fff7e8',
  accent: '#e35aa0',
  accent2: '#b83a86',
  danger: '#fdf1f1',
  grid: '#f5d9e8',
};

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function normaliseLabel(value) {
  return String(value)
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/&nbsp;/g, ' ')
    .replace(/\\n/g, '\n')
    .replace(/→/g, '->')
    .replace(/\s+/g, ' ')
    .replace(/\s*\n\s*/g, '\n')
    .trim();
}

function splitLabel(value, maxLen = 30) {
  const rawLines = normaliseLabel(value).split(/\n/);
  const lines = [];
  for (const raw of rawLines) {
    const words = raw.trim().split(/\s+/).filter(Boolean);
    let line = '';
    for (const word of words) {
      const next = line ? `${line} ${word}` : word;
      if (next.length > maxLen && line) {
        lines.push(line);
        line = word;
      } else {
        line = next;
      }
    }
    if (line) lines.push(line);
  }
  return lines.length ? lines : [''];
}

function textBlock(x, y, lines, options = {}) {
  const {
    anchor = 'middle',
    size = 13,
    weight = '400',
    colour = palette.ink,
    lineHeight = 17,
    italic = false,
  } = options;
  const startY = y - ((lines.length - 1) * lineHeight) / 2;
  return lines
    .map((line, index) => {
      const style = italic ? ' font-style="italic"' : '';
      return `<text x="${x}" y="${startY + index * lineHeight}" text-anchor="${anchor}" font-size="${size}" font-weight="${weight}" fill="${colour}"${style}>${escapeXml(line)}</text>`;
    })
    .join('\n');
}

function svgWrap(width, height, body) {
  return `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">
  <defs>
    <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${palette.accent}"/>
      <stop offset="100%" stop-color="${palette.accent2}"/>
    </linearGradient>
    <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="${palette.accent}" flood-opacity="0.14"/>
    </filter>
    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="${palette.line}"/>
    </marker>
  </defs>
  <rect width="${width}" height="${height}" fill="white"/>
${body}
</svg>
`;
}

function box(node) {
  const lines = splitLabel(node.label);
  const isDecision = node.shape === 'decision';
  const isNote = node.shape === 'note';
  const fill = isDecision ? 'white' : isNote ? palette.pale3 : palette.pale;
  const stroke = isDecision ? palette.accent : isNote ? '#d39b3d' : 'none';
  const dash = isDecision ? ' stroke-dasharray="5 4"' : '';
  const rx = isDecision ? Math.min(28, node.h / 2) : 10;
  const icon = !isDecision && !isNote ? `<rect x="${node.x}" y="${node.y}" width="6" height="${node.h}" rx="3" fill="url(#lineGrad)"/>` : '';
  return `<rect x="${node.x}" y="${node.y}" width="${node.w}" height="${node.h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="${stroke === 'none' ? 0 : 2}"${dash} filter="${!isDecision ? 'url(#soft)' : ''}"/>
${icon}
${textBlock(node.x + node.w / 2, node.y + node.h / 2 + 4, lines, { weight: isDecision ? '600' : '400' })}`;
}

function extractNodesAndEdges(block) {
  const lines = block.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const direction = /flowchart\s+LR/.test(lines[0]) ? 'LR' : 'TD';
  const nodes = new Map();
  const edges = [];
  const groups = new Map();
  const groupStack = [];

  const addNode = (id, label, shape = 'box') => {
    if (!id) return;
    const clean = normaliseLabel(label || id);
    const existing = nodes.get(id);
    if (existing) {
      if (existing.label === id && clean !== id) existing.label = clean;
      if (shape !== 'box') existing.shape = shape;
      return;
    }
    const group = groupStack[groupStack.length - 1] || null;
    nodes.set(id, { id, label: clean, shape, group });
    if (group) groups.get(group).nodes.push(id);
  };

  const findInlineNodes = (line) => {
    const patterns = [
      [/([A-Za-z][\w]*)\[\s*"([^"]+)"\s*\]/g, 'box'],
      [/([A-Za-z][\w]*)\{\s*"([^"]+)"\s*\}/g, 'decision'],
      [/([A-Za-z][\w]*)\(\(\s*"([^"]+)"\s*\)\)/g, 'note'],
    ];
    for (const [regex, shape] of patterns) {
      let match;
      while ((match = regex.exec(line))) {
        addNode(match[1], match[2], shape);
      }
    }
  };

  function findFirstArrow(value) {
    const candidates = [
      { match: value.match(/--\s*(?:"([^"]+)"|(.+?))\s*-->/), dotted: false },
      { match: value.match(/-->/), dotted: false },
      { match: value.match(/-\.\s*(.+?)\s*\.->/), dotted: true },
    ].filter((candidate) => candidate.match);
    if (!candidates.length) return null;
    candidates.sort((a, b) => a.match.index - b.match.index);
    const match = candidates[0].match;
    const labelled = match[0] !== '-->';
    return {
      index: match.index,
      end: match.index + match[0].length,
      label: labelled ? normaliseLabel(match[1] || match[2] || '') : '',
    };
  }

  function extractIds(chunk) {
    const cleaned = chunk.replace(/\[[^\]]+\]|\{[^}]+\}|\(\([^)]*\)\)/g, '');
    return cleaned
      .split(/\s*&\s*/)
      .map((part) => (part.match(/([A-Za-z][\w]*)/) || [])[1])
      .filter(Boolean);
  }

  function addEdgesFromLine(line) {
    let remaining = line;
    let currentSources = extractIds(remaining.split(/-->|-\./)[0]);

    while (currentSources.length) {
      const arrow = findFirstArrow(remaining);
      if (!arrow) return;
      const afterArrow = remaining.slice(arrow.end);
      const nextArrow = findFirstArrow(afterArrow);
      const targetChunk = nextArrow ? afterArrow.slice(0, nextArrow.index) : afterArrow;
      const targets = extractIds(targetChunk);
      if (!targets.length) return;
      for (const source of currentSources) {
        addNode(source, source);
        for (const target of targets) {
          addNode(target, target);
          edges.push({ from: source, to: target, label: arrow.label });
        }
      }
      if (!nextArrow) return;
      currentSources = targets.slice(0, 1);
      remaining = `${currentSources[0]} ${afterArrow.slice(nextArrow.index)}`;
    }
  }

  for (const line of lines.slice(1)) {
    if (/^style\s+/i.test(line)) continue;
    const subgraphMatch = line.match(/^subgraph\s+(.+)$/i);
    if (subgraphMatch) {
      const raw = subgraphMatch[1].trim();
      const bracketed = raw.match(/^(\w+)\s*\["?([^"\]]+)"?\]$/);
      const quoted = raw.match(/^"([^"]+)"$/);
      const id = bracketed ? bracketed[1] : `group${groups.size + 1}`;
      const label = normaliseLabel(bracketed ? bracketed[2] : quoted ? quoted[1] : raw);
      groups.set(id, { id, label, nodes: [] });
      groupStack.push(id);
      continue;
    }
    if (/^end$/i.test(line)) {
      groupStack.pop();
      continue;
    }

    findInlineNodes(line);
    addEdgesFromLine(line);
  }

  return { direction, nodes: [...nodes.values()], edges, groups: [...groups.values()].filter((group) => group.nodes.length) };
}

function layoutGraph(graph) {
  if (graph.groups.length >= 2) return layoutGroupedGraph(graph);

  const ids = new Set(graph.nodes.map((node) => node.id));
  const indegree = new Map(graph.nodes.map((node) => [node.id, 0]));
  const adjacency = new Map(graph.nodes.map((node) => [node.id, []]));
  for (const edge of graph.edges) {
    if (!ids.has(edge.from) || !ids.has(edge.to)) continue;
    indegree.set(edge.to, (indegree.get(edge.to) || 0) + 1);
    adjacency.get(edge.from).push(edge.to);
  }

  const level = new Map(graph.nodes.map((node) => [node.id, 0]));
  const queue = graph.nodes.filter((node) => (indegree.get(node.id) || 0) === 0).map((node) => node.id);
  const walk = queue.length ? queue : graph.nodes.slice(0, 1).map((node) => node.id);
  for (let i = 0; i < walk.length; i += 1) {
    const id = walk[i];
    for (const next of adjacency.get(id) || []) {
      const nextLevel = Math.max(level.get(next) || 0, (level.get(id) || 0) + 1);
      if (nextLevel !== level.get(next)) level.set(next, nextLevel);
      walk.push(next);
    }
  }

  const buckets = new Map();
  for (const node of graph.nodes) {
    const bucket = level.get(node.id) || 0;
    if (!buckets.has(bucket)) buckets.set(bucket, []);
    buckets.get(bucket).push(node);
  }

  const maxBucketSize = Math.max(...[...buckets.values()].map((bucket) => bucket.length), 1);
  const maxLevel = Math.max(...[...buckets.keys()], 0);
  const nodeWidth = graph.direction === 'LR' ? 210 : 310;
  const xGap = graph.direction === 'LR' ? 78 : 54;
  const yGap = graph.direction === 'LR' ? 34 : 34;
  const margin = 48;
  const laneGap = graph.direction === 'LR' ? 116 : 118;
  const width = graph.direction === 'LR'
    ? Math.max(680, margin * 2 + (maxLevel + 1) * nodeWidth + maxLevel * xGap)
    : Math.max(720, margin * 2 + maxBucketSize * nodeWidth + (maxBucketSize - 1) * xGap);
  const height = graph.direction === 'LR'
    ? Math.max(360, margin * 2 + maxBucketSize * 72 + (maxBucketSize - 1) * yGap)
    : Math.max(360, margin * 2 + (maxLevel + 1) * 72 + maxLevel * laneGap);

  for (const [bucketIndex, bucket] of buckets) {
    bucket.forEach((node, index) => {
      const labelLines = splitLabel(node.label);
      node.w = nodeWidth;
      node.h = Math.max(54, 30 + labelLines.length * 17);
      if (graph.direction === 'LR') {
        node.x = margin + bucketIndex * (nodeWidth + xGap);
        const total = bucket.reduce((sum, entry) => sum + Math.max(54, 30 + splitLabel(entry.label).length * 17), 0) + (bucket.length - 1) * yGap;
        node.y = (height - total) / 2 + index * (node.h + yGap);
      } else {
        const rowWidth = bucket.length * nodeWidth + (bucket.length - 1) * xGap;
        node.x = (width - rowWidth) / 2 + index * (nodeWidth + xGap);
        node.y = margin + bucketIndex * laneGap;
      }
    });
  }
  return { width, height, nodes: graph.nodes, edges: graph.edges, groups: graph.groups };
}

function layoutGroupedGraph(graph) {
  const groupedIds = new Set(graph.groups.flatMap((group) => group.nodes));
  const ungroupedNodes = graph.nodes.filter((node) => !groupedIds.has(node.id));
  const groups = graph.groups.map((group) => ({ ...group, nodes: group.nodes.slice() }));
  if (ungroupedNodes.length) {
    groups.push({ id: 'process', label: 'Process', nodes: ungroupedNodes.map((node) => node.id) });
  }

  const byId = new Map(graph.nodes.map((node) => [node.id, node]));
  const columns = groups.length <= 3 ? groups.length : 3;
  const cardW = groups.length <= 2 ? 330 : 286;
  const cardGapX = 34;
  const cardGapY = 36;
  const margin = 44;
  const rowHeights = [];

  groups.forEach((group, index) => {
    const row = Math.floor(index / columns);
    const nodes = group.nodes.map((id) => byId.get(id)).filter(Boolean);
    const cardH = 54 + nodes.reduce((sum, node) => sum + Math.max(54, 30 + splitLabel(node.label).length * 17), 0) + Math.max(0, nodes.length - 1) * 18 + 22;
    rowHeights[row] = Math.max(rowHeights[row] || 0, cardH);
  });

  const width = margin * 2 + columns * cardW + (columns - 1) * cardGapX;
  const height = margin * 2 + rowHeights.reduce((sum, value) => sum + value, 0) + Math.max(0, rowHeights.length - 1) * cardGapY;

  groups.forEach((group, index) => {
    const col = index % columns;
    const row = Math.floor(index / columns);
    const x = margin + col * (cardW + cardGapX);
    const y = margin + rowHeights.slice(0, row).reduce((sum, value) => sum + value, 0) + row * cardGapY;
    group.x = x;
    group.y = y;
    group.w = cardW;
    group.h = rowHeights[row];

    let cursorY = y + 50;
    for (const id of group.nodes) {
      const node = byId.get(id);
      if (!node) continue;
      node.w = cardW - 38;
      node.h = Math.max(54, 30 + splitLabel(node.label).length * 17);
      node.x = x + 19;
      node.y = cursorY;
      cursorY += node.h + 18;
    }
  });

  return { width, height, nodes: graph.nodes, edges: graph.edges, groups };
}

function elbowH(x1, y1, x2, y2) {
  if (y1 === y2) return `M${x1},${y1} L${x2},${y2}`;
  const midX = (x1 + x2) / 2;
  return `M${x1},${y1} H${midX} V${y2} H${x2}`;
}

function elbowV(x1, y1, x2, y2) {
  if (x1 === x2) return `M${x1},${y1} L${x2},${y2}`;
  const midY = (y1 + y2) / 2;
  return `M${x1},${y1} V${midY} H${x2} V${y2}`;
}

function connectorPath(from, to) {
  const dx = to.x + to.w / 2 - (from.x + from.w / 2);
  const dy = to.y + to.h / 2 - (from.y + from.h / 2);
  const horizontalDominant = Math.abs(dx) >= Math.abs(dy);

  let startX;
  let startY;
  let endX;
  let endY;

  if (horizontalDominant) {
    const leftToRight = dx >= 0;
    startX = leftToRight ? from.x + from.w : from.x;
    startY = from.y + from.h / 2;
    endX = leftToRight ? to.x : to.x + to.w;
    endY = to.y + to.h / 2;
  } else {
    const topToBottom = dy >= 0;
    startX = from.x + from.w / 2;
    startY = topToBottom ? from.y + from.h : from.y;
    endX = to.x + to.w / 2;
    endY = topToBottom ? to.y : to.y + to.h;
  }

  const path = horizontalDominant ? elbowH(startX, startY, endX, endY) : elbowV(startX, startY, endX, endY);
  return { path, midX: (startX + endX) / 2, midY: (startY + endY) / 2 };
}

function graphSvg(block) {
  const graph = layoutGraph(extractNodesAndEdges(block));
  const byId = new Map(graph.nodes.map((node) => [node.id, node]));
  const groupParts = graph.groups.map((group) => {
    if (Number.isFinite(group.x)) {
      return `<rect x="${group.x}" y="${group.y}" width="${group.w}" height="${group.h}" rx="12" fill="${palette.pale2}" stroke="${palette.grid}" stroke-width="1.5"/>
${textBlock(group.x + 14, group.y + 22, [group.label], { anchor: 'start', size: 12, weight: '700', colour: palette.accent })}`;
    }
    const members = group.nodes.map((id) => byId.get(id)).filter(Boolean);
    if (!members.length) return '';
    const minX = Math.min(...members.map((node) => node.x)) - 18;
    const minY = Math.min(...members.map((node) => node.y)) - 36;
    const maxX = Math.max(...members.map((node) => node.x + node.w)) + 18;
    const maxY = Math.max(...members.map((node) => node.y + node.h)) + 18;
    return `<rect x="${minX}" y="${minY}" width="${maxX - minX}" height="${maxY - minY}" rx="12" fill="${palette.pale2}" stroke="${palette.grid}" stroke-width="1.5"/>
${textBlock(minX + 14, minY + 20, [group.label], { anchor: 'start', size: 12, weight: '700', colour: palette.accent })}`;
  });

  const edgeParts = graph.edges.map((edge) => {
    const from = byId.get(edge.from);
    const to = byId.get(edge.to);
    if (!from || !to) return '';
    const { path, midX, midY } = connectorPath(from, to);
    const label = edge.label
      ? textBlock(midX, midY - 8, splitLabel(edge.label), { size: 11, colour: palette.accent, italic: true })
      : '';
    return `<path d="${path}" stroke="${palette.line}" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
${label}`;
  });

  const nodeParts = graph.nodes.map(box);
  return svgWrap(graph.width, graph.height, [...groupParts, ...edgeParts, ...nodeParts].join('\n'));
}

function sequenceSvg(block) {
  const lines = block.split(/\r?\n/).map((line) => line.trim()).filter(Boolean).slice(1);
  const participants = [];
  const events = [];
  for (const line of lines) {
    const participant = line.match(/^participant\s+(\w+)\s+as\s+(.+)$/);
    if (participant) {
      participants.push({ id: participant[1], label: normaliseLabel(participant[2]) });
      continue;
    }
    const message = line.match(/^(\w+)\s*([-]+>>|-->>)\s*(\w+):\s*(.+)$/);
    if (message) {
      events.push({ type: 'message', from: message[1], to: message[3], label: normaliseLabel(message[4]), dashed: message[2].startsWith('--') });
      continue;
    }
    const note = line.match(/^Note over\s+(\w+):\s*(.+)$/);
    if (note) {
      events.push({ type: 'note', over: note[1], label: normaliseLabel(note[2]) });
      continue;
    }
    const alt = line.match(/^(alt|else)\s*(.*)$/);
    if (alt) {
      events.push({ type: alt[1], label: normaliseLabel(alt[2] || alt[1]) });
      continue;
    }
    if (/^end$/.test(line)) events.push({ type: 'end' });
  }

  // Wrap header labels, then size the header box to the widest resulting line
  // (including single long words like "WebsiteOutputCachePolicy" that cannot
  // wrap), and widen the lane gap to match so headers never overlap or clip.
  const headerLines = participants.map((participant) => splitLabel(participant.label, 16));
  const charWidth = 6.9; // approx px per char at 12px, 600 weight
  const widestLine = Math.max(...headerLines.flat().map((line) => line.length * charWidth));
  const headerBoxWidth = Math.min(240, Math.max(120, Math.round(widestLine) + 30));
  const laneGap = headerBoxWidth + 34;
  const margin = headerBoxWidth / 2 + 10;
  const width = Math.max(620, margin * 2 + (participants.length - 1) * laneGap);
  const positions = new Map(participants.map((participant, index) => [participant.id, margin + index * laneGap]));

  const headerHeight = Math.max(44, 26 + Math.max(...headerLines.map((lines) => lines.length)) * 17);
  const lifelineTop = 34 + headerHeight;

  // Lay events out with a running cursor. Each event reserves the vertical
  // space its own label or box needs above and below its anchor line, so
  // multi-line labels and note boxes never collide with their neighbours.
  const eventParts = [];
  let y = lifelineTop + 20;
  for (const event of events) {
    if (event.type === 'message') {
      const x1 = positions.get(event.from);
      const x2 = positions.get(event.to);
      if (x1 == null || x2 == null) continue;
      const lines = splitLabel(event.label, 22);
      y += 16 + (lines.length - 1) * 15; // clearance for the label above the arrow
      if (x1 === x2) {
        // self-message: a small loop back onto the same lifeline, opening
        // toward the diagram centre so the label never runs off the edge
        const rightSide = x1 > width / 2;
        const loop = rightSide ? `M${x1},${y} h-34 v16 h34` : `M${x1},${y} h34 v16 h-34`;
        eventParts.push(`<path d="${loop}" stroke="${palette.line}" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
${textBlock(rightSide ? x1 - 44 : x1 + 44, y + 4, lines, { anchor: rightSide ? 'end' : 'start', size: 11, colour: palette.ink, lineHeight: 14 })}`);
        y += 24 + (lines.length - 1) * 14;
      } else {
        const dash = event.dashed ? ' stroke-dasharray="5 5"' : '';
        eventParts.push(`<path d="M${x1},${y} H${x2}" stroke="${palette.line}" stroke-width="2"${dash} fill="none" marker-end="url(#arrow)"/>
${textBlock((x1 + x2) / 2, y - 10 - (lines.length - 1) * 7, lines, { size: 11, colour: palette.ink, lineHeight: 14 })}`);
        y += 18;
      }
      continue;
    }
    if (event.type === 'note') {
      const x = positions.get(event.over) ?? width / 2;
      const lines = splitLabel(event.label, 26);
      const noteHeight = Math.max(40, 20 + lines.length * 16);
      y += noteHeight / 2 + 12;
      eventParts.push(`<rect x="${x - 104}" y="${y - noteHeight / 2}" width="208" height="${noteHeight}" rx="9" fill="${palette.pale3}" stroke="#e2b568"/>
${textBlock(x, y + 4, lines, { size: 11, colour: palette.ink, lineHeight: 15 })}`);
      y += noteHeight / 2 + 14;
      continue;
    }
    if (event.type === 'alt' || event.type === 'else') {
      y += 14;
      eventParts.push(`<rect x="${margin - 22}" y="${y - 19}" width="${width - margin * 2 + 44}" height="34" rx="8" fill="white" stroke="${palette.grid}"/>
<text x="${margin - 8}" y="${y + 2}" font-size="11" font-weight="700" fill="${palette.accent}">${escapeXml(event.type.toUpperCase())}</text>
${textBlock(width / 2, y + 2, splitLabel(event.label), { size: 11, colour: palette.muted })}`);
      y += 30;
      continue;
    }
    if (event.type === 'end') {
      y += 14;
    }
  }
  const height = y + 20;

  const header = participants.map((participant, index) => {
    const x = positions.get(participant.id);
    return `<rect x="${x - headerBoxWidth / 2}" y="34" width="${headerBoxWidth}" height="${headerHeight}" rx="10" fill="${palette.pale}" filter="url(#soft)"/>
${textBlock(x, 34 + headerHeight / 2 + 4, headerLines[index], { size: 12, weight: '600' })}
<path d="M${x},${lifelineTop} V${height - 20}" stroke="${palette.grid}" stroke-width="2" stroke-dasharray="6 6"/>`;
  });

  return svgWrap(width, height, [...header, ...eventParts].join('\n'));
}

function xySvg(block) {
  const title = (block.match(/title\s+"([^"]+)"/) || [])[1] || 'Chart';
  const labels = ((block.match(/x-axis\s+\[([^\]]+)\]/) || [])[1] || '')
    .split(',')
    .map((value) => value.replace(/"/g, '').trim())
    .filter(Boolean);
  const bars = ((block.match(/bar\s+\[([^\]]+)\]/) || [])[1] || '')
    .split(',')
    .map((value) => Number(value.trim()))
    .filter((value) => Number.isFinite(value));
  const width = 760;
  const height = 430;
  const chartX = 78;
  const chartY = 86;
  const chartW = 620;
  const chartH = 250;
  const max = Math.max(1, ...bars);
  const barW = chartW / Math.max(bars.length, 1) * 0.58;
  const parts = [
    textBlock(width / 2, 42, [title], { size: 18, weight: '700' }),
    `<path d="M${chartX},${chartY} V${chartY + chartH} H${chartX + chartW}" stroke="${palette.line}" stroke-width="2" fill="none"/>`,
  ];
  for (let i = 0; i <= 4; i += 1) {
    const y = chartY + chartH - (chartH * i) / 4;
    parts.push(`<path d="M${chartX},${y} H${chartX + chartW}" stroke="${palette.grid}" stroke-width="1"/>`);
  }
  bars.forEach((value, index) => {
    const slot = chartW / bars.length;
    const h = (value / max) * chartH;
    const x = chartX + index * slot + (slot - barW) / 2;
    const y = chartY + chartH - h;
    parts.push(`<rect x="${x}" y="${y}" width="${barW}" height="${h}" rx="8" fill="url(#lineGrad)" filter="url(#soft)"/>`);
    parts.push(textBlock(x + barW / 2, y - 12, [`${value}`], { size: 12, weight: '700', colour: palette.accent }));
    parts.push(textBlock(x + barW / 2, chartY + chartH + 35, splitLabel(labels[index] || ''), { size: 11, colour: palette.muted, lineHeight: 14 }));
  });
  return svgWrap(width, height, parts.join('\n'));
}

function quadrantSvg(block) {
  const title = (block.match(/title\s+"([^"]+)"/) || [])[1] || 'Quadrant chart';
  const xAxis = (block.match(/x-axis\s+"([^"]+)"\s+-->\s+"([^"]+)"/) || []).slice(1);
  const yAxis = (block.match(/y-axis\s+"([^"]+)"\s+-->\s+"([^"]+)"/) || []).slice(1);
  const itemRegex = /"([^"]+)":\s*\[([0-9.]+),\s*([0-9.]+)\]/g;
  const items = [];
  let match;
  while ((match = itemRegex.exec(block))) {
    items.push({ label: match[1], x: Number(match[2]), y: Number(match[3]) });
  }
  const width = 740;
  const height = 520;
  const x = 118;
  const y = 92;
  const size = 340;
  const parts = [
    textBlock(width / 2, 42, [title], { size: 18, weight: '700' }),
    `<rect x="${x}" y="${y}" width="${size}" height="${size}" rx="12" fill="${palette.pale}" stroke="${palette.grid}"/>`,
    `<path d="M${x + size / 2},${y} V${y + size}" stroke="white" stroke-width="3"/>`,
    `<path d="M${x},${y + size / 2} H${x + size}" stroke="white" stroke-width="3"/>`,
    textBlock(x + size / 2, y + size + 46, [xAxis[0] || 'Lower'], { size: 12, colour: palette.muted }),
    textBlock(x + size + 100, y + size + 46, [xAxis[1] || 'Higher'], { size: 12, colour: palette.muted }),
    textBlock(x - 44, y + size / 2, [yAxis[0] || 'Lower'], { size: 12, colour: palette.muted }),
    textBlock(x + size + 72, y + 22, [yAxis[1] || 'Higher'], { size: 12, colour: palette.muted }),
  ];
  items.forEach((item, index) => {
    const px = x + item.x * size;
    const py = y + size - item.y * size;
    parts.push(`<circle cx="${px}" cy="${py}" r="7" fill="url(#lineGrad)" filter="url(#soft)"/>`);
    parts.push(textBlock(px + 12, py - 12 - (index % 2) * 10, splitLabel(item.label), { anchor: 'start', size: 11, colour: palette.ink, lineHeight: 13 }));
  });
  return svgWrap(width, height, parts.join('\n'));
}

function mindmapSvg(block) {
  const lines = block.split(/\r?\n/).filter((line) => line.trim() && !/^mindmap/.test(line.trim()));
  const root = normaliseLabel((lines.find((line) => line.includes('root')) || 'root((Cache Settings))').replace(/.*\(\((.+)\)\).*/, '$1'));
  const branches = [];
  let current = null;
  for (const raw of lines) {
    const indent = raw.match(/^\s*/)[0].length;
    const label = normaliseLabel(raw.trim());
    if (label.startsWith('root')) continue;
    if (indent <= 4) {
      current = { label, children: [] };
      branches.push(current);
    } else if (current) {
      current.children.push(label);
    }
  }
  const width = 820;
  const height = Math.max(430, 120 + branches.length * 68);
  const centreX = 180;
  const centreY = height / 2;
  const parts = [
    `<ellipse cx="${centreX}" cy="${centreY}" rx="96" ry="46" fill="url(#lineGrad)" filter="url(#soft)"/>`,
    textBlock(centreX, centreY + 4, splitLabel(root), { size: 14, weight: '700', colour: 'white' }),
  ];
  branches.forEach((branch, index) => {
    const y = 70 + index * ((height - 140) / Math.max(branches.length - 1, 1));
    const x = 390;
    parts.push(`<path d="${elbowH(centreX + 96, centreY, x - 6, y)}" stroke="${palette.line}" stroke-width="2" fill="none" marker-end="url(#arrow)"/>`);
    parts.push(`<rect x="${x}" y="${y - 28}" width="168" height="56" rx="10" fill="${palette.pale}" filter="url(#soft)"/>`);
    parts.push(textBlock(x + 84, y + 4, splitLabel(branch.label), { weight: '700', size: 13 }));
    branch.children.forEach((child, childIndex) => {
      const childX = 610;
      const childY = y - (branch.children.length - 1) * 18 + childIndex * 36;
      parts.push(`<path d="${elbowH(x + 168, y, childX, childY)}" stroke="${palette.line}" stroke-width="1.6" fill="none" marker-end="url(#arrow)"/>`);
      parts.push(`<rect x="${childX}" y="${childY - 17}" width="160" height="34" rx="8" fill="white" stroke="${palette.grid}"/>`);
      parts.push(textBlock(childX + 80, childY + 4, splitLabel(child), { size: 11, colour: palette.muted, lineHeight: 13 }));
    });
  });
  return svgWrap(width, height, parts.join('\n'));
}

function render(block) {
  const trimmed = block.trim();
  if (trimmed.startsWith('sequenceDiagram')) return sequenceSvg(trimmed);
  if (trimmed.startsWith('xychart-beta')) return xySvg(trimmed);
  if (trimmed.startsWith('quadrantChart')) return quadrantSvg(trimmed);
  if (trimmed.startsWith('mindmap')) return mindmapSvg(trimmed);
  if (trimmed.startsWith('flowchart')) return graphSvg(trimmed);
  throw new Error(`Unsupported diagram type: ${trimmed.split(/\s+/)[0]}`);
}

function slugFromFile(file) {
  return path.basename(file, '.md').replace(/^\d+-/, '').replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
}

function altFromBlock(block) {
  const first = block
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find((line) => /"\S/.test(line));
  const text = first ? first.replace(/^[A-Za-z][\w]*[\[\{(]+\s*"/, '').replace(/".*$/, '') : 'Hand-made diagram';
  return `${normaliseLabel(text)} diagram`;
}

fs.mkdirSync(ASSET_DIR, { recursive: true });

if (process.argv.includes('--from-diff')) {
  const diff = childProcess.execFileSync('git', ['diff', '--', 'book/*.md'], { cwd: ROOT, encoding: 'utf8' });
  const blocksByFile = new Map();
  let currentFile = null;
  let collecting = false;
  let block = [];

  for (const line of diff.split(/\r?\n/)) {
    const fileMatch = line.match(/^\+\+\+ b\/(.+)$/);
    if (fileMatch) {
      currentFile = fileMatch[1];
      collecting = false;
      block = [];
      continue;
    }
    if (!currentFile || !line.startsWith('-')) continue;
    const removed = line.slice(1);
    if (removed === '```mermaid') {
      collecting = true;
      block = [];
      continue;
    }
    if (collecting && removed === '```') {
      if (!blocksByFile.has(currentFile)) blocksByFile.set(currentFile, []);
      blocksByFile.get(currentFile).push(block.join('\n'));
      collecting = false;
      block = [];
      continue;
    }
    if (collecting) block.push(removed);
  }

  let total = 0;
  for (const [relativeFile, blocks] of blocksByFile) {
    const slug = slugFromFile(relativeFile);
    blocks.forEach((blockSource, index) => {
      const assetName = `diagram-${slug}-${String(index + 1).padStart(2, '0')}.svg`;
      fs.writeFileSync(path.join(ASSET_DIR, assetName), render(blockSource), 'utf8');
      total += 1;
    });
    console.log(`${relativeFile}: regenerated ${blocks.length} diagrams`);
  }
  console.log(`Regenerated ${total} hand-made SVG diagrams from git diff.`);
  process.exit(0);
}

let total = 0;
for (const file of TARGET_FILES) {
  let content = fs.readFileSync(file, 'utf8');
  let index = 0;
  const slug = slugFromFile(file);
  content = content.replace(/```mermaid\n([\s\S]*?)\n```/g, (match, block) => {
    index += 1;
    total += 1;
    const assetName = `diagram-${slug}-${String(index).padStart(2, '0')}.svg`;
    const assetPath = path.join(ASSET_DIR, assetName);
    fs.writeFileSync(assetPath, render(block), 'utf8');
    return `![${altFromBlock(block)}](./assets/${assetName})`;
  });
  if (index > 0) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`${path.relative(ROOT, file)}: ${index} diagrams`);
  }
}

console.log(`Generated ${total} hand-made SVG diagrams.`);
