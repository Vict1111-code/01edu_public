import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {editDistance,candidates,difficulty,references,buildReview} from './rank-piscine-difficulty.mjs';
const rec=(id,group='QUEST-05')=>({language:'go',archive_exercise_id:id,source_group:group,match_status:'exact_top_level_subject',official_subject_path:id,official_readme:'subjects/'+id+'/README.md',public_js_test_paths:[],public_dom_test_paths:[]});
test('name matching is conservative and never treats generic files as official',()=>{
 assert.equal(editDistance('cat','cut'),1);
 assert.deepEqual(candidates('test',['test','test1','testing']),[]);
 assert.ok(candidates('printnbrinorder1',['printnbrinorder','printalphabet']).some(x=>x.public_subject==='printnbrinorder'));
 assert.ok(candidates('sortingintegertable-notmy',['sortintegertable']).length);
});
test('README complexity ranks recursion above simple print at same stage',()=>{
 const simple=difficulty('## Task\n### Instructions\nPrint a letter.',3);
 const hard=difficulty('## Task\n### Instructions\nRecursion must be used to backtrack across a binary tree.',3);
 assert.ok(hard.score>simple.score);
 assert.ok(hard.signals.some(x=>x.id==='recursion'));
 assert.equal(difficulty('text',null).score,null);
});
test('explicit source links distinguish reuse wording from ordinary references',()=>{
 const md='### Instructions\nReuse your Matrix structure defined in [matrix](../matrix/README.md) and consult [strings](../strings/README.md) for general background.';
 const refs=references(md,'matrix_ops',new Set(['matrix','strings','matrix_ops']));
 assert.equal(refs.length,2);
 assert.equal(refs.find(x=>x.from==='matrix').status,'source_wording_supports_dependency');
 assert.equal(refs.find(x=>x.from==='strings').official_unlock,'not_established');
});
test('candidate review does not automatically remap name variants',()=>{
 const root=mkdtempSync(join(tmpdir(),'galaxy-phase13-'));
 try{
  mkdirSync(join(root,'subjects/printalphabet'),{recursive:true});
  writeFileSync(join(root,'subjects/printalphabet/README.md'),'## printalphabet\n### Instructions\nPrint alphabet.\n');
  const cross={records:[rec('printalphabet','QUEST-02'),{...rec('printnbrinorder1'),official_readme:null,official_subject_path:null,match_status:'no_exact_subject_name'}]};
  const index={nodes:[{path:'printalphabet'},{path:'printnbrinorder'}]};
  const data=buildReview(cross,index,{edges:[]},root);
  assert.equal(data.exercise_cards.length,2);
  assert.equal(data.identity_review.length,1);
  assert.equal(data.identity_review[0].automatic_subject_reassignment,false);
  assert.ok(data.identity_review[0].suggestions.length>0);
 }finally{rmSync(root,{recursive:true,force:true});}
});
