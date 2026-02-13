# AI Workflow Suite

一个面向 AI 开发者的工作流工具集 Monorepo，旨在通过 MCP (Model Context Protocol) 服务器和 Agent Skills 扩展 AI 助手与外部服务的交互能力。

## ✨ 特性

- 🔧 **TypeScript 优先** — 完整的类型支持和 IntelliSense
- 📦 **Monorepo 架构** — pnpm workspace 管理多个独立发布的子包
- 🔐 **安全认证** — 内置凭据管理和 OAuth 流程
- 📱 **多客户端兼容** — 支持 Cursor、Claude Desktop、Gemini 等 MCP 客户端
- 🛠️ **开发友好** — 热重载、测试套件、代码检查一应俱全

## 📦 子包

| 包 | 版本 | 描述 |
|----|------|------|
| [@codemons/mcp-servers](./packages/mcp-servers/) | `0.7.0` | 统一的 MCP 服务器 CLI 工具，集成飞书、Figma、Git 工作流、Excel 等服务 |
| [@codemons/agent-skills](./packages/agent-skills/) | `0.1.0` | Agent 技能扩展包 |

### 🚀 MCP Servers

提供一系列高质量的 MCP 服务器，让 AI 助手能够与各种外部平台进行交互：

| 服务器 | 描述 | 认证 |
|--------|------|------|
| **Feishu MCP** | 飞书/Lark 集成 — Wiki、文档、多维表格、画板 | 🔐 OAuth |
| **Figma MCP** | Figma 设计工具 — 文件管理、节点查询、团队协作 | 🔐 Token |
| **Prompts MCP** | Git/GitHub 工作流提示 — 代码审查、MR 创建、Commit 规范 | ✅ 无需认证 |
| **XLSX MCP** | Excel 文件读取 — 条件查询、合并单元格处理 | ✅ 无需认证 |
| **NoteBeam MCP** | NoteBeam 高亮和笔记集成 | 🔐 Token |

👉 查看 [MCP Servers 完整文档](./packages/mcp-servers/README.md) 了解详情。

### 🧩 Agent Skills

Agent 技能扩展包，为 AI Agent 提供可复用的能力模块（开发中）。

> [!TIP]
> 推荐使用 [vercel-labs/skills](https://github.com/vercel-labs/skills) 来管理 Skills。它提供了标准化的 Skill 定义、发布和分发流程，可以更方便地组织和复用 AI Agent 的能力模块。

## 🚀 快速开始

### 系统要求

- Node.js 18+
- pnpm 10+

### 安装

```bash
git clone https://github.com/edisonLzy/ai-workflow-suite.git
cd ai-workflow-suite
pnpm install
```

### 使用 MCP Servers

```bash
# 全局安装
npm install -g @codemons/mcp-servers

# 查看所有可用服务器
codemons-mcp list

# 运行指定服务器
codemons-mcp feishu-mcp

# 或通过 npx 直接使用
npx -y @codemons/mcp-servers feishu-mcp
```

## 🛠️ 开发命令

```bash
# 构建所有子包
pnpm build

# 并行开发模式
pnpm dev

# 代码检查
pnpm lint
pnpm lint:fix

# 运行测试
pnpm test
pnpm coverage
```

## 📁 项目结构

```
ai-workflow-suite/
├── packages/
│   ├── mcp-servers/          # MCP 服务器 CLI 工具
│   │   ├── src/
│   │   │   ├── cli.ts        # CLI 主入口
│   │   │   ├── commands/     # CLI 命令实现
│   │   │   └── mcp-servers/  # 各 MCP 服务器模块
│   │   └── README.md
│   └── agent-skills/         # Agent 技能扩展包
├── COMMIT_CONVENTION.md      # 提交规范
├── eslint.config.mjs         # ESLint 配置
├── vitest.config.ts          # Vitest 配置
├── tsconfig.base.json        # TypeScript 基础配置
└── pnpm-workspace.yaml       # pnpm 工作区配置
```

## 🏗️ 技术栈

- **语言**: TypeScript (严格模式)
- **包管理**: pnpm workspace
- **运行时**: Node.js 18+
- **协议**: Model Context Protocol (MCP)
- **测试**: Vitest
- **代码检查**: ESLint + @stylistic
- **Git 钩子**: Husky + lint-staged
- **提交规范**: [Conventional Commits](./COMMIT_CONVENTION.md)
- **版本管理**: Changesets

## 📋 项目规范

- 提交信息遵循 [Conventional Commits](./COMMIT_CONVENTION.md) 规范
- 代码风格由 ESLint 统一管理（单引号、2 空格缩进）
- 提交前自动运行 lint-staged 检查

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支：`git checkout -b feature/amazing-feature`
3. 遵循代码规范，确保通过 ESLint 和测试
4. 提交更改：使用 [Conventional Commits](./COMMIT_CONVENTION.md) 格式
5. 推送并创建 Pull Request

## 📄 许可证

[MIT](LICENSE)

---

**🎉 感谢使用 AI Workflow Suite！**

如果这个项目对你有帮助，请考虑给我们一个 ⭐ Star！
