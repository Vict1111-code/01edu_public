# Phase 23 — Galaxy screenshot-to-public-subject visual crosswalk

**Date:** 2026-11-04  
**Source screenshot:** User-provided 1280×720 radial 01Edu Galaxy graph in this conversation  
**Research branch:** `research/galaxy-curriculum-audit`  
**Public subject tree:** `b78ec066b3c1123fc72c65d983aa5190c3f29d79`

## What this picture establishes

The image is the visual **catalog-arrangement reference**. It shows central language Piscines, three green inner project arcs, connecting/satellite curves, and six major outer specialization branches. The screenshot shows positions and grouping but does **not** prove a node's official unlock requirements, exact current curriculum status, compulsory nature, prerequisites, or assessment algorithm.

We manually read legible labels from the supplied image, then cross-checked the expected source paths against the existing 1,233-node public subject index. **84 unique labeled project paths match README-bearing entries**. The 84 are only the transcription sample in this phase, *not* the total node count of the picture or the repository.

## Core green arcs — 17 visual labels, source cross-checked

| Arc | Visual labels in screenshot traversal order |
| --- | --- |
| **Imperative** | `go-reloaded` → `ascii-art` → `ascii-art-web` → `groupie-tracker` → `lem-in` → `forum` |
| **Architecture** | `0-shell` → `multiplayer-fps` → `localhost` → `rt` → `filler` → `smart-road` |
| **Full-Stack** | `make-your-game` → `real-time-forum` → `graphql` → `social-network` → `mini-framework` |

The central markers read **Piscine Go**, **Piscine Rust**, **Piscine JS**, with the concept axes **Algorithms**, **Linux**, and **Graphics**. These visual labels do not imply each marker corresponds to a single public subject README.

## Outer Galaxy arcs — 41 source-matched visible labels

| Visible outer branch | Matched labels | Public subject collection |
| --- | ---: | --- |
| Artificial Intelligence | 5 | `subjects/ai/` |
| Cloud DevOps | 7 | `subjects/devops/` |
| Video Games | 10 | `subjects/gaming/` |
| Mobile & Applications | 5 | `subjects/mobile-dev/` |
| Cybersecurity | 10 | `subjects/cybersecurity/` |
| Blockchain & Crypto | 4 | `subjects/blockchain/` |

These counts describe the **legible labels chosen from the screenshot**, not the complete contents of those collections. The public source index holds many additional nested assignments. Examples cross-checked include `ai/kaggle-titanic`, `devops/orchestrator`, `gaming/vehicle-physics`, `mobile-dev/secure-messenger`, `cybersecurity/hole-in-bin`, and `blockchain/payment-channel`.

The screenshot also labels **Piscine AI**, **Piscine Blockchain**, **Piscine UX**, **Piscine UI**, and **Piscine Flutter** around outer/intermediate routes. Marker names are not verified project IDs.

## Intermediate curves — 26 source-matched visible labels

These are maintained separately from the green arcs and specialization branches:

- **Upper core-adjacent curve (5):** `tetris-optimizer`, `atm-management-system`, `push-swap`, `my-ls-1`, `net-cat`.
- **Statistics/algorithms (4):** `guess-it-1`, `linear-stats`, `guess-it-2`, `math-skills`.
- **Linux/network administration (6):** `linux`, `login`, `add-vm`, `connect`, `remote`, `scan`.
- **User experience (3):** `a-table`, `get-a-room`, `lets-fair-trade`, each linked to its nested `user-experience/projects/` README.
- **Advanced systems (4):** `corewar`, `zappy`, `system-monitor`, `wget`.
- **Cross-language application satellites (4):** `stock-exchange-sim`, `mister-quiz`, `shop`, `netfix`.

**Do not flatten** any of these into official project phases without supporting source evidence. Cross-language projects are not proof that a learner must complete every programming language in a fixed sequence.

## Three unresolved low-resolution image labels

| Screenshot text (tentative) | Reason not attached to a public node |
| --- | --- |
| `make-your-own` | No exact README-bearing subject path in the pinned index |
| `kahoot` | No exact path; `mobile-dev/kaquiz` is only a candidate |
| `lets-do-some-sport` | `user-experience/projects/lets-do-some-sports` is a plausible pluralized match, not photographically certain |

We preserve these as unresolved rather than inventing canonical IDs. The unresolved count excludes unreadable white-dot nodes that cannot be reliably transcribed.

## Storage and integrity controls

- [Machine-readable visual-anchors catalog](../data/phase23-galaxy-visual-anchors.json) with track grouping, image region, nested source path, pinned README SHA, public audit README SHA where present, and explicit unknown official-status fields.
- [Reconciliation script](../scripts/verify-phase23-visual-anchors.mjs) checks the 84 path identities against the pinned public node index and checks the 17 core arc sequences against the prior manually verified screenshot core index.
- [Five regression tests](../scripts/verify-phase23-visual-anchors.test.mjs) cover identity, source SHA, core preservation, duplicate mapping, and fabricated unlocks.

## Next steps

Use this **visual taxonomy** as the organizational skeleton for the complete public catalog, rather than treating the alphabetical `subjects/` listing as a timeline. Add more screenshot labels only when visually defensible, and classify the remaining Phase 22 unreviewed source subjects by reading their instructions. Keep three separate directed edge types in any eventual graph: (1) explicitly stated dependencies, (2) nonbinding learning recommendations, (3) purely visual groupings. **Only the first can justify a README-supported project prerequisite, and none alone establishes official dashboard unlock rules.**
