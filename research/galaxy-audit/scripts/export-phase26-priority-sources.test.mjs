import {test} from 'node:test';
import {strict as assert} from 'node:assert';
import {readFileSync} from 'node:fs';
import {build} from './export-phase26-priority-sources.mjs';
const data=x=>JSON.parse(readFileSync('research/galaxy-audit/data/'+x,'utf8'));
const source=x=>readFileSync(x,'utf8');
const full=()=>[data('subject-node-index.json'),
 JSON.parse(readFileSync('research/galaxy-audit/generated/phase24-unmatched-readme-triage.json','utf8')),
 data('phase25-first-manual-semantic-reviews.json')];
test('full priority bundle contains exactly 285 distinct source texts',()=>{
 const r=build(...full(),source);
 assert.equal(r.total,285);
 assert.equal(r.phase25_priority_previously_reviewed,32);
 assert.equal(new Set(r.records.map(x=>x.id)).size,285);
 assert.ok(r.records.every(x=>x.full_readme_text.length>0));
});
test('source identities, original priority and Phase25 exclusions are stable',()=>{
 const [ix,p24,p25]=full();
 const r=build(ix,p24,p25,source);
 assert.ok(r.records.every(x=>p24.priority_manual_review_queue.some(y=>y.id===x.id)));
 assert.ok(r.records.every(x=>!p25.entries.some(y=>y.id===x.id)));
 assert.ok(r.records.every(x=>x.readme_sha&&x.source_path==='subjects/'+x.id+'/README.md'));
});
test('fabricated source SHA fails before reading README',()=>{
 const [a,b,c]=full();const first=b.priority_manual_review_queue.find(x=>!c.entries.some(y=>y.id===x.id));
 first.readme_sha='wrong';
 assert.throws(()=>build(a,b,c,source),/README SHA mismatch/);
});
