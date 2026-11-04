#!/usr/bin/env node
// Source-attested expansion of 285 manually inspected Phase 26 group decisions.
import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {pathToFileURL} from 'node:url';
const check=(v,msg)=>{if(!v)throw Error(msg)};
export function taskPhrase(source) {
 const m=/^#{1,4}\s+Instructions?\s*$/im.exec(source);
 const after=m?source.slice(m.index+m[0].length):source;
 const lines=after.split(/\r?\n/).map(s=>s.trim()).filter(x=>x&&!/^(\x60{3}|#|!\[|<img|https?:\/\/)/.test(x));
 const meaningful=lines.find(s=>!/^[-*]\s*$/.test(s)&&s.replace(/[_\x60*]/g,'').length>14);
 return (meaningful||source.trim().split(/\n/).find(Boolean)||'').slice(0,220);
}
export function expand(idx,triage,prior,groups,reader) {
 check(groups.source_tree_sha===idx.tree_sha && prior.source_tree_sha===idx.tree_sha && triage.source_tree_sha===idx.tree_sha,'Pinned source tree SHA changed');
 const original=new Set(triage.priority_manual_review_queue.map(x=>x.id));
 check(original.size===317,'Expected original 317 priority IDs');
 const reviewed=new Set(prior.entries.map(x=>x.id));
 const expected=new Set([...original].filter(id=>!reviewed.has(id)));
 check(expected.size===285,'Expected Phase 26 remaining 285');
 const lookup=new Map(idx.nodes.filter(n=>n.depth===1).map(n=>[n.path,n]));
 const byTriage=new Map(triage.priority_manual_review_queue.map(x=>[x.id,x]));
 const allowed=new Set(['reference_overview','incomplete_stub','intro_setup','shell_exercise','html_css_exercise','browser_dom_exercise','nodejs_cli_or_server','rust_exercise','go_exercise','javascript_exercise']);
 const seen=new Set(),records=[];
 const langFor={reference_overview:null,incomplete_stub:null,intro_setup:null,shell_exercise:'shell',html_css_exercise:'HTML/CSS',browser_dom_exercise:'JavaScript',nodejs_cli_or_server:'JavaScript/Node.js',rust_exercise:'Rust',go_exercise:'Go',javascript_exercise:'JavaScript'};
 for (const [category,ids] of Object.entries(groups.groups)) {
  check(allowed.has(category),'Unexpected semantic category '+category);
  check(Array.isArray(ids),'Non-array group '+category);
  for(const id of ids) {
   check(!seen.has(id),'Duplicate classification '+id);seen.add(id);
   check(expected.has(id),'ID outside Phase26 pending priority '+id);
   const indexed=lookup.get(id),old=byTriage.get(id);
   check(indexed&&!indexed.audit_readme_sha&&indexed.readme_sha===old.readme_sha,'Source index/hash mismatch '+id);
   const path='subjects/'+id+'/README.md',source=reader(path);
   check(typeof source==='string','README missing '+id);
   if(category==='incomplete_stub')check(source.length<150,'Stub longer than expected '+id);
   const phrase=taskPhrase(source);
   check(source.includes(phrase),'Extracted source phrase missing '+id);
   const language=category==='intro_setup'?({
    hello_rust:'Rust',introduction:'shell','hello-there':'JavaScript','hello-there-editor':'JavaScript'
   })[id]:langFor[category];
   records.push({id,source_path:path,readme_sha:indexed.readme_sha,semantic_category:category,
    language:language||null,source_phrase:phrase,source_review_status:category==='incomplete_stub'?'inspected_insufficient_public_spec':'inspected_and_semantically_classified',
    phase24_category:old.category,phase24_language:old.language||null,
    official_galaxy_track:null,official_piscine_membership:null,official_unlock:null,assessment_verified:false});
  }
 }
 check(seen.size===285&&[...expected].every(id=>seen.has(id)),'Priority IDs unclassified');
 records.sort((a,b)=>a.id.localeCompare(b.id));
 const hist={};for(const x of records)hist[x.semantic_category]=(hist[x.semantic_category]||0)+1;
 return {schema_version:'1.0',phase:26,as_of:'2026-11-04',source_tree_sha:idx.tree_sha,
  caveat:'Independent source-semantic classification, not current official Galaxy unlock or grading. Insufficient source cases remain unresolved as specifications.',
  coverage:{original_priority:317,phase25_already_reviewed:32,phase26_now_inspected:285,priority_uninspected:0,
   substantive_assignments:285-(hist.incomplete_stub||0)-(hist.reference_overview||0),
   incomplete_stubs:hist.incomplete_stub||0,reference_overviews:hist.reference_overview||0,by_semantic_group:hist},
  records};
}
export function markdown(x) {
 const lines=['# Phase 26 — All 285 priority README subjects source-classified','',
  'Independent content classification; not the official 01Edu dashboard chronology or unlock graph.','',
  'Original priority: 317; Phase 25: 32; Phase 26: 285; uninspected priority cases: 0.','',
  '| Category | Count |','| --- | ---: |'];
 for(const [k,n] of Object.entries(x.coverage.by_semantic_group).sort())lines.push('| '+k+' | '+n+' |');
 lines.push('','## Source-linked catalog','','| Public subject | Semantic type | Language | Source wording |','| --- | --- | --- | --- |');
 for(const r of x.records)lines.push('| ['+r.id+'](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/'+r.source_path+') | '+
  r.semantic_category+' | '+(r.language||'undetermined')+' | '+r.source_phrase.replace(/\|/g,'\\|').replace(/\n/g,' ')+' |');
 lines.push('','Nine source stubs lack full instructions. No learner code was assessed; all official unlock and track fields remain null.','');
 return lines.join('\n');
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 const root=resolve(process.argv[2]||'.'),output=resolve(process.argv[3]||'research/galaxy-audit/generated');
 const get=name=>JSON.parse(readFileSync(join(root,'research/galaxy-audit/data',name),'utf8'));
 const triage=JSON.parse(readFileSync(join(output,'phase24-unmatched-readme-triage.json'),'utf8'));
 const result=expand(get('subject-node-index.json'),triage,get('phase25-first-manual-semantic-reviews.json'),get('phase26-reviewed-priority-groups.json'),path=>readFileSync(join(root,path),'utf8'));
 mkdirSync(output,{recursive:true});
 writeFileSync(join(output,'phase26-source-verified-285.json'),JSON.stringify(result,null,2)+'\n');
 writeFileSync(join(output,'phase26-source-verified-guide.md'),markdown(result)+'\n');
 console.log(JSON.stringify(result.coverage,null,2));
}
