#!/usr/bin/env node
// Validate Galaxy screenshot anchors against the pinned public subject tree.
import {readFileSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {pathToFileURL} from 'node:url';
export function verify(index,prior,visual){
 const fails=[],ok=(b,msg)=>{if(!b)fails.push(msg)};
 const indexMap=new Map(index.nodes.map(n=>[n.path,n]));
 ok(visual.source_repository_tree_sha===index.tree_sha,'source tree changed');
 const allowed=new Set(['inner_core','intermediate_project_group','outer_specialization']);
 const paths=[];
 for(const t of visual.tracks){
  ok(allowed.has(t.kind),'unknown grouping '+t.id);
  for(let i=0;i<t.nodes.length;i++){
   const n=t.nodes[i],src=indexMap.get(n.subject_id);paths.push(n.subject_id);
   ok(n.visual_order===i+1,'bad visual position '+n.subject_id);
   ok(n.official_unlock===null&&n.official_track_assignment===null,'invented official metadata '+n.subject_id);
   ok(Boolean(src),'unindexed source '+n.subject_id);
   if(src){
    ok(n.source_readme_path==='subjects/'+n.subject_id+'/README.md','bad path '+n.subject_id);
    ok(n.public_subject_readme_sha===src.readme_sha,'stale README sha '+n.subject_id);
    ok(n.public_audit_readme_sha===(src.audit_readme_sha??null),'stale audit sha '+n.subject_id);
   }
  }
 }
 ok(paths.length===new Set(paths).size,'duplicated screenshot subject');
 const core=['imperative','architecture','full_stack'];
 for(const k of core){
  const t=visual.tracks.find(x=>x.id===k);
  ok(Boolean(t)&&t.kind==='inner_core','missing core track '+k);
  if(t)ok(JSON.stringify(t.nodes.map(x=>x.subject_id))===JSON.stringify(prior.bands[k]),'core screenshot mismatch '+k);
 }
 const c=visual.counts;
 ok(paths.length===c.paths_crosschecked_with_git,'bad total');
 ok(visual.tracks.length===c.track_groups,'bad group count');
 for(const [kind,key] of [['inner_core','core_nodes'],['outer_specialization','outer_branch_nodes'],['intermediate_project_group','intermediate_nodes']])
  ok(visual.tracks.filter(t=>t.kind===kind).reduce((n,t)=>n+t.nodes.length,0)===c[key],'bad '+kind+' count');
 ok(visual.unresolved_visual_text.length===c.uncertain_visible_labels,'bad unresolved count');
 if(fails.length)throw Error(fails.join('; '));
 return {verified:true,counts:c,source_tree_sha:index.tree_sha};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 const root=resolve(process.argv[2]||'.');
 const load=x=>JSON.parse(readFileSync(join(root,'research/galaxy-audit/data',x),'utf8'));
 console.log(JSON.stringify(verify(load('subject-node-index.json'),load('screenshot-core-index.json'),load('phase23-galaxy-visual-anchors.json')),null,2));
}

