import fs from 'node:fs';
import vm from 'node:vm';

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const matches = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)];

if (!matches.length) {
  throw new Error('No inline JavaScript found in index.html');
}

for (const [, source] of matches) {
  new vm.Script(source);
}

const required = [
  '<meta name="viewport"',
  'DELULUVERSE',
  'localStorage',
  'prefers-reduced-motion'
];

for (const token of required) {
  if (!html.includes(token)) throw new Error(`Missing required production token: ${token}`);
}

console.log(`✓ DeluluVerse validation passed (${matches.length} inline script block${matches.length === 1 ? '' : 's'})`);
