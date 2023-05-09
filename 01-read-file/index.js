import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { createReadStream } from 'node:fs';
import process from 'node:process';
const __dirname = dirname(fileURLToPath(import.meta.url));
const stream = createReadStream(__dirname+'/text.txt');

stream.on('readable', () => {
    console.log(`${stream.read()}`);
    process.exit(0)
});


