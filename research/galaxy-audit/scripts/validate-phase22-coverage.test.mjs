import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { readFileSync } from 'node:fs';
import { validateCoverage } from './validate-phase22-coverage.mjs';

const p='research/galaxy-audit/data/';
const load=x=>JSON.parse(readFileSync(p+x,'utf8'));
const actual=()=>[load('subject-node-index.json'),
 load('three-piscines-subject-crosswalk.json'),load('phase22-nonaudited-coverage.json')];
const source=x=>readFileSync(x,'utf8');

test('validates complete real source index, archive reconciliation and ten source phrases',()=>{
 const [index,crosswalk,data]=actual();
 const r=validateCoverage(index,crosswalk,data,source);
 assert.equal(r.ok,true);
 assert.equal(r.counts.archive_unmatched_without_audit,455);
 assert.equal(r.source_phrases_verified,10);
});
test('rejects fabricated official unlock metadata',()=>{
 const [a,b,c]=actual();
 c.archive_matched_unaudited_subjects[0].official_unlock=true;
 assert.throws(()=>validateCoverage(a,b,c,source),/Invented official unlock/);
});
test('rejects a missing archive-unmatched subject',()=>{
 const [a,b,c]=actual();
 c.other_unaudited_subjects.pop();
 assert.throws(()=>validateCoverage(a,b,c,source),/Backlog does not cover/);
});
test('rejects unverified source evidence',()=>{
 const [a,b,c]=actual();
 const r=c.other_unaudited_subjects.find(n=>n.source_review);
 r.source_review.source_phrase='this fabricated phrase is absent';
 assert.throws(()=>validateCoverage(a,b,c,source),/Review phrase missing/);
});

