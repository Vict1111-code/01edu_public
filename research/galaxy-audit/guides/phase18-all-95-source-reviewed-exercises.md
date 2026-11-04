# Phase 18 — Complete source review of the remaining 95 Piscine candidates

**Reviewed:** 4 November 2026. **Research branch:** `research/galaxy-curriculum-audit`.

All 95 identifiers previously marked for full semantic review have been inspected using the published 01Edu subject READMEs. The suggested stages and skill labels below are **independent educational judgments**, not official Galaxy quest order, unlock rules, grading, or an assertion of official Piscine membership.

**Outcome:** 94 public subject specifications can be used as learning references. One apparent name match, Go archive `rot.go`, is a **false cross-language match**: the published `rot` README specifies a Rust `String` and an `i8`, while the archive contains a Go scratch loop.

## All reviewed exercises

| Language | Community exercise identifier / public subject | Suggested stage | Main concepts | Source-derived instructional interpretation |
| --- | --- | ---: | --- | --- |
| go | [abort](https://github.com/01-edu/public/blob/master/subjects/abort/README.md) | 3 | functions, sorting | Return the median of five integers without using file or CLI semantics. |
| go | [atoibase](https://github.com/01-edu/public/blob/master/subjects/atoibase/README.md) | 5 | parsing, runes_strings | Parse a number using a validated alphabet; reject short, duplicate, plus or minus containing bases. |
| go | [btreeapplyinorder](https://github.com/01-edu/public/blob/master/subjects/btreeapplyinorder/README.md) | 8 | binary_trees, tree_traversal, callbacks | Apply supplied callback through in-order binary-tree traversal. |
| go | [btreeapplypostorder](https://github.com/01-edu/public/blob/master/subjects/btreeapplypostorder/README.md) | 8 | binary_trees, tree_traversal, callbacks | Apply supplied callback through post-order traversal. |
| go | [btreeapplypreorder](https://github.com/01-edu/public/blob/master/subjects/btreeapplypreorder/README.md) | 8 | binary_trees, tree_traversal, callbacks | Apply supplied callback through pre-order traversal. |
| go | [cat](https://github.com/01-edu/public/blob/master/subjects/cat/README.md) | 6 | files_cli | Implement simplified cat supporting files and stdin, without CLI options. |
| go | [compact](https://github.com/01-edu/public/blob/master/subjects/compact/README.md) | 5 | pointers, slices | Remove zero-valued strings in-place through pointer to slice and return nonzero count. |
| go | [concatparams](https://github.com/01-edu/public/blob/master/subjects/concatparams/README.md) | 4 | runes_strings, slices | Join the passed string-slice parameters with newlines, not CLI args. |
| go | [convertbase](https://github.com/01-edu/public/blob/master/subjects/convertbase/README.md) | 5 | parsing, runes_strings | Convert positive base-encoded string between valid digit alphabets. |
| go | [doop](https://github.com/01-edu/public/blob/master/subjects/doop/README.md) | 6 | files_cli, parsing, control_flow | Build CLI calculator with operator validation, overflow and division-by-zero behavior. |
| go | [enigma](https://github.com/01-edu/public/blob/master/subjects/enigma/README.md) | 7 | pointers | Rearrange values through several pointer arguments while preserving old values. |
| go | [fprime](https://github.com/01-edu/public/blob/master/subjects/fprime/README.md) | 6 | files_cli, parsing, control_flow | Prime-factorize CLI integer and format ascending factors separated by asterisk. |
| go | [ispowerof2](https://github.com/01-edu/public/blob/master/subjects/ispowerof2/README.md) | 3 | control_flow, parsing | Detect power of two for positive command-line input; not a generic sorting task. |
| go | [issorted](https://github.com/01-edu/public/blob/master/subjects/issorted/README.md) | 6 | callbacks, slices, sorting | Use a supplied comparison function to determine sorted order. |
| go | [itoabase](https://github.com/01-edu/public/blob/master/subjects/itoabase/README.md) | 5 | parsing, runes_strings | Format signed integer in base 2 to 16 with uppercase alphabetic digits. |
| go | [listforeach](https://github.com/01-edu/public/blob/master/subjects/listforeach/README.md) | 7 | linked_lists, pointers, callbacks | Apply callback to data stored in each linked-list node. |
| go | [listforeachif](https://github.com/01-edu/public/blob/master/subjects/listforeachif/README.md) | 7 | linked_lists, pointers, callbacks | Apply callback only to list nodes passing a predicate. |
| go | [listreverse](https://github.com/01-edu/public/blob/master/subjects/listreverse/README.md) | 7 | linked_lists, pointers | Reverse linked list nodes with correct head and tail updates. |
| go | [printparams](https://github.com/01-edu/public/blob/master/subjects/printparams/README.md) | 4 | files_cli, runes_strings | Print command-line args in given order. |
| go | [revparams](https://github.com/01-edu/public/blob/master/subjects/revparams/README.md) | 4 | files_cli, runes_strings | Print command-line args in reverse order. |
| go | [rot](https://github.com/01-edu/public/blob/master/subjects/rot/README.md) | Unplaced — wrong-language match | None verified | CROSS-LANGUAGE COLLISION: official subjects/rot README requires Rust String and i8, while community rot.go is an unrelated Go loop scratchpad; do not attach as official Go exercise. |
| go | [rot14](https://github.com/01-edu/public/blob/master/subjects/rot14/README.md) | 4 | runes_strings, control_flow | Substitute Latin letters by ROT14 while preserving case and nonletters. |
| go | [sortparams](https://github.com/01-edu/public/blob/master/subjects/sortparams/README.md) | 4 | files_cli, sorting, runes_strings | Sort and print CLI arguments by ASCII code order. |
| go | [ultimatepointone](https://github.com/01-edu/public/blob/master/subjects/ultimatepointone/README.md) | 7 | pointers | Dereference three pointer levels to assign integer one. |
| go | [printnbrinorder](https://github.com/01-edu/public/blob/master/subjects/printnbrinorder/README.md) | 5 | sorting, parsing | Print nonnegative integer digits in ascending order without converting to int64. |
| go | [sortlistinsert](https://github.com/01-edu/public/blob/master/subjects/sortlistinsert/README.md) | 7 | linked_lists, pointers, sorting | Insert an integer into existing sorted list and return head; the public README explicitly mentions prior listsort structure. |
| go | [sortwordarr](https://github.com/01-edu/public/blob/master/subjects/sortwordarr/README.md) | 6 | sorting, slices, runes_strings | Sort string slice in ascending ASCII order. |
| go | [advancedsortwordarr](https://github.com/01-edu/public/blob/master/subjects/advancedsortwordarr/README.md) | 6 | sorting, slices, callbacks | Sort strings using user-supplied comparison function. |
| go | [any](https://github.com/01-edu/public/blob/master/subjects/any/README.md) | 6 | callbacks, slices | Return true when any string item satisfies predicate. |
| go | [appendrange](https://github.com/01-edu/public/blob/master/subjects/appendrange/README.md) | 5 | slices, control_flow | Build half-open integer range slice via append without make; return nil for empty range. |
| go | [atoi](https://github.com/01-edu/public/blob/master/subjects/atoi/README.md) | 5 | parsing, runes_strings | Parse optional sign and decimal digits; return zero for invalid strings. |
| go | [basicatoi2](https://github.com/01-edu/public/blob/master/subjects/basicatoi2/README.md) | 5 | parsing, runes_strings | Parse unsigned decimal string and reject invalid characters; sign handling not required. |
| go | [boolean](https://github.com/01-edu/public/blob/master/subjects/boolean/README.md) | 2 | functions, control_flow | Repair supplied Go main program without changing its prescribed structure. |
| go | [comcheck](https://github.com/01-edu/public/blob/master/subjects/comcheck/README.md) | 4 | files_cli, runes_strings | Detect exact CLI keywords and emit alert only when a match exists. |
| go | [countif](https://github.com/01-edu/public/blob/master/subjects/countif/README.md) | 6 | callbacks, slices | Count string items satisfying callback predicate. |
| go | [displayfile](https://github.com/01-edu/public/blob/master/subjects/displayfile/README.md) | 6 | files_cli | Print a file path argument contents; verify read failure handling from original examples. |
| go | [divmod](https://github.com/01-edu/public/blob/master/subjects/divmod/README.md) | 7 | pointers, functions | Store quotient and remainder through output pointers. |
| go | [fibonacci](https://github.com/01-edu/public/blob/master/subjects/fibonacci/README.md) | 3 | recursion, functions | Compute Fibonacci recursively with forbidden loops; negative index returns minus one. |
| go | [listclear](https://github.com/01-edu/public/blob/master/subjects/listclear/README.md) | 7 | linked_lists, pointers | Clear linked-list head via pointer and handle empty list. |
| go | [listlast](https://github.com/01-edu/public/blob/master/subjects/listlast/README.md) | 7 | linked_lists, pointers | Return data from final linked-list element, including empty-list behavior. |
| go | [listpushback](https://github.com/01-edu/public/blob/master/subjects/listpushback/README.md) | 7 | linked_lists, pointers | Append new NodeL to linked list and maintain tail. |
| go | [listpushfront](https://github.com/01-edu/public/blob/master/subjects/listpushfront/README.md) | 7 | linked_lists, pointers | Prepend new NodeL and maintain head and tail. |
| go | [listsize](https://github.com/01-edu/public/blob/master/subjects/listsize/README.md) | 7 | linked_lists, pointers | Count linked-list nodes without modifying them. |
| go | [listsort](https://github.com/01-edu/public/blob/master/subjects/listsort/README.md) | 7 | linked_lists, pointers, sorting | Sort linked-list nodes; defines NodeI for subsequent exercises. |
| go | [makerange](https://github.com/01-edu/public/blob/master/subjects/makerange/README.md) | 5 | slices, control_flow | Build half-open integer range using make rather than append; nil for invalid interval. |
| go | [map](https://github.com/01-edu/public/blob/master/subjects/map/README.md) | 6 | callbacks, slices | Map integer slice through predicate function to boolean slice. |
| go | [max](https://github.com/01-edu/public/blob/master/subjects/max/README.md) | 5 | slices, control_flow | Find maximum in integer slice; return zero on empty. |
| go | [pilot](https://github.com/01-edu/public/blob/master/subjects/pilot/README.md) | 2 | functions, variables | Complete supplied Go main source by adding code, without deleting existing code. |
| go | [point](https://github.com/01-edu/public/blob/master/subjects/point/README.md) | 7 | pointers, functions | Complete provided pointer/struct-based setPoint program using int. |
| go | [printcomb](https://github.com/01-edu/public/blob/master/subjects/printcomb/README.md) | 3 | control_flow, sorting | Print ordered unique three-digit combinations without repeated digits. |
| go | [printcomb2](https://github.com/01-edu/public/blob/master/subjects/printcomb2/README.md) | 3 | control_flow, sorting | Enumerate sorted pairs of different two-digit numbers with exact separators. |
| go | [printcombn](https://github.com/01-edu/public/blob/master/subjects/printcombn/README.md) | 3 | control_flow, recursion | Generate strictly increasing n-digit combinations efficiently; recursion suggested but not explicitly mandated. |
| go | [printdigits](https://github.com/01-edu/public/blob/master/subjects/printdigits/README.md) | 2 | control_flow, runes_strings | Print 0 through 9 in ascending order with a trailing newline. |
| go | [printnbr](https://github.com/01-edu/public/blob/master/subjects/printnbr/README.md) | 3 | control_flow, parsing | Print all signed int values including min-int without int64 conversion. |
| go | [printwordstables](https://github.com/01-edu/public/blob/master/subjects/printwordstables/README.md) | 5 | slices, runes_strings | Print each string-slice member on its own line. |
| go | [recursivefactorial](https://github.com/01-edu/public/blob/master/subjects/recursivefactorial/README.md) | 3 | recursion, functions | Compute recursive factorial; reject invalid and overflow; loops forbidden. |
| go | [recursivepower](https://github.com/01-edu/public/blob/master/subjects/recursivepower/README.md) | 3 | recursion, functions | Compute recursive exponentiation; reject negative exponent; loops forbidden. |
| go | [splitwhitespaces](https://github.com/01-edu/public/blob/master/subjects/splitwhitespaces/README.md) | 5 | runes_strings, slices | Split string by whitespace into string slice. |
| go | [swap](https://github.com/01-edu/public/blob/master/subjects/swap/README.md) | 7 | pointers | Swap two integer values through pointers. |
| go | [ultimatedivmod](https://github.com/01-edu/public/blob/master/subjects/ultimatedivmod/README.md) | 7 | pointers | Divide through two int pointers and write quotient and remainder back. |
| go | [unmatch](https://github.com/01-edu/public/blob/master/subjects/unmatch/README.md) | 5 | slices, control_flow | Find lone unpaired integer or return minus one when all paired. |
| rust | [tuples_refs](https://github.com/01-edu/public/blob/master/subjects/tuples_refs/README.md) | 4 | types, borrowing | Define tuple Student struct and three borrowed field-access functions, respecting reference lifetimes. |
| rust | [commits_stats](https://github.com/01-edu/public/blob/master/subjects/commits_stats/README.md) | 8 | collections, applications | Aggregate GitHub JSON commits by author and calendar week with json crate and chrono formatting. |
| rust | [shopping_mall](https://github.com/01-edu/public/blob/master/subjects/shopping_mall/README.md) | 8 | collections, applications | Implement mall simulation reports, security staffing and salary adjustments against supplied mall module. |
| rust | [copy](https://github.com/01-edu/public/blob/master/subjects/copy/README.md) | 3 | ownership, types, collections | Demonstrate copy and owned tuples for numeric, string and vector transformations. |
| rust | [groceries](https://github.com/01-edu/public/blob/master/subjects/groceries/README.md) | 5 | collections, borrowing | Implement Vec insertion and indexed retrieval, including bounds policies grounded in example. |
| rust | [question_mark](https://github.com/01-edu/public/blob/master/subjects/question_mark/README.md) | 4 | enums_results | Traverse nested Option fields to return fourth_layer using idiomatic option propagation. |
| rust | [tic_tac_toe](https://github.com/01-edu/public/blob/master/subjects/tic_tac_toe/README.md) | 8 | applications, collections, borrowing | Check winning diagonals rows and columns over borrowed Tic Tac Toe board with tie handling. |
| rust | [unwrap_or_expect](https://github.com/01-edu/public/blob/master/subjects/unwrap_or_expect/README.md) | 4 | enums_results | Select enum-driven error policies on Result String values including specified panic and warning cases. |
| javascript | [pimp-my-style](https://github.com/01-edu/public/blob/master/subjects/pimp-my-style/README.md) | 6 | dom, events, ui_state | Cycle HTML button classes forward and backward on clicks and toggle unpimp styling. |
| javascript | [curry-entries](https://github.com/01-edu/public/blob/master/subjects/curry-entries/README.md) | 4 | closures, higher_order_functions, arrays_objects | Build curried object entry merge, filter, map and reduce operations and derive scores. |
| javascript | [keycodes-symphony](https://github.com/01-edu/public/blob/master/subjects/keycodes-symphony/README.md) | 6 | dom, events, ui_state | Create note divs from letter keydowns and handle Backspace and Escape correctly. |
| javascript | [manipulate-entries](https://github.com/01-edu/public/blob/master/subjects/manipulate-entries/README.md) | 4 | higher_order_functions, arrays_objects | Implement map filter reduce over object entry pairs and compute grocery cart values. |
| javascript | [using-filter](https://github.com/01-edu/public/blob/master/subjects/using-filter/README.md) | 4 | higher_order_functions, arrays_objects | Use native filter with vowel and object-field predicates. |
| javascript | [all](https://github.com/01-edu/public/blob/master/subjects/all/README.md) | 5 | promises, arrays_objects | Implement Promise.all semantics for object values and return keyed results. |
| javascript | [count-leap-years](https://github.com/01-edu/public/blob/master/subjects/count-leap-years/README.md) | 7 | regex_dates, control_flow | Count leap years between year one and Date using calendar arithmetic. |
| javascript | [currify](https://github.com/01-edu/public/blob/master/subjects/currify/README.md) | 4 | closures, higher_order_functions | Transform an arbitrary-arity function into unary curried calls. |
| javascript | [date-is](https://github.com/01-edu/public/blob/master/subjects/date-is/README.md) | 7 | regex_dates, control_flow | Implement Date validity, ordering and relative-time predicates with invalid-date checks. |
| javascript | [day-of-the-year](https://github.com/01-edu/public/blob/master/subjects/day-of-the-year/README.md) | 7 | regex_dates | Calculate Date day-of-year with correct leap-year and date boundaries. |
| javascript | [dog-years](https://github.com/01-edu/public/blob/master/subjects/dog-years/README.md) | 2 | values_functions, control_flow | Convert dog age in seconds to planet-dependent years with two-decimal rounding. |
| javascript | [dr-strange](https://github.com/01-edu/public/blob/master/subjects/dr-strange/README.md) | 7 | regex_dates, arrays_objects | Model a fourteen-day weekday system and modify Date via timeTravel object fields. |
| javascript | [flagger](https://github.com/01-edu/public/blob/master/subjects/flagger/README.md) | 3 | arrays_objects, values_functions | Return alias and description flags, including default help selection. |
| javascript | [for-each](https://github.com/01-edu/public/blob/master/subjects/for-each/README.md) | 4 | higher_order_functions, arrays_objects | Recreate callback iteration over array without native forEach. |
| javascript | [get-some-time](https://github.com/01-edu/public/blob/master/subjects/get-some-time/README.md) | 7 | regex_dates | Find Monday of numbered week with year-boundary clipping and dd-mm-yyyy format. |
| javascript | [gougle-search](https://github.com/01-edu/public/blob/master/subjects/gougle-search/README.md) | 5 | promises, fetch_json | Run three server queries concurrently and enforce an eighty-millisecond overall timeout. |
| javascript | [interpolation](https://github.com/01-edu/public/blob/master/subjects/interpolation/README.md) | 5 | higher_order_functions, closures | Invoke interpolation callbacks at timed intervals using step and duration arguments. |
| javascript | [ion-out](https://github.com/01-edu/public/blob/master/subjects/ion-out/README.md) | 7 | regex_dates | Use regular-expression lookaround to find words with tion and remove ion suffix. |
| javascript | [letter-space-number](https://github.com/01-edu/public/blob/master/subjects/letter-space-number/README.md) | 7 | regex_dates | Regex-match letter space single digit sequences that are not followed by letters. |
| javascript | [manipulate-keys](https://github.com/01-edu/public/blob/master/subjects/manipulate-keys/README.md) | 4 | higher_order_functions, arrays_objects | Implement filter map reduce over grocery-cart object keys. |
| javascript | [manipulate-values](https://github.com/01-edu/public/blob/master/subjects/manipulate-values/README.md) | 4 | higher_order_functions, arrays_objects | Implement filter map reduce over grocery-cart object values. |
| javascript | [mapper](https://github.com/01-edu/public/blob/master/subjects/mapper/README.md) | 4 | higher_order_functions, arrays_objects | Reimplement map and flatMap as callback-based array transformations. |
| javascript | [race](https://github.com/01-edu/public/blob/master/subjects/race/README.md) | 5 | promises, arrays_objects | Implement Promise.race and collect the first N successfully resolved values. |
| javascript | [same-amount](https://github.com/01-edu/public/blob/master/subjects/same-amount/README.md) | 7 | regex_dates | Compare total string matches produced by two regular expressions. |
| javascript | [series](https://github.com/01-edu/public/blob/master/subjects/series/README.md) | 5 | promises, higher_order_functions | Execute async functions sequentially and return ordered results. |
| javascript | [sweet-curry](https://github.com/01-edu/public/blob/master/subjects/sweet-curry/README.md) | 4 | closures, higher_order_functions | Implement unary-curried numeric functions accepting two three or four values. |

## Integrity and validation

The [Phase 18 verification script](../scripts/complete-semantic-piscine-reviews.mjs) checks that each identifier belongs to the preceding 95-item review queue, its expected README exists, and a phrase identifying the reviewed specification appears in the complete checked-out README. It records a full SHA-256 digest of each source and preserves the original archive candidate ID. The [automated test suite](../scripts/complete-semantic-piscine-reviews.test.mjs) checks that the research does not invent an official Galaxy ordering or unlock condition.

**Caution:** A source phrase is proof that the cited instructions contain supporting text, not proof of correct implementation, mastery, a private audit grade, or official course chronology. Some independently recommended concepts are pedagogical extensions rather than explicitly mandated algorithms.

## Next use

Follow the updated eight-stage Go, Rust and JavaScript study guides in the generated CI artifact. The original [24 practical stage assessments](../data/phase17-original-stage-assessments.json) can be used to evaluate competency independently of official 01Edu assessments.
