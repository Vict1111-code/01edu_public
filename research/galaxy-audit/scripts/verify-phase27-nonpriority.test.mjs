import {test} from 'node:test';
import {strict as assert} from 'node:assert';
import {readFileSync} from 'node:fs';
import {reconcile,sourcePhrase,report} from './verify-phase27-nonpriority.mjs';
const load=n=>JSON.parse(readFileSync('research/galaxy-audit/data/'+n,'utf8'));
const input=()=>[load('subject-node-index.json'),load('phase22-nonaudited-coverage.json'),
 load('phase25-first-manual-semantic-reviews.json'),load('phase26-reviewed-priority-groups.json'),
 load('phase27-nonpriority-reviewed-groups.json'),load('phase23-galaxy-visual-anchors.json')];
const text=p=>readFileSync(p,'utf8');
test('127 source inspection records fully reconcile after Phase25 and Phase26 exclusions',()=>{
 const d=reconcile(...input(),text);
 assert.deepEqual([d.counts.total,d.counts.go,d.counts.javascript,d.counts.rust],[127,94,21,12]);
 assert.equal(d.counts.visual_anchors,0);
 assert.equal(new Set(d.records.map(x=>x.id)).size,127);
 assert.ok(d.records.every(x=>x.source_readme_sha&&x.source_excerpt&&x.official_unlock===null));
 assert.match(report(d),/Final 127 nonpriority/);
});
test('language and topic classification prevent overlapping IDs',()=>{
 const a=input();a[4].groups.rust.push('addfront');
 assert.throws(()=>reconcile(...a,text),/Duplicate source ID/);
});
test('identity verification detects counterfeit Git SHA and unknown subject',()=>{
 const a=input();a[0].nodes.find(x=>x.path==='addfront').readme_sha='fake';
 assert.throws(()=>reconcile(...a,text),/README SHA mismatch/);
});
test('source snippets are literal, and unavailable sources fail',()=>{
 const a=input();
 assert.throws(()=>reconcile(...a,p=>p.endsWith('addfront/README.md')?'':text(p)),/Missing instructions/);
 assert.equal(sourcePhrase('## test\n### Instructions\nWrite a code function to process the values.\n'),'Write a code function to process the values.');
});
test('individual cross-language assignments are retained',()=>{
 const d=reconcile(...input(),text),m=new Map(d.records.map(x=>[x.id,x.language]));
 assert.equal(m.get('logic_number'),'rust');
 assert.equal(m.get('armstrong_number'),'rust');
 assert.equal(m.get('js-snakepath-validator'),'javascript');
 assert.equal(m.get('btreetransplant'),'go');
});
