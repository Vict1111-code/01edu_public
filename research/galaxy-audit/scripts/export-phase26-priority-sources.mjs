#!/usr/bin/env node
// Phase 26 input bundle: inspect full public README text for remaining priority cases.
// Bundle is an ephemeral CI artifact, not re-committed to the repo.
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
const assert=(v,m)=>{if(!v)throw Error(m)};
export function build(index,phase24,phase25,readSource) {
 assert(index.tree_sha===phase24.source_tree_sha,'Phase 24 SHA mismatch');
 assert(index.tree_sha===phase25.source_tree_sha,'Phase 25 SHA mismatch');
 const byIndex=new Map(index.nodes.map(n=>[n.path,n]));
 const reviewed=new Set(phase25.entries.map(n=>n.id));
 assert(reviewed.size===phase25.entries.length,'Duplicated Phase25 source');
 const priority=phase24.priority_manual_review_queue;
 assert(priority.length===317,'Unexpected original priority queue');
 const included=priority.filter(r=>!reviewed.has(r.id));
 assert(included.length===285,'Expected precisely 285 remaining prioritized cases');
 const seen=new Set(), records=[];
 for (const entry of included){
  assert(!seen.has(entry.id),'Duplicated priority source '+entry.id);
  seen.add(entry.id);
  const node=byIndex.get(entry.id);
  assert(node&&node.depth===1&&!node.audit_readme_sha,'Source must be unaudited top-level '+entry.id);
  assert(node.readme_sha===entry.readme_sha,'Source README SHA mismatch '+entry.id);
  const path='subjects/'+entry.id+'/README.md';
  const fullText=readSource(path);
  assert(typeof fullText==='string','Nontext source '+entry.id);
  records.push({id:entry.id,source_path:path,readme_sha:node.readme_sha,
   phase24_category:entry.category,phase24_category_confidence:entry.confidence,
   phase24_language:entry.language,full_readme_text:fullText});
 }
 return {schema_version:'1.0',phase:26,source_tree_sha:index.tree_sha,
  status:'SOURCE_BUNDLE_FOR_MANUAL_INSPECTION_NOT_CLASSIFICATIONS',
  total:records.length,prioritized_original:priority.length,
  phase25_priority_previously_reviewed:priority.length-records.length,
  records};
}
if (process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 const root=resolve(process.argv[2]||'.'), out=resolve(process.argv[3]||'research/galaxy-audit/generated');
 const load=x=>JSON.parse(readFileSync(join(root,'research/galaxy-audit/data',x),'utf8'));
 const p24=JSON.parse(readFileSync(join(out,'phase24-unmatched-readme-triage.json'),'utf8'));
 const result=build(load('subject-node-index.json'),p24,load('phase25-first-manual-semantic-reviews.json'),
   p=>readFileSync(join(root,p),'utf8'));
 mkdirSync(out,{recursive:true});
 writeFileSync(join(out,'phase26-285-full-source-bundle.json'),JSON.stringify(result,null,2)+'\n');
 console.log(JSON.stringify({source_tree_sha:result.source_tree_sha,priority_count:result.total,
   total_readme_chars:result.records.reduce((n,r)=>n+r.full_readme_text.length,0)},null,2));
}
