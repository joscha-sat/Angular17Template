# Safe Code Quality and Refactoring Workflow

This document defines the recommended workflow for coding agents performing a whole-project refactoring or code cleanup
in this Angular repository. It is intentionally conservative: analysis comes before mutation, automated changes are
reviewed in small batches, and every behavior-affecting change is validated independently.

The commands below are npm scripts from `package.json`. Run them from the repository root and run each command
individually. Do not hide failures with `|| true`, redirect errors away, or chain a large number of mutating commands.

## Quick Reference

Use this order for a complete cleanup:

1. Record the worktree state and establish a baseline with tests and a production build.
2. Run read-only lint, architecture, dead-code, duplicate-code, and dependency analysis.
3. Review and classify findings before changing source files.
4. Apply only safe automated fixes, then inspect the diff.
5. Format Angular templates and source files, then inspect the diff again.
6. Refactor one small, coherent behavior or ownership area at a time.
7. Run focused validation after every batch and the complete validation suite at the end.
8. Re-run the analysis tools to confirm that the cleanup improved the baseline.
9. Run the mandatory final scripts from `AGENTS.md`.
10. Run read-only checks again after the final formatting and safe-fix scripts, because those scripts mutate files.

Do not treat a clean formatter or lint result as proof that behavior is unchanged. Tests, the Angular build, and a manual
review of the diff are still required.

## Script Risk and Ownership

| Script | Primary purpose | Mutates source files? | Safe default use |
| --- | --- | --- | --- |
| `prettier:write` | Format `src` HTML, TypeScript, and SCSS | Yes | Use when formatting is needed, especially after Angular template changes. |
| `format:biome` | Format files under `src` with the repository Biome configuration | Yes | Run after source changes and review the diff. |
| `lint:biome-safe-fixes` | Apply Biome fixes classified as safe | Yes | Approved for routine cleanup, but still review every diff. |
| `lint:biome-unsafe-fixes` | Apply Biome fixes that may change behavior | Yes | Do not run during routine cleanup. Require explicit approval and an isolated worktree. |
| `lint:oxlint` | Run Oxlint only | No | Useful for isolated diagnosis. |
| `lint:oxlint:fix` | Apply Oxlint fixes | Yes | Do not run broadly without explicit approval. |
| `eslint` | Run ESLint only | No | Use when Oxlint fails first or when ESLint needs isolated diagnosis. |
| `lint:oxlint-and-eslint` | Run Oxlint, then ESLint if Oxlint succeeds | No | Use as a combined quality gate. If Oxlint fails, run `eslint` separately. |
| `lint` | Run Angular ESLint through `ng lint` | No | Always include for Angular and template-specific validation. |
| `fallow:health` | Report structural and code-health signals | Normally no; Fallow cache files may change | Use for prioritization, not as an automatic refactoring plan. |
| `fallow:dead-code` | Report possible unused code | Normally no; Fallow cache files may change | Treat every result as a candidate requiring reference verification. |
| `fallow:dupes` | Report duplicated code | Normally no; Fallow cache files may change | Review whether duplicated code really has the same behavior and ownership. |
| `fallow:review` | Review the current code or diff using Fallow analysis | Normally no; Fallow cache files may change | Run after meaningful batches and before finishing. |
| `fallow:fix:dry-run` | Show possible Fallow fixes without applying them | No source changes expected | Use as a preview only. Do not turn the preview into a blanket delete or rewrite. |
| `knip` | Find unused files, exports, dependencies, and related project items | No | Treat results as candidates, especially where Angular uses templates or configuration-driven references. |

The repository configuration intentionally aligns the Prettier and Biome formatting settings. Prettier remains the
important owner for Angular HTML because Angular interpolation and template syntax can be unsafe for generic formatters.
Run Prettier when templates are involved, then run the required Biome pass and verify that the result is stable.

## Phase 0: Establish a Safe Starting Point

Before any source mutation:

```text
git status --short
git diff --check
git diff --stat
```

The agent must preserve all existing user changes. A dirty worktree is allowed only when the existing changes are clearly
understood and the cleanup scope does not overlap them. If the worktree contains unrelated changes in files that need to
be edited, stop and ask for clarification.

Do not run a broad autofix in a worktree containing unreviewed changes. Prefer a new branch or a checkpoint commit before
a whole-project cleanup so each automated batch can be reviewed and isolated.

If dependencies are missing or inconsistent, use the lockfile-defined install first:

```text
npm ci
```

Run `npm ci` only when installation is actually needed. Do not combine cleanup with dependency upgrades, lockfile
regeneration, or `npm-check-updates` work unless that is a separate, explicitly requested task.

Establish the behavioral baseline before changing source files:

```text
npm run run-unit-tests:terminal
npm run build
```

Record existing failures with their command and output. Do not silently attribute a pre-existing failure to the cleanup.
If the baseline cannot be established, continue only with a clearly documented limitation and use static checks plus
targeted tests to reduce risk.

## Phase 1: Build a Read-Only Inventory

Run the diagnostic commands before any formatter or autofix. This gives the agent a baseline that is not obscured by
formatting churn.

Run the two linters independently first:

```text
npm run lint:oxlint
npm run eslint
npm run lint
```

`lint:oxlint-and-eslint` uses `oxlint && eslint`. If Oxlint exits with an error, ESLint is not run by that script. The
independent `eslint` command is therefore required whenever the combined command stops at Oxlint.

Run the structural and unused-code analysis separately:

```text
npm run fallow:health
npm run fallow:dead-code
npm run fallow:dupes
npm run fallow:fix:dry-run
npm run knip
npm run fallow:review
```

The reports are an inventory, not an instruction to delete or rewrite everything they mention. Keep the output available
while reviewing the source and classify each finding before acting on it.

### Classify Findings Before Editing

Use these categories:

- **Formatting-only:** whitespace, quote, semicolon, or line-ending changes. These can be automated and reviewed as a
  separate diff.
- **Safe mechanical cleanup:** unused imports, obviously unreachable local code, or a directly verified rename. Apply in
  small batches and compile immediately afterward.
- **Reference-sensitive cleanup:** unused components, routes, providers, translation keys, assets, exports, files, or
  dependencies. Verify every static and dynamic reference before removal.
- **Behavioral refactoring:** signal/RxJS changes, service ownership changes, API changes, control-flow rewrites,
  deduplication across features, or changes to error handling. Make these manually and validate with tests and a build.
- **Report-only or intentional exceptions:** generated code, public template APIs, compatibility shims, environment
  files, or code referenced outside the repository. Document why the finding remains.

Do not mix formatting-only changes with a behavior refactor when a separate diff is practical. Small diffs make regressions
and accidental deletions much easier to detect.

## Phase 2: Apply Safe Automated Changes

Only after the baseline and inventory are recorded, apply the routine automated pass. Use this order:

```text
npm run prettier:write
npm run lint:biome-safe-fixes
npm run format:biome
```

Run `prettier:write` when source files or Angular templates are in scope. It formats all matching `src` HTML, TypeScript,
and SCSS files, so a whole-project run can create a large diff. Review that diff immediately.

`lint:biome-safe-fixes` is safer than unsafe autofixes but is still a write operation. A safe classification means the
tool considers the transformation mechanically safe; it does not replace source review or tests.

`format:biome` is also a write operation. It should be the last formatter in this pass so the configured formatting
settings settle before validation. If the same files repeatedly change back and forth, stop and resolve formatter
ownership rather than running both commands repeatedly.

After the automated pass:

```text
git diff --check
git diff --stat
git status --short
```

Inspect the actual diff, not only the command exit codes. Look for changed string literals, template structure, import
paths, selector names, route definitions, translation keys, SCSS selectors, and generated files.

### Unsafe Fixes Require Explicit Approval

Do not run either command below as part of a normal whole-project cleanup:

```text
npm run lint:biome-unsafe-fixes
npm run lint:oxlint:fix
```

Use an unsafe fixer only when all of the following are true:

1. The exact rule and intended transformation are understood.
2. The worktree has a trusted checkpoint and no unrelated unreviewed changes.
3. The change is limited to a clearly defined scope.
4. The complete diff is reviewed immediately.
5. Tests and the Angular build pass after the change.

If any transformation is not obviously mechanical, make the change manually so the intent is visible in the diff.

## Phase 3: Refactor in Small Batches

Refactor one coherent concern at a time. Suitable batch boundaries include one feature folder, one service contract, one
component family, or one dead-code category. Avoid a single batch that combines formatting, dependency deletion,
Angular API migration, and behavior changes.

For each batch:

1. Read the affected implementation, templates, routes, tests, models, and configuration before editing.
2. Search for all references, including template selectors, route strings, provider registrations, translation keys,
   dynamic component references, and configuration-driven names.
3. Make the smallest change that satisfies the cleanup objective.
4. Keep public component selectors, input/output names, API shapes, and persisted data stable unless the task explicitly
   includes a breaking change.
5. Run the formatter only after the logical change is complete.
6. Review `git diff --check`, the diff, and the affected file list.
7. Run validation before starting the next batch.

Use the Angular patterns in `AGENTS.md` for new code, but do not migrate unrelated legacy code solely because a modern API
exists. Signal migrations, RxJS changes, `resource`/`httpResource` changes, lifecycle changes, and control-flow changes
can alter timing, subscription behavior, change detection, or error handling. Treat them as behavioral refactors.

### Validation After Each Batch

For TypeScript, templates, routing, services, or shared components, run:

```text
npm run lint:oxlint-and-eslint
npm run lint
npm run run-unit-tests:terminal
npm run build
```

If the combined lint command stops at Oxlint, run `npm run eslint` separately before diagnosing the batch. For a focused
change, run the most relevant test file or test group as soon as possible, then run the full unit-test command before
moving to the next batch.

For SCSS-only changes, the Angular build is still required because component-style budgets and Sass compilation are build
concerns. For browser behavior, routing, or UI changes, add the browser test command when the relevant tests exist:

```text
npm run run-unit-tests:browser
```

Do not use `run-unit-tests:coverage-browser` as a routine agent check because it opens a browser window. Use coverage
commands when coverage is part of the requested acceptance criteria.

## Phase 4: Handle Dead Code and Duplicates Carefully

### Fallow and Knip Candidates

Before deleting a Fallow or Knip candidate, check all of the following that apply:

- TypeScript imports, re-exports, barrel files, and test-only references.
- Angular component and directive selectors in HTML templates.
- Route `loadComponent`, `loadChildren`, guards, resolvers, and string-based route references.
- Providers, injection tokens, `providedIn`, `useClass`, `useFactory`, and dynamically created components.
- Transloco keys, translation files, dynamic translation-key construction, and locale fallback behavior.
- Assets referenced by HTML, SCSS, configuration, environment files, or runtime code.
- Generated API files and code consumed by external applications or build tooling.
- Package scripts, Angular configuration, Vitest configuration, and CI configuration.

Angular applications often contain references that a generic static analyzer cannot prove. A report is not sufficient
evidence for deletion. If runtime or external usage cannot be ruled out, preserve the code and document the reason.

### Removing Dependencies

When Knip reports an unused dependency, verify whether it is used by:

- Angular builders, schematics, test runners, or configuration files.
- ESLint, Biome, Oxlint, Fallow, or custom local plugins.
- Generated code or OpenAPI generation.
- CI, Docker, Husky, or other repository tooling.

Remove only one dependency group at a time, update the lockfile with the project package manager, then run installation,
lint, tests, and build. Do not manually edit `package-lock.json`.

### Removing Duplicates

Fallow duplicate reports identify similar code, not necessarily interchangeable code. Before deduplicating, verify input
types, side effects, error handling, Angular injection context, template behavior, and feature ownership. Prefer a small
shared helper only when it clarifies the contract and does not create a generic abstraction with unrelated callers.

## Phase 5: Final Analysis and Verification

After all manual batches, run the complete read-only verification set:

```text
npm run lint:oxlint-and-eslint
npm run lint
npm run run-unit-tests:terminal
npm run build
npm run fallow:health
npm run fallow:dead-code
npm run fallow:dupes
npm run fallow:review
npm run knip
git diff --check
git diff --stat
git status --short
```

Compare the final Fallow and Knip results with the baseline. A cleanup does not need to drive every warning to zero, but
remaining findings must be understood, intentional, or documented as a follow-up. New warnings require investigation.

## Mandatory Repository End Pass

`AGENTS.md` requires these scripts at the end of the work. Run them in this exact order:

```text
npm run lint:oxlint-and-eslint
npm run lint:biome-safe-fixes
npm run format:biome
```

The last two commands can mutate source files. Therefore, immediately after that required sequence, run the read-only
post-format gate:

```text
npm run lint:oxlint-and-eslint
npm run lint
npm run run-unit-tests:terminal
npm run build
git diff --check
git status --short
```

If the post-format gate reports an issue, fix it, inspect the diff, and repeat the mandatory end pass followed by the
post-format gate. Do not finish with a formatter-generated change that has not been linted, compiled, and tested.

## Stop Conditions

Stop and ask for clarification or explicit approval when:

- A tool wants to modify files outside the intended scope.
- A formatter changes Angular template structure or meaningful string content.
- An autofix changes control flow, subscriptions, public component APIs, routes, or error handling.
- Fallow or Knip reports a reference that may be dynamic or external.
- Tests or the build fail after a change and the cause is not immediately clear.
- The cleanup would require changing dependencies, generated files, environment behavior, or public APIs.
- The worktree contains unrelated changes that overlap the proposed edit.

Never discard existing user changes to make an automated tool pass. Preserve the original worktree state, explain the
conflict, and continue only after the scope is clear.

## Completion Checklist

- Baseline worktree, tests, and build were recorded.
- Read-only lint and analysis reports were reviewed before mutation.
- Safe automated changes were inspected in the diff.
- Unsafe autofixes were not used without explicit approval.
- Dead-code, duplicate-code, and unused-dependency candidates were verified against Angular runtime references.
- Each logical batch passed the appropriate lint, tests, and build checks.
- Final Fallow and Knip reports were compared with the baseline.
- The mandatory `AGENTS.md` end pass was run in the required order.
- Read-only lint, Angular lint, tests, build, and `git diff --check` passed after the final mutating commands.
- Remaining warnings and known limitations were documented.
