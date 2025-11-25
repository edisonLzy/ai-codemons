import { readWorkflowFile } from '../utils.js';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

export function registerTailwindClassnameRefactorPrompt(server: McpServer) {
  server.prompt(
    'tailwind-classname-refactor',
    'Tailwind CSS Classname 可读性提升 - 使用 clsx 等库按功能范围组织类名，并转换内联样式',
    async () => {
      const workflowContent = await readWorkflowFile('tailwind-classname-refactor.md');
      
      return { 
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `请按照以下工作流程提升 Tailwind CSS classname 的可读性：

工作流程定义：
${workflowContent}

请严格按照工作流程中的步骤执行：
1. 代码分析 - 识别代码类型、现有类名和内联样式
2. 内联样式处理 - 询问用户是否需要转换内联样式为 Tailwind CSS
3. Classname 分组重构 - 使用 clsx 等库按功能范围组织类名
4. 生成重构代码 - 提供优化后的代码示例
5. 提供优化建议 - 给出可维护性和性能改进建议
6. 风险评估与测试建议 - 列出测试检查清单

**重要提示**：
- 按功能范围分组类名（布局、尺寸、颜色、排版、交互、响应式等）
- 对于内联样式，先询问用户是否需要转换
- 提供完整的重构前后对比
- 给出具体的测试建议
- 评估重构可能带来的风险

现在，请提供需要优化的代码片段，我会帮你提升 Tailwind CSS classname 的可读性。`,
            },
          },
        ],
      };
    },
  );
}
