# MCP Servers 仓库

一个统一的 Model Context Protocol (MCP) 服务器 CLI 工具，为各种第三方平台提供无缝集成能力。

## 🎯 项目概览

本项目提供了一系列高质量的 MCP 服务器，让 AI 助手能够与各种外部服务和平台进行交互。所有 MCP 服务器都被组织为单一包架构中的模块，通过统一的 CLI 工具进行管理和运行。

### 🚀 支持的服务器

| 服务器 | 描述 | 主要功能 | 认证 |
|--------|------|----------|------|
| **[Feishu MCP](#-feishu-mcp)** | 飞书/Lark 集成服务器 | Wiki 管理、文档操作、多维表格、画板、Prompts | 🔐 OAuth |
| **[Figma MCP](#-figma-mcp)** | Figma 设计工具集成 | 文件管理、节点查询、团队协作 | 🔐 Token |
| **[Prompts MCP](#-prompts-mcp)** | Git/GitHub 工作流提示 | 代码审查、MR 创建、Commit 规范 | ✅ 无需认证 |

## ✨ 特性

- 🔧 **TypeScript 优先**: 完整的类型支持和 IntelliSense
- 🏗️ **单一包架构**: 统一的 CLI 工具管理所有 MCP 服务器
- 🔐 **安全认证**: 内置安全的凭据管理和 OAuth 流程
- 🛠️ **开发友好**: 热重载、测试套件和代码检查
- 📱 **多客户端支持**: 兼容 Cursor、Claude Desktop 等 MCP 客户端
- 🎯 **错误处理**: 全面的错误处理和用户友好的错误消息
- 🔍 **调试工具**: 内置 MCP Inspector 支持，方便调试和开发

## 🚀 快速开始

### 系统要求

- Node.js 18+
- pnpm 包管理器

### 全局安装（推荐）

```bash
# 使用 npm 全局安装
npm install -g @codemons/mcp-servers

# 或使用 pnpm
pnpm add -g @codemons/mcp-servers
```

安装后，你可以直接使用 `codemons-mcp` 命令：

```bash
# 查看所有可用的 MCP 服务器
codemons-mcp list

# 认证并配置服务器
codemons-mcp auth <server-name>

# 运行 MCP 服务器
codemons-mcp <server-name>

# 使用 Inspector 调试
codemons-mcp inspector <server-name>
```

### 开发安装

```bash
# 克隆仓库
git clone https://github.com/edisonLzy/mcp-servers.git
cd mcp-servers

# 安装依赖
pnpm install

# 使用开发命令
pnpm dev:cli list
```

## 📦 各服务器详细介绍

### 📱 Feishu MCP

功能完整的飞书/Lark 集成服务器，支持 Wiki、文档、多维表格和画板管理。

**主要功能:**
- **Wiki 管理**: 列表、浏览、创建和搜索 wiki 空间和节点
- **文档操作**: 创建、读取、更新和删除飞书文档块
- **多维表格**: 查询和管理多维表格数据
- **画板管理**: 获取画板主题和节点信息
- **Prompts**: 内置学习笔记整理、英语语法分析等工作流
- **认证管理**: 安全的令牌管理和自动 OAuth 流程

**核心工具:**
- Wiki: `list-wiki-spaces`, `get-space-nodes`, `create-wiki-node`, `search-wiki`, `get-node-info`
- 文档: `get-document-blocks`, `get-document-raw-content`, `update-document-block`, `delete-document-blocks`, `create-document-blocks`, `convert-content-to-blocks`
- 多维表格: `list-bitables`, `get-bitable-records`, `search-bitable-records`
- 画板: `get-board-theme`, `get-board-nodes`, `create-board-nodes`

**使用方法:**
```bash
# 认证配置
codemons-mcp auth feishu-mcp

# 运行服务器
codemons-mcp feishu-mcp

# 调试模式
codemons-mcp inspector feishu-mcp
```

### 🎨 Figma MCP

专为 Figma 设计工具打造的集成服务器，支持文件和节点管理。

**主要功能:**
- **文件管理**: 获取和列出 Figma 文件
- **节点操作**: 查询单个或多个设计节点
- **团队协作**: 列出团队和项目信息
- **配置管理**: 安全的 Token 存储

**可用工具:**
- `get-file`: 获取 Figma 文件详情
- `list-files`: 列出项目中的所有文件
- `get-node`: 获取特定节点信息
- `get-nodes`: 批量获取多个节点
- `list-teams`: 列出可访问的团队
- `list-projects`: 列出团队中的项目

**使用方法:**
```bash
# 配置 Figma Token
codemons-mcp auth figma-mcp

# 运行服务器
codemons-mcp figma-mcp
```

### 🔄 Prompts MCP

提供 Git 和 GitHub 工作流的最佳实践提示，帮助开发者遵循规范的开发流程。

**主要功能:**
- **Git Commit 规范**: 标准化的提交信息工作流
- **代码审查**: GitHub PR 代码审查流程
- **MR 创建**: 自动化的 Merge Request 创建流程
- **Git Worktree**: 多分支并行开发工作流
- **需求管理**: 开发需求整理和管理

**可用 Prompts:**
- `git-commit-workflow`: Git 提交规范工作流
- `gh-code-review`: GitHub 代码审查流程
- `gh-create-mr`: 创建 Merge Request
- `gh-auto-mr-flow`: 自动化 MR 流程
- `git-worktree-development`: Git Worktree 开发流程

**使用方法:**
```bash
# 直接运行（无需认证）
codemons-mcp prompts-mcp
```

## 🛠️ 开发指南

### 项目结构

```
mcp-servers/
├── src/
│   ├── cli.ts                  # CLI 主入口
│   ├── commands/               # CLI 命令实现
│   │   ├── list.ts            # 列出可用服务器
│   │   ├── run.ts             # 运行服务器
│   │   ├── auth.ts            # 认证配置
│   │   └── inspector.ts       # 调试工具
│   ├── mcp-servers/           # MCP 服务器模块
│   │   ├── feishu-mcp/        # 飞书集成
│   │   ├── figma-mcp/         # Figma 集成
│   │   ├── prompts-mcp/       # Git/GitHub 提示
│   │   └── index.ts           # 服务器注册和加载
│   ├── types.ts               # 类型定义
│   └── config-store.ts        # 配置管理
├── tests/                     # 测试文件
├── scripts/                   # 构建和工具脚本
├── package.json               # 项目依赖
└── tsconfig.json              # TypeScript 配置
```

### 开发命令

```bash
# 安装所有依赖
pnpm install

# 运行代码检查
pnpm lint

# 修复代码格式
pnpm lint:fix

# 运行所有测试
pnpm test

# 生成测试覆盖率报告
pnpm coverage

# 开发模式运行 CLI
pnpm dev:cli <command>
```

### CLI 命令用法

```bash
# 列出所有可用的 MCP 服务器
pnpm dev:cli list

# 认证和配置服务器
pnpm dev:cli auth feishu-mcp
pnpm dev:cli auth figma-mcp

# 运行 MCP 服务器
pnpm dev:cli feishu-mcp
pnpm dev:cli figma-mcp
pnpm dev:cli prompts-mcp

# 使用 MCP Inspector 调试
pnpm dev:cli inspector feishu-mcp

# 启用详细日志
pnpm dev:cli feishu-mcp --verbose
```

### 创建新的 MCP 服务器

1. 在 `src/mcp-servers/` 目录下创建新目录
2. 参考现有服务器的结构和模式
3. 确保包含必要的文件：
   - `index.ts` - 主入口文件，导出 `MCPServerOptions`
   - `tools/` - 工具实现目录
   - `README.md` - 服务器文档（可选）
   - `types/` - 类型定义（可选）
   - `auth/` - 认证模块（如需要）

**MCPServerOptions 接口:**
```typescript
interface MCPServerOptions {
  name: string;                    // 服务器名称
  description?: string;            // 服务器描述
  run: () => Promise<void>;        // 运行函数
  auth?: () => Promise<void>;      // 认证函数（可选）
  requiresAuth?: boolean;          // 是否需要认证
}
```

**示例实现:**
```typescript
// src/mcp-servers/example-mcp/index.ts
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import type { MCPServerOptions } from '../../types.js';

async function runExampleMCP(): Promise<void> {
  const server = new McpServer({
    name: 'example-mcp',
    version: '1.0.0'
  }, {
    capabilities: {
      tools: {}
    }
  });

  // 注册工具
  // server.tools(...)

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

const exampleMCPServer: MCPServerOptions = {
  name: 'example-mcp',
  description: 'Example MCP server',
  run: runExampleMCP,
  requiresAuth: false
};

export default exampleMCPServer;
```

## 🏗️ 技术栈

- **语言**: TypeScript
- **包管理**: pnpm
- **运行时**: Node.js 18+
- **MCP SDK**: @modelcontextprotocol/sdk
- **CLI 框架**: Commander.js
- **测试框架**: Vitest
- **代码检查**: ESLint + TypeScript ESLint
- **格式化**: Stylistic ESLint Plugin
- **Git 钩子**: Husky + lint-staged
- **提交规范**: Commitlint (Conventional Commits)
- **其他依赖**:
  - axios - HTTP 客户端
  - inquirer - 交互式命令行
  - zod - Schema 验证
  - dotenv - 环境变量管理

## 🔧 支持的 MCP 客户端

本项目的服务器兼容以下 MCP 客户端：

- **Cursor**: 项目级和全局安装
- **Claude Desktop**: 通过手动配置支持
- **其他支持 MCP 协议的客户端**

### 配置示例

#### Cursor 配置

在项目根目录创建或编辑 `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "feishu": {
      "command": "codemons-mcp",
      "args": ["feishu-mcp"],
      "type": "stdio"
    },
    "figma": {
      "command": "codemons-mcp",
      "args": ["figma-mcp"],
      "type": "stdio"
    },
    "prompts": {
      "command": "codemons-mcp",
      "args": ["prompts-mcp"],
      "type": "stdio"
    },
  }
}
```

#### Claude Desktop 配置

编辑 Claude Desktop 的配置文件：
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "feishu": {
      "command": "codemons-mcp",
      "args": ["feishu-mcp"]
    },
    "figma": {
      "command": "codemons-mcp",
      "args": ["figma-mcp"]
    },
    "prompts": {
      "command": "codemons-mcp",
      "args": ["prompts-mcp"]
    },
  }
}
```

#### 开发环境配置

如果你在开发模式下，可以直接指向源文件：

```json
{
  "mcpServers": {
    "feishu": {
      "command": "pnpm",
      "args": ["--dir", "/path/to/mcp-servers", "dev:cli", "feishu-mcp"],
      "type": "stdio"
    }
  }
}
```

## 🤝 贡献指南

我们欢迎任何形式的贡献！请遵循以下步骤：

1. **Fork 项目**
2. **创建功能分支**: `git checkout -b feature/amazing-feature`
3. **遵循代码规范**: 确保通过 ESLint 检查
4. **添加测试**: 为新功能添加相应的测试用例
5. **提交更改**: 使用规范的提交信息（见下文）
6. **推送分支**: `git push origin feature/amazing-feature`
7. **创建 Pull Request**

### 提交信息规范

本项目使用 [Conventional Commits](https://conventionalcommits.org/) 规范：

```bash
feat: 添加新功能
fix: 修复 bug
docs: 更新文档
style: 代码格式调整（不影响功能）
refactor: 代码重构
test: 添加或修改测试
chore: 构建过程或辅助工具的变动
perf: 性能优化
ci: CI/CD 配置变更
```

**示例:**
```bash
feat(feishu-mcp): 添加多维表格搜索功能
fix(mcp-server): 修复服务解析错误
docs: 更新 README 安装说明
```

### 代码规范

- 使用 TypeScript 严格模式
- 遵循 ESLint 配置规则
- 保持测试覆盖率
- 添加必要的文档和注释
- 使用有意义的变量和函数名
- 单引号字符串，2 空格缩进
- 导入语句按字母顺序排列

## 📄 许可证

本项目使用 [MIT](LICENSE) 许可证。

## 🆘 获取帮助

- **问题报告**: [GitHub Issues](https://github.com/edisonLzy/mcp-servers/issues)
- **功能请求**: [GitHub Discussions](https://github.com/edisonLzy/mcp-servers/discussions)
- **文档**: 查看各个服务器目录下的 README 文件

## 🔄 更新日志

查看 [CHANGELOG.md](CHANGELOG.md) 了解版本更新历史。

## 📚 相关资源

- [Model Context Protocol 文档](https://modelcontextprotocol.io/)
- [MCP SDK 文档](https://github.com/modelcontextprotocol/typescript-sdk)
- [飞书开放平台](https://open.feishu.cn/)
- [Figma API 文档](https://www.figma.com/developers/api)

---

**🎉 感谢使用 MCP Servers！** 

如果这个项目对你有帮助，请考虑给我们一个 ⭐ Star！

