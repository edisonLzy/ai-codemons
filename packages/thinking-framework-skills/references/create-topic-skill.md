# Subskill: Create Topic Node

## Goal

Create a new topic (or sub-topic) directory in the knowledge tree with basic node initialization. Includes automatic best placement discovery, user interaction for confirmation, duplicate checking, and directory tree output.

## Input

- Parent directory path (passed from SKILL.md after config check)
- New topic name
- One-sentence topic definition
- Optional: initial sub-topic list

## Execution Steps

### 1. Find Best Placement Directory

Invoke the **[Retrieve Topic Node](./retrieval-topic-skill.md)** subskill to locate the most suitable parent directory in the knowledge tree.

- Use the new topic's name and definition as the search query.
- The subskill handles vault traversal (up to 3 layers), keyword matching, candidate ranking, and user confirmation.
- On success, it returns the confirmed parent directory path.
- If no matching directory is found, the user may choose to place the new topic at the vault root or a manually specified path.

### 2. Check for Duplicates

- List all subdirectories under the parent directory
- Check if a directory with the same name already exists
- If exists, output warning:

```
⚠️ Warning: Directory [parent_path]/[topic_name] already exists
Existing content:
- README.md
- FAQ.md
- subtopicA/

Overwrite? [y/N]
```

- If user chooses not to overwrite, end the process

### 3. Create Directory Structure

Create the following directory structure:

```
/[topic-name]/
├── README.md      # Basic structure: Definition + Boundary + Sub-topic Index
└── FAQ.md         # FAQ documentation
```

#### README.md Template

Use `resources/README-template.md` as the template. Only fill in content provided by the user - leave placeholders for content not mentioned (e.g., Sub-topic Index section should remain with placeholder content).

#### FAQ.md Template

Use `resources/FAQ-template.md` as the template, copy the template content and add the scope description. Only include content provided by the user.

#### 3.3 Optimize Formatting (IMPORTANT)

**This step is REQUIRED.** Invoke the `obsidian-markdown` skill to optimize both files after creation. Apply the following rules:

**README.md**

| Element | Rule |
|---|---|
| Frontmatter | Add `aliases` field with common name variants (e.g., localized names) |
| Includes boundary | Use `> [!success] Includes` callout instead of plain bold + list |
| Excludes boundary | Use `> [!failure] Excludes` callout instead of plain bold + list |
| Empty Sub-topic Index | Replace placeholder text with `> [!todo] 待完善` callout |

**FAQ.md**

| Element | Rule |
|---|---|
| Scope section | Use `> [!info] 收录范围` callout instead of plain list |
| Each question block | Use `> [!faq]-` foldable callout (collapsed by default) |
| Question / answer separator | Add `---` horizontal rule between question context and answer |
| Section heading | Rename `## Structure` → `## Questions` |

### 4. Update Parent Directory README.md

After creating the directory, update the parent directory's `README.md` file to add sub-topic index:

1. Read the parent directory's `README.md`
2. Add the new topic link under `## Sub-topic Index`:

```markdown
## Sub-topic Index

- [[topic_name/README.md]]
```

If `## Sub-topic Index` section does not exist, create it.

### 5. Recursively Create Sub-topics (if provided)

If the user provides an initial sub-topic list, recursively create sub-topic directories with their `README.md` and `FAQ.md`.

### 6. Output Directory Tree

Use the `tree` command or manual traversal to output the created directory structure:

```
✅ Directory creation complete!

[parent_directory]/
└── [topic_name]/
    ├── README.md
    ├── FAQ.md
    └── [subtopic1]/
        ├── README.md
        └── FAQ.md
```

## Acceptance Criteria

- [ ] Parent directory located via Retrieve Topic Node subskill
- [ ] Duplicate directory detection works correctly
- [ ] New topic directory structure is complete (contains at least `README.md` and `FAQ.md`)
- [ ] `README.md` follows three-section format (Definition + Boundary + Sub-topic Index)
- [ ] `FAQ.md` uses template structure
- [ ] Parent directory `README.md` updated with new topic in sub-topic index
- [ ] Directory tree output is correct
- [ ] If sub-topic list provided, recursive creation succeeds

## Helper Tools

- Directory tree display: Use `tree -L 3 <path>` command
