#!/usr/bin/env node
import {readFileSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {pathToFileURL} from 'node:url';
const check=(v,msg)=>{if(!v)throw Error(msg)};
export function attest(index,register,source){
 check(register.source_tree_sha===index.tree_sha,'Pinned source tree mismatch');
 const byPath=new Map(index.nodes.map(x=>[x.path,x]));
 const seen=new Set();
 for(const r of register.edges){
  const key=r.from+'->'+r.to;
  check(!seen.has(key),'Duplicate relationship '+key);seen.add(key);
  check(byPath.has(r.from)&&byPath.has(r.to),'Unknown source relation '+key);
  check(r.source_path==='subjects/'+r.to+'/README.md','Incorrect target source '+key);
  check(byPath.get(r.to).readme_sha===r.source_readme_sha,'Stale README blob '+key);
  const text=source(r.source_path);
  check(text.includes(r.evidence_phrase),'Evidence quote missing '+key);
  check(r.official_platform_unlock===null&&r.official_piscine_order===null,'Unsupported official unlock '+key);
 }
 check(seen.size===7,'Seven source-confirmed edges expected');
 return {source_sha:index.tree_sha,verified_source_relations:seen.size,official_unlocks_asserted:0};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 const root=resolve(process.argv[2]||'.'),p='research/galaxy-audit/data/';
 const get=n=>JSON.parse(readFileSync(join(root,p,n),'utf8'));
 console.log(JSON.stringify(attest(get('subject-node-index.json'),
  get('phase28-source-supported-relationships.json'),
  name=>readFileSync(join(root,name),'utf8')),null,2));
}
