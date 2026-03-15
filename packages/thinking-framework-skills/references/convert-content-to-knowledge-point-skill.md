# Subskill: Convert Content to Knowledge Point

## Goal

Convert existing content into a structured knowledge point document within a specified topic directory. The content is already determined and needs to be preserved as a formal knowledge point file following the framework's formatting standards.

## Input

- **Content to convert**: The source material to be transformed (provided by user)
- **Topic path**: Either:
  - User-specified absolute path to the target topic directory
  - If not specified, use the [Retrieve Topic Skill](./retrieval-topic-skill.md) to locate the appropriate topic
- **Knowledge point name**: Optional user-specified name; if not provided, generate from content summary
- **Tags**: Optional user-specified tags for frontmatter

## Constraints

- **File naming**: `{index}.{knowledge-point-name}.md`
  - `index`: Incremental number based on existing knowledge files in the topic (starting from 1)
  - `knowledge-point-name`: User-specified or derived from content summary
- **Content formatting**: Must use `resources/CONTENT-template.md` as the base structure
- **Index update**: The topic's `README.md` must be updated to include the new knowledge point in its index

## Execution Steps

### 1. Confirm Topic

If the user has provided a topic path:

1. Verify the path exists and is a valid topic directory (contains `README.md`)
2. If valid, confirm with the user:

```
✅ Topic confirmed: /vault/programming/frontend/

Definition: Frontend development covers HTML, CSS, and JavaScript frameworks.

Proceed with creating knowledge point? [Y/n]
```

If the user has NOT provided a topic path:

1. Invoke the [Retrieve Topic Skill](./retrieval-topic-skill.md) to locate the appropriate topic
2. Use the returned topic path for subsequent steps

### 2. Determine File Index

1. List all files in the topic directory matching the pattern `*.md`
2. Filter for existing knowledge point files (format: `{number}.*.md`)
3. Determine the next available index:

```
📋 Existing knowledge points in [topic_path]:

  - 1. JavaScript-Basics.md
  - 2. CSS-Flexbox.md

→ New file index: 3
```

If this is the first knowledge point file, use index **1**.

### 3. Determine Knowledge Point Name

If the user has provided a name, use it directly.

If not provided:
1. Analyze the content to extract a suitable name
2. Present suggestions to the user for confirmation:

```
📝 Suggested knowledge point names:

1. "React-Component-Patterns" (based on content summary)
2. "React-hooks-usage"
3. Custom name...

Which name would you like to use? Select a number or enter a custom name:
```

### 4. Generate Content File

> **⚠️ 约束**：使用 `resources/CONTENT-template.md` 作为基础模板，只填充用户提供的内容，不要添加未提供的信息。

1. Read the `CONTENT-template.md` template
2. Fill in the template with user's content:
   - **Frontmatter**: title, date, tags, aliases, cssclass
   - **Content sections**: Organize content into appropriate hierarchical sections
   - **Summary**: Extract key takeaways from the content
   - **Related materials**: Add relevant references if available

3. Create the file at `{topic_path}/{index}.{knowledge-point-name}.md`

### 5. Optimize Formatting (Required)

After creating the file, use the [Optimize Topic Files Skill](./optimize-topic-files-skill.md) to ensure proper Obsidian formatting:

- Callout blocks are properly formatted
- Frontmatter is correct
- Wiki links are valid
- Code blocks have proper language tags

### 6. Update Topic README.md

1. Read the topic's `README.md`
2. Locate or create the knowledge point index section
3. Add the new knowledge point entry:

```markdown
## Knowledge Points Index

- [[1.JavaScript-Basics|JavaScript 基础]]
- [[2.CSS-Flexbox|CSS Flexbox 布局]]
- [[3.React-Component-Patterns|React 组件模式]]
```

4. If the topic has no `README.md`, warn the user:

```
⚠️ Topic directory has no README.md — index not updated.
   Run "convert topic [topic_path]" to initialize the topic first.
```

### 7. Output Summary

```
✅ Knowledge point created successfully!

[topic_path]/3.React-Component-Patterns.md

Metadata:
  - Index: 3
  - Name: React-Component-Patterns
  - Tags: react, components, patterns
  - Date: 2024-01-15

Topic README updated: [topic_path]/README.md
```

## Acceptance Criteria

- [ ] Topic is confirmed either from user input or via retrieval skill
- [ ] File index is correctly determined (incremental from existing files, or 1 for first file)
- [ ] Knowledge point name is confirmed with user (either user-specified or selected from suggestions)
- [ ] Content file follows `CONTENT-template.md` structure exactly
- [ ] File is created with correct naming format: `{index}.{knowledge-point-name}.md`
- [ ] File is formatted using the optimize skill before completion
- [ ] Topic's README.md is updated with the new knowledge point index (or warning shown if no README exists)
- [ ] Clear summary output shows the created file and any updates made

## Helper Tools

- List files in directory: `ls -la <path>`
- Filter knowledge files: `ls <path> | grep -E '^[0-9]+\.'`
- Read template: `cat resources/CONTENT-template.md`
- Read topic README: `cat <topic_path>/README.md`
