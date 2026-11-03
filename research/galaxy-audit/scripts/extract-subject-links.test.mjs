import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import {
  extractMarkdownLinks, parseSubjectHref, inferRelationship,
  listSubjectReadmes, analyzeSubjects, run
} from './extract-subject-links.mjs';

test('reads links and captures their context', () => {
  const links = extractMarkdownLinks('Use [ascii-art](../ascii-art) as your previous project.');
  assert.equal(links.length, 1);
  assert.equal(links[0].href, '../ascii-art');
  assert.match(links[0].context, /previous project/);
});

test('resolves sibling project links and parent instructions', () => {
  assert.equal(parseSubjectHref('ascii-art-web/README.md', '../ascii-art'), 'ascii-art');
  assert.equal(parseSubjectHref('ascii-art/color/README.md', '../README.md'), 'ascii-art');
  assert.equal(parseSubjectHref('smart-road/README.md', 'https://public.01-edu.org/subjects/road_intersection/'), 'road_intersection');
  assert.equal(parseSubjectHref('ascii-art-web/README.md', '#instructions'), null);
  assert.equal(parseSubjectHref('forum/README.md', 'https://example.org/docs'), null);
  assert.equal(parseSubjectHref('forum/README.md', '../../outside'), null);
});

test('does not misrepresent a resource as a hard prerequisite', () => {
  const x = inferRelationship({ sourceId: 'forum', targetId: 'ascii-art-web/dockerize',
    context: 'You can read about docker basics in dockerize', label: 'docker basics' });
  assert.equal(x.type, 'learning_resource');
  assert.equal(x.is_official_unlock, false);
});

test('detects parent extension language', () => {
  const x = inferRelationship({ sourceId: 'ascii-art/color', targetId: 'ascii-art',
    context: 'Follow the same instructions as the first subject', label: 'instructions' });
  assert.equal(x.type, 'extension_of_parent');
  assert.equal(x.confidence, 'high');
});

test('walks fixture tree, ignores audit READMEs and exports machine readable output', () => {
  const root = mkdtempSync(join(tmpdir(), 'galaxy-test-'));
  const put = (p, content) => { const name = join(root, p); mkdirSync(dirname(name), { recursive: true }); writeFileSync(name, content); };
  try {
    put('subjects/README.md', '# subject index');
    put('subjects/ascii-art/README.md', '## ascii-art\nRender banners.');
    put('subjects/ascii-art/audit/README.md', '# Manual audit');
    put('subjects/ascii-art-web/README.md', '## Web\nA GUI of the previous project [ascii-art](../ascii-art).');
    put('subjects/forum/README.md', '## forum\nRead about [Docker basics](../ascii-art-web/dockerize/README.md).');
    put('subjects/ascii-art-web/dockerize/README.md', '## Dockerize\nFollow same [principles](../README.md) as the first subject.');
    const subjects = listSubjectReadmes(root);
    assert.equal(subjects.length, 4);
    const out = analyzeSubjects(root);
    assert.equal(out.nodes.length, 4);
    assert.equal(out.nodes.find(x => x.id === 'ascii-art').has_audit_readme, true);
    assert.equal(out.edges.find(x => x.from === 'ascii-art' && x.to === 'ascii-art-web').type, 'prior_project_reference');
    assert.equal(out.edges.find(x => x.from === 'ascii-art-web' && x.to === 'ascii-art-web/dockerize').type, 'extension_of_parent');
    assert.equal(out.edges.find(x => x.from === 'ascii-art-web/dockerize' && x.to === 'forum').type, 'learning_resource');
    const meta = run(root, join(root, 'generated'));
    assert.equal(meta.subject_count, 4);
  } finally { rmSync(root, { recursive: true, force: true }); }
});
