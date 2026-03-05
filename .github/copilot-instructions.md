# Copilot Instructions for AI Workflow Suite

## Build, test, and lint commands

- Install dependencies: `pnpm install`
- Build all packages: `pnpm build`
- Lint all workspaces: `pnpm lint`
- Auto-fix lint issues: `pnpm lint:fix`
- Run all tests: `pnpm test`
- Watch tests: `pnpm test:watch`
- Coverage report: `pnpm coverage`

Single-test execution examples:

- Run one test file from repo root (Vitest projects mode):  
  `pnpm test -- --project mcp-servers packages/mcp-servers/tests/index.test.ts`
- Run one package test file directly:  
  `pnpm -F @codemons/mcp-servers test -- tests/index.test.ts`

Useful package-level commands:

- Build MCP CLI package only: `pnpm -F @codemons/mcp-servers build`
- Run MCP CLI in dev mode: `pnpm -F @codemons/mcp-servers dev:cli -- list`

## High-level architecture

This repository is a pnpm monorepo with two product areas:

1. `@codemons/mcp-servers` (runtime CLI + MCP servers)
2. Agent skill packages (e.g. `@codemons/note-refining-skills`, `@codemons/thinking-framework-skills`)

### MCP servers package (`packages/mcp-servers`)

- Entry point: `src/cli.ts` (Commander-based CLI)
- CLI flow:
  - `list` -> `src/commands/list.ts`
  - `auth <server>` -> `src/commands/auth.ts`
  - `inspector <server>` -> `src/commands/inspector.ts`
  - `<server-name>` -> `src/commands/run.ts` -> `src/runner.ts`
- Server loading is dynamic via `src/mcp-servers/index.ts`, which scans `src/mcp-servers/*/index.ts` and imports each module.
- Each server module default-exports an `MCPServerOptions` object from `src/types.ts` (`name`, `run`, optional `auth`, optional `requiresAuth`).

### Agent skill packages

- Skill packages are content-first packages centered on `SKILL.md`.
- Typical package structure: `SKILL.md`, `references/`, `scripts/`, `store/`.
- They are part of the workspace and published as independent packages.

## Key repository conventions

- Use `pnpm` for all workspace/package commands.
- Naming pattern for MCP server implementation:
  - server directory: kebab-case (example: `feishu-mcp`)
  - tool/prompt names: kebab-case
  - source files: camelCase
- In MCP server modules:
  - initialize `McpServer`
  - register tools/prompts
  - connect with `StdioServerTransport`
  - tool handlers return MCP content shape (`{ content: [{ type: 'text', text: ... }], isError?: boolean }`)
- Keep exported server `name` aligned with directory key usage; tests assert that loaded key and config name match.
- Authentication contract:
  - set `requiresAuth: true` for servers needing auth
  - provide `auth` implementation so `codemons-mcp auth <server>` works
- Lint/style rules are enforced via ESLint config:
  - single quotes, semicolons, 2-space indent
  - import ordering (`builtin -> external -> internal -> relative`)
  - remove unused imports
  - prefer `import type` where applicable
- Commit workflow conventions are enforced by tooling:
  - Conventional Commits via commitlint
  - pre-commit linting via husky + lint-staged (`pnpm eslint --fix` on staged `*.js,*.ts`)
