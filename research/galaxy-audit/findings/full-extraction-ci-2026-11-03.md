# Galaxy full-subject extraction — first successful CI scan

**Run:** https://github.com/Vict1111-code/01edu_public/actions/runs/41645792476  
**Date:** 2026-11-03  
**Branch:** `research/galaxy-curriculum-audit`  
**Status:** Success; extractor tests, full extraction, JSON/CSV artifact upload all completed successfully.

## Observed counts

| Metric | Count |
| --- | ---: |
| README-bearing subjects scanned | 1,233 |
| Links to other indexed subject nodes | 75 |
| External links | 2,448 |
| Unresolved local links | 157 |

## Automated link classifications (UNREVIEWED)

| Class | Count |
| --- | ---: |
| `extension_of_parent` | 22 |
| `learning_resource` | 37 |
| `link_reference` | 11 |
| `prior_project_reference` | 2 |
| `parent_reference` | 3 |
| **Total** | **75** |

These values were read from the successful [GitHub Actions job log](https://github.com/Vict1111-code/01edu_public/actions/runs/41645792476). The artifact named **`galaxy-subject-link-audit`** contains `subject-link-extraction.json`, `subject-link-edges.csv`, `subject-node-summary.csv`, and `summary.txt` and was configured for **14 days retention**.

## Important limits

1. The graph is **candidate link extraction**, not the official Galaxy unlock graph. No edge should yet be presented as an enforceable prerequisite.
2. The inline Markdown parser excludes plain-text mentions, nested-parentheses URLs, HTML `<a>` tags and reference-style definitions. Accordingly, **75 is a lower bound for what this parser recognized**, not an estimate of all true subject relationships.
3. A substantial portion of recognized references are resources and standards links (37), which should not become required learning edges.
4. The 157 unresolved local links include possible assets and file paths; they are not necessarily broken project links.
5. The next milestone is to inspect the artifact and compare its 75 candidates with manually documented explicit dependencies (such as `road_intersection` → `smart-road`, which the parser may classify only as a general link), then improve coverage.

The CI workflow is available in [`.github/workflows/galaxy-curriculum-audit.yml`](https://github.com/Vict1111-code/01edu_public/blob/research/galaxy-curriculum-audit/.github/workflows/galaxy-curriculum-audit.yml). The original `master` branch remains unchanged.
