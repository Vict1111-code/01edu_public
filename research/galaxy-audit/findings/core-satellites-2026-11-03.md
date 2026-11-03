# Core satellite and extension audit — 2026-11-03

**Scope:** satellite projects and nested extensions around the 17 verified central Galaxy nodes.  
**Source:** `Vict1111-code/01edu_public`, `master`, `subjects/` tree SHA `b78ec066b3c1123fc72c65d983aa5190c3f29d79`.

## Repository-wide cross-check of the 17 core roots

All nested `README.md` paths under the 17 core roots were indexed. This yielded **26 nested README-bearing directories** under nine of those roots, including **24 extension candidates with matching audit README files** and **two `examples/` directories** (`ascii-art/examples`, `lem-in/examples`) which are not confirmed as standalone assignments.

A nested README does not prove official sequence or an assignment. See [core-satellites-index.json](../data/core-satellites-index.json) for every path and source SHA.

## Six additional standalone projects inspected

| Subject | Main task | Domain (analyst classification) | Audit README |
| --- | --- | --- | --- |
| `net-cat` | TCP client/server chat modeled on NetCat | Networking / architecture | Present |
| `math-skills` | Mean, median, variance and standard deviation from file data | Algorithms / statistics | Present |
| `tetris-optimizer` | Pack tetrominoes into a minimal square | Search / combinatorial optimization | Present |
| `quadchecker` | Detect which `quad` function generated a rectangle | Go Piscine raid / pattern recognition | Present |
| `road_intersection` | Traffic intersection simulation | Rust Piscine raid / graphics | Present |
| `sudoku` | Solve a Sudoku with one valid solution | Go Piscine raid / backtracking | Present |

The six audit README files were opened and inspected for section structure; **their presence does not establish fully automated tests**. `quadchecker` is explicitly based on `quad` functions. `road_intersection` is explicitly identified as a Rust Piscine raid in the later `smart-road` README.

## Sample extensions with confirmed parent wording

| Parent | Extension | Explicit source wording / purpose |
| --- | --- | --- |
| `ascii-art` | `ascii-art/reverse` | Follow first subject instructions; decode ASCII art back into text |
| `ascii-art` | `ascii-art/color` | Follow first subject instructions; add substring coloring |
| `groupie-tracker` | `groupie-tracker/filters` | Follow parent principles; filter artists by dates, members and locations |
| `groupie-tracker` | `groupie-tracker/geolocalization` | Follow parent principles; geocode concert locations |
| `forum` | `forum/image-upload` | Follow parent principles; attach images to posts |
| `make-your-game` | `make-your-game/history` | Follow parent principles; add a story mode |

These six have README wording directly supporting an `extension_of` relationship. The other nested candidates have **not** yet been semantically reviewed.

## Important methodological distinctions

1. **Source paths and blobs** are verified; **official Galaxy orbit placement** of these satellite projects is not yet verified.
2. **Candidate extension** is a structural tag. **Confirmed extension** requires README content stating it builds on a named earlier subject.
3. **Audit README** means review instructions are present; it does not mean the project has executable grading.
4. The `road_intersection` → `smart-road` link bridges the Rust Piscine to a later Architecture project; this is a cross-phase reference, not necessarily a hard unlock.
5. The `quad` → `quadchecker` relationship links an early Go exercise set to a raid.
6. This pass inspects only a subset of the 1,233 subject READMEs. Broad automated dependency extraction remains outstanding.

## Next implementation milestone

Create a **reproducible semantic extraction pipeline** over all subject README files, capturing headings, relative links, cross-subject references, audit question types, project artifacts, and uncertainty labels. Then integrate these verified satellite relationships into a versioned graph without inventing official unlock ordering.
