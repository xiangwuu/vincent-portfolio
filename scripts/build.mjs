import { cp, mkdir, readFile, rm } from 'node:fs/promises';

const html = await readFile('index.html', 'utf8');
for (const required of ['src/main.js', 'src/style.css']) {
  if (!html.includes(`/${required}`)) throw new Error(`Missing asset reference: ${required}`);
}

await rm('dist', { recursive: true, force: true });
await mkdir('dist/src', { recursive: true });
await cp('index.html', 'dist/index.html');
await cp('src/main.js', 'dist/src/main.js');
await cp('src/style.css', 'dist/src/style.css');
console.log('Built static site in dist/');
