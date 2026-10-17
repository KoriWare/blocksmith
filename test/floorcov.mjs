// v113z13b: floor-pass coverage (Stacey) — rasterize everything the last roughing level cut and check the floor pass at final Z cuts all of it.
// Rectangular Boss/Profile and Rectangular pocket, synthetic settings only. Run: NODE_PATH=/tmp/pt/node_modules node test/floorcov.mjs
import { createRequire } from 'module';const require=createRequire(import.meta.url);const puppeteer=require('puppeteer-core');
import path from 'path';import {fileURLToPath} from 'url';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--allow-file-access-from-files']});const p=await b.newPage();await p.setViewport({width:390,height:844});
await p.goto('file://'+ROOT+'/index.html');await p.evaluate(()=>{localStorage.clear();localStorage.setItem('mc_tour','done')});await p.reload();await new Promise(r=>setTimeout(r,1200));
const R=[];const ok=(n,c,x)=>R.push([c?'PASS':'FAIL',n,x]);
const cases=[];
for(const [corners,L,W,so,ds] of [[['Chamfer 1.5','Chamfer 0.1','Chamfer 0.75','Round 0.4'],4.5,2,75,0.1],[['Round 0.25','Round 0.25','Round 0.25','Round 0.25'],3,1.5,50,0.15],[['Chamfer 1.0','Chamfer 0.1','Chamfer 0.6','Round 0.5'],4,2.4,40,0.12],[['None','None','None','None'],2,1,75,0.1]])
 for(const fz of [0.007,0.02])cases.push({op:'rboss',corners,L,W,so,ds,fz});
for(const [L,W,so] of [[3,2,50],[2.5,1.2,75]])for(const fz of [0.007,0.02])cases.push({op:'rpock',L,W,so,fz});
for(const c of cases){const r=await p.evaluate(c=>{tab('new');S.m[S.cur].s.forEach(x=>{x.st='user'});pickJob(c.op);show();const j=J;const P=j.p;const set=(k,v)=>{if(P[k])P[k].v=v;else P[k]={v,g:false}};
 set('Cutter',0.5);set('Stepover %',c.so);set('Finish stock',0.01);set('Finish stock Z',c.fz);
 if(c.op=='rboss'){set('Boss placement','Center in stock');set('Sides','Back, Right, Front, Left');set('Keep tool down','YES');set('Boss L',c.L);set('Boss W',c.W);set('Depth',0.3);set('Stepdown',c.ds);['Back-right','Front-right','Front-left','Back-left'].forEach((k,i)=>set('Corner '+k,c.corners[i]));j.r112stk={shape:'square',round:{d:null,len:null},square:{L:5,W:3,H:1},zp:'tr',z:'top',xend:'left',yend:'bottom',fp:'bc',top:null,front:null,off:{}}}
 else{set('Pocket L',c.L);set('Pocket W',c.W);set('Depth',0.3);set('Stepdown',0.1);delete P['Finish stock Z']}
 j.r112comp=c.op=='rpock'?{m:'G41',w:'control',fs:0.01,fl:c.fz}:{...(j.r112comp||{}),m:'G41',w:'control'};j.code=null;show();const code=gen(j).code||[];window.__C=code;const run=interp(code,{lathe:0});
 const seg=run.moves.filter(m=>!m.r&&Math.abs(m.a[2]-m.b[2])<1e-6);const D=Math.abs((P.Depth||{v:0.3}).v);const zf=-D;const cut=run.moves.filter(m=>!m.r);const zs=[...new Set(cut.map(m=>+m.b[2].toFixed(4)).filter(z=>z<0))].sort((a,b)=>a-b);
 const fi=code.findIndex(l=>/^\(FINISH PASS/.test(l));const fl=code.findIndex(l=>/^\(FLOOR PASS/.test(l));
  /* last roughing level = the deepest Z above final with real horizontal cutting (ramp ends are skipped) */const cnt={};seg.forEach(m=>{const z=+m.b[2].toFixed(4);if(z>zf+1e-4&&Math.hypot(m.b[0]-m.a[0],m.b[1]-m.a[1])>1e-4)cnt[z]=(cnt[z]||0)+1});const lv=Object.keys(cnt).map(Number).filter(z=>cnt[z]>=4);const lastRough=lv.length?Math.min(...lv):null;
 const rough=seg.filter(m=>lastRough!=null&&Math.abs(m.b[2]-lastRough)<1e-4);const floor=seg.filter(m=>Math.abs(m.b[2]-zf)<1e-4&&m.l>fl&&(fi<0||m.l<fi));
 const rt=0.25,h=0.01;let bb=[1e9,1e9,-1e9,-1e9];rough.forEach(m=>{[m.a,m.b].forEach(q=>{bb[0]=Math.min(bb[0],q[0]-rt);bb[1]=Math.min(bb[1],q[1]-rt);bb[2]=Math.max(bb[2],q[0]+rt);bb[3]=Math.max(bb[3],q[1]+rt)})});
 const d2=(x,y,m)=>{const ax=m.a[0],ay=m.a[1],dx=m.b[0]-ax,dy=m.b[1]-ay,L=dx*dx+dy*dy;let t=L?((x-ax)*dx+(y-ay)*dy)/L:0;t=Math.max(0,Math.min(1,t));const ex=ax+t*dx-x,ey=ay+t*dy-y;return ex*ex+ey*ey};
 const inS=(x,y,S)=>S.some(m=>d2(x,y,m)<=rt*rt);let tot=0,miss=0,ex=null;
 for(let x=bb[0];x<=bb[2];x+=h)for(let y=bb[1];y<=bb[3];y+=h){if(!inS(x,y,rough))continue;tot++;/* tolerance: a hair inside the roughed disc edge */if(!inS(x,y,floor)&&rough.some(m=>d2(x,y,m)<=(rt-0.003)**2)){miss++;if(!ex)ex=[+x.toFixed(3),+y.toFixed(3)]}}
 return {c0:code.filter(l=>l[0]=='(').join(' / ').slice(0,600),zf,lastRough,nRough:rough.length,nFloor:floor.length,tot,miss,ex,order:[fl,fi],comp:floor.some(m=>/G4[12]/.test(code[m.l]||''))}},c);
 const name=`${c.op} ${c.L}x${c.W} stepover ${c.so}% finish Z ${c.fz}${c.corners?' corners '+c.corners.join('/'):''}`;
 ok(name+': floor pass at final Z cuts 100% of the area the last roughing level cut',r.nFloor>0&&r.miss===0&&r.tot>100&&r.order[0]>0&&r.order[0]<r.order[1]&&!r.comp,r);console.log(name,JSON.stringify(r))}
R.forEach(x=>console.log(x[0],x[1],x[0]=='FAIL'?JSON.stringify(x[2]):''));console.log('P='+R.filter(x=>x[0]=='PASS').length+' F='+R.filter(x=>x[0]=='FAIL').length);await b.close();
