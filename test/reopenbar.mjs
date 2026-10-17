// v114 (Stacey): on a big reopen the bar value comes only from work done - if a page-build stage stalls, the bar stops. Synthetic 4,000-line program.
// Run: NODE_PATH=/tmp/pt/node_modules node test/reopenbar.mjs
import { createRequire } from 'module';const require=createRequire(import.meta.url);const puppeteer=require('puppeteer-core');
import path from 'path';import {fileURLToPath} from 'url';const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--allow-file-access-from-files']});const p=await b.newPage();await p.setViewport({width:390,height:844});
await p.goto('file://'+ROOT+'/index.html');await p.evaluate(()=>{localStorage.clear();localStorage.setItem('mc_tour','done')});await p.reload();await new Promise(r=>setTimeout(r,1200));
const R=[];const ok=(n,c,x)=>R.push([c?'PASS':'FAIL',n,x||'']);const w=ms=>new Promise(r=>setTimeout(r,ms));
await p.evaluate(()=>{const L=['%','O1234 (BIG DEMO)','G17 G20 G40 G80 G90','T1 M06','G54','S3000 M03','G43 H1 Z1.0'];for(let i=0;i<4000;i++)L.push('G01 X'+(2-i*1e-4).toFixed(4)+' Y'+(i%50*0.02).toFixed(4)+' Z-'+(0.1+i%40*0.002).toFixed(4)+' F20.');L.push('M30','%');tab('new');importToEditor(L.join('\n'));return window.R13IMP});await w(800);
await p.evaluate(()=>{J.name='Bar test';saveJob()});await w(500);
for(const st of ['page','show','checks']){
 await p.evaluate(st=>{window.__rel=null;window.__seen=[];window.R13STALL=s=>s===st?new Promise(r=>{window.__rel=r;window.__atStall=(document.querySelector('#r13prog .p')||{}).textContent}):null;tab('recent');reopen(S.jobs.findIndex(j=>j.name=='Bar test'));return 1},st);
 for(let k=0;k<100&&!(await p.evaluate(()=>!!window.__rel));k++)await w(50);
 const a=await p.evaluate(()=>[(document.querySelector('#r13prog .p')||{}).textContent,document.querySelector('#r13prog i').style.width]);await w(1500);
 const c=await p.evaluate(()=>[(document.querySelector('#r13prog .p')||{}).textContent,document.querySelector('#r13prog i').style.width,document.getElementById('r13prog').classList.contains('on')]);
 ok(`stage "${st}" held 1.5 s: the bar does not move (no timer creep) and stays on screen`,a[0]===c[0]&&a[1]===c[1]&&c[2],JSON.stringify([a,c]));
 await p.evaluate(()=>{window.R13STALL=null;window.__rel&&window.__rel();return window.R13OPEN});await w(300);
 ok(`stage "${st}" released: the open finishes and the bar goes away`,await p.evaluate(()=>J&&J.name=='Bar test'&&!document.getElementById('r13prog').classList.contains('on')))}
for(const r of R)console.log(r[0],'::',r[1],r[2]?':: '+r[2]:'');console.log(`P=${R.filter(r=>r[0]=='PASS').length} F=${R.filter(r=>r[0]=='FAIL').length}`);await b.close();
