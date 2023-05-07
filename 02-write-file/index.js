import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'node:fs';
import { constants } from 'node:fs';
import fsr from 'node:fs/promises';
import { open } from 'node:fs/promises';
import * as readline from 'node:readline/promises';
import process from 'node:process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rl = readline.createInterface(process.stdin);
async function run1() {
    console.log(`Для завершения роботы программы для записи, введите ключевое слово "exit" или нажмите комбинацию клавишь Ctrl+C\nВведите какойто текст`);
    try {
        const file = await open(__dirname + '/writeme.txt');
        await fsr.access(__dirname + '/writeme.txt', constants.F_OK);
        let writeableText = fs.createWriteStream(__dirname + '/text.txt');
        for await (const line of file.readLines()) {
            writeableText.write(line + '\n');
        }
        async function run() {
            const answer = await rl.question('');
            if (String(answer) !== 'exit') {
                let readableStream = fs.createReadStream(__dirname + '/text.txt', 'utf8');
                let writeab = fs.createWriteStream(__dirname + '/writeme.txt');
                writeableText.write(answer + '\n')
                readableStream.on('data', function (chunk) {
                    writeab.write(chunk);
                })
                return run()
            }
            else if (String(answer) == 'exit') {
                console.log('Спасибо за роботу!'),
                    fs.unlink(__dirname + "/text.txt", (err) => {
                        if (err) console.log(err); // если возникла ошибка
                    });
                process.exit(0);
            }
        }
        run()
    } 
    catch {
        let writeableWriteme = fs.createWriteStream(__dirname + '/writeme.txt');
        async function run() {
            const answer = await rl.question('');
            if (String(answer) !== 'exit') {
                writeableWriteme.write(answer + '\n')
                return run()
            }
            else if (String(answer) == 'exit') {
                console.log('Спасибо за роботу!');
                process.exit(0);
            }
        }
        run()
    }
}
run1()
process.on('SIGINT', () => {
    console.log('Спасибо за роботу!'),
        fs.unlink(__dirname + "/text.txt", (err) => {
            if (err) console.log(err); // если возникла ошибка
        });
    process.exit(0);
});


