import test from 'node:test';
import assert from 'node:assert/strict';
import { curate, toCsv } from './build-curated-graph.mjs';

const mk=(from,to,category)=>({from,to,category,rationale:'sample evidence',evidence:[{source_file:'subjects/'+to+'/README.md',label:'source',href:'../'+from+'/README.md',context:'README sentence'}]});
test('retains evidence-based lineage but never claims unlock rules',()=>{
 const x=curate({pairs:[mk('ascii-art','ascii-art-web','prior_project_lineage'),mk('forum','real-time-forum','prior_project_lineage')]});
 assert.equal(x.metadata.graph_edges,2);
 assert.ok(x.edges.every(e=>e.official_unlock==='not_established'));
});
test('removes coding standards from learning-path graph but keeps evidence',()=>{
 const x=curate({pairs:[mk('good-practices','forum','coding_standard'),mk('ascii-art-web/dockerize','forum','learning_resource')]});
 assert.equal(x.metadata.graph_edges,0);
 assert.equal(x.metadata.excluded_reference_edges,2);
});
test('overrides eight ambiguous cases with explicit manual distinctions',()=>{
 const x=curate({pairs:[
  mk('matrix','matrix_ops','needs_manual_review'),
  mk('mini-framework','bomberman-dom','needs_manual_review'),
  mk('make-your-game/different-maps','bomberman-dom','needs_manual_review'),
  mk('mobile-dev/secure-notes','mobile-dev/package','needs_manual_review')
 ]});
 assert.equal(x.metadata.graph_edges,3);
 assert.equal(x.metadata.excluded_reference_edges,1);
 assert.equal(x.edges.find(e=>e.from==='matrix').relation,'requires_prior_structure');
 assert.equal(x.edges.find(e=>e.from==='mini-framework').relation,'requires_prior_project_output');
 assert.equal(x.non_progression_references[0].relation,'optional_resource');
});
test('does not infer relationships when there is only a resource reference',()=>{
 const x=curate({pairs:[mk('mobile-dev/chess/resources','mobile-dev/chess','supporting_asset_reference')]});
 assert.equal(x.metadata.graph_edges,0);
 assert.equal(x.nodes.length,0);
});
test('CSV includes source evidence and stable headers',()=>{
 const x=curate({pairs:[mk('ascii-art','ascii-art-web','prior_project_lineage')]});
 assert.match(toCsv(x),/source_files/);
 assert.match(toCsv(x),/subjects\/ascii-art-web\/README\.md/);
});
