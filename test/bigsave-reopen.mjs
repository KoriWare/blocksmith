// v114: storage guard is all-or-nothing (Stacey). Near quota, saving the 30k job fails visibly; last good save and the draft stay byte-identical across a true close + reopen.
// Needs test/fixtures/big30k.nc (synthetic, untracked, 780 KB). Run: node test/bigsave-reopen.mjs
import { createRequire } from 'module';const require=createRequire(import.meta.url);const {chromium}=require('/workspace/bs/mz8/node_modules/playwright-core');
import fs from 'fs';import os from 'os';import path from 'path';import {fileURLToPath} from 'url';const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const FX=ROOT+'/test/fixtures/big30k.nc';if(!fs.existsSync(FX)){console.log('SKIP big30k.nc missing');process.exit(0)}const BIG=fs.readFileSync(FX,'utf8').replace(/\n$/,'');
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'bsr-'));const R=[];const ok=(n,c,x)=>R.push([c?'PASS':'FAIL',n,x]);
const open=async()=>{const c=await chromium.launchPersistentContext(dir,{executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--allow-file-access-from-files'],viewport:{width:390,height:844}});
 await c.addInitScript(()=>{const nat=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){const L=+(sessionStorage.getItem('__LIM')||0);if(k==='mc'&&L&&String(v).length>L)throw new DOMException('The quota has been exceeded.','QuotaExceededError');return nat.call(this,k,v)}});
 const p=c.pages()[0]||await c.newPage();p.setDefaultTimeout(600000);await p.goto('file://'+ROOT+'/index.html');await p.waitForTimeout(1500);return {c,p}};
let {c,p}=await open();
await p.evaluate(()=>{localStorage.clear();localStorage.setItem('mc_tour','done')});await p.reload();await p.waitForTimeout(1200);
await p.evaluate(()=>{S.m[S.cur].s.forEach(x=>{x.st='user';if(x.k=='Program memory (lines)')x.v='100000'});save()});
await p.evaluate(t=>{tab('new');importToEditor(t);return window.R13IMP},BIG);
await p.evaluate(()=>{const n=document.getElementById('jn');if(n)n.value='Big 30k demo';saveJob()});await p.waitForTimeout(800);
const A=await p.evaluate(()=>localStorage.getItem('mc'));const good=await p.evaluate(()=>{const j=S.jobs[0];return (j.saved||j.code).join('\n')});ok('first save of the 30k job lands, text byte-identical',good===BIG,good.length);
// hand edit -> draft
await p.evaluate(async()=>{tab('edit');await new Promise(r=>setTimeout(r,300));const el=r13goLine(100);el.focus();el.textContent='G01 X0.1234 Y0.5678 (DRAFT EDIT)';el.dispatchEvent(new InputEvent('input',{bubbles:true}));el.blur();await new Promise(r=>setTimeout(r,1500));try{drSave()}catch(e){}});
const D=await p.evaluate(()=>localStorage.getItem(DRK));ok('hand edit is kept as a draft',!!D&&D.includes('(DRAFT EDIT)'),D&&D.length);
// fill storage near quota so the next save cannot fit
await p.evaluate(L=>sessionStorage.setItem('__LIM',String(L)),A.length-10);
const sv=await p.evaluate(async()=>{let err=null;try{tab('new');await new Promise(r=>setTimeout(r,300));saveJob()}catch(e){err=e.name}await new Promise(r=>setTimeout(r,800));return {err,toast:(document.getElementById('r11toast')||{}).textContent||''}});
ok('save that does not fit shows a visible "Not saved" message',/Not saved/.test(sv.toast),sv);
const after=await p.evaluate(()=>({mc:localStorage.getItem('mc'),dr:localStorage.getItem(DRK)}));
ok('last good save untouched (byte-identical, no partial write)',after.mc===A,[after.mc&&after.mc.length,A.length]);ok('draft untouched (byte-identical)',after.dr===D,[after.dr&&after.dr.length,D&&D.length]);
await c.close();
({c,p}=await open());await p.evaluate(()=>sessionStorage.removeItem('__LIM'));
const ro=await p.evaluate(()=>({mc:localStorage.getItem('mc'),dr:localStorage.getItem(DRK),job:(()=>{const j=S.jobs.find(x=>x.name=='Big 30k demo');return j&&(j.saved||j.code).join('\n')})(),drOffered:(()=>{try{return !!drGet()}catch(e){return 'err '+e.message}})()}));
ok('after true close + reopen: last good save intact and byte-identical',ro.mc===A&&ro.job===BIG,[ro.job&&ro.job.length]);
ok('after reopen: draft kept byte-identical and still offered',ro.dr===D&&ro.drOffered===true,ro.drOffered);
await c.close();fs.rmSync(dir,{recursive:true,force:true});
R.forEach(x=>console.log(x[0],x[1],x[0]=='FAIL'?JSON.stringify(x[2]):''));console.log('P='+R.filter(x=>x[0]=='PASS').length+' F='+R.filter(x=>x[0]=='FAIL').length);
