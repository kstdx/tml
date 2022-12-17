import { build } from 'https://deno.land/x/esbuild@v0.11.23/mod.js'

await build({
    entryPoints: ['./src/mod.js'],
    bundle: true,
    minify: true,
    outfile: 'dist/tml.min.js',
    format: 'esm'
})

Deno.exit()
