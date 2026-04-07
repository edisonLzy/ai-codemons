---
name: optimize-topic-files
description: Apply Obsidian-flavoured formatting to a topic node's README.md, FAQ.md, and content knowledge-point files using standard templates.
---

# Optimize Topic Files

## Framework Context

This skill operates within the Obsidian-based knowledge tree framework. See [Thinking Framework](../SKILL.md) for the full framework definition including directory structure, file specifications, and naming conventions.

## Configuration Management

Before executing this skill, verify the required configuration is set.

### Configuration Check Flow

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
6. **Parse Validation Result**:
   ```json
   {
     "valid": true|false,
     "key": "obsidian_vault_path",
     "message": "Path exists" | "Path does not exist",
     "path": "/Users/xxx/Obsidian Vault"
   }
   ```
7. **If Invalid** (`valid: false`): Ask the user to provide a valid path, then repeat steps 4–6 until valid.
8. **Load to Context**: Use the validated `obsidian_vault_path` in subsequent steps.

## Instructions

Follow the complete workflow defined in [Optimize Topic Files Skill Reference](../references/optimize-topic-files-skill.md).
