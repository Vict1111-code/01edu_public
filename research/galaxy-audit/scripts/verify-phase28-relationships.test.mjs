import {test} from 'node:test';
import {strict as assert} from 'node:assert';
import {readFileSync} from 'node:fs';
import {attest} from './verify-phase28-relationships.mjs';
const get=n=>JSON.parse(readFileSync('research/galaxy-audit/data/'+n,'utf8'));
const inputs=()=>[get('subject-node-index.json'),get('phase28-source-supported-relationships.json')];
const src=p=>readFileSync(p,'utf8');
test('all seven reused-function and data-structure links have source evidence',()=>{
 const result=attest(...inputs(),src);
 assert.equal(result.verified_source_relations,7);
 assert.equal(result.official_unlocks_asserted,0);
});
test('fabricated excerpt fails independent README verification',()=>{
 const [a,b]=inputs();
 b.edges[0].evidence_phrase='never included in this README';
 assert.throws(()=>attest(a,b,src),/Evidence quote missing/);
});
test('no official unlock claim can be promoted from a source dependency',()=>{
 const [a,b]=inputs();
 b.edges[0].official_platform_unlock=true;
 assert.throws(()=>attest(a,b,src),/Unsupported official unlock/);
});
test('renamed/duplicated cross-exercise path is rejected',()=>{
 const [a,b]=inputs();
 b.edges[1].from=b.edges[0].from;
 b.edges[1].to=b.edges[0].to;
 assert.throws(()=>attest(a,b,src),/Duplicate relationship/);
});
