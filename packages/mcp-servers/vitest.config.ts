import { defineProject } from 'vitest/config';

/**
 * mcp-servers 测试配置
 *
 * 使用 defineProject 获得更好的类型检查
 */
export default defineProject({
  test: {
    // 项目名称（用于 --project 过滤）
    name: 'mcp-servers',

    // 测试环境
    environment: 'node',

    // 全局测试设置
    globals: true,

    // 默认超时时间（毫秒）
    testTimeout: 10000,

    // Hook 超时时间
    hookTimeout: 10000,

    // 测试文件匹配模式
    include: [
      'src/**/*.{test,spec}.{js,ts}',
      'tests/**/*.{test,spec}.{js,ts}'
    ],

    // 排除的文件/目录
    exclude: [
      'node_modules',
      'dist',
      '.idea',
      '.git',
      '.cache'
    ]
  }
});
