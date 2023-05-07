import { readdir } from 'node:fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const files = await readdir(__dirname + '/styles', { withFileTypes: true });
const base = String(__dirname + '\\styles\\')
let writeableCss = fs.createWriteStream(__dirname + '/project-dist/bundle.css')
for (const file of files) {
    fs.stat(String(base + '\\' + file.name), async function (err, stats) {
        if (stats.isFile()) {
            if (file.name.split('.')[file.name.split('.').length - 1] == 'css') {
                const controller = new AbortController();
                const signal = controller.signal;
                for await (const chunk of fs.createReadStream((__dirname + '/styles/' + file.name),{signal})) {
                    writeableCss.write(chunk);
                }
                controller.abort();
            }
        }
        if (stats.isDirectory()) {
        }
    })
}