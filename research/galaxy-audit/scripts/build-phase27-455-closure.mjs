#!/usr/bin/env node
// Consolidates all 455 archive-unmatched top-level public subject reviews.
// Does not classify the separate 281 archive-matched unaudited top-level subjects.
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {pathToFileURL} from 'node:url';
const insist=(v,m)=>{if(!v)throw Error(m)};
const safe=x=>String(x??'');
export function merge(index,p22,p25,p26,p27){
 const sha=index.tree_sha,byId=new Map(index.nodes.map(n=>[n.path,n]));
 insist(p22.source_tree_sha===sha&&p25.source_tree_sha===sha&&p26.source_tree_sha===sha&&p27.source_tree_sha===sha,'Mismatched public source tree');
 const expected=new Map(p22.other_unaudited_subjects.map(n=>[n.id,n]));
 insist(expected.size===455,'Expected 455 archive-unmatched top-level entries');
 const entries=new Map();
 const add=(id,phase,category,language,evidence,other={})=>{
  insist(!entries.has(id),'Duplicate reviewed subject '+id);
  const prior=expected.get(id),node=byId.get(id);
  insist(prior&&node&&node.depth===1&&!node.audit_readme_sha&&node.readme_sha===prior.readme_sha,'Subject identity missing/mismatched '+id);
  entries.set(id,{id,review_phase:phase,source_path:'subjects/'+id+'/README.md',source_readme_sha:node.readme_sha,
   language:language||null,semantic_category:category||'not_precisely_classified',source_evidence: safe(evidence).slice(0,280),
   review_status:other.review_status||'public_readme_semantically_reviewed',
   topic:other.topic||null,official_galaxy_track:null,official_piscine_membership:null,
   official_unlock:null,assessment_executed:false,
   source_url:'https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/'+id+'/README.md'});
 };
 for(const x of p22.other_unaudited_subjects.filter(x=>x.source_review)){
  add(x.id,22,x.source_review.classification,x.source_review.language,
   x.source_review.source_phrase,{review_status:'manual_source_review'});
 }
 for(const x of p25.entries)
  add(x.id,25,x.semantic_kind,x.language,x.source_phrase,{
   review_status:x.semantic_kind==='incomplete_stub'?'inspected_insufficient_public_spec':
    x.semantic_kind==='unavailable_placeholder'?'unavailable_public_source':'manual_source_review'});
 for(const x of p26.records)
  add(x.id,26,x.semantic_category,x.language,x.source_phrase,{
   review_status:x.source_review_status,topic:x.semantic_category});
 for(const x of p27.records)
  add(x.id,27,x.semantic_type,x.language,x.source_excerpt,{
   review_status:'manual_source_review',topic:x.topic});
 insist(entries.size===455&&[...expected.keys()].every(id=>entries.has(id)),'Review cohort does not cover all 455 sources');
 const sorted=[...entries.values()].sort((a,b)=>a.id.localeCompare(b.id));
 const byPhase=Object.fromEntries([22,25,26,27].map(p=>[p,sorted.filter(x=>x.review_phase===p).length]));
 insist(byPhase[22]===9&&byPhase[25]===34&&byPhase[26]===285&&byPhase[27]===127,'Cohort phase counts differ');
 const insufficient=sorted.filter(x=>x.review_status==='inspected_insufficient_public_spec').map(x=>x.id);
 return {schema_version:'1.0',phase:27,as_of:'2026-11-04',source_tree_sha:sha,
  scope:'All 455 top-level subjects without audit README and not matched in three community piscine archives',
  warning:'This is a source-content catalog, not a complete official Galaxy learning-path/unlock map. The other 281 archive-name matched top-level public READMEs remain separate.',
  counts:{source_subjects:sorted.length,reviewed_by_phase:byPhase,insufficient_current_specifications:insufficient.length,
   unavailable_public_readmes:sorted.filter(x=>x.review_status==='unavailable_public_source').length,
   official_unlocks_verified:0},
  insufficient_subject_ids:insufficient,subjects:sorted};
}
export const csv=d=>{
 const keys=['id','review_phase','language','semantic_category','topic','review_status','source_path','source_readme_sha','source_evidence','source_url','official_galaxy_track','official_unlock'];
 const quote=x=>'"'+safe(x).replace(/"/g,'""').replace(/[\r\n]+/g,' ')+'"';
 return keys.join(',')+'\n'+d.subjects.map(x=>keys.map(k=>quote(x[k])).join(',')).join('\n')+'\n';
};
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 const root=resolve(process.argv[2]||'.'),out=resolve(process.argv[3]||'research/galaxy-audit/generated');
 const readData=x=>JSON.parse(readFileSync(join(root,'research/galaxy-audit/data',x),'utf8'));
 const readGen=x=>JSON.parse(readFileSync(join(out,x),'utf8'));
 const d=merge(readData('subject-node-index.json'),readData('phase22-nonaudited-coverage.json'),
  readData('phase25-first-manual-semantic-reviews.json'),readGen('phase26-source-verified-285.json'),
  readGen('phase27-source-verified-127.json'));
 mkdirSync(out,{recursive:true});
 writeFileSync(join(out,'phase27-unified-455-reviewed.json'),JSON.stringify(d,null,2)+'\n');
 writeFileSync(join(out,'phase27-unified-455-reviewed.csv'),csv(d));
 console.log(JSON.stringify(d.counts,null,2));
}
