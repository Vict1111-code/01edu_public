#!/usr/bin/env node
/**
 * Triage output from extract-subject-links.mjs.
 * Input is heuristic; all outputs are candidate relationships, NOT official unlock gates.
 * Usage: node research/galaxy-audit/scripts/triage-subject-links.mjs [generated-folder]
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';

export function triageEdge(edge) {
  const { from, to, type, context = '' } = edge;
  if (from === 'good-practices') return { category: 'coding_standard', review: 'exclude_from_prerequisites', rationale: 'Shared coding standards reference' };
  if (type === 'learning_resource') return { category: 'learning_resource', review: 'exclude_from_prerequisites', rationale: 'Documentation or learning resource' };
  if (to.startsWith(from + '/') && type === 'extension_of_parent')
    return { category: 'project_extension', review: 'verify_in_readme', rationale: 'Parent subject with explicit same-instructions/principles wording' };
  if (from === 'road_intersection' && to === 'smart-road')
    return { category: 'piscine_to_core_bridge', review: 'manually_supported', rationale: 'README explicitly recalls Rust Piscine raid; not an unlock rule' };
  if ((from === 'ascii-art' && to === 'ascii-art-web') || (from === 'forum' && to === 'real-time-forum'))
    return { category: 'prior_project_lineage', review: 'manually_supported', rationale: 'Subject directly references previous project' };
  if (type === 'prior_project_reference') return { category: 'prior_project_candidate', review: 'verify_in_readme', rationale: 'Heuristic previous-project wording' };
  if (type === 'parent_reference' && to.startsWith(from + '/'))
    return { category: 'parent_context_reference', review: 'not_an_unlock', rationale: 'Parent link without explicit extension requirement' };
  if (/\/resources(?:\/|$)/.test(from) || /\/resources(?:\/|$)/.test(to))
    return { category: 'supporting_asset_reference', review: 'exclude_from_prerequisites', rationale: 'Support/resource directory' };
  return { category: 'needs_manual_review', review: 'unverified', rationale: 'Insufficient evidence to classify as dependency' };
}

export function triage(input) {
  const seen = new Map();
  for (const edge of input.edges) {
    const key = [edge.from, edge.to].join('\u0000');
    const classified = triageEdge(edge);
    if (seen.has(key)) {
      seen.get(key).evidence.push({ source_file: edge.source_file, label: edge.label, context: edge.context, href: edge.href });
    } else {
      seen.set(key, {
        from: edge.from, to: edge.to, ...classified, official_unlock: 'not_established',
        evidence: [{ source_file: edge.source_file, label: edge.label, context: edge.context, href: edge.href }]
      });
    }
  }
  const pairs = [...seen.values()].sort((a, b) => a.from.localeCompare(b.from) || a.to.localeCompare(b.to));
  const counts = Object.fromEntries([...new Set(pairs.map(x => x.category))].sort().map(k => [k, pairs.filter(x => x.category === k).length]));
  const rawCounts = Object.fromEntries([...new Set(input.edges.map(x => x.type))].sort().map(k => [k, input.edges.filter(x => x.type === k).length]));
  return {
    metadata: {
      schema_version: '1.0', source_subject_count: input.metadata.subject_count,
      original_link_instances: input.edges.length, unique_project_pairs: pairs.length,
      triage_classes: counts, raw_classes: rawCounts,
      limitation: 'Static candidate triage. Even manually supported relations are not official unlock gates.'
    },
    pairs
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const outDir = resolve(process.argv[2] || 'research/galaxy-audit/generated');
    const source = JSON.parse(readFileSync(join(outDir, 'subject-link-extraction.json'), 'utf8'));
    const result = triage(source);
    writeFileSync(join(outDir, 'triaged-project-links.json'), JSON.stringify(result, null, 2) + '\n');
    writeFileSync(join(outDir, 'triage-summary.json'), JSON.stringify(result.metadata, null, 2) + '\n');
    console.log(JSON.stringify(result.metadata, null, 2));
  } catch (error) {
    console.error(error.stack || String(error));
    process.exitCode = 1;
  }
}
