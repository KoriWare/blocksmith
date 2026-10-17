// v115: Simulate toolbar - row XYZ, Tool, Stock, Path, 1x (no Full screen); name-only yellow/gray chips; Tool off really hides the tool;
// Path hides only the toolpath lines; each state kept through scrub, play and speed. Synthetic program only.
// Run: NODE_PATH=/tmp/pt/node_modules node test/simbar.mjs
import { createRequire } from 'module';const require=createRequire(import.meta.url);const puppeteer=require('puppeteer-core');
import path from 'path';import {fileURLToPath} from 'url';const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--allow-file-access-from-files']});const p=await b.newPage();await p.setViewport({width:390,height:844});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+ROOT+'/index.html');await p.evaluate(()=>{localStorage.clear();localStorage.setItem('mc_tour','done')});await p.reload();await new Promise(r=>setTimeout(r,1200));
const R=[];const ok=(n,c,x)=>R.push([c?'PASS':'FAIL',n,x||'']);const w=ms=>new Promise(r=>setTimeout(r,ms));
await p.evaluate(()=>{const L=['%','O1234 (SIMBAR DEMO)','G17 G20 G40 G80 G90','T1 M06','G54','S3000 M03','G00 X0 Y0','G43 H1 Z1.0','G01 Z-0.1 F10.'];for(let i=0;i<40;i++)L.push('G01 X'+(i%2?2:0)+' Y'+(i*0.05).toFixed(3)+' F20.');L.push('G00 Z1.0','M30','%');tab('new');importToEditor(L.join('\n'))});await w(900);
await p.evaluate(()=>{J.name='Simbar test';saveJob()});await w(400);await p.evaluate(()=>tab('sim'));await w(800);
const st=()=>p.evaluate(()=>{const row=$('#tTool').parentElement;const bs=[...row.querySelectorAll('button')].filter(x=>x.offsetParent);
 const px={teal:0,white:0,stock:0};try{const d=ctx.getImageData(0,0,cv.width,cv.height).data;for(let i=0;i<d.length;i+=4){const r=d[i],g=d[i+1],bb=d[i+2];if(Math.abs(r-20)<12&&Math.abs(g-184)<14&&Math.abs(bb-166)<14)px.teal++;else if(r>235&&g>235&&bb>235)px.white++;else if(r==g&&g==bb&&r>80&&r<120)px.stock++}}catch(e){}
 const cls=id=>{const e=$(id);return e.classList.contains('y')?'y':e.classList.contains('gr')?'gr':'?'};
 return {labels:bs.map(x=>x.textContent.trim()),tops:bs.map(x=>Math.round(x.getBoundingClientRect().top)),full:[...document.querySelectorAll('button')].some(x=>/full\s*screen|⛶/i.test(x.textContent)),
  tool:view.tool,stk:view.stk,path:view.path,drawn:window.R115TOOL,c:{t:cls('#tTool'),s:cls('#tStk'),p:cls('#tPath')},px,n:view.n}});
const click=async id=>{await p.evaluate(id=>$(id).scrollIntoView({block:'center'}),id);await w(100);await p.click(id);await w(150)};
let s=await st();console.log(JSON.stringify(s));
ok('1 row reads XYZ, Tool, Stock, Path, 1×',JSON.stringify(s.labels)==JSON.stringify(['XYZ','Tool','Stock','Path','1×']),JSON.stringify(s.labels));
ok('1 no Full screen button',!s.full);ok('1 row on one line',new Set(s.tops).size==1,JSON.stringify(s.tops));
ok('2 defaults: Tool yellow, Stock gray, Path yellow (name only)',s.c.t=='y'&&s.c.s=='gr'&&s.c.p=='y',JSON.stringify(s.c));
ok('3 tool drawn when on (start)',s.drawn===true);
await click('#tTool');s=await st();ok('3 Tool off at start: tool not drawn, chip gray, label "Tool"',s.tool==0&&s.drawn===false&&s.c.t=='gr'&&s.labels[1]=='Tool',JSON.stringify(s));
await p.evaluate(()=>scrub(Math.floor(J.M.length/2)));await w(150);s=await st();ok('3 Tool off mid-program: tool not drawn',s.drawn===false,JSON.stringify({d:s.drawn,n:s.n}));
await p.evaluate(()=>scrub(J.M.length));await w(150);s=await st();ok('3 Tool off at end (home stub): tool not drawn',s.drawn===false);
await click('#tTool');s=await st();ok('3 Tool on again: drawn, yellow',s.drawn===true&&s.c.t=='y');
const a=await st();await click('#tPath');s=await st();ok('4 Path off: teal path pixels gone, chip gray',s.path==0&&s.px.teal<20&&a.px.teal>200&&s.c.p=='gr',`teal ${a.px.teal}->${s.px.teal}`);
ok('4 Path off: tool still drawn and Stock unchanged',s.drawn===true&&s.stk===a.stk);
await click('#tStk');s=await st();ok('2 Stock on: yellow',s.stk==1&&s.c.s=='y');
await click('#tTool');// state now: tool 0, stk 1, path 0
const keep=x=>x.tool==0&&x.stk==1&&x.path==0&&x.c.t=='gr'&&x.c.s=='y'&&x.c.p=='gr'&&x.drawn===false;
await p.evaluate(()=>scrub(3));await w(150);s=await st();ok('5 kept after scrub',keep(s),JSON.stringify(s));
await click('#tSp');await click('#tSp');s=await st();ok('5 kept after speed change',keep(s)&&s.labels[4]!='1×',s.labels[4]);
await p.evaluate(()=>play());await w(1500);s=await st();ok('5 kept during/after play',keep(s),JSON.stringify(s));
await p.evaluate(()=>{tab('edit')});await w(300);await p.evaluate(()=>tab('sim'));await w(500);s=await st();ok('5 kept after Editor and back',keep(s),JSON.stringify(s));
ok('no page errors',!errs.length,errs.join(' | ').slice(0,300));
await b.close();R.forEach(r=>console.log(r.join('  ')));const F=R.filter(r=>r[0]=='FAIL').length;console.log(`P=${R.length-F} F=${F}`);process.exit(F?1:0);
