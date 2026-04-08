# Configuration Check Flow

## Required Configuration

This skill requires the following configuration, stored in `store/config.json`:

| Key | Description | Example |
|-----|-------------|---------|
| `obsidian_vault_path` | Root path of Obsidian vault | `/Users/evan/Obsidian/Vaults/knowledge` |

## Check Flow

Before executing any sub-skill that depends on configuration:

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
6. **Parse Validation Result**: Check if path exists:
   ```json
   {
     "valid": true|false,
     "key": "obsidian_vault_path",
     "message": "Path exists" | "Path does not exist",
     "path": "/Users/xxx/Obsidian Vault"
   }
   ```
7. **If Invalid** (`valid: false`): Ask the user:
   > The configured path `{path}` does not exist. Please provide a valid Obsidian vault path.
8. **Reconfigure**: Run `bun scripts/config-manager.ts set obsidian_vault_path <new_path>` with the new path
9. **Validate Again**: Repeat steps 5–8 until a valid path is provided
10. **Load to Context**: Use the validated configuration value in subsequent workflows

## Configuration Scripts

- **Location**: `scripts/config-manager.ts`
- **Commands**:
  - `init` - Initialize config file
  - `get <key>` - Get config value
  - `set <key> <value>` - Set config value
  - `list` - List all config
  - `delete <key>` - Delete config key
  - `check <key>` - Check if config exists (JSON output)
  - `validate <key>` - Validate if configured path exists (JSON output)
