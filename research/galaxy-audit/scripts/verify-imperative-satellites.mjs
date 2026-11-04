#!/usr/bin/env node
import {readFileSync,existsSync,writeFileSync,mkdirSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
export function verify(root) {
 const base='research/galaxy-audit/data/';
 const mapped=JSON.parse(readFileSync(join(root,base+'phase20-imperative-satellites.json'),'utf8'));
 const prior=JSON.parse(readFileSync(join(root,base+'core-satellites-index.json'),'utf8'));
 const core=JSON.parse(readFileSync(join(root,base+'phase19-imperative-project-map.json'),'utf8'));
 const screenshot=JSON.parse(readFileSync(join(root,base+'screenshot-core-index.json'),'utf8'));
 const expected=new Set(prior.satellite_projects.map(x=>x.id));
 const seen=new Set(),out=[];
 if(expected.size!==6||mapped.profiles.length!==6)throw Error('Expected six sample satellite candidates');
 for(const p of mapped.profiles){
  if(!expected.has(p.id)||seen.has(p.id))throw Error('Unmatched or duplicate satellite: '+p.id);
  seen.add(p.id);
  if(p.source!=='subjects/'+p.id+'/README.md'||p.audit!=='subjects/'+p.id+'/audit/README.md')
    throw Error('Incorrect source path '+p.id);
  const s=join(root,p.source),a=join(root,p.audit);
  if(!existsSync(s)||!existsSync(a))throw Error('Missing public source or audit '+p.id);
  const subject=readFileSync(s,'utf8'),audit=readFileSync(a,'utf8');
  if(!subject.includes(p.verify_phrase))throw Error('Manual review phrase missing '+p.id);
  if(!audit.trim()||!/Functional|Sudoku|Quadrangle Checker/i.test(audit))throw Error('Audit content not read '+p.id);
  if(p.official_unlock!==null||p.official_mandatory_status!=='unknown'||p.graph_membership!=='unverified')
    throw Error('Official metadata fabricated '+p.id);
  const candidate=prior.satellite_projects.find(x=>x.id===p.id);
  if(!candidate.readme_sha||!candidate.audit_sha)throw Error('Prior source SHA missing '+p.id);
  if(screenshot.nodes.some(x=>x.id===p.id)&&p.graph_membership==='unverified'){
   throw Error('Unexpected screenshot-confirmed satellite '+p.id);
  }
  if(p.kind==='piscine_raid_candidate'){
   if(p.suggested_stage!==null||!/raid-testing\.md|This raid is based on/.test(subject+audit))
    throw Error('Claimed Piscine raid unsupported '+p.id);
  }
  if(p.kind==='rust_raid_or_architecture_candidate'){
   if(!/sdl2/.test(subject)||!/raid/i.test(audit)||p.suggested_stage!==null)
    throw Error('Rust context or raid evidence unsupported '+p.id);
  }
  if(p.kind==='standalone_optional_candidate'){
   if(!p.suggested_stage||p.language_policy==='learner_choice'&&!/choose the language/.test(subject))
    throw Error('Optional candidate classification problem '+p.id);
   if(p.language_policy==='go_required'&&!/written in \*\*Go\*\*/i.test(subject))
    throw Error('Go language mandate missing '+p.id);
  }
  out.push({id:p.id,classification:p.kind,language_policy:p.language_policy,study_stage:p.suggested_stage,
   concepts:p.concepts,source:p.source,audit:p.audit,source_sha_from_prior_index:candidate.readme_sha,
   audit_sha_from_prior_index:candidate.audit_sha,source_phrase:p.verify_phrase,source_confirmed:true,
   graph_membership:'unverified',official_unlock:null});
 }
 const nodes=new Set(core.parents.map(x=>x.id));
 for(const e of mapped.suggested_progression_edges){
  if(!nodes.has(e.from)||!seen.has(e.to)||e.relation!=='pedagogical_recommendation'||e.official_unlock!==null)
   throw Error('Invalid or official-looking satellite dependency');
 }
 const c={optional:out.filter(x=>x.classification==='standalone_optional_candidate'),
  reclassified:out.filter(x=>x.classification!=='standalone_optional_candidate')};
 if(c.optional.length!==3||c.reclassified.length!==3)throw Error('Unbalanced categories');
 return{schema_version:'1.0',as_of:'2026-11-04',scope:'Previously sampled six satellites only, not complete Galaxy option list',
  verified_subject_and_audit_count:out.length,confirmed_official_Galaxy_positions:0,
  optional_imperative_learning_candidates:c.optional,
  separately_classified_raid_or_rust_candidates:c.reclassified,
  recommended_non_official_edges:mapped.suggested_progression_edges,
  source_limitation:'Six candidates are a targeted sample from an earlier research index; many other public subjects may be relevant.'};
}
export function guide(x){
 const lines=['# Phase 20 — Imperative satellites and Piscine raid separation','',
 '**The six records are a targeted sample, not the entire public optional-project catalog.**','',
 'Public README and audit identity has been checked. **Official Galaxy location and unlock status remain unknown.**','',
 '## Post-Piscine optional learning candidates',''];
 for(const p of x.optional_imperative_learning_candidates)
  lines.push('### '+p.id,'','- Suggested placement: '+p.study_stage,
   '- Programming-language policy: '+p.language_policy,'- Concepts: '+p.concepts.join(', '),
   '- [Read subject](https://github.com/01-edu/public/blob/master/'+p.source+')',
   '- [Read public audit](https://github.com/01-edu/public/blob/master/'+p.audit+')','');
 lines.push('## Separate from Imperative optional projects','');
 for(const p of x.separately_classified_raid_or_rust_candidates)
  lines.push('- **'+p.id+'** — '+p.classification+'; [source](https://github.com/01-edu/public/blob/master/'+p.source+')');
 lines.push('','## Evidence policy','',
  'None of the proposed satellite links is an official progression gate. Quadchecker explicitly describes itself as a raid; sudoku links to Go raid testing; road_intersection uses Rust SDL2 documentation and a raid-oriented audit. These are classified separately.','');
 return lines.join('\n');
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 try{
  const root=resolve(process.argv[2]||'.'),dir=resolve(process.argv[3]||'research/galaxy-audit/generated'),x=verify(root);
  mkdirSync(dir,{recursive:true});
  writeFileSync(join(dir,'phase20-imperative-satellite-verification.json'),JSON.stringify(x,null,2)+'\n');
  writeFileSync(join(dir,'phase20-imperative-satellite-guide.md'),guide(x));
  console.log(JSON.stringify({verified:x.verified_subject_and_audit_count,optional:x.optional_imperative_learning_candidates.length,
   reclassified:x.separately_classified_raid_or_rust_candidates.length,official_position_confirmed:x.confirmed_official_Galaxy_positions},null,2));
 }catch(e){console.error(e.stack||String(e));process.exitCode=1;}
}
