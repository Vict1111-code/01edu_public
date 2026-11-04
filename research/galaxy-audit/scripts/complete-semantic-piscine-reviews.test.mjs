import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {build,loadReviews,guide} from './complete-semantic-piscine-reviews.mjs';
const root=resolve('.');
const dir=join(root,'research/galaxy-audit/generated');
const read=p=>JSON.parse(readFileSync(join(dir,p),'utf8'));
const previous=read('piscine-phase17-semantic-curriculum.json');
const queue=read('piscine-phase17-pending-source-reviews.json');
const reviews=loadReviews(root);
const data=build(previous,queue,reviews,root);
const lookup=(lang,id)=>data.languages[lang].exercise_cards.find(x=>x.exercise===id);
test('exactly 95 distinct previously pending reviews are closed',()=>{
 assert.equal(reviews.length,95);
 assert.equal(new Set(reviews.map(x=>x.language+'::'+x.exercise)).size,95);
 assert.equal(data.summary.source_reviews_completed,95);
 assert.equal(data.summary.pending_full_semantic_review,0);
});
test('all public README source phrases match and contain SHA-256 provenance',()=>{
 assert.equal(data.summary.matched_public_subject_reviews,94);
 for(const x of data.review_log){
  assert.match(x.source_sha256,/^[0-9a-f]{64}$/);
  assert.ok(x.matched_source_phrase.length>=3);
 }
});
test('Rust public rot is not misrepresented as a Go official exercise',()=>{
 const x=lookup('go','rot');
 assert.equal(x.phase18_review_status,'wrong_language_source_excluded');
 assert.equal(x.phase18_study_stage,null);
 assert.deepEqual(x.phase18_effective_concepts,[]);
 assert.equal(x.official_piscine_membership,'not_established');
});
test('manual source checks correct all three language tracks',()=>{
 assert.equal(lookup('go','abort').phase18_study_stage,3);
 assert.ok(lookup('go','btreeapplypostorder').phase18_effective_concepts.includes('tree_traversal'));
 assert.equal(lookup('rust','shopping_mall').phase18_study_stage,8);
 assert.ok(lookup('rust','question_mark').phase18_effective_concepts.includes('enums_results'));
 assert.equal(lookup('javascript','keycodes-symphony').phase18_study_stage,6);
 assert.ok(lookup('javascript','keycodes-symphony').phase18_effective_concepts.includes('dom'));
 assert.equal(lookup('javascript','series').phase18_study_stage,5);
});
test('filenames never override public instruction semantics',()=>{
 const x=lookup('javascript','dog-years');
 assert.ok(!x.phase18_effective_concepts.includes('dom'));
 assert.equal(lookup('javascript','race').phase18_study_stage,5);
 assert.ok(lookup('go','fibonacci').phase18_effective_concepts.includes('recursion'));
});
test('all original 316 candidates and uncertain metadata are retained',()=>{
 assert.equal(data.summary.original_archive_candidates,316);
 for(const group of Object.values(data.languages))
  for(const x of group.exercise_cards){
   assert.equal(x.official_galaxy_order,null);
   assert.equal(x.official_unlock_conditions,null);
   assert.equal(x.official_piscine_membership,'not_established');
   assert.ok(x.phase18_study_stage===null||
    (Number.isInteger(x.phase18_study_stage)&&x.phase18_study_stage>=1&&x.phase18_study_stage<=8));
  }
});
test('source attestation fails when a claimed README phrase is missing',()=>{
 const bad=reviews.map(x=>({...x}));
 bad[0].verification_phrase='a fabricated phrase absent from the original README';
 assert.throws(()=>build(previous,queue,bad,root),/Verification phrase absent/);
});
test('community archive identity-only records remain unplaced',()=>{
 for(const group of Object.values(data.languages))
  for(const x of group.exercise_cards)
   if(x.phase17_review==='community_identity_only_not_official')assert.equal(x.phase18_study_stage,null);
});
test('source-linked study guides explicitly distinguish independent educational order',()=>{
 for(const lang of ['go','rust','javascript']){
  const md=guide(data,lang);
  assert.match(md,/independent of official Galaxy quest ordering/i);
  assert.match(md,/Unplaced or uncertain source identities/);
 }
});
