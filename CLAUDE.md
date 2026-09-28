@AGENTS.md

## Claude Code operating notes

This project has `permissions.blockReadsOutsideWorkingDirectories` enabled.
Do not ask to change it — instead:

1. **Never build a file path with `$(...)`, backticks, a subshell, or a
   shell variable and act on it in the same command** (e.g. `cat "$(...)"`,
   `cd ... && (cmd)`). The permission checker can't statically verify these
   stay inside the working directory, so they trigger an approval prompt
   every time even when the command is safe. Use the `Read`/`Glob`/`Grep`
   tools instead — they take a literal path/pattern the checker can verify
   directly. If a path truly must be derived from another command's output,
   resolve it in one step, then pass the literal resulting string in a
   separate follow-up call.
2. **Treat this project directory (and `/Users/adamradabaugh/Local Sites`)
   as the entire scope of autonomous work.** Don't proactively read
   `~/.claude/` (global settings, other projects' transcripts/plans) or
   anything else outside that tree. If something outside is genuinely
   needed, ask first rather than attempting the read.
3. **Never run project tooling via `npx <pkg>`.** `npx` resolves and can
   execute a binary from an arbitrary location (npm cache, global installs,
   or a fresh download), so the checker can't verify it stays inside the
   working directory — same "cannot be checked" prompt as above, even for a
   trivial command. Call the local binary directly instead, e.g.
   `node_modules/.bin/tsc --noEmit -p .` instead of `npx tsc --noEmit -p .`,
   `node_modules/.bin/eslint .` instead of `npx eslint .`. Only reach for
   `npx` for one-off tools that genuinely aren't a project dependency (and
   expect a prompt when you do).
4. **Never `cd` to a directory outside the working directories** (e.g.
   `cd /private/tmp && ...`). A command's cwd is checked the same way as
   Read/Grep/Glob, so leaving the project root blocks the whole command even
   when nothing else about it is unsafe. Stay in the project root (the shell
   cwd persists between Bash calls, so there's rarely a reason to `cd` at
   all) and pass absolute paths as arguments instead — e.g. for scratch
   scripts/output, reference the scratchpad's absolute path directly rather
   than `cd`-ing into it first.
5. **Never use raw `grep -r`/`find`/other recursive-or-globbing shell
   commands via Bash** (e.g. `grep -rnoE '...' --include=*.tsx .`,
   `find . -name '*.ts'`). Even with a literal starting path, the set of
   files such a command actually touches is dynamic/unbounded, so the
   checker treats it the same as a computed path and blocks it. This
   applies to subagents too (Explore, general-purpose, etc.) — the same
   rule holds for any Bash call they make. Use the dedicated `Grep`/`Glob`
   tools instead for any multi-file search — that's what they're for, and
   they don't hit this block at all.
