import { build } from 'https://deno.land/x/esbuild@v0.11.23/mod.js'
import { cache } from 'https://raw.githubusercontent.com/cumet04/esbuild-plugin-cache/master/deno/mod.ts'

await build({
    entryPoints: ['./src/mod.js'],
    bundle: true,
    minify: true,
    outfile: './dist/tml.min.js',
    format: 'esm',
    plugins: [cache({ imports: {} }, './cache')]
})

Deno.exit()
