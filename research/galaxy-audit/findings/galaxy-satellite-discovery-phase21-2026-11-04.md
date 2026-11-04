# Phase 21 — Expand Galaxy satellite discovery from the complete top-level subject index

**Date:** 2026-11-04  
**Branch:** `research/galaxy-curriculum-audit`  
**Validation:** [GitHub Actions run 41834828902](https://github.com/Vict1111-code/01edu_public/actions/runs/41834828902) — successful.

## Coverage and scope

The public repository's indexed subject tree contains **792 top-level subjects**, of which **56 have a directly indexed `audit/README.md`**. Previous phases had reviewed 17 screenshot-matched core projects and six standalone satellite candidates. This phase manually inspected and classified **all remaining 33 audited top-level subjects** and verified their README and public audit paths in CI.

**Not an exhaustive Galaxy option catalog:** the other **736 top-level subjects have no directly indexed audit README** in the existing snapshot. These are preserved in a machine-readable backlog but have **not** been semantically classified or declared optional. A missing audit file does not mean a subject is invalid, has no tests elsewhere, or is excluded from Galaxy.

## The 33 newly categorized subjects

| Subject | Research classification | Language policy/context | Recommended learning branch | Instructional focus |
| --- | --- | --- | --- | --- |
| [add-vm](https://github.com/01-edu/public/blob/master/subjects/add-vm/README.md) | systems foundation | platform setup | linux-systems | Import preconfigured VM in VirtualBox or UTM; setup task rather than coding project. |
| [atm-management-system](https://github.com/01-edu/public/blob/master/subjects/atm-management-system/README.md) | cross language project | c required | language-bridges | Extend supplied C ATM application: accounts, transactions, and existing code. |
| [bomberman-dom](https://github.com/01-edu/public/blob/master/subjects/bomberman-dom/README.md) | cross track project | javascript framework required | full stack advanced | Multiplayer DOM Bomberman explicitly reuses mini-framework and make-your-game concepts. |
| [carbon-copy](https://github.com/01-edu/public/blob/master/subjects/carbon-copy/README.md) | piscine raid | html css javascript | javascript raid | Recreate web-page template in HTML, CSS and JavaScript phases; explicitly called a raid. |
| [chaikin](https://github.com/01-edu/public/blob/master/subjects/chaikin/README.md) | graphics project | javascript browser | graphics optional | Canvas drawing and repeated seven-step Chaikin curve animation. |
| [clonernews](https://github.com/01-edu/public/blob/master/subjects/clonernews/README.md) | piscine raid | javascript browser | javascript raid | Build Hacker News API UI with incremental loading and interactions. |
| [connect](https://github.com/01-edu/public/blob/master/subjects/connect/README.md) | systems foundation | platform setup | linux-systems | Virtual-machine network and DHCP configuration challenge. |
| [corewar](https://github.com/01-edu/public/blob/master/subjects/corewar/README.md) | advanced systems game | compiled language choice | systems games | Implement assembler and virtual machine for memory battle game. |
| [crossword](https://github.com/01-edu/public/blob/master/subjects/crossword/README.md) | javascript algorithm | javascript required | javascript algorithms | Solve crossword puzzle with unique-solution validation in JavaScript. |
| [drawing](https://github.com/01-edu/public/blob/master/subjects/drawing/README.md) | rust graphics project | rust required | rust graphics | Rust traits and structured 2D geometry drawing. |
| [ephemeris](https://github.com/01-edu/public/blob/master/subjects/ephemeris/README.md) | browser automation raid | javascript browser | javascript tooling | Automate personalized browser searches and summarize results in console. |
| [free-project](https://github.com/01-edu/public/blob/master/subjects/free-project/README.md) | post raid javascript | html css javascript | javascript raid extension | Create custom webpage from HTML CSS JS; can extend previous raid. |
| [git](https://github.com/01-edu/public/blob/master/subjects/git/README.md) | cross track foundation | git commands | common foundation | Multi-stage practical Git collaboration and repository-workflow assignment. |
| [guess-it-1](https://github.com/01-edu/public/blob/master/subjects/guess-it-1/README.md) | statistics extension | go js rust python choice | statistics path | Predict next value range by applying earlier math-skills concepts. |
| [guess-it-2](https://github.com/01-edu/public/blob/master/subjects/guess-it-2/README.md) | statistics extension | go js rust python choice | statistics path | Predict next range using previous linear statistics calculations. |
| [linear-stats](https://github.com/01-edu/public/blob/master/subjects/linear-stats/README.md) | statistics extension | learner choice | statistics path | Read numeric series, compute regression line and Pearson coefficient. |
| [linux](https://github.com/01-edu/public/blob/master/subjects/linux/README.md) | systems foundation | linux admin | linux-systems | Intro to Linux and server systems with virtualization. |
| [login](https://github.com/01-edu/public/blob/master/subjects/login/README.md) | systems foundation | linux admin | linux-systems | Linux console user login and network IDs practice. |
| [mister-quiz](https://github.com/01-edu/public/blob/master/subjects/mister-quiz/README.md) | cross language project | php laravel required | web framework bridges | Complete PHP Laravel quiz app including user authentication and XP. |
| [my-ls-1](https://github.com/01-edu/public/blob/master/subjects/my-ls-1/README.md) | go systems project | go required | go systems | Implement ls flags in Go; this variant explicitly prohibits os/exec. |
| [my-ls](https://github.com/01-edu/public/blob/master/subjects/my-ls/README.md) | go systems project | go required | go systems | Implement Go ls recursive listing and Unix permission formatting. |
| [netfix](https://github.com/01-edu/public/blob/master/subjects/netfix/README.md) | cross language project | python django required | web framework bridges | Complete Python Django marketplace with company and customer flows. |
| [push-swap](https://github.com/01-edu/public/blob/master/subjects/push-swap/README.md) | go algorithm project | go required | algorithms optional | Optimize constrained two-stack sorting instruction sequence and checker in Go. |
| [quad](https://github.com/01-edu/public/blob/master/subjects/quad/README.md) | piscine raid | go required | go piscine raid | Defines QuadA-E Go rectangle-output functions; related to quadchecker raid. |
| [remote](https://github.com/01-edu/public/blob/master/subjects/remote/README.md) | systems foundation | linux admin | linux-systems | Use virtual machine port forwarding and SSH configuration. |
| [scan](https://github.com/01-edu/public/blob/master/subjects/scan/README.md) | systems security foundation | linux network tools | linux-security | Explore network discovery using IP ARP and TCP in a controlled VM environment. |
| [shop](https://github.com/01-edu/public/blob/master/subjects/shop/README.md) | cross language project | ruby rails required | web framework bridges | Finish Ruby on Rails e-commerce signup and listing workflows. |
| [sortable](https://github.com/01-edu/public/blob/master/subjects/sortable/README.md) | javascript web exercise | javascript browser | javascript full stack | Vanilla JS fetch-driven sortable searchable paginated table. |
| [stock-exchange-sim](https://github.com/01-edu/public/blob/master/subjects/stock-exchange-sim/README.md) | advanced algorithms project | compiled language choice | scheduling optimization | Model resource-dependent process chains, optimize cycle scheduling, build checker. |
| [system-monitor](https://github.com/01-edu/public/blob/master/subjects/system-monitor/README.md) | cross language project | cpp required | systems gui | Complete C++ system-monitor dashboard using Dear ImGui. |
| [tron](https://github.com/01-edu/public/blob/master/subjects/tron/README.md) | game ai project | javascript game ai | game development | Write AI for provided JavaScript Tron grid engine with time constraints. |
| [wget](https://github.com/01-edu/public/blob/master/subjects/wget/README.md) | advanced network project | compiled language choice | networking optional | Rebuild wget features including rate limit, async queues and website mirroring. |
| [zappy](https://github.com/01-edu/public/blob/master/subjects/zappy/README.md) | advanced systems game | mixed server client languages | systems games | Multiplayer AI survival simulation with server clients and GUI. |

## Source-backed relationships and distinctions

- **`math-skills → guess-it-1`:** `guess-it-1` explicitly tells the learner to use the earlier `math-skills` work for predicting numerical ranges. This relationship is instructional, not a verified unlock condition.
- **`linear-stats → guess-it-2`:** `guess-it-2` refers to the previous linear-statistics work; implement regression/correlation before the harder prediction task.
- **`mini-framework → bomberman-dom`:** `bomberman-dom` explicitly requires reusing the previously created framework, while also referring to ideas from `make-your-game`.
- **`quad → quadchecker`:** prior Quad functions form the basis of the `quadchecker` raid. These belong to the Go Piscine evidence set, rather than being silently treated as Imperative satellite projects.
- **`carbon-copy → free-project`:** `free-project` mentions continuing the 'previous raid', but does not name `carbon-copy`; this is only a plausible association and is marked **inferred** in the graph.
- **`my-ls` and `my-ls-1`:** separate public subjects. The latter explicitly prohibits `os/exec`; do not deduplicate them blindly.

## Cross-language opportunities

These projects give substance to the user's proposed optional-language pathways after the core. Their public instructions can support language exploration: C (`atm-management-system`), C++ (`system-monitor`), Python/Django (`netfix`), PHP/Laravel (`mister-quiz`), and Ruby/Rails (`shop`). Others allow compiled-language choice (`corewar`, `stock-exchange-sim`, `wget`).

That does **not** establish a mandatory programming-language-switch sequence, official Galaxy timeline, or compulsory project status. These are recommended learning branches.

## Classification confidence

- **Verified:** source README paths, audit README paths, target-language claims when explicit, project requirements, and source-described relationships.
- **Inferred:** broad pedagogical grouping and preferred point of introduction; no official Galaxy account was accessed.
- **Unverified:** official course membership, exact mandatory/optional distinction, unlock conditions, assessments performed by private systems, and screenshot positions of these 33 subjects.

## Reproducible artifacts

- [33 source-reviewed subject classifications and six typed relations](../data/phase21-audited-top-level-classification.json)
- [Classification and full 792-subject ledger generator](../scripts/classify-top-level-satellites.mjs)
- [Six verification tests](../scripts/classify-top-level-satellites.test.mjs)
- [Successful CI run and generated 792-subject ledger](https://github.com/Vict1111-code/01edu_public/actions/runs/41834828902). The generated JSON includes **all 736 additional unreviewed top-level subject identifiers** and the 33 newly reviewed ones; a separate Markdown guide summarizes categories.

## What comes next

1. Extend source inspections beyond the audited subset. The 736-subject queue includes many small exercises and other materials; identify genuine larger projects before making claims about optional Galaxy satellites.
2. Review the user-supplied Galaxy screenshot and cross-check visual satellite nodes against source names, avoiding invented spatial positions.
3. Reconstruct **Full-Stack** with its five central projects and nested extensions, using the same evidence-typed dependency and audit methodology.

All work is on the research branch. `master` and the official public subjects remain unchanged.
