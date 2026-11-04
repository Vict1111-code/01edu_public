import {test} from 'node:test';
import {strict as assert} from 'node:assert';
import {readFileSync,existsSync} from 'node:fs';
import {verify,csv} from './verify-phase28-281-catalog.mjs';
const load=x=>JSON.parse(readFileSync('research/galaxy-audit/data/'+x,'utf8'));
const older=['phase18-go-61-source-reviews.json','phase18-javascript-26-source-reviews.json',
 'phase18-rust-8-source-reviews.json','phase16-manual-readme-classifications.json',
 'phase17-semantic-source-verdicts.json'];
const inputs=()=>[load('subject-node-index.json'),load('phase22-nonaudited-coverage.json'),
 load('three-piscines-subject-crosswalk.json'),load('phase28-complete-281-catalog.json'),
 load('phase28-direct-81-source-reviews.json'),older.map(load)];
const src=p=>readFileSync(p,'utf8');
test('all 281 public subject README files reconcile with 200 prior reviews and 81 new ones',()=>{
 const d=verify(...inputs(),src,existsSync);
 assert.equal(d.records.length,281);
 assert.equal(new Set(d.records.map(x=>x.id)).size,281);
 assert.equal(d.counts.previous_reviews_reused,200);
 assert.equal(d.counts.new_manual_reviews,81);
 assert.equal(d.counts.README_sources_read,281);
 assert.deepEqual(d.counts.source_language,{go:118,rust:63,javascript:97,shell:3});
 assert.equal(d.counts.public_test_subjects,97);
 assert.equal(csv(d).trim().split('\n').length,282);
});
test('source language overrides community Go archive assumption only when inspected',()=>{
 const d=verify(...inputs(),src,existsSync);
 const set=new Map(d.records.map(r=>[r.id,r]));
 for(const id of ['make-it-better','to-git-or-not-to-git','who-are-you']){
  assert.equal(set.get(id).archive_language,'go');
  assert.equal(set.get(id).source_language,'shell');
  assert.equal(set.get(id).source_language_differs_from_archive,true);
 }
 assert.equal(set.get('how-2-js').semantic_kind,'onboarding_exercise');
});
test('source SHA mismatch fails closed',()=>{
 const a=inputs();
 a[3].records[0].readme_sha='invented-blob-hash';
 assert.throws(()=>verify(...a,src,existsSync),/Stale source README SHA/);
});
test('invented prerequisite or platform unlock rejected',()=>{
 const a=inputs();
 a[3].records[0].official_unlock=true;
 assert.throws(()=>verify(...a,src,existsSync),/Fabricated official curriculum fact/);
});
test('old human review is not treated as one of 81 new readings',()=>{
 const a=inputs();
 a[3].records[0].historical_review_source='phase28_direct_manual_review';
 assert.throws(()=>verify(...a,src,existsSync),/Prior review provenance mismatch/);
});
test('a missing exact public test file fails attestation',()=>{
 const a=inputs();
 assert.throws(()=>verify(...a,src,p=>p.endsWith('js/tests/abs_test.js')?false:existsSync(p)),/Missing public test file/);
});
test('reviewed source evidence is always checked against actual README text',()=>{
 const a=inputs(),row=a[3].records.find(r=>r.id==='abort');
 row.source_evidence_phrase='xyz-unattested phrase';
 assert.throws(()=>verify(...a,src,existsSync),/Prior exact source evidence missing/);
});
