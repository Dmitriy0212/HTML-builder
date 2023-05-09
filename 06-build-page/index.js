import { mkdir } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'node:fs';
import { unlink } from 'node:fs/promises';
import { readFile } from 'node:fs';
import { writeFile } from 'node:fs';
import { copyFile } from 'node:fs';
import { appendFile } from 'node:fs';
import { access, constants } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
async function existenceСheck(directory, directory1) {
    const files = await readdir(directory1);
    for (const file of files) {
        if (file == String(directory)) {
            const files1 = await readdir(String(directory1) + '/' + String(directory), { withFileTypes: true });
            const base = String(String(directory1) + '\\' + String(directory) + '\\')
            for (const file1 of files1) {
                fs.stat(String(base + file1.name + '\\'), async function (err, stats) {
                    if (err) throw err;
                    if (stats.isFile()) {
                        await unlink(directory1 + '\\' + String(directory) + '\\' + file1.name)
                        console.log(`Удаление файла ${file1.name}`)
                        let a = await readdir(directory1 + '\\' + String(directory) + '\\')
                        if (a.length == 0) {
                            let b = await readdir(directory1)
                            fs.rm(directory1 + '\\' + directory,
                                { recursive: true },
                                () => {
                                    if (b.length == 0) {
                                        fs.rm(directory1,
                                            { recursive: true },
                                            (err) => {
                                                console.error(err);
                                            }
                                        );
                                    }
                                    return existenceСheck('', directory1)
                                }
                            );
                        }
                    }
                    if (stats.isDirectory()) {
                        let a = await readdir(directory1 + '\\' + String(directory) + '\\' + file1.name + '\\')
                        if (a.length == 0) {
                            fs.rm(directory1 + '\\' + directory + '\\' + file1.name,
                                { recursive: true },
                                (err) => {
                                    console.error(err);
                                }
                            );
                        }
                        return existenceСheck(file1.name, directory1 + '\\' + directory)
                    }
                })
            }

        }
    }
}

existenceСheck('project-dist', __dirname)

try {




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


    async function readDirectoryStyles(readFrom) {
        const files3 = await readdir(__dirname + '/' + String(readFrom), { withFileTypes: true });
        const base = String(__dirname + '\\' + String(readFrom) + '\\')
        let writeableCss = fs.createWriteStream(__dirname + '/project-dist/style.css')
        for (const file3 of files3) {
            fs.stat(String(base + '\\' + file3.name), async function (err, stats) {
                if (err) throw err;
                if (stats.isFile()) {
                    if (file3.name.split('.')[file3.name.split('.').length - 1] == 'css') {
                        const controller = new AbortController();
                        const signal = controller.signal;
                        for await (const chunk of fs.createReadStream((__dirname + '/' + String(readFrom) + '/' + file3.name), { signal })) {
                            writeableCss.write(chunk);
                            console.log(`Файл style.css перезаписан с добавлением ${file3.name}`);
                        }
                        controller.abort();
                    }
                }
                if (stats.isDirectory()) {
                }
            })
        }
        readAndWriteIndexHtml();
    }

    async function readAndWriteIndexHtml() {
        appendFile(__dirname + '/project-dist/index.html',
            '',
            (err) => {
                if (err) throw err;
                console.log(
                    'Файл index.html создан'
                );
            }
        );
        access(__dirname + '/project-dist/index.html', constants.F_OK, (err) => {
            console.log(
                `index.html ${err ? 'не существует' : 'существует'}`
            );
        });
        const controller = new AbortController();
        const signal = controller.signal;
        let writeableHtml = fs.createWriteStream(__dirname + '/project-dist/index.html')
        for await (const chunk of fs.createReadStream((__dirname + '/template.html'), { signal })) {
            writeableHtml.write(chunk);
            const data1 = new Uint8Array(Buffer.from(String(__dirname + '\\project-dist\\index.html')));
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
                                a.splice(i, 1, String(data2data) + '\n');
                                if (c === files4.length) {
                                    console.log(`Файл index.html перезаписан с добавлением ${files4[j].name}`)
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
                                        })
                                    });
                                }
                            })
                        }
                    }
                })
            }
        }
        controller.abort();
    }

    async function writeFinalVersionIndex(a) {
        let writeableHtmlAgein = fs.createWriteStream(__dirname + '/project-dist/index.html');
        writeableHtmlAgein;
        writeFile(String(__dirname + '/project-dist/index.html'), String(a), async (err) => {
            if (err) throw err;
        })
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
                    console.log(`Копирование файла ${file5.name} из папки assets в папку project-dist завершено!`)
                    copyFile(__dirname + '/' + a + '/' + b + '/' + file5.name, __dirname + '/' + c + '/' + a + '/' + b + '/' + file5.name, callback2);
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

    readDirectoryStyles('styles');
    writeDirectoryAssets('assets', '', '');

} catch (err) {
    console.error(err.message);
}

/*Вконце роботы скрипта выскакивает ощибка как её отловить так и не разобрался
 но тем не мение скрипт вроде выполняет все требования по заданию если знаещь как решить проблему пиши буду признателен,
 скорей всего проблема в не завершоннисти роботы копирования и начале роботы нового сеанса копирования*/