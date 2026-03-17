# Subskill: Summary Daily Note

## Goal

Fetch today's highlights from codemo.asia, summarize them into a daily note (日报), and save it to the Obsidian vault using the thinking-framework-skills.

## Input

- **Date**: Optional - defaults to today
- **Target Location**: Optional - path in Obsidian to save the daily note

## Constraints

- Must fetch highlights from today only
- Daily note should follow a structured format
- Must integrate with thinking-framework-skills for saving

## Execution Steps

### 1. Validate CLI Availability

Execute:
```bash
codemons-cli --version
```

If fails, prompt user to install:
> Please install @codemons/cli: `npm install -g @codemons/cli`

### 2. Validate Authentication

Execute:
```bash
codemons-cli auth
```

If not logged in, prompt user to login:
> Please run `codemons-cli auth` to login first.

### 3. Determine Save Location

Ask user where to save the daily note:
- Option A: Output as markdown to copy/paste
- Option B: User provides a specific file path

### 4. Fetch Today's Highlights

Construct the query for today's date:
```bash
codemons-cli note -q '{"date":"2024-01-15"}'
```

Or without date filter to get recent highlights, then filter client-side:
```bash
codemons-cli note -q '{}'
```

Parse the output and filter highlights created today.

### 5. Group Highlights by Tag

Organize highlights into categories:
- **Important**: Key insights or critical information
- **Ideas**: Creative thoughts or suggestions
- **Questions**: Unresolved questions or doubts

### 6. Generate Daily Note

Create a structured daily note:

```markdown
---
title: 日报 2024-01-15
date: 2024-01-15
tags:
  - 日报
  - daily-note
cssclass:
  - daily-note
---

# 2024-01-15 日报

> [!abstract] 目录
> - [[#今日要点|今日要点]]
> - [[# Ideas | Ideas]]
> - [[# Questions | Questions]]
> - [[#总结|总结]]

---

## 今日要点

> [!important] 重要 insights

### Highlight 1
[Content with context]

### Highlight 2
[Content with context]

---

## Ideas

> [!tip] 想法

- [Idea 1]
- [Idea 2]

---

## Questions

> [!question] 待解答

- [Question 1]
- [Question 2]

---

## 总结

> [!success] 今日收获

1. [Summary point 1]
2. [Summary point 2]
3. [Summary point 3]

---

*Generated from codemo.asia highlights*
```

### 7. Save Daily Note

Option A: Output as markdown for user to copy/paste

Option B: Save to user-provided file path

### 8. Output Summary

```
✅ Daily note created!

📅 Date: 2024-01-15
📊 Highlights processed: X
   - Important: X
   - Ideas: X
   - Questions: X

📁 Saved to: {vault_path}/daily-notes/2024-01-15.md
```

## Sample CLI Query for Today's Highlights

```bash
# Get all highlights (then filter by today's date)
codemons-cli note -q '{}'

# Query format for date filter
codemons-cli note -q '{"created_after":"2024-01-15T00:00:00Z"}'
```

## Acceptance Criteria

- [ ] CLI is available and working
- [ ] User is authenticated
- [ ] Today's highlights fetched successfully
- [ ] Highlights grouped by tag (Important, Idea, Question)
- [ ] Daily note formatted correctly
- [ ] Daily note saved to user-specified location or output as markdown
- [ ] Clear summary output presented to user
