# Phase 9 — Three community Piscine repositories: first source crosswalk

**Date:** 2026-11-03  
**Inputs:** user-provided ZIP archives `Piscine-rust-Zone01-master.zip`, `piscine-js-main.zip`, and `piscine-go-master.zip`.

## What these sources actually are

These are **learner/community solution and scaffold repositories**. They are not a replacement for the official public `01-edu/public/subjects` specification and do not independently establish audit criteria, release order, quest numbers, or private Galaxy prerequisites. The archives were inspected as ZIP file listings and READMEs; **no source code was executed**. No student solution code was committed to the research repository.

| Archive | Non-directory files | Organization | Evidence |
| --- | ---: | --- | --- |
| Rust | 137 | 63 Cargo project directories | Root README describes personal Piscine Rust learning at Zone01 Normandie |
| JavaScript | 103 | Flat JS files, plus HTML support files | Filenames correspond to exercises; no root README or authoritative sequence |
| Go | 188 | QUEST-01 through QUEST-09, QUEST-11, QUEST-12, raid01–03, hackaton, practice folders | Root README describes a learner's 01 Alem School Go Piscine solutions |

The Go archive has **no QUEST-10 directory**, but that is a limitation of the uploaded repository and does not establish that the official curriculum skips Quest 10.

## Crosswalk against public official subject names

The 63 Rust Cargo directory names all match top-level subject names in the public `subjects/` index, including `arrange_it`, `boxing_todo`, `lalgebra_scalar`, `matrix`, `matrix_ops`, `ownership`, `traits`, `lifetimes`, and `unwrap_or_expect`.

A manual comparison of 98 distinct JS names found **97 top-level subject name matches**. `bloody-sunday` did not match the top-level index; check nested directories, spelling, historical renames, and archived sources before concluding the subject is absent. The 103 files include multiple HTML/support files and do not represent 103 distinct exercises.

The Go archive contains quest-numbered folders and three raid folders, plus scratch/practice areas. Exercise filenames overlap with public subjects such as `printcomb`, `basicatoi`, `eightqueens`, `listat`, and `btreeapplybylevel`. Some files are `main.go` and need their **parent directory** to recover the assignment name. Filename collisions and backups require deduplication. The Go quest sequence is evidence of **one learner's repository organization**, not verified official ordering.

## Classification methodology

For each candidate exercise:
1. Preserve source archive and relative path, including learner-provided quest grouping.
2. Normalize an exercise ID, stripping `.go`, `.js`, Cargo scaffold paths, and obvious backups while preserving exact names for audit.
3. Match against all public subject README paths, not only the top-level index.
4. For a match, attach official subject README, audit README or alternative audit file, nested optional extensions, and resource directory paths from the public tree.
5. Record independent fields for `community_group`, `official_subject_path`, `audit_path`, `resources`, `source_confidence`, `piscine_membership_confidence`, and `official_quest_position` (null unless proven).
6. Treat learner solution code as **provenance and identification only**, not as normative grading criteria.

## Initial confidence assessment

- Rust: **high** confidence in 63 subject-name matches; **medium** confidence in general Rust Piscine association from README; **unknown** exact exercise order.
- JavaScript: **high** confidence in 97 exact top-level name matches among 98 manually compared names; **unknown** ordering and official group boundaries.
- Go: **high** confidence in presence of quest-numbered and raid-numbered learner folders; **medium** confidence in assignment-name matches; **unknown** official quest and raid ordering without a second source.

## Next stage

Build an automated **archive-to-subject crosswalk** with per-file and per-exercise metadata. Join the resulting IDs to the already indexed public 1,233 README subjects and 207 audit READMEs. Then generate language-specific curriculum maps that distinguish community grouping from source-confirmed official instructions, audits, optional extensions, and resources.

All changes to the public fork remain on `research/galaxy-curriculum-audit`; no `master` changes.
