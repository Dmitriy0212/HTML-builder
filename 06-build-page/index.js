import { mkdir } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'node:fs';
import { unlink } from 'node:fs/promises';
import { readFile } from 'node:fs';
import { writeFile } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectFolder = new URL(
    './project-dist',
    import.meta.url
);
const files = await readdir(__dirname);
for (const file of files) {
    if (file == 'project-dist') {
        try {
            const files1 = await readdir(__dirname + '/project-dist', { withFileTypes: true });
            const base = String(__dirname + '\\project-dist\\')
            if (files1.length !== 0) {
                for (const file1 of files1) {
                    fs.stat(String(base + file1.name + '\\'), async function (err, stats) {
                        if (stats.isFile()) {
                            await unlink(__dirname + '/project-dist/' + file1.name)
                        }
                        if (stats.isDirectory()) { }
                    })
                }
            }
        } catch (error) {
            console.error('произошла ошибка:', error.message);
        }
    }
}

const createDir = mkdir(projectFolder, {
    recursive: true,
}, (err) => {
    if (err) throw err;
});
createDir


try {
    async function writeToDirectoryProjectdist(err) {
        const files = await readdir(__dirname, { withFileTypes: true });
        const base = String(__dirname + '\\')
        if (err) throw err;
        for (const file of files) {
            fs.stat(String(base + '\\' + file.name), async function (err, stats) {
                if (stats.isFile()) { }
                if (stats.isDirectory()) {
                    if (file.name.split('.')[0] == 'project-dist') {
                        readDirectoryStyles()
                    }
                }
            })
        }
        return
    }
    writeToDirectoryProjectdist()

    async function readDirectoryStyles() {
        const __dirname = dirname(fileURLToPath(import.meta.url));
        let writeableHtml = fs.createWriteStream(__dirname + '/project-dist/index.html')
        const controller = new AbortController();
        const signal = controller.signal;
        for await (const chunk of fs.createReadStream((__dirname + '/template.html'), { signal })) {
            writeableHtml.write(chunk);
        }
        controller.abort();
        const files = await readdir(__dirname + '/styles', { withFileTypes: true });
        const base = String(__dirname + '\\styles\\')
        let writeableCss = fs.createWriteStream(__dirname + '/project-dist/style.css')
        for (const file of files) {
            fs.stat(String(base + '\\' + file.name), async function (err, stats) {
                if (stats.isFile()) {
                    if (file.name.split('.')[file.name.split('.').length - 1] == 'css') {
                        const controller = new AbortController();
                        const signal = controller.signal;
                        for await (const chunk of fs.createReadStream((__dirname + '/styles/' + file.name), { signal })) {
                            writeableCss.write(chunk);
                        }
                        controller.abort();
                    }
                }
                if (stats.isDirectory()) {
                }
            })
        }

        const data1 = new Uint8Array(Buffer.from(String(__dirname + '/project-dist/index.html')));
        const files11 = await readdir(__dirname + '/components', { withFileTypes: true });
        let a;
        let b = '';
        let c = 0;
        for (let j = 0; j < files11.length; j++) {
            readFile(data1, async (err, data1data) => {
                a = String(data1data).split('\n');
                for (let i = 0; i < a.length; i++) {
                    if (a[i].includes(files11[j].name.split('.')[0])) {
                        c++;
                        const data2 = new Uint8Array(Buffer.from(__dirname + '/components/' + files11[j].name));
                        readFile(data2, async (err, data2data) => {
                            a.splice(i, 1, String(data2data) + '\n')
                            if (c === files11.length) {
                                for (const count in a) {
                                    b = b + a[count] + '\n'
                                }
                                let writeableHtmlAgein = fs.createWriteStream(__dirname + '/project-dist/index.html')
                                writeableHtmlAgein;
                                writeFile(String(__dirname + '/project-dist/index.html'), String(b), (err) => {
                                    if (err) throw err;
                                    let d;
                                    const data3 = new Uint8Array(Buffer.from(String(__dirname + '/project-dist/index.html')));
                                    readFile(data3, async (err, data1data) => {
                                        d = String(data1data).split('<!DOCTYPE html>');
                                        writeFinalVersionIndex('<!DOCTYPE html>' + d[d.length - 1])
                                    })
                                });
                            }
                        })
                    }
                }
            })
        }
    }
    async function writeFinalVersionIndex(a) {
        let writeableHtmlAgein = fs.createWriteStream(__dirname + '/project-dist/index.html');
        writeableHtmlAgein;
        writeFile(String(__dirname + '/project-dist/index.html'), String(a), (err) => {
            if (err) throw err;
        })
    }
} catch (err) {
    console.error(err.message);
}





