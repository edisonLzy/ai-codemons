import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { NoteBeamClient } from '../noteBeamClient.js';

const listHighlightsSchema = z.object({
  url: z.string().optional().describe('Filter highlights by URL'),
  limit: z.number().optional().describe('Limit the number of results (default 200)').default(200),
  offset: z.number().optional().describe('Offset for pagination').default(0),
  isToday: z.boolean().optional().describe('Filter highlights created today').default(false),
  tag: z.string().optional().describe('Filter by specific highlight tag (Question, Idea, Important, Vocabulary, Sentence)')
});

export function registerListHighlightsTool(server: McpServer, client: NoteBeamClient) {
  server.tool(
    'list-highlights',
    'List highlights from NoteBeam with optional filtering',
    listHighlightsSchema.shape,
    async (input) => {
      const { url, limit, offset, isToday, tag } = input;
      
      try {
        const TAG_MAP: Record<string, string> = {
          'Question': '3c9b4a7f-56ad-4c7d-b365-f4bb7f791499',
          'Idea': 'c5dc54ec-7c4f-4e35-81fd-9795ea26486b',
          'Important': 'ef790ac0-7747-4093-91ad-129356e4ef1e',
          'Vocabulary': '69334d99-726a-46bc-812b-663baaef0c97',
          'Sentence': 'a54dc3c6-79f7-4abe-b260-d4079c08036f',
        };

        const params: Parameters<NoteBeamClient['listHighlights']>[0] = { url, limit, offset };

        if (isToday) {
          const now = new Date();
          const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
          const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999).getTime();
          params.startDate = startOfDay;
          params.endDate = endOfDay;
        }

        if (tag) {
          // Normalize input type to Title Case or check case-insensitively if needed
          // For now assuming user provides exact match or Title Case
          const mappedTagId = TAG_MAP[tag];
          if (mappedTagId) {
            params.tagId = mappedTagId;
          } else {
            // Should valid types be case-insensitive? The prompt example used Title Case.
            // Let's try to match case-insensitive
            const lowerType = tag.toLowerCase();
            const foundTag = Object.entries(TAG_MAP).find(([key]) => key.toLowerCase() === lowerType);
            if (foundTag) {
              params.tagId = foundTag[1];
            }
          }
        }

        const highlights = await client.listHighlights(params);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(highlights, null, 2),
            }
          ],
        };
      } catch (error: any) {
        return {
          content: [
            {
              type: 'text',
              text: `Error listing highlights: ${error instanceof Error ? error.message : String(error)}`,
            }
          ],
          isError: true,
        };
      }
    }
  );
}
