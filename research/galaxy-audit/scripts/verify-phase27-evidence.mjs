#!/usr/bin/env node
// Validate Phase27 source gaps and dependency evidence without inventing official unlocks.
import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {pathToFileURL} from 'node:url';
const check=(ok,msg)=>{if(!ok)throw Error(msg)};
const norm=s=>String(s).replace(/[\x60*_]/g,'').replace(/\s+/g,' ').toLowerCase().trim();
export function validate(index,visual,gaps,graph,groups,readSource){
 const idx=new Map(index.nodes.map(x=>[x.path,x]));
 const anchors=new Set(visual.tracks.flatMap(t=>t.nodes.map(n=>n.subject_id)));
 for(const x of [visual.source_repository_tree_sha,gaps.source_tree_sha,graph.source_tree_sha,groups.source_tree_sha])
  check(x===index.tree_sha,'Snapshot/tree SHA mismatch');
 check(anchors.size===84,'Expected 84 screenshot anchors');
 const all=new Set(Object.values(groups.groups).flat());
 check(all.size===127,'127-group identity count differs');
 check([...all].every(x=>!anchors.has(x)),'Nonpriority ID unexpectedly placed on screenshot');
 const seen=new Set();
 for(const v of gaps.entries){
  check(!seen.has(v.id),'Duplicate incomplete source ID '+v.id);seen.add(v.id);
  const indexed=idx.get(v.id);
  check(indexed&&indexed.depth===1&&indexed.readme_sha===v.current_readme_sha,'Stub SHA mismatch '+v.id);
  check(v.source_path==='subjects/'+v.id+'/README.md','Stub source path mismatch '+v.id);
  const content=readSource(v.source_path);
  check(content.length<150,'Stub README no longer short '+v.id);
  check(v.source_phrase&&content.includes(v.source_phrase),'Stub text attestation failed '+v.id);
  check(v.official_galaxy_track===null&&v.official_unlock===null,'Made-up official info '+v.id);
  if(v.historical_restoration)
   check(v.id==='argsort'&&v.historical_restoration.status.startsWith('historical_'),
    'Historical recovery was assigned as current content');
 }
 check(seen.size===9&&gaps.counts.historical_specification_found===1,'Nine source gaps mismatch');
 const checked=new Set();
 let projectReuses=0,contexts=0;
 for(const v of graph.verified_source_relationships){
  const key=v.from+'>'+v.to;
  check(!checked.has(key),'Duplicate prerequisite relationship '+key);checked.add(key);
  check(idx.has(v.from)&&idx.has(v.to),'Unindexed prerequisite source '+key);
  check(v.source_path==='subjects/'+v.to+'/README.md','Evidence must originate in target README '+key);
  check(v.source_readme_sha===idx.get(v.to).readme_sha,'Evidence source SHA mismatch '+key);
  const content=readSource(v.source_path);
  check(v.evidence_phrase&&norm(content).includes(norm(v.evidence_phrase)),'Evidence phrase missing '+key);
  check(v.official_platform_unlock===null&&v.official_mandatory_status===null,'Invented official requirement '+key);
  check(v.from_in_screenshot===anchors.has(v.from)&&v.to_in_screenshot===anchors.has(v.to),'Image anchor mismatch '+key);
  if(v.prior_deliverable_described)projectReuses++;else contexts++;
 }
 check(checked.size===16&&projectReuses===12&&contexts===4,'Evidence class counts inconsistent');
 for(const v of graph.pedagogical_recommendations){
  check(idx.has(v.from)&&idx.has(v.to),'Unknown educational suggestion '+v.from);
  check(v.source_claim_of_dependency===false&&v.official_platform_unlock===null,
   'Educational recommendation was promoted to official prerequisite');
 }
 check(graph.pedagogical_recommendations.length===6,'Recommendation count mismatch');
 return {status:'source_evidence_verified_official_unlock_unknown',
  source_tree_sha:index.tree_sha,
  counts:{nonpriority_source_ids:all.size,unresolved_current_readme_stubs:9,historically_recovered_sources:1,
   verified_image_anchors:anchors.size,README_supported_relationships:checked.size,
   README_describes_prior_work:projectReuses,contextual_or_resource_only:contexts,
   pedagogical_recommendations:graph.pedagogical_recommendations.length}};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 const root=resolve(process.argv[2]||'.'),out=resolve(process.argv[3]||'research/galaxy-audit/generated');
 const load=n=>JSON.parse(readFileSync(join(root,'research/galaxy-audit/data',n),'utf8'));
 const x=validate(load('subject-node-index.json'),load('phase23-galaxy-visual-anchors.json'),
  load('phase27-nine-source-gaps.json'),load('phase27-prerequisite-evidence-register.json'),
  load('phase27-nonpriority-reviewed-groups.json'),p=>readFileSync(join(root,p),'utf8'));
 mkdirSync(out,{recursive:true});
 writeFileSync(join(out,'phase27-evidence-attestation.json'),JSON.stringify(x,null,2)+'\n');
 console.log(JSON.stringify(x,null,2));
}
