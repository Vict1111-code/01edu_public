#!/usr/bin/env node
// Phase 17: apply manually checked source-semantic overrides and create an
// explicit pending-review queue. All stages are pedagogical, never Galaxy unlocks.
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {CONCEPTS} from './build-concept-prerequisites.mjs';
const key=x=>x.language+'::'+x.exercise;
const priorHuman=new Set(['manual_public_README_review','manual_concept_anchor','manual_full_readme_review']);
export function applyReview(phase16,verdicts,root){
 const reviews=new Map(verdicts.records.map(x=>[key(x),x]));
 if(reviews.size!==verdicts.records.length)throw Error('Duplicate manual source verdict');
 const applied=new Set(),languages={},queue=[];
 let changed=0,conceptsRemoved=0,conceptsAdded=0;
 for(const [language,group] of Object.entries(phase16.languages)){
  const allowed=new Set(CONCEPTS[language].nodes);
  const cards=group.exercise_cards.map(x=>{
   const k=key(x),v=reviews.get(k),c={...x};
   c.phase17_review='pending_semantic_review';
   c.phase17_effective_concepts=[...x.concepts];
   c.phase17_study_stage=x.phase16_study_stage;
   c.phase17_semantic_evidence=null;
   if(v){
    if(!x.public_readme||x.public_readme!==v.public_readme||!x.readme_inspected)throw Error('Unmatched public source '+k);
    const text=readFileSync(join(root,v.public_readme),'utf8');
    if(!text.includes(v.evidence_phrase))throw Error('Source phrase not found '+k+': '+v.evidence_phrase);
    if(!v.reason||v.reason.length<30)throw Error('Insufficient review rationale '+k);
    if(v.official_galaxy_order!==null||v.official_unlock!==null)throw Error('Invented official order '+k);
    for(const concept of [...v.required_concepts,...v.rejected_concepts])
     if(!allowed.has(concept))throw Error('Unknown concept '+k+'/'+concept);
    const good=new Set(v.required_concepts),bad=new Set(v.rejected_concepts);
    if([...good].some(y=>bad.has(y)))throw Error('Contradictory concept verdict '+k);
    if(!Number.isInteger(v.recommended_stage)||v.recommended_stage<1||v.recommended_stage>8)throw Error('Invalid stage '+k);
    conceptsRemoved+=[...new Set(x.concepts)].filter(y=>!good.has(y)).length;
    conceptsAdded+=[...good].filter(y=>!x.concepts.includes(y)).length;
    c.phase17_review='manual_full_README_semantics_verified';
    c.phase17_effective_concepts=[...good];
    c.phase17_study_stage=v.recommended_stage;
    c.phase17_semantic_evidence={source:v.public_readme,evidence_phrase:v.evidence_phrase,
      rejected_concepts:[...bad],review_note:v.reason,source_type:'public_subject_README',
      official_galaxy_order:null,official_unlock:null};
    if(c.phase17_study_stage!==x.phase16_study_stage)changed++;
    applied.add(k);
   }else if(x.phase16_evidence_status==='community_source_identity_review_only'){
    c.phase17_review='community_identity_only_not_official';
    c.phase17_effective_concepts=[]; // no verified concepts from unverified archive
    c.phase17_study_stage=null; // no placement until identity is established
   }else if(priorHuman.has(x.phase16_evidence_status)){
    c.phase17_review='prior_human_review_no_new_semantic_check';
   }else if(x.phase16_evidence_status==='README_keyword_semantically_reviewed'){
    c.phase17_review='partial_keyword_semantic_review';
   }else if(x.phase16_evidence_status.startsWith('README_specific_')){
    c.phase17_review='pending_full_README_semantic_review';
   }
   // Earlier keyword hits and filename hints remain provisional, not independently verified.
   if(c.phase17_review==='pending_full_README_semantic_review'){
    const signals=x.source_concept_evidence.filter(h=>h.concept_evidence_type!=='manual');
    const suspicious=signals.filter(h=>h.concept==='files_cli'&&/argument/i.test(h.matched_text)||
      h.concept==='sorting'&&/order/i.test(h.matched_text)||
      h.concept==='tree_traversal'&&/order/i.test(h.matched_text)||
      h.concept==='promises'&&/reject/i.test(h.matched_text)||
      h.concept==='dom'&&/html|element|css/i.test(h.matched_text));
    const priority=(x.phase16_study_stage!==null&&x.phase16_study_stage<=3&&
       x.concepts.some(y=>['traits','lifetimes','generics','promises','dom','tree_traversal','binary_trees'].includes(y)))?'high':
       suspicious.length?'high':signals.length>=4?'medium':'normal';
    queue.push({language,exercise:x.exercise,source:x.public_readme,
      prior_stage:x.phase16_study_stage,prior_concepts:x.concepts,keyword_evidence:signals,
      suspicious_matches:suspicious,priority,reason:'Specific README keywords are not yet full semantic interpretation'});
   }
   c.official_galaxy_order=null;
   c.official_unlock_conditions=null;
   c.official_piscine_membership='not_established';
   return c;
  });
  languages[language]={summary:{total:cards.length,
   full_semantic_reviews:cards.filter(x=>x.phase17_review==='manual_full_README_semantics_verified').length,
   pending_full_semantic_review:cards.filter(x=>x.phase17_review==='pending_full_README_semantic_review').length,
   community_identity_only:cards.filter(x=>x.phase17_review==='community_identity_only_not_official').length},exercise_cards:cards};
 }
 if(applied.size!==reviews.size)throw Error('Unapplied manual source reviews: '+(reviews.size-applied.size));
 const all=Object.values(languages).flatMap(x=>x.exercise_cards);
 if(all.length!==316||reviews.size!==30)throw Error('Unexpected source coverage '+all.length+'/'+reviews.size);
 queue.sort((a,b)=>({high:0,medium:1,normal:2}[a.priority]-{high:0,medium:1,normal:2}[b.priority])||
   a.language.localeCompare(b.language)||a.exercise.localeCompare(b.exercise));
 return {schema_version:'1.0',as_of:'2026-11-03',
  caveat:'This is a provisional independent learning sequence, not official 01Edu Galaxy ordering or hidden grading. Full semantic reviews are distinct from partial keyword checks. Unverified community sources are excluded from confirmed learning stages.',
  summary:{total:all.length,new_full_readme_semantic_reviews:applied.size,
   newly_changed_stages:changed,prior_concept_tags_removed:conceptsRemoved,
   manually_supported_concept_tags_added:conceptsAdded,
   pending_full_readme_reviews:queue.length,
   excluded_community_identity_only:all.filter(x=>x.phase17_review==='community_identity_only_not_official').length,
   fully_manual_reviewed_from_prior_phases:all.filter(x=>priorHuman.has(x.phase16_evidence_status)).length,
   partially_checked_keyword_cases:all.filter(x=>x.phase17_review==='partial_keyword_semantic_review').length},
  languages,semantic_review_queue:queue};
}
export function renderGuide(data,language){
 const group=data.languages[language],lines=[
 '# '+language.toUpperCase()+' Piscine — Phase 17 source-reviewed progression','',
 '**Independent study order, not official 01Edu Galaxy quests, unlocks, or audit grades.**',
 'Manual semantic checks are distinguished from automatic keyword evidence.',''];
 for(let stage=1;stage<=8;stage++){
  const xs=group.exercise_cards.filter(x=>x.phase17_study_stage===stage)
    .sort((a,b)=>(a.estimated_difficulty??999)-(b.estimated_difficulty??999)||a.exercise.localeCompare(b.exercise));
  lines.push('## Stage '+stage,'');
  for(const x of xs){
   const link=x.public_readme?'['+x.exercise+'](https://github.com/01-edu/public/blob/master/'+x.public_readme+')':x.exercise;
   const note=x.phase17_semantic_evidence?' — '+x.phase17_semantic_evidence.review_note:'';
   lines.push('- '+link+' — '+x.phase17_review+'; concepts: '+(x.phase17_effective_concepts.join(', ')||'unverified')+note);
  }
  lines.push('');
 }
 lines.push('## Not placed: unverified community archive identities','');
 for(const x of group.exercise_cards.filter(x=>x.phase17_study_stage===null))
  lines.push('- '+x.exercise+' — '+x.phase17_review+'; official membership unknown');
 lines.push('','## Assessment','',
 'Complete the original, independently designed stage mastery assessment in the Phase 17 assessment blueprint. It is not an official 01Edu audit.','');
 return lines.join('\n');
}
export function renderAssessments(spec){
 const lines=['# Three Piscines — Original stage mastery assessments','',
 '**These 24 assessments are independently designed. They are NOT official 01Edu subjects, audits, pass conditions or Galaxy unlocks.**','',
 '## Scoring rubric','',
 '- Correctness: '+spec.rubric.correctness+' points',
 '- Boundary and failure cases: '+spec.rubric.boundary_and_failure_cases+' points',
 '- Automated tests: '+spec.rubric.automated_tests+' points',
 '- Explanation and maintainability: '+spec.rubric.explanation_and_maintainability+' points',
 '- Proposed mastery gate: '+spec.rubric.pass_total+'/100 overall and at least '+spec.rubric.min_correctness+' correctness points',''];
 for(const [language,rows] of Object.entries(spec.tracks)){
  lines.push('## '+language.toUpperCase(),'');
  for(const x of rows){
   lines.push('### Stage '+x.stage+' — '+x.title,'',
    '**Deliverable:** '+x.deliverable,'',
    '**Concepts:** '+x.concepts.join(', '),'',
    '**Verification checks:**','');
   for(const check of x.verification_checks)lines.push('- '+check);
   lines.push('','**Test command:** '+x.test_command,'',
    '**Submission evidence:** '+x.submission_evidence,'');
  }
 }
 return lines.join('\n')+'\n';
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 try{
  const root=resolve(process.argv[2]||'.'),out=resolve(process.argv[3]||'research/galaxy-audit/generated');
  const phase16=JSON.parse(readFileSync(join(out,'piscine-phase16-triaged-curriculum.json'),'utf8'));
  const verdicts=JSON.parse(readFileSync(join(root,'research/galaxy-audit/data/phase17-semantic-source-verdicts.json'),'utf8'));
  const data=applyReview(phase16,verdicts,root);
  const assessments=JSON.parse(readFileSync(join(root,'research/galaxy-audit/data/phase17-original-stage-assessments.json'),'utf8'));
  mkdirSync(out,{recursive:true});
  writeFileSync(join(out,'phase17-original-mastery-assessments.md'),renderAssessments(assessments));
  writeFileSync(join(out,'piscine-phase17-semantic-curriculum.json'),JSON.stringify(data,null,2)+'\n');
  writeFileSync(join(out,'piscine-phase17-pending-source-reviews.json'),JSON.stringify(data.semantic_review_queue,null,2)+'\n');
  for(const l of Object.keys(CONCEPTS))
   writeFileSync(join(out,l+'-phase17-semantic-study-guide.md'),renderGuide(data,l));
  console.log(JSON.stringify({summary:data.summary,by_language:Object.fromEntries(Object.entries(data.languages).map(([l,v])=>[l,v.summary]))},null,2));
 }catch(e){console.error(e.stack||String(e));process.exitCode=1;}
}
