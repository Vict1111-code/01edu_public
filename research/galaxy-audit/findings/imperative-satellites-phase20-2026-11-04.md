# Phase 20 — Imperative satellite and raid-boundary research

**Date:** 2026-11-04  
**Verification:** [GitHub Actions run 41832615410](https://github.com/Vict1111-code/01edu_public/actions/runs/41832615410) — successful.

## Scope and limitation

Phase 19 identified six central Imperative projects and 17 nested extensions. This phase evaluates **six earlier sampled standalone satellite candidates**, using their public subject instructions and audit questions. **This is not an exhaustive catalog of optional Galaxy projects.** No official screen-level placement or unlock metadata has been confirmed for these six.

## Findings

| Source | Classification | Educational recommendation | Public README evidence |
| --- | --- | --- | --- |
| [math-skills](https://github.com/01-edu/public/blob/master/subjects/math-skills/README.md) | Standalone / language-choice optional candidate | Intro statistics after text/file input fundamentals | Average, median, variance and standard deviation; language choice explicitly permitted |
| [tetris-optimizer](https://github.com/01-edu/public/blob/master/subjects/tetris-optimizer/README.md) | Standalone / Go optional candidate | Advanced algorithm branch alongside or before graph optimization | Must use Go; parse tetrominoes; assemble smallest square; reject invalid shapes |
| [net-cat](https://github.com/01-edu/public/blob/master/subjects/net-cat/README.md) | Standalone / Go optional candidate | Networking and concurrency branch after Go HTTP fundamentals | TCP chat, max 10 clients, goroutines and channels/mutexes |
| [quadchecker](https://github.com/01-edu/public/blob/master/subjects/quadchecker/README.md) | Go Piscine raid candidate | Keep outside post-Piscine optional track | Source explicitly calls it a raid based on Quad functions |
| [sudoku](https://github.com/01-edu/public/blob/master/subjects/sudoku/README.md) | Go Piscine raid candidate | Keep outside post-Piscine optional track | Audit README explicitly directs to Go raid testing |
| [road_intersection](https://github.com/01-edu/public/blob/master/subjects/road_intersection/README.md) | Rust-side raid / Architecture candidate | Do not assign to Go Imperative | Source recommends Rust SDL2; audit refers to a raid; exact Galaxy track not established |

## Assessment and concepts

**math-skills:** Statistics and file parsing; compare rounded numerical outputs against repeated randomized datasets. The language-choice clause makes it unsuitable for labeling as a compulsory Go-specific exercise.

**tetris-optimizer:** Grid parsing, exact cover/search/backtracking, shape validation, pruning and optimization; its public audit checks bad inputs, square packing quality, and hard examples. It is considerably more algorithmically intensive than the basic ASCII renderer.

**net-cat:** TCP sockets, concurrent clients, goroutines, synchronization, message history, client disconnects and connection limits. Audit questions cover multiple terminals and multiple machines. It offers strong systems practice without requiring the forum's SQLite or authentication functionality.

**quadchecker:** The public subject describes a Go raid based on Quad shape output. Retain separately as a Piscine assessment candidate; exact raid position remains unknown.

**sudoku:** The source uses Go command-line invocation and the audit's raid testing notice. It is an algorithmic challenge but should not be silently counted as an Imperative optional project.

**road_intersection:** Simulates vehicles, intersection lights and safety constraints; Rust SDL2 reference and raid language support classification as a Rust-side simulation project. This does not establish its formal position in Architecture.

## Evidence types

The data separates:

- **Confirmed:** public subject README and audit README files exist; technical requirements quoted in each classified record.
- **Suggested:** teaching position and relationships to previously mapped Imperative projects.
- **Unknown:** compulsory/optional official designation, exact dashboard unlock sequence, placement of all other Galaxy optional satellites.

The three suggested edges (go-reloaded → math-skills; go-reloaded → tetris-optimizer; ascii-art-web → net-cat) are **educational recommendations only**, not a dependency claim from 01Edu.

## Reproducible materials

- [Six source-inspected project profiles](../data/phase20-imperative-satellites.json)
- [Source and classification validator](../scripts/verify-imperative-satellites.mjs)
- [Eight automated checks](../scripts/verify-imperative-satellites.test.mjs)
- [Successful GitHub Actions run](https://github.com/Vict1111-code/01edu_public/actions/runs/41832615410), which includes a generated JSON and Markdown guide in its artifact.

## Next reconstruction task

Extend the search from these six previously sampled projects to the **entire top-level 01Edu subject catalog**. Identify additional standalone projects, use the actual Galaxy screenshot when spatial assignment is important, and classify each by language policy, instructional concept, public audit requirements, and probable placement without inventing official completion gates. Next, proceed with the Full-Stack core using the same evidence standard.

No original public subject files or master branch were modified.
