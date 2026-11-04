import {test} from 'node:test';
import {strict as assert} from 'node:assert';
import {readFileSync} from 'node:fs';
import {triageOne,detectLanguages,build,report} from './triage-remaining-446.mjs';

const data=x=>JSON.parse(readFileSync('research/galaxy-audit/data/'+x,'utf8'));

test('Go expected-function exercise is provisional, source-evidenced, and not assigned to Galaxy',()=>{
 const r=triageOne('fake-go','# Go thing\n### Instructions\nWrite a function that returns 2.\n### Expected function\n'+
 'func Example(x int) int { return 2 }\n$ go run .','abc');
 assert.equal(r.suggested_content_category,'function_exercise_candidate');
 assert.equal(r.category_confidence,'high');
 assert.equal(r.detected_language,'go');
 assert.equal(r.official_unlock,null);
 assert.ok(r.readme_evidence.some(e=>e.signal==='expected_signature_or_output'));
});
test('track overview does not become project simply because it contains Quest and Raid',()=>{
 const r=triageOne('course','# Intro\nQuest 1: first\nQuest 2: second\nQuest 3: third\nRaid 1: group\n','sha');
 assert.equal(r.suggested_content_category,'track_or_course_overview');
 assert.equal(r.category_confidence,'high');
});
test('mixed signals and ambiguous texts are left unresolved',()=>{
 const lang=detectLanguages('func Foo() {}\ngo run .\nconsole.log(x)\nlet x = 3');
 assert.equal(lang.candidate,null);
 const r=triageOne('x','## Story\nThis is a description with no instructions.','sha');
 assert.equal(r.suggested_content_category,'needs_manual_review');
 assert.equal(r.category_confidence,'low');
});
test('source identity and unique backlog requirement enforced',()=>{
 const ix={tree_sha:'x',nodes:[{path:'subject',depth:1,readme_sha:'s',audit_readme_sha:null}]};
 const p22={source_tree_sha:'x',counts:{unreviewed_archive_unmatched:1,archive_unmatched_without_audit:1},
  other_unaudited_subjects:[{id:'subject',readme_sha:'s',source_review:null}]};
 const p23={source_repository_tree_sha:'x',tracks:[]};
 const result=build(ix,p22,p23,()=> '# Work\n### Instructions\nWrite a program.');
 assert.equal(result.records.length,1);
 assert.match(report(result),/README files inspected: 1/);
 assert.throws(()=>build(ix,{...p22,other_unaudited_subjects:[...p22.other_unaudited_subjects,...p22.other_unaudited_subjects]},p23,()=>''),/duplicate/);
 assert.throws(()=>build(ix,{...p22,source_tree_sha:'wrong'},p23,()=>''),/SHA mismatch/);
});
test('live research snapshot has exactly 446 full README files readable and no fabricated official state',()=>{
 const x=build(data('subject-node-index.json'),data('phase22-nonaudited-coverage.json'),
  data('phase23-galaxy-visual-anchors.json'),p=>readFileSync(p,'utf8'));
 assert.equal(x.counts.total_readmes_read,446);
 assert.equal(x.counts.preexisting_manually_reviewed_excluded,9);
 assert.equal(x.counts.covered_archive_unmatched_total,455);
 assert.equal(x.records.length,new Set(x.records.map(n=>n.id)).size);
 assert.equal(x.counts.high_category_confidence+x.counts.medium_category_confidence+
  x.counts.low_category_confidence,446);
 assert.ok(x.records.every(n=>n.source_readme_sha&&n.official_unlock===null&&
  n.official_galaxy_track===null&&n.official_piscine_membership===null));
 assert.equal(x.counts.screenshot_anchors_in_this_backlog,0);
});
