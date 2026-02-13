import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/**/*.ts', 'src/**/*.md'],
  format: ['esm'],
  dts: false,
  bundle: false,
  splitting: false,
  sourcemap: false,
  clean: true,
  outDir: 'dist',
  loader: {
    '.md': 'copy',
  },
  publicDir: false,
  skipNodeModulesBundle: true,
  target: 'esnext',
  minify: false,
  treeshake: false,
  keepNames: false
});
