// v113z13b: 6.25 reopen bug — true close + reopen (persistent profile, localStorage + service worker kept), synthetic fixtures only.
// Run: NODE_PATH=/tmp/pt/node_modules node test/reopen625.mjs
import { createRequire } from 'module';const require=createRequire(import.meta.url);const puppeteer=require('puppeteer-core');
import http from 'http';import fs from 'fs';import path from 'path';import os from 'os';import {fileURLToPath} from 'url';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');const FX=ROOT+'/test/fixtures/';
const T={'.html':'text/html','.js':'text/javascript','.json':'application/json','.png':'image/png','.svg':'image/svg+xml','.webmanifest':'application/manifest+json'};
const srv=http.createServer((q,s)=>{let f=path.join(ROOT,decodeURIComponent(q.url.split('?')[0]));if(f.endsWith('/'))f+='index.html';fs.readFile(f,(e,d)=>{if(e){s.writeHead(404);s.end();return}s.writeHead(200,{'content-type':T[path.extname(f)]||'application/octet-stream'});s.end(d)})});
await new Promise(r=>srv.listen(0,'127.0.0.1',r));const URL=`http://127.0.0.1:${srv.address().port}/index.html`;
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'reopen625-'));const r=[];const log=(n,ok,x)=>console.error((ok?'PASS ':'FAIL ')+n)||r.push((ok?'PASS ':'FAIL ')+n+(ok?'':' :: '+JSON.stringify(x)));
const L=async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',headless:'new',userDataDir:dir,args:['--no-sandbox']});const p=(await b.pages())[0]||await b.newPage();await p.setViewport({width:390,height:844});p.on('dialog',d=>d.accept());return [b,p]};
const CL=async(b,p)=>{try{await p.evaluate(()=>{Object.defineProperty(document,'visibilityState',{configurable:true,get:()=>'hidden'});document.dispatchEvent(new Event('visibilitychange'))});await W(300);await Promise.race([p.close({runBeforeUnload:true}),W(3000)]);await W(600)}catch(e){}await Promise.race([b.close(),W(5000)])};
const W=ms=>new Promise(r=>setTimeout(r,ms));
const st=p=>p.evaluate(()=>({J:J&&J.r112stk?J.r112stk.square.L:null,fld:(document.querySelector('[data-sk="square.L"]')||{}).value||null,jobs:S.jobs.map(j=>j.name+':'+(j.r112stk&&j.r112stk.square.L)),card:!!document.getElementById('r79dr'),sw:!!navigator.serviceWorker.controller}));
const openJob=async p=>{await p.evaluate(()=>[...document.querySelectorAll('.tabs *')].find(x=>x.children.length==0&&/Library/.test(x.textContent)).click());await W(600);await p.evaluate(()=>{const e=[...document.querySelectorAll('body *')].filter(x=>/^Demo 625 boss/.test(x.textContent.trim())&&x.getClientRects().length).pop();e.click()});await W(1500)};
const setL=async(p,v)=>{await p.evaluate(()=>{const i=document.querySelector('[data-sk="square.L"]');i.scrollIntoView({block:'center'});i.focus();i.select()});await W(200);await p.keyboard.press('Backspace');await p.keyboard.type(String(v));await p.keyboard.press('Tab');await W(900)};
let [b,p]=await L();await p.goto(URL);await p.evaluate(()=>{localStorage.clear();localStorage.setItem('mc_tour','done')});await p.reload();await p.evaluate(()=>Promise.race([navigator.serviceWorker.ready,new Promise(r=>setTimeout(r,5000))]).then(()=>0));await p.reload();await W(1500);
await p.evaluate(()=>[...document.querySelectorAll('.tabs *')].find(x=>x.children.length==0&&/Library/.test(x.textContent)).click());await W(600);const fi=await p.$('#mbf');await fi.uploadFile(FX+'demo-625.mbjob');await W(800);await p.click('#mbgo');await W(900);
await openJob(p);let s=await st(p);log('import + open shows saved 6.25',s.J==6.25&&s.fld=='6.25',s);
// session A: unsaved edit to 6.0 (draft written), then the same job is saved at 6.25 later (second window)
await setL(p,6);await p.evaluate(()=>drSave());const p2=await b.newPage();await p2.setViewport({width:390,height:844});p2.on('dialog',d=>d.accept());await p2.goto(URL);await W(1500);await openJob(p2);await setL(p2,6.25);await p2.evaluate(()=>saveJob());await W(900);await p2.close();
await CL(b,p);[b,p]=await L();await p.goto(URL);await W(1800);s=await st(p);log('service worker active after reopen',s.sw,s);
await p.evaluate(()=>tab('new'));await W(800);s=await st(p);log('no stale Restore-draft card for a job saved after the draft',!s.card,s);
await openJob(p);s=await st(p);log('reopened job shows 6.25 on Build',s.J==6.25&&s.fld=='6.25',s);
// unchanged saved job: closing must not leave a draft behind
await CL(b,p);[b,p]=await L();await p.goto(URL);await W(1500);const dr=await p.evaluate(()=>localStorage.getItem('mc_draft'));log('unchanged saved job leaves no draft on close',!dr,dr&&dr.slice(0,80));
await p.evaluate(()=>tab('new'));await W(600);s=await st(p);log('Build has no Restore card',!s.card,s);
// a genuine newer edit still restores
await openJob(p);await setL(p,6.5);await CL(b,p);[b,p]=await L();await p.goto(URL);await W(1500);await p.evaluate(()=>tab('new'));await W(800);s=await st(p);log('real unsaved edit still offers Restore',s.card,s);
await p.evaluate(()=>drRestore());await W(1200);s=await st(p);log('Restore brings back 6.5',s.J==6.5&&s.fld=='6.5',s);
await b.close();srv.close();console.log(r.join('\n'));const F=r.filter(x=>x.startsWith('FAIL')).length;console.log(`${r.length-F} passed, ${F} failed`);process.exit(F?1:0);
