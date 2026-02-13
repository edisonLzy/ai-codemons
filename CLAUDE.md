# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI Workflow Suite is a monorepo containing MCP (Model Context Protocol) servers and Agent Skills for extending AI assistant capabilities with external services. Recently refactored from a multi-package architecture to a unified monorepo structure with two main packages:

- `@codemons/mcp-servers` - Unified CLI tool containing multiple MCP server implementations
- `@codemons/note-refining-skills` - Agent skill for note refinement and organization

## Development Commands

### Core Commands
- `pnpm build` - Build all packages in the monorepo
- `pnpm dev` - Start development mode for all packages in parallel
- `pnpm lint` - Run ESLint across entire codebase
- `pnpm lint:fix` - Run ESLint with auto-fix
- `pnpm test` - Run all tests using Vitest
- `pnpm test:watch` - Run tests in watch mode
- `pnpm coverage` - Generate test coverage reports

### MCP Servers CLI Usage
- `codemons-mcp list` - List all available MCP servers
- `codemons-mcp <server-name>` - Run specific MCP server (e.g., `feishu-mcp`, `figma-mcp`)
- `codemons-mcp auth <server-name>` - Authenticate with specific server
- `codemons-mcp inspector <server-name>` - Run server with MCP inspector for debugging

### Package-Level Development
- `pnpm -F @codemons/mcp-servers build` - Build only MCP servers package
- `pnpm -F @codemons/mcp-servers dev` - Develop MCP servers package
- `pnpm -F @codemons/mcp-servers dev:cli` - Run CLI in development mode using tsx

## Architecture

### Monorepo Structure
```
packages/
├── mcp-servers/              # Unified MCP Servers CLI
│   ├── src/
│   │   ├── cli.ts           # Main CLI entry point
│   │   ├── commands/        # CLI command implementations
│   │   ├── mcp-servers/     # All MCP server modules
│   │   │   ├── feishu-mcp/  # Feishu/Lark integration
│   │   │   ├── figma-mcp/   # Figma design tools
│   │   │   ├── prompts-mcp/ # Git/GitHub workflow prompts
│   │   │   ├── xlsx-mcp/    # Excel file processing
│   │   │   └── note-beam-mcp/ # NoteBeam integration
│   │   └── types.ts         # Shared TypeScript interfaces
│   └── tsup.config.ts       # Build configuration
└── note-refining-skills/     # Agent skill for note refinement
    ├── SKILL.md             # Skill definition and instructions
    └── package.json
```

### MCP Server Module Pattern

Each MCP server follows a standardized module structure:
```
src/mcp-servers/{server-name}/
├── index.ts                 # Module entry exporting MCPServerOptions
├── tools/                   # MCP tool implementations
├── {serviceName}Client.ts   # External API client
├── auth/                    # Authentication (OAuth, token management)
├── types/                   # TypeScript type definitions
└── prompts/                 # MCP prompts (optional)
```

### Key Interfaces

```typescript
interface MCPServerOptions {
  name: string;
  description?: string;
  run: () => Promise<void>;
  auth?: () => Promise<void>;
  requiresAuth?: boolean;
}
```

## Code Conventions

### TypeScript Configuration
- Target: ES2022 with ESM modules
- Strict mode enabled with all strict checks
- No emit (type-checking only) at root level
- Individual packages handle their own compilation

### ESLint Rules
- Single quotes, 2-space indentation
- Padding lines between functions and exports
- Unused imports automatically removed
- Import ordering enforced (builtin → external → internal → relative)
- TypeScript consistent type imports required

### Naming Conventions
- MCP server directories: kebab-case (`feishu-mcp`)
- MCP tool names: kebab-case (`get-page-content`)
- Source files: camelCase (`getPageContent.ts`)
- CLI executables: Use `#!/usr/bin/env -S pnpx tsx` shebang

### Git Workflow
- Follows Conventional Commits (see `COMMIT_CONVENTION.md`)
- Pre-commit hooks run `lint-staged` with ESLint auto-fix
- Commit messages validated with commitlint
- Uses Changesets for version management

## MCP Server Implementation

### Server Setup Pattern
1. Create `McpServer` instance with name/version
2. Initialize external service clients
3. Register tools with Zod schema validation
4. Use `StdioServerTransport` for communication
5. Tool handlers return `{ content: [{ type: 'text', text: string }], isError?: boolean }`

### Authentication Patterns
- **OAuth Flow**: Feishu MCP uses complete OAuth with token refresh
- **Token-based**: Figma MCP uses simple API token authentication
- **Config Storage**: Use dedicated config stores for credential management
- **No Auth**: Prompts MCP and XLSX MCP require no authentication

## Testing Strategy

### Vitest Configuration
- Monorepo setup with projects discovery (`packages/*`)
- Coverage with v8 provider (text, JSON, HTML reports)
- Test files: `**/*.test.ts` and `tests/**/*.test.ts`
- Excludes: dist, node_modules, config files

### Test Organization
- Unit tests alongside source files
- Integration tests in `tests/` directories
- Use descriptive test names following `describe/it` pattern

## Key Dependencies

### MCP & Protocol
- `@modelcontextprotocol/sdk` - Core MCP functionality
- `@modelcontextprotocol/inspector` - Debugging tool

### Build & Development
- `tsup` - Fast TypeScript bundler (ESM output, copy .md files)
- `tsx` - Direct TypeScript execution
- `vitest` - Testing framework
- `pnpm` - Package manager with workspace support

### External Integrations
- `axios` - HTTP client for external APIs
- `zod` - Schema validation for tool parameters
- `commander` - CLI framework
- `inquirer` - Interactive CLI prompts

## Available MCP Servers

### feishu-mcp
- **Purpose**: Feishu/Lark integration (Wiki, Docs, Bitable, Board)
- **Auth**: OAuth flow with token refresh
- **Key Features**: Document management, multi-dimensional tables, collaborative boards

### figma-mcp
- **Purpose**: Figma design tool integration
- **Auth**: API token
- **Key Features**: File management, node inspection, team collaboration

### prompts-mcp
- **Purpose**: Git/GitHub workflow automation
- **Auth**: None required
- **Key Features**: Code review prompts, MR creation, commit workflows

### xlsx-mcp
- **Purpose**: Excel file processing
- **Auth**: None required
- **Key Features**: Conditional queries, merged cell handling

### note-beam-mcp
- **Purpose**: NoteBeam highlights integration
- **Auth**: API token
- **Key Features**: Highlight management and retrieval

## Agent Skills

### Skill 包目录结构

每个 Skill 作为独立 package 维护在 `packages/` 下，遵循以下标准结构：

```
packages/{skill-name}/
├── package.json          # 包定义（name: @codemons/{skill-name}）
├── tsconfig.json         # TypeScript 配置（rootDir 指向 scripts/）
├── SKILL.md              # 主指令文件（YAML frontmatter + Markdown 指令）
├── references/           # 子工作流参考文档
├── scripts/              # TypeScript 辅助脚本（如配置管理器）
└── store/
    └── config.json       # Skill 运行时配置存储
```

**各目录职责**：
- **SKILL.md** — Skill 的核心文件，包含 `name`/`description` 元数据和具体执行指令，Agent 读取此文件来理解如何执行 Skill
- **references/** — 子工作流或复杂步骤的详细参考文档，由 SKILL.md 引用
- **scripts/** — 辅助 TypeScript 脚本，供 Agent 在执行 Skill 时调用
- **store/** — 运行时配置和状态持久化

### 创建新 Skill

1. 在 `packages/` 下创建目录（命名：`{skill-name}`）
2. 创建 `package.json`（name: `@codemons/{skill-name}`），`files` 字段包含 `SKILL.md`、`references`、`scripts`、`store`
3. 创建 `tsconfig.json`，继承 `../../tsconfig.base.json`，`include` 指向 `scripts/**/*`
4. 编写 `SKILL.md`，包含 YAML frontmatter（`name`、`description`）和执行指令
5. 按需添加 `references/`、`scripts/`、`store/config.json`
6. 运行 `pnpm install` 使 workspace 识别新包

### note-refining-skills
- **Purpose**: Refine unstructured notes into organized, actionable documents
- **Structure**: Markdown skill definition in `SKILL.md`
- **Output Format**: Structured markdown with Summary, Key Points, Action Items, Decisions, Open Questions

## Development Tips

- Use `tsx` for direct TypeScript execution during development
- MCP Inspector available at `@modelcontextprotocol/inspector` for debugging
- All MCP servers auto-discovered from `src/mcp-servers/` directory structure
- CLI supports both global installation and npx usage
- Hot reload available in development mode with `pnpm dev`