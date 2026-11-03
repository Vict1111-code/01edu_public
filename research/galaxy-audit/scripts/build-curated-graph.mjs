#!/usr/bin/env node
/**
 * Build a conservative, source-linked project relationship graph.
 * Input: generated/triaged-project-links.json
 * Output: generated/curated-galaxy-graph.json and generated/curated-galaxy-edges.csv
 * No relation asserts the platform's private unlock logic.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';

const overrides = {
  'ascii-art|ascii-art-web/export-file': ['uses_output', 'reuses ASCII-art output in export project'],
  'lalgebra_scalar|matrix': ['requires_prior_structure', 'reuses Scalar type from prior Rust exercise'],
  'lalgebra_scalar|matrix_ops': ['requires_prior_structure', 'reuses Scalar type in matrix operations'],
  'matrix|matrix_ops': ['requires_prior_structure', 'reuses Matrix type in matrix operations'],
  'mini-framework|bomberman-dom': ['requires_prior_project_output', 'must use previously created framework'],
  'make-your-game|bomberman-dom': ['references_prior_principles', 'follows earlier game design principles'],
  'make-your-game/different-maps|bomberman-dom': ['optional_resource', 'README explicitly calls it an optional project'],
  'mobile-dev/secure-notes|mobile-dev/package': ['builds_on_prior_project', 'creates package for prior Secure Notes app'],
  'social-network|social-network/cross-platform-appimage': ['parent_project_context', 'optional standalone desktop extension of social-network']
};

const retainedCategories = new Set([
  'project_extension', 'prior_project_lineage', 'piscine_to_core_bridge',
  'needs_manual_review', 'parent_context_reference'
]);

const classMap = {
  project_extension: ['extends', 'high_for_readme_link'],
  prior_project_lineage: ['references_prior_project', 'high_for_readme_link'],
  piscine_to_core_bridge: ['references_prior_piscine_raid', 'high_for_readme_link'],
  needs_manual_review: ['unresolved', 'unverified'],
  parent_context_reference: ['parent_project_context', 'medium_for_readme_link']
};

export function curate(input) {
  if (!input?.pairs || !Array.isArray(input.pairs)) throw new Error('Expected triaged-project-links.json with pairs');
  const main = [], resources = [];
  for (const item of input.pairs) {
    if (item.from === item.to) continue;
    const key = item.from + '|' + item.to;
    const override = overrides[key];
    const [relation, quality] = override
      ? [override[0], 'human_reviewed']
      : classMap[item.category] || ['reference_only', 'heuristic'];
    const edge = {
      from: item.from, to: item.to, relation,
      evidence_quality: quality, source_category: item.category,
      review_status: override ? 'human_reviewed' : item.category === 'project_extension' ? 'source_link_detected; review required' : 'source_link_detected',
      interpretation: override?.[1] || item.rationale || '',
      official_unlock: 'not_established',
      source_files: [...new Set(item.evidence.map(e => e.source_file))],
      evidence: item.evidence
    };
    // Keep resources and standards inspectable, but do not include them in the learning graph.
    if (retainedCategories.has(item.category) && relation !== 'optional_resource') main.push(edge);
    else resources.push(edge);
  }
  const nodes = [...new Set(main.flatMap(e => [e.from, e.to]))].sort().map(id => ({
    id, source_path: 'subjects/' + id + '/README.md',
    // Some resource-only directories may lack README files; retained graph nodes should be subject IDs.
    note: 'Verified by extractor as a subject; exact Galaxy track and time order unverified'
  }));
  const sortEdges = arr => arr.sort((a,b) => a.from.localeCompare(b.from) || a.to.localeCompare(b.to));
  sortEdges(main); sortEdges(resources);
  const relationCounts = Object.fromEntries([...new Set(main.map(e=>e.relation))].sort().map(k=>[k,main.filter(e=>e.relation===k).length]));
  return {
    schema_version: '1.0',
    source: 'Public 01Edu subject README references, CI extractor, and cited manual review',
    as_of: '2026-11-03',
    status: 'curated relationship network — NOT official Galaxy unlock graph',
    metadata: { source_pairs: input.pairs.length, graph_nodes: nodes.length, graph_edges: main.length,
      excluded_reference_edges: resources.length, relation_counts: relationCounts },
    nodes, edges: main, non_progression_references: resources
  };
}

const quote = x => '"' + String(x ?? '').replaceAll('"','""').replace(/\r?\n/g,' ') + '"';
export function toCsv(graph) {
  const cols=['from','to','relation','evidence_quality','official_unlock','source_files'];
  return cols.map(quote).join(',')+'\n'+graph.edges.map(e=>cols.map(k=>quote(k==='source_files'?e.source_files.join(';'):e[k])).join(',')).join('\n')+'\n';
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const dir=resolve(process.argv[2] || 'research/galaxy-audit/generated');
    const triage=JSON.parse(readFileSync(join(dir,'triaged-project-links.json'),'utf8'));
    const graph=curate(triage);
    writeFileSync(join(dir,'curated-galaxy-graph.json'),JSON.stringify(graph,null,2)+'\n');
    writeFileSync(join(dir,'curated-galaxy-edges.csv'),toCsv(graph));
    console.log(JSON.stringify(graph.metadata,null,2));
    if(graph.metadata.source_pairs<50) throw new Error('Too few candidate pairs; verify input');
  }catch(e){console.error(e.stack||String(e));process.exitCode=1;}
}
