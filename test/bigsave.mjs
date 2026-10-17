// v113z13b: big-job storage guard — a save that would go over the storage quota keeps fewer old versions of big jobs and warns (synthetic data only).
// Run: NODE_PATH=/tmp/pt/node_modules node test/bigsave.mjs
import { createRequire } from 'module';const require=createRequire(import.meta.url);const puppeteer=require('puppeteer-core');
import path from 'path';import {fileURLToPath} from 'url';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--allow-file-access-from-files']});const p=await b.newPage();await p.setViewport({width:390,height:844});
// emulated quota underneath the app: a 'mc' value longer than window.__LIM throws QuotaExceededError like the browser does
await p.evaluateOnNewDocument(()=>{const nat=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k==='mc'&&window.__LIM&&String(v).length>window.__LIM)throw new DOMException('The quota has been exceeded.','QuotaExceededError');return nat.call(this,k,v)}});
await p.goto('file://'+ROOT+'/index.html');await p.evaluate(()=>{localStorage.clear();localStorage.setItem('mc_tour','done')});await p.reload();await new Promise(r=>setTimeout(r,1200));
const R=[];const ok=(n,c,x)=>R.push([c?'PASS':'FAIL',n,x]);
const r=await p.evaluate(()=>{const big=Array.from({length:2600},(_,i)=>'G01 X'+(i%50)/10+' Y1. (SYNTHETIC '+i+')');
 S.jobs.unshift({name:'Synthetic big',op:'import',code:big,date:Date.now(),versions:Array.from({length:12},(_,k)=>({name:'Synthetic big',code:big.map(l=>l+' V'+k)}))});
 S.jobs.push({name:'Synthetic small',op:'import',code:['G00 X0'],versions:[{code:['G00 X1']},{code:['G00 X2']}]});
 const full=JSON.stringify(S).length;const one=JSON.stringify(S.jobs[0].versions[0]).length;
 const out={};
 window.__LIM=0;save();out.noQuota=JSON.parse(localStorage.getItem('mc')).jobs[0].versions.length;
 window.__LIM=full-one*5;let err=null;try{save()}catch(e){err=e.name}const st=JSON.parse(localStorage.getItem('mc'));
 out.a={err,stored:st.jobs[0].versions.length,mem:S.jobs[0].versions.length,small:st.jobs.at(-1).versions.length,newest:st.jobs[0].versions.at(-1).code[0],code:st.jobs[0].code.join('\n')===big.join('\n'),toast:(document.getElementById('r11toast')||{}).textContent||''};
 S.jobs[0].versions=[];window.__LIM=JSON.stringify(S).length-2000;err=null;try{save()}catch(e){err=e.name}
 out.b={err,toast:(document.getElementById('r11toast')||{}).textContent||'',kept:JSON.parse(localStorage.getItem('mc')).jobs[0].versions.length};
 window.__LIM=0;return out});
ok('no quota: all 12 old versions saved',r.noQuota===12,r.noQuota);
ok('over quota: save succeeds with fewer old versions of the big job, newest kept',!r.a.err&&r.a.stored<12&&r.a.stored>=1&&/ V11$/.test(r.a.newest)&&r.a.code,r.a);
ok('small job versions untouched',r.a.small===2,r.a.small);
ok('in-memory job trimmed the same way (next save fits)',r.a.mem===r.a.stored,[r.a.mem,r.a.stored]);
ok('user is warned about the trim',/Storage is nearly full/.test(r.a.toast),r.a.toast);
ok('still too big: save throws QuotaExceededError and the user is told it was not saved (no silent failure)',r.b.err==='QuotaExceededError'&&/Not saved/.test(r.b.toast),r.b);
R.forEach(x=>console.log(x[0],x[1],x[0]=='FAIL'?JSON.stringify(x[2]):''));console.log('P='+R.filter(x=>x[0]=='PASS').length+' F='+R.filter(x=>x[0]=='FAIL').length);await b.close();
