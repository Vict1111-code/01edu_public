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
  const m={reviews:[{language:'javascript',exercise:'molecules-cells',suggested_stage:3,decision:'move_earlier',reason:'Basic string mapping',manual_concept_interpretation:['values_functions'],source_url:'https://example.org'}]};
  const r=reconcile(p13,p14,m,root),x=r.languages.javascript.exercise_cards[0];
  assert.equal(x.recommended_stage,3);assert.equal(x.original_proposed_stage,7);
  assert.equal(x.official_galaxy_order,null);assert.equal(x.evidence_status,'manual_full_readme_review');
  assert.deepEqual(x.concept_evidence_layers.manual_readme_interpretation,['values_functions']);
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

test('generic README mentions do not masquerade as specific concept validation',()=>{
 const root=mkdtempSync(join(tmpdir(),'galaxy-generic-'));
 try{
  mkdirSync(join(root,'subjects/generic-example'),{recursive:true});
  writeFileSync(join(root,'subjects/generic-example/README.md'),'## Task\n### Instructions\nCreate a function that returns a value.');
  const p13={exercise_cards:[{language:'javascript',exercise:'generic-example',official_readme:'subjects/generic-example/README.md'}]};
  const p14={languages:{javascript:{exercise_concept_cards:[{exercise:'generic-example',concepts:[],concept_classification:'not_classified',proposed_stage:1,estimated_difficulty:10}]}}};
  const x=reconcile(p13,p14,{reviews:[]},root).languages.javascript.exercise_cards[0];
  assert.equal(x.evidence_status,'README_generic_terms_only');
  assert.equal(x.concept_evidence_layers.README_specific.length,0);
 }finally{rmSync(root,{recursive:true,force:true});}
});

test('nested instruction subsections are preserved through next same-level heading',()=>{
 const md='## Exercise\n### Instructions\nImplement types.\n#### Methods\nUse HashMap and FromStr.\n### Usage\nNot part of instructions.';
 const p=sections(md),r=classifyREADME('rust',md);
 assert.ok(p.instructions.includes('HashMap'));
 assert.ok(!p.instructions.includes('Not part of instructions'));
 assert.ok(r.hits.some(x=>x.concept==='collections'));
 assert.ok(r.hits.some(x=>x.concept==='traits'));
});
