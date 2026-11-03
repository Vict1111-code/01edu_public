# Phase 15 — Manual difficulty and learning-stage corrections

**Source:** the public 01Edu subject README for each of the 29 Phase 14 outliers, manually inspected on 2026-11-03.

**Boundary:** these are independent pedagogical stage suggestions, **not** official 01Edu Galaxy positions, quest order, audit grades, or hidden-test requirements.

## Ten recommended stage adjustments

| Piscine | Exercise | Previous proposed stage | Revised suggested stage | Evidence-based teaching rationale |
| --- | --- | ---: | ---: | --- |
| rust | [cipher](https://github.com/01-edu/public/blob/master/subjects/cipher/README.md) | 7 | 4 | Atbash validation returning Result<(), CipherError> is primarily string manipulation and custom error modeling, not advanced algorithms. |
| rust | [circle](https://github.com/01-edu/public/blob/master/subjects/circle/README.md) | 7 | 4 | Point/Circle structs and geometric methods including intersection fit structured methods and math foundations. |
| rust | [hashing](https://github.com/01-edu/public/blob/master/subjects/hashing/README.md) | 7 | 5 | Despite its title, the task is mean, median and mode of integer lists; collections and sorting suffice. |
| rust | [string_permutation](https://github.com/01-edu/public/blob/master/subjects/string_permutation/README.md) | 7 | 5 | Compare character frequencies between strings; frequency maps or sorting suffice. |
| rust | [mobs](https://github.com/01-edu/public/blob/master/subjects/mobs/README.md) | 4 | 5 | Uses HashMap, HashSet, struct state mutation and multi-entity combat behavior; collections are a useful prerequisite. |
| rust | [blood_types](https://github.com/01-edu/public/blob/master/subjects/blood_types/README.md) | 4 | 6 | BloodType modeling uses enums plus FromStr, Debug and other trait implementations; traits should precede it. |
| javascript | [is-winner](https://github.com/01-edu/public/blob/master/subjects/is-winner/README.md) | 8 | 5 | Consumes a supplied winners API and returns a Promise; primarily asynchronous API filtering and formatting. |
| javascript | [molecules-cells](https://github.com/01-edu/public/blob/master/subjects/molecules-cells/README.md) | 7 | 3 | DNA/RNA character complement mapping is basic string transformation, not advanced algorithms. |
| javascript | [quantifiers](https://github.com/01-edu/public/blob/master/subjects/quantifiers/README.md) | 7 | 4 | Implements every/some/none predicate logic without native every/some; higher-order functions are the main concept. |
| javascript | [rebecca-black](https://github.com/01-edu/public/blob/master/subjects/rebecca-black/README.md) | 7 | 2 | Date weekday, leap-year and month-boundary predicates fit introductory date/control-flow practice. |

## Nineteen outliers retained for now

These exercises were reviewed but **not moved**. A high or low heuristic score does not, by itself, establish the wrong learning stage.

- **go / [btreeapplybylevel](https://github.com/01-edu/public/blob/master/subjects/btreeapplybylevel/README.md)** — retain stage 8. Requires breadth-first traversal and callback invocation; a short README does not reduce algorithmic difficulty.
- **go / [btreeisbinary](https://github.com/01-edu/public/blob/master/subjects/btreeisbinary/README.md)** — retain stage 8. Requires validation of binary search tree ordering constraints; checking only immediate children is insufficient.
- **go / [btreelevelcount](https://github.com/01-edu/public/blob/master/subjects/btreelevelcount/README.md)** — retain stage 8. Requires computing binary-tree height and handling empty and unbalanced trees.
- **go / [btreesearchitem](https://github.com/01-edu/public/blob/master/subjects/btreesearchitem/README.md)** — retain stage 8. Requires tree search and nil handling, with data equality semantics from the public subject.
- **go / [listfind](https://github.com/01-edu/public/blob/master/subjects/listfind/README.md)** — retain stage 7. Uses linked-list traversal and the required CompStr comparator; pointer/interface behavior matters.
- **go / [listmerge](https://github.com/01-edu/public/blob/master/subjects/listmerge/README.md)** — retain stage 7. Must merge existing list nodes without creating new elements; pointer relinking is central.
- **go / [listremoveif](https://github.com/01-edu/public/blob/master/subjects/listremoveif/README.md)** — retain stage 7. Requires removing all matching nodes and updating links, including head and tail cases.
- **go / [sortedlistmerge](https://github.com/01-edu/public/blob/master/subjects/sortedlistmerge/README.md)** — retain stage 7. Merges two already-sorted linked lists while preserving sorted order; linked structure is more advanced than score suggests.
- **rust / [boxing_todo](https://github.com/01-edu/public/blob/master/subjects/boxing_todo/README.md)** — retain stage 8. JSON todo parsing, boxed dynamic errors, ParseErr/ReadErr and Display implementations make this an integrated advanced task.
- **rust / [does_it_fit](https://github.com/01-edu/public/blob/master/subjects/does_it_fit/README.md)** — retain stage 8. Multiple geometry variants and area/volume constraints across a supplied module require integration.
- **rust / [matrix_ops](https://github.com/01-edu/public/blob/master/subjects/matrix_ops/README.md)** — retain stage 7. Uses generic matrices and Wrapper to implement Add/Sub/Mul traits, with compile-time dimensions.
- **rust / [edit_distance](https://github.com/01-edu/public/blob/master/subjects/edit_distance/README.md)** — retain stage 7. Minimum insertion/deletion/substitution count is an algorithmic optimization problem; a short README hides dynamic-programming complexity.
- **javascript / [where-do-we-go](https://github.com/01-edu/public/blob/master/subjects/where-do-we-go/README.md)** — retain stage 8. Builds a fullscreen interactive page with sorted place sections, images and location indicator.
- **javascript / [greedy-url](https://github.com/01-edu/public/blob/master/subjects/greedy-url/README.md)** — retain stage 7. Extracts HTTP URLs and filters query-parameter counts; regex and URL parsing require careful edge cases.
- **javascript / [group-price](https://github.com/01-edu/public/blob/master/subjects/group-price/README.md)** — retain stage 7. Extracts price matches with structured capture groups; regex parsing and array output.
- **javascript / [its-a-match](https://github.com/01-edu/public/blob/master/subjects/its-a-match/README.md)** — retain stage 7. Defines four regex patterns with anchors and exact matches; simple task within regex-focused stage.
- **javascript / [match-cron](https://github.com/01-edu/public/blob/master/subjects/match-cron/README.md)** — retain stage 7. Matches cron numbers and wildcard fields to Date; limited syntax but careful calendar semantics.
- **javascript / [valid-ip](https://github.com/01-edu/public/blob/master/subjects/valid-ip/README.md)** — retain stage 7. Validates IPv4 octets and optional TCP ports, including ranges and leading-zero restrictions.
- **javascript / [vowel-dots](https://github.com/01-edu/public/blob/master/subjects/vowel-dots/README.md)** — retain stage 7. Requires a regex variable and vowel replacement; easy within the regex cluster, not an advanced algorithm.

## Concept interpretation

Each of the 29 reviews includes manually interpreted concepts in [the structured source review](../data/phase15-manual-outlier-review.json). Those interpretations are distinguished from automated README keyword matches and low-confidence filename guesses in the Phase 15 generated evidence file.

## Remaining work

Compare these suggested changes with actual learner outcomes and available public tests. Treat all 0–100 difficulty scores as provisional; scores are not recalibrated by this manual review.

**Repository safety:** the original subject instructions and both repositories' master branches remain untouched.
