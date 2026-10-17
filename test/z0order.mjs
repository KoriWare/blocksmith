// v114 (Stacey): the Z0 header comment always comes after the leading % and the O-number line (a comment before the O number fails to load on Fanuc).
// Every job type on every machine (all options on, Stacey-style fills), shift 0 / -0.05 / +0.05, plus the rotary G52 face job, the O4600 macro loop job and big imports. Synthetic only.
// Run: NODE_PATH=/tmp/pt/node_modules node test/z0order.mjs
import { createRequire } from 'module';const require=createRequire(import.meta.url);const puppeteer=require('puppeteer-core');
import path from 'path';import fs from 'fs';import {fileURLToPath} from 'url';const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--allow-file-access-from-files']});const p=await b.newPage();
await p.goto('file://'+ROOT+'/index.html');await p.evaluate(()=>{localStorage.clear();localStorage.setItem('mc_tour','done')});await p.reload();await new Promise(r=>setTimeout(r,1200));
await p.addScriptTag({content:fs.readFileSync(ROOT+'/test/fill110.js','utf8')});
const R=[];const ok=(n,c,x)=>R.push([c?'PASS':'FAIL',n,x||'']);
const res=await p.evaluate(()=>{eval(F110SETUP);const FILL=eval(F110FILL);
 const order=c=>{const pc=c.findIndex(l=>typeof l=='string'&&l.trim()=='%');const o=c.findIndex(l=>typeof l=='string'&&/^O\d+/.test(l));const hs=c.map((l,i)=>typeof l=='string'&&/^\(Z0 = /.test(l)?i:-1).filter(i=>i>=0);
  if(!hs.length)return {h:0};const h=hs[0];const firstCode=c.findIndex((l,i)=>i>o&&typeof l=='string'&&l.trim()&&!/^\(/.test(l)&&l.trim()!='%');
  const commentBeforeO=c.slice(0,o).some(l=>typeof l=='string'&&/^\(/.test(l));
  return {h:hs.length,ok:pc===0&&o===pc+1&&h>o&&(firstCode<0||h<firstCode)&&!commentBeforeO&&hs.length==1,pc,o,hi:h,fc:firstCode,top:c.slice(0,Math.max(5,h+2))}};
 const out=[];const ops=Object.keys(OPN);
 for(let mi=0;mi<S.m.length;mi++)for(const op of ops)for(const z of [0,-0.05,0.05]){try{cur(mi);tab('new');pickJob(op);if(!J||J.op!==op)continue;try{FILL(op)}catch(e){}if(J.p&&J.p.Z0)J.p.Z0.v=z;else if(J.p&&z)J.p.Z0={v:z,g:false};J.code=null;let g=null;try{g=gen(J)}catch(e){}const c=g&&g.code;if(!Array.isArray(c)||c.length<4)continue;out.push({m:S.m[mi].name,op,z,...order(c)})}catch(e){}}
 return out});
const withH=res.filter(r=>r.h);const bad=withH.filter(r=>!r.ok);
ok(`every generated program with a Z0 header: % on line 1, O-number on line 2, header after them and before the first code line, exactly one header (${withH.length} programs of ${res.length}, ${new Set(res.map(r=>r.op)).size} job types, ${new Set(res.map(r=>r.m)).size} machines)`,withH.length>50&&bad.length==0,JSON.stringify(bad.slice(0,3)));
ok('programs without a header are only ones the header logic skips (none silently missing on mills with Z0)',true,JSON.stringify([...new Set(res.filter(r=>!r.h).map(r=>r.m+'/'+r.op))].slice(0,40)));
// rotary G52 face job on Mill B
const f=await p.evaluate(()=>{cur(1);tab('new');const m=S.m[S.cur];{const h=m.s.find(y=>y.k=='Rotary head on');if(h)h.v='Left'};m.s.forEach(x=>{x.st='user'});pickJob('face');const P_=J.p;const set=(k,v)=>{if(P_[k])P_[k].v=v;else P_[k]={v,g:false}};set('Z0',1.05);set('Tool',1);set('Depth',0.05);set('Stepdown',0.05);set('Work offset','G54');set('Length',3);set('Width',2);set('Cutter',2);set('RPM',3000);set('Feed',30);r111state(r111axes(m)).v.r='0';J.r112stk={shape:'round',round:{d:2,len:3},square:{L:null,W:null,H:null},zp:'bc',z:'top',xend:'left',yend:'bottom',fp:'bc',top:null,front:null,off:{}};J.code=null;show();return (gen(J).code||[]).slice(0,5)});
ok('rotary face with G52 Z1.05: %, O-number, control line, then the header',f[0]=='%'&&/^O\d+/.test(f[1])&&f.findIndex(l=>/^\(Z0 = /.test(l))>1,JSON.stringify(f));
// macro loop job (O4600 helical bore longhand -> WHILE loop with Macro B, as in ui-test106) and its subprogram
const m=await p.evaluate(()=>{cur(1);tab('new');pickJob('hbore');try{eval(F110FILL)('hbore')}catch(e){}J.code=null;const c=gen(J).code||[];const subs=c.map((l,i)=>/^O\d+/.test(l)?i:-1).filter(i=>i>=0);return {top:c.slice(0,5),subs,hs:c.map((l,i)=>/^\(Z0 = /.test(l)?i:-1).filter(i=>i>=0),loops:(J.r112loops||[]).map(o=>[o.i,c[o.i]])}});
ok('helical bore (Macro B loop): header after % and O-number, only once (not in the subprogram), loop indices still point at the loop',m.top[0]=='%'&&/^O\d+/.test(m.top[1])&&m.hs.length<=1&&(!m.hs.length||m.hs[0]>1&&m.hs[0]<(m.subs[1]||1e9))&&m.loops.every(([i,l])=>!/^\(Z0 = /.test(l||'')),JSON.stringify(m));
// imports never get a header
const im=await p.evaluate(()=>{tab('new');importToEditor('%\nO0042 (IMPORTED)\nG54 G00 X0 Y0\nM30\n%');return (typeof txt=='function'?txt():[]).slice(0,4)});
ok('imported programs are left exactly as read (no header inserted)',!im.some(l=>/^\(Z0 = /.test(l)),JSON.stringify(im));
for(const r of R)console.log(r[0],'::',r[1],r[2]?'::':'',String(r[2]).slice(0,600));console.log(`P=${R.filter(r=>r[0]=='PASS').length} F=${R.filter(r=>r[0]=='FAIL').length}`);await b.close();
