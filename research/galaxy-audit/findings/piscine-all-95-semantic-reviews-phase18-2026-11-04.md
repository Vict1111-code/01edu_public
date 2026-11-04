# Phase 18 — Closure of all 95 remaining Piscine source-semantic reviews

**Reviewed and verified:** 4 November 2026  
**Research branch:** `research/galaxy-curriculum-audit`  
**Successful GitHub Actions run:** [41822999757](https://github.com/Vict1111-code/01edu_public/actions/runs/41822999757)  
**Complete 95-row readable register:** [Phase 18 source-reviewed exercise guide](../guides/phase18-all-95-source-reviewed-exercises.md)

## Outcome

The previous Phase 17 pipeline had **95 exercise records** still requiring full source-semantic classification. **All 95 have now received explicit manual interpretation of the published subject instructions, a source phrase, and a source-integrity check in CI.**

| Item | Go | Rust | JavaScript | Total |
| --- | ---: | ---: | ---: | ---: |
| Previously pending full semantic review | 61 | 8 | 26 | **95** |
| Matching public subject instructions reviewed | 60 | 8 | 26 | **94** |
| Wrong-language public subject collision | 1 | 0 | 0 | **1** |
| Still pending full semantic review | 0 | 0 | 0 | **0** |

Across all prior research phases the master index retains **316 distinct identifiers** from the three *community* archives (154 Go, 63 Rust, 99 JavaScript). The Phase 18 integration recommends **43 learning-stage adjustments** compared with Phase 17, and retains 35 unplaced identifiers: **34 community files whose official assignment identity is not established**, plus the **one public Rust/Go collision**. Being unplaced does not mean the learner's file or its algorithm is invalid.

## Critical identity correction — Go archive `rot`

The community Go archive contains `random-prep/rot.go`, a Go scratch program which prints a numeric rotation-index sequence. The published [`subjects/rot/README.md`](https://github.com/01-edu/public/blob/master/subjects/rot/README.md) instead requires a Rust rotation-cipher function accepting `String` and `i8`. An exact basename match here is **not valid evidence** of an official Go assignment.

The Go archive's `rot` record is retained as historical community evidence, marked `wrong_language_source_excluded`, and **not assigned a Go stage or verified Go concepts**. The public Rust subject remains freely accessible, but it is not silently inserted into the separate Rust archive crosswalk.

## Representative semantic corrections

### Go

- [`abort`](https://github.com/01-edu/public/blob/master/subjects/abort/README.md): return the median of five integer arguments; *function parameters are not command-line arguments*.
- [`fibonacci`](https://github.com/01-edu/public/blob/master/subjects/fibonacci/README.md): the public requirement **explicitly mandates recursion** and forbids `for` loops.
- [`atoibase`](https://github.com/01-edu/public/blob/master/subjects/atoibase/README.md): validate the base alphabet before parsing; reject duplicate characters and invalid base strings.
- [`listforeachif`](https://github.com/01-edu/public/blob/master/subjects/listforeachif/README.md): linked-list traversal plus a predicate and a callback.
- [`sortlistinsert`](https://github.com/01-edu/public/blob/master/subjects/sortlistinsert/README.md): sorted linked-list insertion with a documented structure dependency on `listsort`.
- [`printcombn`](https://github.com/01-edu/public/blob/master/subjects/printcombn/README.md): generate strictly increasing digit combinations efficiently. Recursion may be a useful technique, but the README does **not** mandate it.

### Rust

- [`shopping_mall`](https://github.com/01-edu/public/blob/master/subjects/shopping_mall/README.md): navigate supplied structures for store, employee, guard and salary operations; this belongs with integrated collections/state exercises.
- [`commits_stats`](https://github.com/01-edu/public/blob/master/subjects/commits_stats/README.md): aggregate commit metadata using JSON, maps and calendar weeks.
- [`question_mark`](https://github.com/01-edu/public/blob/master/subjects/question_mark/README.md): propagate through deeply nested `Option` values, rather than indexing a generic array.
- [`unwrap_or_expect`](https://github.com/01-edu/public/blob/master/subjects/unwrap_or_expect/README.md): enum-controlled error policy on `Result<String, String>`, including intentional panic cases.

### JavaScript

- [`pimp-my-style`](https://github.com/01-edu/public/blob/master/subjects/pimp-my-style/README.md): browser class toggling and click handlers; not merely array manipulation.
- [`keycodes-symphony`](https://github.com/01-edu/public/blob/master/subjects/keycodes-symphony/README.md): keyboard event processing, dynamic DOM notes and reset/delete behavior.
- [`all`](https://github.com/01-edu/public/blob/master/subjects/all/README.md): Promise aggregation over object properties.
- [`gougle-search`](https://github.com/01-edu/public/blob/master/subjects/gougle-search/README.md): concurrent requests to three servers under a common 80 ms timeout.
- [`race`](https://github.com/01-edu/public/blob/master/subjects/race/README.md): re-create `Promise.race` and gather the first N successful resolutions.
- [`series`](https://github.com/01-edu/public/blob/master/subjects/series/README.md): sequential execution of asynchronous functions.

## Implementation and verification

New reviewed source registers:

- [Go — 61 records](../data/phase18-go-61-source-reviews.json)
- [Rust — 8 records](../data/phase18-rust-8-source-reviews.json)
- [JavaScript — 26 records](../data/phase18-javascript-26-source-reviews.json)

Reproducible implementation:

- [Phase 18 reconciliation and source attestation script](../scripts/complete-semantic-piscine-reviews.mjs).
- [Nine passing tests](../scripts/complete-semantic-piscine-reviews.test.mjs).
- [Full 95-exercise human-readable register](../guides/phase18-all-95-source-reviewed-exercises.md).
- [Successful Actions run with downloadable artifact](https://github.com/Vict1111-code/01edu_public/actions/runs/41822999757).

The script checks all 95 against the **exact previous pending queue**, validates each source path, checks literal or Markdown-format-normalized instruction evidence, records the checked-out README's complete **SHA-256**, and rejects the wrong-language `rot` collision. It never manufactures official quest numbers, assessment results, or Galaxy unlock gates.

The validated artifact includes the consolidated `piscine-phase18-complete-source-audit.json` (all 316 candidates), `piscine-phase18-completed-95-review-log.json`, `piscine-phase18-unplaced-candidates.json`, and three source-linked progressive guides. The existing 24 independently authored practical mastery assessments remain available as part of the same workflow artifact.

## What is finished — and what is not

**Finished:** the specific **95-item Phase 17 pending full semantic review queue** is **0/95 remaining**. There is no exercise in that queue awaiting its initial manual source interpretation.

**Not established:** official private 01Edu Galaxy assignment membership, exact chronological quest order, grader tests, unlock prerequisites or scores. Another **35 community archive identifiers** are still unplaced because 34 lack confirmed public assignment identity and one was explicitly found to match a public subject in the wrong programming language. Their identity cannot be made official by additional guessing.

The previous numerical difficulty estimates have not been psychometrically calibrated against learner performance, and no learner's actual code was graded.

**Repository integrity:** all changes remain on `research/galaxy-curriculum-audit`; the original public subjects and both repositories' `master` branches were left unchanged.
