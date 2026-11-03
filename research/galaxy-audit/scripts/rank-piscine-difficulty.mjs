#!/usr/bin/env node
// Phase 13: calibrated pedagogical difficulty and cautious identity/dependency review.
// No private Galaxy data and no inference of official unlock or audit requirements.
import {readFileSync,writeFileSync,mkdirSync,existsSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {build,STAGES} from './sequence-piscines.mjs';

export function editDistance(a,b){
 const p=Array.from({length:b.length+1},(_,i)=>i);
 for(let i=1;i<=a.length;i++){
  let prev=p[0];p[0]=i;
  for(let j=1;j<=b.length;j++){const old=p[j];p[j]=Math.min(p[j]+1,p[j-1]+1,prev+(a[i-1]===b[j-1]?0:1));prev=old;}
 }
 return p[b.length];
}
const canonical=x=>x.toLowerCase().replace(/[-_]/g,'').replace(/(?:notmy|prog|test|copy|backup|v2)$/,'').replace(/\d+$/,'');
export function candidates(id,nodes){
 const key=canonical(id);
 if(key.length<5)return [];
 const matches=[];
 for(const path of nodes){
  if(path.includes('/'))continue;
  const target=canonical(path),d=editDistance(key,target),max=Math.max(key.length,target.length);
  const sim=1-d/max;
  if(sim>=0.75&&d<=Math.max(3,Math.ceil(max*.22)))matches.push({public_subject:path,similarity:+sim.toFixed(3),edit_distance:d,review_status:'name_only_unverified'});
 }
 return matches.sort((a,b)=>b.similarity-a.similarity||a.edit_distance-b.edit_distance||a.public_subject.localeCompare(b.public_subject)).slice(0,5);
}
const RULES=[
 {id:'recursion',pattern:/\brecurs(?:ion|ive|ivity)\b/i,weight:6,concept:'Recursion and call-stack reasoning'},
 {id:'pointers',pattern:/\bpointer|linked.list|\bNodeL\b/i,weight:7,concept:'Pointers and linked structures'},
 {id:'trees',pattern:/\bbinary tree|\bTreeNode\b|\bBTree[A-Z]/i,weight:8,concept:'Tree algorithms'},
 {id:'ownership',pattern:/\bownership|\bborrowing|\blifetimes?\b/i,weight:7,concept:'Rust memory safety'},
 {id:'generics',pattern:/\bgenerics?\b|\btrait(?:s)?\b|\btype parameters?\b/i,weight:6,concept:'Generic abstractions'},
 {id:'async',pattern:/\bPromise\b|\basync\b|\bfetch\b|\bawait\b/i,weight:7,concept:'Asynchronous programming'},
 {id:'dom',pattern:/\bDOM\b|\bdocument\.|\bHTML element\b|\bclick event\b/i,weight:6,concept:'Browser DOM and events'},
 {id:'files',pattern:/\bread.file|\bfile system|\bopen.file|\bJSON file\b/i,weight:4,concept:'File and data I/O'},
 {id:'errors',pattern:/\bhandle.*errors?\b|\bResult<|\bmalformed\b|\bpanic\b/i,weight:4,concept:'Failure handling'},
 {id:'matrix',pattern:/\bmatri(?:x|ces)\b|\blinear algebra\b/i,weight:7,concept:'Linear algebra'},
 {id:'algorithms',pattern:/\bcomplexity\b|\bbacktrack\b|\bdynamic programming\b|\bgraph\b/i,weight:6,concept:'Algorithmic reasoning'},
 {id:'testing',pattern:/\btest cases?\b|\bunit tests?\b|\btest suite\b/i,weight:3,concept:'Verification and testing'}
];
export function difficulty(md,stage){
 const m=/^#{2,5}\s+Instructions?\s*$/im.exec(md);
 let body=md;
 if(m){const tail=md.slice(m.index+m[0].length);const end=tail.search(/^#{2,5}\s+\S/gm);body=end<0?tail:tail.slice(0,end);}
 const noCode=body.replace(/\x60{3}[\s\S]*?\x60{3}/g,' ');
 const concepts=RULES.filter(x=>x.pattern.test(noCode)).map(x=>({id:x.id,concept:x.concept,weight:x.weight}));
 const lines=noCode.split(/\n/).filter(x=>/^\s*(?:[-*]|\d+\.)\s/.test(x)).length;
 const words=noCode.trim().split(/\s+/).filter(Boolean).length;
 const lengthSignal=words>450?8:words>220?5:words>90?2:0;
 const listSignal=lines>12?5:lines>5?3:0;
 const sourceComplexity=Math.min(38,concepts.reduce((n,x)=>n+x.weight,0)+lengthSignal+listSignal);
 const prior=stage?Math.round(8+stage*6.5):null;
 const score=prior===null?null:Math.min(100,prior+sourceComplexity);
 return {score,stage_prior:prior,source_complexity:sourceComplexity,
  signals:concepts,requirement_word_count:words,bullet_count:lines,
  difficulty_label:score===null?'unclassified':score<25?'introductory':score<45?'foundation':score<65?'intermediate':score<82?'advanced':'integrated_advanced',
  score_method:'estimated stage prior + bounded README text complexity; not an official or calibrated psychometric difficulty score'};
}
export function references(md,subject,nodes){
 const known=new Set(nodes);
 const out=[];
 const re=/\[[^\]]+\]\(\.\.\/([^/)]+)\/README\.md\)/g;
 for(const m of md.matchAll(re)){
  const target=m[1];if(!known.has(target)||target===subject)continue;
  const before=md.slice(Math.max(0,m.index-160),m.index);
  const after=md.slice(m.index+m[0].length,m.index+m[0].length+100);
  const context=(before+ ' '+after).replace(/\s+/g,' ').trim().slice(0,280);
  const isPrereq=/\breus(?:e|ing)\b|\bprevious\b|\balready\b|\bdefined in\b|\bbased on\b|\bneed\b|\brequir(?:e|es|ed)\b/i.test(context);
  out.push({from:target,to:subject,relation:isPrereq?'explicit_link_with_prerequisite_wording':'linked_subject_context_only',
   evidence_context:context,evidence_source:'subjects/'+subject+'/README.md',
   status:isPrereq?'source_wording_supports_dependency':'review_required',
   official_unlock:'not_established'});
 }
 return [...new Map(out.map(x=>[x.from+'->'+x.to,x])).values()];
}
export function buildReview(cross,nodeIndex,graph,root){
 const seq=build(cross,root),nodes=nodeIndex.nodes.map(x=>x.path),nodeSet=new Set(nodes);
 const unique=new Map();
 for(const e of seq.exercises){const k=e.language+'::'+e.exercise;if(!unique.has(k))unique.set(k,[]);unique.get(k).push(e);}
 const exercise_cards=[],identity_review=[];
 for(const variants of unique.values()){
  const x=variants[0],groups=[...new Set(variants.map(v=>v.community_group))];
  const stageSet=[...new Set(variants.map(v=>v.proposed_stage).filter(x=>x!==null))];
  const stage=stageSet.length>1?null:x.proposed_stage;
  const file=x.official_readme?join(root,x.official_readme):null;
  const md=file&&existsSync(file)?readFileSync(file,'utf8'):null;
  const diff=md?difficulty(md,stage):null;
  const suggested=!md?candidates(x.exercise,nodes):[];
  if(!md)identity_review.push({language:x.language,exercise:x.exercise,source_groups:groups,
   archive_records:variants.length,match_status:x.subject_match_status,suggestions:suggested,
   disposition:suggested.length?'review_possible_name_variant':'unresolved_no_safe_name_match',
   automatic_subject_reassignment:false});
  const local=md?references(md,x.official_subject_path,nodeSet):[];
  const curated=(graph.edges||[]).filter(e=>e.to===x.official_subject_path).map(e=>({
   from:e.from,to:e.to,relation:e.relation,evidence_source:x.official_readme,
   status:'curated_public_documentation',official_unlock:'not_established'}));
  const all=[...curated,...local.filter(e=>!curated.some(c=>c.from===e.from))];
  exercise_cards.push({language:x.language,exercise:x.exercise,source_groups:groups,
   archive_records:variants.length,official_readme:x.official_readme,
   proposed_stage:stage,stage_conflict:stageSet.length>1,
   difficulty:diff,public_subject_references:all,
   source_based_prerequisite_candidates:all.filter(e=>e.status==='curated_public_documentation'||e.status==='source_wording_supports_dependency'),
   identity_suggestions:suggested,official_galaxy_position:null,official_unlock_conditions:null});
 }
 exercise_cards.sort((a,b)=>a.language.localeCompare(b.language)||
  (a.difficulty?.score??999)-(b.difficulty?.score??999)||a.exercise.localeCompare(b.exercise));
 const summary={};
 for(const lang of Object.keys(STAGES)){
  const xs=exercise_cards.filter(x=>x.language===lang);
  summary[lang]={unique_candidates:xs.length,scored:xs.filter(x=>x.difficulty?.score!==null&&x.difficulty!==null).length,
   unscored:xs.filter(x=>!x.difficulty||x.difficulty.score===null).length,
   source_based_dependency_targets:xs.filter(x=>x.source_based_prerequisite_candidates.length).length,
   suggested_name_variants:identity_review.filter(x=>x.language===lang&&x.suggestions.length).length,
   unmatched_without_safe_suggestion:identity_review.filter(x=>x.language===lang&&!x.suggestions.length).length};
 }
 return {schema_version:'1.0',as_of:'2026-11-03',
  disclaimer:'Heuristic pedagogical difficulty, not official 01Edu rating. Name suggestions never establish identity. Source-based references never establish official Galaxy unlocks.',
  scoring_rules:RULES.map(({id,weight,concept})=>({id,weight,concept})),
  summary,exercise_cards,identity_review};
}
export function report(data,lang){
 const xs=data.exercise_cards.filter(x=>x.language===lang),unresolved=data.identity_review.filter(x=>x.language===lang);
 const lines=['# '+lang.toUpperCase()+' Piscine — calibrated provisional difficulty and source links','',
 '**Not official Galaxy ordering or assessment.** Scores are transparent heuristics, not measured learner performance.',''];
 for(let stage=1;stage<=8;stage++){
  const group=xs.filter(x=>x.proposed_stage===stage);
  lines.push('## Stage '+stage+' — '+STAGES[lang][stage-1],'',
   'Sorted by estimated requirement complexity within the stage; '+group.length+' unique candidates.','');
  for(const x of group){
   const score=x.difficulty?x.difficulty.score+'/100 ('+x.difficulty.difficulty_label+')':'not scored';
   const source=x.official_readme?'https://github.com/01-edu/public/blob/master/'+x.official_readme:'unmatched';
   const deps=x.source_based_prerequisite_candidates.map(e=>e.from).join(', ');
   lines.push('- **'+x.exercise+'** — '+score+' · '+source+(deps?' · documented prior reference: '+deps:''));
  }
  lines.push('');
 }
 lines.push('## Unclassified candidates','');
 for(const x of xs.filter(x=>x.proposed_stage===null))lines.push('- '+x.exercise+' ('+x.source_groups.join(', ')+')');
 lines.push('','## Unmatched subject-name review','',
  'All suggestions below are **unverified name similarity only**; no automatic remapping is made.','');
 for(const x of unresolved)lines.push('- '+x.exercise+' ('+x.source_groups.join(', ')+'): '+(x.suggestions.map(s=>s.public_subject+' ('+s.similarity+')').join(', ')||'no safe name suggestion'));
 lines.push('','## How to interpret','',
  'Read the complete README and actual public tests before implementation. Difficulty can vary greatly with background and restrictions. Linked subject references are not official Galaxy unlock rules.','');
 return lines.join('\n');
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 try{
  const root=resolve(process.argv[2]||'.'),out=resolve(process.argv[3]||'research/galaxy-audit/generated');
  const cross=JSON.parse(readFileSync(join(root,'research/galaxy-audit/data/three-piscines-subject-crosswalk.json'),'utf8'));
  const index=JSON.parse(readFileSync(join(root,'research/galaxy-audit/data/subject-node-index.json'),'utf8'));
  const graph=JSON.parse(readFileSync(join(root,'research/galaxy-audit/data/curated-graph-snapshot.json'),'utf8'));
  const data=buildReview(cross,index,graph,root);mkdirSync(out,{recursive:true});
  writeFileSync(join(out,'piscine-difficulty-and-dependency-review.json'),JSON.stringify(data,null,2)+'\n');
  writeFileSync(join(out,'piscine-unmatched-review.json'),JSON.stringify(data.identity_review,null,2)+'\n');
  for(const lang of Object.keys(STAGES))writeFileSync(join(out,lang+'-difficulty-ranked-guide.md'),report(data,lang));
  console.log(JSON.stringify(data.summary,null,2));
  if(data.exercise_cards.length<250)throw Error('Unexpectedly small crosswalk');
 }catch(e){console.error(e.stack||String(e));process.exitCode=1;}
}
