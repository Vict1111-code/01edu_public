import {test} from 'node:test';
import {strict as assert} from 'node:assert';
import {readFileSync} from 'node:fs';
import {verify} from './verify-phase25-semantic-reviews.mjs';
const read=x=>JSON.parse(readFileSync('research/galaxy-audit/data/'+x,'utf8'));
const src=path=>readFileSync(path,'utf8');
const fresh=()=>[read('subject-node-index.json'),read('phase22-nonaudited-coverage.json'),
  read('phase23-galaxy-visual-anchors.json'),read('phase25-first-manual-semantic-reviews.json')];

test('source attestations cover 34 manual reviews from 446 source READMEs',()=>{
 const r=verify(...fresh(),src);
 assert.equal(r.totals.reviewed_source_readmes,34);
 assert.equal(r.totals.previously_unreviewed_remaining,412);
 assert.equal(r.totals.phase24_unreviewed,446);
 assert.ok(r.totals.reviewed_from_priority_queue>=1);
});
test('readme quote mismatches are rejected',()=>{
 const [a,b,c,d]=fresh();
 d.entries[0].source_phrase='not a real quote from this source';
 assert.throws(()=>verify(a,b,c,d,src),/source evidence phrase missing/);
});
test('source metadata cannot be promoted to official unlock or Piscine membership',()=>{
 const [a,b,c,d]=fresh();d.entries[0].official_unlock=true;
 assert.throws(()=>verify(a,b,c,d,src),/unsupported official claim/);
});
test('language-crossing Brainfuck interpreter variants remain separate',()=>{
 const r=verify(...fresh(),src);
 const rust=r.source_verified_reviews.find(x=>x.id==='brain_fuck');
 const go=r.source_verified_reviews.find(x=>x.id==='brainfuck');
 assert.equal(rust.language,'rust');assert.equal(go.language,'go');
 assert.notEqual(rust.source_readme_sha,go.source_readme_sha);
});
test('placeholder, stub and policy are distinguished from assignable exercises',()=>{
 const r=verify(...fresh(),src);
 const by=new Map(r.source_verified_reviews.map(x=>[x.id,x.category]));
 assert.equal(by.get('firebase-demo'),'incomplete_stub');
 assert.equal(by.get('your-own'),'incomplete_stub');
 assert.equal(by.get('disclaimer'),'reference_policy');
 assert.equal(by.get('unavailable'),'unavailable_placeholder');
});
test('pinned Git README hashes and queue membership are mandatory',()=>{
 const [a,b,c,d]=fresh();d.entries[0].readme_sha='fabricated';
 assert.throws(()=>verify(a,b,c,d,src),/README SHA mismatch/);
});
