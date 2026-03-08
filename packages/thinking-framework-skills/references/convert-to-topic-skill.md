# Subskill: Convert Directory to Topic Node

## Goal

Convert an existing non-topic directory into a standard topic node by analysing its current contents, generating `README.md` and `FAQ.md` from what already exists, and applying Obsidian-flavoured formatting. Preserves all existing files; only adds or updates structure files.

## Input

- Target directory path (absolute)
- Optional: one-sentence topic definition override
- Optional: `--recursive` flag to convert subdirectories as well

## Execution Steps

### 1. Analyse Existing Directory

For the target directory:

1. List all files and immediate subdirectories.
2. If `README.md` already exists, read it fully to extract any existing definition or boundary information.
3. If `FAQ.md` already exists, note it and skip creation for that file.
4. For each subdirectory, read its `README.md` (first 30 lines) to understand its scope.
5. Read any `*.md` files in the directory (first 50 lines each) to infer topic context.

Build a **Directory Snapshot** in memory:

```
target/
├── README.md?          (exists / missing)
├── FAQ.md?             (exists / missing)
├── subtopicA/          (has README? y/n)
├── subtopicB/          (has README? y/n)
└── note1.md            (existing content file)
```

### 2. Infer Topic Metadata

Using the directory name and collected content, infer:

| Field | Source |
|---|---|
| **Topic name** | Directory name (humanized, e.g. `frontend-dev` → `Frontend Dev`) |
| **One-sentence definition** | User-provided override, or extracted from existing README/notes, or generated from directory name |
| **Includes** | Subdirectory names + existing note themes |
| **Excludes** | Siblings in the parent directory that share domain but are clearly separate |

If definition cannot be confidently inferred, ask the user:

```
❓ Could not infer a clear definition for "[directory_name]".
Please provide a one-sentence definition, or press Enter to skip:
```

### 3. Check Existing Files

```
📋 Directory analysis for: [target_path]

  README.md  → [EXISTS / MISSING]
  FAQ.md     → [EXISTS / MISSING]

Planned actions:
  ✏️  Create README.md   (or "⏭️  Skip README.md — already exists")
  ✏️  Create FAQ.md      (or "⏭️  Skip FAQ.md — already exists")

Proceed? [Y/n]
```

If the user declines, stop.

### 4. Generate README.md (if missing)

> **⚠️ 约束**：如果需要新创建文件，只需要参考模版生成文件的内容结构即可，不要乱加任何未提及的内容。

Use `resources/README-template.md` as the base. Fill in all inferred metadata (topic name, definition, includes/excludes, sub-topic index). Leave sections as placeholders only when no information is available.

### 5. Generate FAQ.md (if missing)

> **⚠️ 约束**：如果需要新创建文件，只需要参考模版生成文件的内容结构即可，不要乱加任何未提及的内容。

Use `resources/FAQ-template.md` as the base. Fill in `{{topic}}` with the topic name and `{{tags}}` with relevant tags inferred from the directory context.

### 6. Optimize Formatting with obsidian-markdown Skill

**This step is REQUIRED for both files.** Follow the complete workflow defined in [Optimize Topic Files Skill Reference](./optimize-topic-files-skill.md).

### 7. Update Parent Directory README.md

After files are created/confirmed, update the parent directory's `README.md`:

1. Read `[parent]/README.md`.
2. Locate the `## Sub-topic Index` section.
3. Add a wikilink for the converted directory if not already present:

```markdown
## Sub-topic Index

- [[topicName/README|Topic Name]]
```

4. If `## Sub-topic Index` does not exist in the parent, append it.
5. If the parent has no `README.md`, skip this step and warn the user:

```
⚠️  Parent directory has no README.md — sub-topic index not updated.
   Run "convert topic [parent_path]" to initialize the parent first.
```

### 8. Recursive Conversion (if `--recursive`)

If the `--recursive` flag was provided, repeat steps 1–7 for each immediate subdirectory that is missing a `README.md`.

Present a summary before starting:

```
🔁 Recursive mode: the following subdirectories will also be converted:

  - subtopicA/   (missing README.md)
  - subtopicB/   (missing README.md)
  - subtopicC/   (README.md exists — skipped)

Continue? [Y/n]
```

Process each directory in order. If any subdirectory fails, log the error and continue with the rest.

### 9. Output Summary

```
✅ Conversion complete!

[target_path]/
├── README.md      ← created
├── FAQ.md         ← created
├── subtopicA/
│   ├── README.md  ← created (recursive)
│   └── FAQ.md     ← created (recursive)
└── existing-note.md  (untouched)

Parent README updated: [parent_path]/README.md
```

## Acceptance Criteria

- [ ] Existing files (non-README, non-FAQ) are never modified or deleted
- [ ] README.md is created only when missing; existing README.md is never overwritten
- [ ] FAQ.md is created only when missing; existing FAQ.md is never overwritten
- [ ] Generated README.md follows the three-section format (Definition + Boundary + Sub-topic Index)
- [ ] Generated FAQ.md follows the template structure
- [ ] Both files are formatted with Obsidian Markdown (callouts, frontmatter aliases)
- [ ] Parent README.md sub-topic index is updated (or a warning is shown if parent has no README)
- [ ] Recursive mode converts all subdirectories missing a README.md
- [ ] A clear summary tree is printed after completion

## Helper Tools

- List directory contents: `ls -la <path>`
- Quick directory tree: `tree -L 2 <path>`
- Read file head: `head -n 50 <file>`
