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

## Artifacts

| File | Coverage | Method |
| --- | --- | --- |
| [data/curriculum-backbone.json](data/curriculum-backbone.json) | End-to-end Piscine/core/cross-project/branch scope and evidence-confidence labels | Galaxy screenshot, public subject instructions, official curriculum stage descriptions |
| [data/subjects-index.json](data/subjects-index.json) | 807 immediate entries under `subjects/` (801 dirs, 6 files) | One-level GitHub Contents API |
| [data/ai-module-index.json](data/ai-module-index.json) | 26 current AI subject modules, including README and audit presence | Recursive Git Trees API |
| [data/archived-ai-index.json](data/archived-ai-index.json) | Historical AI Piscine, projects, and subject modules | Recursive Git Trees API |
| [data/ai-crosswalk.json](data/ai-crosswalk.json) | 22 topic-name correspondences and four current-only names | Directory-name alignment plus README/audit blob hashes |
| [data/subject-node-index.json](data/subject-node-index.json) | 1,233 README-bearing subject nodes, including source hashes and audit presence | Recursive Git Trees API and structural classification |
| [data/track-coverage.json](data/track-coverage.json) | Entire 3,505-entry subject tree and major nested collections | Recursive Git Trees API |
| [data/auxiliary-coverage.json](data/auxiliary-coverage.json) | JS/DOM test harnesses, shell tooling, employment tasks, support docs | Recursive Git Trees API, README inspection |
| [data/dependency-evidence.json](data/dependency-evidence.json) | Five explicitly supported sample subject relationships | Links and wording from subject README files |
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
