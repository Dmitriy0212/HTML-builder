import { copyFile } from 'node:fs';
import { mkdir } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'node:fs';
import { unlink } from 'node:fs/promises';

try {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const projectFolder = new URL(
        './files-copy/',
        import.meta.url
    );
    const files = await readdir(__dirname);
    for (const file of files) {
        if (file == 'files-copy') {
            try {
                const files1 = await readdir(__dirname + '/files-copy', { withFileTypes: true });
                const base = String(__dirname + '\\files-copy\\')
                if (files1.length !== 0) {
                    for (const file1 of files1) {
                        console.log(base + file1.name);
                        fs.stat(String(base + file1.name), async function (err, stats) {
                            if (stats.isFile()) {
                                await unlink(__dirname + '/files-copy/' + file1.name)
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

    async function callback2(err) {
        if (err) throw err;
        console.log('Файл скопирован');
    }

    async function call(err) {
        const files = await readdir(__dirname, { withFileTypes: true });
        const base = String(__dirname + '\\')
        if (err) throw err;
        for (const file of files) {
            fs.stat(String(base + '\\' + file.name), async function (err, stats) {
                if (stats.isFile()) { }
                if (stats.isDirectory()) {
                    if (file.name.split('.')[0] == files[0].name) { }
                    else if (file.name.split('.')[0] == files[1].name) {
                        callback(files[0].name, files[1].name)
                    }
                }
            })
        }
        return
    }
    call()

    async function callback(firstDir, secondDir) {
        const files = await readdir(__dirname + '/' + firstDir, { withFileTypes: true });
        const base = String(__dirname + '\\' + firstDir + '\\');
        for (const file of files) {
            fs.stat(String(base + '\\' + file.name + '\\'), async function (err, stats) {
                if (stats.isFile()) {
                    copyFile(__dirname + '/' + firstDir + '/' + file.name, __dirname + '/' + secondDir + '/' + file.name, callback2);
                }
                if (stats.isDirectory()) { }
            })
        }
    }
} catch (err) {
    console.error(err.message);
}