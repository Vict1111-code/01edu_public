#!/usr/bin/env node
// Phase 12: public README evidence + independently authored mastery checks.
// Neither suggested difficulty nor documented source links establish official Galaxy unlock rules.
import {readFileSync,writeFileSync,mkdirSync,existsSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {pathToFileURL} from 'node:url';
import {build,STAGES} from './sequence-piscines.mjs';

export const GATES={
go:[
['Operate a shell, use Git, and explain filesystem permissions','Create a Git repository and shell utility; demonstrate recovery from invalid inputs','Fresh clone works; missing-file handling; clean Git history'],
['Implement loops, branches, rune output and formatting','Implement alphabet and combination generators without hardcoding complete outputs','Exact output; loop invariants; boundary tests'],
['Write pure functions and terminate recursive algorithms','Implement factorial, Fibonacci and recursive search with independent tests','Base cases; invalid values; stack/time complexity'],
['Process UTF-8 strings and command-line arguments','Implement text transformations and argument parsing','Empty and Unicode strings; stable formatting; error cases'],
['Use slices and implement parsing safely','Build a split/join/number conversion toolkit','Nil and empty input; aliasing; malformed input'],
['Use callbacks, file I/O and sorting','Build a file-to-sorted-records CLI tool','File errors; deterministic sorting; test coverage'],
['Preserve pointer and linked-list invariants','Implement linked-list insert, remove, reverse and lookup','Empty and singleton lists; head/tail changes; no cycles'],
['Traverse trees and integrate algorithms','Build binary tree traversal library and review its complexity','Unbalanced trees; callback order; reproducible tests']
],
rust:[
['Use Cargo, Rust types and compiler feedback','Build a small typed crate with unit tests','cargo test; clear function signatures; warnings explained'],
['Apply control flow, arrays, strings and iteration','Implement array and text utilities','Empty and UTF-8 input; boundary tests; avoid panics'],
['Explain moves, borrowing and references','Implement an API using owned outputs and borrowed inputs','No unnecessary clones; valid references; borrowing explanation'],
['Model data and errors with structs, enums and Result','Build a typed input parser','Malformed inputs; typed errors; no uncontrolled unwrap'],
['Use collections and iterators','Implement collection aggregation and filtering','Duplicates; ordering; empty collections'],
['Design reusable traits, generics and lifetimes','Build generic typed utilities and borrowed accessors','Multiple types; trait bounds; lifetime correctness'],
['Solve algorithmic and matrix problems','Implement matrix arithmetic and a dynamic-programming algorithm','Dimension rules; independent examples; complexity'],
['Integrate modules, parsing and error handling','Build a CLI/API parsing application with tests','Malformed files; clean modules; reproducible build']
],
javascript:[
['Run JS and explain values, types and functions','Implement pure functions with a repeatable runner','Type edge cases; test inputs; reproducible execution'],
['Use branching, loops, numbers and strings','Build a number/string utilities module','Fractional/negative/empty inputs; branch coverage'],
['Work with arrays, objects and references','Implement nested object access and copy/transform helpers','Missing keys; mutation policy; sparse arrays'],
['Apply callbacks, closures and functional methods','Implement custom map/filter/reduce and currying','Empty arrays; callback contracts; immutable results'],
['Handle Promises, fetch and JSON','Build a robust asynchronous JSON client','HTTP failures; invalid JSON; mocked fetch tests'],
['Manipulate DOM and browser events','Build an interactive page with timers and controls','DOM structure; event cleanup; accessibility'],
['Use regex, dates and data algorithms','Implement a validation and normalization toolkit','Malformed/Unicode data; date boundaries; complexity'],
['Integrate UI, state and asynchronous logic','Build an interactive browser application','Loading/error/empty states; consistent state; browser test plan']
]};
export function evidence(md){
 const headings=[...md.matchAll(/^#{2,5}\s+(.+)$/gm)].map(x=>x[1].trim()).slice(0,16);
 const h=/^#{2,5}\s+Instructions?\s*$/im.exec(md);
 let body='';
 if(h){const tail=md.slice(h.index+h[0].length);const stop=tail.search(/^#{2,5}\s+\S/gm);body=stop<0?tail:tail.slice(0,stop);}
 const plain=body.replace(/\x60{3}[\s\S]*?\x60{3}/g,' ').replace(/\[([^\]]+)\]\([^)]+\)/g,'$1').replace(/[*_#<>|]/g,' ').replace(/\s+/g,' ').trim();
 const flags=[
 [/must not|do not|not allowed/i,'prohibition'],[/only|without/i,'scope_restriction'],
 [/recurs/i,'recursion'],[/return nil|return 0|error/i,'error_behavior'],
 [/ascending order|sorted/i,'ordering'],[/unicode|utf-8/i,'unicode'],
 [/ownership|borrow|compile.time/i,'memory_type_rules']
 ].filter(([re])=>re.test(body)).map(([,label])=>label);
 return {headings,instructions_present:!!h,instruction_excerpt:plain.slice(0,320)||null,
  excerpt_is_partial:true,expected_section:/^#{2,5}\s+Expected\b/im.test(md),
  notions_section:/^#{2,5}\s+Notions?\b/im.test(md),
  requirement_signals:flags,external_resource_links:[...md.matchAll(/\[[^\]]+\]\((https?:\/\/[^)]+)\)/g)].map(x=>x[1]).slice(0,10),
  note:'Read complete README; excerpt and keyword flags are not an audit rubric.'};
}
export function makeCards(cross,graph,root){
 const base=build(cross,root),groups=new Map();
 for(const x of base.exercises){const key=x.language+'::'+x.exercise;if(!groups.has(key))groups.set(key,[]);groups.get(key).push(x);}
 const cards=[];
 for(const variants of groups.values()){
  const v=variants.find(x=>x.subject_match_status==='exact_top_level_subject')||variants[0];
  const path=v.official_readme?join(root,v.official_readme):null;
  const ev=path&&existsSync(path)?evidence(readFileSync(path,'utf8')):null;
  const stages=[...new Set(variants.map(x=>x.proposed_stage).filter(x=>x!==null))];
  const conflict=stages.length>1,stage=conflict?null:v.proposed_stage;
  const refs=(graph.edges||[]).filter(e=>e.to===v.official_subject_path).map(e=>({
   from:e.from,to:e.to,relation:e.relation,source_url:e.source_url,
   official_unlock:'not_established'
  }));
  const gate=stage?GATES[v.language][stage-1]:null;
  cards.push({language:v.language,exercise:v.exercise,archive_records:variants.length,
   community_groups:[...new Set(variants.map(x=>x.community_group))],
   official_subject_path:v.official_subject_path,official_readme:v.official_readme,
   official_audit:v.official_audit_readme,public_test_paths:v.public_test_paths,
   proposed_stage:stage,estimated_difficulty:stage?Math.min(5,Math.ceil(stage*5/8)):null,
   stage_conflict:conflict,stage_conflict_candidates:conflict?stages:[],
   requirement_evidence:ev,documented_public_references:refs,
   suggested_learning_objective:gate?.[0]||null,
   suggested_mastery_challenge:gate?.[1]||null,
   suggested_mastery_checks:gate?.[2]?.split('; ')||[],
   official_galaxy_order:null,official_difficulty:null,
   evidence_boundary:'README excerpts and public reference links are source-derived; stage and mastery content are independently authored.'});
 }
 cards.sort((a,b)=>a.language.localeCompare(b.language)||(a.proposed_stage??99)-(b.proposed_stage??99)||a.exercise.localeCompare(b.exercise));
 const summary={};
 for(const lang of Object.keys(GATES)){
  const x=cards.filter(c=>c.language===lang);
  summary[lang]={unique_exercises:x.length,readme_read:x.filter(c=>c.requirement_evidence).length,
   instructions_sections:x.filter(c=>c.requirement_evidence?.instructions_present).length,
   notions_sections:x.filter(c=>c.requirement_evidence?.notions_section).length,
   expected_sections:x.filter(c=>c.requirement_evidence?.expected_section).length,
   public_tests:x.filter(c=>c.public_test_paths.length).length,
   documented_reference_targets:x.filter(c=>c.documented_public_references.length).length,
   stage_conflicts:x.filter(c=>c.stage_conflict).length,
   unclassified:x.filter(c=>c.proposed_stage===null).length};
 }
 return {schema_version:'1.0',as_of:'2026-11-03',
  disclaimer:'Independently authored mastery gates and pedagogical stages are not official Galaxy assessments, prerequisites or unlock order.',
  stage_mastery_gates:GATES,summary,exercise_cards:cards};
}
export function guide(data,lang){
 const cards=data.exercise_cards.filter(x=>x.language===lang);
 const lines=['# '+lang.toUpperCase()+' Piscine — source requirements and mastery gates','',
 '**Not an official 01Edu assessment or unlock sequence.** Source evidence is distinct from proposed learning checks.',''];
 for(let i=1;i<=8;i++){
  const [goal,challenge,checks]=GATES[lang][i-1],items=cards.filter(x=>x.proposed_stage===i);
  lines.push('## Stage '+i+': '+STAGES[lang][i-1],'',
   '**Learning objective:** '+goal+'.',
   '**Independent assessment:** '+challenge+'.',
   '**Pass criteria to self-check:** '+checks+'.',
   '**Unique candidate exercises:** '+items.length,'');
  for(const x of items){
   const url=x.official_readme?'https://github.com/01-edu/public/blob/master/'+x.official_readme:null;
   const refs=x.documented_public_references.length?' | public references: '+x.documented_public_references.map(e=>e.from+' ('+e.relation+')').join(', '):'';
   lines.push('- '+x.exercise+(url?' — '+url:' [unverified subject]')+refs+
    (x.requirement_evidence?.requirement_signals.length?' | README flags: '+x.requirement_evidence.requirement_signals.join(', '):''));
  }
  lines.push('');
 }
 lines.push('## Unclassified / conflicting candidates','');
 for(const x of cards.filter(x=>x.proposed_stage===null))lines.push('- '+x.exercise+' ('+x.community_groups.join(', ')+')'+(x.stage_conflict?' — conflicting group stages':''));
 lines.push('','## Evidence boundary','',
 '- Source README excerpts are partial. Read the full instructions before implementation.',
 '- Linked tests/audits are public file matches, not proof of official private grading.',
 '- Documented public subject references do not establish official Galaxy unlocks.',
 '- Independent mastery tasks and pass criteria are recommendations, not official rubrics.','');
 return lines.join('\n');
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 try{
  const root=resolve(process.argv[2]||'.'),out=resolve(process.argv[3]||'research/galaxy-audit/generated');
  const cross=JSON.parse(readFileSync(join(root,'research/galaxy-audit/data/three-piscines-subject-crosswalk.json'),'utf8'));
  const graph=JSON.parse(readFileSync(join(root,'research/galaxy-audit/data/curated-graph-snapshot.json'),'utf8'));
  const data=makeCards(cross,graph,root);mkdirSync(out,{recursive:true});
  writeFileSync(join(out,'piscine-competency-evidence.json'),JSON.stringify(data,null,2)+'\n');
  for(const lang of Object.keys(GATES))writeFileSync(join(out,lang+'-mastery-and-requirements.md'),guide(data,lang));
  console.log(JSON.stringify(data.summary,null,2));
  if(data.exercise_cards.length<250)throw Error('Too few unique exercises');
 }catch(e){console.error(e.stack||String(e));process.exitCode=1;}
}
