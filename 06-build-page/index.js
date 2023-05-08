import { mkdir } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'node:fs';
import { unlink } from 'node:fs/promises';
import { readFile } from 'node:fs';
import { writeFile } from 'node:fs';
import { copyFile } from 'node:fs';

/*Вконце роботы скрипта выскакивает ощибка как её отловить так и не разобрался
 но тем не мение скрипт вроде выполняет все требования по заданию если знаещь как решить проблему пиши буду признателен,
 скорей всего проблема в не завершоннисти роботы копирования и начале роботы нового сеанса копирования*/

const __dirname = dirname(fileURLToPath(import.meta.url));
const files = await readdir(__dirname);
for (const file of files) {
    if (file == 'project-dist') {
        const files1 = await readdir(__dirname + '/project-dist', { withFileTypes: true });
        const base = String(__dirname + '\\project-dist\\')
        if (files1.length !== 0) {
            for (const file1 of files1) {
                fs.stat(String(base + file1.name + '\\'), async function (err, stats) {
                    if (err) throw err;
                    if (stats.isFile()) {
                        await unlink(__dirname + '/project-dist/' + file1.name)
                    }
                    if (stats.isDirectory()) { }
                })
            }
        }
    }
}
const projectFolder = new URL(
    './project-dist',
    import.meta.url
);

const createDir = mkdir(projectFolder, {
    recursive: true,
}, (err) => {
    if (err) throw err;
});
createDir


async function writeToDirectoryProjectdist(err) {
    const files2 = await readdir(__dirname, { withFileTypes: true });
    const base = String(__dirname + '\\')
    if (err) throw err;
    for (const file2 of files2) {
        fs.stat(String(base + '\\' + file2.name), async function (err, stats) {
            if (err) throw err;
            if (stats.isFile()) { }
            if (stats.isDirectory()) {
                if (file2.name.split('.')[0] == 'project-dist') {
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
    const files3 = await readdir(__dirname + '/styles', { withFileTypes: true });
    const base = String(__dirname + '\\styles\\')
    let writeableCss = fs.createWriteStream(__dirname + '/project-dist/style.css')
    for (const file3 of files3) {
        fs.stat(String(base + '\\' + file3.name), async function (err, stats) {
            if (err) throw err;
            if (stats.isFile()) {
                if (file3.name.split('.')[file3.name.split('.').length - 1] == 'css') {
                    const controller = new AbortController();
                    const signal = controller.signal;
                    for await (const chunk of fs.createReadStream((__dirname + '/styles/' + file3.name), { signal })) {
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
    const files4 = await readdir(__dirname + '/components', { withFileTypes: true });
    let a;
    let b = '';
    let c = 0;
    for (let j = 0; j < files4.length; j++) {
        c++;
        readFile(data1, async (err, data1data) => {
            if (err) throw err;
            a = String(data1data).split('\n');
            for (let i = 0; i < a.length; i++) {
                if (a[i].includes(files4[j].name.split('.')[0])) {
                    const data2 = new Uint8Array(Buffer.from(__dirname + '/components/' + files4[j].name));
                    readFile(data2, async (err, data2data) => {
                        if (err) throw err;
                        a.splice(i, 1, String(data2data) + '\n')
                        if (c === files4.length) {
                            for (const count in a) {
                                b = b + a[count]
                            }
                            let writeableHtmlAgein = fs.createWriteStream(__dirname + '/project-dist/index.html')
                            writeableHtmlAgein;
                            writeFile(String(__dirname + '/project-dist/index.html'), String(b), (err) => {
                                if (err) throw err;
                                let d;
                                const data3 = new Uint8Array(Buffer.from(String(__dirname + '/project-dist/index.html')));
                                readFile(data3, async (err, data3data) => {
                                    if (err) throw err;
                                    d = String(data3data).split('<!DOCTYPE html>');
                                    writeFinalVersionIndex('<!DOCTYPE html>' + d[d.length - 1])
                                    return
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
    writeFile(String(__dirname + '/project-dist/index.html'), String(a), async (err) => {
        if (err) throw err;
    })
    writeDirectoryAssets('assets', '', '')
}
async function writeDirectoryAssets(a, b, c) {
    const projectFolder1 = new URL(
        './project-dist/' + String(a) + '/' + String(b),
        import.meta.url
    );
    const createDir1 = mkdir(projectFolder1, {
        recursive: true,
    }, (err) => {
        if (err) throw err;
    });
    createDir1

    const files5 = await readdir(__dirname + '/' + String(a) + '/' + String(b), { withFileTypes: true });
    const base = String(__dirname + '\\' + String(a) + '\\' + String(b))
    for (const file5 of files5) {
        fs.stat(String(base + '\\' + file5.name + '\\'), async function (err, stats) {
            if (stats.isFile()) {
                const files6 = await readdir(__dirname + '/' + a + '/' + b, { withFileTypes: true });
                for (const file6 of files6) {
                    copyFile(__dirname + '/' + a + '/' + b + '/' + file6.name, __dirname + '/' + c + '/' + a + '/' + b + '/' + file6.name, callback2);
                }

            }
            if (stats.isDirectory()) {
                return writeDirectoryAssets(a, file5.name, 'project-dist')
            }
        })
    }
    async function callback2(err) {
        if (err) throw err;
    }
}
