import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {applyReview,renderGuide} from './apply-semantic-source-reviews.mjs';
import {CONCEPTS} from './build-concept-prerequisites.mjs';
const root=resolve('.');
const read=p=>JSON.parse(readFileSync(join(root,p),'utf8'));
const phase16=read('research/galaxy-audit/generated/piscine-phase16-triaged-curriculum.json');
const verdicts=read('research/galaxy-audit/data/phase17-semantic-source-verdicts.json');
const data=applyReview(phase16,verdicts,root);
const find=(l,id)=>data.languages[l].exercise_cards.find(x=>x.exercise===id);
test('all 316 candidates are retained without inventing official Galaxy positions',()=>{
 assert.equal(data.summary.total,316);
 for(const g of Object.values(data.languages))for(const x of g.exercise_cards){
  assert.equal(x.official_galaxy_order,null);
  assert.equal(x.official_unlock_conditions,null);
  assert.equal(x.official_piscine_membership,'not_established');
 }
});
test('30 source-verified corrections are unique and source-phrase checked',()=>{
 assert.equal(verdicts.records.length,30);
 assert.equal(new Set(verdicts.records.map(x=>x.language+'::'+x.exercise)).size,30);
 assert.equal(data.summary.new_full_readme_semantic_reviews,30);
 for(const v of verdicts.records){
  assert.ok(readFileSync(join(root,v.public_readme),'utf8').includes(v.evidence_phrase));
  assert.equal(find(v.language,v.exercise).phase17_review,'manual_full_README_semantics_verified');
 }
});
test('explicit concept corrections remove unsupported tags',()=>{
 const prime=find('go','isprime'),filter=find('javascript','filter'),date=find('javascript','unicode-technical-report-35');
 assert.ok(!prime.phase17_effective_concepts.includes('tree_traversal'));
 assert.ok(!prime.phase17_effective_concepts.includes('sorting'));
 assert.ok(!filter.phase17_effective_concepts.includes('promises'));
 assert.ok(!date.phase17_effective_concepts.includes('dom'));
});
test('advanced source requirements are moved to appropriate learning stages',()=>{
 assert.equal(find('rust','border_cross').phase17_study_stage,6);
 assert.equal(find('rust','bigger').phase17_study_stage,5);
 assert.equal(find('javascript','sortable').phase17_study_stage,8);
 assert.equal(find('javascript','physics').phase17_study_stage,3);
});
test('unverified community archive files are not placed in a confirmed stage',()=>{
 assert.equal(data.summary.excluded_community_identity_only,34);
 for(const g of Object.values(data.languages))for(const x of g.exercise_cards)
  if(x.phase17_review==='community_identity_only_not_official'){
   assert.equal(x.phase17_study_stage,null);
   assert.deepEqual(x.phase17_effective_concepts,[]);
  }
});
test('all remaining 95 keyword-only cases remain in a visible review queue',()=>{
 assert.equal(data.summary.pending_full_readme_reviews,95);
 assert.equal(data.semantic_review_queue.length,95);
 assert.ok(data.semantic_review_queue.every(x=>x.source?.endsWith('/README.md')));
});
test('no unrecognized concept appears in manually verified assignments',()=>{
 for(const [language,g] of Object.entries(data.languages))
  for(const x of g.exercise_cards.filter(y=>y.phase17_review==='manual_full_README_semantics_verified'))
   for(const concept of x.phase17_effective_concepts)assert.ok(CONCEPTS[language].nodes.includes(concept));
});
test('24 original stage assessments cover all three languages with reproducible tests',()=>{
 const spec=read('research/galaxy-audit/data/phase17-original-stage-assessments.json');
 assert.equal(spec.rubric.correctness+spec.rubric.boundary_and_failure_cases+spec.rubric.automated_tests+spec.rubric.explanation_and_maintainability,100);
 for(const [l,rows] of Object.entries(spec.tracks)){
  assert.equal(rows.length,8);
  assert.deepEqual(rows.map(x=>x.stage),[1,2,3,4,5,6,7,8]);
  assert.ok(rows.every(x=>x.official_01edu_assessment===false&&x.verification_checks.length>=3));
  assert.ok(rows.every(x=>x.concepts.every(c=>CONCEPTS[l].nodes.includes(c))));
 }
});
test('generated guides show review levels and distinguish unplaced files',()=>{
 for(const l of ['go','rust','javascript']){
  const md=renderGuide(data,l);
  assert.match(md,/not official 01Edu Galaxy/i);
  assert.match(md,/Not placed: unverified community archive identities/);
 }
});
