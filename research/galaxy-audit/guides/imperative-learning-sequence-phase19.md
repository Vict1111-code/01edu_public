# Phase 19 — Imperative core and extensions: source-backed learning sequence

**Date:** 2026-11-04  
**Status:** Source inspection and draft progression completed; **official Galaxy unlock chronology remains unverified**.  
**Working repository/branch:** `Vict1111-code/01edu_public`, `research/galaxy-curriculum-audit`.

## Verified inventory

- **6** core Imperative subjects: `go-reloaded`, `ascii-art`, `ascii-art-web`, `groupie-tracker`, `lem-in`, `forum`.
- **17** nested extension subjects: 5 under `ascii-art`, 3 under `ascii-art-web`, 4 under `groupie-tracker`, and 5 under `forum`.
- **23/23** public subject READMEs and **23/23** matching public audit READMEs were opened and checked on the research branch.
- `ascii-art/examples` and `lem-in/examples` are not counted as independent assignments.
- Official position of optional project satellites and actual unlock gates remain unverified.

## Proposed main progression

The sequence is **an independent teaching plan**, not a transcript of official Galaxy gates. Each source is linked for verification.

| Path | Proposed position | Project | Prerequisites and scope | Primary audit evidence |
|---|---:|---|---|---|
| Foundation | 1 | [go-reloaded](../../../subjects/go-reloaded/README.md) | Go Piscine functions; text directives, case/punctuation normalization, file I/O | [audit](../../../subjects/go-reloaded/audit/README.md): sample conversions and punctuation |
| Foundation | 2 | [ascii-art](../../../subjects/ascii-art/README.md) | Text rendering and banner parsing; `go-reloaded` is recommended, **not required by public README** | [audit](../../../subjects/ascii-art/audit/README.md): exact output and input variants |
| Web/data | 3 | [ascii-art-web](../../../subjects/ascii-art-web/README.md) | **Explicitly builds on `ascii-art`**; Go HTTP GET/POST, HTML templates, status codes | [audit](../../../subjects/ascii-art-web/audit/README.md): HTTP correctness, banners, errors |
| Web/data | 4 | [groupie-tracker](../../../subjects/groupie-tracker/README.md) | Public API relations, JSON, server-triggered client actions; prior web project recommended | [audit](../../../subjects/groupie-tracker/audit/README.md): data collection and event checks |
| Web/data | 5 | [forum](../../../subjects/forum/README.md) | SQLite, registration, posts/comments, sessions, filters, Docker; prior HTTP/JSON knowledge recommended | [audit](../../../subjects/forum/audit/README.md): auth, persistence, permissions, Docker |
| Algorithms **parallel** | 4 | [lem-in](../../../subjects/lem-in/README.md) | Graph parsing, pathfinding, multi-ant traffic scheduling; **not dependent on web projects** | [audit](../../../subjects/lem-in/audit/README.md): route quality, invalid inputs, scaling |

### Dependency rules

1. **Explicit project relationship:** `ascii-art → ascii-art-web` because the latter calls itself a web GUI of the last project, ascii-art.
2. **Documented extensions:** Parent → each listed nested assignment, because its subject reuses or extends the parent.
3. **Reference, not a prerequisite:** `ascii-art-web/dockerize → forum` is a recommended Docker-learning resource in the forum README; it is **not** proved to be an official unlock gate.
4. **Recommended rather than documented:** `go-reloaded → ascii-art`, `ascii-art-web → groupie-tracker`, and `groupie-tracker → forum`.
5. **Parallel algorithm path:** `lem-in` should be taught after a foundation in Go parsing and data structures, but no public source requires completing any HTTP project first.

## Extensions grouped by parent

These tier numbers rank *suggested depth within the parent group*, **not official assignment ranks**.

### `ascii-art`

| Suggested depth | Extension | Core skill | Audit |
|---|---|---|---|
| 1 | [`ascii-art/fs`](../../../subjects/ascii-art/fs/README.md) | CLI options and font selection | [Audit](../../../subjects/ascii-art/fs/audit/README.md) |
| 1 | [`ascii-art/output`](../../../subjects/ascii-art/output/README.md) | file output | [Audit](../../../subjects/ascii-art/output/audit/README.md) |
| 2 | [`ascii-art/color`](../../../subjects/ascii-art/color/README.md) | terminal coloring | [Audit](../../../subjects/ascii-art/color/audit/README.md) |
| 3 | [`ascii-art/reverse`](../../../subjects/ascii-art/reverse/README.md) | inverse parsing | [Audit](../../../subjects/ascii-art/reverse/audit/README.md) |
| 3 | [`ascii-art/justify`](../../../subjects/ascii-art/justify/README.md) | terminal sizing and layout | [Audit](../../../subjects/ascii-art/justify/audit/README.md) |

### `ascii-art-web`

| Suggested depth | Extension | Core skill | Audit |
|---|---|---|---|
| 1 | [`ascii-art-web/stylize`](../../../subjects/ascii-art-web/stylize/README.md) | CSS and web accessibility | [Audit](../../../subjects/ascii-art-web/stylize/audit/README.md) |
| 2 | [`ascii-art-web/export-file`](../../../subjects/ascii-art-web/export-file/README.md) | HTTP downloads and content headers | [Audit](../../../subjects/ascii-art-web/export-file/audit/README.md) |
| 2 | [`ascii-art-web/dockerize`](../../../subjects/ascii-art-web/dockerize/README.md) | Docker and deployment | [Audit](../../../subjects/ascii-art-web/dockerize/audit/README.md) |

### `groupie-tracker`

| Suggested depth | Extension | Core skill | Audit |
|---|---|---|---|
| 1 | [`groupie-tracker/visualizations`](../../../subjects/groupie-tracker/visualizations/README.md) | UI design and CSS | [Audit](../../../subjects/groupie-tracker/visualizations/audit/README.md) |
| 2 | [`groupie-tracker/filters`](../../../subjects/groupie-tracker/filters/README.md) | filtering and form state | [Audit](../../../subjects/groupie-tracker/filters/audit/README.md) |
| 2 | [`groupie-tracker/search-bar`](../../../subjects/groupie-tracker/search-bar/README.md) | search and autocomplete | [Audit](../../../subjects/groupie-tracker/search-bar/audit/README.md) |
| 3 | [`groupie-tracker/geolocalization`](../../../subjects/groupie-tracker/geolocalization/README.md) | geocoding and maps API | [Audit](../../../subjects/groupie-tracker/geolocalization/audit/README.md) |

### `forum`

| Suggested depth | Extension | Core skill | Audit |
|---|---|---|---|
| 1 | [`forum/image-upload`](../../../subjects/forum/image-upload/README.md) | upload validation and content handling | [Audit](../../../subjects/forum/image-upload/audit/README.md) |
| 2 | [`forum/advanced-features`](../../../subjects/forum/advanced-features/README.md) | events and account features | [Audit](../../../subjects/forum/advanced-features/audit/README.md) |
| 2 | [`forum/authentication`](../../../subjects/forum/authentication/README.md) | external identity providers | [Audit](../../../subjects/forum/authentication/audit/README.md) |
| 3 | [`forum/moderation`](../../../subjects/forum/moderation/README.md) | role-based access control | [Audit](../../../subjects/forum/moderation/audit/README.md) |
| 3 | [`forum/security`](../../../subjects/forum/security/README.md) | application security | [Audit](../../../subjects/forum/security/audit/README.md) |


**Security note:** The older `forum` specification treats password hashing as bonus wording; our independently authored learning system should **require secure password hashing and sensible cookie/session protections from the start**, without misrepresenting that design decision as an official grading rule.

## Competency and assessment gates (independently proposed)

| Gate | Demonstrable competency | Checkable evidence |
|---|---|---|
| Go text-tool readiness | Parse inputs safely, transform text deterministically, write output | Table-driven tests for base conversion, case/punctuation and invalid inputs |
| ASCII renderer readiness | Accurately parse a banner and render all printable characters | Golden-file tests with whitespace, newline and full-character edge cases |
| HTTP readiness | Correctly route GET/POST and validate input | HTTP test cases for valid requests, bad input, missing resources and server stability |
| API/data readiness | Decode and combine four related JSON datasets | Fixture-based integration tests; predictable error behavior when upstream fails |
| Forum readiness | Enforce identity and persistence boundaries | SQL integration tests, session/authorization tests, Docker build/smoke test |
| Graph-algorithms readiness | Parse graphs, find efficient routes, prevent collisions | Valid/invalid ant-farm fixtures and bounded performance checks |

These are proposed **mastery checks**, not claims that equivalent private automated graders exist. Existing public audit READMEs are peer-review questions and expected outputs; they have **not** been run against a learner implementation in this phase.

## Unresolved / next work

- Confirm which of the six main subjects and 17 extensions are compulsory, bonus, or optional **in the particular historical Galaxy graph**. Directory nesting alone cannot establish a lock/unlock gate.
- Compare satellite/standalone subjects (`math-skills`, `tetris-optimizer`, `net-cat`, etc.) against graph placement and source content, without prematurely assigning them to Imperative.
- Extract detailed checklists into a machine-readable assessment schema, keeping *public audit* and *our additional learning tests* separate.
- Add a versioned graph dataset (delivered in `data/phase19-imperative-project-map.json`) to the larger full-Galaxy reconstruction and continue to Full-Stack and Architecture.

**Provenance:** This report uses public project specifications and their audit READMEs in the checked research branch. It does not contain solution code, private dashboard data, or an assertion about official student progression.
