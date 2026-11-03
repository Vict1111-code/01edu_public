# Initial audit — 2026-11-03

## Scope and provenance

Analyzed the public material in `Vict1111-code/01edu_public` and archived `Vict1111-code/Branch-AI`, both forked from 01Edu. The main public source was inspected on `master`. This report is an **independent audit**, not an official 01Edu course sequence.

## Verified measurements

| Finding | Result | Evidence |
| --- | --- | --- |
| Public `subjects/` immediate entries | **807** (801 directories, 6 files) | [subjects-index.json](../data/subjects-index.json) |
| Public `subjects/ai` immediate module dirs | **26** | [ai-module-index.json](../data/ai-module-index.json) |
| Public AI modules with `README.md` | **26/26** | Recursive tree, [AI index](../data/ai-module-index.json) |
| Public AI modules with `audit/README.md` | **26/26** | Recursive tree, [AI index](../data/ai-module-index.json) |
| Archived `subjects/ai` topic dirs | **22** | [archived-ai-index.json](../data/archived-ai-index.json) |
| Archived AI Piscine | **3 weeks, 15 days, 99 standard exercise directories** | [archived-ai-index.json](../data/archived-ai-index.json) |
| Archived AI capstones | **5 directories**, each with subject and audit | [archived-ai-index.json](../data/archived-ai-index.json) |
| Subject-name correspondences from archive to current | **22** | [ai-crosswalk.json](../data/ai-crosswalk.json) |
| Current AI names absent from archived module catalog | **4** | [ai-crosswalk.json](../data/ai-crosswalk.json) |

**Caution:** 807 is a one-level listing, not a project count; the 99 exercise count uses paths matching `weekNN/dayNN/exNN`. Historical 22-to-26 comparison does not establish dates or prove newly introduced content.

## AI curriculum comparison

All 22 topic-name correspondences have **different README blob SHA values**, and all 22 have **different audit README blob SHA values**. This proves the bytes of those source files differ between the snapshots; it does **not** measure pedagogical change by itself.

Four current AI modules have no aligned directory in the archived subject-module list:

1. `document-categorization` — document NLP, tagging, and application workflow.
2. `matrix-factorization` — recommender-system modeling with matrix factorization.
3. `spectral-learning` — dimensionality reduction, PCA, and SVD.
4. `vision-track` — real-time detection/tracking and a Streamlit interface.

The archived capstones provide historical hints at learning progression: Titanic prediction, NLP news intelligence, emotions detection, S&P 500 strategies, and credit scoring. The actual current deployment schedule remains **unknown**.

## Evaluation mechanism: preliminary observations

- [ascii-art-web subject](../../subjects/ascii-art-web/README.md) pairs with an [audit checklist](../../subjects/ascii-art-web/audit/README.md) specifying package restrictions, real HTTP interface behavior, and concrete input/output checks.
- [AI NumPy subject](../../subjects/ai/numpy/README.md) pairs with a detailed [audit](../../subjects/ai/numpy/audit/README.md) that includes environment, notebook, and array-behavior checks.
- [VisionTrack subject](../../subjects/ai/vision-track/README.md) pairs with an [audit](../../subjects/ai/vision-track/audit/README.md) covering model setup, data preprocessing, tracking, and verification.

These sample audits are predominantly **human-readable review questions**, not proof of standalone automated graders. Our independent assessor would need to distinguish manual checks from executable tests.

## Source-backed partial dependency graph

Five subject relationships are documented in [dependency-evidence.json](../data/dependency-evidence.json), including `ascii-art` → `ascii-art-web` and three `ascii-art-web` extension relationships. This is a **tiny initial graph**, not the complete 01Edu galaxy. Technical standards referenced by subjects (e.g. `good-practices`) are not automatically treated as project prerequisites.

## Cataloging hazards and limitations

- `subjects/AI.GO` is a directory of frontend robot-themed activities; one inspected exercise explicitly uses JavaScript and the DOM. It should **not** automatically be categorized as generative-AI coursework based on its name.
- There is no verified complete official galaxy dependency configuration in the sources inspected so far.
- The public projects do not establish the private Fellows Dashboard's assessment infrastructure, unlock rules, or a student's personal progress.
- Archive-to-current mappings follow topic names and should be treated as **candidate continuity**, not confirmed equivalence of assessments.
- Source README and audit files may contain narrative role-play text; automated extraction must preserve requirements without confusing narrative with testable acceptance criteria.
- Copyright/licensing permissions for separate redistribution and derivative republication require independent review.

## Next engineering actions

1. Classify the 801 immediate subject directories into exercise/project/extension/other using README content and tree context; report unknowns instead of guessing.
2. Extract subject-to-subject Markdown links, with path normalization and explicit edge types (`prior_project`, `extension_of`, `resource_link`, `standard_reference`).
3. Sample and structure audit README questions; identify which can be automated and which require human judgment.
4. Read and compare old/new AI README content at the section level rather than equating a SHA difference with a curriculum rewrite.
5. Build a versioned catalog schema and a reproducible analysis script before building the visualization.

**No changes were made to either fork's default branch.**
