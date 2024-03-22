import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import { defineConfig } from 'rollup'

export default defineConfig({
  input: 'src/index.ts',
  output: {
    file: 'bin/sec5.mjs',
    format: 'esm'
  },
  plugins: [typescript(), terser()],
  external: ['chalk', 'glob', 'node:path', 'node:fs', 'node:child_process']
})
