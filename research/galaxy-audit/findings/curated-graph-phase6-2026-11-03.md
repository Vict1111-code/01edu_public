# Curated Galaxy graph — Phase 6 (2026-11-03)

**Execution:** [Successful GitHub Actions run](https://github.com/Vict1111-code/01edu_public/actions/runs/41648273764)  
**Source:** `subjects/` snapshot `b78ec066b3c1123fc72c65d983aa5190c3f29d79`, public README links and manual review of eight ambiguous pairs.

## Results

- **1,233** README-bearing subject entries examined by the inline-link extractor.
- **75** internal link instances representing **73** unique linked pairs.
- **40 connected subject nodes** in a conservative learning-lineage graph.
- **33 typed learning-lineage edges** retained.
- **40 non-progression references** retained separately (coding standards, learning resources, optional project resources, supporting files).

### Curated relations

| Relation | Count |
| --- | ---: |
| Extends existing project | 22 |
| References earlier project | 2 |
| Uses earlier code/data output | 1 |
| Requires prior Rust data structure | 3 |
| Requires previously implemented framework | 1 |
| Builds on prior mobile application | 1 |
| References earlier project principles | 1 |
| References a prior Rust Piscine raid | 1 |
| Parent-project context | 1 |
| **Total** | **33** |

The graph confirms meaningful cross-path relationships, for example:

```text
Rust Piscine: road_intersection --> smart-road
Rust exercises: lalgebra_scalar --> matrix --> matrix_ops
                                    \------------> matrix_ops
Frontend: mini-framework --> bomberman-dom
          make-your-game --> bomberman-dom [principles]
Mobile: secure-notes --> package
Go: ascii-art --> ascii-art-web --> ascii-art-web/dockerize
    forum --> real-time-forum
```

**Important:** A project reference or use of prior code does not establish an official Academy unlock rule or a specific chronological release in the private Galaxy.

## Reproducible artifacts

- [Compact durable graph snapshot](../data/curated-graph-snapshot.json): all 40 connected IDs and 33 edges with typed relations and clickable source specifications.
- [Graph-generation script](../scripts/build-curated-graph.mjs): rebuilds full source-context graph JSON and edge CSV from raw triage output.
- [Generator tests](../scripts/build-curated-graph.test.mjs): five unit tests; passed in GitHub Actions.
- [GitHub Actions run artifacts](https://github.com/Vict1111-code/01edu_public/actions/runs/41648273764): includes `curated-galaxy-graph.json` with full link evidence, `curated-galaxy-edges.csv`, and the original extraction/triage files; configured retention 14 days.

The compact snapshot is **persisted on the research branch**; the larger original evidence-bearing artifact is available until its retention period expires and is reproducible from the scripts.

## Audit limitations

1. This is a **partial graph of observed public references**, not an exhaustive graph of the full Galaxy.
2. The 1,233-node universe was scanned, but most subject instructions have no parser-detected links to other assignments. An isolated subject node is not evidence that it lacks prerequisites.
3. The parser omits many plain-text mentions, HTML links, nested Markdown syntax, and some externally hosted references.
4. A high-confidence `extends` edge represents a reference to its parent assignment. Not every edge has been manually reviewed for exact optional/mandatory language.
5. External service requirements, exercises, raids, and specialization schedules have not been fully mapped.
6. The graph does not yet include the visual geometry, any grading score, requirement unlocks, or a complete Go/Rust/JS Piscine quest sequence.

## Next phase: bridge public exercise specifications into curriculum stages

- Audit the first selection Piscine Go and core Go, Rust, JS exercise groups and raid distinctions.
- Improve extraction of plain-text and official subject URLs, with false-positive tests.
- Add a separate `track_membership` data model to represent Imperative, Architecture, Full-Stack and Graphics independently from dependency edges.
- Begin UI exploration only after core track mapping has meaningful validation.

**Safety:** All changes are confined to the `research/galaxy-curriculum-audit` branch; both `master` branches remain untouched.
