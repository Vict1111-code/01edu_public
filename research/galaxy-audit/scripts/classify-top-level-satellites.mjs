#!/usr/bin/env node
// Phase 21 classification: audited top-level public subjects, not official Galaxy course order.
import {readFileSync,existsSync,mkdirSync,writeFileSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {pathToFileURL} from 'node:url';
const base='research/galaxy-audit/data/';
export function audit(root){
 const idx=JSON.parse(readFileSync(join(root,base+'subject-node-index.json'),'utf8'));
 const p19=JSON.parse(readFileSync(join(root,base+'phase19-imperative-project-map.json'),'utf8'));
 const p20=JSON.parse(readFileSync(join(root,base+'phase20-imperative-satellites.json'),'utf8'));
 const p21=JSON.parse(readFileSync(join(root,base+'phase21-audited-top-level-classification.json'),'utf8'));
 const top=idx.nodes.filter(x=>x.depth===1),audited=top.filter(x=>x.audit_readme_sha);
 const prior=new Set([...p19.parents.map(x=>x.id),...p20.profiles.map(x=>x.id),
  '0-shell','multiplayer-fps','localhost','rt','filler','smart-road','make-your-game',
  'real-time-forum','graphql','social-network','mini-framework']);
 const remaining=audited.filter(x=>!prior.has(x.path));
 if(top.length!==792||audited.length!==56||remaining.length!==33)
  throw Error('Unexpected source index counts: '+JSON.stringify({top:top.length,audited:audited.length,remaining:remaining.length}));
 const want=new Map(remaining.map(x=>[x.path,x])),entries=[],ids=new Set(),unmatched=[];
 for(const e of p21.entries){
  if(ids.has(e.id)||!want.has(e.id))throw Error('Duplicate or unindexed source '+e.id);
  ids.add(e.id);
  if(e.source_path!=='subjects/'+e.id+'/README.md'||e.audit_path!=='subjects/'+e.id+'/audit/README.md')
   throw Error('Bad source path '+e.id);
  const src=join(root,e.source_path),aud=join(root,e.audit_path);
  if(!existsSync(src)||!existsSync(aud))throw Error('README or audit missing: '+e.id);
  const txt=readFileSync(src,'utf8'),a=readFileSync(aud,'utf8');
  const normalize=s=>s.replace(/[\x60*_]/g,'').replace(/\s+/g,' ').toLowerCase();
  if(!normalize(txt).includes(normalize(e.source_phrase)))unmatched.push({id:e.id,phrase:e.source_phrase});
  if(!a.trim())throw Error('Empty audit '+e.id);
  if(e.official_galaxy_track!==null||e.official_unlock!==null)throw Error('Invented official data');
  const node=want.get(e.id);
  entries.push({...e,public_subject_sha:node.readme_sha,public_audit_sha:node.audit_readme_sha,
   source_readable:true,audit_readable:true});
 }
 if(unmatched.length)throw Error('Source phrases not verified: '+JSON.stringify(unmatched));
 if(entries.length!==33||ids.size!==33)throw Error('Unclassified audited subject');
 const kept=top.filter(x=>!x.audit_readme_sha).map(x=>({
  id:x.path,source_path:'subjects/'+x.path+'/README.md',
  audit_indexed:false,classification:'not_reviewed_in_phase21',
  verified_language:null,official_galaxy_track:null,official_unlock:null
 }));
 const before=new Set([...p20.profiles.map(x=>x.id),...p19.parents.map(x=>x.id),
  '0-shell','multiplayer-fps','localhost','rt','filler','smart-road','make-your-game',
  'real-time-forum','graphql','social-network','mini-framework',...ids]);
 for(const edge of p21.source_relationships){
  if(!before.has(edge.from)||!before.has(edge.to)||edge.official_unlock!==null)
   throw Error('Invalid source relationship '+edge.from+' -> '+edge.to);
 }
 if(kept.length!==736)throw Error('Expected 736 top-level non-audited specs');
 return {schema_version:'1.0',as_of:'2026-11-04',
  warning:'Presence of audit README does not prove Galaxy track membership or compulsory project status. No assessment was executed.',
  overview:{top_level_public_subjects:top.length,audited_top_level_subjects:audited.length,
   earlier_core_subjects:17,earlier_sampled_satellites:6,newly_reviewed_audited_subjects:entries.length,
   remaining_top_level_subjects_without_indexed_audit:kept.length,
   all_top_level_subjects_accounted_for:top.length},
  audited_subject_classifications:entries,
  not_yet_semantically_classified_top_level_subjects:kept,
  public_source_relationships:p21.source_relationships};
}
export function markdown(x){
 const ls=['# Phase 21 — Other top-level project research','',
 'This categorization is for educational planning. **No official Galaxy membership or unlocks have been inferred.**','',
 'The audit index covers 56 of 792 top-level subjects. We inspected the 33 audited subjects not covered by earlier 17 core and six sampled satellite classifications.','',
 '| Public subject | Group | Language policy / practice | Related learning area |',
 '| --- | --- | --- | --- |'];
 for(const e of x.audited_subject_classifications)
  ls.push('| ['+e.id+'](https://github.com/01-edu/public/blob/master/'+e.source_path+') | '+
   e.category+' | '+e.language_policy+' | '+e.suggested_branch+' |');
 ls.push('','## Important cross-project source relationships','');
 for(const e of x.public_source_relationships)
  ls.push('- '+e.from+' → '+e.to+' — '+e.evidence_type+'. '+e.notes+'. Not an official unlock.');
 ls.push('','## What this phase does NOT claim','',
  '- The 736 other top-level subjects lack a directly indexed audit README in this snapshot. They remain in a separate research backlog; this does **not** imply they are invalid or lack tests elsewhere.',
  '- Directory placement and source cross-links are not evidence of compulsory Galaxy progression.',
  '- No grading or learner solutions were verified.','');
 return ls.join('\n');
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 try{
  const root=resolve(process.argv[2]||'.'),out=resolve(process.argv[3]||'research/galaxy-audit/generated');
  const d=audit(root);mkdirSync(out,{recursive:true});
  writeFileSync(join(out,'phase21-top-level-subject-classification.json'),JSON.stringify(d,null,2)+'\n');
  writeFileSync(join(out,'phase21-top-level-project-guide.md'),markdown(d));
  console.log(JSON.stringify(d.overview,null,2));
 }catch(e){console.error(e.stack||String(e));process.exitCode=1;}
}
