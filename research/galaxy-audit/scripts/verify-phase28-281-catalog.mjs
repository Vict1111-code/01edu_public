#!/usr/bin/env node
import {readFileSync,writeFileSync,mkdirSync,existsSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {pathToFileURL} from 'node:url';
const check=(ok,msg)=>{if(!ok)throw Error(msg)};
const norm=s=>String(s).toLowerCase().replace(/[\x60*_]/g,'').replace(/\s+/g,' ').trim();
export function excerptOf(s){
 const m=/^#{1,4}\s+Instructions?(?::)?\s*$/im.exec(s);
 const body=m?s.slice(m.index+m[0].length):s;
 const line=body.split(/\r?\n/).map(x=>x.trim()).find(x=>x.length>24&&!/^(#|\x60{3}|<!--)/.test(x));
 return (line||s.split(/\r?\n/).find(x=>x.length>16)||s.trim()).slice(0,240);
}
export function verify(index,p22,cross,cat,reviews,older,read,exists){
 const sha=index.tree_sha;
 check([p22.source_tree_sha,cross.official_subject_tree_sha,cat.source_tree_sha,reviews.source_tree_sha].every(x=>x===sha),'Source tree SHA mismatch');
 check(cat.records.length===281&&reviews.records.length===81,'Input cohort counts changed');
 const cohort=new Map(p22.archive_matched_unaudited_subjects.map(x=>[x.id,x]));
 const tree=new Map(index.nodes.map(x=>[x.path,x]));
 const newReviews=new Map(reviews.records.map(x=>[x.id,x]));
 const old=new Map(),names=['phase18_go','phase18_javascript','phase18_rust','phase16_manual','phase17_semantic'];
 for(let i=0;i<older.length;i++)for(const r of older[i].records){
  if(r.exercise==='sortable')continue;
  check(!old.has(r.exercise),'Duplicate prior review '+r.exercise);
  old.set(r.exercise,{data:r,source:names[i]});
 }
 check(cohort.size===281&&newReviews.size===81&&old.size===200,'Review cohort identity count wrong');
 const counts={README_sources_read:0,previous_reviews_reused:0,new_manual_reviews:0,
  public_test_subjects:0,public_test_files:0,
  prior_evidence_phrases_checked:0,source_language:{go:0,rust:0,javascript:0,shell:0}};
 const seen=new Set(),records=[];
 for(const r of cat.records){
  check(!seen.has(r.id),'Duplicate reviewed identity '+r.id);seen.add(r.id);
  const original=cohort.get(r.id),indexed=tree.get(r.id);
  check(original&&indexed&&indexed.depth===1&&!indexed.audit_readme_sha,'Invalid cohort identity '+r.id);
  check(indexed.readme_sha===r.readme_sha&&original.readme_sha===r.readme_sha,'Stale source README SHA '+r.id);
  check(r.source_readme_path==='subjects/'+r.id+'/README.md','README path mismatch '+r.id);
  const source=read(r.source_readme_path);
  check(typeof source==='string'&&source.trim().length>80,'Source README incomplete '+r.id);
  counts.README_sources_read++;
  check(original.languages.length===1&&r.archive_language===original.languages[0],'Archive language mismatch '+r.id);
  check(r.source_language_differs_from_archive===(r.source_language!==r.archive_language),'Source language correction invalid '+r.id);
  check(Object.hasOwn(counts.source_language,r.source_language),'Unknown language '+r.id);
  counts.source_language[r.source_language]++;
  if(r.source_language==='shell')check(['make-it-better','to-git-or-not-to-git','who-are-you'].includes(r.id),'Unattested shell assignment '+r.id);
  const reference=cross.records.filter(x=>x.match_status==='exact_top_level_subject'&&x.official_subject_path===r.id);
  check(reference.length===original.community_archive_occurrences,'Archive name match count wrong '+r.id);
  check(r.archive_references.length===reference.length,'Archive provenance count wrong '+r.id);
  const prev=old.get(r.id),fresh=newReviews.get(r.id);
  check(Boolean(prev)!==Boolean(fresh),'Missing/duplicated manual review '+r.id);
  if(prev){
   check(prev.source===r.historical_review_source,'Prior review provenance mismatch '+r.id);
   check(prev.data.language===r.source_language,'Previously reviewed language differs '+r.id);
   check((prev.data.review_note||prev.data.reason)===r.requirement_summary,'Prior semantic summary differs '+r.id);
   if(r.source_evidence_phrase){
    check(norm(source).includes(norm(r.source_evidence_phrase)),'Prior exact source evidence missing '+r.id);
    counts.prior_evidence_phrases_checked++;
   }
   counts.previous_reviews_reused++;
  }else{
   check(r.historical_review_source==='phase28_direct_manual_review','New review provenance mismatch '+r.id);
   check(fresh.language===r.source_language&&fresh.semantic_kind===r.semantic_kind,'New manual category differs '+r.id);
   check(fresh.requirement_summary===r.requirement_summary&&fresh.source_readme_sha===r.readme_sha,'New manual source summary mismatch '+r.id);
   counts.new_manual_reviews++;
  }
  const sources=reference.flatMap(x=>(x.public_js_test_paths||[]).concat(x.public_dom_test_paths||[]));
  const unique=[...new Set(sources)];
  check(JSON.stringify(unique)===JSON.stringify(r.public_test_sources),'Public test paths differ '+r.id);
  for(const f of unique){check((f.startsWith('js/')||f.startsWith('dom/'))&&exists(f),'Missing public test file '+f);counts.public_test_files++;}
  if(unique.length)counts.public_test_subjects++;
  check(r.official_piscine_membership===null&&r.official_quest===null&&r.official_unlock===null&&r.official_mandatory_status===null,'Fabricated official curriculum fact '+r.id);
  check(r.student_solution_tests_executed===false,'Unverified learner tests marked executed '+r.id);
  const exact=excerptOf(source);
  check(source.includes(exact),'Verbatim excerpt extraction failed '+r.id);
  records.push({...r,verbatim_readme_excerpt:exact});
 }
 check(seen.size===281&&[...cohort.keys()].every(id=>seen.has(id)),'Incomplete matched cohort');
 check(counts.README_sources_read===281&&counts.previous_reviews_reused===200&&counts.new_manual_reviews===81,'Review totals mismatch');
 check(counts.source_language.go===118&&counts.source_language.rust===63&&counts.source_language.javascript===97&&counts.source_language.shell===3,'Source-language count changed');
 check(counts.public_test_subjects===97,'Public JS test matching count changed');
 return {schema_version:'1.0',phase:28,source_tree_sha:sha,counts,
  caveat:'README source semantic evidence verified. Archive membership, official quest order, grading and unlock rules remain unknown.',
  records};
}
export function csv(r){
 const keys=['id','archive_language','source_language','semantic_kind','competency_tags','requirement_summary','historical_review_source','source_readme_path','readme_sha','verbatim_readme_excerpt','public_test_sources','proposed_pedagogical_stage','official_quest','official_unlock'];
 const q=x=>'"'+String(x??'').replace(/"/g,'""').replace(/[\r\n]/g,' ')+'"';
 return keys.join(',')+'\n'+r.records.map(x=>keys.map(k=>q(Array.isArray(x[k])?x[k].join('; '):x[k])).join(',')).join('\n')+'\n';
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 const root=resolve(process.argv[2]||'.'),out=resolve(process.argv[3]||'research/galaxy-audit/generated');
 const load=n=>JSON.parse(readFileSync(join(root,'research/galaxy-audit/data',n),'utf8'));
 const earlier=['phase18-go-61-source-reviews.json','phase18-javascript-26-source-reviews.json','phase18-rust-8-source-reviews.json','phase16-manual-readme-classifications.json','phase17-semantic-source-verdicts.json'];
 const r=verify(load('subject-node-index.json'),load('phase22-nonaudited-coverage.json'),load('three-piscines-subject-crosswalk.json'),load('phase28-complete-281-catalog.json'),load('phase28-direct-81-source-reviews.json'),earlier.map(load),p=>readFileSync(join(root,p),'utf8'),p=>existsSync(join(root,p)));
 mkdirSync(out,{recursive:true});
 writeFileSync(join(out,'phase28-source-attested-281.json'),JSON.stringify(r,null,2)+'\n');
 writeFileSync(join(out,'phase28-source-attested-281.csv'),csv(r));
 writeFileSync(join(out,'phase28-verification-summary.json'),JSON.stringify(r.counts,null,2)+'\n');
 console.log(JSON.stringify(r.counts,null,2));
}
