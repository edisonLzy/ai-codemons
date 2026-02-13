---
name: note-refining-skills
description: A skill for refining, restructuring, and improving notes to make them clearer and more actionable.
---

# Note Refining Skill

## Overview

This skill helps AI agents refine raw notes, meeting minutes, brainstorming dumps, and other unstructured text into well-organized, clear, and actionable documents.

## When to Use

- When the user asks to clean up, refine, or restructure their notes
- When processing raw meeting minutes or brainstorming outputs
- When converting unstructured text into structured formats

## Instructions

### Step 1: Analyze the Input

Read the raw note content and identify:
- **Key topics** — the main subjects discussed
- **Action items** — tasks or follow-ups mentioned
- **Decisions** — conclusions or agreements reached
- **Open questions** — unresolved items

### Step 2: Restructure

Reorganize the content into a clear structure:

1. **Summary** — A 1-2 sentence overview
2. **Key Points** — Bullet points of main topics, grouped by theme
3. **Action Items** — Each with owner (if mentioned) and deadline (if mentioned)
4. **Decisions** — What was decided and the rationale
5. **Open Questions** — Items that need follow-up

### Step 3: Refine Language

- Fix grammar and spelling
- Replace vague language with precise wording
- Remove redundancy and filler
- Maintain the original tone and intent

### Step 4: Output

Produce the refined note in clean Markdown format, preserving any original context that would be lost through over-simplification.

## Output Format

```markdown
# [Note Title]

## Summary
[1-2 sentence overview]

## Key Points
- [Point 1]
- [Point 2]

## Action Items
- [ ] [Task] — @[Owner] (Due: [Date])

## Decisions
- [Decision 1]: [Rationale]

## Open Questions
- [Question 1]
```

## Guidelines

- **Preserve intent** — Never change the meaning of the original content
- **Be concise** — Remove noise, keep signal
- **Stay neutral** — Do not add opinions or assumptions not present in the original
- **Ask for clarification** — If the original is ambiguous, ask the user before assuming
