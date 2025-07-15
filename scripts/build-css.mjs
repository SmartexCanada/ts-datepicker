import * as esbuild from "esbuild";
import stylePlugin from 'esbuild-style-plugin';
import prettify from 'postcss-prettify';
import autoprefixer from "autoprefixer";
import { move, remove } from "fs-extra"
import { banner } from "./build-js.mjs";

await esbuild.build({
    entryPoints: ["./src/styles/index.less"],
    outdir: 'build',
    bundle: true,
    banner: {
        css: banner
    },
    plugins: [
        stylePlugin({
            postcss: {
                plugins: [ autoprefixer, prettify ]
            }
        })
    ]
});

await esbuild.build({
    entryPoints: ["./build/index.css"],
    entryNames: '[dir]/[name].min',
    outdir: 'build',
    minify: true,
    banner: {
        css: banner
    },
    legalComments: 'none'
});

await move('./build/index.css', './dist/datepicker.css', { overwrite: true });
await move('./build/index.min.css', './dist/datepicker.min.css', { overwrite: true });
await remove('./build');
