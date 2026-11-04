#!/usr/bin/env node
// Independent Phase 18 educational classification. Never infer official Galaxy order.
import {readFileSync,writeFileSync,existsSync,mkdirSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {createHash} from 'node:crypto';
import {pathToFileURL} from 'node:url';
import {CONCEPTS} from './build-concept-prerequisites.mjs';
const files=['phase18-go-61-source-reviews.json','phase18-rust-8-source-reviews.json','phase18-javascript-26-source-reviews.json'];
const key=x=>x.language+'::'+x.exercise;
export function loadReviews(root){
 return files.flatMap(file=>{
  const path=join(root,'research/galaxy-audit/data',file);
  return JSON.parse(readFileSync(path,'utf8')).records.map(x=>({...x,review_file:file}));
 });
}
export function build(prior,queue,reviews,root){
 if(queue.length!==95||reviews.length!==95)throw Error('Review count not 95');
 const qs=new Map(queue.map(x=>[key(x),x])),rs=new Map(reviews.map(x=>[key(x),x]));
 if(qs.size!==95||rs.size!==95)throw Error('Duplicate source reviews');
 const validated=new Map(),summaryRows=[];
 for(const r of reviews){
  const id=key(r),q=qs.get(id),allowed=new Set(CONCEPTS[r.language]?.nodes||[]);
  if(!q||q.source!==r.source_path)throw Error('Not in pending queue: '+id);
  if(r.source_path!=='subjects/'+r.exercise+'/README.md'||!/^subjects\/[a-z0-9_-]+\/README\.md$/.test(r.source_path))
   throw Error('Unsafe source path: '+id);
  const file=join(root,r.source_path);
  if(!existsSync(file))throw Error('Public README not found: '+id);
  const body=readFileSync(file,'utf8');
  const normalize=s=>s.replace(/[`*_]/g,'').replace(/\s+/g,' ').trim().toLowerCase();
  if(!r.verification_phrase||(!body.includes(r.verification_phrase)&&!normalize(body).includes(normalize(r.verification_phrase))))
   throw Error('Verification phrase absent: '+id+' / '+r.verification_phrase);
  if(!r.review_note||r.review_note.length<25||r.official_quest!==null||r.official_unlock!==null)
   throw Error('Incomplete source review metadata: '+id);
  const collision=r.review_level==='cross_language_collision';
  if(collision){
   if(r.language!=='go'||r.exercise!=='rot'||r.concepts.length||
      r.proposed_study_stage!==null||!body.includes('String')||!body.includes('i8'))
    throw Error('Unconfirmed cross-language identity conflict: '+id);
  }else{
   if(r.review_level!=='full_public_readme_semantic_review'||!r.concepts.length||
      r.concepts.some(c=>!allowed.has(c))||!Number.isInteger(r.proposed_study_stage)||
      r.proposed_study_stage<1||r.proposed_study_stage>8)
    throw Error('Invalid semantic classifications: '+id);
   if(r.language==='go'&&body.includes(String.fromCharCode(96).repeat(3)+'rust'))
    throw Error('Other Rust source wrongly mapped as Go: '+id);
  }
  validated.set(id,{...r,public_sha256:createHash('sha256').update(body).digest('hex'),
   public_bytes:Buffer.byteLength(body)});
 }
 const languages={},log=[],unplaced=[],changedStages=0;
 for(const [language,group] of Object.entries(prior.languages)){
  const cards=group.exercise_cards.map(x=>{
   const r=validated.get(key(x));
   const copy={...x,phase18_review_status:x.phase17_review,
    phase18_effective_concepts:[...x.phase17_effective_concepts],
    phase18_study_stage:x.phase17_study_stage,phase18_source_evidence:null,
    official_galaxy_order:null,official_unlock_conditions:null,official_piscine_membership:'not_established'};
   if(r){
    if(x.phase17_review!=='pending_full_README_semantic_review')throw Error('Review outside queue: '+key(x));
    copy.phase18_review_status=r.review_level==='cross_language_collision'?'wrong_language_source_excluded':'manually_checked_public_README';
    copy.phase18_effective_concepts=[...r.concepts];
    copy.phase18_study_stage=r.proposed_study_stage;
    copy.phase18_source_evidence={official_public_url:'https://github.com/01-edu/public/blob/master/'+r.source_path,
     published_subject_path:r.source_path,source_sha256:r.public_sha256,source_bytes:r.public_bytes,
     matched_phrase:r.verification_phrase,matching_mode:'literal_or_Markdown_format_normalized',manual_interpretation:r.review_note,
     review_provenance:r.review_file,educational_classification_only:true};
    const moved=copy.phase18_study_stage!==x.phase17_study_stage;
    if(moved)changedStages++;
    log.push({language,exercise:x.exercise,review_level:r.review_level,
     earlier_stage:x.phase17_study_stage,suggested_stage:copy.phase18_study_stage,
     matched_source_phrase:r.verification_phrase,source_sha256:r.public_sha256,
     explanation:r.review_note,changed_stage:moved});
   }
   if(copy.phase18_study_stage===null)unplaced.push({language,exercise:x.exercise,
    reason:copy.phase18_source_evidence?.manual_interpretation||copy.phase16_source_review?.evidence||copy.phase18_review_status,
    official_identity:'not_established'});
   return copy;
  });
  languages[language]={summary:{total:cards.length,
   newly_checked_public_READMEs:cards.filter(x=>x.phase18_review_status==='manually_checked_public_README').length,
   wrong_language_source:cards.filter(x=>x.phase18_review_status==='wrong_language_source_excluded').length,
   remaining_pending_review:cards.filter(x=>x.phase18_review_status==='pending_full_README_semantic_review').length,
   unplaced:cards.filter(x=>x.phase18_study_stage===null).length},exercise_cards:cards};
 }
 const total=Object.values(languages).reduce((n,x)=>n+x.summary.total,0);
 if(total!==316||log.length!==95||log.filter(x=>x.review_level==='cross_language_collision').length!==1)
  throw Error('Result does not cover original curriculum safely');
 return {schema_version:'1.0',review_date:'2026-11-04',
  warning:'Public README semantic interpretation is an independent study recommendation; none of these entries proves official Galaxy quest order, membership, unlocks or private grading.',
  summary:{original_archive_candidates:total,previous_pending_source_reviews:95,source_reviews_completed:log.length,
    matched_public_subject_reviews:94,cross_language_mismatches_rejected:1,
    pending_full_semantic_review:0,stage_adjustments:changedStages,unplaced_candidates:unplaced.length},
  languages,review_log:log,unplaced_candidates:unplaced};
}
export function guide(data,language){
 const xs=data.languages[language].exercise_cards,lines=[
 '# '+language.toUpperCase()+' Piscine — fully triaged source-semantic study path','',
 'All 95 previously pending reviews were examined. Recommendations are independent of official Galaxy quest ordering.',''];
 for(let stage=1;stage<=8;stage++){
  const items=xs.filter(x=>x.phase18_study_stage===stage).sort((a,b)=>(a.estimated_difficulty??999)-(b.estimated_difficulty??999)||a.exercise.localeCompare(b.exercise));
  lines.push('## Suggested stage '+stage,'',items.length+' candidates.','');
  for(const x of items)lines.push('- '+(x.public_readme?'['+x.exercise+'](https://github.com/01-edu/public/blob/master/'+x.public_readme+')':x.exercise)+
   ' — '+x.phase18_review_status+'; '+(x.phase18_effective_concepts.join(', ')||'unverified')+
   (x.phase18_source_evidence?'. '+x.phase18_source_evidence.manual_interpretation:''));
  lines.push('');
 }
 lines.push('## Unplaced or uncertain source identities','');
 for(const x of xs.filter(x=>x.phase18_study_stage===null))
  lines.push('- '+x.exercise+': '+x.phase18_review_status);
 lines.push('','Stages and old numerical difficulty estimates are pedagogical, not official. Review source instructions and assessments before marking mastery.','');
 return lines.join('\n');
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 try{
  const root=resolve(process.argv[2]||'.'),dir=resolve(process.argv[3]||'research/galaxy-audit/generated');
  const prior=JSON.parse(readFileSync(join(dir,'piscine-phase17-semantic-curriculum.json'),'utf8'));
  const queue=JSON.parse(readFileSync(join(dir,'piscine-phase17-pending-source-reviews.json'),'utf8'));
  const d=build(prior,queue,loadReviews(root),root);
  mkdirSync(dir,{recursive:true});
  writeFileSync(join(dir,'piscine-phase18-complete-source-audit.json'),JSON.stringify(d,null,2)+'\n');
  writeFileSync(join(dir,'piscine-phase18-completed-95-review-log.json'),JSON.stringify(d.review_log,null,2)+'\n');
  writeFileSync(join(dir,'piscine-phase18-unplaced-candidates.json'),JSON.stringify(d.unplaced_candidates,null,2)+'\n');
  for(const l of Object.keys(CONCEPTS))writeFileSync(join(dir,l+'-phase18-source-checked-guide.md'),guide(d,l));
  console.log(JSON.stringify({summary:d.summary,by_language:Object.fromEntries(Object.entries(d.languages).map(([l,x])=>[l,x.summary]))},null,2));
 }catch(e){console.error(e.stack||String(e));process.exitCode=1;}
}
