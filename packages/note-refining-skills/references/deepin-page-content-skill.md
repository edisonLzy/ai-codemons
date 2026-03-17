# Subskill: Deepin Page Content

## Goal

Fetch highlights from a URL using @codemons/cli, retrieve the page content via web fetch, combine them with user insights, and output high-quality refined note content. Optionally save as a knowledge point using thinking-framework-skills.

## Input

- **URL**: The codemo.asia page URL to process (required)
- **Tags**: Optional tags for the knowledge point (default: extracted from content)
- **Target Topic**: Optional topic path to save the knowledge point

## Constraints

- The URL must be a valid codemo.asia page
- Must fetch highlights with tags: Important, Idea, Question
- Must fetch page content using web fetch tool
- The refined content should combine user highlights (content field) with page context

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

### 3. Validate URL Provided

If user did not provide a URL, ask:
> Please provide the codemo.asia URL you want to process.

### 4. Fetch Highlights from CLI

Execute:
```bash
codemons-cli note -q '{"url":"<user_url>","tags":["important","idea","question"]}'
```

Parse the JSON output to extract highlights. Each highlight should have:
- `content`: The user's note/thought
- `tag`: The highlight tag (important/idea/question)
- `created_at`: When the highlight was created

### 5. Fetch Page Content

Use the web fetch tool to get the page content:
```typescript
// Use firecrawl_scrape or similar tool
fetchPageContent(url: string): Promise<PageContent>
```

Extract the main content from the page including:
- Title
- Main body text
- Key sections

### 6. Combine and Refine Content

Analyze the highlights and page content to create refined notes:

**For each highlight (content field):**
- Use the highlight as the core insight
- Add context from the surrounding page content
- Expand with relevant explanations

**Output Structure:**
```markdown
# Refined Note: [Page Title]

## User Insights

### Important Points
- [Highlight content with context]

### Ideas
- [Highlight content with context]

### Questions
- [Highlight content with context]

## Page Summary
[Brief summary of the page content]

## Expanded Knowledge
[Expanded explanations based on highlights + page content]
```

### 7. (Optional) Save as Knowledge Point

If user wants to save as a knowledge point:

1. Use the [Convert Content to Knowledge Point](../thinking-framework-skills/references/convert-content-to-knowledge-point-skill.md) subskill from thinking-framework-skills
2. Provide the refined content as input
3. Ask for target topic path or use retrieval skill

### 8. Output Final Result

Present the refined content to the user with options:
- Copy to clipboard
- Save as knowledge point
- Export as markdown file

## Sample CLI Output

When fetching highlights, the output format is:
```json
{
  "highlights": [
    {
      "id": "hl_xxx",
      "content": "用户的问题或想法内容",
      "tag": "important|idea|question",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

## Acceptance Criteria

- [ ] CLI is available and working
- [ ] User is authenticated
- [ ] URL is provided and valid
- [ ] Highlights fetched successfully (tags: Important, Idea, Question)
- [ ] Page content fetched successfully
- [ ] Content is refined and well-structured
- [ ] Optional: Saved as knowledge point via thinking-framework-skills
- [ ] Clear output presented to user
