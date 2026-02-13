import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  bundle: true,
  splitting: false,
  sourcemap: false,
  clean: true,
  outDir: 'dist',
  target: 'esnext',
  minify: false,
});
