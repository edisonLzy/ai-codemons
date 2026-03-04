---
name: thinking-framework-skills
description: Obsidian-based knowledge tree framework for creating topic nodes.
---

# Thinking Framework Skills

## Overview

This skill maintains an Obsidian-based knowledge tree structure. Each topic directory is a node with a standard structure:
- `README.md`: Node entry point (definition, boundaries, subtopic index)
- `FAQ.md`: Fragmented experience pool (counter-intuitive learnings, pitfalls, quick questions)

Only create "fruit" `*.md` files when content forms a complete system.

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
5. **Load to Context**: Use the configuration value in subsequent workflows

### Configuration Scripts
- **Location**: `scripts/config-manager.ts`
- **Commands**:
  - `init` - Initialize config file
  - `get <key>` - Get config value
  - `set <key> <value>` - Set config value
  - `list` - List all config
  - `delete <key>` - Delete config key
  - `check <key>` - Check if config exists (JSON output)

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
