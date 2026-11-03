# Phase 8 — Manual Piscine and raid membership review

**Date:** 2026-11-03  
**Input:** [Phase 7 full README scan](https://github.com/Vict1111-code/01edu_public/actions/runs/41649375925)  
**Detailed classifications:** [piscine-manual-membership-review.json](../data/piscine-manual-membership-review.json)

## Verified membership anchors

- **Rust:** [hello_rust](https://github.com/Vict1111-code/01edu_public/blob/master/subjects/hello_rust/README.md) introduces the Rust Piscine and says the first exercise configures the repository and sets rules for the Piscine. It is a **confirmed entry-point subject**, but the source does **not** supply an official Galaxy quest number.
- **JavaScript:** [how-2-js](https://github.com/Vict1111-code/01edu_public/blob/master/subjects/how-2-js/README.md) says “Welcome to the JS piscine” and instructs creation of the solutions repository. It is a **confirmed entry-point subject**, but its official quest number is not established.
- **Rust raid:** [smart-road](https://github.com/Vict1111-code/01edu_public/blob/master/subjects/smart-road/README.md) describes [road_intersection](https://github.com/Vict1111-code/01edu_public/blob/master/subjects/road_intersection/README.md) as a raid completed in the Rust Piscine. This corroborates **road_intersection** as a Rust Piscine raid, but does not establish its exact scheduling or quest placement.
- **Go-associated raid:** [quadchecker](https://github.com/Vict1111-code/01edu_public/blob/master/subjects/quadchecker/README.md) explicitly calls itself a raid based on quad functions and demonstrates `go run .`. Its exact Piscine track/sequence is not proven by this README alone.

## False positives and out-of-scope raid matches

- [boxing_todo](https://github.com/Vict1111-code/01edu_public/blob/master/subjects/boxing_todo/README.md): “PISCINE RUST” occurs in **sample JSON data**; this does not prove membership.
- [linear-stats](https://github.com/Vict1111-code/01edu_public/blob/master/subjects/linear-stats/README.md): “first exercise” refers to a prior statistics exercise, not the first Piscine task.
- [carbon-copy](https://github.com/Vict1111-code/01edu_public/blob/master/subjects/carbon-copy/README.md) and [clonernews](https://github.com/Vict1111-code/01edu_public/blob/master/subjects/clonernews/README.md): are explicitly called raids, but the matching wording alone does not identify a Go/Rust/JS Piscine track.
- [blockchain/exploring-blockchains](https://github.com/Vict1111-code/01edu_public/blob/master/subjects/blockchain/exploring-blockchains/README.md), [blockchain/sign-service](https://github.com/Vict1111-code/01edu_public/blob/master/subjects/blockchain/sign-service/README.md), [java/raids/jraffic](https://github.com/Vict1111-code/01edu_public/blob/master/subjects/java/raids/jraffic/README.md), and [AI.GO/robots-harmony](https://github.com/Vict1111-code/01edu_public/blob/master/subjects/AI.GO/robots-harmony/README.md) use raid terminology in **other tracks**.
- [smart-road](https://github.com/Vict1111-code/01edu_public/blob/master/subjects/smart-road/README.md): a **retrospective** Rust Piscine reference, not evidence of the current project's Piscine membership.

## Methodological findings

The Phase 7 scanner found **319 Go, 149 Rust, 196 JS, and 569 ambiguous** dominant-language subject READMEs. These counts are not the number of Piscine assignments. Explicit Piscine mentions occur rarely, and can be embedded in example data or refer to earlier work. The word *raid* spans many tracks.

A robust curriculum graph needs **two independent dimensions**: language evidence and track membership. Suggested track membership statuses are `confirmed_entry`, `confirmed_raid`, `candidate`, `cross_track_reference`, `other_track`, and `unknown`. Keep all official quest numbers `null` until directly supported.

## Next work

1. Find more verified membership evidence from original public Piscine index files, docs, and archived exercise lists.
2. Build `track-membership-index.json` with exact evidence and non-inferred statuses.
3. Audit JavaScript learning sequences separately from Rust and Go.
4. Add interactive visualization once enough track-specific ordering evidence exists.

**Repository safety:** research branch only; `master` unchanged.
