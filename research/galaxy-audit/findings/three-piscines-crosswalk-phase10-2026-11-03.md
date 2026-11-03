# Phase 10 — Three-Piscine exercise → public subject crosswalk

**Date:** 2026-11-03  
**Sources:** User-provided `Piscine-rust-Zone01-master.zip`, `piscine-js-main.zip`, `piscine-go-master.zip`; [public subject-node index](../data/subject-node-index.json) (1,233 README-bearing subject directories); the complete public `subjects/` Git tree; and public `js/tests/` and `dom/` test trees. Uploaded solution code was **not executed** and was **not committed**.

## Confirmed archive-to-subject matching

| Language | Candidate records | Exact public top-level README | Nested-name candidate | No exact public name | Separate subject audit README | Public JS test filename match | Public DOM test filename match |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Rust | 63 | **63** | 0 | 0 | 0 | 0 | 0 |
| JavaScript | 99 | **98** | 0 | 1 | 1 | **97** | **10** |
| Go | 160 | **126** | 1 | 33 | 0 | 0 | 0 |
| **Total** | **322** | **287** | **1** | **34** | **1** | **97** | **10** |

**Counts are archive candidate records, not necessarily unique assignments**. The Go archive repeats some exercise names across quests and practice directories. Its 160 records include two additional directory/extensionless names recovered during ZIP inspection, beyond the first filename-only inventory. The original Rust ZIP has 63 Cargo exercise directories. JavaScript has 99 filename-derived candidate names, some of which may be support files rather than actual exercises.

## Exact subject paths, audits, subprojects and resources

The [full JSON crosswalk](../data/three-piscines-subject-crosswalk.json) records each archive's source group and candidate exercise name, its exact public subject README (if any), audit README or `audit.md`, whether an audit directory exists, nested README-bearing subsubjects, resource paths, and matching public test files.

For this sample, **no matched candidate has nested README-bearing subprojects or a dedicated resources/ path in the public subject tree**. This is consistent with small Piscine exercises being leaf subjects; it does **not** mean there are no instructions, requirements, external resources, or assessment systems. Those may be embedded in the README or live outside `subjects/`.

Only one candidate in the JS archive has a separate subject audit README: **`sortable`** (`subjects/sortable/audit/README.md`). This does not prove other exercises are unassessed.

### Separate assessment infrastructure is especially important for JavaScript

- **97/99** JavaScript candidate records have at least one matching public file under `js/tests/` or `dom/`.
- **10** have matching `dom/` test files, such as `build-brick-and-break`; this is evidence that the uploaded JS archive includes DOM-oriented tasks, not just plain JavaScript function exercises.
- Public test files are **not identical** to official subject audit rubrics, and filename matches alone do not prove what the grader enforces.

### Unmatched candidates

- JavaScript: **`bloody-sunday`** does not have an exact top-level public subject README in this snapshot. It may be a renamed/historical/extra solution file; do not claim the official task never existed.
- Go: **33** candidates lack an exact public subject name; many are scratch files, altered spellings, or learner-specific labels. One candidate, **`student`**, matches the leaf name of a **nested mobile-development subject** (`mobile-dev/student`) but is not automatically considered the same assignment.
- Go `raid02` and `raid03` each contain a generic `main.go`; these folders remain unresolved because that filename does not identify the assignment.
- The Go ZIP has folders QUEST-01 to QUEST-09 and QUEST-11 to QUEST-12 but no QUEST-10. This is a **gap in the uploaded learner archive**, not proof of the official curriculum's sequence.

## Confidence and source limitations

1. **Exact README match:** high confidence that a public specification with the same name exists. It does not confirm official Piscine membership or order.
2. **Public test filename match:** high confidence that a public test file with that name exists. Its grading semantics remain unverified.
3. **Community quest/raid label:** direct evidence of one learner's folder organization; **not** official quest metadata.
4. **No audit README:** means only that a separate audit README was not found at the indexed subject path.
5. **Requirements:** the public subject README is the primary source for instructions; dedicated requirements files were not found for these matched subjects by filename pattern. Manual semantic review of each README is still needed.
6. **Parent/subprojects:** exact public `subjects/` nesting is captured; no nested README-bearing extensions were found for this particular matched set.

## Machine-readable deliverables

- [Combined 322-record crosswalk (JSON)](../data/three-piscines-subject-crosswalk.json)
- [Go crosswalk (CSV)](../data/go-piscine-crosswalk.csv)
- [Rust crosswalk (CSV)](../data/rust-piscine-crosswalk.csv)
- [JavaScript crosswalk (CSV)](../data/javascript-piscine-crosswalk.csv)

## Next research step

Perform **content-level audit** of selected READMEs and JS/DOM tests, distinguish regular JavaScript exercises from DOM/browser tasks, and validate Go quest grouping against independent evidence. Create a reproducible generator from a sanitized archive manifest and public repository checkout, without distributing or executing the learner's solutions.

**Repository safety:** only `research/galaxy-curriculum-audit` changed; `master` untouched.
