# Query Note Payload

Sample payloads for `codemons-cli note` command.

## Supported Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `url` | string | Valid URL prefix filter |
| `tag` | string | One of: Question, Idea, Important, Vocabulary, Sentence |
| `startDate` | number | Unix timestamp in milliseconds |
| `endDate` | number | Unix timestamp in milliseconds |
| `limit` | number | Integer, min 1, max 200, default 200 |
| `offset` | number | Integer, min 0, default 0 |

## Example Payloads

### Get Highlights by URL

```bash
codemons-cli note -q '{"url":"https://codemo.asia/notes/xxx","tag":"Important"}'
```

### Get Today's Highlights

```bash
# Using startDate (today 00:00:00 local time)
# Calculate: new Date(new Date().setHours(0,0,0,0)).getTime()

# Method 1: Calculate dynamically in terminal
codemons-cli note -q "{\"startDate\":$(date -v0S +%s000)}"

# Method 2: Use a fixed timestamp (for 2026-03-17)
codemons-cli note -q '{"startDate":1773703200000}'
```

> Note: The timestamp depends on your timezone. Use Method 1 for accuracy.

### Get Today's Highlights by Tag

```bash
# Today's Important highlights
codemons-cli note -q "{\"startDate\":$(date -v0S +%s000),\"tag\":\"Important\"}"

# Today's Ideas
codemons-cli note -q "{\"startDate\":$(date -v0S +%s000),\"tag\":\"Idea\"}"

# Today's Questions
codemons-cli note -q "{\"startDate\":$(date -v0S +%s000),\"tag\":\"Question\"}"
```

### Get Recent Highlights

```bash
codemons-cli note -q '{}'
```

### Get Highlights by Tag

```bash
codemons-cli note -q '{"tag":"Idea"}'
```

### Get Highlights with Limit

```bash
codemons-cli note -q '{"limit":50,"offset":0}'
```

### Combined Query

```bash
codemons-cli note -q '{"url":"https://codemo.asia/","tag":"Question","startDate":1705276800000,"limit":10}'
```

## Tag Types

| Tag | Description |
|-----|-------------|
| `Question` | Unresolved questions, doubts, things to investigate |
| `Idea` | Creative thoughts, suggestions, innovative ideas |
| `Important` | Key insights, critical information, main takeaways |
| `Vocabulary` | New words, terms, definitions |
| `Sentence` | Notable sentences, quotes |

## Response Format

```json
{
  "highlights": [
    {
      "id": "hl_xxx",
      "content": "The user's highlight/note content",
      "tag": "Question|Idea|Important|Vocabulary|Sentence",
      "created_at": "2024-01-15T10:30:00Z",
      "url": "https://codemo.asia/notes/xxx"
    }
  ]
}
```
