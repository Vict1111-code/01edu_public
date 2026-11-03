# Galaxy subject-reference extractor

This is an **independent static analyzer**, not an official Galaxy API or an unlock/dependency authority. It scans `subjects/` for README files at any directory depth, identifies Markdown references to other subject folders, and exports a machine-readable graph with confidence labels.

## How to run (Node.js 18+)

From the repository root:

```bash
node --test research/galaxy-audit/scripts/extract-subject-links.test.mjs
node research/galaxy-audit/scripts/extract-subject-links.mjs . research/galaxy-audit/generated
```

The second command creates:

- `generated/subject-link-extraction.json` — node metadata, candidate edges, external references, and unresolved local links.
- `generated/subject-link-edges.csv` — easier for spreadsheet review and graph import.
- `generated/subject-node-summary.csv` — audit flags and link-count summary.

No network is required; the source must be cloned locally. No external npm packages are needed.

## Classifications and limitations

- `extension_of_parent`: the current nested subject links back to its parent with wording such as "same instructions" or "first subject".
- `prior_project_reference`: wording suggests an earlier project was used; **not** an official enrollment prerequisite.
- `learning_resource`: documentation, standards or learning links; **never** interpret as a hard unlock.
- `parent_reference` / `link_reference`: weaker links requiring manual analysis.
- `unresolved_local`: local links that do not identify an indexed subject; might reference images, code, or support files rather than missing assignments.

**The classifier is heuristic.** A 180-character context window can contain unrelated language. The parser currently handles ordinary inline Markdown links and select official subject URLs; it does not exhaustively parse reference-style definitions, links with nested parentheses, HTML `<a>` links, or plain-text project mentions. Humans must review all candidate prerequisite edges. The script never sets `is_official_unlock` to true.

The `audit/README.md` and optional `audit.md` flags describe review material presence, not executable grading. Outputs are generated on your machine and are intentionally not committed by this phase.

## Validation status (2026-11-03)

A five-test Node test suite is committed, but **was not executed in this session**: source cloning from the execution environment failed due to DNS/network restriction. The implementation and tests should be run on a local checkout or CI before relying on their output. Separately, 16 public README bodies were inspected directly through GitHub; the [manual validation sample](../data/extractor-manual-validation-sample.json) records **15 human-classified subject references** and distinguishes extension lineage from Docker resource references. This is **not** an all-subject extraction result.

The next phase should execute the complete parser and audit false positives/negatives against sampled READMEs, then compare the resulting graph with the Galaxy screenshot.
