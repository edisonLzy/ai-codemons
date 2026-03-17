---
name: note-refining-skills
description: Refine and optimize notes from codemo.asia into structured knowledge points.
---

# Note Refining Skills

## Overview

This skill refines and optimizes notes from codemo.asia into structured, high-quality knowledge documents. It integrates with the @codemons/cli tool to fetch highlights and content, then transforms them into organized knowledge points within the Obsidian knowledge framework.

## Prerequisites

### 1. CLI Availability Check

Before executing any subskill, verify that `codemons-cli` is available:

1. First try running `codemons-cli --version` directly
2. If not available, install it globally: `npm install -g @codemons/cli`
3. Verify installation: `codemons-cli --version`

### 2. Authentication Check

Verify that the user is logged in:

```bash
codemons-cli auth
```

If not logged in (no user info shown), prompt the user:

> You are not logged in to codemo.asia. Please run:
> ```bash
> codemons-cli auth
> ```
> Follow the instructions to complete login.

### 3. Configuration

This skill does not require any configuration. All inputs are provided by the user during execution.

---

## Sub Skills

### Deepin Page Content

**When to Trigger:**
- "deepin page content \<url\>"
- "deepin page \<url\>"
- "process page highlights \<url\>"
- "refine page content from \<url\>"
- "create knowledge from \<url\>"

**Instructions:**
Follow the complete workflow defined in [Deepin Page Content Skill Reference](references/deepin-page-content-skill.md).

### Summary Daily Note

**When to Trigger:**
- "summary daily note"
- "daily note summary"
- "today's note summary"
- "summarize today's notes"
- "daily digest"

**Instructions:**
Follow the complete workflow defined in [Summary Daily Note Skill Reference](references/summary-daily-note-skill.md).

---

## Integration with Thinking Framework

This skill integrates with [thinking-framework-skills](../thinking-framework-skills/SKILL.md):

1. **Convert Content to Knowledge Point**: After refining page content or daily notes, use the "Convert Content to Knowledge Point" subskill from thinking-framework-skills to save the refined content as a structured knowledge point.

2. **Optimize Topic Files**: After creating knowledge points, use the "Optimize Topic Files" subskill to ensure proper Obsidian formatting.

---

## Helper Commands

### Check CLI Status

```bash
# Check CLI version
codemons-cli --version

# Check auth status
codemons-cli auth

# Query highlights for a URL
codemons-cli note -q '{"url":"<url>"}'
```

