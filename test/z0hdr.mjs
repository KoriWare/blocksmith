// v114 item 7 (Casey/Kori): the program header always states the job's Z0 datum - "(Z0 = TOP OF STOCK)" (+ the shift the generator applies), "(Z0 = CENTERLINE)" for a round bar on the rotary. Synthetic only.
// Run: NODE_PATH=/tmp/pt/node_modules node test/z0hdr.mjs
import { createRequire } from 'module';const require=createRequire(import.meta.url);const puppeteer=require('puppeteer-core');
import path from 'path';import {fileURLToPath} from 'url';const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--allow-file-access-from-files']});const p=await b.newPage();
await p.goto('file://'+ROOT+'/index.html');await p.evaluate(()=>{localStorage.clear();localStorage.setItem('mc_tour','done')});await p.reload();await new Promise(r=>setTimeout(r,1200));
const R=[];const ok=(n,c,x)=>R.push([c?'PASS':'FAIL',n,x]);
const run=(op,mt,shape,z0)=>p.evaluate((op,mt,shape,z0)=>{tab('new');const m=S.m[S.cur];m.s.forEach(x=>{x.st='user'});pickJob(op);m.mtype=mt;const P_=J.p;const set=(k,v)=>{if(P_[k])P_[k].v=v;else P_[k]={v,g:false}};
 set('Z0',z0);set('Cutter',0.5);set('Depth',0.3);set('Stepdown',0.1);set('Feed',20);set('Plunge feed',10);set('RPM',3000);set('Tool',1);
 if(op=='rboss'){set('Boss placement','Center in stock');set('Sides','Back, Right, Front, Left');set('Boss L',2);set('Boss W',1)}else{set('Boss Ø',1)}
 J.r112stk=shape=='round'?{shape:'round',round:{d:2,len:3},square:{L:null,W:null,H:null},zp:'bc',z:'top',xend:'left',yend:'bottom',fp:'bc',top:null,front:null,off:{}}:{shape:'square',round:{d:null,len:null},square:{L:5,W:3,H:1},zp:'tr',z:'top',xend:'left',yend:'bottom',fp:'bc',top:null,front:null,off:{}};
 J.r112comp={...(J.r112comp||{}),m:'G41',w:'control'};J.code=null;show();const c=gen(J).code||[];return {h:c.filter(l=>/^\(Z0 = /.test(l)),i:c.findIndex(l=>/^\(Z0 = /.test(l)),g43:c.find(l=>/^G43/.test(l))}},op,mt,shape,z0);
let r=await run('rboss','vmc3','square',0);ok('top of stock, shift 0: one header line "(Z0 = TOP OF STOCK)" near the top',r.h.length==1&&r.h[0]=='(Z0 = TOP OF STOCK)'&&r.i>0&&r.i<6,JSON.stringify(r));
r=await run('rboss','vmc3','square',-0.05);ok('top of stock, shift -0.05: header states the shift',r.h.length==1&&r.h[0]=='(Z0 = 0.05 ABOVE STOCK TOP - SHIFT -0.05 - STOCK TOP AT Z-0.05)',JSON.stringify(r));
r=await run('rboss','vmc3','square',0.05);ok('top of stock, shift +0.05: "(Z0 = 0.05 BELOW STOCK TOP - SHIFT 0.05 - STOCK TOP AT Z0.05)"',r.h.length==1&&r.h[0]=='(Z0 = 0.05 BELOW STOCK TOP - SHIFT 0.05 - STOCK TOP AT Z0.05)',JSON.stringify(r));
r=await run('cboss','vmc4','round',0);ok('round bar on the rotary, shift 0: "(Z0 = CENTERLINE)"',r.h.length==1&&r.h[0]=='(Z0 = CENTERLINE)',JSON.stringify(r));
const r2=await run('cboss','vmc4','round',-0.05);ok('round bar on the rotary, shift -0.05: still "(Z0 = CENTERLINE)" - the generator does not apply the shift there (same G43 line)',r2.h.length==1&&r2.h[0]=='(Z0 = CENTERLINE)'&&r2.g43===r.g43,JSON.stringify([r2,r.g43]));

// Stacey 9:14: Mill B rotary face mill, 2 in bar, Z0 shift 1.05 writes G52 Z1.05 - the header must say so (read from the G52 line the generator wrote)
const fz=(z0)=>p.evaluate((z0)=>{cur(1);tab('new');const m=S.m[S.cur];{const h=m.s.find(y=>y.k=='Rotary head on');if(h)h.v='Left'};m.s.forEach(x=>{x.st='user'});pickJob('face');const P_=J.p;const set=(k,v)=>{if(P_[k])P_[k].v=v;else P_[k]={v,g:false}};set('Z0',z0);set('Tool',1);set('Depth',0.05);set('Stepdown',0.05);set('Work offset','G54');set('Length',3);set('Width',2);set('Cutter',2);set('RPM',3000);set('Feed',30);r111state(r111axes(m)).v.r='0';
 J.r112stk={shape:'round',round:{d:2,len:3},square:{L:null,W:null,H:null},zp:'bc',z:'top',xend:'left',yend:'bottom',fp:'bc',top:null,front:null,off:{}};J.code=null;show();const c=gen(J).code||[];return {h:c.filter(l=>/^\(Z0 = /.test(l)),g52:c.find(l=>/^G52/.test(l))}},z0);
let f=await fz(1.05);ok('Mill B rotary face, Z0 1.05: "(Z0 = CENTERLINE - G52 Z1.05 TO PART ZERO)" and the program writes G52 ... Z1.05',f.h.length==1&&f.h[0]=='(Z0 = CENTERLINE - G52 Z1.05 TO PART ZERO)'&&/Z1\.05\b/.test(f.g52),JSON.stringify(f));
f=await fz(0);ok('Mill B rotary face, Z0 0: plain "(Z0 = CENTERLINE)" (G52 writes no shift)',f.h.length==1&&f.h[0]=='(Z0 = CENTERLINE)',JSON.stringify(f));
r=await run('cboss','vmc3','round',0);ok('round bar on a 3-axis table: "(Z0 = TOP OF STOCK)"',r.h.length==1&&r.h[0]=='(Z0 = TOP OF STOCK)',JSON.stringify(r));
R.forEach(x=>console.log(x.join(' :: ').slice(0,400)));console.log('P='+R.filter(x=>x[0]=='PASS').length+' F='+R.filter(x=>x[0]=='FAIL').length);await b.close();
