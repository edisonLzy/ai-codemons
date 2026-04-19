---
name: thinking-framework-skills
description: Obsidian-based knowledge tree framework for creating topic nodes.
---

# Thinking Framework Skills

## Overview

This skill maintains an Obsidian-based knowledge tree structure. Each topic directory is a node with a standard structure. **All sub-skills depend on this structure — treat this as the canonical definition.**

### Topic Directory Structure

```
topic-name/                    # Topic 目录
├── README.md                  # 入口文件（必须）：定义 + 边界 + 子主题索引
├── FAQ.md                    # FAQ 文件（必须）：常见问题 + 实践经验沉淀
├── 1.知识文档A.md            # 知识文档（可选）：具体内容，带序号前缀
├── 2.知识文档B.md            # 知识文档（可选）：具体内容，带序号前缀
└── 子topic/                  # 子 Topic（可选）：递归包含自己的 README + FAQ + 知识文档
    ├── README.md
    ├── FAQ.md
    └── 1.子topic知识文档.md
```

### File Specifications

| 文件 | 必须 | 说明 |
|------|------|------|
| `README.md` | ✅ | Topic 入口，包含定义、边界（Includes/Excludes）、子主题索引 |
| `FAQ.md` | ✅ | 沉淀常见问题、反直觉经验、实践陷阱 |
| `*.md` 知识文档 | 可选 | 具体内容文件，**必须带序号前缀**（如 `1.冰箱选购.md`） |
| `子topic/` | 可选 | 子 Topic 目录，递归包含 README + FAQ + 知识文档 |

### Knowledge Document Naming Convention

- 必须带序号前缀：`1.`, `2.`, `3.` 等
- 示例：`1.冰箱选购.md`、`2.床品选择.md`、`10.扫地机器人.md`
- 序号用于标识学习/阅读顺序，便于定位和导航

### Knowledge Document Content Template

知识文档的内容必须遵循 `resources/CONTENT-template.md` 模板结构，包含：
- **目录** — 一级/二级章节的锚点索引
- **正文** — 要点、代码示例、表格、注意事项
- **总结** — 核心要点提炼
- **相关资料** — 关联文档和外链

### README.md Template

所有 README.md 必须包含三个部分，详见 `resources/README-template.md`：
1. **Definition** — 一句话定义主题
2. **Scope** — 边界（Includes / Excludes）
3. **Sub-topic Index** — 子主题和知识文档的 wikilinks 索引

### FAQ.md Template

所有 FAQ.md 必须包含 FAQ callout 块，详见 `resources/FAQ-template.md`。
**⚠️ 注意**：FAQ 中的 callout 块（如 `> [!faq]-`）标题行后**必须有空行 `>`**，否则无法正确渲染为可折叠块。

> **⚠️ 约束**：如果需要新创建文件，只需要参考模版生成文件的内容结构即可，不要乱加任何未提及的内容。

## Configuration Management

### Required Configuration
This skill requires the following configuration, stored in `store/config.json`:

| Key | Description | Example |
|-----|-------------|---------|
| `obsidian_vault_path` | Root path of Obsidian vault | `/Users/evan/Obsidian/Vaults/knowledge` |

### Configuration Check Flow
Before executing subskills that depend on configuration:

1. **Check Configuration**: Run `bun scripts/config-manager.ts check obsidian_vault_path`
2. **Parse Result**: Check command output JSON:
   ```json
   {
     "exists": true|false,
     "key": "obsidian_vault_path",
     "value": "<value>|null"
   }
   ```
3. **If Missing** (`exists: false`): Ask the user:
   > What is your obsidian_vault_path? This is the root directory path of your Obsidian knowledge vault. Please provide the full path.
4. **Save Configuration**: Run `bun scripts/config-manager.ts set obsidian_vault_path <user_provided_value>`
5. **Validate Path**: Run `bun scripts/config-manager.ts validate obsidian_vault_path`
6. **Parse Validation Result**: Check if path exists:
   ```json
   {
     "valid": true|false,
     "key": "obsidian_vault_path",
     "message": "Path exists" | "Path does not exist",
     "path": "/Users/xxx/Obsidian Vault"
   }
   ```
7. **If Invalid** (`valid: false`): Ask the user:
   > The configured path `{path}` does not exist. Please provide a valid Obsidian vault path.
8. **Reconfigure**: Run `bun scripts/config-manager.ts set obsidian_vault_path <new_path>` with the new path
9. **Validate Again**: Repeat steps 5-8 until a valid path is provided
10. **Load to Context**: Use the validated configuration value in subsequent workflows

### Configuration Scripts
- **Location**: `scripts/config-manager.ts`
- **Commands**:
  - `init` - Initialize config file
  - `get <key>` - Get config value
  - `set <key> <value>` - Set config value
  - `list` - List all config
  - `delete <key>` - Delete config key
  - `check <key>` - Check if config exists (JSON output)
  - `validate <key>` - Validate if configured path exists (JSON output)

## Retrieve Topic

### When to Trigger?
Activate this skill when users provide any of these patterns:
- `"find topic <topic_name>"`
- `"retrieve topic <topic_name>"`
- `"search topic <topic_name>"`
- `"locate topic <topic_name>"`
- `"where is <topic_name>"`
- `"look up <topic_name>"`

### Instructions
Follow the complete workflow defined in [Retrieve Topic Skill Reference](references/retrieval-topic-skill.md).

## Create Topic

### When to Trigger?
Activate this skill when users provide any of these patterns:
- `"create topic <topic_name>"`
- `"new topic <topic_name>"`
- `"add subtopic <topic_name> to <parent_topic>"`
- `"initialize topic <topic_name>"`
- `"create knowledge node <topic_name>"`

### Instructions
Follow the complete workflow defined in [Create Topic Skill Reference](references/create-topic-skill.md).

## Divide Into Topic

### When to Trigger?
Activate this skill when users provide any of these patterns:
- `"divide topic <topic_name>"`
- `"divide into topic <topic_name>"`
- `"break down topic <topic_name>"`
- `"split topic <topic_name>"`
- `"subdivide <topic_name>"`
- `"decompose topic <topic_name>"`

### Instructions
Follow the complete workflow defined in [Divide Into Topic Skill Reference](references/divide-into-topic-skill.md).

## Deep-in Topic

### When to Trigger?
Activate this skill when users provide any of these patterns:
- `"deep in topic <topic_name>"`
- `"deepin topic <topic_name>"`
- `"research topic <topic_name>"`
- `"deep research <topic_name>"`
- `"study topic <topic_name>"`
- `"produce knowledge files for <topic_name>"`

### Instructions
Follow the complete workflow defined in [Deep-in Topic Skill Reference](references/deepin-topic-skill.md).

## Convert Directory to Topic

### When to Trigger?
Activate this skill when users provide any of these patterns:
- `"convert topic <path>"`
- `"convert directory <path>"`
- `"convert <path> to topic"`
- `"make <path> a topic"`
- `"initialize topic at <path>"`
- `"fix topic structure <path>"`

### Instructions
Follow the complete workflow defined in [Convert to Topic Skill Reference](references/convert-to-topic-skill.md).

## Optimize Topic Files

### When to Trigger?
Activate this skill when users provide any of these patterns:
- `"optimize topic <topic_name>"`
- `"optimize topic files <topic_name>"`
- `"format topic <topic_name>"`
- `"format topic files <topic_name>"`
- `"fix topic formatting <topic_name>"`
- `"improve topic formatting <topic_name>"`

### Instructions
Follow the complete workflow defined in [Optimize Topic Files Skill Reference](references/optimize-topic-files-skill.md).

## Retrieve Knowledge Point

### When to Trigger?
Activate this skill when users provide any of these patterns:
- `"find knowledge point <keywords>"`
- `"retrieve knowledge point <keywords>"`
- `"search knowledge <keywords>"`
- `"find doc <keywords>"`
- `"look up knowledge <keywords>"`
- `"locate knowledge document <keywords>"`

### Instructions
Follow the complete workflow defined in [Retrieve Knowledge Point Skill Reference](references/retrieval-knowledge-point-skill.md).

## Upsert Knowledge Point

### When to Trigger?
Activate this skill when users provide any of these patterns:
- `"save knowledge <content>"`
- `"store knowledge <content>"`
- `"create knowledge point <content>"`
- `"add knowledge <content>"`
- `"update knowledge point <keywords> with <content>"`
- `"upsert knowledge <keywords>"`

### Instructions
Follow the complete workflow defined in [Upsert Knowledge Point Skill Reference](references/upsert-knowledge-point-skill.md).

## Daily Note

### Create Daily Note

#### When to Trigger?
Activate this skill when users provide any of these patterns:
- `"create daily note"`
- `"new daily note"`
- `"日报"`
- `"写日报"`

#### Instructions
Follow the complete workflow defined in [Create Daily Note Skill Reference](references/daily-note/create-daily-note-skill.md).

### Update Daily Note

#### When to Trigger?
Activate this skill when users provide any of these patterns:
- `"update daily note"`
- `"edit daily note"`
- `"更新日报"`
- `"编辑日报"`

#### Instructions
Follow the complete workflow defined in [Update Daily Note Skill Reference](references/daily-note/update-daily-note-skill.md).

### Complete Daily Note

#### When to Trigger?
Activate this skill when users provide any of these patterns:
- `"complete daily note"`
- `"finalize daily note"`
- `"完善日报"`
- `"完成日报"`

#### Instructions
Follow the complete workflow defined in [Complete Daily Note Skill Reference](references/daily-note/complete-daily-note-skill.md).

### Create Weekly Report

#### When to Trigger?
Activate this skill when users provide any of these patterns:
- `"create weekly report"`
- `"weekly report"`
- `"周报"`
- `"写周报"`
- `"创建周报"`

#### Instructions
Follow the complete workflow defined in [Create Weekly Report Skill Reference](references/daily-note/create-weekly-report-skill.md).

### Sync Feishu Records

#### When to Trigger?
Activate this skill when users provide any of these patterns:
- `"sync feishu records"`
- `"sync today's records"`
- `"同步飞书记录"`
- `"同步今日记录"`
- `"fetch feishu daily records"`

#### Instructions
Follow the complete workflow defined in [Sync Feishu Records Skill Reference](references/daily-note/sync-feishu-records-skill.md).
