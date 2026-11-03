# Phase 17 — Semantic review and independent mastery assessment

Date: 2026-11-03. Branch: `research/galaxy-curriculum-audit`.

## Scope and evidence quality

The previous curriculum combined public README keywords, manually reviewed public instructions, filename hints, and community archive sources. **A keyword match is not equivalent to a technical prerequisite.**

Phase 17 adds **30 new full public README semantic reviews** (10 Go, 10 Rust, 10 JavaScript) with a source phrase that is checked against the actual public README in CI. Each reviewed exercise now has an explicit concept allowlist, rejected concept tags, a teaching-stage recommendation, and a short source-based rationale.

The source reconciliation processes **316 unique community archive candidates** and creates a prioritized queue of remaining keyword-only classifications. The 34 unmatched community source identities are now **excluded from the staged curriculum**, while remaining visible in an unplaced section. This exclusion is a confidence policy, not evidence that the community exercises are invalid.

## Examples of corrections

| Language | Subject | Source-grounded correction |
| --- | --- | --- |
| Go | [isprime](https://github.com/01-edu/public/blob/master/subjects/isprime/README.md) | Remove sorting and tree-traversal labels; optimized primality testing |
| Go | [findnextprime](https://github.com/01-edu/public/blob/master/subjects/findnextprime/README.md) | Remove sorting and tree-traversal labels; next-prime algorithm |
| Go | [basicjoin](https://github.com/01-edu/public/blob/master/subjects/basicjoin/README.md) | Function arguments are not command-line arguments |
| Go | [flags](https://github.com/01-edu/public/blob/master/subjects/flags/README.md) | CLI flag parsing and ASCII ordering; no shell scripting requirement |
| Rust | [bigger](https://github.com/01-edu/public/blob/master/subjects/bigger/README.md) | Stage 1 to 5; requires HashMap |
| Rust | [border_cross](https://github.com/01-edu/public/blob/master/subjects/border_cross/README.md) | Stage 2 to 6; traits, generics, references and lifetimes |
| Rust | [profanity_filter](https://github.com/01-edu/public/blob/master/subjects/profanity_filter/README.md) | Stage 8 to 4; small Result-based validator, not a capstone |
| JavaScript | [sortable](https://github.com/01-edu/public/blob/master/subjects/sortable/README.md) | Stage 3 to 8; fetch-driven browser table with search and pagination |
| JavaScript | [filter](https://github.com/01-edu/public/blob/master/subjects/filter/README.md) | Remove Promise label: reject is an array predicate operation |
| JavaScript | [fifty-shades-of-cold](https://github.com/01-edu/public/blob/master/subjects/fifty-shades-of-cold/README.md) | Stage 2 to 6; DOM creation, styling and click interaction; no fetch |
| JavaScript | [unicode-technical-report-35](https://github.com/01-edu/public/blob/master/subjects/unicode-technical-report-35/README.md) | Stage 2 to 7; date token formatter, not DOM |
| JavaScript | [physics](https://github.com/01-edu/public/blob/master/subjects/physics/README.md) | Stage 7 to 3; pure acceleration arithmetic, not game implementation |

The full 30-record [manual verdict dataset](../data/phase17-semantic-source-verdicts.json) is authoritative for these **independent pedagogical classifications**, not for official Galaxy metadata.

## Twenty-four original practical mastery assessments

A new [assessment blueprint](../data/phase17-original-stage-assessments.json) contains **eight progressively harder projects for each of Go, Rust and JavaScript**. Each stage specifies the expected deliverable, testable requirements, concepts, test command and submission evidence. CI also publishes a human-readable combined handbook.

| Dimension | Proposed points |
| --- | ---: |
| Correctness | 50 |
| Boundary and failure cases | 20 |
| Automated tests | 20 |
| Explanation and maintainability | 10 |
| **Suggested mastery threshold** | **80/100 overall, with at least 40 correctness points** |

These are **original educational assessments**. They are not official 01Edu audit questions, scores, assessment requirements, or Galaxy unlocks. Passing requires actual work and evaluation; this research does not claim to have graded a learner.

## Reproducibility

- [Source-verdict JSON](../data/phase17-semantic-source-verdicts.json)
- [Semantic reconciliation and priority queue generator](../scripts/apply-semantic-source-reviews.mjs)
- [Validation tests](../scripts/apply-semantic-source-reviews.test.mjs)
- [Original stage assessments](../data/phase17-original-stage-assessments.json)
- GitHub Actions produces `piscine-phase17-semantic-curriculum.json`, `piscine-phase17-pending-source-reviews.json`, three language-specific reviewed guides and `phase17-original-mastery-assessments.md`.

The source phrase is verified against the checked-out public README for each new manual verdict. Unreviewed keyword classifications retain their uncertainty. **Official Galaxy quest ordering and unlock conditions remain unestablished.** Both repositories' `master` branches are untouched.
