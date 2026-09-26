# Scoring Rule Tests — Implementation Plan

**Card:** n/a — `ROADMAP.md` §2 Phase 0, Track C ("Tennis app stabilisation")
**Branch:** `feature/scoring-rule-tests`
**Status:** ✅ Done: on `feature/scoring-rule-tests`, not merged
**Estimate:** 1d

---

## What This Is

The scoring rules in `src/lib/addPoint.js` (331 lines) decide every score shown on
tennisscore.co.za, and **nothing tests them**: `package.json` has no `test` script and
no test runner. The file repeats one block six times (sets 1/2/3 × players 1/2), so a
fix made in one copy and missed in another is easy. Two serve-tracking bugs are
already visible just from reading it (see *Known bugs*).

This task adds Vitest and a suite that describes the **rules of tennis** as the app
supports them, then checks `addPoint1` / `addPoint2` / `retirePlayer1` /
`retirePlayer2` against them. It changes **no application code**.

## Acceptance Criteria

1. [x] `npm test` runs Vitest once and exits 0
2. [x] ≥ 20 passing scoring-rule tests covering every row of the rules table below
3. [x] The two known serve bugs are pinned as `it.fails` tests (the suite stays green, and each flips to red when its bug is fixed)
4. [x] No file under `src/` changes except the new `*.test.js` files

---

## Prerequisite Understanding

### What exists already
- `addPoint.js` exports `addPoint1`, `addPoint2`, `retirePlayer1`, `retirePlayer2`
  (`:89`, `:98`, `:107`, `:220`). The helpers (`updateServe` `:3`, `set_check` `:46`,
  `supertie_check` `:56`, …) are private.
- They're **pure-ish**: they take a plain `match` object and return it. They mutate
  the argument, but they don't touch the network, the database or the DOM. That makes
  them unit-testable with no mocks.
- Match state shape (`src/models/Match.js`): `game`, `set1..3`, `tiebreak1..3` and
  `supertiebreak` are `[p1, p2]` arrays. `game` counts points (0, 1, 2, 3 = 0/15/30/40;
  4 = advantage). `serving` is `0` or `1`.
- Formats (`src/app/matches/admin/new/page.jsx:107-109`): `best-of-3`,
  `supertiebreak` (sets 1–2, then a 10-point supertiebreak), `short-deuce` (same as
  `supertiebreak`, with no-ad games).
- Point buttons are disabled once `status === 'completed'` (`ScoreInput.jsx`), so
  behaviour after the match ends isn't reachable from the UI.

### What this task produces
`vitest` devDependency, a `"test": "vitest run"` script, `src/lib/addPoint.test.js`,
`src/lib/sum.test.js`.

### Out of scope
- **Fixing the serve bugs.** Fixing them changes live scoring for TSA matches, so it gets
  its own card and its own review (see *Known bugs*).
- **`src/lib/removePoint.js`.** It isn't imported anywhere: undo works by restoring
  history snapshots (`MatchDetails.jsx:180`). It's also wrong: its set-2/3 branches and
  all of `removePoint2` *add* points. Testing dead code would just add noise, so
  deleting it is a separate change.
- Component/UI tests, API route tests, TypeScript migration, CI (all Phase 3).
- The uncommitted working tree (see *Open decisions*).

---

## Design

### The rules the suite asserts

| Area | Rule | Starting state → action → expected |
|---|---|---|
| Game | 0-15-30-40-game | `game [3,0]` → P1 → `game [0,0]`, `set1 [1,0]` |
| Game | Deuce → advantage → game | `[3,3]` → P1 → `[4,3]` → P1 → game |
| Game | Advantage lost → deuce | `[4,3]` → P2 → `[3,3]` |
| Game | Short-deuce: deciding point at deuce | `short-deuce`, `[3,3]` → P2 → game to P2 |
| Game | Full-deuce formats don't end at 4-3 | `supertiebreak`, `[3,3]` → P1 → `[4,3]` |
| Set | Won at 6-4, play moves to set 2 | `set1 [5,4]` + game → `[6,4]`; next game lands in `set2` |
| Set | 6-5 isn't a set; 7-5 is | `[5,5]` → `[6,5]` → `[7,5]`; next game in `set2` |
| Tiebreak | Starts at 6-6 | `set1 [6,6]` → P1 → `tiebreak1 [1,0]`, `game` untouched |
| Tiebreak | Won by two | `tiebreak1 [6,6]` → `[7,6]` (set still 6-6) → `[8,6]` → `set1 [7,6]` |
| Tiebreak | Set-2 tiebreak scored in `tiebreak2` | `set2 [6,6]`, `tiebreak2 [6,5]` → P2 ×3 → `set2 [6,7]`, `tiebreak1` untouched |
| Match | P1 straight sets | `set1 [6,4]`, `set2 [5,4]`, `game [3,0]` → P1 → `completed` |
| Match | P2 straight sets | mirror → `completed` |
| Match | Best-of-3 third set decides | `1-1` in sets, `set3 [5,3]` + game → `completed` |
| Supertiebreak | At one set all, points go to `supertiebreak` | `supertiebreak` fmt, sets 1-1 → P1 → `[1,0]`, `game`/`set3` untouched |
| Supertiebreak | 10-9 isn't won; 10-8 is | `[9,9]` → `[10,9]` in-progress; `[9,8]` → `[10,8]` completed |
| Retirement | Marks completed, records who, keeps sets | `retirePlayer1` → `retirement`, `retiredPlayer 0`, `game [0,0]`, sets unchanged |
| Serve | Doesn't switch within a game | 3 points → `serving` unchanged |
| Serve | Switches when a game completes | game won → `serving` flips |

Plus 2 trivial tests for `sum.js`, for **20 passing** in total.

### Known bugs, pinned with `it.fails`

| Bug | Where | Test |
|---|---|---|
| Entering a tiebreak switches serve **twice**: once for the game (`updateServe` `gameCompleted`), again for "tiebreak start" (`:10-15`). The server of game 12 wrongly serves first in the tiebreak. | `addPoint.js:3-27` | `set1 [5,6]`, `game [3,0]`, `serving 0` → P1 → expect `serving 1` |
| Serve never rotates **during** a tiebreak: the tiebreak branches (`:126-130` and its five copies) never call `updateServe`. | `addPoint.js:126` ×6 | `set1 [6,6]`, `tiebreak1 [0,0]`, `serving 1` → P1 → expect `serving 0` |

`it.fails(...)` passes while its assertion fails. So the suite is green today, the bugs
are recorded as executable facts, and the day someone fixes one, that test turns red
and tells them to change `it.fails` to `it`.

*Why not fix them now:* the fix changes live behaviour at tournaments. It deserves its
own card, a check against the ITF serve rules, and a staging run. The tests have to
exist first either way.
*Why not `it.skip`:* a skipped test can't fail. `it.fails` still runs and would catch an
accidental fix or a change in behaviour.

### How tests are built

- `newMatch(overrides)` builds a fresh object in the exact shape `MatchDetails.jsx:90-103`
  passes in. A fresh object per test matters because the functions **mutate** their input.
- `points(match, addPointN, n)` applies n points.
- Tests go through the **public exports only**. Private helpers stay private.
  *Why not export helpers:* that changes `src/` for the sake of tests, and the public
  functions are what the UI calls.

### Tooling

Vitest, with no config file. It handles the ESM `.js` files as-is, and the lib files
don't use the `@/` alias. *Why Vitest over Jest:* no Babel config needed for ESM, and
it's what the roadmap names for Phase 3. A trial run earlier this session (since
reverted) confirmed Vitest runs these files with no config.

---

## Files to Change

| File | Change |
|---|---|
| `package.json` | Add `"test": "vitest run"`; `vitest` devDependency |
| `package-lock.json` | Updated by `npm install -D vitest` |
| `src/lib/addPoint.test.js` | **New file**: rules table + 2 `it.fails` |
| `src/lib/sum.test.js` | **New file**: 2 tests |
| `docs/scoring-rule-tests-plan.md` | This file: tick criteria, set status |

## Impact on Existing Tests

None exist. `npm run lint` should still pass; test files use standard ESM imports.

---

## Implementation Order

1. Branch `feature/scoring-rule-tests` (after the *Open decisions* below are settled).
2. `npm install -D vitest`; add the script.
3. Write `sum.test.js` and run it, to check the runner works.
4. Write `addPoint.test.js` one `describe` block at a time (games → sets → tiebreaks →
   match → retirement → serve), running `npm test` after each. **Any test that fails
   unexpectedly is a finding.** Record it here and decide with you whether it becomes an
   `it.fails` or a fix. Don't quietly change the expectation to match the code.
5. Add the two `it.fails` tests; confirm each fails *for the stated reason* (temporarily
   run it as `it` and read the assertion message).
6. `npm run lint`; tick the criteria; commit.

## Verification Procedure

```bash
cd /home/tj/dev/tennis-score-tracker && npm test
```
**Expected:** `Test Files 2 passed (2)` and `Tests 20 passed | 2 expected fail (22)`.

```bash
git diff --stat main -- src/ ':!src/**/*.test.js'
```
**Expected:** empty output (criterion 4: no application code changed).

## Open decisions (need you before step 1)

- **Uncommitted tree.** `improvements.md`, `potential.md` and `summary.md` are deleted but
  not committed (403 lines), and `README.md` has large uncommitted edits (+245 lines). The
  roadmap asks for a decision: `git restore` or `git rm` the three docs, and commit or set
  aside the README. Branching with these pending would drag them into this feature branch.

## Outcome (2026-09-26)

- `npm test`: `Test Files 2 passed (2)`, `Tests 20 passed | 2 expected fail (22)`, which matches the expectation above.
- No unexpected failures: every rule in the table held on the first run.
- **Mutation check:** three deliberate breakages of `addPoint.js` were each caught by exactly one test (no-ad threshold, deuce reset, tiebreak win-by-two). The file was restored with `git checkout` after each.
- Both `it.fails` tests were first run as plain `it` and failed only on the `serving` assertion, with their setup checks passing: `expected +0 to be 1` and `expected 1 to be +0`.
- `npm run lint`: no warnings or errors. No `src/` file changed except the two new test files.
- Vitest pinned to `^4.1.11`. v5 (first installed) needs `@types/node` ≥ 22, and the project pins `^20`. `npm install` accepted that, but `npm ci` fails with ERESOLVE. Caught while merging into `main`. Verified: `npm ci` from clean, tests, lint and `npm run build` all pass on the merged `main` (with upstream `next` 15.2.8).
