import {test} from 'node:test';
import {strict as assert} from 'node:assert';
import {readFileSync} from 'node:fs';
import {merge,csv} from './build-phase27-455-closure.mjs';
const root='research/galaxy-audit/';
const load=(section,name)=>JSON.parse(readFileSync(root+section+'/'+name,'utf8'));
const get=()=>[load('data','subject-node-index.json'),
 load('data','phase22-nonaudited-coverage.json'),
 load('data','phase25-first-manual-semantic-reviews.json'),
 load('generated','phase26-source-verified-285.json'),
 load('generated','phase27-source-verified-127.json')];
test('all 455 nonarchive-matched top-level README source identities are counted once',()=>{
 const d=merge(...get());
 assert.equal(d.counts.source_subjects,455);
 assert.deepEqual(Object.values(d.counts.reviewed_by_phase),[9,34,285,127]);
 assert.equal(new Set(d.subjects.map(x=>x.id)).size,455);
 assert.equal(d.counts.insufficient_current_specifications,11);
 assert.equal(d.counts.unavailable_public_readmes,1);
 assert.equal(d.counts.official_unlocks_verified,0);
 assert.equal(d.subjects.filter(x=>x.source_readme_sha&&x.source_url).length,455);
});
test('source identity and status reconciliation reject repeated IDs',()=>{
 const a=get();a[3].records.push({...a[3].records[0]});
 assert.throws(()=>merge(...a),/Duplicate reviewed subject/);
});
test('source tree mutation cannot pass',()=>{
 const a=get();a[4].source_tree_sha='wrong';
 assert.throws(()=>merge(...a),/Mismatched public source tree/);
});
test('CSV retains all subject lines and exact columns',()=>{
 const c=csv(merge(...get()));
 assert.match(c,/source_readme_sha/);
 assert.equal(c.trim().split('\n').length,456);
 assert.match(c,/armstrong_number/);
 assert.match(c,/btreedeletenode/);
});
