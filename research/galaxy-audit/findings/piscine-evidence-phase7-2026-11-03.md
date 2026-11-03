# Phase 7 — Public Go/Rust/JavaScript Piscine evidence scan

**Run:** https://github.com/Vict1111-code/01edu_public/actions/runs/41649375925  
**Date:** 2026-11-03  
**Method:** Static content analysis of all public subject README files; language-specific syntax and CLI markers are scored separately from explicit Piscine wording. No private Galaxy metadata or official quest numbers were accessed.

## First complete content-based classification

| Heuristic dominant language | Subject README count |
| --- | ---: |
| Go | 319 |
| Rust | 149 |
| JavaScript | 196 |
| Ambiguous / other languages | 569 |
| **Total** | **1,233** |

Additional findings: **4** READMEs explicitly mention a named language Piscine; **8** match the conservative raid-wording patterns.

**Crucial:** these are *language indicators*, not official Piscine enrollment lists. For example, `smart-road` is a later project that mentions the Rust Piscine, and Go is also used throughout Imperative and Full-Stack core projects. Some ambiguous projects may be in Go/Rust/JS without code samples, and some non-target languages may be detected as ambiguous. No official quest ordering can be inferred from these counts.

## Source-confirmed anchors

- `subjects/hello_rust/README.md`: explicitly identifies the **first Rust Piscine exercise**, including repository setup and Cargo instructions.
- `subjects/road_intersection/README.md`: traffic-intersection simulation and raid audit references; `subjects/smart-road/README.md` explicitly describes it as a Rust Piscine raid.
- `subjects/quadchecker/README.md`: explicitly says **this raid is based on the quad functions**.
- `subjects/go-reloaded/README.md`: congratulates learner on admission and asks reuse of functions from an old repository; useful as a transition from selection to core, but does not list a specific official prerequisite ID.
- `subjects/3-directions/README.md`, `access/README.md`, `all/README.md`: JavaScript learning exercises. Their complete Piscine quest sequence remains unverified.

## Deliverables

- [Language and Piscine evidence scanner](../scripts/classify-piscine-evidence.mjs)
- [Seven unit tests](../scripts/classify-piscine-evidence.test.mjs)
- GitHub Actions artifact **galaxy-subject-link-audit** includes `piscine-language-evidence.json` (all subjects, language scores and evidence) and `piscine-explicit-mentions.json` (named Piscine and raid-wording candidates).
- Existing curated relationship graph remains separate from the new language classifier.

## Next: reliable Piscine groupings

1. Review the four explicit Piscine mentions to distinguish exercises from retrospective references.
2. Review the eight raid-wording matches; reject incidental uses of “raid”.
3. Identify additional first/last exercise, quest, and assessment markers; avoid imposing invented ranks.
4. Build a source-backed `track_membership` table with `confirmed`, `candidate`, and `unknown` confidence.
5. Cross-check with historical Galaxy screenshot and official curriculum releases.

The research branch is isolated from `master`. No private platform data was accessed.
