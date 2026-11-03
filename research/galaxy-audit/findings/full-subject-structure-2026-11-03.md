# Full subject-tree structural audit — 2026-11-03

**Source:** `Vict1111-code/01edu_public`, `master`, `subjects/` tree SHA `b78ec066b3c1123fc72c65d983aa5190c3f29d79`.  
**Scope:** Entire recursively retrieved `subjects/` Git tree (non-truncated). Content samples are identified separately; **not** every README has been read semantically.

## Exact structural coverage

| Metric | Count |
| --- | ---: |
| Git tree entries | **3,505** |
| Directories (all depths) | **1,537** |
| Files (all depths) | **1,968** |
| Immediate entries in `subjects/` | **807** (801 directories + 6 files) |
| Directories with their own subject `README.md` | **1,233** |
| Top-level subject READMEs | **792** |
| Nested subject READMEs | **441** |
| `audit/README.md` files | **207** |
| Additional `audit.md` files detected alongside subject READMEs | **18** |

**Definitions:** A "subject README" is a file matching `<directory>/README.md`, excluding `subjects/README.md` and files matching `<directory>/audit/README.md`. A subject README is **not automatically a full project**. A detected audit file is **not evidence of an executable grader**. Each subject index entry retains an exact source path and Git blob hash.

Nine immediate subject directories lack their own README: `AI.GO`, `ai`, `cybersecurity`, `devops`, `gaming`, `java`, `mobile-dev`, `samecase`, and `user-experience`. Eight of these are multi-subject collections; the role of `samecase` requires follow-up inspection.

## Collections under subjects/

| Collection | Subject READMEs | `audit/README.md` |
| --- | ---: | ---: |
| `java/` | 124 | 15 |
| `devops/` | 106 | 13 |
| `blockchain/` | 49 | 9 |
| `mobile-dev/` | 30 | 16 |
| `ai/` | 26 | 26 |
| `AI.GO/` | 23 | 1 |
| `cybersecurity/` | 20 | 20 |
| `user-experience/` | 16 | 16 |
| `gaming/` | 11 | 11 |

These are **source directory labels**, not verified official Galaxy orbital labels. `AI.GO/` is particularly misleading if interpreted by name alone: inspected subjects include browser DOM/JavaScript tasks.

## Structural classification, not semantic grading

The [subject-node index](../data/subject-node-index.json) classifies the 1,233 subjects as:

- **792** top-level subjects.
- **404** nested subjects under the nine identifiable collections.
- **37** nested extension candidates whose parent folder itself has a subject README.

The 37 extensions are **candidates based on repository structure**; whether each is an actual official progression step requires checking the corresponding README and audit.

## Verified examples from different subject areas

| Sample path | Direct evidence |
| --- | --- |
| `java/checkpoints/age-finder/` | Java checkpoint requires class `AgeFinder` and a `calculateAge` method |
| `devops/backup_manager/` | Python-based backup manager/service scripts, logging, and error handling |
| `blockchain/basic-wallet/` | Key-pair generation and cryptographic wallet operations |
| `mobile-dev/hacker-news/` | Mobile client consuming the Hacker News API |
| `cybersecurity/image-inspector/` | Image metadata examination and steganography detection |
| `user-experience/piscine-ui/atomic-design/` | UI design exercises, atomic-design components, and Figma deliverables |
| `gaming/2-5-d-adventure/` | Unreal Engine 5 side-scroller, gameplay mechanics and game loop |

These samples confirm **different technologies and assessment artifact types**. It would be incorrect to apply a single Go-based grading model to all Galaxy subjects.

## Additional repository materials relevant to evaluation

| Directory | Tree entries | What the README or filenames establish |
| --- | ---: | --- |
| `js/` | 223 | README documents a Node.js exercise test runner; 219 JS/JSON/MJS test-candidate files identified by filenames |
| `dom/` | 35 | README documents Puppeteer-based browser exercise tests; 29 *_test.js / test.js candidates identified |
| `employment-tasks/` | 15 | Job-interview-style assignments, including software engineer and DevOps examples |
| `docs/` | 64 | Supporting setup and database documentation, not automatically curriculum subjects |
| `sh/` | 387 | Shell-related scripts/configuration and supporting setup content, requiring separate classification |

**Important:** The 219 and 29 test-candidate counts are file-pattern results, **not** a proven number of exercises or complete official automatic grading coverage. Automated test code may need dependencies, environments, or external execution infrastructure.

## Source integrity and known unknowns

1. Git tree inspection covers filenames, directory relationships, modes, object IDs and paths. It does **not** by itself read or classify 1,233 README bodies.
2. Official course order, completion rules, unlock prerequisites, skill mappings and private portal data have **not** been recovered.
3. Not all content belongs to the four core or seven specialization orbits inferred from the screenshot; this requires a validated mapping.
4. Some tracks are nested collections; others have hundreds of individual top-level README paths. A correct graph will use a typed node model (track, subject, exercise, extension, assessment).
5. The public automated test harness is distinguishable from the human-readable `audit/` checklists. Both may be valuable for an independent learning platform.
6. This source snapshot is a fork state; upstream changes after that commit are not yet reflected here.

## Reusable research outputs

- [subject-node-index.json](../data/subject-node-index.json): full 1,233 subject-node source catalog with README/audit object IDs.
- [track-coverage.json](../data/track-coverage.json): counts across the entire `subjects/` Git tree.
- [auxiliary-coverage.json](../data/auxiliary-coverage.json): `js/`, `dom/`, `sh/`, `docs/`, and `employment-tasks/` measurements.
- [dependency-evidence.json](../data/dependency-evidence.json): explicitly documented starter relationships.

## Next audit pass

**Prioritize semantic project analysis**, not UI generation: extract all README links, parse headings and deliverables, discover project-local `audit/` criteria and known runnable tests, assign confidence-labeled candidate Galaxy orbits, and keep unknown project dependencies visible rather than fabricating links.

The two forks' `master` branches remain unmodified.
