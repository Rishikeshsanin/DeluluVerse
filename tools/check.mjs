import fs from 'node:fs';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {profile,replay,scene,ending,validSave} from '../engine.mjs';
const root=new URL('../',import.meta.url);
for(const f of ['app.mjs','engine.mjs'])execFileSync(process.execPath,['--check',new URL(f,root).pathname]);
const html=fs.readFileSync(new URL('index.html',root),'utf8');
for(const f of ['style.css','app.mjs','v1/index.html'])assert(fs.existsSync(new URL(f,root)));
assert(html.includes('name="viewport"'));
assert(fs.readFileSync(new URL('style.css',root),'utf8').includes('prefers-reduced-motion'));
const outcomes=new Set();let checked=0;
for(const responsibility of ['shared','independent','supporting'])for(const priority of ['freedom','stability','people']){
const p=profile({name:'Test <script>',dream:'a useful product',responsibility,priority});
for(let n=0;n<256;n++){
const choices=Array.from({length:8},(_,i)=>(n>>i)&1),s=replay(p,choices);
assert.equal(s.log.length,8);for(const k of ['security','energy','craft','connection'])assert(s[k]>=0&&s[k]<=100);
const end=ending(s,p);assert(end.letter.includes(p.name));assert(!end.letter.includes('undefined'));outcomes.add(end.title);
for(let i=0;i<8;i++){const before=replay(p,choices.slice(0,i));const q=scene(i,before,p);assert.equal(q.options.length,2);assert(q.body.every(x=>typeof x==='string'&&x.length>0));assert.deepEqual(replay(p,choices.slice(0,i)),before);}
checked++;
}}
assert(outcomes.size>=3);
const p=profile();assert.notDeepEqual(replay(p,[0]),replay(p,[1]));
assert.throws(()=>replay(p,[4]));assert.throws(()=>replay(p,Array(9).fill(0)));
assert(!validSave({version:2,profile:null,choices:[]}));assert(!validSave({version:2,profile:{},choices:[2]}));
assert(validSave({version:2,profile:{},choices:[0,1]}));
assert.equal(createHash('sha256').update(fs.readFileSync(new URL('v1/index.html',root))).digest('hex'),'d4952f31f90575ee5b606c1322650505888a8266c00ddc738b9a9c68258f9dc1','v1 must remain byte-for-byte preserved');
console.log(`Passed: ${checked} full profile/path combinations, 8 rewind points each, resource bounds, endings, saved-data validation, syntax, assets and exact v1 preservation.`);
