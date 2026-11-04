#!/usr/bin/env node
// Phase 25: attest manual semantic reviews to actual README source and Phase 24 queue.
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {pathToFileURL} from 'node:url';
import {build as triageAll} from './triage-remaining-446.mjs';
const normalized=x=>String(x).replace(/[\x60*_]/g,'').replace(/\s+/g,' ').trim().toLowerCase();
const ensure=(test,msg)=>{if(!test)throw Error(msg)};
export function verify(index,phase22,phase23,phase25,source){
 ensure(phase25.source_tree_sha===index.tree_sha && phase22.source_tree_sha===index.tree_sha,'source tree SHA mismatch');
 const indexed=new Map(index.nodes.map(n=>[n.path,n]));
 const backlog=new Map(phase22.other_unaudited_subjects.map(n=>[n.id,n]));
 const prior=triageAll(index,phase22,phase23,source);
 const candidates=new Map(prior.records.map(r=>[r.id,r]));
 const priority=new Set(prior.priority_manual_review_queue.map(r=>r.id));
 const seen=new Set(),confirmed=[];
 const allowed=new Set(['small_exercise','multi_step_exercise','incomplete_stub','reference_policy','unavailable_placeholder']);
 for(const r of phase25.entries){
  ensure(!seen.has(r.id),'duplicate manual review '+r.id);
  seen.add(r.id);
  const idx=indexed.get(r.id),old=backlog.get(r.id);
  ensure(Boolean(old && idx && candidates.has(r.id) && !old.source_review),'ID not in unreviewed Phase24 queue: '+r.id);
  ensure(idx.depth===1 && !idx.audit_readme_sha && r.readme_sha===idx.readme_sha,'README SHA mismatch '+r.id);
  ensure(r.source_path==='subjects/'+r.id+'/README.md','source path mismatch '+r.id);
  ensure(allowed.has(r.semantic_kind),'unknown source category '+r.id);
  ensure(r.official_galaxy_track===null && r.official_piscine_membership===null &&
    r.official_unlock===null && r.assessment_status==='not_executed','unsupported official claim '+r.id);
  const content=source(r.source_path);
  ensure(normalized(content).includes(normalized(r.source_phrase)),'source evidence phrase missing '+r.id);
  if(r.semantic_kind==='incomplete_stub')
   ensure(content.length<140,'stub review source no longer short '+r.id);
  if(r.semantic_kind==='unavailable_placeholder')
   ensure(/unavailable for you/i.test(content),'unavailable status missing '+r.id);
  if(r.semantic_kind==='reference_policy')
   ensure(/restrictions checker/i.test(content),'reference policy basis missing '+r.id);
  confirmed.push({id:r.id,category:r.semantic_kind,language:r.language,phase24_category:candidates.get(r.id).suggested_content_category,
   phase24_category_confidence:candidates.get(r.id).category_confidence,phase24_language:candidates.get(r.id).detected_language,
   phase24_priority:priority.has(r.id),source_readme_sha:r.readme_sha});
 }
 ensure(seen.size===phase25.counts.reviewed,'review count mismatch');
 ensure(confirmed.length+phase25.counts.remaining_of_446===prior.records.length,'remaining count mismatch');
 const countBy=field=>Object.fromEntries([...new Set(confirmed.map(x=>x[field]||'unresolved'))].sort()
  .map(k=>[k,confirmed.filter(x=>(x[field]||'unresolved')===k).length]));
 ensure(JSON.stringify(countBy('category'))===JSON.stringify(Object.fromEntries(Object.entries(phase25.counts.kinds).sort())),'kind histogram mismatch');
 ensure(JSON.stringify(countBy('language'))===JSON.stringify(Object.fromEntries(Object.entries(phase25.counts.languages).sort())),'language histogram mismatch');
 const inPriority=confirmed.filter(x=>x.phase24_priority).length;
 const detected=confirmed.filter(x=>x.phase24_language&&x.phase24_language!==x.language).map(x=>({id:x.id,
   prior_heuristic:x.phase24_language,source_reviewed:x.language}));
 return {schema_version:'1.0',as_of:'2026-11-04',
  source_tree_sha:index.tree_sha,status:'source_attested_manual_semantic_reviews_not_official_galaxy_mapping',
  totals:{phase24_unreviewed:prior.records.length,phase24_priority_queue_initial:priority.size,
   reviewed_source_readmes:confirmed.length,reviewed_from_priority_queue:inPriority,
   previously_unreviewed_remaining:prior.records.length-confirmed.length,
   phase24_priority_queue_remaining:priority.size-inPriority,
   possible_language_heuristic_disagreements:detected.length},
  source_verified_reviews:confirmed,language_disagreements:detected};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 const root=resolve(process.argv[2]||'.'),dir='research/galaxy-audit/data';
 const load=f=>JSON.parse(readFileSync(join(root,dir,f),'utf8'));
 const result=verify(load('subject-node-index.json'),load('phase22-nonaudited-coverage.json'),
  load('phase23-galaxy-visual-anchors.json'),load('phase25-first-manual-semantic-reviews.json'),
  path=>readFileSync(join(root,path),'utf8'));
 const output=resolve(process.argv[3]||'research/galaxy-audit/generated');
 mkdirSync(output,{recursive:true});
 writeFileSync(join(output,'phase25-semantic-review-attestation.json'),JSON.stringify(result,null,2)+'\n');
 console.log(JSON.stringify(result.totals,null,2));
}
