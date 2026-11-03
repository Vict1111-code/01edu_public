# Phase 16 — Curriculum evidence triage

Date: 2026-11-03. Branch: `research/galaxy-curriculum-audit`.

## Coverage

All **110** previously low-evidence candidates are now accounted for:

- **76** public exercise README manual reviews: 28 Go, 14 Rust, 34 JavaScript.
- **34** previously inspected community source files: 33 Go, one JavaScript. These are identity observations, **not verified official assignments**.
- **23** independent teaching-stage changes: 6 Go, 3 Rust, 14 JavaScript.
- **24** questionable keyword matches inspected against source instructions: 13 supported, 11 rejected.

## Selected learning-stage corrections

| Piscine | Exercise | Earlier stage | Suggested stage | Why |
| --- | --- | ---: | ---: | --- |
| Go | collatzcountdown | 8 | 3 | Iterative number algorithm |
| Go | fixthemain | 8 | 2 | Repair a small Go program |
| Go | printnbrbase | 4 | 5 | Base conversion and validation |
| Rust | string_literals | 1 | 3 | Borrowed string slices with no heap allocation |
| Rust | doubtful | 4 | 3 | Mutating string references |
| JavaScript | deep-copy | 3 | 7 | Recursive copying |
| JavaScript | replica | 3 | 7 | Deep object assignment |
| JavaScript | fusion | 4 | 7 | Recursive type-dependent merging |
| JavaScript | sums | 4 | 7 | Unique integer partitions |
| JavaScript | cut-corners | 2 | 7 | Rounding functions under operator restrictions |
| JavaScript | nasa | 5 | 2 | Divisibility loops |
| JavaScript | pyramid | 8 | 2 | Loop-based string patterns |
| JavaScript | unbreakable | 8 | 3 | String split and array join |

The full review records all 76 exercises and 23 stage changes; these are **independent study recommendations**, not official Galaxy quest placements.

## Semantic source corrections

The public instructions show that `long-words`, `declarations`, `chunky`, `last-first-kiss`, `using-reduce`, and `reduce` operate on **array elements**, not browser DOM elements. Their automatic DOM tags were rejected. By contrast, `mouse-trap`, `pick-and-click`, and `harder-bigger-bolder-stronger` do require browser DOM operations.

Rust `banner` and `card_deck` mention implementing associated functions but do not require implementing a trait; those particular trait tags were rejected. `events`, `matrix_mult`, `matrix_transposition`, `roman_numbers`, and `roman_numbers_iter` do require traits. Go `activebits` uses binary representation for bit counting, not base parsing.

## Files

- [76 public README manual classifications](../data/phase16-manual-readme-classifications.json)
- [34 community source identity reviews](../data/phase14-source-inspected-identity-review.json)
- [24 semantic keyword verdicts](../data/phase16-keyword-semantic-verdicts.json)
- [Reconciliation generator](../scripts/triage-piscine-evidence.mjs)
- [Reconciliation tests](../scripts/triage-piscine-evidence.test.mjs)

The GitHub Actions artifact contains a merged JSON curriculum and three updated language-specific study guides. No learner source code was committed. Both master branches remain unchanged.
