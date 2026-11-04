# Phase 21 — Expanded Galaxy standalone-project discovery

**Date:** 4 November 2026  
**Research branch:** `research/galaxy-curriculum-audit`  
**Evidence:** Public 01Edu `subjects/` top-level README and `audit/README.md` files; existing screenshot-core and Phase 20 satellite indexes.

## What was reviewed

The indexed repository contains **792 top-level subjects with README files**, of which **56 have `audit/README.md`**. We previously classified 17 screenshot-confirmed core subjects and six sampled standalone subjects. In Phase 21 we inspected and classified the remaining **33 audit-bearing top-level subjects**.

**This is a targeted discovery subset rather than a complete classification of all optional Galaxy projects.** The other **736 top-level README subjects do not have `audit/README.md`** in our index. Their absence of that exact audit path does *not* mean they lack assessment material or cannot be major projects; they have not been semantically classified in this phase.

The full source-attested list is published in [the Phase 21 dataset](../data/phase21-expanded-project-candidates.json) and [the generated learning-category guide](https://github.com/Vict1111-code/01edu_public/actions).

## Cross-track categories revealed by 33 additional subjects

| Learning family | Number | Public subjects |
| --- | ---: | --- |
| Linux/sysadmin labs | 6 | `add-vm`, `connect`, `linux`, `login`, `remote`, `scan` |
| Cross-language application development | 5 | `atm-management-system` (C), `mister-quiz` (PHP/Laravel), `netfix` (Python/Django), `shop` (Ruby/Rails), `system-monitor` (C++) |
| General algorithms/systems | 4 | `corewar`, `push-swap`, `stock-exchange-sim`, `wget` |
| HTML/JS web foundations and raids | 3 | `carbon-copy`, `clonernews`, `free-project` |
| Statistics and prediction | 3 | `guess-it-1`, `guess-it-2`, `linear-stats` |
| Go command-line satellites | 2 | `my-ls`, `my-ls-1` |
| Games and AI | 2 | `tron`, `zappy` |
| Full-Stack advanced project | 1 | `bomberman-dom` |
| Graphics algorithms | 1 | `chaikin` |
| JavaScript algorithms | 1 | `crossword` |
| Rust graphics/traits | 1 | `drawing` |
| Browser automation | 1 | `ephemeris` |
| Cross-track foundations | 1 | `git` |
| Go Piscine raid | 1 | `quad` |
| Existing JavaScript Piscine exercise | 1 | `sortable` |
| **Total** | **33** | |

The classification describes concepts and programming-language requirements, **not official Galaxy assignment membership**. These 33 candidates should not all be attached to Imperative simply because they appear as top-level directories.

## Important public-source dependencies

### Statistics and prediction pathway

The subjects provide stronger relationship evidence than merely being close together in a screenshot:

- [`math-skills`](https://github.com/01-edu/public/blob/master/subjects/math-skills/README.md) → [`guess-it-1`](https://github.com/01-edu/public/blob/master/subjects/guess-it-1/README.md). The second explicitly requests use of the first project's calculations.
- [`linear-stats`](https://github.com/01-edu/public/blob/master/subjects/linear-stats/README.md) → [`guess-it-2`](https://github.com/01-edu/public/blob/master/subjects/guess-it-2/README.md). The second explicitly refers to the previous linear statistics calculations.

A reasonable optional learning route is statistics fundamentals → regression/correlation → range-prediction problems. This is evidence of **subject references**, not access to dashboard lock states.

### Full-Stack bridge

[`bomberman-dom`](https://github.com/01-edu/public/blob/master/subjects/bomberman-dom/README.md) explicitly refers to the custom `mini-framework` and references `make-your-game` performance expectations. The web game adds WebSocket chat and multiplayer UI behavior. This makes it a strong candidate for a *later Full-Stack extension*, rather than an early Go Imperative assignment.

### Linux/system administration progression

The `linux` and `login` subject descriptions explicitly describe installing and then using a Debian VM. The remaining VM exercises cover setup, remote SSH, DHCP and network scanning. They form a plausible Linux/sysadmin sequence, but an exact sequence and compulsory status need further validation.

### Cross-language integration projects

The public subjects explicitly introduce C ATM maintenance, PHP Laravel quiz development, Python Django services, Ruby Rails ecommerce, and C++ Dear ImGui system monitoring. These are good candidates for cross-track adaptability or optional satellite branches, not Go Piscine exercises.

## Avoiding double counts and false classifications

- `quad` is a Go quadrangle/raid subject; keep it with Piscine raid material rather than counting it as a new post-Piscine project.
- `sortable` was included among the already reviewed JavaScript Piscine exercise subjects; keep one canonical exercise identity.
- `my-ls` and `my-ls-1` have closely related Go file-listing requirements but are distinct source paths, with an explicit `os/exec` prohibition in `my-ls-1`. Do not assume official duplication or equivalence without further investigation.
- The repository's `audit/README.md` location is *one audit format*, not the sole proof of a subject's project status.

## Reproducibility and limitations

The [source-review dataset](../data/phase21-expanded-project-candidates.json) lists every additional subject's source path, public audit path, language category, source-specific evidence phrase, and instructional interpretation. The [verification script](../scripts/verify-expanded-projects.mjs) checks that all 56 public-audit-bearing top-level subjects are accounted for across the three researched sets. It validates README phrases, nonempty audits, SHA-256 provenance, and excludes fabricated official unlock statuses. Eight automated tests are in [the test file](../scripts/verify-expanded-projects.test.mjs).

Next, we should use these Full-Stack references and the five screenshot-confirmed Full-Stack core projects to reconstruct that track and its direct extensions. A subsequent separate exercise is needed to search the remaining non-audited top-level subjects for additional optional projects.

**None of the original assignments or either repository's master branch was edited.**
