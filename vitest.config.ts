import { defineConfig } from 'vitest/config';

/**
 * Vitest Monorepo 配置
 *
 * 使用 projects 配置统一管理所有包的测试
 * @see https://vitest.dev/guide/projects.html
 */
export default defineConfig({
  test: {
    // 定义项目路径，自动发现 packages 下的 vitest.config.ts
    projects: ['packages/*'],

    // 全局 reporters 配置（只能在根配置中设置）
    reporters: ['default'],

    // 全局 coverage 配置（只能在根配置中设置）
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        '**/dist/**',
        '**/*.test.ts',
        '**/*.spec.ts',
        '**/tests/**',
        '**/__tests__/**',
        '**/*.config.ts',
        '**/*.setup.ts'
      ]
    },
  },
});
