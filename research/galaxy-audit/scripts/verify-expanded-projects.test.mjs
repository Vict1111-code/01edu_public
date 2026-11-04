import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {build,guide} from './verify-expanded-projects.mjs';
const root=resolve('.');
const data=JSON.parse(readFileSync(join(root,'research/galaxy-audit/data/phase21-expanded-project-candidates.json'),'utf8'));
test('33 additional audit-bearing project candidates are uniquely classified',()=>{
 assert.equal(data.records.length,33);
 assert.equal(new Set(data.records.map(x=>x.id)).size,33);
});
test('all 56 audited top-level subjects accounted for with exclusion set',()=>{
 const d=build(root);
 assert.equal(d.summary.top_level_with_audit,56);
 assert.equal(d.summary.additional_source_reviewed,33);
 assert.equal(d.summary.previously_sampled_satellites,6);
 assert.equal(d.summary.screenshot_core_count,17);
});
test('each source and public audit is attested by content SHA-256',()=>{
 for(const x of build(root).records){
  assert.match(x.subject_sha256,/^[a-f0-9]{64}$/);
  assert.match(x.audit_sha256,/^[a-f0-9]{64}$/);
  assert.equal(x.source_attested,true);
 }
});
test('cross-language applications are not folded into Go Imperative',()=>{
 const d=build(root);
 const apps=d.records.filter(x=>x.learning_family==='cross_language_apps');
 assert.equal(apps.length,5);
 assert.deepEqual(apps.map(x=>x.language_policy).sort(),['c_required','cpp_required','php_laravel_required','python_django_required','ruby_rails_required']);
});
test('existing Piscine exercises and raid nodes are not double-counted',()=>{
 const d=build(root);
 assert.equal(d.records.find(x=>x.id==='sortable').learning_family,'javascript_piscine_existing');
 assert.equal(d.records.find(x=>x.id==='quad').learning_family,'go_piscine_raids');
 assert.equal(d.records.find(x=>x.id==='carbon-copy').classification,'web_raid');
});
test('source-explicit statistics and framework reference chains remain non-official',()=>{
 const d=build(root);
 assert.ok(d.source_reference_edges.some(x=>x.from==='math-skills'&&x.to==='guess-it-1'));
 assert.ok(d.source_reference_edges.some(x=>x.from==='linear-stats'&&x.to==='guess-it-2'));
 assert.ok(d.source_reference_edges.some(x=>x.from==='mini-framework'&&x.to==='bomberman-dom'));
 assert.ok(d.source_reference_edges.every(x=>x.gate==='unknown'));
});
test('Linux VM sequence and standalone algorithms are kept in separate families',()=>{
 const d=build(root);
 for(const id of ['add-vm','connect','linux','login','remote','scan'])
  assert.equal(d.records.find(x=>x.id===id).learning_family,'linux_sysadmin');
 assert.equal(d.records.find(x=>x.id==='push-swap').learning_family,'systems_and_algorithms');
});
test('study guide warns about incomplete public catalog coverage',()=>{
 assert.match(guide(build(root)),/other 736 top-level/i);
 assert.match(guide(build(root)),/No placement or unlock is claimed to be official/i);
});
