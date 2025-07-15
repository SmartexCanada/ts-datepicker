import { build } from "esbuild";
import { umdWrapper } from "esbuild-plugin-umd-wrapper";
import { emptyDir } from "fs-extra";
import packageConfig from '../package.json' with { type: 'json' };

export const target = 'es2017';
export const outdir = 'dist';

export const banner = `/*! ts-datepicker v${packageConfig.version}, @license MIT */`

const options = {
    entryPoints: ['./src/index.ts'],
    target,
    bundle: true,
    legalComments: 'inline',
    outdir,
    sourcemap: true,
    banner: {
        js: banner
    }
};

const esmOptions = {
    ...options,
    format: 'esm',
    charset: 'utf8',
    outExtension: {'.js': '.mjs'}
};

const umdOptions = {
    ...options,
    format: 'cjs',
    plugins: [
        umdWrapper({ libraryName: 'DatePicker', amdId: false })
    ],
    banner: {
        js: banner + '\n'
    }
};

const minifyOptions = {
    entryNames: '[dir]/[name].min',
    minify: true,
    legalComments: 'none'
};

await build(esmOptions);
await build({ ...esmOptions, ...minifyOptions });

await build(umdOptions);
await build({ ...umdOptions, ...minifyOptions });

await emptyDir('dist/locales');

await build({
    entryPoints: ['./src/i18n/locales/*.ts'],
    target,
    bundle: false,
    outdir,
    outbase: 'src/i18n',
    charset: 'utf8',
    format: 'esm',
    outExtension: {'.js': '.mjs'}
});
