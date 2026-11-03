# Phase 14 — Source-inspected identities, concept prerequisite DAGs, and difficulty outliers

**Date:** 2026-11-03  
**CI verification:** [Successful GitHub Actions run 41662508732](https://github.com/Vict1111-code/01edu_public/actions/runs/41662508732)  
**Working branch:** `research/galaxy-curriculum-audit`

## What changed

This phase uses **actual user-supplied learner source files** to revisit the uncertain subject-name mappings from Phase 13, rather than assuming that similar filenames mean the same assignment. It also constructs three **acyclic concept prerequisite graphs**, distinct from the limited source-documented exercise dependency graph, and flags estimated difficulty outliers for further human review.

The learner solution ZIPs were **not committed or redistributed**. Only the resulting observations, function names, file sizes, SHA-256 prefixes, and review dispositions are stored in [the 34-case source inspection](../data/phase14-source-inspected-identity-review.json).

## Source-level identity review

**34 unique unresolved archive identifiers inspected:** 33 Go and one JavaScript. Classification:

| Disposition | Count | Interpretation |
| --- | ---: | --- |
| Matching exported function, assignment not confirmed | 10 | Same public API name is present; correctness and full equivalence untested |
| Related variant, non-exact signature | 1 | Similar behavior but different required exported name |
| Rectangle raid family, unverified official mapping | 4 | Source draws rectangles; official raid identity not established |
| Shell command, unverified subject | 5 | Shell script behavior inspected, no matching public subject confirmed |
| Independent practice | 7 | Scratch algorithm/data-structure experiments |
| Empty scratch | 1 | Zero-byte source file |
| Incomplete scratch | 2 | Fragmentary/malformed source |
| False name match rejected | 1 | `split2` does not implement `split` |
| False nested subject match rejected | 1 | `student` is not `mobile-dev/student` |
| Related concept but non-exact public API | 1 | `testmyprime` prime-factorization demo |
| Historical/community JS, no current subject match | 1 | `bloody-sunday` six-day calendar function |
| **Total** | **34** | |

**Specific corrections:**
- `split2.go` converts an integer to characters, **not** strings split by a separator. Phase 13's name-only suggestion was wrong and is now rejected.
- `student.go` is a linked-list person example, unrelated to `mobile-dev/student`; the nested-name collision is rejected.
- `printnbrinorder1.go` declares `PrintNbrInOrder1` instead of the public required `PrintNbrInOrder`; it is a **related variant**, not an exact-signature solution.
- `sortingintegertable-notmy.go` and `sorting.go` both declare `SortIntegerTable`, matching the public API, but compilation and correctness have not been established.
- `com2.go` declares `PrintComb2` but includes malformed Go assignment syntax. Do **not** mark it as a passing solution.
- `raid1a`–`raid1d` implement rectangle drawing, but no authoritative mapping to an official raid quest number has been found.

The manual review is **not** a code correctness audit. No tests were run against the learner solutions.

## Concept prerequisite graphs

The [durable learning map](../guides/three-piscines-concept-prerequisite-map.md) presents a readable view. The generated JSON contains concept nodes, directed educational relationships, reviewed exercise anchors, README keyword hints, name-only hints, and public subject references as **separate evidence types**.

| Measure | Go | Rust | JavaScript | Total |
| --- | ---: | ---: | ---: | ---: |
| Distinct exercise candidates | 154 | 63 | 99 | **316** |
| Concept nodes | 15 | 15 | 13 | **43** |
| Recommended concept edges | 15 | 16 | 15 | **46** |
| Manually curated concept anchors | 10 | 13 | 9 | **32** |
| README keyword-based concept matches | 21 | 15 | 6 | **42** |
| Name-only, low-confidence concept hints | 70 | 8 | 39 | **117** |
| Concept not yet classified | 53 | 27 | 45 | **125** |
| Documented public subject-reference edges | 0 | 3 | 0 | **3** |
| Difficulty outliers queued for review | 8 | 10 | 11 | **29** |

**Critical interpretation:** 191 of 316 exercises have at least one concept annotation, but **117 are based only on filenames** and should not be presented as verified technical requirements. Only 32 are manually curated anchors. The 46 concept edges are pedagogical inferences, **not official Galaxy unlock conditions**.

### Examples of the difference

- **Go:** functions → recursion → tree traversal is a useful conceptual path, but linked-list work is not a strict prerequisite to binary trees. Both depend on pointer understanding.
- **Rust:** ownership → borrowing → lifetimes is a useful learning path. The `matrix`/`lalgebra_scalar` → `matrix_ops` relationship has separate public README support.
- **JavaScript:** runtime/functions branch into both **Promises/fetch** and **DOM/events**. The latter is not blocked by the former. A later integrated application may use both.

## Difficulty review queue

The prior 0–100 scores are **heuristics**, based on stage priors and public README keyword/length signals. This phase flags 29 combinations for manual checking (Go 8, Rust 10, JavaScript 11). The presence of an outlier is **not** evidence of a bad official curriculum or wrong answer. Examples worth reviewing include `boxing_todo`, `matrix_ops`, `btreeapplybylevel`, `is-winner`, and `race`.

## Implementation, tests, and outputs

- [Source-inspected identity review, 34 cases](../data/phase14-source-inspected-identity-review.json)
- [Concept DAG builder and exercise classification](../scripts/build-concept-prerequisites.mjs)
- [Six new automated tests](../scripts/build-concept-prerequisites.test.mjs): DAG validation, cycle rejection, independent JS DOM path, rejected aliases, evidence-type separation, and low-confidence concept tagging.
- [Readable three-Piscine prerequisite map](../guides/three-piscines-concept-prerequisite-map.md)
- [Successful CI run with generated artifact](https://github.com/Vict1111-code/01edu_public/actions/runs/41662508732)

The CI artifact includes `piscine-concept-prerequisite-graph.json` and separate `go`, `rust`, `javascript` concept-prerequisite guides, as well as earlier Phase 11–13 evidence and ranking files.

## Remaining gaps / recommended Phase 15

1. **125 exercises lack even a provisional concept tag**; inspect their full READMEs and classify them manually.
2. **117 name-only concept hints** need README-based verification before use as instructional prerequisites.
3. **29 difficulty outliers** need human analysis and documented score corrections, especially where a short README hides difficult algorithms.
4. For uncertain community files, test compilation and exported signatures in **isolated fixtures**, without altering the user's source ZIPs.
5. Keep official quest/raid chronology and Galaxy unlock conditions **unknown** until a reliable official source is available.

**Safety:** The main and historical AI repositories' `master` branches remain untouched.
