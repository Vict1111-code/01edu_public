import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {audit,markdown} from './classify-top-level-satellites.mjs';
const root=resolve('.');
const data=JSON.parse(readFileSync(join(root,'research/galaxy-audit/data/phase21-audited-top-level-classification.json'),'utf8'));
test('33 classifications have unique public subject paths and source phrases',()=>{
 assert.equal(data.entries.length,33);
 assert.equal(new Set(data.entries.map(x=>x.id)).size,33);
 assert.ok(data.entries.every(x=>x.source_phrase.length>=3));
});
test('phase21 reconciles 792 top-level subjects from source index',()=>{
 const result=audit(root);
 assert.deepEqual(result.overview,{top_level_public_subjects:792,audited_top_level_subjects:56,
  earlier_core_subjects:17,earlier_sampled_satellites:6,newly_reviewed_audited_subjects:33,
  remaining_top_level_subjects_without_indexed_audit:736,all_top_level_subjects_accounted_for:792});
});
test('Go raids and cross-language projects are not silently made Imperative core',()=>{
 const ix=new Map(data.entries.map(x=>[x.id,x]));
 for(const id of ['quad','carbon-copy','clonernews'])
  assert.equal(ix.get(id).category,'piscine_raid');
 for(const id of ['atm-management-system','netfix','mister-quiz','shop','system-monitor'])
  assert.equal(ix.get(id).category,'cross_language_project');
});
test('evidence-backed dependencies are distinguishable from inferred identities',()=>{
 const edges=data.source_relationships;
 assert.ok(edges.some(x=>x.from==='math-skills'&&x.to==='guess-it-1'&&x.evidence_type==='explicit_prior_exercise_text'));
 assert.ok(edges.some(x=>x.from==='linear-stats'&&x.to==='guess-it-2'&&x.evidence_type==='explicit_prior_exercise_text'));
 assert.ok(edges.some(x=>x.from==='mini-framework'&&x.to==='bomberman-dom'));
 assert.ok(edges.some(x=>x.from==='carbon-copy'&&x.to==='free-project'&&x.evidence_type==='prior_raid_reference_inferred_identity'));
 assert.ok(edges.every(x=>x.official_unlock===null));
});
test('my-ls and my-ls-1 are kept as distinct public variants',()=>{
 const x=data.entries.find(x=>x.id==='my-ls'),y=data.entries.find(x=>x.id==='my-ls-1');
 assert.ok(x&&y);
 assert.notEqual(x.source_path,y.source_path);
});
test('review guide discloses scope and missing audits',()=>{
 const s=markdown(audit(root));
 assert.match(s,/736 other top-level subjects/);
 assert.match(s,/No official Galaxy membership or unlocks/);
});
