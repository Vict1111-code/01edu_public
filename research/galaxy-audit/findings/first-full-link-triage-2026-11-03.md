# Full Galaxy link review — 2026-11-03

**Automated run:** https://github.com/Vict1111-code/01edu_public/actions/runs/41647213323  
**Source:** the research branch and the public `subjects/` snapshot.  
**Status:** Tests, scan, deduplication, triage and artifact export all succeeded on GitHub Actions.

## Triage results

Of 75 extracted inline Markdown link instances across 1,233 README-bearing subjects, **73 represent unique pairs**.

| Classification | Unique pairs |
| --- | ---: |
| Shared coding standard | 35 |
| Project extensions (automatically inferred) | 22 |
| Prior project lineage | 2 |
| Rust Piscine to core reference | 1 |
| General learning resources | 2 |
| Parent-context reference | 1 |
| Supporting asset references | 2 |
| Ambiguous, requires manual review | 8 |
| **Total** | **73** |

These are **link classifications, not official unlock relations**. Some may point to optional resources, independent projects, or referenced code rather than hard gates.

## Manual review of eight ambiguous pairs

All eight pairs that the automated triage marked `needs_manual_review` have now been checked against their source README. The results are in [manual-review-unresolved-eight.json](../data/manual-review-unresolved-eight.json).

| Referenced prior subject | Source subject | Source meaning |
| --- | --- | --- |
| `lalgebra_scalar` | `matrix` | Reuse the Scalar definition |
| `lalgebra_scalar` | `matrix_ops` | Reuse the Scalar structure |
| `matrix` | `matrix_ops` | Reuse the Matrix structure |
| `mini-framework` | `bomberman-dom` | **Requires the custom framework** created previously |
| `make-your-game` | `bomberman-dom` | Reuse game-design principles |
| `make-your-game/different-maps` | `bomberman-dom` | Explicitly **optional** project reference |
| `mobile-dev/secure-notes` | `mobile-dev/package` | Package the earlier Secure Notes app |
| `ascii-art` | `ascii-art-web/export-file` | Export the prior ASCII-art output |

The strongest actual code reuse statements concern the `Scalar`/`Matrix` Rust exercises and `mini-framework` → `bomberman-dom`. They still **do not prove private Galaxy prerequisites**.

## Observations and parser blind spots

1. A large majority of automated links are shared conventions and resources, not meaningful project progression.
2. The six-plus examples of project reuse show cross-area dependencies. `bomberman-dom` draws on both a prior game project and a frontend framework project, demonstrating why a **directed graph**, not a single ordered list, is appropriate.
3. Optional links must not be converted to required dependencies. `make-your-game/different-maps` is explicitly described as useful, not necessary, for `bomberman-dom`.
4. The extraction only parses ordinary Markdown links and selected official subject URLs. Plain-text project references, reference-style Markdown and nested URL punctuation can be missed.
5. The 157 unresolved *local paths* largely merit inspection as potential images, sample files, datasets, support docs and broken paths before any claim of missing assignment files.
6. **21st-century 01Edu curriculum terms and recent AI-native course additions are not guaranteed to appear in this historical public snapshot**; these source boundaries remain explicit.

## Next stage

Build a versioned **curated dependency graph** from these source-backed relations, with typed edges: `requires_output`, `uses_prior_principles`, `optional_resource`, `extension_of`, `standards_reference`, and `unknown`. Keep the original extracted graph and source context unchanged for reproducibility. Then improve extraction coverage for plain-text references and perform a broader Piscine-versus-core curriculum mapping.

**Repository safety:** neither fork's `master` branch was changed.
