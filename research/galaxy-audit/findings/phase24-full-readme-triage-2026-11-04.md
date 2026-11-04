# Phase 24 — Full-source triage of the remaining archive-unmatched subject READMEs

**Run date:** 2026-11-04  
**Pinned public subject tree:** `b78ec066b3c1123fc72c65d983aa5190c3f29d79`  
**Run:** [GitHub Actions 41843405790](https://github.com/Vict1111-code/01edu_public/actions/runs/41843405790) — **success**  
**Data retention:** The full generated JSON and review queue are in the run artifact, currently retained 14 days; the generator and this summary remain committed in Git.

## What was completed

A deterministic Node.js scanner read the **entire README text of all 446 previously unreviewed, archive-unmatched top-level subjects** rather than relying on names, directory hierarchy, or community Piscine labels. Each generated record preserves:

- Top-level public subject ID and README path;
- Indexed Git README blob SHA, to identify exactly which source was inspected;
- Candidate educational content type and conservative confidence;
- Instruction, signature, or deliverable signal excerpts where observed;
- Language candidates and evidence strength;
- Explicit **null** fields for official Piscine membership, Galaxy placement, and unlock rules.

The 446 are the remainder of the **455 subjects without a matching community Piscine archive name**, after excluding nine previously manually inspected READMEs. The tenth source review in Phase 22 was a subject already matched in the Go archive and was correctly excluded from this 446-subject scan.

## Full source-derived results

| Metric | Count |
| --- | ---: |
| Entire README sources read | **446** |
| Prior manually inspected archive-unmatched subjects | 9 |
| Archive-unmatched sources now covered in total | **455** |
| Category confidence: high | 143 |
| Category confidence: medium | 126 |
| Category confidence: low | 177 |
| Priority manual review queue (uncertain category or language) | **317** |
| Language identifiable from more than one unambiguous pattern | 237 |
| Language unresolved under conservative heuristic | 209 |

### Candidate content types

| Automated source-text category | Subjects |
| --- | ---: |
| Function-exercise candidates | 168 |
| CLI or standalone program-exercise candidates | 72 |
| Other small exercise candidates | 16 |
| Browser/DOM-exercise candidates | 12 |
| Unresolved — manual semantic review needed | 177 |
| README with no non-whitespace text | 1 |
| **Total** | **446** |

No project or track overview was confidently identified by the *specific rules of this first-pass detector*. **This is a limitation of the detector, not evidence that the 446 contain no major projects or track containers.** The unresolved group must be inspected before claiming completeness.

### Provisional language signals

| Language signal | Subjects |
| --- | ---: |
| Go | 104 |
| Rust | 77 |
| JavaScript | 56 |
| Unresolved/multiple insufficient signals | 209 |
| **Total** | **446** |

Source languages may be underdetected because function signatures may be absent, instructions may describe other languages, and HTML examples may mix JS or browser APIs. Never treat these language labels as official assignment requirements without checking README restrictions and expected signatures.

## Validation

[Five automated tests](../scripts/triage-remaining-446.test.mjs) passed, including complete 446-README access, identity and blob SHA reconciliation, preservation of unverified official fields, duplicate rejection, function-exercise signals, track-container detection, and mixed-language caution. This scan ran alongside the earlier Phase 22 and Phase 23 tests; the CI workflow completed successfully.

## Outputs

- [Reproducible full README classifier](../scripts/triage-remaining-446.mjs)
- [Regression tests](../scripts/triage-remaining-446.test.mjs)
- [Full generated JSON, Markdown report, and summary in GitHub Actions artifacts](https://github.com/Vict1111-code/01edu_public/actions/runs/41843405790/artifacts/13330192050)
- [Persisted Phase 22 source identity crosswalk](../data/phase22-nonaudited-coverage.json)
- [Persisted Phase 23 Galaxy image anchor crosswalk](../data/phase23-galaxy-visual-anchors.json)

The full generated JSON is reproducible by checking out the exact research branch and executing:

```bash
node --test research/galaxy-audit/scripts/triage-remaining-446.test.mjs
node research/galaxy-audit/scripts/triage-remaining-446.mjs . research/galaxy-audit/generated
```

## Next phase — evidence-driven semantic adjudication

1. Inspect the 177 low-confidence source READMEs and the 140 additional cases flagged for language or category ambiguity, avoiding duplicate review.
2. Examine the single apparently blank README and whether instructions or tests reside in another file.
3. Distinguish Go/Rust/JS exercises, major projects, cross-language assignments, overview containers, optional satellites, and resource-only material, with explicit source-excerpt attestation.
4. Combine independently confirmed project classes with the 84 screenshot-matched Galaxy anchor nodes, *without* inventing visual positions for unmatched subjects.
5. Publish a durable source-linked catalog and uncertainty queue for the eventual interactive Galaxy.

**Interpretive warning:** This first pass is a parser-supported triage, not a completed manual semantic catalog. Neither confidence labels nor screenshot proximity establish 01Edu's official dashboard unlocks.
