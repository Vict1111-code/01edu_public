# Phase 15 — Full public README concept scan and manual difficulty review

**Date:** 2026-11-03
**Verified CI:** [successful run 41665590162](https://github.com/Vict1111-code/01edu_public/actions/runs/41665590162)
**Scope:** 316 unique community archive exercise candidates across Go, Rust and JavaScript; public subject READMEs inspected where a reliable public path exists.

## Executive result

**282 complete public subject README files were read** (Go 121, Rust 63, JavaScript 98). The extractor evaluates the Instructions section, including nested subheadings, and separately considers Notions/Resources. Code fences are excluded from keyword evidence. In the final Phase 15 source mapping **27 distinct candidates lack a directly readable public README**, and five matched READMEs contain no recognized concept signal.

**29 previously flagged difficulty outliers were manually checked** against their public instructions; **10 recommended teaching-stage changes** and 19 retained placements are documented. No official Galaxy quest numbers, unlock conditions or assessment grades were inferred.

## Source evidence quality, after Phase 15

| Evidence status | Go | Rust | JavaScript | Total |
| --- | ---: | ---: | ---: | ---: |
| Manually inspected outlier with concept interpretation | 8 | 10 | 11 | **29** |
| Earlier manually curated concept anchor | 9 | 11 | 8 | **28** |
| Specific instruction keyword (automated; needs interpretation) | 74 | 25 | 40 | **139** |
| Specific Notions/Resources keyword (automated; weaker) | 2 | 3 | 5 | **10** |
| Generic README terms only (e.g., function, variable, string) | 25 | 11 | 34 | **70** |
| Filename-only, unverified | 8 | 0 | 0 | **8** |
| README read but no recognized concept signal | 2 | 3 | 0 | **5** |
| No directly matched public README | 26 | 0 | 1 | **27** |
| **Total** | **154** | **63** | **99** | **316** |

The first four categories cover **206 candidates with either human-reviewed interpretations or at least a specific README keyword signal**. This does **not** mean 206 independently verified exercise-to-concept prerequisites: 149 are automated keyword hits and remain subject to human review.

## Progress on the previously uncertain exercises

- Of **125 previously unclassified**, 98 have a public README. **44** now have specific instruction keyword evidence, **7** specific Notions keyword evidence, and **9** were manually reviewed: **60 newly better-grounded candidates**. Another **33** have only generic README terms, **5** no matched concept, and **27** no public README.
- Of **117 previously name-only hints**, **59** gained specific instruction keyword evidence, **3** specific Notions evidence, and **10** were manually reviewed: **72 strengthened candidates**. Another **37** remain generic-term-only and **8** still filename-only.
- Thus **132 of the 242 previously unclassified/name-only candidates** now have more specific source text or manual interpretation. This is an evidence-quality improvement, not a guarantee of curriculum correctness.

## Manual learning-stage corrections

See the [full 29-case public-README review](../data/phase15-manual-outlier-review.json) and [readable 10-stage-correction table](../guides/phase15-reviewed-stage-corrections.md).

**Rust:**
- `cipher` stage 7 → 4: Atbash string validation and Result/error handling.
- `circle` stage 7 → 4: geometric structs and methods.
- `hashing` stage 7 → 5: mean, median, mode; despite its name, it is not cryptographic hashing.
- `string_permutation` stage 7 → 5: character-frequency comparison.
- `mobs` stage 4 → 5: HashMap/HashSet state and collection manipulation.
- `blood_types` stage 4 → 6: enums and trait implementations.

**JavaScript:**
- `molecules-cells` stage 7 → 3: DNA/RNA string transformation.
- `quantifiers` stage 7 → 4: higher-order predicates.
- `rebecca-black` stage 7 → 2: date predicates and conditionals.
- `is-winner` stage 8 → 5: Promise-based API filtering.

**Go:** all eight flagged tree/list exercises retained their stages. Their short instructions conceal nontrivial traversal, tree validation or pointer-relinking work; a low README word count should not automatically lower difficulty.

These are **recommended learning-stage placements only**. The earlier heuristic 0–100 difficulty numbers are retained as historical estimates, not silently replaced by a manual judgment.

## Reproducible implementation

- [Full README source scanner and evidence reconciliation](../scripts/verify-piscine-concepts.mjs).
- [Seven automated tests](../scripts/verify-piscine-concepts.test.mjs), including nested heading extraction, code-fence exclusion, specific vs generic evidence, and preservation of unknown official order.
- [29 manual outlier reviews with source URLs and concept interpretations](../data/phase15-manual-outlier-review.json).
- [Permanent teaching-stage corrections guide](../guides/phase15-reviewed-stage-corrections.md).
- [Successful CI and artifact](https://github.com/Vict1111-code/01edu_public/actions/runs/41665590162).

The downloadable CI artifact includes `piscine-readme-concept-evidence-phase15.json` and three full, source-linked language-specific study guides: `go-source-checked-study-guide.md`, `rust-source-checked-study-guide.md`, and `javascript-source-checked-study-guide.md`. Each exercise card retains original stage, reviewed stage, concept evidence layers, original heuristic score and unknown official Galaxy fields.

## What remains unresolved

- **27 candidates** lack directly matched public READMEs; most are Go community scratch or renamed exercises, plus one JavaScript community file.
- **70** have generic README terminology only, **8** filename-only, and **5** no recognized concept: these **83** are not sufficiently classified.
- **149 specific README keyword matches** are still automated textual signals rather than a full human interpretation of requirements.
- Public README content is not a complete substitute for official audit tests, inaccessible Galaxy metadata or actual learner performance.

**Repository safety:** all changes were committed to `research/galaxy-curriculum-audit`; both `master` branches remain unchanged.
