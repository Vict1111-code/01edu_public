#!/usr/bin/env node
import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {pathToFileURL} from 'node:url';
const check=(v,m)=>{if(!v)throw Error(m)};
export function sourcePhrase(s){
 const header=/^#{1,4}\s+Instructions?(?::)?\s*$/im.exec(s);
 const block=header?s.slice(header.index+header[0].length):s;
 return (block.split(/\r?\n/).map(x=>x.trim()).find(x=>x.length>22&&!/^(#|\x60{3}|<!--)/.test(x))||
 s.split(/\r?\n/).find(x=>x.trim().length>5)||'').slice(0,280);
}
export function reconcile(index,p22,p25,p26,p27,visual,readSource){
 const sha=index.tree_sha;
 for(const [name,v] of [['22',p22],['25',p25],['26',p26],['27',p27]])
  check(v.source_tree_sha===sha,'Phase '+name+' source SHA mismatch');
 check(visual.source_repository_tree_sha===sha,'Visual tree SHA mismatch');
 const source=p22.other_unaudited_subjects.filter(x=>!x.source_review);
 const reviewed=new Set([...p25.entries.map(x=>x.id),...Object.values(p26.groups).flat()]);
 check(reviewed.size===319,'Prior source-reviewed identities changed');
 const eligible=new Map(source.filter(x=>!reviewed.has(x.id)).map(x=>[x.id,x]));
 check(eligible.size===127,'Expected 127 non-priority identities');
 const idx=new Map(index.nodes.map(x=>[x.path,x]));
 const anchors=new Set(visual.tracks.flatMap(x=>x.nodes.map(n=>n.subject_id)));
 const goTopics=new Map();
 for(const [topic,ids] of Object.entries(p27.topics))
  for(const id of ids){check(!goTopics.has(id),'Duplicate topic '+id);goTopics.set(id,topic);}
 const seen=new Set(),records=[];
 for(const [language,ids] of Object.entries(p27.groups)){
  check(['go','rust','javascript'].includes(language),'Unsupported language group '+language);
  for(const id of ids){
   check(!seen.has(id),'Duplicate source ID '+id);seen.add(id);
   check(eligible.has(id),'Not in Phase27 cohort '+id);
   const node=idx.get(id);
   check(node&&node.depth===1&&!node.audit_readme_sha&&node.readme_sha===eligible.get(id).readme_sha,'README SHA mismatch '+id);
   const path='subjects/'+id+'/README.md',content=readSource(path);
   check(typeof content==='string'&&content.trim().length>150,'Missing instructions '+id);
   const excerpt=sourcePhrase(content);
   check(excerpt&&content.includes(excerpt),'Source excerpt missing '+id);
   check(language==='go'?goTopics.has(id):!goTopics.has(id),'Go topic mismatch '+id);
   records.push({id,language,source_path:path,source_readme_sha:node.readme_sha,
    semantic_type:'source_documented_coding_exercise',topic:goTopics.get(id)||(language==='rust'?'rust_algorithms_collections':'javascript_algorithms_objects_async'),
    source_excerpt:excerpt,source_content_length:content.length,
    visual_anchor:anchors.has(id)?id:null,
    official_galaxy_track:null,official_piscine_membership:null,official_unlock:null,assessment_executed:false});
  }
 }
 check(seen.size===127&&[...eligible.keys()].every(id=>seen.has(id)),'Missing classified ID');
 records.sort((a,b)=>a.id.localeCompare(b.id));
 const c={total:records.length,go:records.filter(x=>x.language==='go').length,
 rust:records.filter(x=>x.language==='rust').length,javascript:records.filter(x=>x.language==='javascript').length,
 visual_anchors:records.filter(x=>x.visual_anchor).length};
 check(c.total===127&&c.go===94&&c.rust===12&&c.javascript===21,'Language totals changed');
 check(c.visual_anchors===0,'Unexpected screenshot visual placement');
 return {schema_version:'1.0',phase:27,as_of:'2026-11-04',source_tree_sha:sha,
  scope:'Full source-based classification of final 127 Phase24 nonpriority READMEs',
  caveat:'Content labels do not establish official Galaxy stage, enrollment, compulsory status or platform unlock.',
  counts:c,records};
}
export function report(d){
 const lines=['# Phase 27 — Final 127 nonpriority source-reviewed subjects','',
 'This document describes 127 full README source checks. Their official Galaxy placement and unlock logic remain unknown.','',
 '| Language | Count |','| --- | ---: |',
 '| Go | 94 |','| JavaScript | 21 |','| Rust | 12 |',
 '| **Total** | **127** |','',
 '| Subject | Language | Research competency group | README evidence |',
 '| --- | --- | --- | --- |'];
 for(const r of d.records)lines.push('| ['+r.id+'](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/'+r.source_path+') | '+r.language+' | '+r.topic+' | '+r.source_excerpt.replace(/\|/g,'\\|').replace(/\n/g,' ')+' |');
 return lines.join('\n')+'\n';
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 const root=resolve(process.argv[2]||'.'),out=resolve(process.argv[3]||'research/galaxy-audit/generated');
 const load=n=>JSON.parse(readFileSync(join(root,'research/galaxy-audit/data',n),'utf8'));
 const d=reconcile(load('subject-node-index.json'),load('phase22-nonaudited-coverage.json'),
  load('phase25-first-manual-semantic-reviews.json'),load('phase26-reviewed-priority-groups.json'),
  load('phase27-nonpriority-reviewed-groups.json'),load('phase23-galaxy-visual-anchors.json'),
  p=>readFileSync(join(root,p),'utf8'));
 mkdirSync(out,{recursive:true});
 writeFileSync(join(out,'phase27-source-verified-127.json'),JSON.stringify(d,null,2)+'\n');
 writeFileSync(join(out,'phase27-source-verified-127.md'),report(d));
 console.log(JSON.stringify(d.counts,null,2));
}
