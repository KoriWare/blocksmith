// Node check: our reader vs dxf-parser (MIT, test reference only — not shipped). Usage: node ref-check.js <path-to-index.html> <dxf-parser dir>
const fs=require('fs'),path=require('path');const [,,html,ref]=process.argv;
const src=fs.readFileSync(html,'utf8');const blocks=[...src.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]).filter(b=>/const DXF=\{max/.test(b)||/DXH\.SPLINE|DXH\['SPLINE'\]/.test(b));
let code='';for(const b of blocks){const end=b.indexOf('// ---------- screen');code+=(end>0?b.slice(0,end):b.split('// ---------- arc fit')[0])+'\n'}
const ctx={};new Function('ctx',code+';ctx.dxRead=dxRead;ctx.dxBuild=dxBuild;ctx.dxBulge=dxBulge;ctx.dxArea=dxArea;ctx.dxPoly=dxPoly;')(ctx);
const DxfParser=require(path.join(ref,'node_modules/dxf-parser'));let fail=0;const ok=(n,c,x)=>{console.log((c?'PASS ':'FAIL ')+n+(c?'':' :: '+(x||'')));if(!c)fail++};
const D=path.join(path.dirname(html),'test/dxf');
for(const f of ['plate_r12.dxf','plate_2018_mm.dxf','open_gap.dxf','lathe_half.dxf','patterns.dxf']){const t=fs.readFileSync(path.join(D,f),'latin1');const ours=ctx.dxRead(t,f);let theirs;try{theirs=new DxfParser().parseSync(t)}catch(e){ok(f+' dxf-parser reads it',false,e.message);continue}
 const cnt=(arr,ty)=>arr.filter(e=>e.type==ty).length;const ents=theirs.entities;
 const ourC=t2=>ours.raw.filter(e=>e.t==t2).length;['LINE','ARC','CIRCLE','LWPOLYLINE','POLYLINE','INSERT','TEXT','DIMENSION'].forEach(ty=>{if(cnt(ents,ty)||ourC(ty))ok(f+' '+ty+' count matches dxf-parser ('+ourC(ty)+')',cnt(ents,ty)==ourC(ty),cnt(ents,ty))});
 // polyline vertices + bulges
 ents.filter(e=>e.type=='LWPOLYLINE'||e.type=='POLYLINE').forEach((e,i)=>{const mine=ours.raw.filter(x=>x.t==e.type)[i];const nv=e.type=='LWPOLYLINE'?mine.g.filter(p=>p[0]==10).length:mine.v.length;ok(f+' '+e.type+' #'+i+' vertices '+nv,nv==e.vertices.length,e.vertices.length);
  const bul=e.vertices.map(v=>v.bulge||0),mb=e.type=='LWPOLYLINE'?(()=>{const o=[];let cur=null;mine.g.forEach(([c,v])=>{if(c==10){cur={b:0};o.push(cur)}else if(c==42&&cur)cur.b=+v});return o.map(x=>x.b)})():mine.v.map(v=>{const x=v.g.find(p=>p[0]==42);return x?+x[1]:0});ok(f+' '+e.type+' #'+i+' bulges match',JSON.stringify(bul)==JSON.stringify(mb),JSON.stringify(bul)+' vs '+JSON.stringify(mb))});
 ok(f+' $INSUNITS matches',(theirs.header.$INSUNITS??null)==ours.ins,theirs.header.$INSUNITS+' vs '+ours.ins);ok(f+' $ACADVER matches',(theirs.header.$ACADVER??null)==ours.ver,theirs.header.$ACADVER+' vs '+ours.ver)}
// bulge math: semicircle, quarter arcs both signs, compared with the circle through 3 points
const A=ctx.dxBulge([0,0],[2,0],1);ok('bulge 1 = semicircle r=1 center (1,0) ccw',Math.abs(A.r-1)<1e-12&&Math.abs(A.c[0]-1)<1e-12&&Math.abs(A.c[1])<1e-12&&A.ccw&&Math.abs(A.sw-180)<1e-9);
const q=Math.tan(Math.PI/8),B=ctx.dxBulge([1,0],[0,1],q);ok('bulge tan(22.5°): 90° ccw arc about origin',Math.hypot(...B.c)<1e-12&&Math.abs(B.r-1)<1e-12&&B.ccw&&Math.abs(B.sw-90)<1e-9,JSON.stringify(B));
const C=ctx.dxBulge([0,1],[1,0],-q);ok('negative bulge: clockwise, same circle',Math.hypot(...C.c)<1e-12&&!C.ccw);
const Dd=ctx.dxBulge([0,0],[2,0],-0.5);ok('bulge -0.5: CW, r = c(1+b²)/4|b| = 1.25, sagitta |b|·c/2 = 0.5 on the left of travel',!Dd.ccw&&Math.abs(Dd.r-1.25)<1e-12&&Math.abs(Dd.c[1]+Dd.r-0.5)<1e-12,JSON.stringify(Dd));
process.exit(fail?1:0)
