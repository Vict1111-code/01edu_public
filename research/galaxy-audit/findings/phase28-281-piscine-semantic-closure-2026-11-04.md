# Phase 28 — Complete semantic source review of 281 archive-matched Piscine candidates

**Date:** 2026-11-04  
**Repository:** [Vict1111-code/01edu_public](https://github.com/Vict1111-code/01edu_public)  
**Research branch:** `research/galaxy-curriculum-audit`  
**Pinned source tree:** `b78ec066b3c1123fc72c65d983aa5190c3f29d79`  
**Purpose:** Finish source-semantic adjudication for the 281 top-level README-bearing subjects without a directly indexed `audit/README.md`, whose **names** also match entries from three user-supplied community Go, Rust and JavaScript Piscine solution archives.

## 1. Final 281-source reconciliation

The prior research already included **200 independent human README-based semantic reviews**. Phase 28 **reused** those exact reviews and inspected the remaining **81 complete public README files**. The joined dataset contains **281 distinct subject identifiers, each mapped to a pinned public Git README blob SHA and source evidence**, without guessing platform unlock order.

| Human README review cohort | Subjects |
| --- | ---: |
| Phase 18 Go | 61 |
| Phase 18 JavaScript | 26 |
| Phase 18 Rust | 8 |
| Phase 16 mixed-source reviews | 76 |
| Phase 17 additional semantic verdicts (excludes audited `sortable`) | 29 |
| **Previously reviewed (distinct)** | **200** |
| Phase 28 newly inspected full READMEs | **81** |
| **Total distinct** | **281** |

### Source language vs. community archive label

| Source task language or medium | Verified review count |
| --- | ---: |
| Go | **118** |
| Rust | **63** |
| JavaScript | **97** |
| Shell / file-system commands | **3** |
| **Total** | **281** |

The archive-name labels were Go 121, Rust 63 and JavaScript 97; the **three Go-name matches below are source-authoritative shell tasks**, so archive folder names cannot be treated as a definitive assignment-language rule.

- [`make-it-better`](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/make-it-better/README.md): create a precise Linux directory structure, permissions, timestamps and links; submit a `done.tar` archive.
- [`to-git-or-not-to-git`](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/to-git-or-not-to-git/README.md): create a `.sh` command script to extract superhero JSON fields.
- [`who-are-you`](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/who-are-you/README.md): use `curl` and `jq` in a shell script for an exact superhero name.

[`how-2-js`](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/how-2-js/README.md) is an introductory JavaScript environment and hello-world exercise, not an advanced application or an authoritative complete Piscine track listing.

## 2. Competencies covered in the 81 newly source-reviewed subjects

**Go:** printable output, runes, ASCII conversions, higher-order callbacks, sorting, linked-list operations, binary-search trees and recursive eight-queens search. The manual subset contains 19 Go exercises and three Go-archive shell tasks. Examples: `basicatoi`, `foreach`, `listremoveif`, `btreeapplybylevel`, `eightqueens`, `ztail`.

**Rust (31):** arrays and borrowing, lifetime annotations, ownership, enums, error types and `Result`, traits, generic algebra, matrix arithmetic, iterator implementation, dynamic programming, file and JSON handling, and small multi-component simulation/data-model assignments. Examples: `box​​ing_todo` (a JSON TODO parser with boxed error types), `edit_distance`, `roman_numbers_iter`, `lalgebra_scalar`, `matrix_ops`, `blood_types`.

**JavaScript (28):** basic functions, arrays/collections, closures, regular expressions, async fetch, `Date`, callbacks and higher-order functions, plus browser DOM event projects including a brick tower, gossip grid, color picker and scrolling gallery. `block-chain` is a JavaScript chained-object exercise; it does **not** belong to the later specialization branch merely because its title says blockchain.

The [81-entry direct-source-review manifest](../data/phase28-direct-81-source-reviews.json) records each subject's language, educational type, skills and manually written instructional summary.

## 3. Public test evidence (not proof of passing)

The [public archive crosswalk](../data/three-piscines-subject-crosswalk.json) contains exact test-file path matches for **97 JavaScript source subjects**. The final [281-record catalog](../data/phase28-complete-281-catalog.json) includes those paths, while its source validator checks the files exist in the pinned checkout. Test-file matches do **not** establish learner success, official assessment rules or complete private test coverage. Missing indexed public tests likewise do not mean a subject has no evaluator.

## 4. Seven additionally documented cross-exercise relationships

Direct-source quotations were checked in the corresponding target README:

| Source work | Subsequent subject | Source-backed educational relationship |
| --- | --- | --- |
| `edit_distance` | `expected_variable` | Reuse earlier edit-distance implementation |
| `roman_numbers` | `roman_numbers_iter` | Reuse RomanNumber type from previous exercise |
| `lalgebra_scalar` | `matrix` | Use earlier Scalar trait |
| `lalgebra_scalar` | `lalgebra_vector` | The Vector generic is explicitly bounded by Scalar |
| `matrix` | `matrix_ops` | Reuse Matrix structure |
| `lalgebra_scalar` | `matrix_ops` | Reuse Scalar trait |
| `listsort` | `sortedlistmerge` | Reuse prior NodeI linked-list structure |

These **implementation or type reuse** relationships are not official platform unlock rules. Source-backed dependencies, pedagogical ordering suggestions and screenshot placements remain distinct evidence classes. The [seven-edge evidence register](../data/phase28-source-supported-relationships.json) preserves direct quotes, exact source path and README SHA.

## 5. Research-wide coverage

Combining the earlier work with Phase 28:

| Source cohort | Distinct top-level README subjects |
| --- | ---: |
| Unaudited and unmatched to community Piscine archives — Phases 22/25/26/27 | **455** |
| Unaudited and archive-name matched — Phases 16/17/18/28 | **281** |
| **All unaudited top-level subjects now source-semantically reviewed** | **736** |
| Top-level subjects with indexed public audit README, researched in earlier phases | **56** |
| **Top-level README-bearing public subjects accounted for** | **792** |

The account includes source-insufficient stubs and an unavailable placeholder. It **does not** mean every subject has an implementable current public specification. The 1,233 README-bearing total additionally includes nested subjects, many of which need separate comprehensive subproject treatment beyond this top-level closure.

**Official 01Edu Piscine membership, quest/assessment order, compulsory status, and backend Galaxy unlock requirements remain unverified**. Source review establishes the public task content and source-documented relationships; the community archives are not authoritative curriculum metadata.

## 6. Reproducibility, tests and next step

- [Committed complete 281-subject catalog](../data/phase28-complete-281-catalog.json): one row per source ID, pinned README SHA, reviewed requirement summary, skills, source language, archive provenance, indexed public test references and explicit unknown official fields.
- [81 newly inspected source reviews](../data/phase28-direct-81-source-reviews.json).
- [Source-attestation and CSV export script](../scripts/verify-phase28-281-catalog.mjs): reads all 281 current pinned READMEs, confirms SHA from independent tree index, checks prior and new human review consistency, validates public test path existence and extracts a verbatim source excerpt.
- [Seven catalog regression tests](../scripts/verify-phase28-281-catalog.test.mjs).
- [Seven additional source-supported relationships](../data/phase28-source-supported-relationships.json) and [four regression tests](../scripts/verify-phase28-relationships.test.mjs).
- Generated source-attested JSON, CSV and coverage statistics are published by the research branch's [Galaxy curriculum audit workflow](https://github.com/Vict1111-code/01edu_public/actions/workflows/galaxy-curriculum-audit.yml).

**Next phase:** Merge the top-level 792-source identity registry with nested projects, their audits and screenshot-supported Galaxy anchor nodes; then construct the interactive graph with independent visual, pedagogical, and source-mandated edge types. Do not backfill unspecified platform unlocks.

CI status should be checked against the last completed run before claiming final validator success.
