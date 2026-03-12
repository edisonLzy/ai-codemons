# Subskill: Optimize Topic Files Formatting

## Goal

Apply Obsidian-flavoured formatting to a topic node's `README.md` and `FAQ.md` using the `obsidian-markdown` skill, making the output consistent with the standard templates.

## Input

- Path to `README.md` (required)
- Path to `FAQ.md` (required)
- Path to content knowledge-point `.md` files (optional, one or more)

## Execution Steps

### 1. Invoke obsidian-markdown Skill

Invoke the `obsidian-markdown` skill for all files, with the corresponding template as the formatting target:

| File | Reference Template |
|------|-------------------|
| `README.md` | `resources/README-template.md` |
| `FAQ.md` | `resources/FAQ-template.md` |
| 知识点内容 `.md` | `resources/CONTENT-template.md` |

### 2. Optimize README.md

以 `resources/README-template.md` 为标准格式对文件进行格式化。额外注意：

- `aliases` 填写常见名称变体（中英文、缩写等）
- Sub-topic Index 为空时使用 `> [!todo] 待完善` callout
- Sub-topic Index 有内容时使用 wikilink：`[[subtopicName/README|SubtopicName]]`

### 3. Optimize FAQ.md

以 `resources/FAQ-template.md` 为标准格式对文件进行格式化。额外注意：

- 旧文件若使用 `## Structure`，rename 为 `## Questions`
- **⚠️ 约束**：确保每个 callout 标题行（如 `> [!faq]- Question X：...`）后有空行 `>`，否则无法折叠

### 4. Optimize Content Knowledge-point Files

以 `resources/CONTENT-template.md` 为标准格式对每个知识点文件进行格式化。额外注意：

- `[!abstract]` 目录中的锚点链接与文件实际章节标题保持一致
- 代码块确保标注语言类型
- 有多方案/多类型对比时使用表格，含 ✅/❌ 标记

## Acceptance Criteria

- [ ] README.md 结构与 `resources/README-template.md` 一致
- [ ] README.md frontmatter 包含 `tags` 与 `aliases` 字段
- [ ] Sub-topic Index 空时使用 `> [!todo] 待完善`，有内容时使用 wikilink
- [ ] FAQ.md 结构与 `resources/FAQ-template.md` 一致
- [ ] FAQ.md section heading 为 `## Questions`
- [ ] 知识点文件结构与 `resources/CONTENT-template.md` 一致
- [ ] 知识点文件 `[!abstract]` 目录锚点与实际章节一致

