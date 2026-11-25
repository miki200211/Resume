<!-- trail:start -->
## Trail — Repo Context Graph & Learnings Guidelines

This repository uses **Trail-Code** (https://github.com/trailhq/Trail-Code.git) for deterministic code mapping and persistent team memory.

### 1. Code Navigation & Exploration Rules
Before grepping blindly or reading whole source files, query Trail's context layer:
- **Locate & Understand**: Run `trail ask "<question>" --source` to get ranked nodes with inlined ≤8-line code cruxes and exact `file:line` spans.
- **Exhaustive Search**: Run `trail grep "<literal>"` to find all call sites or symbol references, grouped by enclosing definition.
- **Skim API / Signatures**: Run `trail skeleton <file>` (~200 tokens) before modifying or wiring into a file.
- **Call Hierarchy & Blast Radius**: Run `trail callers <symbol> --depth 2` before renaming, deleting, or altering signatures; use `--depth all` before refactoring.
- **Repository Architecture**: Run `trail map` when exploring unfamiliar areas.
- **Index Refresh**: Run `trail build` after significant multi-file edits.

### 2. Learnings & Memory Rules (`.trail/learnings/`)
- **Review Prior Decisions First**: Before exploring code or planning a fix, check past learnings shown by `trail ask` or listed under `.trail/learnings/` to avoid repeating tried-and-ruled-out solutions.
- **Save New Learnings**: When discovering non-obvious fixes, architectural choices, or dropped approaches, save a learning before completing the task:
  ```bash
  trail note --title "<plain decision description>"
  ```
- **Never Edit Past Learnings**: Treat existing learnings in `.trail/learnings/` as historical records. If an established pattern must change, record a new learning with `--replaces <file>` and explain why in the commit message.

### 3. Pre-Review / Pre-Commit Quality Gate
- Before committing, pushing, or submitting PRs, run:
  ```bash
  trail check
  ```
  to verify that changes do not violate established repository learnings.

> **Windows Terminal Note**: If PowerShell blocks script execution, invoke commands via `cmd.exe /c "trail <command>"` or ensure `trail.cmd` is on PATH.
<!-- trail:end -->
