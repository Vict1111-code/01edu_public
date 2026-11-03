# Phase 12 — Per-exercise requirements, documented references, and mastery gates

**Date:** 2026-11-03  
**Verified CI:** [run 41656816416 — success](https://github.com/Vict1111-code/01edu_public/actions/runs/41656816416)  
**Inputs:** [322-record crosswalk](../data/three-piscines-subject-crosswalk.json), [Phase 11 progressive taxonomy](../scripts/sequence-piscines.mjs), [curated public reference graph](../data/curated-graph-snapshot.json), and the actual public `subjects/<name>/README.md` files.

## Result — deduplicated exercises

The 322 archive candidate records reduce to **316 unique language/exercise identifiers**. This deduplication matters especially for Go: multiple learner folders can contain a copy of the same exercise. The original community folder provenance is retained.

| Metric | Go | Rust | JavaScript | Total |
| --- | ---: | ---: | ---: | ---: |
| Unique exercise candidates | **154** | **63** | **99** | **316** |
| Public README found and read | 121 | 63 | 98 | **282** |
| README with Instructions section | 121 | 62 | 97 | **280** |
| README with Notions section | 41 | 44 | 78 | **163** |
| README with Expected section | 96 | 54 | 8 | **158** |
| Candidate with mapped public JS/DOM test file | 0 | 0 | 97 | **97** |
| Target of documented public relationship in curated graph | 0 | 2 | 0 | **2** |
| Unclassified unique candidate | 23 | 0 | 1 | **24** |
| Conflicting community stage groups | 0 | 0 | 0 | **0** |

**The 34 candidates without a matching README are not necessarily nonexistent official exercises.** They may be scratch work, renamed tasks, or learner-specific names. Absence of mapped tests/audits is not evidence of no grading. README headings are parsed conservatively and may be absent despite substantive instructions.

## 24 mastery gates: eight per language

Every proposed stage now has:
1. A measurable learning objective.
2. An independently designed practical assessment.
3. Suggested self-check pass criteria.
4. Linked exercise candidates and public instructions.
5. Evidence signals extracted from the source README (restrictions, error behavior, recursion, ordering, Unicode, memory semantics).

The mastery challenges are **our own teaching material**, not official 01Edu exams, audit rubrics, hidden tests, or Galaxy unlock conditions.

## Manually checked exercise requirements

A [12-subject validation sample](../data/phase12-manual-mastery-validation.json) directly paraphrases public READMEs and separates them from suggested test cases. Highlights:

- **Go `basicatoi`:** current subject says only valid digit strings are tested; no signs or error return required. The self-check may still explore leading zeros and numeric boundaries.
- **Go `eightqueens`:** recursion is required; output is ascending and one solution per line.
- **Go `listat`:** return the node pointer for a requested position; return `nil` on error.
- **Go `btreeapplybylevel`:** invoke the callback in level order.
- **Rust `hello_rust`:** first Rust Piscine exercise and repository setup; absent from the uploaded Rust solution archive, so **not included** in the 63 archive candidates.
- **Rust `borrow`:** accepts a borrowed string and returns length in characters.
- **Rust `matrix_ops`:** explicitly reuses the earlier `matrix` and `lalgebra_scalar` structures; the curated graph records both references to `matrix_ops`, and `lalgebra_scalar` → `matrix`.
- **Rust `boxing_todo`:** parse JSON todo data and handle multiple error variants.
- **JavaScript `how-2-js`:** explicit JS Piscine entry and runtime introduction.
- **JavaScript `get-json`:** async `fetch`, URL parameters, HTTP errors, parsed JSON.
- **JavaScript `build-brick-and-break`:** timed DOM brick creation and click-driven interactions.
- **JavaScript `gossip-grid`:** dynamic gossip cards, form submission and range-controlled appearance.

## Evidence discipline

The generator reads actual public READMEs and stores a **partial instruction excerpt**, section headings, keyword-based requirement signals, and linked external resources. Those excerpts **must not be used as complete requirements**. The official README and available tests are linked separately. Stage difficulty, study order and mastery checks remain independent recommendations.

The only source-backed prior-subject edges in the curated graph that target these archive exercises are the Rust matrix relationships. This **does not** mean other exercises have no prerequisites: most dependencies are not represented by explicit links in the public README corpus.

## Reproducible artifacts

- [Source evidence and mastery generator](../scripts/build-piscine-competencies.mjs)
- [Five new automated tests](../scripts/build-piscine-competencies.test.mjs)
- [Manual twelve-exercise source validation](../data/phase12-manual-mastery-validation.json)
- [GitHub Actions run and downloadable artifact](https://github.com/Vict1111-code/01edu_public/actions/runs/41656816416)

The CI artifact includes:
- `piscine-competency-evidence.json` — all 316 unique exercise cards, provenance, source excerpts, and recommended mastery criteria.
- `go-mastery-and-requirements.md`
- `rust-mastery-and-requirements.md`
- `javascript-mastery-and-requirements.md`

## Next phase

Audit the 24 unresolved distinct candidates and strengthen the 8-stage sequencing with **actual README concept prerequisites**, especially JS DOM prerequisites, Go list/tree data-structure dependencies, and Rust ownership/lifetime boundaries. Keep evidence-backed prerequisites separate from recommended learning order.

**Repository safety:** research branch only; `master` unchanged.
