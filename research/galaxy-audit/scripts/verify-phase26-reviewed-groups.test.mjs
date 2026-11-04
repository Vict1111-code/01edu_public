import {test} from 'node:test';
import {strict as assert} from 'node:assert';
import {readFileSync} from 'node:fs';
import {expand,taskPhrase,markdown} from './verify-phase26-reviewed-groups.mjs';
const get=n=>JSON.parse(readFileSync('research/galaxy-audit/data/'+n,'utf8'));
const triage=()=>JSON.parse(readFileSync('research/galaxy-audit/generated/phase24-unmatched-readme-triage.json','utf8'));
const inputs=()=>[get('subject-node-index.json'),triage(),
  get('phase25-first-manual-semantic-reviews.json'),get('phase26-reviewed-priority-groups.json')];
test('all 285 Phase26 priority cases are categorized without overlap and linked to README SHA',()=>{
 const r=expand(...inputs(),p=>readFileSync(p,'utf8'));
 assert.equal(r.records.length,285);
 assert.equal(r.coverage.phase25_already_reviewed,32);
 assert.equal(r.coverage.original_priority,317);
 assert.equal(r.coverage.priority_uninspected,0);
 assert.equal(r.coverage.incomplete_stubs,9);
 assert.equal(r.coverage.reference_overviews,4);
 assert.equal(r.coverage.substantive_assignments,272);
 assert.equal(r.records.filter(x=>x.official_unlock!==null).length,0);
 assert.ok(r.records.every(x=>x.readme_sha));
 assert.match(markdown(r),/Source-linked catalog/);
});
test('priority membership rejects made-up new subject',()=>{
 const a=inputs();a[3].groups.rust_exercise.push('invented-subject');
 assert.throws(()=>expand(...a,p=>readFileSync(p,'utf8')),/outside Phase26 pending priority/);
});
test('same ID in two semantic classes is rejected',()=>{
 const a=inputs();a[3].groups.javascript_exercise.push('piglatin');
 assert.throws(()=>expand(...a,p=>readFileSync(p,'utf8')),/Duplicate classification/);
});
test('source snapshot must stay pinned',()=>{
 const a=inputs();a[3].source_tree_sha='wrong';
 assert.throws(()=>expand(...a,p=>readFileSync(p,'utf8')),/source tree SHA changed/);
});
test('similarly named variants remain independent educational exercises',()=>{
 const r=expand(...inputs(),p=>readFileSync(p,'utf8'));
 const id=new Map(r.records.map(x=>[x.id,x]));
 assert.equal(id.get('pig_latin').language,'Rust');
 assert.equal(id.get('piglatin').language,'Go');
 assert.equal(id.get('rpn').language,'Rust');
 assert.equal(id.get('rpncalc').language,'Go');
 assert.notEqual(id.get('listpushpara').source_path,id.get('listpushparams').source_path);
});
test('source phrase excerpts are exact verbatim spans, including brief stubs',()=>{
 const r=expand(...inputs(),p=>readFileSync(p,'utf8'));
 for(const x of r.records)assert.ok(readFileSync(x.source_path,'utf8').includes(x.source_phrase));
 assert.equal(taskPhrase('### Instructions\n\nWrite a function called hello.'),'Write a function called hello.');
});
