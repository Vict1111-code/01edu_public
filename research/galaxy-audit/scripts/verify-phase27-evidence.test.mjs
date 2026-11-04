import {test} from 'node:test';
import {strict as assert} from 'node:assert';
import {readFileSync} from 'node:fs';
import {validate} from './verify-phase27-evidence.mjs';
const load=n=>JSON.parse(readFileSync('research/galaxy-audit/data/'+n,'utf8'));
const input=()=>[load('subject-node-index.json'),load('phase23-galaxy-visual-anchors.json'),
 load('phase27-nine-source-gaps.json'),load('phase27-prerequisite-evidence-register.json'),
 load('phase27-nonpriority-reviewed-groups.json')];
const source=p=>readFileSync(p,'utf8');
test('reconciles current incomplete specs and 16 source-attested relationships',()=>{
 const r=validate(...input(),source);
 assert.deepEqual([r.counts.nonpriority_source_ids,r.counts.unresolved_current_readme_stubs,
 r.counts.historically_recovered_sources,r.counts.verified_image_anchors],[127,9,1,84]);
 assert.deepEqual([r.counts.README_supported_relationships,r.counts.README_describes_prior_work,
 r.counts.contextual_or_resource_only,r.counts.pedagogical_recommendations],[16,12,4,6]);
});
test('source reference phrase cannot be invented',()=>{
 const a=input();a[3].verified_source_relationships[0].evidence_phrase='made-up-source-content';
 assert.throws(()=>validate(...a,source),/Evidence phrase missing/);
});
test('official unlock metadata cannot be inferred from README prior work',()=>{
 const a=input();a[3].verified_source_relationships[0].official_platform_unlock=true;
 assert.throws(()=>validate(...a,source),/Invented official requirement/);
});
test('historical argsort cannot masquerade as present specification',()=>{
 const a=input();a[2].entries.find(x=>x.id==='argsort').historical_restoration.status='current_official';
 assert.throws(()=>validate(...a,source),/Historical recovery was assigned as current/);
});
test('exact current source file requirements must not be fabricated',()=>{
 const a=input();a[2].entries.find(x=>x.id==='argsort').source_phrase='Old text that is not in current README';
 assert.throws(()=>validate(...a,source),/Stub text attestation failed/);
});
test('visual screenshot count is stable and does not position the 127 new exercises',()=>{
 const a=input();a[4].groups.go.push('ascii-art');
 assert.throws(()=>validate(...a,source),/Nonpriority ID unexpectedly placed on screenshot/);
});
