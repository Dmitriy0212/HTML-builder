import { readdir } from 'node:fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const files = await readdir(__dirname + '/secret-folder', { withFileTypes: true });
const base = String(__dirname + '\\secret-folder\\')
console.log('-------------------------------------------------------------------------------------------');
for (const file of files) {
    fs.stat(String(base + '\\' + file.name), async function (err, stats) {
        if (stats.isFile()) {
            console.log('Type - file');
            console.log('File name - ' + file.name.split('.')[0]);
            console.log('File extension - ' + file.name.split('.')[1]);
            console.log('Size - ' + stats.size / 1000 + ' kb');
            console.log('-------------------------------------------------------------------------------------------\n');
        }
        if (stats.isDirectory()) {

        }
    })
}