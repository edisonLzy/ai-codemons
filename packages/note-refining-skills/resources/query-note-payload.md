# Query Highlight Payload

Sample payloads for `codemons-cli highlight` command.

## Supported Query Parameters

| Parameter | Flag | Type | Description |
|-----------|------|------|-------------|
| `url` | `--url` | string | Filter by URL prefix |
| `tag` | `--tag` | string | One of: Question, Idea, Important, Vocabulary, Sentence |
| `startDate` | `--start-date` | number | Start date as Unix timestamp in milliseconds |
| `endDate` | `--end-date` | number | End date as Unix timestamp in milliseconds |
| `limit` | `--limit` | number | Integer, min 1, max 200, default 200 |
| `offset` | `--offset` | number | Integer, min 0, default 0 |

## CLI Usage Patterns

### Using Individual Flags (Recommended)

```bash
# Get highlights by URL
codemons-cli highlight --url https://codemo.asia/notes/xxx --tag Important

# Get today's highlights (use date script for accurate timestamps)
npx tsx scripts/date.ts today
# Then use the output timestamps with:
codemons-cli highlight --start-date <start> --end-date <end>

# Get highlights by tag
codemons-cli highlight --tag Question --limit 10

# Combined filters
codemons-cli highlight --url https://codemo.asia/ --tag Important --limit 50
```

### Using JSON Query

```bash
codemons-cli highlight --query '{"url":"https://codemo.asia/","tag":"Important"}'
```

## Tag Types

| Tag | Description |
|-----|-------------|
| `Important` | Key insights, critical information, main takeaways |
| `Idea` | Creative thoughts, suggestions, innovative ideas |
| `Question` | Unresolved questions, doubts, things to investigate |
| `Vocabulary` | New words, terms, definitions |
| `Sentence` | Notable sentences, quotes |

> Note: Tags are **case-sensitive** and must be capitalized.

## Response Format

```json
{
  "highlights": [
    {
      "id": "hl_xxx",
      "content": "The user's highlight/note content",
      "tag": "Important",
      "created_at": "2024-01-15T10:30:00Z",
      "url": "https://codemo.asia/notes/xxx"
    }
  ]
}
```

## Quick Reference

```bash
# Today's highlights (use date script)
npx tsx scripts/date.ts today

# Last 3 days highlights
npx tsx scripts/date.ts t-3

# Recent highlights (all tags)
codemons-cli highlight --limit 50
```
