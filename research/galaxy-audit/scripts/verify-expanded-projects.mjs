#!/usr/bin/env node
import {readFileSync,existsSync,writeFileSync,mkdirSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {createHash} from 'node:crypto';
import {pathToFileURL} from 'node:url';
const sha=s=>createHash('sha256').update(s).digest('hex');
const normal=s=>s.replace(/[*_]/g,'').replaceAll(String.fromCharCode(96),'').replace(/\s+/g,' ').trim().toLowerCase();
export function build(root){
 const base='research/galaxy-audit/data/';
 const j=JSON.parse(readFileSync(join(root,base+'phase21-expanded-project-candidates.json'),'utf8'));
 const index=JSON.parse(readFileSync(join(root,base+'subject-node-index.json'),'utf8'));
 const known=JSON.parse(readFileSync(join(root,base+'screenshot-core-index.json'),'utf8'));
 const satellites=JSON.parse(readFileSync(join(root,base+'core-satellites-index.json'),'utf8'));
 const prior=JSON.parse(readFileSync(join(root,base+'phase20-imperative-satellites.json'),'utf8'));
 const top=index.nodes.filter(x=>x.depth===1);
 const audited=top.filter(x=>x.audit_readme_sha);
 const covered=new Set([...known.nodes.map(x=>x.id),...satellites.satellite_projects.map(x=>x.id)]);
 const expected=audited.filter(x=>!covered.has(x.path));
 if(top.length!==792||audited.length!==56||expected.length!==33||j.records.length!==33)
  throw Error('Unexpected audited-index scope');
 const exp=new Set(expected.map(x=>x.path)),seen=new Set(),records=[];
 for(const r of j.records){
  if(!exp.has(r.id)||seen.has(r.id))throw Error('Invalid or duplicate additional project '+r.id);
  seen.add(r.id);
  if(r.readme!=='subjects/'+r.id+'/README.md'||r.audit!=='subjects/'+r.id+'/audit/README.md')
   throw Error('Unexpected source path '+r.id);
  const readme=join(root,r.readme),audit=join(root,r.audit);
  if(!existsSync(readme)||!existsSync(audit))throw Error('Missing subject/audit '+r.id);
  const a=readFileSync(readme,'utf8'),b=readFileSync(audit,'utf8');
  if(!a.includes(r.evidence_phrase)&&!normal(a).includes(normal(r.evidence_phrase)))
   throw Error('Source phrase not found: '+r.id+' / '+r.evidence_phrase);
  if(!b.trim())throw Error('Empty audit '+r.id);
  if(r.official_unlock!==null||r.proposed_official_track!==null||r.mandatory_status!=='unknown')
   throw Error('Invented official metadata '+r.id);
  if(!r.source_interpretation||r.source_interpretation.length<25)
   throw Error('Insufficient source interpretation '+r.id);
  if(r.id==='sortable'&&r.learning_family!=='javascript_piscine_existing')
   throw Error('Existing JS Piscine source misclassified');
  if(r.id==='quad'&&r.learning_family!=='go_piscine_raids')
   throw Error('Go Quad raid misclassified');
  records.push({...r,subject_sha256:sha(a),audit_sha256:sha(b),source_attested:true});
 }
 if(seen.size!==33)throw Error('Missing project classification');
 const edges=j.recommended_public_reference_edges;
 if(edges.some(x=>x.gate!=='unknown'))throw Error('Undocumented official dependency inferred');
 if(edges.length!==6||!edges.some(x=>x.from==='math-skills'&&x.to==='guess-it-1')||
    !edges.some(x=>x.from==='linear-stats'&&x.to==='guess-it-2'))
  throw Error('Missing source reference chain');
 const done=new Set([...known.nodes.map(x=>x.id),...prior.profiles.map(x=>x.id),...records.map(x=>x.id)]);
 if(audited.some(x=>!done.has(x.path)))throw Error('Unaccounted audited top-level subject');
 const byFamily={};for(const x of records)byFamily[x.learning_family]=(byFamily[x.learning_family]||0)+1;
 return{schema_version:'1.0',as_of:'2026-11-04',
  disclaimer:'Subject and audit files verified. Official Galaxy placement, optional status and unlocks unknown. 736 other top-level READMEs lack audit/README.md and are outside this focused survey.',
  summary:{top_level_subjects:top.length,top_level_with_audit:audited.length,
    screenshot_core_count:known.nodes.length,previously_sampled_satellites:prior.profiles.length,
    additional_source_reviewed:records.length,top_level_without_audit:top.length-audited.length,
    by_family:byFamily,confirmed_official_unlocks:0},
  records,source_reference_edges:edges};
}
export function guide(d){
 const lines=['# Phase 21 — Cross-track discovery of top-level audited projects','',
 'Source inspection accounts for all 56 top-level subjects with audit/README.md. This does not classify the other 736 top-level README-bearing subjects.','',
 '**No placement or unlock is claimed to be official.**',''];
 const groups={};for(const x of d.records)(groups[x.learning_family]??=[]).push(x);
 for(const [family,items] of Object.entries(groups)){
  lines.push('## '+family.replaceAll('_',' '),'');
  for(const x of items)lines.push('- **['+x.id+'](https://github.com/01-edu/public/blob/master/'+x.readme+')** — '+x.source_interpretation+
   '; language: '+x.language_policy+'; depth: '+x.suggested_level+
   '; [audit](https://github.com/01-edu/public/blob/master/'+x.audit+')');
  lines.push('');
 }
 lines.push('## Public subject references','');
 for(const x of d.source_reference_edges)lines.push('- '+x.from+' → '+x.to+' ('+x.basis+'; official gate unknown)');
 lines.push('','**Next:** Reconstruct Full-Stack parent and extension projects, then systematically triage other non-audited top-level READMEs.','');
 return lines.join('\n');
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 try{
  const root=resolve(process.argv[2]||'.'),out=resolve(process.argv[3]||'research/galaxy-audit/generated');
  const d=build(root);mkdirSync(out,{recursive:true});
  writeFileSync(join(out,'phase21-expanded-project-verification.json'),JSON.stringify(d,null,2)+'\n');
  writeFileSync(join(out,'phase21-expanded-project-guide.md'),guide(d));
  console.log(JSON.stringify(d.summary,null,2));
 }catch(e){console.error(e.stack||String(e));process.exitCode=1}
}
