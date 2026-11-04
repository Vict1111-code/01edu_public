import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {verify,guide} from './verify-imperative-satellites.mjs';
const root=resolve('.');
const data=JSON.parse(readFileSync(join(root,'research/galaxy-audit/data/phase20-imperative-satellites.json'),'utf8'));
test('all six reviewed records have checked source and audit READMEs',()=>{
 const v=verify(root);
 assert.equal(v.verified_subject_and_audit_count,6);
 assert.equal(v.confirmed_official_Galaxy_positions,0);
});
test('three post-Piscine options distinguished from three raids or other tracks',()=>{
 const v=verify(root);
 assert.deepEqual(v.optional_imperative_learning_candidates.map(x=>x.id).sort(),['math-skills','net-cat','tetris-optimizer']);
 assert.deepEqual(v.separately_classified_raid_or_rust_candidates.map(x=>x.id).sort(),['quadchecker','road_intersection','sudoku']);
});
test('no official sequence is inferred from educational readiness',()=>{
 assert.ok(data.suggested_progression_edges.every(x=>x.relation==='pedagogical_recommendation'&&x.official_unlock===null));
 assert.ok(data.profiles.every(x=>x.graph_membership==='unverified'&&x.official_mandatory_status==='unknown'));
});
test('math-skills permits any implementation language and net-cat requires Go concurrency',()=>{
 const m=data.profiles.find(x=>x.id==='math-skills'),n=data.profiles.find(x=>x.id==='net-cat');
 assert.equal(m.language_policy,'learner_choice');
 assert.equal(n.language_policy,'go_required');
 assert.ok(n.concepts.includes('goroutines'));
});
test('quadchecker and sudoku preserve raid evidence',()=>{
 const q=readFileSync(join(root,'subjects/quadchecker/README.md'),'utf8');
 const s=readFileSync(join(root,'subjects/sudoku/audit/README.md'),'utf8');
 assert.match(q,/This raid is based on/);
 assert.match(s,/raid-testing\.md/);
});
test('road_intersection is not imported into Go Imperative',()=>{
 const r=data.profiles.find(x=>x.id==='road_intersection');
 assert.equal(r.suggested_stage,null);
 assert.equal(r.kind,'rust_raid_or_architecture_candidate');
});
test('source verification does not silently permit fabricated quote',()=>{
 const p=data.profiles[0];assert.ok(p.verify_phrase.length>10);
 assert.ok(!readFileSync(join(root,p.source),'utf8').includes('fabricated Galaxy unlock'));
});
test('guide labels optional status as unverified',()=>{
 const text=guide(verify(root));
 assert.match(text,/Official Galaxy location and unlock status remain unknown/);
 assert.match(text,/targeted sample/i);
});
