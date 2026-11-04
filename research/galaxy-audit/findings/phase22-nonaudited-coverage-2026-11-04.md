# Phase 22 — Non-audited Galaxy subject backlog reconciliation

**Date:** 2026-11-04  
**Status:** Reconciled indexed subjects with three community Piscine archives and verified ten subject READMEs at source level, including one archive-matched name.

## Coverage of the entire top-level subject index

| Category | README subjects |
| --- | ---: |
| Top-level public subjects | 792 |
| With indexed audit/README.md | 56 |
| Without indexed audit/README.md | 736 |
| Without audit README, matched by community Piscine archive name | 281 |
| Without audit README, not matched by those archives | 455 |
| Of the 455 archive-unmatched, source-verified in this phase | 9 |
| Additionally reviewed in archive-matched subjects | 1 |
| Among archive-unmatched subjects, awaiting source-level review | 446 |

The three community archives contained 322 candidate records, of which 287 were exact top-level public subject matches, representing 282 unique subject README paths. Five duplicate name records were deduplicated, without discarding their archive provenance. One matched subject, `sortable`, has its own indexed audit README.

The 281 matched, unaudited subject names divide as: go 121, javascript 97, rust 63. **An archive name match does not establish official Piscine membership, quest order, mandatory status or unlock rules.**

## Ten public README classifications across both groups

| README | Evidence-based educational classification | Source requirements |
| --- | --- | --- |
| [3-directions](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/3-directions/README.md) | javascript_arrays_exercise | Access first and last array elements and construct a two-element pair |
| [access](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/access/README.md) | javascript_objects_exercise | Access individual fields of a supplied object |
| [action-reaction-dom](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/action-reaction-dom/README.md) | javascript_dom_exercise | Add a click listener that updates text and CSS classes |
| [argrot1](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/argrot1/README.md) | go_cli_exercise | Rotate command-line arguments while handling short inputs |
| [binary_search](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/binary_search/README.md) | rust_algorithm_exercise | Search sorted borrowed slice and return Option index |
| [brackets](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/brackets/README.md) | go_parsing_exercise | Check valid nested brackets in each command-line argument |
| [blockchain](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/blockchain/README.md) | track_container | Overview of multiple Blockchain quests and raids, not a single exercise |
| [ascii](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/ascii/README.md) | go_strings_exercise | Convert string characters into a byte slice |
| [btreesearchitem](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/btreesearchitem/README.md) | go_tree_exercise | Find a tree node by data or return nil |
| [adding](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/adding/README.md) | rust_closure_exercise | Return a closure for curried addition |

Of these ten, nine specify individual exercises and one (`blockchain`) outlines a multi-quest track. `btreesearchitem` is also found in the Go archive; it must not be counted among the 455 archive-unmatched names. This illustrates why the other unmatched names cannot be treated collectively as optional major projects.

## Next research stage

Manually inspect the remaining 445 archive-unmatched top-level README subjects and cross-check alternative assessment infrastructure (including JavaScript and DOM test files). Classify by explicit requirement evidence into exercises, projects, track containers, or support material, while retaining uncertain cases. Then continue the central Architecture, Full-Stack and Graphics family/extension graph before specializing.

**Limitations:** No official Galaxy platform unlock data, compulsory status, grading metadata, or exhaustive audit status was inferred. These are public-file and community-archive reconciliation results.

**Machine-readable data:** [phase22-nonaudited-coverage.json](../data/phase22-nonaudited-coverage.json)
