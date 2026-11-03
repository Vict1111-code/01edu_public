# Phase 11 — Progressive concept/difficulty paths for Go, Rust and JavaScript

**Date:** 2026-11-03  
**CI:** [Successful workflow run](https://github.com/Vict1111-code/01edu_public/actions/runs/41654804253)  
**Sources:** [322-record archive-to-public-subject crosswalk](../data/three-piscines-subject-crosswalk.json), public `subjects/` READMEs, community solution archive folder provenance, and public JS/DOM test-file name matches.

## Result

All three Piscines now have **eight proposed progressive learning stages**, organized by software engineering concepts, estimated difficulty, and source-linked exercises.

| Language | Archive records | Staged | Pending verification / scratch | Stage distribution (1→8) |
| --- | ---: | ---: | ---: | --- |
| Go | 160 | **131** | **29** | 9, 13, 22, 28, 8, 12, 15, 24 |
| Rust | 63 | **63** | **0** | 10, 13, 6, 8, 6, 3, 11, 6 |
| JavaScript | 99 | **98** | **1** | 7, 18, 18, 14, 9, 8, 15, 9 |
| **Total** | **322** | **292** | **30** | |

**Critical distinctions:** These are **community archive candidate records**, not deduplicated official exercise counts. Some staged Go candidates are unverified or misspelled filenames; their `confidence` is `review_required`. The 29 unclassified Go records are mainly learner practice/scratch files, and the single unclassified JS record is `bloody-sunday` (no exact public subject name match in the indexed snapshot).

## Study guides with direct links

- [Go — 160 records across shell/Go fundamentals, recursion, strings, slices, files, linked lists, binary trees, raids](../guides/go-progressive-learning-path.md)
- [Rust — 63 records across primitives, control flow, ownership, errors, collections, traits, math, applications](../guides/rust-progressive-learning-path.md)
- [JavaScript — 99 records across syntax, data structures, functional JS, async, DOM, advanced algorithms, applications](../guides/javascript-progressive-learning-path.md)

Each guide links matched exercises to their **official public subject README**, and links to a public audit or JS/DOM test file where the crosswalk contains a path. It also records the community archive folder and flags unmatched names.

## Representative concept progressions

**Go:** `printalphabet` → `basicatoi` → `fibonacci` → `capitalize` → `split` → `foreach` → `listat` → `btreeapplybylevel`. The examples are **illustrative concept ordering**, not an official prerequisite chain.

**Rust:** `expected_variable` → `arrays` → `ownership` → `error_types` → `collect` → `traits` / `lifetimes` → `matrix_ops` → `boxing_todo`. `matrix_ops` explicitly reuses earlier `matrix` and `lalgebra_scalar` structures; that relationship is source-confirmed.

**JavaScript:** `how-2-js` → `abs` → `collections` → `using-map` → `get-json` → `build-brick-and-break` → `valid-ip` → `block-chain`. These examples show progression from basic syntax through functional and async programming to DOM work and more integrated exercises; not every example is a direct prerequisite.

## Reproducibility and quality controls

- [Progressive sequencing script](../scripts/sequence-piscines.mjs): uses manually curated concept categories and community folder provenance, reads official public READMEs for additional concept markers, writes combined JSON, per-language CSV, and Markdown.
- [Seven automated tests](../scripts/sequence-piscines.test.mjs): verify stage definitions, language assignments, separation of official vs community order, and preservation of unknowns.
- [CI artifact](https://github.com/Vict1111-code/01edu_public/actions/runs/41654804253): downloadable generated `piscine-progressive-sequences.json`, three `*-progressive-sequence.csv`, and three `*-progressive-study-guide.md`.

## Methodological limitations

1. The stage and difficulty scores are **pedagogical estimates**, not 01Edu ratings.
2. **Within-stage ordering** is not fully validated against every exercise's actual prerequisite concepts.
3. Go grouping reflects **one community learner's QUEST folders** and is not independently verified as official.
4. JavaScript and Rust assignments are grouped by a curated taxonomy of exercise names, spot-checked against official README content; many individual placements still need full semantic review.
5. **An exercise's README may be more demanding than its name suggests**; tests and audits require content-level inspection.
6. Confirmed Rust `hello_rust` entry point is absent from the user-uploaded Rust solution archive; it is linked as a prelude rather than counted among 63 archived candidates.
7. `road_intersection` and `quadchecker` are mentioned separately as raid anchors without inventing official placement.

## Next phase

- Review stage boundaries and exact prerequisite concepts against the README text, starting with exercises near each transition.
- Identify the **first independent mastery checks** for each stage: writing tests, debugging, code review, CLI tooling, and implementation from scratch.
- Produce a learner-facing dashboard that can track stage completion while keeping official Galaxy progress separate from this reconstructed educational curriculum.
- Continue broader foundational Galaxy reconstruction and later specializations separately.

**Safety:** Changes committed only on `research/galaxy-curriculum-audit`; neither repository's `master` branch changed.
