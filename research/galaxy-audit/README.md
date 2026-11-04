# 01Edu Galaxy — Independent Curriculum Research

**Status:** Full-Galaxy structural index completed on 2026-11-03 (1,233 README-bearing subjects); semantic classification, official ordering, and detailed grading analysis are NOT yet complete.  
**Working branch:** `research/galaxy-curriculum-audit`  
**Primary source:** [01edu_public fork](https://github.com/Vict1111-code/01edu_public) (upstream `01-edu/public`)  
**Historical source:** [Branch-AI fork](https://github.com/Vict1111-code/Branch-AI) (upstream `01-edu/Branch-AI`)

This directory houses an **independent, source-linked analysis of public curriculum material**. It is not an official 01Edu roadmap, grading system, or clone of its private Fellows Dashboard.

## Scope and source priority

The **scope is the entire publicly reconstructible Galaxy**, including the imperative, architecture, full-stack, graphics, specialization, and advanced project paths visible in the Galaxy screenshot. The source repository does not currently provide a verified complete Galaxy graph, so visual-track assignments must be supported by project content or labeled provisional.

**Primary source:** `01edu_public/subjects/` for individual subject specifications and `audit/` checklists. Also review `js/`, `dom/`, `sh/`, `employment-tasks/` and `docs/` rather than presuming every relevant assignment lies only under `subjects/`.

**Secondary historical AI source:** `Branch-AI/piscine/` (three-week AI Piscine), `Branch-AI/projects/` (five capstone projects), and `Branch-AI/subjects/ai/` (historical subject modules). Do not treat the archive as the whole Galaxy or a current official specialization schedule.

**Audit completion boundary:** Cataloging 801 subject directories is **not** equal to reading all project specifications, validating every audit, or reproducing the official dashboard's unlock graph.

## Full learning-journey reconstruction (first priority)

The **central Galaxy** must be reconstructed before the outer specialization orbits:

1. **Selection Piscine** — initial Go-intensive entry/selection exercises and raids.
2. **Core language Piscines** — Go, Rust, and JavaScript (and other curricula when evidenced). They can occur **during** core study, rather than strictly before all projects.
3. **Inner core bands** — Imperative, Architecture, Full-Stack, Graphics.
4. **Bridging/cross-band projects** — software projects that integrate concepts and reference prior subjects; these must support multiple domain tags.
5. **Outer branches** — AI, Cybersecurity, Video Games, Cloud/DevOps, Blockchain, Mobile and others, only after the core relationships are represented.

**Do not infer official unlock order from this outline.** The [curriculum backbone](data/curriculum-backbone.json) distinguishes verified program stages from candidate project placements and unknown links. The whole Galaxy—not only specialization subjects—is the scope.

## Phase 2 — Foundational Galaxy verified (2026-11-03)

Visual transcript and Git source verification now cover the **17 core green-ring project nodes** (Imperative 6, Architecture 6, Full-Stack 5), with subject and audit files for all 17. Go/Rust/JS Piscine examples are documented, and **14 source-backed inter-project relationships** are classified by evidence type. See [foundation/core reconstruction report](findings/foundation-core-reconstruction-2026-11-03.md).

**Still unknown:** full official Piscine quest ordering, all cross-band satellite paths, current locked progression rules, and detailed criteria for every project. Screenshot order is not an unlock graph.

## Phase 3 — Satellite and extension sampling (2026-11-03)

The 17 central projects contain **26 nested README-bearing directories**, of which **24 have corresponding audit README files and are extension candidates**, while two `examples/` directories are not confirmed assignments. Six additional standalone satellite projects have had their README and audit files inspected. See [satellite findings](findings/core-satellites-2026-11-03.md). Exact official orbit placement and sequencing remain unverified.

## Phase 4 — Reproducible link-extraction pipeline (2026-11-03)

The [Node.js subject-reference extractor](scripts/README.md) and five-test suite are committed. They scan the public `subjects/` checkout for Markdown references and produce JSON plus CSV, with confidence-labeled relationships. **GitHub Actions ran the full extraction and test suite successfully** on 2026-11-03: 1,233 subject READMEs, 75 candidate internal references, 2,448 external links, and 157 unresolved local links. See [run report](findings/full-extraction-ci-2026-11-03.md). A separate [manual verification sample](data/extractor-manual-validation-sample.json) contains **15 human-reviewed reference edges from 16 inspected subject READMEs**. The successful CI scan now supplies the complete *parser-detectable* link catalog; its edge classifications remain heuristic and are not verified unlock prerequisites.

## GitHub Actions run

[View successful full scan and download artifacts](https://github.com/Vict1111-code/01edu_public/actions/runs/41645792476). The artifact is retained for 14 days. See [run findings](findings/full-extraction-ci-2026-11-03.md) for persistent summary counts.

## Phase 5 — Automated triage and first manual review (2026-11-03)

[GitHub Actions run 41647213323](https://github.com/Vict1111-code/01edu_public/actions/runs/41647213323) successfully extracted and **deduplicated 75 link instances to 73 unique pairs**. The [triage report](findings/first-full-link-triage-2026-11-03.md) distinguishes 35 coding-standard references, 22 extension candidates, 2 prior-project references, 1 Rust Piscine bridge, 2 general learning resources, 2 asset references, 1 parent-context reference, and 8 initially ambiguous references. All 8 ambiguous references have now been [individually reviewed](data/manual-review-unresolved-eight.json) without claiming official unlock rules.

The full six-file extraction and triage artifact is retained by GitHub Actions for 14 days; sources and reports on this branch remain permanent.

## Phase 6 — Curated source-linked graph (2026-11-03)

The [successful GitHub Actions run](https://github.com/Vict1111-code/01edu_public/actions/runs/41648273764) completed the graph generator and five additional tests. The first **40-node / 33-edge** typed learning-lineage graph separates **40 non-progression links** and never asserts platform unlock conditions. A [durable source-linked snapshot](data/curated-graph-snapshot.json) is committed to the research branch, and the [full evidence-bearing graph](https://github.com/Vict1111-code/01edu_public/actions/runs/41648273764) is available as a CI artifact. See the [Phase 6 findings](findings/curated-graph-phase6-2026-11-03.md).

## Phase 7 — Piscine language-evidence scan (2026-11-03)

[GitHub Actions run 41649375925](https://github.com/Vict1111-code/01edu_public/actions/runs/41649375925) scanned all 1,233 public subject README files for language-specific syntax and Piscine/raid mentions. It found **319 Go-dominant, 149 Rust-dominant, 196 JavaScript-dominant, and 569 ambiguous/other** READMEs, plus **4 named-Piscine mentions** and **8 raid-wording matches**. These are **heuristic language classifications, not verified Piscine membership or quest order**. See [Phase 7 findings](findings/piscine-evidence-phase7-2026-11-03.md) and [classifier script](scripts/classify-piscine-evidence.mjs).

## Phase 8 — Manual Piscine membership verification (2026-11-03)

The [Phase 8 report](findings/piscine-membership-review-phase8-2026-11-03.md) distinguishes explicit entry points (`hello_rust`, `how-2-js`), a corroborated Rust Piscine raid (`road_intersection`), Go raid wording (`quadchecker`), other-track raids, and misleading sample text. The [manual membership index](data/piscine-manual-membership-review.json) records **13 reviewed subjects** with exact source links and **no invented official quest positions**.

## Phase 9 — Three user-provided Piscine archives (2026-11-03)

[Phase 9 archive audit](findings/community-piscine-archives-phase9-2026-11-03.md) examines three community solution ZIPs covering Rust, JavaScript, and Go. The Rust archive has **63 Cargo exercise directories**, all matching public top-level subject names; a manually compared JS set matched **97 of 98** names; the Go archive has learner-organized QUEST and raid folders. These are identification/grouping evidence, **not official audit instructions or quest unlock metadata**. File inventories were generated locally without executing uploaded code.

## Phase 10 — Archive-to-official-specification crosswalk (2026-11-03)

The [Phase 10 report](findings/three-piscines-crosswalk-phase10-2026-11-03.md) records a **322-row crosswalk** between three user-supplied community solution archives and the public `subjects/` specification tree. Exact README name matches: **Rust 63/63**, **JavaScript 98/99**, and **Go 126/160** candidate records (Go has repeated/extra learner filenames). The mapping records official README, audit path, nested subsubjects, resources, and separate JS/DOM test filename matches. **97 JS records have public test filename matches**, including **10 DOM test matches**. Community folder names do **not** establish official quest order.

Files: [combined JSON](data/three-piscines-subject-crosswalk.json), [Go CSV](data/go-piscine-crosswalk.csv), [Rust CSV](data/rust-piscine-crosswalk.csv), [JavaScript CSV](data/javascript-piscine-crosswalk.csv).

## Phase 11 — Concept-based difficulty sequences for three Piscines (2026-11-03)

The [Phase 11 findings](findings/progressive-three-piscines-phase11-2026-11-03.md) organize all **322 community archive candidate records** into eight estimated difficulty/concept stages per language: **Go 131 staged / 29 review**, **Rust 63 staged / 0 review**, and **JavaScript 98 staged / 1 review**. These are **independent educational study paths, not official Galaxy quest order or unlock rules**. Seven generator tests passed in [CI run 41654804253](https://github.com/Vict1111-code/01edu_public/actions/runs/41654804253).

**Readable, source-linked guides:** [Go](guides/go-progressive-learning-path.md) · [Rust](guides/rust-progressive-learning-path.md) · [JavaScript](guides/javascript-progressive-learning-path.md). [Generator](scripts/sequence-piscines.mjs) and [tests](scripts/sequence-piscines.test.mjs). Generated JSON/CSV/Markdown are available in the CI artifact.

## Phase 12 — Requirements evidence and independent mastery assessments (2026-11-03)

[Phase 12 findings](findings/piscine-competency-mastery-phase12-2026-11-03.md): **316 distinct** exercise candidates (Go 154, Rust 63, JavaScript 99), **282 public subject READMEs read**, **24 stage mastery gates** (8 per language), and **12 manually validated** source requirements. Public README excerpts, headings, restrictions and links are separated from **independently authored** practical assessments. The [generator](scripts/build-piscine-competencies.mjs) and [five tests](scripts/build-piscine-competencies.test.mjs) passed in [CI run 41656816416](https://github.com/Vict1111-code/01edu_public/actions/runs/41656816416), whose artifact contains the 316 exercise cards and three mastery guides. The **24 unclassified unique candidates** remain marked for review; no official Galaxy unlock conditions are inferred.

**Permanent source-linked mastery guides:** [Go](guides/go-mastery-learning-path.md) · [Rust](guides/rust-mastery-learning-path.md) · [JavaScript](guides/javascript-mastery-learning-path.md).

## Phase 13 — Requirement-based difficulty and identity/dependency review (2026-11-03)

[Phase 13 findings](findings/piscine-difficulty-prerequisites-phase13-2026-11-03.md): 316 distinct candidates; **276 provisionally scored** against public README requirement complexity and proposed stage, **40 unscored**; **six nonbinding Go filename suggestions**, 28 unmatched without safe suggestions; **two Rust target exercises** with incoming curated source-backed relationships. [Ranking/review generator](scripts/rank-piscine-difficulty.mjs) and [four tests](scripts/rank-piscine-difficulty.test.mjs) passed in [CI run 41660170809](https://github.com/Vict1111-code/01edu_public/actions/runs/41660170809). The downloadable artifact includes JSON scores and three within-stage difficulty-ranked guides. Scores, name suggestions and conceptual relationships **are not official Galaxy grading or unlock metadata**.

## Phase 14 — Source-inspected identity corrections and concept prerequisite graphs (2026-11-03)

[Phase 14 findings](findings/piscine-source-concepts-phase14-2026-11-03.md) and [durable three-Piscine concept map](guides/three-piscines-concept-prerequisite-map.md): **34 unmatched archive identifiers inspected at source level**, including rejection of the misleading `split2 → split` and `student → mobile-dev/student` matches. **43 concepts and 46 independently recommended concept edges**, plus three separately documented public Rust subject-reference edges; **191/316 exercises annotated** (117 by low-confidence name-only hints), 125 unclassified and 29 difficulty outliers queued. The [builder](scripts/build-concept-prerequisites.mjs) and [six tests](scripts/build-concept-prerequisites.test.mjs) passed in [CI run 41662508732](https://github.com/Vict1111-code/01edu_public/actions/runs/41662508732), with a generated JSON graph and three language-specific guides. All educational dependencies are explicitly **not official Galaxy unlock rules**.

## Phase 15 — Full README concept verification and manual stage corrections (2026-11-03)

[Phase 15 findings](findings/piscine-readme-source-verification-phase15-2026-11-03.md) and [29 manually reviewed outliers / 10 recommended stage changes](guides/phase15-reviewed-stage-corrections.md): **282 full public README files inspected** across **316 unique candidates**; **132 of 242 previously unclassified or name-only cases** strengthened by specific source keyword evidence or human review. Final evidence tiers: 29 manually reviewed outliers, 28 earlier curated anchors, 149 specific README keyword matches, 70 generic terms only, 8 filename-only, 5 README-no-match, and 27 without a directly matched README. [Source-evidence generator](scripts/verify-piscine-concepts.mjs) and [eight tests](scripts/verify-piscine-concepts.test.mjs) passed in [CI run 41665590162](https://github.com/Vict1111-code/01edu_public/actions/runs/41665590162), which publishes three revised, source-linked study guides and full per-exercise JSON evidence. **All learning-stage changes and concept prerequisites remain independent recommendations, not official Galaxy data.**

## Phase 16 — Resolve 110 low-evidence cases and audit misleading keyword tags (2026-11-03)

[Phase 16 findings](findings/piscine-manual-coverage-phase16-2026-11-03.md): **110/110 previously low-evidence cases triaged** — **76 public README reviews** (28 Go, 14 Rust, 34 JavaScript) and **34 source-inspected community archive identity reviews** (not official assignment verification). **23 proposed teaching-stage changes** (6 Go, 3 Rust, 14 JavaScript). The [24-case semantic keyword review](data/phase16-keyword-semantic-verdicts.json) retained 13 source-supported concept matches and rejected **11 false-positive concept tags**, including array elements misclassified as browser DOM elements. [Manual concept classifications](data/phase16-manual-readme-classifications.json), [reconciliation script](scripts/triage-piscine-evidence.mjs), and [tests](scripts/triage-piscine-evidence.test.mjs) passed in [GitHub Actions run 41668078878](https://github.com/Vict1111-code/01edu_public/actions/runs/41668078878), producing three updated study guides and an exercise-by-exercise JSON evidence artifact. All official Galaxy unlock, quest and grading fields remain unknown.

## Phase 17 — Semantic concept corrections and original mastery assessments (2026-11-03)

[Phase 17 findings](findings/piscine-semantic-mastery-phase17-2026-11-03.md): **30 newly source-phrase-verified public README semantic reviews** (10 per language) corrected **39 unsupported prior concept tags**, added **8 manually supported concept tags**, and recommended **17 stage changes**. The generator keeps **95 remaining keyword-only cases** in a [prioritized manual review queue](scripts/apply-semantic-source-reviews.mjs); **24 earlier partial keyword checks** retain their narrower evidence status. **34 community source identities** are now explicitly unplaced instead of treated as confirmed curriculum exercises. [24 original practical stage assessments](data/phase17-original-stage-assessments.json) provide a 100-point rubric and measurable Go/Rust/JS deliverables; these are **not official 01Edu audits**. [Nine tests passed](https://github.com/Vict1111-code/01edu_public/actions/runs/41670029199) and CI published three updated language guides, a consolidated JSON curriculum and an original assessment handbook. Official Galaxy order, unlocks and grades remain unknown.

## Phase 18 — All 95 pending semantic reviews completed (2026-11-04)

[Phase 18 final findings](findings/piscine-all-95-semantic-reviews-phase18-2026-11-04.md) and [all 95 exercises in a source-linked table](guides/phase18-all-95-source-reviewed-exercises.md): **95/95 previously pending full source-semantic reviews completed** — **60 Go**, **8 Rust**, **26 JavaScript** matching public subject instructions, plus **one wrongly matched Go archive `rot` file** (public `rot` README specifies Rust). The independent curriculum has **43 recommended stage corrections**, **zero cases left in the Phase 17 pending semantic-review queue**, and **35 explicitly unplaced community IDs** (34 identity-unverified archive files and the cross-language collision). [Source-attesting generator](scripts/complete-semantic-piscine-reviews.mjs) and [nine tests](scripts/complete-semantic-piscine-reviews.test.mjs) passed in [GitHub Actions run 41822999757](https://github.com/Vict1111-code/01edu_public/actions/runs/41822999757). The artifact includes full 316-candidate JSON and three updated, README-linked learning guides, with SHA-256 source provenance. **No official Galaxy chronology, quest membership or unlock requirements are inferred.**

## Phase 20 — Imperative optional satellites versus Piscine raids (2026-11-04)

[Phase 20 findings](findings/imperative-satellites-phase20-2026-11-04.md) and [six-project structured classification](data/phase20-imperative-satellites.json) distinguish three post-Piscine optional learning candidates (`math-skills`, `tetris-optimizer`, `net-cat`) from two Go Piscine raid candidates (`quadchecker`, `sudoku`) and one Rust-side raid/simulation candidate (`road_intersection`). All **six public specifications and six audit READMEs** were inspected; **eight verification tests passed** in [CI run 41832615410](https://github.com/Vict1111-code/01edu_public/actions/runs/41832615410). Only these **six previously sampled satellites** were investigated; the complete optional-project catalog and official Galaxy placements remain unverified.

## Phase 21 — Expanded discovery of audited standalone projects (2026-11-04)

[Phase 21 findings](findings/expanded-galaxy-project-discovery-phase21-2026-11-04.md) and [33 manually inspected project profiles](data/phase21-expanded-project-candidates.json) account for **all 56 top-level subjects with `audit/README.md`** in the recursive source index (17 screenshot-core + six Phase 20 satellite samples + **33 newly classified**). Newly evidenced pathways include statistics `math-skills → guess-it-1` and `linear-stats → guess-it-2`, cross-language apps (C, PHP/Laravel, Python/Django, Ruby/Rails, C++), Linux/sysadmin labs and Full-Stack `bomberman-dom` building on `mini-framework`. [Eight automated tests and source attestation](scripts/verify-expanded-projects.test.mjs) passed in [GitHub Actions run 41834583690](https://github.com/Vict1111-code/01edu_public/actions/runs/41834583690). **Scope caution:** 736 other top-level README subjects do not have that audit path; they remain outside this focused discovery. Public source links do not establish official Galaxy unlocks, mandatory status or track placement.

## Phase 21 — Complete audit-indexed top-level subject discovery (2026-11-04)

[Phase 21 research findings](findings/galaxy-satellite-discovery-phase21-2026-11-04.md): indexed **792 top-level subjects**, with **56 public audit READMEs**. The previous 17 central projects and six satellite profiles were supplemented with **33 newly source- and audit-reviewed top-level subjects**. The [structured classification](data/phase21-audited-top-level-classification.json) distinguishes Go/algorithms, Rust/graphics, JavaScript/frontend, statistics, Linux/infrastructure, language-switch exercises and Piscine raids, preserving links such as `math-skills → guess-it-1`, `linear-stats → guess-it-2`, and `mini-framework → bomberman-dom`. The **736 top-level subjects without indexed public audit READMEs** remain explicit *unclassified* research items, not assumed optional projects. [Six new automated tests and CI passed](https://github.com/Vict1111-code/01edu_public/actions/runs/41834828902), publishing a complete top-level inventory. Official Galaxy placement and unlock chronology remain unknown.

## Phase 22 — Non-audited source coverage and backlog reconciliation (2026-11-04)

[Phase 22 findings](findings/phase22-nonaudited-coverage-2026-11-04.md) reconcile all **736** top-level subject READMEs without an indexed `audit/README.md` against the three previously reviewed community Piscine archives. **281** distinct unaudited public READMEs have a community archive name match (**Go 121, JavaScript 97, Rust 63**), leaving **455** without those archive matches. Of these, **nine** of those 455 have been directly source-reviewed; **446** remain for source-level semantic review. One additional directly reviewed Go exercise (`btreesearchitem`) belongs to the 281 archive-matched subjects, for **ten** total source reviews. The [736-record machine-readable reconciliation](data/phase22-nonaudited-coverage.json), [attestation script](scripts/validate-phase22-coverage.mjs) and [four regression tests](scripts/validate-phase22-coverage.test.mjs) are committed. Archive naming, lack of audit README, and language examples do **not** prove official Piscine membership, optional status, Galaxy positioning, grading or unlock rules.

## Phase 23 — Galaxy screenshot track and project correspondence (2026-11-04)

The newly supplied **1280×720 radial Galaxy screenshot** is now the primary *visual arrangement reference*, while public subject READMEs remain the source of instructional and prerequisite requirements. [Phase 23 findings](findings/phase23-galaxy-image-crosswalk-2026-11-04.md) document **84** source-crosschecked readable project labels: **17 green inner core**, **26 intermediate/connecting projects**, and **41 outer specialization labels** across six branches. The [machine-readable visual anchors](data/phase23-galaxy-visual-anchors.json) preserve nested subject paths and source hashes, three unresolved small labels, core and specialization groupings, and unknown official unlock fields. The [validator](scripts/verify-phase23-visual-anchors.mjs) and [five tests](scripts/verify-phase23-visual-anchors.test.mjs) protect against accidental source mismatch and fabricated official course ordering. Visible spatial paths are **not** verified dashboard unlock rules.

## Phase 24 — Full-source classification triage of 446 READMEs (2026-11-04)

[Phase 24 verified CI findings](findings/phase24-full-readme-triage-2026-11-04.md): a [reproducible README scanner](scripts/triage-remaining-446.mjs) read **446/446** previously unreviewed archive-unmatched top-level public READMEs. It provisionally identified **168 function exercises**, **72 CLI/program exercises**, **16 other small exercises**, **12 DOM exercises**, **177 unresolved subject types**, and **one blank README**. Language signals: **104 Go**, **77 Rust**, **56 JavaScript**, **209 unresolved**. **317** records require prioritized human review because their content type, language, or both remain uncertain. Five automated tests passed in [GitHub Actions run 41843405790](https://github.com/Vict1111-code/01edu_public/actions/runs/41843405790). The [full JSON plus review queue](https://github.com/Vict1111-code/01edu_public/actions/runs/41843405790/artifacts/13330192050) is a downloadable, reproducible CI artifact; the generator and summary are committed permanently. **These are pattern-derived classifications, not completed manual reviews or official Galaxy unlock data.**

## Artifacts

| File | Coverage | Method |
| --- | --- | --- |
| [data/core-satellites-index.json](data/core-satellites-index.json) | 26 nested core README directories, audit presence, and six sampled satellite projects | Recursive Git tree plus sample README reading |
| [data/screenshot-core-index.json](data/screenshot-core-index.json) | 17 screenshot-identified core projects cross-checked against public subject and audit blobs | Screenshot reading and Git tree hashes |
| [data/foundation-project-profiles.json](data/foundation-project-profiles.json) | 17 core project summaries, skills, technologies, Piscine evidence, and project execution risks | Individual README inspection |
| [data/foundation-dependency-evidence.json](data/foundation-dependency-evidence.json) | 14 source-backed core/Piscine project relationships with typed distinctions | Individual README references and stated requirements |
| [data/curriculum-backbone.json](data/curriculum-backbone.json) | End-to-end Piscine/core/cross-project/branch scope and evidence-confidence labels | Galaxy screenshot, public subject instructions, official curriculum stage descriptions |
| [data/curated-graph-snapshot.json](data/curated-graph-snapshot.json) | Persistent 40-node / 33-edge source-linked relationship graph | Successful CI and manually reviewed overrides |
| [scripts/build-curated-graph.mjs](scripts/build-curated-graph.mjs) | Generate full typed relationship graph from triaged references | Node.js 18+ standard library; successful CI |
| [findings/curated-graph-phase6-2026-11-03.md](findings/curated-graph-phase6-2026-11-03.md) | Phase 6 graph analysis, limits and future Piscine work | CI log and graph artifact |
| [data/manual-review-unresolved-eight.json](data/manual-review-unresolved-eight.json) | Human-reviewed eight ambiguous links including Rust linear algebra and Bomberman DOM dependency evidence | Direct README inspection |
| [scripts/triage-subject-links.mjs](scripts/triage-subject-links.mjs) | Triage and deduplicate candidate links while preserving reference evidence | Successful CI run 41647213323 |
| [findings/first-full-link-triage-2026-11-03.md](findings/first-full-link-triage-2026-11-03.md) | 73-pair classification with manual review and limitations | CI artifacts plus source README evidence |
| [data/extractor-manual-validation-sample.json](data/extractor-manual-validation-sample.json) | 15 human-reviewed subject references from 16 README inspections | Direct GitHub file reads and link context review |
| [scripts/README.md](scripts/README.md) | Runbook for all-subject Markdown reference extraction, tests and limits | Node.js 18+ standard library |
| [data/subjects-index.json](data/subjects-index.json) | 807 immediate entries under `subjects/` (801 dirs, 6 files) | One-level GitHub Contents API |
| [data/ai-module-index.json](data/ai-module-index.json) | 26 current AI subject modules, including README and audit presence | Recursive Git Trees API |
| [data/archived-ai-index.json](data/archived-ai-index.json) | Historical AI Piscine, projects, and subject modules | Recursive Git Trees API |
| [data/ai-crosswalk.json](data/ai-crosswalk.json) | 22 topic-name correspondences and four current-only names | Directory-name alignment plus README/audit blob hashes |
| [data/subject-node-index.json](data/subject-node-index.json) | 1,233 README-bearing subject nodes, including source hashes and audit presence | Recursive Git Trees API and structural classification |
| [data/track-coverage.json](data/track-coverage.json) | Entire 3,505-entry subject tree and major nested collections | Recursive Git Trees API |
| [data/auxiliary-coverage.json](data/auxiliary-coverage.json) | JS/DOM test harnesses, shell tooling, employment tasks, support docs | Recursive Git Trees API, README inspection |
| [data/dependency-evidence.json](data/dependency-evidence.json) | Five explicitly supported sample subject relationships | Links and wording from subject README files |
| [findings/full-extraction-ci-2026-11-03.md](findings/full-extraction-ci-2026-11-03.md) | Verified first successful 1,233-subject CI extraction, counts, and limitations | GitHub Actions job logs |
| [findings/core-satellites-2026-11-03.md](findings/core-satellites-2026-11-03.md) | Satellite project briefs, audit availability and six confirmed parent extension relationships | Direct README and audit inspection |
| [findings/foundation-core-reconstruction-2026-11-03.md](findings/foundation-core-reconstruction-2026-11-03.md) | Evidence-backed Go/Rust/JS Piscines and 17 central Galaxy project nodes | Screenshot cross-reference and subject review |
| [findings/full-subject-structure-2026-11-03.md](findings/full-subject-structure-2026-11-03.md) | Full-Galaxy structural audit and sampling of six specialization collections | Tree statistics and representative README inspection |
| [findings/initial-audit-2026-11-03.md](findings/initial-audit-2026-11-03.md) | Findings, limitations, and next work | Recorded evidence |

## Research rules

1. **Read-only source:** Never alter upstream repositories or either fork's `master` branch while doing independent research.
2. **Evidence over inference:** Do not label ordering, prerequisite edges, or evaluations as official without an explicit source.
3. **No misleading counts:** Directory entries are not necessarily projects. Core projects, exercises, extensions, and assets must be separated.
4. **No reproduction of proprietary platform features:** Public curriculum analysis does not grant access to private dashboard data or authentication.
5. **Preserve source attribution:** This research indexes and links to subjects rather than republishing their content. Verify source licensing before reusing materials elsewhere.
6. **Keep provenance:** Data reflects the branches and tree hashes documented in each JSON file, not a permanently frozen official curriculum.

## Proposed research milestones

- **M1 — Inventory (structural pass complete):** all 1,233 README-bearing subject directories and auxiliary root sections; semantic inspection still needed.
- **M2 — Foundation-first classification:** map Go/Rust/JS Piscines, the Imperative/Architecture/Full-Stack/Graphics bands, and cross-band projects before specialization detail. Distinguish assignments, exercises, extensions, support files, and tracks using README and audit analysis.
- **M3 — Dependency graph:** extract explicit subject links and requirements, keep inferred edges separate.
- **M4 — Evaluation model:** convert audit checklists into structured human-testable criteria; do not pretend they are executable tests.
- **M5 — AI-native gap analysis:** compare historical AI subjects against newer public changes and any accessible official documentation.
- **M6 — Independent learner UX:** design a personal progress tracker and galaxy visualization backed by the audited metadata.

## Confidence labeling

- **Verified:** direct repository content or file metadata.
- **Strongly supported:** explicit cross-file relationship within the subjects.
- **Inferred:** plausible classification/sequence awaiting corroboration.
- **Unknown:** requires dashboard-only data, independent evaluation, or further investigation.

The repository's original curriculum files remain unmodified on this research branch.
