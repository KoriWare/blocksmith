// v114 (Casey): a job saved under a typed name ("Casey demo 6.25") keeps that name - Save… from Editor, Build and Simulate prefills it and updates the same Library entry (one entry after reopen). Synthetic only.
// Run: NODE_PATH=/tmp/pt/node_modules node test/savename.mjs
import { createRequire } from 'module';const require=createRequire(import.meta.url);const puppeteer=require('puppeteer-core');
import path from 'path';import fs from 'fs';import {fileURLToPath} from 'url';const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--allow-file-access-from-files']});const p=await b.newPage();await p.setViewport({width:390,height:844});
await p.goto('file://'+ROOT+'/index.html');await p.evaluate(()=>{localStorage.clear();localStorage.setItem('mc_tour','done')});await p.reload();await new Promise(r=>setTimeout(r,1200));
await p.addScriptTag({content:fs.readFileSync(ROOT+'/test/fill110.js','utf8')});const w=ms=>new Promise(r=>setTimeout(r,ms));
const R=[];const ok=(n,c,x)=>R.push([c?'PASS':'FAIL',n,x||'']);const E=s=>p.evaluate(s);
await E(`eval(F110SETUP);window.__F=eval(F110FILL);cur(0);tab('new');pickJob('rpock');__F('rpock');show();[...document.querySelectorAll('button')].find(b=>/Generate Code/.test(b.textContent))?.click();1`);await w(600);
await E(`$('#jn').value='Casey demo 6.25';[...document.querySelectorAll('button[onclick="saveJob()"]')].find(b=>b.offsetParent).click();1`);await w(500);
ok('Save to Library with a typed name: the open job now carries that name',await E(`J.name=='Casey demo 6.25'&&S.jobs.filter(j=>j.name=='Casey demo 6.25').length==1`));
const pg=t=>E(`[...document.querySelectorAll('.tabs button')].find(b=>b.textContent.trim()==${JSON.stringify(t)}).click();1`);
for(const t of ['Editor','Build','Simulate']){await pg(t);await w(900);await E(`[...document.querySelectorAll('button[onclick="qSave()"]')].find(b=>b.offsetParent).click();1`);await w(300);
 const pre=await E(`(()=>{const i=[...document.querySelectorAll('input')].filter(i=>i.offsetParent).find(i=>i.closest('#dlg,.dlg,[role=dialog]'));return i?i.value:null})()`);
 await E(`[...document.querySelectorAll('button')].find(b=>b.offsetParent&&b.textContent.trim()=='OK').click();1`);await w(400);
 const n=await E(`S.jobs.filter(j=>j.name=='Casey demo 6.25').length+'/'+S.jobs.length`);ok(`${t} Save…: prefills "Casey demo 6.25" and updates the same entry`,pre=='Casey demo 6.25'&&n=='1/1',pre+' '+n)}
await p.reload();await w(1500);ok('after reload: Library/Home has exactly 1 entry',await E(`S.jobs.length==1&&S.jobs[0].name=='Casey demo 6.25'&&(S.jobs[0].versions||[]).length>=3`),await E(`JSON.stringify(S.jobs.map(j=>[j.name,(j.versions||[]).length]))`));
for(const r of R)console.log(r[0],'::',r[1],r[2]?':: '+r[2]:'');console.log(`P=${R.filter(r=>r[0]=='PASS').length} F=${R.filter(r=>r[0]=='FAIL').length}`);await b.close();
