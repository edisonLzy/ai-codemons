# Subskill: 在指定 Topic 创建果实

## 目标

在指定 topic 下创建一个有完整内容的知识点文档（果实 `*.md`）。

## 输入

- topic 路径
- 果实文件名（知识点名称）
- 果实正文内容
- 可选：tags / status 等 frontmatter 元数据

## 执行步骤

1. 确认目标 topic 目录存在且为合法知识树节点（建议含 `README.md` 与 `FAQ.md`）。
2. 校验内容是否足够形成独立知识点；若内容过碎，建议写入该 topic 的 `FAQ.md`。
3. 在 topic 下创建果实文件 `<知识点名称>.md`，建议包含 YAML Frontmatter：
   - `title`
   - `tags`
   - `status`
4. 将正文写入果实文件，保证主题集中、结构清晰。
5. 视需要在该 topic 的 `README.md` 或 `FAQ.md` 中加入双链引用（如 `[[果实文件名]]`）。

## 验收标准

- 果实文件位于指定 topic 下。
- 文件内容完整且非空壳。
- 与 `FAQ.md` 的职责边界清晰：果实用于完整体系，FAQ 用于碎片经验。
