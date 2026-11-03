import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {GATES,evidence,makeCards,guide} from './build-piscine-competencies.mjs';
const rec=(language,id,group)=>({language,archive_exercise_id:id,source_group:group,match_status:'exact_top_level_subject',official_subject_path:id,official_readme:'subjects/'+id+'/README.md',public_js_test_paths:[],public_dom_test_paths:[]});
test('24 stage gates each have outcomes, challenge and checks',()=>{
 assert.equal(Object.values(GATES).flat().length,24);
 for(const gate of Object.values(GATES).flat())assert.ok(gate.every(x=>x.length>15));
});
test('README evidence separates instructions from code samples and recognizes restrictions',()=>{
 const s='## Eight Queens\n### Instructions\nRecursivity must be used. Do not hardcode. '+String.fromCharCode(96).repeat(3)+'go\nfunc A() {}\n'+String.fromCharCode(96).repeat(3)+'\n### Expected function\nfoo\n### Notions\n- [Recursion](https://example.org)';
 const x=evidence(s);assert.equal(x.instructions_present,true);
 assert.ok(x.requirement_signals.includes('recursion'));
 assert.ok(x.requirement_signals.includes('prohibition'));
 assert.equal(x.expected_section,true);assert.equal(x.notions_section,true);
 assert.ok(!x.instruction_excerpt.includes('func A'));
});
test('documented dependency is retained but not represented as Galaxy unlock',()=>{
 const root=mkdtempSync(join(tmpdir(),'galaxy-master-'));
 try{
  mkdirSync(join(root,'subjects/matrix_ops'),{recursive:true});
  writeFileSync(join(root,'subjects/matrix_ops/README.md'),'## matrix_ops\n### Instructions\nReuse Matrix and Scalar structures.\n### Expected Functions\n');
  const cross={records:[rec('rust','matrix_ops','matrix_ops')]};
  const graph={edges:[{from:'matrix',to:'matrix_ops',relation:'requires_prior_structure',source_url:'https://example.org/matrix'}]};
  const x=makeCards(cross,graph,root);
  assert.equal(x.exercise_cards[0].documented_public_references[0].from,'matrix');
  assert.equal(x.exercise_cards[0].documented_public_references[0].official_unlock,'not_established');
  assert.equal(x.exercise_cards[0].requirement_evidence.instructions_present,true);
  assert.match(guide(x,'rust'),/matrix_ops/);
 }finally{rmSync(root,{recursive:true,force:true});}
});
test('duplicate archive records deduplicate and conflicting stage proposals remain unresolved',()=>{
 const x=makeCards({records:[rec('go','printalphabet','QUEST-02'),rec('go','printalphabet','QUEST-05')]},{edges:[]},'/tmp/nonexistent-galaxy-source');
 assert.equal(x.exercise_cards.length,1);assert.equal(x.exercise_cards[0].archive_records,2);
 assert.equal(x.exercise_cards[0].stage_conflict,true);assert.equal(x.exercise_cards[0].proposed_stage,null);
});
test('unknown candidate has no invented official stage or mastery challenge',()=>{
 const x=makeCards({records:[rec('javascript','bloody-sunday','root')]},{edges:[]},'/tmp/nonexistent-galaxy-source');
 assert.equal(x.exercise_cards[0].proposed_stage,null);
 assert.equal(x.exercise_cards[0].official_galaxy_order,null);
 assert.equal(x.exercise_cards[0].suggested_mastery_challenge,null);
});
