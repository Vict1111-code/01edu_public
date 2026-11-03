import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {merge,guide} from './triage-piscine-evidence.mjs';
const root=resolve('.');
const manual=JSON.parse(readFileSync(join(root,'research/galaxy-audit/data/phase16-manual-readme-classifications.json'),'utf8'));
const archive=JSON.parse(readFileSync(join(root,'research/galaxy-audit/data/phase14-source-inspected-identity-review.json'),'utf8'));
test('all 76 public README reviews have unique identifiers',()=>{
 const ids=manual.records.map(x=>x.language+'::'+x.exercise);
 assert.equal(ids.length,76);
 assert.equal(new Set(ids).size,76);
});
test('public README classifications have a source and reviewed concepts',()=>{
 for(const x of manual.records){
  assert.match(x.evidence_source,/^subjects\/[a-z0-9_-]+\/README\.md$/);
  assert.ok(x.manual_concepts.length>0);
  assert.ok(x.review_note.length>20);
  assert.equal(x.official_quest,null);
 }
});
test('all 34 community records retain unknown official assignment status',()=>{
 assert.equal(archive.records.length,34);
 assert.ok(archive.records.every(x=>x.official_assignment_verified===false));
});
test('reviewed stages move advanced object algorithms after fundamentals',()=>{
 assert.equal(manual.records.find(x=>x.exercise==='deep-copy').recommended_stage,7);
 assert.equal(manual.records.find(x=>x.exercise==='collatzcountdown').recommended_stage,3);
 assert.equal(manual.records.find(x=>x.exercise==='pyramid').recommended_stage,2);
});
test('incomplete source evidence cannot be counted as a complete curriculum',()=>{
 const empty={languages:{go:{exercise_cards:[]},rust:{exercise_cards:[]},javascript:{exercise_cards:[]}}};
 assert.throws(()=>merge(empty,manual,archive,root),/Coverage mismatch/);
});
test('unplaced community candidates remain visibly unplaced in guides',()=>{
 const data={languages:{go:{exercise_cards:[{exercise:'split2',phase16_study_stage:null,phase16_source_review:{source_disposition:'false_name_match_rejected'},phase16_manual_concepts:[]}]}}};
 assert.match(guide(data,'go'),/Unplaced community archive candidates/);
});
