import test from 'node:test';
import assert from 'node:assert/strict';
import {CONCEPTS,topological,assemble,report} from './build-concept-prerequisites.mjs';
test('each Piscine concept graph is a directed acyclic graph',()=>{
 for(const [language,c] of Object.entries(CONCEPTS)){
  const order=topological(c.nodes,c.edges);
  assert.equal(order.length,c.nodes.length,language);
  for(const [from,to] of c.edges)assert.ok(order.indexOf(from)<order.indexOf(to));
 }
});
test('cycles and dangling concept references are rejected',()=>{
 assert.throws(()=>topological(['a','b'],[['a','b'],['b','a']]),/cycle/);
 assert.throws(()=>topological(['a'],[['a','b']]),/Unknown/);
});
test('JavaScript DOM is not incorrectly gated behind asynchronous fetch',()=>{
 const js=CONCEPTS.javascript;
 assert.ok(js.edges.some(([a,b])=>a==='values_functions'&&b==='dom'));
 assert.ok(!js.edges.some(([a,b])=>a==='fetch_json'&&b==='dom'));
});
test('manual source review rejects split2 and unrelated mobile-dev student collision',()=>{
 const p={exercise_cards:[{language:'go',exercise:'split2',proposed_stage:null,difficulty:null,source_based_prerequisite_candidates:[]},
 {language:'go',exercise:'student',proposed_stage:null,difficulty:null,source_based_prerequisite_candidates:[]}]};
 const review={records:[
 {language:'go',archive_exercise_id:'split2',disposition:'false_name_match_rejected',possible_public_subject:null},
 {language:'go',archive_exercise_id:'student',disposition:'false_nested_subject_match_rejected',possible_public_subject:null}
 ]};
 const d=assemble(p,review),a=d.languages.go.exercise_concept_cards;
 assert.equal(a[0].source_identity_confirmed,false);
 assert.ok(a.every(x=>x.suggested_public_identity===null));
 assert.ok(a.some(x=>x.identity_disposition==='false_name_match_rejected'));
});
test('documented subject edges stay distinct from recommended concept edges',()=>{
 const p={exercise_cards:[{language:'rust',exercise:'matrix_ops',proposed_stage:7,
  difficulty:{score:69,signals:[{id:'generics'}]},
  source_based_prerequisite_candidates:[{from:'matrix',relation:'requires_prior_structure',evidence_source:'subjects/matrix_ops/README.md'}]}]};
 const d=assemble(p,{records:[]});
 const rust=d.languages.rust;
 assert.equal(rust.documented_subject_references[0].from,'matrix');
 assert.equal(rust.documented_subject_references[0].official_unlock,'not_established');
 assert.ok(rust.concept_edges.every(e=>e.evidence_type==='educational_inference'));
 assert.match(report(d,'rust'),/matrix → matrix_ops/);
});
