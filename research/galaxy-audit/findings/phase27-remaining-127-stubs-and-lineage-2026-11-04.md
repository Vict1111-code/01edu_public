# Phase 27 — Final 127 source classifications, nine incomplete specifications and Galaxy evidence

**Date:** 2026-11-04  
**Repository:** [Vict1111-code/01edu_public](https://github.com/Vict1111-code/01edu_public)  
**Research branch:** `research/galaxy-curriculum-audit`  
**Pinned subject tree:** `b78ec066b3c1123fc72c65d983aa5190c3f29d79`  
**Evidence policy:** All project/learning relationships distinguish public README instruction, resource citation, learner recommendation and visual grouping; none automatically establishes current official platform unlocks.

## 1. Final nonpriority source-review cohort — all 127 inspected

All 127 remaining public subject README files from the Phase 24 previously unreviewed archive-unmatched group were directly inspected. The semantic review confirms that they are identifiable coding exercises with actionable requirements:

| Language of public task | Count | Primary competencies |
| --- | ---: | --- |
| **Go** | **94** | strings, slices, arrays, maps, arithmetic, binary trees, linked lists, parsing and formatting |
| **JavaScript** | **21** | nested object operations, recursion, sorting, functions, promises, proxies and grids |
| **Rust** | **12** | mathematical algorithms, references and ownership, collections, text transformation and board problems |
| **Total** | **127** | 127/127 direct source inspections |

Unlike the 285 priority subjects, this last group yielded **zero additional inadequate public README specifications**. The full review is maintained as [127 exact subject IDs grouped by language and Go competency](../data/phase27-nonpriority-reviewed-groups.json). The [source-attestation generator](../scripts/verify-phase27-nonpriority.mjs) builds a 127-entry source catalog with README blob hashes, evidence excerpts and exact repository links.

### Example identity distinctions

- `armstrong_number` and `logic_number` are separate Rust mathematical exercises built around digit powers. They are not a dependency chain.
- `js-deep-clone`, `js-deep-equal`, `js-deep-freeze`, `js-flat-object`, and `js-flatten-object` are distinct JavaScript interfaces and requirements; similarity of topics does not justify merging them.
- `btreedeletenode`, `btreetransplant`, `btreemin`, `btreemax`, and `btreeprintroot` are separate Go tree subjects. Shared types and examples may support *suggested* sequencing but not an official gate.
- `fifthandskip` and `loafofbread` have related output patterns but different invalid-input instructions. The original requirements should be preserved.
- `strisnegative`, `squareroot`, `createelem`, `reversestrings` and `countcharacter` have possible prose/sample or signature discrepancies. These are review flags, not rewritten requirements.

## 2. Nine previously incomplete sources: repository history audited

Nine Phase 26 entries were incomplete under the public source instructions. The [nine-source gap register](../data/phase27-nine-source-gaps.json) records their current Git blobs, full directory listings and relevant commit history.

| Incomplete README | Source audit outcome |
| --- | --- |
| `argsort` | **Historical specification located.** Its current README contains only a newline. At [commit e519af63 (December 2022)](https://github.com/Vict1111-code/01edu_public/blob/e519af63e1abd9c796ab8ce9cbbf6547659e7f57/subjects/argsort/README.md), a fuller Go CLI subject describes checking characters for ascending ASCII order with T/F output. Treat as historical guidance, not validated current official instructions. |
| `cloning-vs-copying` | Heading and instruction placeholder; no complete task in current public README. |
| `frozen-more-about-mutability` | Heading and instruction placeholder; no complete task in current public README. |
| `if-methods` | Short `startsWith/endWith` concept note only. |
| `nested-loops` | One-line pyramid learning note only. |
| `nested-loops-2` | Centered-pyramid and padding concept note only. |
| `nested-loops-3` | Diamond pattern idea only; no unambiguous interface. |
| `recursion` | Placeholder instructions section. |
| `repeated` | One-line string repetition idea; no complete requirements. |

The nine current folders have only their README files. The current repository file tree shows no additional exact-named source files for these entries. Checked README commit histories identify no alternate complete version for the other eight; this **does not** prove that no external test or private platform description exists.

**Resolution:** Nine current-source gaps remain unresolved as present-day assignment specifications. One is *historically recoverable*, eight have no fuller specification in the checked material. No external tests or official grading files have been validated for them.

## 3. Project prerequisites, lineage, and source proof

The [Phase 27 prerequisite evidence register](../data/phase27-prerequisite-evidence-register.json) contains **16** source-attested pairwise project relationships. All were checked against the exact target README text. Of these:

- **12** describe prior project output, prior calculations, earlier functions, or a parent-project extension.
- **4** contain contextual prior-work references or references to learning resources. These are **not** requirements to reuse a deliverable.
- An additional **six** proposed learning sequences are stored separately as **pedagogical recommendations**, not source mandates or platform gates.

### Particularly clear source connections

| Relationship | Direct evidence in target README | What is and is not established |
| --- | --- | --- |
| `ascii-art` → `ascii-art-web` | Calls the web application a GUI version of the last `ascii-art` project | Named prior implementation context, not dashboard unlock |
| `mini-framework` → `bomberman-dom` | Requires using the framework previously built | A concrete code-reuse/project-output dependency |
| `math-skills` → `guess-it-1` | Calls for implementing earlier math-skills calculations | Explicit source reuse |
| `linear-stats` → `guess-it-2` | Refers to calculations in earlier `linear_stats` | Explicit prior statistical work |
| `adding` → `adding_twice` | Instructs reusing the `add_curry` function | Explicit Rust function reuse |
| `mobile-dev/secure-notes` → `mobile-dev/package` | Asks for a Flutter package for the Secure Notes app | Application extension |
| `quad` → `quadchecker` | Explicitly calls the raid based on `quad` functions | Earlier function context |
| `road_intersection` → `smart-road` | Recalls the earlier Rust Piscine raid | Related previous experience, not a mandated implementation reuse |
| `forum` → `real-time-forum` | Explicitly recalls the previous forum and permits reusing some code | Prior experience, but code reuse is discretionary |

Other verified links include `0-shell` job control, `forum` authentication, `groupie-tracker` geolocalization, `ascii-art-web` export, `social-network` desktop-app extension, and `mini-framework` project experience. The direct-source register must be treated as a *verified subset*, not the total Galaxy dependency graph. Earlier evidence remains in [the 33-edge curated graph](../data/curated-graph-snapshot.json) and [the Imperative project map](../data/phase19-imperative-project-map.json).

## 4. Galaxy visual placement: what has actually been confirmed

The supplied radial Galaxy screenshot has **84** source-verified readable labels recorded by [Phase 23](../data/phase23-galaxy-visual-anchors.json):

| Screenshot organization | Matched project labels |
| --- | ---: |
| Three green inner paths: Imperative, Architecture, Full-Stack | 17 |
| Intermediate project or system curves | 26 |
| Outer specialization families: AI, Cloud DevOps, Video Games, Mobile, Cybersecurity, Blockchain | 41 |
| **Total** | **84** |

**None of the newly reviewed 127 top-level assignments has an exact Phase 23 screenshot node anchor.** They are best placed in an **unpositioned language-and-competency catalog** until additional graphical or official source evidence establishes their exact orbits. One may recommend Rust, Go or JS Piscine practice based on language and competencies, but this is not an official physical Galaxy location.

The screenshot permits grouping and approximate visual traversal; it does not reveal backend unlock conditions, dates, compulsory status, project-specific grading rules or prerequisite enforcement. Therefore:

1. `visual_group`: supported only by the screenshot and exact subject-name crosswalk;
2. `source_relationship`: supported by a named README quotation and pinned Git blob;
3. `pedagogical_recommendation`: an expressly independent proposed learning order;
4. `official_platform_unlock`: **unknown** unless verified by authenticated platform policy or authoritative documentation.

## 5. Coverage accounting

The **455 top-level subjects with no indexed audit README and no match in the three reviewed community Piscine archives** are now accounted for in source-semantic review work:

| Review cohort | Reviewed |
| --- | ---: |
| Phase 22: directly read among the archive-unmatched | 9 |
| Phase 25: additional semantic README reviews | 34 |
| Phase 26: remaining priority subject reviews | 285 |
| Phase 27: final nonpriority source reviews | 127 |
| **Total** | **455** |

The extra tenth Phase 22 source review was `btreesearchitem`, which belongs to the separate archive-matched group and is not double counted above.

**Remaining research scope:** The 281 other top-level no-audit README names that match community Piscine archives are not all fully classified by these four phases; earlier Go/JS/Rust Piscine studies partially cover them. More importantly, current official Galaxy ordering/unlocks are still not recoverable from the source tree and screenshot alone.

## 6. Reproducibility

- [Complete 127-subject group manifest](../data/phase27-nonpriority-reviewed-groups.json)
- [127-source attestation and Markdown catalog builder](../scripts/verify-phase27-nonpriority.mjs)
- [Five regression tests for the 127-source cohort](../scripts/verify-phase27-nonpriority.test.mjs)
- [Nine insufficient-source and historical recovery register](../data/phase27-nine-source-gaps.json)
- [16 source-quoted prerequisite and reference relationships](../data/phase27-prerequisite-evidence-register.json)
- [Evidence and gap verifier](../scripts/verify-phase27-evidence.mjs)
- [Six evidence regression tests](../scripts/verify-phase27-evidence.test.mjs)

The GitHub Actions workflow runs the generators against the pinned checkout and publishes the full 127-record catalog and evidence attestation as workflow artifacts. The workflow status must be checked before claiming it passed.

**Next milestone:** Merge source-backed classifications from all existing phases into one stable subject ID registry; adjudicate the remaining 281 archive-name matches; then construct an interactive view where visual, recommended and source-reused relationships have distinct edge styles.
