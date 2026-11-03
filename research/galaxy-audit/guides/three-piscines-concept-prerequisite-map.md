# Three Piscines — concept prerequisites and independent learning routes

**Phase 14 · 2026-11-03**  
**Status:** independently curated learning map. **Not** the official 01Edu Galaxy unlock order, quest assignment, or assessment rubric.

## Go: build from execution to data structures

```text
Shell / Git
    └─ Variables → Control flow → Functions
                                  ├─ Recursion ───────────────┐
                                  ├─ Runes and strings → Parsing
                                  ├─ Files and CLI
                                  ├─ Callbacks
                                  └─ Pointers ───────────┐    │
Control flow → Slices → Sorting                         │    │
                                                       ├─ Linked lists
                                                       └─ Binary trees ←┘
                                                             └─ Tree traversal
```

**Exercise anchors (public subject names):** `printalphabet` (loops/output), `basicatoi` (parsing), `eightqueens` (recursion), `firstrune` (Unicode/runes), `split` (strings and slices), `foreach` (callbacks), `sortintegertable` (sorting), `listat` (linked lists), `btreeinsertdata` (binary trees), `btreeapplybylevel` (traversal).

**Important:** linked-list exercises and binary-tree exercises both benefit from pointer understanding; linked lists are **not a strict prerequisite** for learning binary trees. Some subjects have explicit requirements, such as recursion for `eightqueens`, but those requirements do not establish official Galaxy gating.

## Rust: memory safety and reusable abstractions

```text
Cargo → Types → Control flow
               ├─ Strings
               └─ Ownership → Borrowing → Lifetimes
                     ├─ Collections → Iterators
                     └─ Traits → Generics → Matrix structures
                                    └────────→ Operator traits
Control flow → Result / enums → Applications
Collections ──────────────────→ Applications
```

**Exercise anchors:** `expected_variable` (types), `arrays` (control flow), `ownership` (moves), `borrow` (references), `error_types` (errors), `collect` (collections), `traits`, `generics`, `lifetimes`, `matrix`, `lalgebra_scalar`, `matrix_ops`, `boxing_todo`.

**Source-backed distinction:** `matrix_ops` explicitly reuses earlier matrix/scalar structures. The curated public reference graph records `matrix` and `lalgebra_scalar` as earlier subject references. These are public subject relationships, **not official unlock conditions**.

## JavaScript: parallel browser and asynchronous routes

```text
Runtime → Values / Functions → Control flow → Arrays / Objects
                  │                   │              ├─ Functional methods
                  ├─ Closures ────────┘              ├─ Regex / Dates
                  ├─ Promises → Fetch / JSON         └─ UI state
                  └─ DOM → Events → UI state → Applications
Fetch / JSON ─────────────────────────→ Applications
```

**Exercise anchors:** `how-2-js` (runtime), `abs` (control flow), `collections` (data structures), `using-map` (functional methods), `get-json` (Promises/fetch), `build-brick-and-break` (DOM/events), `gossip-grid` (DOM/state), `valid-ip` (validation), `block-chain` (integrated practice).

**Important:** DOM and event programming does **not** require first completing `get-json`. A learner can develop browser UI skills while separately learning asynchronous requests.

## How the concept map differs from exercise ordering

| Evidence layer | Meaning | Official Galaxy unlock? |
| --- | --- | --- |
| Public README or manually curated direct source reference | A published requirement or relationship in the subject | **Not established** |
| Manually reviewed exercise concept | An educator's interpretation of the exercise's technical skills | **No** |
| README keyword-based concept | Automated but weak indicator from exercise text | **No** |
| Name-only concept hint | Very weak; requires full instruction review | **No** |
| Community archive folder | Where one learner saved a solution | **No** |

The detailed generated [concept graph and exercise-level cards](https://github.com/Vict1111-code/01edu_public/actions) preserve these evidence categories separately. For verified assignment requirements, open the public [01Edu subjects repository](https://github.com/01-edu/public/tree/master/subjects) and inspect the individual README.

## Corrections from source-file inspection

The [34-case source review](../data/phase14-source-inspected-identity-review.json) inspected the actual uploaded learner archive source files, without committing their code:

- `split2` is **not** `split`; its source converts an integer to printable runes.
- `student` is **not** the unrelated `mobile-dev/student` subject; it is a linked-list demonstration.
- `printnbrinorder1` exports `PrintNbrInOrder1`, not the official `PrintNbrInOrder` signature.
- `sortingintegertable-notmy` and `sorting` both export `SortIntegerTable`; source similarity does not prove passing behavior.
- `com2` exports `PrintComb2` but includes a malformed assignment; it must not be labeled a working solution.
- `raid1a`–`raid1d` draw rectangles; the precise official raid identity remains unverified.

The archive ZIPs and learner solutions remain outside the research branch. The review retains only source-derived metadata, partial SHA-256 identifiers, and concise behavioral observations.

## Study use

Use the eight-stage [Go](go-mastery-learning-path.md), [Rust](rust-mastery-learning-path.md), and [JavaScript](javascript-mastery-learning-path.md) mastery guides for exercises. Use this graph to understand **why** an exercise belongs in a stage, identify missing foundations, and select practice when a concept is difficult. Treat all difficulty scores as provisional.

**Research branch only:** `research/galaxy-curriculum-audit`.
