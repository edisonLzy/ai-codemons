# Subskill: Optimize Topic Files Formatting

## Goal

Apply Obsidian-flavoured formatting to a topic node's `README.md` and `FAQ.md` using the `obsidian-markdown` skill. Converts plain Markdown structures into callouts, wikilinks, and frontmatter that Obsidian renders correctly.

## Input

- Path to `README.md` (required)
- Path to `FAQ.md` (required)

## Execution Steps

### 1. Invoke obsidian-markdown Skill

Invoke the `obsidian-markdown` skill for both files. Apply all rules in the sections below.

### 2. Optimize README.md

| Element | Rule |
|---|---|
| Frontmatter | Add `aliases` field with common name variants (e.g., English ↔ Chinese, abbreviations) |
| Includes boundary | Replace plain `**Includes**: - item` list with `> [!success] Includes` callout |
| Excludes boundary | Replace plain `**Excludes**: - item` list with `> [!failure] Excludes` callout |
| Empty Sub-topic Index | Replace placeholder text with `> [!todo] 待完善` callout |
| Populated Sub-topic Index | Use wikilinks: `[[subtopicName/README\|SubtopicName]]` |

**Example output:**

```markdown
---
aliases:
  - Frontend Dev
  - 前端开发
---

# Frontend Development

> Core concepts and practices for building web UIs.

## Boundary

> [!success] Includes
> - HTML, CSS, JavaScript
> - Frontend frameworks (React, Vue)

> [!failure] Excludes
> - Backend APIs
> - DevOps / infrastructure

## Sub-topic Index

- [[react/README|React]]
- [[css/README|CSS]]
```

### 3. Optimize FAQ.md

| Element | Rule |
|---|---|
| Scope section | Replace plain list under `## Scope` with `> [!info] 收录范围` callout |
| Section heading | Rename `## Structure` → `## Questions` |
| Each question block | Wrap in `> [!faq]-` foldable callout (collapsed by default) |
| Question / answer separator | Add `---` horizontal rule between question context and answer |

**Example output:**

```markdown
# FAQ

> This document records frequently asked questions about this topic.

## Scope

> [!info] 收录范围
> - Questions related to core concepts of this topic
> - Common misconceptions and best practices

## Questions

> [!faq]- What is the virtual DOM?
>
> ### What is the question?
> 1. **What is the question?** How does the virtual DOM work?
> 2. **What is the context?** Encountered when learning React rendering.
>
> ---
>
> ### What is the answer?
> 1. **Knowledge points:** Diffing algorithm, reconciliation
> 2. **Answer:** The virtual DOM is an in-memory representation…
```

## Acceptance Criteria

- [ ] README.md frontmatter contains an `aliases` field
- [ ] `Includes` section uses `> [!success] Includes` callout
- [ ] `Excludes` section uses `> [!failure] Excludes` callout
- [ ] Empty Sub-topic Index uses `> [!todo] 待完善` callout
- [ ] Populated Sub-topic Index entries use wikilink syntax
- [ ] FAQ.md scope section uses `> [!info] 收录范围` callout
- [ ] FAQ.md section heading is `## Questions`
- [ ] Each FAQ block uses `> [!faq]-` foldable callout
- [ ] `---` separator appears between question context and answer
