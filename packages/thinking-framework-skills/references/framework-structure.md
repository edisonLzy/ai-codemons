# Framework Structure

This is the canonical definition of the Obsidian-based knowledge tree structure. **All sub-skills depend on this structure.**

## Topic Directory Structure

```
topic-name/                    # Topic 目录
├── README.md                  # 入口文件（必须）：定义 + 边界 + 子主题索引
├── FAQ.md                     # FAQ 文件（必须）：常见问题 + 实践经验沉淀
├── 1.知识文档A.md             # 知识文档（可选）：具体内容，带序号前缀
├── 2.知识文档B.md             # 知识文档（可选）：具体内容，带序号前缀
└── 子topic/                   # 子 Topic（可选）：递归包含自己的 README + FAQ + 知识文档
    ├── README.md
    ├── FAQ.md
    └── 1.子topic知识文档.md
```

## File Specifications

| 文件 | 必须 | 说明 |
|------|------|------|
| `README.md` | ✅ | Topic 入口，包含定义、边界（Includes/Excludes）、子主题索引 |
| `FAQ.md` | ✅ | 沉淀常见问题、反直觉经验、实践陷阱 |
| `*.md` 知识文档 | 可选 | 具体内容文件，**必须带序号前缀**（如 `1.冰箱选购.md`） |
| `子topic/` | 可选 | 子 Topic 目录，递归包含 README + FAQ + 知识文档 |

## Knowledge Document Naming Convention

- 必须带序号前缀：`1.`, `2.`, `3.` 等
- 示例：`1.冰箱选购.md`、`2.床品选择.md`、`10.扫地机器人.md`
- 序号用于标识学习/阅读顺序，便于定位和导航

## Knowledge Document Content Template

知识文档的内容必须遵循 `resources/CONTENT-template.md` 模板结构，包含：
- **目录** — 一级/二级章节的锚点索引
- **正文** — 要点、代码示例、表格、注意事项
- **总结** — 核心要点提炼
- **相关资料** — 关联文档和外链

## README.md Template

所有 README.md 必须包含三个部分，详见 `resources/README-template.md`：
1. **Definition** — 一句话定义主题
2. **Scope** — 边界（Includes / Excludes）
3. **Sub-topic Index** — 子主题和知识文档的 wikilinks 索引

## FAQ.md Template

所有 FAQ.md 必须包含 FAQ callout 块，详见 `resources/FAQ-template.md`。
**⚠️ 注意**：FAQ 中的 callout 块（如 `> [!faq]-`）标题行后**必须有空行 `>`**，否则无法正确渲染为可折叠块。

> **⚠️ 约束**：如果需要新创建文件，只需要参考模版生成文件的内容结构即可，不要乱加任何未提及的内容。
