// v113z13b: Simulate header Z0 wording (Casey) — "centerline" only for round bar on the rotary; square block / 3-axis read "top of stock" with the shift. Program text unchanged. Synthetic only.
// Run: NODE_PATH=/tmp/pt/node_modules node test/zerohdr.mjs
import { createRequire } from 'module';const require=createRequire(import.meta.url);const puppeteer=require('puppeteer-core');
import path from 'path';import {fileURLToPath} from 'url';const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--allow-file-access-from-files']});const p=await b.newPage();
await p.goto('file://'+ROOT+'/index.html');await p.evaluate(()=>{localStorage.clear();localStorage.setItem('mc_tour','done')});await p.reload();await new Promise(r=>setTimeout(r,1200));
const R=[];const ok=(n,c,x)=>R.push([c?'PASS':'FAIL',n,x]);
const run=(mt,shape,z0)=>p.evaluate((mt,shape,z0)=>{if(window.__mt0===undefined)window.__mt0=S.m[S.cur].mtype||null;S.m[S.cur].mtype=window.__mt0;tab('new');const m=S.m[S.cur];m.s.forEach(x=>{x.st='user'});pickJob('rboss');show();m.mtype=mt;const P_=J.p;const set=(k,v)=>{if(P_[k])P_[k].v=v;else P_[k]={v,g:false}};
 set('Boss placement','Center in stock');set('Sides','Back, Right, Front, Left');set('Boss L',4.5);set('Boss W',2);set('Depth',0.3);set('Z0',z0);set('Cutter',0.5);set('Stepdown',0.1);set('Stepover %',75);set('Finish stock',0.01);set('Feed',20);set('Plunge feed',10);set('RPM',3000);set('Clear Z',0.1);set('Tool',4);set('Keep tool down','YES');set('Work offset','G54');['Back-right','Front-right','Front-left','Back-left'].forEach(k=>set('Corner '+k,'None'));set('Cut direction','Climb');set('Edge overrun',0.1);
 J.r112stk={shape,round:shape=='round'?{d:5.5,len:6}:{d:null,len:null},square:{L:5,W:3,H:1},zp:'tr',z:'top',xend:'left',yend:'bottom',fp:'bc',top:null,front:null,off:{}};J.r112comp={m:'G41',w:'control'};J.code=null;show();
 return {h:zeroDesc(),md:r112smode(),code:JSON.stringify(gen(J).code)}},mt,shape,z0);
const a=await run('vmc4','square',-0.05);ok('4th-axis VMC, square block, Z0 shift -0.05: same words as the program header "Z0 = 0.05 above stock top - shift -0.05 - stock top at Z-0.05" (v114)',/Z0 = 0\.05 above stock top - shift -0\.05 - stock top at Z-0\.05( - G52 Z-0\.05 to part zero)?$/.test(a.h),a.h+' md='+a.md);
const a0=await run('vmc4','square',0);ok('4th-axis VMC, square block, no shift: "Z0 = top of stock"',/Z0 = top of stock$/.test(a0.h),a0.h);
const c=await run('vmc3','square',0.05);ok('3-axis VMC, Z0 +0.05: "Z0 = 0.05 below stock top - shift 0.05 - stock top at Z0.05" (v114)',/Z0 = 0\.05 below stock top - shift 0\.05 - stock top at Z0\.05( - G52 Z0\.05 to part zero)?$/.test(c.h),c.h);
const r=await run('vmc4','round',0);ok('round bar on the A rotary keeps "Z0 = centerline"',/Z0 = centerline$/.test(r.h),r.h+' md='+r.md);
ok('program text is not built from the header (code unchanged by the wording)',a.code.length>100&&!/top of stock \+|centerline\)/.test(a.code),'');
R.forEach(x=>console.log(x[0],x[1],x[0]=='FAIL'?JSON.stringify(x[2]):''));console.log('P='+R.filter(x=>x[0]=='PASS').length+' F='+R.filter(x=>x[0]=='FAIL').length);await b.close();
