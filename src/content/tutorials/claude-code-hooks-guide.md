---
title: "Claude Code Hooks Mastery: Automating PreToolUse, Guardrails, and Lifecycle Events"
description: "A practical guide to Claude Code hooks, permission decisions, exit-code semantics, and safer PreToolUse guardrails."
pubDate: 2026-08-03
author: nadhebe-team
category: "Tutorials"
tags: ["Claude Code", "Hooks", "PreToolUse", "Guardrails", "settings.json", "Anthropic"]
heroImage: "/images/claude-code-hooks-mastery-hero.webp"
heroAlt: "Minimalist vintage editorial illustration showing synchronous shell hooks intercepting dangerous tool calls on soft sage green"
estimatedReadingTime: 15
isPillar: false
topic: "Claude Code Hooks"
searchIntent: "tutorial"
draft: false
faq:
  - question: "What is the primary difference between a prompt rule and a Claude Code hook?"
    answer: "Prompt rules in CLAUDE.md shape what the model tries to do. Hooks are handlers that Claude Code itself runs at specific lifecycle events, and for supported events they can return decisions such as blocking a tool call."
  - question: "Does exit code 0 automatically approve tool execution in Claude Code?"
    answer: "No. Exit code 0 with no decision output means the hook has nothing to report, so the tool call continues through Claude Code's normal permission flow. Even an explicit permissionDecision of \"allow\" only skips the permission prompt; matching deny and ask rules in settings still apply."
  - question: "How does a PreToolUse hook block a dangerous command?"
    answer: "A PreToolUse command hook can exit with code 2 (stderr becomes the reason shown to Claude), or exit 0 and print JSON with hookSpecificOutput.permissionDecision set to \"deny\" and a permissionDecisionReason."
  - question: "What happens if a hook returns another nonzero exit code?"
    answer: "Do not rely on it to enforce a block. Exit codes other than 0 and 2 are non-blocking errors by default, so the action goes ahead. If the hook printed valid JSON, those fields decide instead. With onFailure set to \"block\" (Claude Code v2.1.295 or later), any exit code other than 0 or 2 counts as a failure and blocks the action, even if the JSON said allow."
sources:
  - label: "Claude Code Hooks Reference"
    url: "https://code.claude.com/docs/en/hooks"
  - label: "Claude Code: Configure permissions"
    url: "https://code.claude.com/docs/en/permissions"
---

# Claude Code Hooks Mastery: Automating PreToolUse, Guardrails, and Lifecycle Events

Claude Code hooks are handlers that run automatically at specific points in an agent session. A handler can be a shell command, an HTTP endpoint, an MCP tool call, a single-turn LLM prompt, or a subagent. Hooks are useful for automating checks, enforcing guardrails, formatting files, and integrating local workflows. This guide focuses on **command hooks** (`type: "command"`), which receive the event as JSON on stdin and answer through their exit code and stdout.

Prompt instructions in `CLAUDE.md` shape what the model tries to do. Hooks are run by Claude Code itself, can inspect each event, and, for events that support it, return explicit decisions. The two are complementary: instructions communicate expectations, while hooks can enforce certain outcomes. Neither replaces permission rules or sandboxing, which are covered at the end.

---

## The lifecycle pipeline: pass-through vs decision vs block

A successful hook is **not automatically an approval**. For a `PreToolUse` command hook, distinguish these outcomes:

```text
Agent proposes a tool call
          |
          v
   PreToolUse hook runs
          |
          +-- Exit 0, no decision output
          |       |
          |       v
          |  No decision: normal permission flow applies
          |
          +-- Exit 0, JSON permissionDecision: "allow"
          |       |
          |       v
          |  Skip the permission prompt
          |  (matching deny/ask rules in settings still apply)
          |
          +-- Exit 0, JSON permissionDecision: "deny"
          |       |
          |       v
          |  Tool call is denied; reason is returned to Claude
          |
          +-- Exit 0, JSON permissionDecision: "ask"
          |       |
          |       v
          |  Show the user a permission prompt
          |
          +-- Exit 2
          |       |
          |       v
          |  Block the tool call; stderr is the reason
          |
          +-- Any other exit code (no valid JSON)
                  |
                  v
             Non-blocking error: call continues
             (blocks only if onFailure is "block")
```

Exit code `0` means the hook completed successfully. If it prints no decision, Claude Code continues through its normal permission flow: the hook can deny a call, but staying silent doesn't approve it. An explicit JSON decision is different from a successful process exit. For `PreToolUse`, exit code `2` blocks the tool call.

`PreToolUse` also accepts a fourth `permissionDecision` value, `"defer"`, which is used to defer a tool call in non-interactive (`-p`) sessions so the session can be resumed later. It is outside the scope of this guide; see the hooks reference before using it.

---

## Exit-code semantics: pass-through vs explicit approval vs hard blocks

For command hooks, Claude Code interprets the process exit code together with anything printed to stdout. Use the documented output schema for permission decisions, and print **only** the JSON object to stdout: any other text there (for example, a line your shell profile echoes) stops Claude Code from reading it as JSON.

| Signal | Hook output | Resulting behavior |
| :--- | :--- | :--- |
| **`exit 0`** | No output, or plain text | **Pass-through:** the hook succeeded with no decision; normal permission evaluation still applies. |
| **`exit 0`** | JSON with `hookSpecificOutput.permissionDecision: "allow"` | **Allow decision:** skips the permission prompt. Matching `deny` and `ask` permission rules still apply, so a deny rule still blocks and an ask rule still prompts. |
| **`exit 0`** | JSON with `hookSpecificOutput.permissionDecision: "deny"` | **Structured denial:** the tool call is denied; `permissionDecisionReason` is fed back to Claude. |
| **`exit 0`** | JSON with `hookSpecificOutput.permissionDecision: "ask"` | **Ask:** shows the user a permission prompt for the call. |
| **`exit 0`** | JSON that can't be parsed or fails schema validation | **Non-blocking error:** the call continues and a hook error notice is shown (blocks only with `onFailure: "block"`). |
| **`exit 2`** | Explanation on stderr | **Blocking error:** blocks a `PreToolUse` tool call and reports stderr to Claude. Any JSON printed alongside is still read but can't override the block; even `"allow"` doesn't let the call through. |
| **Other nonzero exit codes** | Plain text or no output | **Non-blocking error:** the call continues unless the hook sets `onFailure: "block"`. |
| **Other nonzero exit codes** | Valid JSON | The exit code is ignored and the JSON fields decide, unless the hook sets `onFailure: "block"`, in which case the run counts as a failure and blocks. |

Exit code `1`, the conventional Unix failure code, is a **non-blocking** error. If a hook is meant to enforce a policy, use `exit 2` or a JSON denial.

The effect of exit code `2` depends on the hook event. On `PostToolUse` it can't block anything, because the tool has already run; it only shows stderr to Claude. The blocking examples in this article concern `PreToolUse`.

---

## 1. Configuring hooks in `settings.json`

Hook configuration has three levels: an event, a matcher group, and one or more hook handlers. This configuration runs a guardrail before Bash tool calls and a formatter after file edits:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "node",
            "args": ["${CLAUDE_PROJECT_DIR}/.claude/hooks/guardrail-bash.js"],
            "onFailure": "block"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "node",
            "args": ["${CLAUDE_PROJECT_DIR}/.claude/hooks/format-after-edit.js"],
            "onFailure": "continue"
          }
        ]
      }
    ]
  }
}
```

A few details worth knowing:

- **Exec form.** Because `args` is set, Claude Code spawns `node` directly with each `args` element as one argument and no shell in between. `${CLAUDE_PROJECT_DIR}` is substituted as a plain string, so project paths containing spaces need no quoting. This form also works on Windows, because `node.exe` is a real executable.
- **Matchers.** `"Bash"` matches only the Bash tool. `"Write|Edit"` is a list of exact tool names. A matcher containing other characters is treated as an unanchored JavaScript regular expression. On Windows, Claude may run shell commands through the PowerShell tool instead; use `"Bash|PowerShell"` if your guardrail needs to cover both.
- **`onFailure`** (Claude Code v2.1.295 or later) controls what happens when the hook itself *fails*: it can't start, it exits with a code other than `0` or `2`, it times out, or it prints invalid JSON. Exit code `2` is a deliberate block, not a failure.
  - The guardrail uses `"block"` so that a missing script, a crash, or a timeout blocks the Bash call instead of silently letting it through (fail closed). Without it, a `PreToolUse` hook that fails or reaches its timeout (600 seconds by default for command hooks) does **not** block the call.
  - The formatter uses `"continue"`. `PostToolUse` can't undo an edit either way; with `"block"`, a crashed formatter's failure would be handled like exit code `2` and shown to Claude, while `"continue"` keeps it as a non-blocking notice.
- **Parallel execution.** When an event fires, all matching hooks run in parallel, so don't write hooks that depend on each other's order.

Confirm these settings against the Claude Code version you deploy.

---

## Formatter hook: `format-after-edit.js`

For `Write` and `Edit`, the edited path arrives in the `PostToolUse` JSON input as `tool_input.file_path`. The hooks reference doesn't document an environment variable such as `$CLAUDE_FILE_PATH` for this, so read the path from stdin.

Save as `.claude/hooks/format-after-edit.js`:

```javascript
#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

// Exit 2 on PostToolUse shows stderr to Claude (the edit has already happened).
// Exit 1 is a non-blocking error notice for the user only.
function reportToClaude(message) {
  console.error(message);
  process.exit(2);
}

let input;
try {
  input = JSON.parse(fs.readFileSync(0, "utf8"));
} catch (error) {
  console.error(`Formatter hook: could not parse hook input: ${error.message}`);
  process.exit(1);
}

const filePath = input.tool_input?.file_path;
if (typeof filePath !== "string" || filePath.length === 0) {
  console.error("Formatter hook: missing tool_input.file_path.");
  process.exit(1);
}

// Locate the project's local Prettier and run its JS entry point with Node.
// This avoids the node_modules/.bin shims, which on Windows are .cmd files
// that can't be spawned without a shell.
const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const prettierDir = path.join(projectDir, "node_modules", "prettier");

let prettierBin;
try {
  const pkg = JSON.parse(fs.readFileSync(path.join(prettierDir, "package.json"), "utf8"));
  const bin = typeof pkg.bin === "string" ? pkg.bin : pkg.bin?.prettier;
  if (!bin) throw new Error("no bin entry in prettier/package.json");
  prettierBin = path.join(prettierDir, bin);
} catch (error) {
  console.error(`Formatter hook: local Prettier not found (${error.message}).`);
  process.exit(1);
}

// --ignore-unknown: skip files Prettier has no parser for instead of failing.
const result = spawnSync(
  process.execPath,
  [prettierBin, "--write", "--ignore-unknown", filePath],
  { cwd: projectDir, encoding: "utf8", stdio: ["ignore", "ignore", "pipe"] }
);

if (result.error) {
  console.error(`Formatter hook: failed to run Prettier: ${result.error.message}`);
  process.exit(1);
}

if (result.status !== 0) {
  // Usually a syntax error in the edited file, which Claude can fix.
  reportToClaude(
    `Prettier could not format ${filePath}:\n${(result.stderr || "").trim()}`
  );
}

process.exit(0);
```

This example assumes Prettier is installed locally in the project's `node_modules`. It distinguishes two kinds of problems:

- **Setup problems** (unparseable input, Prettier missing) exit `1`: a non-blocking error notice that Claude doesn't act on.
- **Formatting failures**, usually a syntax error in the edited file, exit `2`. On `PostToolUse`, exit code `2` shows stderr to Claude so it can fix the file. It does not undo the write: `PostToolUse` runs after the edit has happened.

Test it on your operating system and project before enabling it.

## 2. Enforcing guardrails with `guardrail-bash.js`

The following is an illustrative Node.js guardrail script. It blocks commands matching a small example blacklist and fails closed if the input cannot be read or parsed. A blacklist like this is only a teaching example, not a complete security boundary: shell syntax, aliases, variables, `sh -c`, absolute paths such as `/bin/rm`, scripts, and other tools can bypass simple string matching.

Save as `.claude/hooks/guardrail-bash.js`:

```javascript
#!/usr/bin/env node

const fs = require("node:fs");

try {
  // Read the PreToolUse payload from stdin.
  const payload = JSON.parse(fs.readFileSync(0, "utf8"));
  const command = payload.tool_input?.command;

  if (typeof command !== "string") {
    console.error("GUARDRAIL ERROR: Missing or invalid Bash command in hook input.");
    process.exit(2);
  }

  // Illustrative blacklist only; not a complete shell security parser.
  const blockedPatterns = [
    /\brm\s+-[a-z]*(?:r[a-z]*f|f[a-z]*r)/i,         // rm -rf, rm -fr, rm -Rf ...
    /\bgit\s+push\b.*\s(?:--force(?:-with-lease)?|-f)\b/i, // forced pushes
    /\bDROP\s+TABLE\b/i,
    /\bprocess\.env\b/                              // e.g. dumping env secrets via node -e
  ];

  for (const pattern of blockedPatterns) {
    if (pattern.test(command)) {
      console.error(`BLOCKED BY GUARDRAIL: command matches a blocked pattern: ${command}`);
      process.exit(2);
    }
  }

  // No decision: let Claude Code's normal permission flow apply.
  process.exit(0);
} catch (err) {
  // Fail closed: do not silently pass through when the hook cannot inspect input.
  console.error(`GUARDRAIL ERROR: Unable to read PreToolUse input: ${err.message}`);
  process.exit(2);
}
```

Exiting `2` blocks the call before permission rules are evaluated, so the block holds even when an allow rule would otherwise permit the command. Claude receives the stderr text as the tool's error.

The script's own fail-closed `catch` covers bad input; the `"onFailure": "block"` setting in `settings.json` covers the cases the script can't handle itself, such as the file being missing, Node crashing, or the hook timing out.

**Important:** This script uses regular expressions against the command string. That is not sufficient for robust security enforcement. For production guardrails, prefer `deny` permission rules, narrowly scoped allowlists, and operating-system sandboxing where appropriate. Test the behavior against your actual shell and Claude Code version.

---

## 3. Returning an explicit JSON decision

If the hook should make an explicit permission decision rather than defer to the standard permission flow, print the documented structured output on stdout and exit with code `0`. `hookSpecificOutput` requires `hookEventName`.

### Explicit allow

```javascript
console.log(JSON.stringify({
  hookSpecificOutput: {
    hookEventName: "PreToolUse",
    permissionDecision: "allow"
  }
}));
process.exit(0);
```

An `"allow"` skips the permission prompt, but it does not override permission rules: a matching `deny` rule (including one from managed settings) still blocks the call, and a matching `ask` rule still prompts. Some calls prompt regardless, for example in plan mode a hook's `"allow"` has no effect on file edits or other calls that aren't read-only.

Only return an explicit allow when the policy check has positively established that the operation should be permitted. Do not use it as a generic success response.

### Structured denial

```javascript
console.log(JSON.stringify({
  hookSpecificOutput: {
    hookEventName: "PreToolUse",
    permissionDecision: "deny",
    permissionDecisionReason:
      "Direct database migrations are prohibited in local sessions. Use the CI/CD pipeline."
  }
}));
process.exit(0);
```

A structured denial is an alternative to exit code `2` for a `PreToolUse` block. Claude Code cancels the call and feeds `permissionDecisionReason` back to Claude, which lets you give a specific, actionable reason.

Older examples sometimes return a top-level `"decision": "approve"` or `"block"` from `PreToolUse`. That shape is deprecated for this event; use `hookSpecificOutput.permissionDecision` instead.

---

## Summary and recommendations

1. **Distinguish pass-through from approval.** Exit code `0` with no decision output does not approve a tool call; it leaves the decision to Claude Code's normal permission flow.
2. **Know what `"allow"` can't do.** A hook's allow only skips the prompt. Deny and ask rules in settings are still evaluated.
3. **Use a documented blocking mechanism.** For `PreToolUse`, exit code `2` or a structured JSON denial blocks a tool call. Exit code `1` and other nonzero codes do not.
4. **Fail closed when a guardrail can't run.** Handle unreadable input inside the script, and set `"onFailure": "block"` (v2.1.295+) so a missing, crashing, or timed-out guardrail blocks instead of passing through.
5. **Treat sample blacklists as examples, not complete protection.** Command-string matching is bypassable. For hard allow/deny rules, use the permission system; for enforcement that doesn't depend on command text, use sandboxing. Test dangerous edge cases.
6. **Verify the current reference before publishing.** Hook fields and behaviors evolve quickly. Consult the [Claude Code Hooks Reference](https://code.claude.com/docs/en/hooks) and [permissions documentation](https://code.claude.com/docs/en/permissions).

## Sources

- [Claude Code Hooks Reference](https://code.claude.com/docs/en/hooks)
- [Claude Code: Configure permissions](https://code.claude.com/docs/en/permissions)
