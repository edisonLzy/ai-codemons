# MCP Servers 安装配置指南

本文档为大语言模型（LLM）提供 MCP 服务器的安装和配置说明。

## 可用的 MCP 服务器

| 服务器名称 | 描述 | 需要认证 |
|-----------|------|---------|
| `feishu-mcp` | 飞书/Lark 集成 | 是 |
| `figma-mcp` | Figma 设计工具集成 | 是 |
| `prompts-mcp` | Git/GitHub 工作流提示 | 否 |
| `xlsx-mcp` | Excel 文件读取工具 | 否 |
| `note-beam-mcp` | NoteBeam 高亮和笔记集成 | 是 |

## 使用方式

通过 `npx @codemons/mcp-servers` 直接调用，无需全局安装。

## MCP 客户端配置

### Cursor

配置文件位置：项目根目录 `.cursor/mcp.json`

```json
{
  "mcpServers": {
    "feishu": {
      "command": "npx",
      "args": ["-y", "@codemons/mcp-servers", "feishu-mcp"],
      "type": "stdio"
    },
    "figma": {
      "command": "npx",
      "args": ["-y", "@codemons/mcp-servers", "figma-mcp"],
      "type": "stdio"
    },
    "prompts": {
      "command": "npx",
      "args": ["-y", "@codemons/mcp-servers", "prompts-mcp"],
      "type": "stdio"
    },
    "xlsx": {
      "command": "npx",
      "args": ["-y", "@codemons/mcp-servers", "xlsx-mcp"],
      "type": "stdio"
    },
    "note-beam": {
      "command": "npx",
      "args": ["-y", "@codemons/mcp-servers", "note-beam-mcp"],
      "type": "stdio",
      "env": {
        "NOTE_BEAM_API_URL": "http://localhost:3000",
        "NOTE_BEAM_EMAIL": "your_email@example.com",
        "NOTE_BEAM_PASSWORD": "your_password"
      }
    }
  }
}
```

### Claude Desktop

配置文件位置：
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "feishu": {
      "command": "npx",
      "args": ["-y", "@codemons/mcp-servers", "feishu-mcp"]
    },
    "figma": {
      "command": "npx",
      "args": ["-y", "@codemons/mcp-servers", "figma-mcp"]
    },
    "prompts": {
      "command": "npx",
      "args": ["-y", "@codemons/mcp-servers", "prompts-mcp"]
    },
    "xlsx": {
      "command": "npx",
      "args": ["-y", "@codemons/mcp-servers", "xlsx-mcp"]
    },
    "note-beam": {
      "command": "npx",
      "args": ["-y", "@codemons/mcp-servers", "note-beam-mcp"],
      "env": {
        "NOTE_BEAM_API_URL": "http://localhost:3000",
        "NOTE_BEAM_EMAIL": "your_email@example.com",
        "NOTE_BEAM_PASSWORD": "your_password"
      }
    }
  }
}
```

### Gemini (with Code artifact)

配置文件位置：根据 Gemini Code artifact 的配置方式

```json
{
  "mcpServers": {
    "feishu": {
      "command": "npx",
      "args": ["-y", "@codemons/mcp-servers", "feishu-mcp"]
    },
    "figma": {
      "command": "npx",
      "args": ["-y", "@codemons/mcp-servers", "figma-mcp"]
    },
    "prompts": {
      "command": "npx",
      "args": ["-y", "@codemons/mcp-servers", "prompts-mcp"]
    },
    "xlsx": {
      "command": "npx",
      "args": ["-y", "@codemons/mcp-servers", "xlsx-mcp"]
    },
    "note-beam": {
      "command": "npx",
      "args": ["-y", "@codemons/mcp-servers", "note-beam-mcp"],
      "env": {
        "NOTE_BEAM_API_URL": "http://localhost:3000",
        "NOTE_BEAM_EMAIL": "your_email@example.com",
        "NOTE_BEAM_PASSWORD": "your_password"
      }
    }
  }
}
```

### Cline (VS Code Extension)

配置文件位置：VS Code 设置中的 Cline MCP Servers 配置

```json
{
  "mcpServers": {
    "feishu": {
      "command": "npx",
      "args": ["-y", "@codemons/mcp-servers", "feishu-mcp"]
    },
    "figma": {
      "command": "npx",
      "args": ["-y", "@codemons/mcp-servers", "figma-mcp"]
    },
    "prompts": {
      "command": "npx",
      "args": ["-y", "@codemons/mcp-servers", "prompts-mcp"]
    },
    "xlsx": {
      "command": "npx",
      "args": ["-y", "@codemons/mcp-servers", "xlsx-mcp"]
    },
    "note-beam": {
      "command": "npx",
      "args": ["-y", "@codemons/mcp-servers", "note-beam-mcp"],
      "env": {
        "NOTE_BEAM_API_URL": "http://localhost:3000",
        "NOTE_BEAM_EMAIL": "your_email@example.com",
        "NOTE_BEAM_PASSWORD": "your_password"
      }
    }
  }
}
```

## 认证配置

### feishu-mcp

方式 1: 环境变量
```json
{
  "command": "npx",
  "args": ["-y", "@codemons/mcp-servers", "feishu-mcp"],
  "env": {
    "FEISHU_APP_ID": "your_app_id",
    "FEISHU_APP_SECRET": "your_app_secret"
  }
}
```

方式 2: 先运行认证
```bash
npx -y @codemons/mcp-servers auth feishu-mcp
```

### figma-mcp

方式 1: 环境变量
```json
{
  "command": "npx",
  "args": ["-y", "@codemons/mcp-servers", "figma-mcp"],
  "env": {
    "FIGMA_TOKEN": "your_figma_token"
  }
}
```

方式 2: 先运行认证
```bash
npx -y @codemons/mcp-servers auth figma-mcp
```

### note-beam-mcp

必须通过环境变量配置：
```json
{
  "command": "npx",
  "args": ["-y", "@codemons/mcp-servers", "note-beam-mcp"],
  "env": {
    "NOTE_BEAM_API_URL": "http://localhost:3000",
    "NOTE_BEAM_EMAIL": "your_email@example.com",
    "NOTE_BEAM_PASSWORD": "your_password"
  }
}
```

### prompts-mcp 和 xlsx-mcp

无需认证，直接使用即可。

## 可用工具快速参考

### feishu-mcp
- Wiki: `list-wiki-spaces`, `get-space-nodes`, `create-wiki-node`, `search-wiki`
- 文档: `get-document-blocks`, `update-document-block`, `create-document-blocks`
- 多维表格: `list-bitable-tables`, `get-bitable-records`, `create-bitable-record`
- 画板: `get-board-nodes`, `create-board-nodes`

### figma-mcp
- `get-file`, `list-files`, `get-node`, `get-nodes`, `list-teams`

### prompts-mcp
- Git/GitHub 工作流提示（无需实际工具调用）

### xlsx-mcp
- `list-sheet-from-file`, `get-records-from-sheet`

### note-beam-mcp
- `list-highlights`

## 命令行用法

```bash
# 列出所有可用服务器
npx -y @codemons/mcp-servers list

# 认证
npx -y @codemons/mcp-servers auth feishu-mcp
npx -y @codemons/mcp-servers auth figma-mcp

# 运行服务器（独立使用）
npx -y @codemons/mcp-servers feishu-mcp
npx -y @codemons/mcp-servers figma-mcp
npx -y @codemons/mcp-servers prompts-mcp
npx -y @codemons/mcp-servers xlsx-mcp
npx -y @codemons/mcp-servers note-beam-mcp

# 调试模式
npx -y @codemons/mcp-servers inspector feishu-mcp
```

## 常见问题

### Q: npx 执行速度慢
A: 首次运行会下载包，后续会使用缓存。`-y` 参数跳过确认提示。

### Q: 认证信息存储位置
A: 飞书和 Figma 的认证信息会存储在本地配置文件中，无需每次配置。

### Q: 环境变量优先级
A: 配置文件中的 `env` 字段优先级最高，其次是系统环境变量。

## 更多信息

- **完整文档**: [README.md](./README.md)
- **项目仓库**: https://github.com/edisonLzy/mcp-servers
