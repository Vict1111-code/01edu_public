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

## Artifacts

| File | Coverage | Method |
| --- | --- | --- |
| [data/core-satellites-index.json](data/core-satellites-index.json) | 26 nested core README directories, audit presence, and six sampled satellite projects | Recursive Git tree plus sample README reading |
| [data/screenshot-core-index.json](data/screenshot-core-index.json) | 17 screenshot-identified core projects cross-checked against public subject and audit blobs | Screenshot reading and Git tree hashes |
| [data/foundation-project-profiles.json](data/foundation-project-profiles.json) | 17 core project summaries, skills, technologies, Piscine evidence, and project execution risks | Individual README inspection |
| [data/foundation-dependency-evidence.json](data/foundation-dependency-evidence.json) | 14 source-backed core/Piscine project relationships with typed distinctions | Individual README references and stated requirements |
| [data/curriculum-backbone.json](data/curriculum-backbone.json) | End-to-end Piscine/core/cross-project/branch scope and evidence-confidence labels | Galaxy screenshot, public subject instructions, official curriculum stage descriptions |
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
