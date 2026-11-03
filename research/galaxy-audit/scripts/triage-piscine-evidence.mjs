#!/usr/bin/env node
// Phase 16: reconcile all 110 low-evidence candidates with either a manually
// reviewed public README (76) or source-inspected community archive (34).
// Never promote a learner file to an official 01Edu assignment by name.
import {readFileSync,writeFileSync,mkdirSync,existsSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {CONCEPTS} from './build-concept-prerequisites.mjs';
const TARGET=new Set(['README_generic_terms_only','name_only_unverified','README_inspected_no_match','no_public_README']);
const SPECIFIC=new Set(['README_specific_instruction_keyword','README_specific_notions_keyword']);
const RISK_PATTERNS=[
 ['javascript','dom',/^(element|elements)$/i,'Array elements can be mistaken for DOM elements'],
 ['rust','traits',/^(implement|impl)$/i,'Implementing a function does not imply Rust traits'],
 ['rust','applications',/^(file|files|api)$/i,'Generic file/API terminology is not a project requirement'],
 ['go','parsing',/^binary$/i,'Binary-tree mentions do not establish numeric parsing'],
 ['go','files_cli',/^(file|files)$/i,'File mention alone does not establish CLI/file I/O']
];
const key=x=>x.language+'::'+x.exercise;
export function merge(p15,manual,archive,root){
 const manualMap=new Map(manual.records.map(x=>[key(x),x]));
 const archiveMap=new Map(archive.records.map(x=>[x.language+'::'+x.archive_exercise_id,x]));
 if(manualMap.size!==76||archiveMap.size!==34)throw Error('Unexpected manual/archive input count');
 const all=[],reconciled=[],reviewQueue=[],languages={};
 for(const [language,group] of Object.entries(p15.languages)){
  const cards=[];
  for(const x of group.exercise_cards){
   const k=key(x),isTarget=TARGET.has(x.evidence_status);
   const human=manualMap.get(k),learner=archiveMap.get(k);
   if(human&&learner)throw Error('Duplicate evidence classes '+k);
   if(isTarget&&(!human&&!learner))throw Error('Low-evidence case not reviewed: '+k);
   if(!isTarget&&(human||learner))throw Error('Unexpected review outside target: '+k);
   let result={...x,phase16_evidence_status:x.evidence_status,
    phase16_source_review:null,phase16_manual_concepts:[],
    phase16_study_stage:x.recommended_stage,official_galaxy_order:null,official_piscine_membership:'not_established'};
   if(human){
    const readme=join(root,human.evidence_source);
    if(!existsSync(readme))throw Error('Reviewed public README missing '+k);
    const allowed=new Set(CONCEPTS[language].nodes);
    for(const concept of human.manual_concepts)if(!allowed.has(concept))throw Error('Unknown manual concept '+k+'/'+concept);
    if(!Number.isInteger(human.recommended_stage)||human.recommended_stage<1||human.recommended_stage>8)throw Error('Invalid stage '+k);
    result.phase16_evidence_status='manual_public_README_review';
    result.phase16_source_review={type:'public_subject_README',path:human.evidence_source,
      note:human.review_note,review_method:'manual_instruction_read',official_quest:null};
    result.phase16_manual_concepts=human.manual_concepts;
    result.concepts=[...new Set([...human.manual_concepts,...x.concepts])];
    result.phase16_study_stage=human.recommended_stage;
    reconciled.push({language,exercise:x.exercise,source_type:'public_README',original_status:x.evidence_status,
      old_stage:x.recommended_stage,new_stage:result.phase16_study_stage,review_note:human.review_note});
   }else if(learner){
    if(learner.official_assignment_verified!==false)throw Error('Community source wrongly verified '+k);
    result.phase16_evidence_status='community_source_identity_review_only';
    result.phase16_source_review={type:'community_archive_source',path:learner.archive_relative_path,
      source_disposition:learner.disposition,possible_public_subject:learner.possible_public_subject,
      evidence:learner.evidence,official_assignment_verified:false,solution_correctness_verified:false};
    // Do not inherit a confirmed concept or official stage from an unverified learner file.
    reconciled.push({language,exercise:x.exercise,source_type:'community_archive',original_status:x.evidence_status,
      old_stage:x.recommended_stage,new_stage:result.phase16_study_stage,identity_disposition:learner.disposition});
   }else if(SPECIFIC.has(x.evidence_status)){
    const flags=[];
    for(const hit of x.source_concept_evidence||[]){
     for(const [l,c,pattern,reason] of RISK_PATTERNS)
      if(l===language&&c===hit.concept&&pattern.test(hit.matched_text))
       flags.push({concept:c,matched_text:hit.matched_text,reason});
    }
    if(flags.length)reviewQueue.push({language,exercise:x.exercise,flags,
      public_readme:x.public_readme,estimated_difficulty:x.estimated_difficulty,
      recommended_stage:x.recommended_stage,priority:'keyword_ambiguity'});
    result.phase16_evidence_status=flags.length?'README_keyword_needs_semantic_check':x.evidence_status;
   }
   cards.push(result);all.push(result);
  }
  const local=reconciled.filter(x=>x.language===language);
  languages[language]={summary:{total:cards.length,public_README_manual_reviews:local.filter(x=>x.source_type==='public_README').length,
   community_source_identity_reviews:local.filter(x=>x.source_type==='community_archive').length,
   manual_stage_changes:local.filter(x=>x.source_type==='public_README'&&x.old_stage!==x.new_stage).length,
   keyword_ambiguity_flags:reviewQueue.filter(x=>x.language===language).length},exercise_cards:cards};
 }
 if(all.length!==316||reconciled.length!==110)throw Error('Coverage mismatch '+all.length+'/'+reconciled.length);
 if(reconciled.filter(x=>x.source_type==='public_README').length!==76)throw Error('README review coverage mismatch');
 if(reconciled.filter(x=>x.source_type==='community_archive').length!==34)throw Error('Archive review coverage mismatch');
 const output={schema_version:'1.0',as_of:'2026-11-03',
  methodology:'110 low-evidence candidates accounted for: 76 full public README manual reviews, 34 learner archive identity-only reviews. Other 206 cases retain prior evidence classifications. Source keywords remain non-authoritative.',
  summary:{total:all.length,low_evidence_cases_triaged:reconciled.length,manual_public_readmes:76,
   archive_identity_only:34,manual_stage_changes:reconciled.filter(x=>x.source_type==='public_README'&&x.old_stage!==x.new_stage).length,
   suspicious_specific_keyword_cases:reviewQueue.length},languages,reconciled,keyword_semantic_review_queue:reviewQueue};
 return output;
}
export function guide(data,language){
 const group=data.languages[language],lines=['# '+language.toUpperCase()+' Piscine — Phase 16 reviewed exercise sequence','',
 '**Not official 01Edu Galaxy ordering.** Community archive files are not proven assignments. A stage is an independent study recommendation.',''];
 for(let stage=1;stage<=8;stage++){
  const rows=group.exercise_cards.filter(x=>x.phase16_study_stage===stage).sort((a,b)=>(a.estimated_difficulty??999)-(b.estimated_difficulty??999)||a.exercise.localeCompare(b.exercise));
  lines.push('## Stage '+stage,'',rows.length+' candidates, provisional ordering by prior difficulty heuristic.','');
  for(const x of rows){
   const url=x.public_readme?'https://github.com/01-edu/public/blob/master/'+x.public_readme:null;
   lines.push('- '+(url?'['+x.exercise+']('+url+')':x.exercise)+' — '+x.phase16_evidence_status+
    (x.phase16_manual_concepts.length?'; manually reviewed: '+x.phase16_manual_concepts.join(', '):'')+
    (x.phase16_study_stage!==x.recommended_stage?' **[stage revised]**':''));
  }
  lines.push('');
 }
 const unknown=group.exercise_cards.filter(x=>x.phase16_study_stage==null);
 lines.push('## Unplaced community archive candidates','');
 for(const x of unknown)lines.push('- '+x.exercise+' — '+x.phase16_source_review?.source_disposition+'; official identity not established');
 lines.push('','## Human review boundaries','',
 'Public README interpretations are independent teaching judgments; some instructions rely on supplied examples or test restrictions. An archive source review checks identity only, not solution correctness. No official unlock or quest number was assigned.','');
 return lines.join('\n');
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 try{
  const root=resolve(process.argv[2]||'.'),out=resolve(process.argv[3]||'research/galaxy-audit/generated');
  const p15=JSON.parse(readFileSync(join(out,'piscine-readme-concept-evidence-phase15.json'),'utf8'));
  const manual=JSON.parse(readFileSync(join(root,'research/galaxy-audit/data/phase16-manual-readme-classifications.json'),'utf8'));
  const archive=JSON.parse(readFileSync(join(root,'research/galaxy-audit/data/phase14-source-inspected-identity-review.json'),'utf8'));
  const data=merge(p15,manual,archive,root);mkdirSync(out,{recursive:true});
  writeFileSync(join(out,'piscine-phase16-triaged-curriculum.json'),JSON.stringify(data,null,2)+'\n');
  writeFileSync(join(out,'piscine-phase16-keyword-review-queue.json'),JSON.stringify(data.keyword_semantic_review_queue,null,2)+'\n');
  for(const language of Object.keys(CONCEPTS))writeFileSync(join(out,language+'-phase16-reviewed-study-guide.md'),guide(data,language));
  console.log(JSON.stringify({summary:data.summary,languages:Object.fromEntries(Object.entries(data.languages).map(([l,v])=>[l,v.summary]))},null,2));
 }catch(e){console.error(e.stack||String(e));process.exitCode=1;}
}
