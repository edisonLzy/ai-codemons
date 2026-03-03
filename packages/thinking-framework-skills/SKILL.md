---
name: thinking-framework-skills
description: 基于 Obsidian 知识树框架，按路由分发到“创建主题节点”与“在指定主题创建果实”两个子技能。
---

# Thinking Framework Skills Router

## 概述

该技能用于维护基于 Obsidian 的知识树结构。每个主题目录都是一个节点，标准结构包含：
- `README.md`：节点入口（定义、边界、子主题索引）
- `FAQ.md`：碎片经验池（反常识、踩坑、短问题）

当内容形成完整体系时，才创建“果实”`*.md` 文件。

## 路由规则

根据用户意图选择一个子技能执行：

1. **创建 topic 的 subskill**
   - 触发条件：用户要新增主题/子主题目录、初始化节点结构。
   - 执行文档：`references/create-topic-subskill.md`

2. **在指定 topic 创建果实的 subskill**
   - 触发条件：用户已指定某个 topic，且要新增一个完整知识点文档（果实）。
   - 执行文档：`references/create-fruit-in-topic-subskill.md`

如果用户意图不明确，先提问澄清后再路由。

## 全局约束

- 严格遵循知识树最小结构：主题目录至少有 `README.md` + `FAQ.md`。
- 不创建空壳果实：仅在内容足够完整时创建 `*.md`。
- `README.md` 应包含一句话定义、目标边界、子主题索引（MOC）。
- `FAQ.md` 用于沉淀细碎且未成体系内容，避免滥建文档。
