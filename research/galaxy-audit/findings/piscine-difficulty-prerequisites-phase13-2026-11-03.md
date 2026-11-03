# Phase 13 — Requirement-based difficulty ranking and cautious prerequisite/identity review

**Date:** 2026-11-03  
**Successful CI:** [run 41660170809](https://github.com/Vict1111-code/01edu_public/actions/runs/41660170809)  
**Sources:** the [three-Piscine archive crosswalk](../data/three-piscines-subject-crosswalk.json), [1,233-node public subject index](../data/subject-node-index.json), [curated reference graph](../data/curated-graph-snapshot.json), and complete local public subject README content.

## Result

Phase 13 adds a **transparent provisional difficulty score (0–100)** within the eight pedagogical stages, a conservative public-subject name-suggestion review, and explicit README-linked prerequisite evidence. This is **not** an official 01Edu difficulty rating, Galaxy unlock sequence, or a score validated against real learner performance.

| Language | Distinct candidate identifiers | Scored using README + stage | Not scored | Unmatched with name suggestions | Unmatched without safe suggestion | Target of source-backed relationship |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Go | 154 | **115** | 39 | **6** | 27 | 0 |
| Rust | 63 | **63** | 0 | 0 | 0 | **2** |
| JavaScript | 99 | **98** | 1 | 0 | 1 | 0 |
| **Total** | **316** | **276** | **40** | **6** | **28** | **2** |

The **40 unscored** entries are a mixture of missing public README matches and subjects that lack a confident proposed stage; do not interpret them as missing official exercises.

## How the difficulty score works

A proposed stage supplies an initial difficulty prior. The public README adds bounded complexity signals, such as recursion, linked-list/tree manipulation, Rust ownership, generic traits, async JavaScript, DOM events, matrix arithmetic, error handling, algorithmic reasoning, requirement length, and number of bullet-point constraints. The resulting 0–100 score sorts exercises **within their proposed stage**.

**Important limitations:** Keywords and instruction length are imperfect proxies for cognitive difficulty. An elegant short dynamic-programming exercise may be harder than a lengthy README. Scores are useful for provisional study planning but must be reviewed against actual concepts, hidden constraints, assessment results, and learner experience.

## Name-variant review

Six Go archive identifiers received **suggestions only**, not automatic official-subject mappings:

| Archive identifier | Possible public subject | Interpretation |
| --- | --- | --- |
| `printcombn23123123` | `printcombn` | Numeric learner suffix; verify content |
| `sortingintegertable-notmy` | `sortintegertable` | Likely local copy/variant; verify content |
| `printnbrinorder1` | `printnbrinorder` | Likely numbered local variant; verify content |
| `arrange` | `arrange_it` | Similar name but weak evidence |
| `firstruneprog` | `firstrune` | Plausible program wrapper; verify content |
| `split2` | `split` | Plausible numbered variant; verify content |

There are **27 other unmatched Go identifiers** and **one unmatched JavaScript identifier** (`bloody-sunday`) without safe automatic name suggestions. `student` remains a nested-name collision with `mobile-dev/student`, not a confirmed Go assignment. Manual source checks for seven cases are stored in [Phase 13 identity review](../data/phase13-manual-identity-review.json). Similarity never changes the original identity field.

## Publicly documented dependencies

The existing manually curated graph establishes the following Rust structure relationships:

- `lalgebra_scalar` → `matrix`
- `lalgebra_scalar` → `matrix_ops`
- `matrix` → `matrix_ops`

Both `matrix` and `matrix_ops` are archive exercise targets with documented incoming relationships. The public `matrix_ops` README explicitly says it reuses earlier Matrix and Scalar structures. These relationships **do not prove Galaxy unlock conditions**.

For Go and JavaScript, this scan did not identify any additional target exercise with a sufficiently explicit public subject-link dependency. That is a limitation of the evidence method, **not proof that those exercises have no conceptual prerequisites**.

## Reproducible implementation

- [Ranking and cautious identity/dependency review script](../scripts/rank-piscine-difficulty.mjs)
- [Four automated tests](../scripts/rank-piscine-difficulty.test.mjs)
- [Manual identity review](../data/phase13-manual-identity-review.json)
- [CI run and generated artifact](https://github.com/Vict1111-code/01edu_public/actions/runs/41660170809)

The artifact contains:
- `piscine-difficulty-and-dependency-review.json` — 316 unique candidate cards with score explanations, concept signals, provenance and documented source references.
- `piscine-unmatched-review.json` — unresolved names and nonbinding suggestions.
- `go-difficulty-ranked-guide.md`, `rust-difficulty-ranked-guide.md`, `javascript-difficulty-ranked-guide.md` — all eight stages, sorted within stages by estimated complexity.
- Prior crosswalk, competency evidence, and stage mastery guides.

## Next work

1. Compare likely name variants against original exercise **source contents or documented instructions**, not only filename similarity.
2. Build concept prerequisite maps with **explicit confidence categories**: verified README link, inferred educational concept dependency, and unknown.
3. Review outlier difficulty scores manually, especially recursive algorithms, Rust ownership/lifetimes, and interactive DOM projects.
4. Keep Galaxy official quest/unlock metadata separate until independently verified.

**Repository safety:** all writes are confined to `research/galaxy-curriculum-audit`; both repositories' `master` branches remain untouched.
