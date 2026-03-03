# Subskill: 创建 Topic 节点

## 目标

在知识树中创建新的 topic（或子 topic）目录，并完成基础节点初始化。

## 输入

- 目标路径（父 topic 路径）
- 新 topic 名称
- topic 一句话定义
- 可选：初始子主题列表

## 执行步骤

1. 在指定父路径下创建新 topic 目录。
2. 在该目录创建 `README.md`，包含：
   - 主题一句话定义
   - 目标与边界（包含什么/不包含什么）
   - 子主题索引（MOC，使用 `[[子主题名/README.md]]`）
3. 在该目录创建 `FAQ.md`（可使用 `references/FAQ-template.md` 作为结构参考）。
4. 若用户提供初始子主题，按同样规范递归创建子主题目录及其 `README.md` / `FAQ.md`。

## 验收标准

- 新 topic 目录结构完整（至少含 `README.md` 与 `FAQ.md`）。
- `README.md` 能作为当前节点的路由入口。
- 未创建无内容占位的果实文件。
