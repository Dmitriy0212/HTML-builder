import { open } from 'node:fs/promises';

const file = await open('./01-read-file/text.txt');

for await (const line of file.readLines()) {
  console.log(line);
}
