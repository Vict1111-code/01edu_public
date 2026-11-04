# Phase 25 — First 34 source-semantic reviews of previously unclassified Galaxy subjects

**Date:** 2026-11-04  
**Branch:** `research/galaxy-curriculum-audit`  
**Public source tree SHA:** `b78ec066b3c1123fc72c65d983aa5190c3f29d79`  
**Validation:** [GitHub Actions run 41845183476](https://github.com/Vict1111-code/01edu_public/actions/runs/41845183476)

## Scope and method

We read **34 complete top-level subject READMEs** from the 446 records left for manual semantic inspection after Phase 24. Unlike keyword triage, the classifications below reflect the actual requested deliverable, expected code interface and assignment context. Each source is tied to a pinned Git blob SHA and a source phrase. The [validator](../scripts/verify-phase25-semantic-reviews.mjs) reopens every README, matches the exact evidence phrase, checks identity and ensures no official unlock or Piscine membership is invented.

The 34 reviewed records include **32 from the original 317-item priority review queue**, reducing that queue to **285**. The broader previously unreviewed group decreases from **446** to **412**. These counts describe research review status, not previously completed learner assignments or a verified official project count.

## Outcomes

| Independently derived semantic content type | Count |
| --- | ---: |
| Small programming exercises | 13 |
| Multi-step programming exercises | 17 |
| Short incomplete stubs | 2 |
| Exam policy or evaluation reference | 1 |
| Currently unavailable content placeholder | 1 |
| **Total** | **34** |

The above are educational *content* types; `multi_step_exercise` does not mean a compulsory Galaxy project and `small_exercise` does not prove official Piscine assignment. We have not run an evaluator.

## Individually inspected source records

| Subject README | Semantic category | Source language | Concrete README requirement |
| --- | --- | --- | --- |
| [a-new-purpose](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/a-new-purpose/README.md) | Small exercise | javascript | Implement add2 and sub2. |
| [a-string-of-number](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/a-string-of-number/README.md) | Small exercise | javascript | Declare seven and seventySeven as string values. |
| [a-winning-argument](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/a-winning-argument/README.md) | Small exercise | javascript | Implement battleCry uppercase and secretOrders lowercase console functions. |
| [about-time](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/about-time/README.md) | Multi-step exercise | javascript | Format a capped ranked list of times and names. |
| [action-reaction](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/action-reaction/README.md) | Multi-step exercise | javascript | Handle clicks to toggle eye appearance and button text. |
| [baby-shower](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/baby-shower/README.md) | Multi-step exercise | javascript | Import confetti library and trigger on load and keydown. |
| [brain_fuck](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/brain_fuck/README.md) | Multi-step exercise | rust | Build a Rust Brainfuck interpreter. |
| [brainfuck](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/brainfuck/README.md) | Multi-step exercise | go | Build a Go Brainfuck interpreter. |
| [bring-it-to-life-dom](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/bring-it-to-life-dom/README.md) | Multi-step exercise | javascript | Select eye-left and change style and class. |
| [broken-promise](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/broken-promise/README.md) | Small exercise | javascript | Double resolved values and format rejected Promise errors. |
| [firebase-demo](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/firebase-demo/README.md) | Incomplete stub | not established | Heading only; no usable assignment requirements. |
| [car_rental](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/car_rental/README.md) | Multi-step exercise | rust | Implement Car/RentalBusiness using RefCell. |
| [cultural-shift](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/cultural-shift/README.md) | Small exercise | javascript | Use push and unshift to insert artists. |
| [disclaimer](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/disclaimer/README.md) | Evaluation reference | go | Exam evaluation guidance; not a standalone assignment. |
| [drop_the_blog](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/drop_the_blog/README.md) | Multi-step exercise | rust | Create Blog/Article with Drop bookkeeping. |
| [drop_the_thread](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/drop_the_thread/README.md) | Multi-step exercise | rust | Implement ThreadPool/Thread drop tracking. |
| [teacher](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/teacher/README.md) | Multi-step exercise | shell | Extract interview ID and print required values using shell. |
| [veterinary](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/veterinary/README.md) | Small exercise | javascript | Implement canTreat and respondClient methods. |
| [virus19](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/virus19/README.md) | Small exercise | javascript | Freeze object and make safe antivirus copy. |
| [your-own](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/your-own/README.md) | Incomplete stub | not established | Only notes about reduce, filter, map; no actionable implementation brief. |
| [何](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/何/README.md) | Small exercise | javascript | Create self-unequal value; linked JavaScript Number reference. |
| [what-is-my-purpose](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/what-is-my-purpose/README.md) | Small exercise | javascript | Define and call ask and reply in order. |
| [cl-camp1](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/cl-camp1/README.md) | Small exercise | shell | Write directory listing and formatting shell command. |
| [first-words-dom](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/first-words-dom/README.md) | Multi-step exercise | javascript | Append styled Hello there div on click. |
| [the-great-escape](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/the-great-escape/README.md) | Small exercise | javascript | Declare strings with quote delimiters and backslashes. |
| [vehicles](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/vehicles/README.md) | Multi-step exercise | rust | Implement Car/Truck Vehicle trait and list models. |
| [class-that-dom](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/class-that-dom/README.md) | Multi-step exercise | html_css | Style eye/arm/leg HTML elements with CSS classes. |
| [arraysum](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/arraysum/README.md) | Small exercise | go | Implement SumArray with empty-array zero result. |
| [check_user_name](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/check_user_name/README.md) | Multi-step exercise | rust | Implement enum and User using Option access levels. |
| [count_factorial_steps](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/count_factorial_steps/README.md) | Small exercise | rust | Return factorial step count or zero for non-factorials. |
| [easy_traits](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/easy_traits/README.md) | Multi-step exercise | rust | Add append and punctuation-removal methods to String. |
| [vector_operations](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/vector_operations/README.md) | Multi-step exercise | rust | Implement Add and Sub for three-dimensional vectors. |
| [where-do-we-go-dom](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/where-do-we-go-dom/README.md) | Multi-step exercise | javascript | Create scrolling location page with images, links and compass. |
| [unavailable](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/unavailable/README.md) | Unavailable placeholder | not established | Only restricted-content placeholder; task specification unavailable. |

## High-value corrections and special cases

### The similarly named Brainfuck assignments are not the same submission

- [`brain_fuck`](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/brain_fuck/README.md) is a Rust command-line interpreter exercise. Its README explicitly refers to `std::env::args()` and `cargo run`.
- [`brainfuck`](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/brainfuck/README.md) is the Go variant with `go run .` usage.

Both implement a Brainfuck-style interpreter, but their implementations and supplied constraints differ; combining them in one canonical assignment would lose real instructional distinctions.

### Name-derived language assumptions are unsafe

- [`class-that-dom`](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/class-that-dom/README.md) requires assigning HTML classes and defining CSS rules. It does not require the JS DOM event-handling expected from a filename ending in `-dom`.
- [`where-do-we-go-dom`](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/where-do-we-go-dom/README.md) specifies a more complex JavaScript page with scroll-aware location state, compass, images, sorting and Google Maps links. This is more substantial than a single utility function, but the README does **not** establish official major-project status.
- [`teacher`](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/teacher/README.md) requires a `teacher.sh` script, not a teacher-management application.

### Non-assignment source folders must not be mislabeled as deliverable projects

- [`disclaimer`](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/disclaimer/README.md) describes exam `main` and restrictions-checker rules, not a standalone programming challenge.
- [`firebase-demo`](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/firebase-demo/README.md) contains only a heading.
- [`your-own`](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/your-own/README.md) contains a terse three-line concept outline, without an implementable specification.
- [`unavailable`](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/unavailable/README.md) states that the subject is unavailable. Its intended assignment cannot be reconstructed from that README.

### Source inconsistency preserved

[`drop_the_thread`](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/subjects/drop_the_thread/README.md) mentions invoking an `add_drop` method in its description while its API specifies `drop_thread`. We preserve the contradiction for future review rather than silently rewriting the original brief.

## Deliverables and remaining work

- [Permanent 34-subject evidence dataset](../data/phase25-first-manual-semantic-reviews.json) — pinned SHA, actual README quote, competency tags, instructional summary, source-specific warnings, and unknown official fields.
- [Source-attestation verifier](../scripts/verify-phase25-semantic-reviews.mjs).
- [Six regression tests](../scripts/verify-phase25-semantic-reviews.test.mjs).
- [Generated Phase 25 source verification and priority-queue reconciliation](https://github.com/Vict1111-code/01edu_public/actions/runs/41845183476) in CI artifact.

**Next:** manually adjudicate the **285 remaining priority cases**, then cover the other 127 previously unreviewed READMEs. We should also cross-reference existing public tests, code-lab assets, and prior lesson references where they can resolve uncertain educational relationships.

This independent curriculum research does **not** assert 01Edu's current official platform unlocks, grading, assessment passage conditions, or mandatory project chronology.
