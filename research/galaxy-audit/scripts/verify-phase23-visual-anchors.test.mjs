import {test} from 'node:test';
import {strict as assert} from 'node:assert';
import {readFileSync} from 'node:fs';
import {verify} from './verify-phase23-visual-anchors.mjs';
const load=p=>JSON.parse(readFileSync('research/galaxy-audit/data/'+p,'utf8'));
const fresh=()=>[load('subject-node-index.json'),load('screenshot-core-index.json'),load('phase23-galaxy-visual-anchors.json')];
test('all 84 labels reconcile with public source and 17 verified core nodes',()=>{
 const [a,b,c]=fresh(),r=verify(a,b,c);
 assert.equal(r.verified,true);
 assert.deepEqual([r.counts.paths_crosschecked_with_git,r.counts.core_nodes,r.counts.outer_branch_nodes,r.counts.intermediate_nodes],[84,17,41,26]);
});
test('invented official unlock is forbidden',()=>{
 const [a,b,c]=fresh();c.tracks[0].nodes[0].official_unlock=true;
 assert.throws(()=>verify(a,b,c),/invented official metadata/);
});
test('an unknown README path cannot be matched from visual similarity',()=>{
 const [a,b,c]=fresh();c.tracks[0].nodes[0].subject_id='not-in-public-tree';
 assert.throws(()=>verify(a,b,c),/unindexed source/);
});
test('previously verified core sequence remains stable',()=>{
 const [a,b,c]=fresh();c.tracks[0].nodes.reverse();
 assert.throws(()=>verify(a,b,c),/core screenshot mismatch/);
});
test('source hash and unique node checks detect catalog drift',()=>{
 let [a,b,c]=fresh();c.tracks[0].nodes[0].public_subject_readme_sha='wrong';
 assert.throws(()=>verify(a,b,c),/stale README sha/);
 [a,b,c]=fresh();c.tracks[3].nodes[0]=c.tracks[0].nodes[0];
 assert.throws(()=>verify(a,b,c),/duplicated screenshot subject/);
});

