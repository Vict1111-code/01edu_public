#!/usr/bin/env node
// Proposed pedagogical sequencing, NOT official 01Edu Galaxy unlock/quest order.
import {readFileSync,writeFileSync,mkdirSync,existsSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {pathToFileURL} from 'node:url';
const split=s=>s.trim().split(/\s+/).filter(Boolean);
export const STAGES={
go:['Shell, Git and environment','Go output, runes and loops','Functions, arithmetic and recursion','Strings, runes and CLI arguments','Slices, memory and parsing','Files, callbacks and sorting','Pointers and linked lists','Binary trees and integrated challenges'],
rust:['Cargo, primitives and functions','Control flow, arrays and strings','Ownership, borrowing and references','Structs, enums and errors','Collections and iterators','Traits, generics and lifetimes','Algorithms and mathematical structures','Applied Rust programs'],
javascript:['Environment, variables and functions','Control flow, strings and numbers','Arrays, objects and data structures','Functional JS, closures and transforms','Promises, async and APIs','DOM, events and browser basics','Advanced algorithms and text/data processing','Interactive applications and challenges']
};
const rust=[
'expected_variable scalar simple_hash bigger changes middle_day name_initials string_literals tuples_refs temperature_conv',
'arrays strings looping fibonacci2 find_factorial division_and_remainder speed_transformation reverse_string roman_numbers roman_numbers_iter capitalizing border_cross banner',
'ownership borrow borrow_me_the_reference copy delete_prefix to_url',
'error_types handling question_mark unwrap_or_expect doubtful panic blood_types mobs',
'collect groceries shopping_mall card_deck events arrange_it',
'traits generics lifetimes',
'hashing cipher string_permutation edit_distance lalgebra_scalar lalgebra_vector matrix matrix_ops matrix_mult matrix_transposition circle',
'boxing_todo tic_tac_toe commits_stats macro_calculator profanity_filter does_it_fit'
].map(split);
const javascript=[
'how-2-js primitives mutability declarations returns change is',
'abs more-or-less biggie-smalls min-max triangle dog-years fifty-shades-of-cold count-leap-years day-of-the-year date-is elementary long-words letter-space-number unicode-technical-report-35 cut-corners keep-cut method-man repeat',
'collections concat-str chunky circular flat slicer pick-omit invert manipulate-keys manipulate-values manipulate-entries index-of last-first-kiss replica deep-copy sortable get reverser',
'using-map using-filter using-reduce mapper filter reduce for-each currify curry-entries sweet-curry fusion same-amount sums has-city',
'all get-json get-them-all get-some-time keep-trying-or-giveup nasa debounce throttle flow',
'build-brick-and-break gossip-grid mouse-trap keycodes-symphony pick-and-click pimp-my-style neuron harder-bigger-bolder-stronger',
'match-cron valid-ip quantifiers find-expression its-a-match dr-strange physics molecules-cells series greedy-url group-price pronoun rebecca-black interpolation vowel-dots',
'block-chain flagger race pyramid where-do-we-go gougle-search unbreakable ion-out is-winner'
].map(split);
const toMap=groups=>new Map(groups.flatMap((group,i)=>group.map(id=>[id,i+1])));
const rustMap=toMap(rust),jsMap=toMap(javascript);
const goMap={'QUEST-01':1,'QUEST-02':2,'QUEST-03':3,'QUEST-04':3,'QUEST-05':4,'QUEST-06':4,'QUEST-07':5,'QUEST-08':6,'QUEST-09':6,'QUEST-11':7,'QUEST-12':8,'raid01':8,'raid02':8,'raid03':8,'hackaton':8};
const hints=[
[/\b(?:shell|git|chmod|permission)\b/i,'Unix, shell and Git'],
[/\b(?:rune|character|substring|strings?)\b/i,'Strings and Unicode'],
[/\b(?:recurs|fibonacci|factorial)\b/i,'Recursion'],
[/\b(?:array|slice|vector|Vec<)\b/i,'Arrays and collections'],
[/\b(?:ownership|borrow|lifetime)\b/i,'Ownership and memory safety'],
[/\b(?:struct|enum|trait)\b/i,'Data modeling'],
[/\b(?:error handling|Result<|Option<)\b/i,'Error handling'],
[/\b(?:linked list|binary tree|btree)\b/i,'Lists and trees'],
[/\b(?:Promise|async|await|fetch\()\b/i,'Asynchronous programming'],
[/\b(?:DOM|document\.|click event)\b/i,'DOM and events'],
[/\b(?:matrix|scalar|linear algebra)\b/i,'Linear algebra'],
[/\b(?:regex|regular expression)\b/i,'Regular expressions'],
[/\b(?:map\(|filter\(|reduce\()\b/i,'Functional programming']
];
export function classify(r,subject=''){
 const id=r.archive_exercise_id,lang=r.language;
 const stage=lang==='go'?(goMap[r.source_group]??null):lang==='rust'?(rustMap.get(id)??null):(jsMap.get(id)??null);
 const source=lang==='go'?'community_quest_folder_and_educational_mapping':'manual_topic_taxonomy';
 const concepts=hints.filter(([re])=>re.test(subject)).map(x=>x[1]).slice(0,5);
 return {language:lang,exercise:id,community_group:r.source_group,official_subject_path:r.official_subject_path,
  subject_match_status:r.match_status,proposed_stage:stage,
  stage_title:stage?STAGES[lang][stage-1]:'Unclassified / extra practice / needs review',
  estimated_difficulty:stage?Math.min(5,Math.ceil(stage*5/8)):null,
  pedagogical_order_basis:stage?source:'unclassified',
  confidence:stage&&r.match_status==='exact_top_level_subject'?'medium':'review_required',concepts_detected_in_official_readme:concepts,
  official_readme:r.official_readme,official_audit_readme:r.official_audit_readme,
  public_test_paths:[...(r.public_js_test_paths||[]),...(r.public_dom_test_paths||[])],
  official_galaxy_quest_position:null,community_group_is_official:false,
  notes:r.match_status==='exact_top_level_subject'?'Exact subject name match; proposed stage is educational estimate.':'Exercise identity requires verification.'};
}
export function build(crosswalk,root='.'){
 const exercises=crosswalk.records.map(r=>{
  const path=r.official_readme?join(root,r.official_readme):null;
  return classify(r,path&&existsSync(path)?readFileSync(path,'utf8'):'');
 });
 exercises.sort((a,b)=>a.language.localeCompare(b.language)||(a.proposed_stage??99)-(b.proposed_stage??99)||a.exercise.localeCompare(b.exercise));
 const summary={};
 for(const lang of Object.keys(STAGES)){
  const x=exercises.filter(r=>r.language===lang);
  summary[lang]={total:x.length,staged:x.filter(r=>r.proposed_stage!==null).length,
   needs_review:x.filter(r=>r.proposed_stage===null).length,
   stages:STAGES[lang].map((title,i)=>({stage:i+1,title,count:x.filter(r=>r.proposed_stage===i+1).length}))};
 }
 return {schema_version:'1.0',as_of:'2026-11-03',disclaimer:'Proposed educational difficulty progression, NOT official 01Edu/Galaxy quest order, unlock graph, or difficulty rating.',stage_definitions:STAGES,summary,exercises};
}
const quote=x=>'"'+String(x??'').replaceAll('"','""').replace(/\r?\n/g,' ')+'"';
export function csv(exercises){
 const keys=['language','proposed_stage','stage_title','estimated_difficulty','exercise','community_group','official_subject_path','subject_match_status','confidence','concepts_detected_in_official_readme','official_readme','official_audit_readme','public_test_paths','official_galaxy_quest_position'];
 return keys.map(quote).join(',')+'\n'+exercises.map(r=>keys.map(k=>quote(Array.isArray(r[k])?r[k].join(' | '):r[k])).join(',')).join('\n')+'\n';
}
export function guide(data,lang){
 const x=data.exercises.filter(r=>r.language===lang),summary=data.summary[lang];
 const lines=['# '+lang.toUpperCase()+' Piscine — proposed study order','',
  '**'+summary.total+' candidate records; '+summary.staged+' staged; '+summary.needs_review+' unclassified.**','',
  '**Not official 01Edu quest order or unlock rules.** Within-stage ordering is flexible.','','Each subject is linked to its public specification, where a name match exists.',''];
 for(let i=1;i<=8;i++){
  const group=x.filter(r=>r.proposed_stage===i);
  lines.push('## Stage '+i+': '+STAGES[lang][i-1],'Estimated difficulty '+Math.min(5,Math.ceil(i*5/8))+'/5; '+group.length+' archive records.','');
  for(const r of group){
   const url=r.official_readme?'https://github.com/01-edu/public/blob/master/'+r.official_readme:null;
   lines.push('- '+r.exercise+(url?' — '+url:' [subject name not verified]')+' (archive: '+r.community_group+')');
  }
  lines.push('');
 }
 lines.push('## Unclassified / optional practice / ambiguous identities','');
 for(const r of x.filter(r=>r.proposed_stage===null))lines.push('- '+r.exercise+' ('+r.community_group+'; '+r.subject_match_status+')');
 lines.push('','Use official README requirements and public tests; do not treat community solution code as a grading specification.','');
 return lines.join('\n');
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 try{
  const root=resolve(process.argv[2]||'.'),out=resolve(process.argv[3]||'research/galaxy-audit/generated');
  const crosswalk=JSON.parse(readFileSync(join(root,'research/galaxy-audit/data/three-piscines-subject-crosswalk.json'),'utf8'));
  const data=build(crosswalk,root);mkdirSync(out,{recursive:true});
  writeFileSync(join(out,'piscine-progressive-sequences.json'),JSON.stringify(data,null,2)+'\n');
  for(const lang of Object.keys(STAGES)){
   writeFileSync(join(out,lang+'-progressive-sequence.csv'),csv(data.exercises.filter(r=>r.language===lang)));
   writeFileSync(join(out,lang+'-progressive-study-guide.md'),guide(data,lang));
  }
  console.log(JSON.stringify(data.summary,null,2));
  if(data.exercises.length<300)throw Error('Too few exercise candidates');
 }catch(e){console.error(e.stack||String(e));process.exitCode=1;}
}
