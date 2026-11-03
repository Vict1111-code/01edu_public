import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {sections,classifyREADME,reconcile,guide} from './verify-piscine-concepts.mjs';
test('README instructions are isolated from later sections and fenced code',()=>{
 const tick=String.fromCharCode(96);
 const md='## Task\n### Instructions\nUse recursion to print a result.\n'+tick.repeat(3)+'go\nfunc fake(){ /* binary tree */ }\n'+tick.repeat(3)+'\n### Usage\nThe usage example mentions DOM and binary trees.';
 const s=sections(md),r=classifyREADME('go',md);
 assert.ok(s.instructions.includes('recursion'));
 assert.ok(!s.instructions.includes('DOM'));
 assert.ok(r.hits.some(x=>x.concept==='recursion'));
 assert.ok(!r.hits.some(x=>x.concept==='binary_trees'));
});
test('Rust trait and collection concepts are source-labeled',()=>{
 const r=classifyREADME('rust','## Task\n### Instructions\nImplement the FromStr trait for a BloodType struct containing a HashMap of values.');
 assert.ok(r.hits.some(x=>x.concept==='traits'&&x.source_section==='instructions'));
 assert.ok(r.hits.some(x=>x.concept==='collections'));
});
test('JS regex/date tasks do not become official prerequisites',()=>{
 const r=classifyREADME('javascript','## Task\n### Instructions\nCreate a RegEx that matches a Date pattern.');
 assert.ok(r.hits.some(x=>x.concept==='regex_dates'));
 assert.ok(r.hits.every(x=>x.evidence_type==='source_instruction_keyword'));
});
test('Notions-only matches remain distinguishable from Instructions',()=>{
 const r=classifyREADME('rust','## Task\n### Instructions\nImplement the behavior.\n### Notions\n- Lifetime annotations\n');
 assert.ok(r.hits.some(x=>x.concept==='lifetimes'&&x.source_section==='notions'));
});
test('Manual stage adjustment preserves original and rejects official order',()=>{
 const root=mkdtempSync(join(tmpdir(),'galaxy-phase15-'));
 try{
  mkdirSync(join(root,'subjects/molecules-cells'),{recursive:true});
  writeFileSync(join(root,'subjects/molecules-cells/README.md'),'## Task\n### Instructions\nCreate two functions converting a DNA string into RNA.');
  const p13={exercise_cards:[{language:'javascript',exercise:'molecules-cells',official_readme:'subjects/molecules-cells/README.md'}]};
  const p14={languages:{javascript:{exercise_concept_cards:[{exercise:'molecules-cells',concepts:[],concept_classification:'not_classified',proposed_stage:7,estimated_difficulty:54}]}}};
  const m={reviews:[{language:'javascript',exercise:'molecules-cells',suggested_stage:3,decision:'move_earlier',reason:'Basic string mapping',source_url:'https://example.org'}]};
  const r=reconcile(p13,p14,m,root),x=r.languages.javascript.exercise_cards[0];
  assert.equal(x.recommended_stage,3);assert.equal(x.original_proposed_stage,7);
  assert.equal(x.official_galaxy_order,null);assert.equal(x.evidence_status,'README_instruction_keyword');
  assert.match(guide(r,'javascript'),/reviewed stage change/);
 }finally{rmSync(root,{recursive:true,force:true});}
});
test('Missing public README does not gain source evidence from a filename',()=>{
 const p13={exercise_cards:[{language:'go',exercise:'split2',official_readme:null}]};
 const p14={languages:{go:{exercise_concept_cards:[{exercise:'split2',concepts:[],concept_classification:'not_classified',proposed_stage:null,estimated_difficulty:null}]}}};
 const r=reconcile(p13,p14,{reviews:[]},'/tmp/nonexistent-public-repo');
 const x=r.languages.go.exercise_cards[0];
 assert.equal(x.evidence_status,'no_public_README');assert.deepEqual(x.source_concept_evidence,[]);
});
