# Foundation and Core Galaxy audit — 2026-11-03

**Scope:** selection/core Piscines, center concept axes, green-ring projects under Imperative, Architecture and Full-Stack, and evidence-backed cross-path links.  
**Source:** 01Edu Galaxy screenshot shared by the user; `Vict1111-code/01edu_public` fork at `master` with `subjects/` tree SHA `b78ec066b3c1123fc72c65d983aa5190c3f29d79`.

This document is an **independent reconstruction from publicly accessible material**. Screenshot placement is an observation, **not a claim about official lock/unlock gates**.

## Verified green-ring projects from the screenshot

| Ring | Visually ordered project labels | README + audit file |
| --- | --- | --- |
| Imperative | `go-reloaded`, `ascii-art`, `ascii-art-web`, `groupie-tracker`, `lem-in`, `forum` | 6/6 confirmed |
| Architecture | `0-shell`, `multiplayer-fps`, `localhost`, `rt`, `filler`, `smart-road` | 6/6 confirmed |
| Full-Stack | `make-your-game`, `real-time-forum`, `graphql`, `social-network`, `mini-framework` | 5/5 confirmed |
| Center | Piscine Go, Piscine Rust, Piscine JS; Algorithms, Linux, Graphics axes | These are central diagram markers, **not** 6 independent README paths |

See [screenshot-core-index.json](../data/screenshot-core-index.json) for file paths and blob hashes; [foundation-project-profiles.json](../data/foundation-project-profiles.json) for technologies, project aims and competencies.

This is a structural and semantic inspection of the **17 identifiable green-ring projects**, not a claim that all possible core or interleaved projects have been inspected.

## Piscine evidence

- **Go:** `subjects/printalphabet/`, `basicatoi/`, `quad/`, `quadchecker/`, `sudoku/` are verified public subject directories. `quadchecker` explicitly says it builds on the `quad` functions; the full selection quest, raid and examination timetable remains unknown.
- **Rust:** `subjects/hello_rust/README.md` explicitly calls itself the **first Rust Piscine exercise**; `fibonacci2/` is a Rust function exercise; `subjects/smart-road/README.md` explicitly identifies `road_intersection` as a **Rust Piscine raid**.
- **JavaScript:** `subjects/3-directions/`, `access/` and `all/` have verified JS exercise subjects. The `js/` and `dom/` README files explain local JavaScript and Puppeteer test execution. These do not provide a verified ordered JS quest schedule.
- **AI:** The historical `Branch-AI` three-week Piscine and five specialization projects are documented elsewhere; **this is distinct from the center core Piscines**, and should not dominate the initial foundation path.

The public `subjects/` repository is largely a flat name catalog for Go, Rust and JS exercises; do not confuse that flat organization with official pedagogy sequencing.

## Confirmed subject relationships

The [foundation-dependency-evidence.json](../data/foundation-dependency-evidence.json) records 14 source-backed subject relationships using typed edges:

- **Project lineage:** `ascii-art` → `ascii-art-web`; `forum` → `real-time-forum`; `quad` → `quadchecker`.
- **Rust Piscine bridge:** `road_intersection` → `smart-road` (explicitly described as revisiting the Rust Piscine raid).
- **Project extensions:** `ascii-art` → `ascii-art/fs`, `ascii-art-web` → `dockerize`, `export-file`, `stylize`; `forum` → `forum/authentication`; `0-shell` → `job-control`, `scripting`.
- **Resource references, not proven gates:** `ascii-art-web/dockerize` is a recommended Docker learning resource for `forum` and `filler`.
- **Prior-experience context:** `mini-framework` refers to prior framework usage in `social-network`; **this is not proof of a formal unlock**.

`go-reloaded` explicitly says to reuse functions from the learner's earlier repository after admission, but it does not give a machine-resolvable prerequisite ID in the inspected file.

## Core competencies revealed by subject instructions

**Imperative:** Go text processing, CLI input/output, templates, HTTP handlers, external APIs, algorithms, SQLite-backed application development.

**Architecture:** Rust systems programming and HTTP/1.1 servers, UDP multiplayer networking, ray tracing and simulation, game/strategy bots, event/graphics programming.

**Full-Stack:** JavaScript DOM and browser-performance engineering, Go/JS real-time web apps, database migration and application features, authenticated GraphQL, frontend framework internals.

The boundaries are **pedagogical groupings, not exclusive technologies**. For example, `ascii-art-web` combines Go and HTTP/web development even though it visually belongs to the Imperative arc.

## Operational blockers relevant to a personal dashboard

1. **`graphql` requires a school-provided GraphQL endpoint and login JWT.** We have the public specification, but no private Fellows Dashboard API or credentials. A personal reproduction needs its own schema/mock adapter.
2. **`groupie-tracker` refers to an externally hosted API.** Its present availability is not verified; a future implementation needs endpoint validation or a compliant substitute.
3. **`filler` relies on an execution engine and Docker setup.** A project README is not equivalent to a turnkey automated evaluation environment.
4. **JS/DOM runners are documented** in the public repository, but their presence does not imply every project can be automatically assessed.
5. **Screenshot age and curriculum updates are unknown.** The historic visual ordering should be versioned and compared with current official AI-native course material.

## Next tasks toward a faithful Galaxy

- Extract all Markdown references from the 1,233 subject README files and classify links as project prior work, extensions, standards/resources or external.
- Identify Go/Rust/JavaScript Piscine exercise groupings using stronger sources than filenames alone, preserving unknown quest numbers.
- Evaluate the 17 core audit files to separate runnable checks, manual review questions and environment-specific prerequisites.
- Expand from the green rings into interleaved secondary and satellite projects such as `net-cat`, `math-skills`, `tetris-optimizer` and `quadchecker`, rather than assuming each belongs to exactly one band.
- Build an independent, **source-linked** graph with explicit provenance; never equate a visual neighbor with a required prerequisite.

**All research changes remain confined to `research/galaxy-curriculum-audit`; original subject content and both fork master branches are unchanged.**
