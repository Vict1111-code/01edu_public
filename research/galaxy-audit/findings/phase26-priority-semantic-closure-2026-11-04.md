# Phase 26 — Semantic classification closure for 285 priority subjects

**Date:** 2026-11-04  
**Branch:** `research/galaxy-curriculum-audit`  
**Source tree:** `b78ec066b3c1123fc72c65d983aa5190c3f29d79`  
**Scope:** The 285 public subjects in the Phase 24 priority queue that were not previously reviewed in Phase 25.

## Result

The **full set of 285 remaining priority subject IDs** has been inspected through their public README instructions and usage material and assigned an independent educational content category. Together with **32** Phase 25 priority reviews, this accounts for all **317** initially prioritized cases. **Zero** of the original priority IDs are left without a source-content classification.

This is an important scope distinction: **nine** of the reviewed README files are **too short to reconstruct an implementable task**, and four are reference or overview documents rather than independent coding assignments. The appropriate result in these cases is *inspected but specification-incomplete / not-a-standalone-assignment*, not a fabricated project.

| README content category | Subjects |
| --- | ---: |
| Go programming assignments | 86 |
| JavaScript programming assignments | 81 |
| Rust programming assignments | 59 |
| JavaScript/Node CLI, file I/O and server tasks | 12 |
| Browser DOM interaction assignments | 11 |
| Shell command/script tasks | 10 |
| HTML/CSS-only assignments | 9 |
| Incomplete public README stubs | 9 |
| Introductory/setup assignments | 4 |
| Reference documents or track overviews | 4 |
| **Total** | **285** |

The **272 actionable instructional candidates** are not automatically compulsory, not all major projects, and not proof of a particular official Piscine or Galaxy quest position.

## Important manual source distinctions

- **Two Pig Latin subjects:** `pig_latin` has a Rust function interface while `piglatin` is a Go command-line program.
- **Two Reverse Polish Notation subjects:** `rpn` runs as a Rust command-line program and `rpncalc` as Go. They remain separate nodes.
- **Rust bracket matcher:** `brackets_matching` uses `std::env::args()`; do not merge it with Go `brackets`.
- **DOM-suffixed source variants:** `the-calling-dom`, `nesting-organs-dom`, `skeleton-dom`, and `select-and-style-dom` chiefly request HTML structure or CSS styling, not necessarily JavaScript event handling.
- **Different public paths:** `listpushpara` and `listpushparams` have closely related Go linked-list briefs but remain separate source identifiers until duplicate identity is established.
- **Node task family:** `friend-support`, `uninvited` and `gatecrashers` progressively describe guest-list HTTP servers and handling requirements; this is source-content lineage, not an official unlock condition.
- **Historical overview files:** `sys` indexes systems projects, `good-practices` describes software standards, `commandments` provides a historical rules/orientation document, and `functions` is an aggregator notice.
- **Incomplete stubs:** `argsort`, `cloning-vs-copying`, `frozen-more-about-mutability`, `if-methods`, `nested-loops`, `nested-loops-2`, `nested-loops-3`, `recursion` and `repeated` have inadequate README instructions. Mark as source-blocked.

## Reproducible catalog

- [285 explicit manually inspected semantic group assignments](../data/phase26-reviewed-priority-groups.json) — durable compact manifest of all IDs.
- [Source-attesting generator](../scripts/verify-phase26-reviewed-groups.mjs) — checks the pinned Git tree SHA and exact membership against the Phase 24 priority queue; attaches full README blob SHA, a source-text excerpt, and null official metadata.
- [Six regression tests](../scripts/verify-phase26-reviewed-groups.test.mjs) — checks 285/285 coverage, duplicates, hashes, missing IDs, and similar-name variants.
- [GitHub Actions workflow](https://github.com/Vict1111-code/01edu_public/actions/workflows/galaxy-curriculum-audit.yml) — configured to produce `phase26-source-verified-285.json` and `phase26-source-verified-guide.md` as CI artifacts when a runner completes.
- A separate comprehensive JSON/CSV/Markdown catalog was generated and verified locally against the exact Phase 24 priority list during this research session.

## Scope and confidence

This review addresses the **285 remaining priority IDs**. The separate **127 non-priority README sources** from Phase 24 are *not yet manually adjudicated*, and the nine incomplete sources remain specification-limited. No learner solutions or grading tests were executed. The visible Galaxy screenshot provides visual track grouping, while these source classifications provide independent educational semantics. **Current official unlock rules remain unknown.**

The source-attesting CI was configured and queued on November 4, 2026; do not claim successful CI validation until the workflow finishes.
