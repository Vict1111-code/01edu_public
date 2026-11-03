#!/usr/bin/env node
/**
 * Independent public 01Edu subject-reference extractor.
 * Usage: node research/galaxy-audit/scripts/extract-subject-links.mjs [repo-root] [out-dir]
 * No external dependencies. Requires Node 18+.
 * This is NOT an official Galaxy dependency/unlock engine.
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs';
import { join, resolve, dirname, relative, posix, sep } from 'node:path';
import { pathToFileURL } from 'node:url';

const SUBJECT_PATH = 'subjects';
const README = 'README.md';
const AUDIT = 'audit/README.md';

export function listSubjectReadmes(root) {
  const base = join(root, SUBJECT_PATH), out = [];
  if (!existsSync(base)) throw new Error('Missing subjects/ at ' + base);
  function walk(directory) {
    for (const item of readdirSync(directory, { withFileTypes: true })) {
      if (item.isSymbolicLink()) continue;
      const target = join(directory, item.name);
      if (item.isDirectory()) walk(target);
      else if (item.isFile() && item.name.toLowerCase() === 'readme.md') {
        const rel = relative(base, target).split(sep).join('/');
        if (rel !== README && !rel.endsWith('/' + AUDIT)) out.push({ path: rel, abs: target });
      }
    }
  }
  walk(base);
  return out.sort((a, b) => a.path.localeCompare(b.path));
}

export function extractMarkdownLinks(content) {
  const links = [];
  // Supports ordinary Markdown inline links, not reference-style definitions or nested parentheses.
  const pattern = /\[([^\]\n]+)\]\(\s*<?([^)\s>]+)>?(?:\s+["'][^"']*["'])?\s*\)/g;
  for (const m of content.matchAll(pattern)) {
    const start = m.index, before = content.slice(Math.max(0, start - 180), start);
    const after = content.slice(start + m[0].length, start + m[0].length + 140);
    links.push({ label: m[1], href: m[2], context: (before + m[0] + after).replace(/\s+/g, ' ').trim().slice(0, 450), offset: start });
  }
  return links;
}

export function parseSubjectHref(sourcePath, href) {
  let raw = href.trim().replace(/^<|>$/g, '');
  if (!raw || raw.startsWith('#') || /^(mailto:|data:|javascript:)/i.test(raw)) return null;
  // Only resolve links that appear in the same subjects tree; remote links handled separately.
  if (/^https?:\/\//i.test(raw)) {
    const m = raw.match(/^https?:\/\/(?:public\.01-edu\.org\/subjects|(?:www\.)?github\.com\/01-edu\/public\/(?:blob|tree)\/[^/]+\/subjects)\/(.+)$/i);
    if (!m) return null;
    raw = m[1].replace(/[?#].*$/, '');
    try { raw = decodeURIComponent(raw); } catch { return null; }
    return posix.normalize(raw.replace(/\/README\.md$/i, '').replace(/\/$/, ''));
  }
  if (/^[a-z][\w+.-]*:/i.test(raw) || raw.startsWith('//')) return null;
  raw = raw.split(/[?#]/)[0];
  try { raw = decodeURIComponent(raw); } catch { return null; }
  const dir = posix.dirname(sourcePath);
  const normalized = posix.normalize(posix.join(dir, raw));
  if (normalized === '.' || normalized === '..' || normalized.startsWith('../')) return null;
  return normalized.replace(/\/README\.md$/i, '').replace(/\/$/, '');
}

export function inferRelationship({ sourceId, targetId, label, context }) {
  const s = (context || '').toLowerCase();
  if (targetId === sourceId || sourceId.startsWith(targetId + '/')) {
    if (/\b(same (principles|instructions)|first subject|base subject|parent|follow the same)\b/i.test(s))
      return { type: 'extension_of_parent', confidence: 'high', is_official_unlock: false };
    return { type: 'parent_reference', confidence: 'medium', is_official_unlock: false };
  }
  if (/\b(previous (project|forum|exercise|subject)|last project|based on the|built (on|upon)|version of your last|already (built|made|created))\b/i.test(s))
    return { type: 'prior_project_reference', confidence: 'medium', is_official_unlock: false };
  if (/\b(read about|documentation|good practices|docs|basics|references|learn about|notions)\b/i.test(s) || /\b(good-practices|coding-standards)\b/.test(targetId))
    return { type: 'learning_resource', confidence: 'medium', is_official_unlock: false };
  return { type: 'link_reference', confidence: 'low', is_official_unlock: false };
}

export function analyzeSubjects(root) {
  const subjects = listSubjectReadmes(root);
  const index = new Map(subjects.map(x => [x.path.slice(0, -('/' + README).length), x]));
  const edges = [], externalLinks = [], unresolvedLocal = [], nodes = [];
  for (const subject of subjects) {
    const id = subject.path.slice(0, -('/' + README).length);
    const body = readFileSync(subject.abs, 'utf8'), links = extractMarkdownLinks(body);
    const auditFile = join(root, SUBJECT_PATH, ...id.split('/'), 'audit', 'README.md');
    const altAuditFile = join(root, SUBJECT_PATH, ...id.split('/'), 'audit.md');
    const headings = [...body.matchAll(/^#{1,4}\s+(.+)$/gm)].map(x => x[1].trim());
    const node = { id, source: 'subjects/' + subject.path, has_audit_readme: existsSync(auditFile), has_audit_md: existsSync(altAuditFile), headings, markdown_link_count: links.length };
    nodes.push(node);
    for (const link of links) {
      const target = parseSubjectHref(subject.path, link.href);
      if (target && index.has(target)) {
        const relation = inferRelationship({ sourceId: id, targetId: target, ...link });
        edges.push({ from: target, to: id, source_node: id, target_node: target, source_file: node.source, href: link.href, label: link.label, context: link.context, ...relation });
      } else if (/^https?:\/\//i.test(link.href)) {
        externalLinks.push({ source: id, href: link.href, label: link.label });
      } else if (target) {
        unresolvedLocal.push({ source: id, candidate: target, href: link.href });
      }
    }
  }
  return {
    metadata: {
      schema_version: '1.0', method: 'static Markdown source scan; relationships require human verification',
      classification: 'Links do NOT establish official unlock gates; context labels are heuristic.',
      subject_count: nodes.length, internal_edges: edges.length, external_links: externalLinks.length,
      unresolved_local_links: unresolvedLocal.length
    }, nodes, edges, external_links: externalLinks, unresolved_local: unresolvedLocal
  };
}

export function csv(records, cols) {
  const quote = x => '"' + String(x ?? '').replace(/"/g, '""').replace(/\r?\n/g, ' ') + '"';
  return [cols.map(quote).join(','), ...records.map(x => cols.map(k => quote(x[k])).join(','))].join('\n') + '\n';
}

export function run(root, outDir) {
  const result = analyzeSubjects(root);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'subject-link-extraction.json'), JSON.stringify(result, null, 2) + '\n');
  writeFileSync(join(outDir, 'subject-link-edges.csv'), csv(result.edges, ['from', 'to', 'type', 'confidence', 'source_file', 'href', 'label', 'context']));
  writeFileSync(join(outDir, 'subject-node-summary.csv'), csv(result.nodes, ['id', 'source', 'has_audit_readme', 'has_audit_md', 'markdown_link_count']));
  return result.metadata;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const root = resolve(process.argv[2] || '.');
  const out = resolve(process.argv[3] || join(root, 'research/galaxy-audit/generated'));
  try { console.log(JSON.stringify(run(root, out), null, 2)); }
  catch (e) { console.error(e.stack || e.message); process.exitCode = 1; }
}
