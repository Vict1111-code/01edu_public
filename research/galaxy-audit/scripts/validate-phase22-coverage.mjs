#!/usr/bin/env node
// Reconcile and attest Phase 22 coverage against the pinned public source index.
// This is a research validator, not an official 01Edu unlock/assessment evaluator.
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const normalize = s => String(s).replace(/[\x60*_]/g,'').replace(/\s+/g,' ').toLowerCase().trim();
const check = (ok,reason) => { if (!ok) throw Error(reason); };

export function validateCoverage(index,crosswalk,data,readSource) {
 const top=index.nodes.filter(n=>n.depth===1), topMap=new Map(top.map(n=>[n.path,n]));
 const audit=top.filter(n=>n.audit_readme_sha), noAudit=top.filter(n=>!n.audit_readme_sha);
 const grouped=new Map();
 let exact=0;
 for(const r of crosswalk.records){
  if(r.match_status!=='exact_top_level_subject'||!r.official_subject_path)continue;
  check(topMap.has(r.official_subject_path),'Unindexed archive name: '+r.official_subject_path);
  exact++;
  if(!grouped.has(r.official_subject_path))grouped.set(r.official_subject_path,[]);
  grouped.get(r.official_subject_path).push(r);
 }
 const c=data.counts;
 check(data.source_tree_sha===index.tree_sha,'Source tree SHA differs');
 check(topMap.size===top.length,'Duplicate top-level IDs');
 check(c.total_top_level===top.length,'Total top-level count differs');
 check(c.audited_top_level===audit.length,'Public audit count differs');
 check(c.top_level_without_audit===noAudit.length,'Unaudited count differs');
 check(c.community_archive_candidate_rows===crosswalk.records.length,'Community rows differ');
 check(c.exact_top_level_archive_rows===exact,'Archive exact rows differ');
 check(c.unique_subject_archive_matches===grouped.size,'Unique public matches differ');

 const matched=data.archive_matched_unaudited_subjects,other=data.other_unaudited_subjects;
 const matchedNames=new Set(matched.map(x=>x.id)),otherNames=new Set(other.map(x=>x.id));
 check(matchedNames.size===matched.length&&otherNames.size===other.length,'Duplicate backlog IDs');
 check(matched.length+other.length===noAudit.length,'Backlog does not cover all unaudited READMEs');
 check(c.archive_matches_without_audit===matched.length,'Matched count differs');
 check(c.archive_unmatched_without_audit===other.length,'Unmatched count differs');
 let manual=0;
 for(const node of noAudit){
  const archived=grouped.get(node.path)||[];
  const rec=(archived.length?matched:other).find(x=>x.id===node.path);
  check(Boolean(rec),'Missing backlog entry '+node.path);
  check(rec.readme_sha===node.readme_sha,'README source SHA differs '+node.path);
  check(rec.official_unlock===null,'Invented official unlock '+node.path);
  if(archived.length){
   check(rec.official_piscine_membership===null,'Invented official membership '+node.path);
   check(rec.community_archive_occurrences===archived.length,'Archive occurrence mismatch '+node.path);
   const langs=[...new Set(archived.map(x=>x.language))].sort();
   check(JSON.stringify([...rec.languages].sort())===JSON.stringify(langs),'Archive languages mismatch '+node.path);
  }else{
   check(rec.official_galaxy_track===null,'Invented official track '+node.path);
  }
  if(rec.source_review){
   manual++;
   const s=rec.source_review;
   check(s.id===node.path&&s.source_path==='subjects/'+node.path+'/README.md','Bad review source '+node.path);
   check(s.official_unlock===null&&s.official_track===null,'Invented reviewed official status '+node.path);
   check(normalize(readSource(s.source_path)).includes(normalize(s.source_phrase)),'Review phrase missing '+node.path);
  }
 }
 check(manual===c.manual_sources_reviewed,'Manual review count mismatch');
 const reviewedMatched=matched.filter(x=>x.source_review).length;
 const reviewedUnmatched=other.filter(x=>x.source_review).length;
 check(c.manual_archive_matched===reviewedMatched,'Manually reviewed matched count differs');
 check(c.manual_archive_unmatched===reviewedUnmatched,'Manually reviewed unmatched count differs');
 check(c.unreviewed_archive_unmatched===other.length-reviewedUnmatched,'Remaining review count mismatch');
 const matchedWithAudit=[...grouped.keys()].filter(n=>topMap.get(n).audit_readme_sha).sort();
 check(JSON.stringify(matchedWithAudit)===JSON.stringify([...c.archive_matches_with_audit].sort()),'Audited archive-match list differs');
 return {ok:true,source_tree_sha:index.tree_sha,counts:c,source_phrases_verified:manual};
}

if(process.argv[1] && import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 try{
  const root=resolve(process.argv[2]||'.'),p='research/galaxy-audit/data/';
  const load=x=>JSON.parse(readFileSync(join(root,p+x),'utf8'));
  const result=validateCoverage(load('subject-node-index.json'),
    load('three-piscines-subject-crosswalk.json'),
    load('phase22-nonaudited-coverage.json'),path=>readFileSync(join(root,path),'utf8'));
  console.log(JSON.stringify(result,null,2));
 }catch(e){console.error(e.stack||String(e));process.exitCode=1;}
}

