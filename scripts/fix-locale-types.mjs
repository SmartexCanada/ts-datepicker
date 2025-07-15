import { readdir, readFile, writeFile } from "fs/promises";
import { dirname } from "path";
import { fileURLToPath } from "url";

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));

const localeDir = `${rootDir}/dist/types/i18n/locales`;
const rePattern = /(declare const _default: )(\{[\s\S]+?\};)([\s\S]+)/m;

const files = await readdir(localeDir);

files.forEach(async (file) => {
    const filePath = `${localeDir}/${file}`;
    const src = await readFile(filePath, 'utf-8');
    const output = src.replace(rePattern, [
        'import { CustomLocale } from "../../types/locale";\n',
        '$1',
        'CustomLocale;',
        '$3'
    ].join(''));

    await writeFile(filePath, output);
});
