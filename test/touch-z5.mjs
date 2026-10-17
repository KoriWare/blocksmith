// v113z5 touch tests at 390x844. Run: NODE_PATH=<puppeteer-core> node test/touch-z5.mjs [shotDir]
import { createRequire } from 'module';import fs from 'fs';import path from 'path';import {fileURLToPath} from 'url';
const require=createRequire(import.meta.url);const puppeteer=require('puppeteer-core');
const HERE=path.dirname(fileURLToPath(import.meta.url)),BASE=path.resolve(HERE,'..'),SHOT=process.argv[2]||'/tmp';
const FX=n=>fs.readFileSync(path.join(HERE,'fixtures','demo-'+n+'.mbjob'),'utf8');
let pass=0,fail=0;const ok=(c,m)=>{if(c){pass++;console.log('PASS',m)}else{fail++;console.log('FAIL',m)}};
const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',headless:'new',args:['--no-sandbox','--allow-file-access-from-files']});
let p;async function newPage(){if(p)await p.close().catch(()=>{});p=await b.newPage();await p.evaluateOnNewDocument(()=>{window.R12DEFMODE='control'}) /* v113z13b: Control-mode regressions; Wear in ui-test147/148 */;await p.setViewport({width:390,height:844,hasTouch:true,isMobile:true});p.on('pageerror',e=>console.log('PAGEERR',e.message));p.on('dialog',d=>d.dismiss().catch(()=>{}))}await newPage();const sl=ms=>new Promise(r=>setTimeout(r,ms));
const URL='file://'+BASE+'/index.html?v=113z5';
const E=(s,...a)=>p.evaluate(s,...a);
const tapEl=async h=>{await h.evaluate(e=>e.scrollIntoView({block:'center'}));await sl(150);const bb=await h.boundingBox();if(!bb)throw new Error('not visible');await p.touchscreen.tap(bb.x+bb.width/2,bb.y+bb.height/2);await sl(450)};
const tap=async sel=>{const h=await p.$(sel);if(!h)throw new Error('no '+sel);await tapEl(h)};
let NAV=0;const go=async()=>{for(let i=0;i<3;i++){try{await p.goto(URL+'&n='+(NAV++));return}catch(e){await sl(500)}}throw new Error('nav failed')};
async function fresh(){await newPage();await go();await E(()=>{localStorage.clear();localStorage.setItem('mc_tour','done')});await go();await sl(900);await E(()=>{cur(0);S.m[0].s.forEach(x=>x.st='user');save()})}
// load a demo fixture through the real import path (same control -> values kept), then add the stock + comp the file lacks
async function loadFx(n,stk){await E((t,n,stk)=>{const x=mbParse(t);const r=mbAdd(x,0);const i=S.jobs.indexOf(r);reopen(i);if(stk)Object.assign(r112stk(),stk);J.r112comp=J.r112comp||{m:'G41',d:4};show();return 1},FX(n),n,stk||(n=='rad'?{shape:'square',square:{L:3.5,W:2.25,H:1},zp:'tr'}:{shape:'square',square:{L:4,W:3,H:1},zp:'tr'}));await sl(500);await genTap()}
async function genTap(){const h=await p.evaluateHandle(()=>[...document.querySelectorAll('button')].find(e=>e.offsetParent&&e.textContent.trim()=='Generate Code'));if(h.asElement())await tapEl(h.asElement());await sl(300)}
const code=async()=>{await genTap();return E(()=>(J.code||[]).slice())};
globalThis.engScan=async function(){return E(()=>{const c=J.code;const M=interp(c);const mv=(Array.isArray(M)?M:M.moves).filter(m=>!m.r);const fi=c.findIndex(l=>/^\(FINISH PASS|^\(FLOOR PASS/.test(l));const bx=rbBox(J),o=rbData(J),P5=r5poly(o),r=+J.p.Cutter.v/2,so=+J.p.Cutter.v*(+J.p['Stepover %'].v||50)/100;
 /* every move of every kind at every Z level: rough, extra material, entries, exits, floor and finish. A plunge that lands on stock counts as a full-width cut. */
 const h=0.005,W=0.05,nx=Math.ceil((bx[3]-bx[0])/h),ny=Math.ceil((bx[4]-bx[1])/h);const z0=bx[5];let win=[],wsum=0,wlen=0;let worst=0,wl='',left=0,plunge='';
 const levels=[...new Set(mv.filter(m=>m.b[2]<z0-1e-6).map(m=>+m.b[2].toFixed(5)))].sort((a,b)=>b-a);let g;const scan=lim=>{g=new Uint8Array(nx*ny);
 for(let i=0;i<nx;i++)for(let k=0;k<ny;k++){const x=bx[0]+(i+.5)*h,y=bx[1]+(k+.5)*h;if(r5polyD(P5,x,y)>0)g[i*ny+k]=1}
 const disk=(x,y,count)=>{let n=0;for(let i=Math.max(0,Math.floor((x-r-bx[0])/h));i<=Math.min(nx-1,Math.ceil((x+r-bx[0])/h));i++)for(let k=Math.max(0,Math.floor((y-r-bx[1])/h));k<=Math.min(ny-1,Math.ceil((y+r-bx[1])/h));k++){const px=bx[0]+(i+.5)*h,py=bx[1]+(k+.5)*h;if(g[i*ny+k]&&(px-x)**2+(py-y)**2<=r*r){g[i*ny+k]=0;n++}}return n};
 /* levels top-down: material at a level is what every level above already left (same XY grid, the boss is a prism) */
 levels.forEach(zl=>{win=[];wsum=0;wlen=0;mv.forEach(m=>{if(m.l>=lim)return;const za=+m.a[2].toFixed(5),zb=+m.b[2].toFixed(5);if(zb!==zl&&za!==zl)return;
   if(za!==zb){win=[];wsum=0;wlen=0;/* plunge or ramp ending at this level */if(zb===zl){const n=disk(m.b[0],m.b[1]);if(n*h*h>0.02*r*r&&!plunge)plunge=c[m.l]}return}
   /* v113z7: engagement = area removed over a sliding 0.05 window of travel, on every move however short (entries included), carried across consecutive moves */
   const len=Math.hypot(m.b[0]-m.a[0],m.b[1]-m.a[1]);if(len<1e-9)return;const ds=h/2,st=Math.max(1,Math.ceil(len/ds)),dd=len/st;for(let s=1;s<=st;s++){const n=disk(m.a[0]+(m.b[0]-m.a[0])*s/st,m.a[1]+(m.b[1]-m.a[1])*s/st);win.push([n,dd,m.l]);wsum+=n;wlen+=dd;while(wlen-win[0][1]>=W-1e-12){wsum-=win[0][0];wlen-=win[0][1];win.shift()}if(wlen>=W-1e-9){const ae=wsum*h*h/wlen;if(ae>worst){worst=ae;wl=c[m.l]+' @Z'+zl}}}});
  })};
 /* uncut stock after roughing (before floor/finish) is what the finish must take */
 scan(fi<0?1e9:fi);for(let i=0;i<nx;i+=2)for(let k=0;k<ny;k+=2)if(g[i*ny+k]){const d=r5polyD(P5,bx[0]+(i+.5)*h,bx[1]+(k+.5)*h);if(d>left)left=d}
 worst=0;wl='';plunge='';scan(1e9);
 return {worst,so,wl,left,plunge,em:r5emSum(J)}})};;
const hold=()=>E(()=>(document.querySelector('#out .ok.bad')||{}).textContent||'');

try{
await fresh();
// ---------- 1) opposite sides + Keep tool down (Maria): a YES file imports locked to Off - Off highlighted, reason under it, program lifts between sides
await loadFx('opp');
let h=await hold();let c0=await code();
ok(await E(()=>J.p['Keep tool down'].v)=='YES'&&!/don't connect/.test(h)&&c0.length>0,'YES file + opposite sides: no hold, program written (file value kept as YES)');
let sw=await E(()=>{const s=document.querySelector('.r5sw[data-r5k="Keep tool down"]');return s&&{offOn:s.querySelector('[data-v=NO]').classList.contains('on')&&s.querySelector('[data-v=NO]').getAttribute('aria-checked')=='true',yesOn:s.querySelector('[data-v=YES]').classList.contains('on'),yesDis:s.querySelector('[data-v=YES]').disabled,why:(s.querySelector('.r5why')||{}).textContent||''}});
ok(sw&&sw.offOn&&!sw.yesOn&&sw.yesDis&&/(Back and Front|Front and Back) don't connect, so staying at depth would cut (Right and Left|Left and Right)\. Turn off Keep tool down, or pick those sides too\./.test(sw.why),'locked: Off highlighted, On disabled and not highlighted, reason printed under the switch: '+JSON.stringify(sw).slice(0,160));
{const nx=c0.findIndex(l=>/NEXT SIDE/.test(l));ok(!c0.some(l=>/KEEP DOWN/.test(l))&&nx>0&&/^G00 Z/.test(c0[nx-1])&&c0.filter(l=>/^G00 Z/.test(l)).length>4,'locked: G-code lifts (no keep-down feeds; G00 Z before the other side)')}
await E(()=>document.querySelector('.r5sw[data-r5k="Keep tool down"]').scrollIntoView({block:'center'}));await p.screenshot({path:SHOT+'/v113z5-opp-hold.png'});
await tap('.r5sw[data-r5k="Keep tool down"] [data-v=NO]');
let c=await code();
ok(c.length>0&&await E(()=>J.p['Keep tool down'].v)=='NO','tapping Off writes the program');
{const fin=c.map((l,i)=>/^\(FINISH PASS/.test(l)?i:-1).filter(i=>i>=0),nx=c.findIndex(l=>/NEXT SIDE/.test(l));const rough2=c.findIndex((l,i)=>i>nx&&/^G01 Z/.test(l));
 ok(fin.length==2&&fin[0]<nx&&nx<rough2&&rough2<fin[1]&&/^G00 Z/.test(c[nx-1]),'opposite sides: side 1 roughed + finished, retract to Clear Z, then side 2 ('+fin+' / '+nx+')');}
// Simulate order shot
await E(()=>tab('sim'));await sl(900);await E(()=>{const n=J.code.findIndex(l=>/NEXT SIDE/.test(l));const m=(J.M||J.moves||[]).findIndex(x=>x&&x.ln>=n);if(m>0&&typeof scrub=='function')scrub(m)});await sl(400);await p.screenshot({path:SHOT+'/v113z5-opp-sim.png'});await E(()=>tab('new'));await sl(500);
// spring pass with opposite sides runs after each side's own finish
await E(()=>{J.p['Spring pass']={v:'On - 1 pass',g:false};show()});await sl(300);c=await code();
{const s=c.map((l,i)=>/^\(SPRING PASS/.test(l)?i:-1).filter(i=>i>=0),nx=c.findIndex(l=>/NEXT SIDE/.test(l)),f=c.map((l,i)=>/^\(FINISH PASS/.test(l)?i:-1).filter(i=>i>=0);ok(s.length==2&&f[0]<s[0]&&s[0]<nx&&nx<f[1]&&f[1]<s[1],'opposite sides: each spring pass right after its own finish, before crossing')}
// ---------- 2) radius corner preview comes from the program's arc
await fresh();await loadFx('rad');
{const r=await E(()=>{const d=document.querySelector('#rbpick path.rbpart').getAttribute('d');const m=/A([\d.]+) [\d.]+ 0 0 ([01])/.exec(d);const fr=document.querySelector('[data-rbshape=Front]');const px=Math.abs(fr.getAttribute('x2')-fr.getAttribute('x1'));const c=J.code;const i=c.findIndex(l=>/^\(FINISH PASS/.test(l));const on=c.findIndex((l,k)=>k>i&&/COMP ON/.test(l));const a=c.slice(on+2).find(l=>/^G0[23] .*J/.test(l)&&!/LEAD/.test(l));const I=+/I(-?[\d.]+)/.exec(a)[1],Jj=+/J(-?[\d.]+)/.exec(a)[1];return {R:+m[1]/(px/+J.p['Boss L'].v),sweep:m[2],g:a.slice(0,3),Rp:Math.hypot(I,Jj)}});
 ok(Math.abs(r.R-r.Rp)<0.01&&((r.g=='G02')==(r.sweep=='1')),`preview arc R${r.R.toFixed(3)} sweep ${r.sweep} = program ${r.g} R${r.Rp}`)}
await E(()=>document.querySelector('#rbpick').scrollIntoView({block:'start'}));await p.screenshot({path:SHOT+'/v113z5-radius-preview.png'});
await E(()=>tab('sim'));await sl(900);await p.screenshot({path:SHOT+'/v113z5-radius-sim.png'});await E(()=>tab('new'));await sl(500);
// ---------- 3) chip then Cancel: every chip
{const ks=await E(()=>[...document.querySelectorAll('#out .card button.chip[onclick^="ed("]')].map(b=>/ed\('([^']+)'\)/.exec(b.getAttribute('onclick'))[1]).filter(k=>!((J2[J.op].choices||{})[k])));let bad=[];
 for(const k of ks){const before=await E(k=>JSON.stringify(J.p[k])+'|'+location.href,k);const hdl=await p.$(`#out button.chip[onclick="ed('${k}')"]`);if(!hdl||!(await hdl.boundingBox()))continue;await tapEl(hdl);
  const opened=await E(()=>!!document.querySelector('#dlg.on, .dlg.on, #dlg[open]')||!!(window.DLG&&DLG.open));const tc=await p.$('#tlcancel');const cn=await p.$('#dlgno');if(tc&&await tc.boundingBox()){await tapEl(tc)}else if(cn&&await cn.boundingBox()){await tapEl(cn)}else{await E(()=>{try{dlgClose(DLG.cancel)}catch(e){}})}await sl(500);
  const after=await E(k=>JSON.stringify(J.p[k])+'|'+location.href,k);const still=await E(()=>!!(window.DLG&&DLG.open)||!!document.querySelector('#r2ps,#tlmod'));if(after!==before||still)bad.push(k+':'+before+'→'+after+(still?' (sheet open)':''));await E(()=>{const t=document.querySelector('#tlmod');t&&r5tlCancel()})}
 ok(ks.length>5&&!bad.length,`chip → Cancel on ${ks.length} chips leaves value, history and sheets unchanged ${bad.join('; ')}`)}
{const hdl=await p.$(`#out button.chip[onclick="ed('Depth')"]`);if(hdl){await tapEl(hdl);await p.screenshot({path:SHOT+'/v113z5-chip-cancel-open.png'});const cn=await p.$('#dlgno');if(cn)await tapEl(cn);await sl(400);await p.screenshot({path:SHOT+'/v113z5-chip-cancel.png'})}}
// ---------- 4) switches + Changed · Undo
await E(()=>{J.p['Keep tool down']={v:'NO',g:false};show()});await sl(300);
await tap('.r5sw[data-r5k="Boss placement"] [data-v^="Point"]');
ok(await E(()=>/^Point/.test(J.p['Boss placement'].v)&&/Changed · Boss placement/.test((document.querySelector('#r5toast')||{}).textContent||'')),'Boss placement switch tap changes it and shows Changed · Undo');
await p.screenshot({path:SHOT+'/v113z5-switch-toast.png'});
await tap('#r5undo');ok(await E(()=>J.p['Boss placement'].v=='Center in stock'&&!document.querySelector('#r5toast')),'Undo restores Boss placement');
await tap('.r5sw[data-r5k="Keep tool down"] [data-v=YES]');await sl(4300);ok(await E(()=>!document.querySelector('#r5toast')&&J.p['Keep tool down'].v=='YES'),'toast goes away after ~4 s, change kept');
// ---------- 5) tool picker footer
await E(()=>{const t0=JSON.stringify(J.p.Tool);window.__t0=t0;ed('Tool')});await sl(500);
{const r=await E(()=>{const f=document.querySelector('#tlfoot'),n=document.querySelector('.tabs').getBoundingClientRect();if(!f)return null;const a=document.querySelector('#tlcancel').getBoundingClientRect(),d=document.querySelector('#tldone').getBoundingClientRect();return {ab:a.bottom,nt:n.top,left:a.left<d.left,h:Math.min(a.height,d.height),lock:getComputedStyle(document.documentElement).overflow}});
 ok(r&&r.ab<=r.nt+1&&r.left&&r.h>=40&&r.lock=='hidden','tool picker: Cancel (left) / Done (right) pinned above the bottom nav, background scroll locked')}
await p.screenshot({path:SHOT+'/v113z5-tool-footer.png'});
await tap('#tlcancel');ok(await E(()=>!document.querySelector('#tlmod')&&JSON.stringify(J.p.Tool)==window.__t0&&getComputedStyle(document.documentElement).overflow!='hidden'),'Cancel closes, Tool unchanged, scroll unlocked');
// ---------- 6) floor stock Z + spring pass, Rectangular
await fresh();await loadFx('rad');await E(()=>{J.p['Keep tool down']={v:'NO',g:false};J.p['Finish stock Z']={v:0.02,g:false};J.p['Spring pass']={v:'On - 2 passes',g:false};show()});await sl(300);c=await code();
ok(c.some(l=>/G01 Z-0\.28/.test(l))&&!c.slice(0,c.findIndex(l=>/FLOOR|FINISH PASS/.test(l))).some(l=>/Z-0\.3\b/.test(l)),'Rect: roughing stops at depth + floor stock (Z-0.28)');
ok(c.filter(l=>/^\(SPRING PASS/.test(l)).length==2,'Rect: spring pass On - 2 passes writes 2 spring blocks');
await E(()=>{J.p['Finish stock Z']={v:0.2,g:false};show()});await sl(300);ok(/Finish stock Z 0\.2 is more than the Stepdown 0\.1/.test(await hold()),'Rect: floor stock > stepdown holds');
await E(()=>{J.p['Finish stock Z']={v:0,g:false};J.p['Spring pass']={v:'Off',g:false};show()});await sl(300);c=await code();ok(!c.some(l=>/FLOOR PASS|SPRING PASS/.test(l))&&c.some(l=>/Z-0\.3\b/.test(l)),'Rect: 0 / Off = same as before (no floor, no spring)');
// ---------- 7) Circular on every mill type
{const r=await E(()=>{const out=[];[['vmc3'],['vmc4'],['hmc'],['vmc5']].forEach(([ty])=>{const m=JSON.parse(JSON.stringify(S.m[0]));m.name='Demo '+ty;m.mtype=ty;S.m.push(m)});save();
  S.m.forEach((m,mi)=>{if(!/^Demo /.test(m.name))return;cur(mi);(m.s||[]).forEach(x=>{if(x.st=='sug')x.st='user'});tab('new');pickJob('cboss');const set=(k,v)=>J.p[k]={v,g:false};const chip=!!document.querySelector(`#out [onclick="ed('Spring pass')"],#out [onclick="ed('Finish stock Z')"]`);
   set('Center X',0);set('Center Y',0);set('Boss Ø',2);set('Depth',0.3);set('Z0',0);set('Cutter',0.5);set('Stepdown',0.15);set('Tool',4);set('Work offset','G54');Object.assign(r112stk(),{shape:'round',round:{d:4,len:2}});J.r112comp={m:'G41',d:4};set('Spring pass','On - 1 pass');set('Finish stock Z',0.02);show();
   const c=gen(J).code||[];const fi=c.findIndex(l=>/^\(FINISH PASS/.test(l)),fl=c.findIndex(l=>/^\(FLOOR PASS/.test(l));out.push({ty:r98t(m),chip,floor:fl>0&&fl<fi,spring:c.filter(l=>/^\(SPRING PASS/.test(l)).length,rough:c.slice(0,fl).some(l=>/G01 Z-0\.28/.test(l))})});return out});
 r.forEach(x=>ok(x.chip&&x.floor&&x.spring==1&&x.rough,`Circular on ${x.ty}: chips shown, rough to Z-0.28, floor pass before the wall finish, 1 spring pass`))}
// ---------- 8) import round trip, line for line
for(const n of ['opp','rad']){await fresh();await loadFx(n);await E(()=>{J.p['Keep tool down']={v:'NO',g:false};show()});await sl(300);
 const r=await E(()=>{const a=(J.code||[]).slice();S.jobs.unshift(JSON.parse(JSON.stringify({...J,name:'RT',machine:S.m[S.cur].name,saved:a})));save();const t=JSON.stringify(mbFile(S.jobs[0]));const x=mbParse(t);const rec=mbAdd(x,S.cur);reopen(S.jobs.indexOf(rec));const b2=(J.code||[]).slice();const d=[];for(let i=0;i<Math.max(a.length,b2.length);i++)if(a[i]!==b2[i])d.push(i+': '+a[i]+' | '+b2[i]);return {n:a.length,d:d.slice(0,3)}});
 ok(r.n>10&&!r.d.length,`import round trip (${n}): save → export → import → generate is line-for-line identical (${r.n} lines) ${r.d.join(' ; ')}`)}
{const r=await E(t=>{const x=mbParse(t);x.from.control='Other control';const rec=mbAdd(x,0);return rec.p['Boss L'].v==null&&!rec.imported.kept},FX('opp'));ok(r,'import from another control still clears positions to red (unchanged safety rule)')}
// ---------- 9) card order, Need count, jump, stock outline
await fresh();await E(()=>{tab('new');pickJob('rboss');['Boss L',2,'Boss W',1.5,'Depth',0.3,'Z0',0,'Cutter',0.5,'Stepdown',0.15,'Tool',4].forEach((v,i,A)=>{if(i%2==0)J.p[v]={v:A[i+1],g:false}});J.p['Work offset']={v:'G54',g:false};J.r112comp={m:'G41',d:null};show()});await sl(500);
ok(await E(()=>{const s=document.querySelector('#r112stk'),r=document.querySelector('#rbpick');return !!(s&&r&&(s.compareDocumentPosition(r)&Node.DOCUMENT_POSITION_FOLLOWING))}),'Stock shape card sits above Sides to machine');

ok(await E(()=>{const n=[...document.querySelectorAll('#out .card')].find(c=>/^Need \d+ more/.test((c.querySelector('.t')||{}).textContent));const rows=[...n.querySelectorAll('.set')].map(r=>r.id||r.className);return +(/^Need (\d+)/.exec(n.querySelector('.t').textContent)[1])==n.querySelectorAll('.set').length&&rows[0]=='r5needstk'}),'Need count includes Stock, listed before Sides');
ok(await E(()=>(document.querySelector('[data-r5stk]')||{dataset:{}}).dataset.r5stk)=='generic'||await E(()=>!document.querySelector('#rbpick path.rbpart')),'diagram: generic stock square while stock is not set');
await E(()=>scrollTo(0,99999));await sl(200);await tap('#r5needstk button');ok(await E(()=>{const t=document.querySelector('#r112stk').getBoundingClientRect().top;return t>=-2&&t<120}),'Need → Pick stock lands on the Stock card');
await E(()=>{J.p['Boss placement']={v:'Center in stock',g:false};['Front','Back','Left','Right'].forEach(s=>rbSide(s));Object.assign(r112stk(),{shape:'square',square:{L:4,W:3,H:1},zp:'tr'});show()});await sl(400);
ok(await E(()=>(document.querySelector('[data-r5stk]')||{dataset:{}}).dataset.r5stk)=='square','diagram draws the square stock outline from Stock shape');
await E(()=>{Object.assign(r112stk(),{shape:'round',round:{d:4,len:2}});show()});await sl(400);
ok(await E(()=>(document.querySelector('[data-r5stk]')||{dataset:{}}).dataset.r5stk)=='round','diagram draws the round bar outline (circle) from Stock shape');
await E(()=>document.querySelector('#rbpick').scrollIntoView({block:'start'}));await p.screenshot({path:SHOT+'/v113z5-stock-outline.png'});
// ---------- 10) gray defaults are placeholders in an empty box
await E(()=>{Object.assign(r112stk(),{shape:'square',square:{L:4,W:3,H:1},zp:'tr'});J.p['Corner Back-right']={v:'Chamfer',g:false};show()});await sl(300);
{const r=await E(()=>{const i=document.querySelector('#r8part input[data-c]');return i&&{v:i.value,ph:i.placeholder}});ok(r&&r.v===''&&r.ph=='0.03','default chamfer size = empty box with gray placeholder 0.03 ('+JSON.stringify(r)+')');}
{const i=await p.$('#r8part input[data-c]');if(i){await tapEl(i);await p.keyboard.type('0.05');await p.keyboard.press('Enter');await sl(400);
 ok(await E(()=>{const i=document.querySelector('#r8part input[data-c]');return i.value=='0.05'&&!i.classList.contains('r3sug')}),'typed 0.05 shows solid (no gray class)');
 const j=await p.$('#r8part input[data-c]');await tapEl(j);await E(()=>{const i=document.querySelector('#r8part input[data-c]');i.value='';i.dispatchEvent(new Event('input',{bubbles:true}));i.dispatchEvent(new Event('change',{bubbles:true}));i.blur()});await sl(400);
 const cc=await code();ok(cc.length>0&&await E(()=>{const i=document.querySelector('#r8part input[data-c]');return i.value===''&&i.placeholder=='0.03'&&/CHAMFER 0\.03/.test(J.code.join(' '))}),'clearing brings the gray 0.03 placeholder back and the program still writes (default used)')}}

// ---------- 11) extra material passes + engagement: no move cuts more than the stepover (area swept / path length on a 0.01 grid, deepest roughing level)

for(const n of ['opp','rad']){await fresh();await loadFx(n,{shape:'square',square:{L:n=='opp'?4.5:3.5,W:n=='opp'?3:2.25,H:1},zp:'tr'});await E(()=>{J.p['Keep tool down']={v:'NO',g:false};show()});await code();const r=await engScan();ok(r.worst<=r.so+0.02,`demo ${n} job: widest cut ${r.worst.toFixed(3)} ≤ stepover ${r.so.toFixed(3)} (${r.em||'no extra material passes needed'})`)}
await fresh();await loadFx('rad',{shape:'square',square:{L:5,W:3.5,H:1},zp:'tr'});await E(()=>{J.p['Keep tool down']={v:'NO',g:false};show()});c=await code();
{const r=await engScan();ok(/^Extra material · \d passes?$/.test(r.em)&&c.some(l=>/^\(EXTRA MATERIAL PASS/.test(l))&&r.worst<=r.so+0.02,`big stock: ${r.em}, widest cut ${r.worst.toFixed(3)} ≤ stepover ${r.so.toFixed(3)}`)}
ok(await E(()=>/Extra material · \d pass/.test((document.querySelector('#r5emsum')||{}).textContent||'')),'summary line names the extra material passes');
await E(()=>tab('sim'));await sl(900);await E(()=>{try{scrub(J.M.length)}catch(e){}});await sl(300);
ok(await E(()=>J.M.some(m=>m.em)&&/extra material passes/.test((document.querySelector('#r5emleg')||{}).textContent||'')),'Simulate draws them in amber with a legend');
await p.screenshot({path:SHOT+'/v113z5-extra-material-sim.png'});

// ---------- 12) Circular Boss on a square block (demo copy of demo file): rings trimmed, corner extra material, no uncut corners
await fresh();await E(t=>{const x=mbParse(t);const r=mbAdd(x,0);reopen(S.jobs.indexOf(r));Object.assign(r112stk(),{shape:'square',square:{L:2.75,W:2.75,H:1.5},zp:'mc'});J.r112comp={m:'G41',d:4};show();return 1},FX('cb'));await sl(400);c=await code();
{const r=await E(()=>{const ck=checks(J);const c=J.code;const M=J.M;const bx=rbBox(J),r=+J.p.Cutter.v/2,so=+J.p.Cutter.v*(+J.p['Stepover %'].v)/100,R0=+J.p['Boss Ø'].v/2;
 const fi=c.findIndex(l=>/^\(FINISH PASS/.test(l));const zl=Math.min(...M.filter(m=>!m.r&&m.l<fi).map(m=>m.b[2]));const h=0.01,nx=Math.ceil((bx[3]-bx[0])/h),ny=Math.ceil((bx[4]-bx[1])/h),g=new Uint8Array(nx*ny);
 for(let i=0;i<nx;i++)for(let k=0;k<ny;k++){const x=bx[0]+(i+.5)*h,y=bx[1]+(k+.5)*h;if(Math.hypot(x,y)>R0+0.011+h)g[i*ny+k]=1}
 let worst=0;M.forEach(m=>{if(m.r||m.l>=fi||Math.abs(m.a[2]-zl)>1e-6||Math.abs(m.b[2]-zl)>1e-6)return;const len=Math.hypot(m.b[0]-m.a[0],m.b[1]-m.a[1]);if(len<1e-9)return;let cut=0;const st=Math.max(1,Math.ceil(len/(h/2)));
  /* the plunge itself already cleared a disk at the start point; don't count it as side engagement */{const x=m.a[0],y=m.a[1];for(let i=Math.max(0,Math.floor((x-r-bx[0])/h));i<=Math.min(nx-1,Math.ceil((x+r-bx[0])/h));i++)for(let k=Math.max(0,Math.floor((y-r-bx[1])/h));k<=Math.min(ny-1,Math.ceil((y+r-bx[1])/h));k++){const px=bx[0]+(i+.5)*h,py=bx[1]+(k+.5)*h;if((px-x)**2+(py-y)**2<=r*r)g[i*ny+k]=0}}
  for(let s=0;s<=st;s++){const x=m.a[0]+(m.b[0]-m.a[0])*s/st,y=m.a[1]+(m.b[1]-m.a[1])*s/st;for(let i=Math.max(0,Math.floor((x-r-bx[0])/h));i<=Math.min(nx-1,Math.ceil((x+r-bx[0])/h));i++)for(let k=Math.max(0,Math.floor((y-r-bx[1])/h));k<=Math.min(ny-1,Math.ceil((y+r-bx[1])/h));k++){const px=bx[0]+(i+.5)*h,py=bx[1]+(k+.5)*h;if(g[i*ny+k]&&(px-x)**2+(py-y)**2<=r*r){g[i*ny+k]=0;cut++}}}
  if(len>0.1&&cut*h*h/len>worst){worst=cut*h*h/len;window.WL=m.l+': '+c[m.l-1]+' -> '+c[m.l]}});let left=0;g.forEach(v=>left+=v);
 return {pass:ck.filter(x=>x[1]).length,all:ck.length,left,worst,so,em:r5emSum(J),full:c.filter(l=>/^G02 .*I-/.test(l)).length,air:J.r5em.rings.filter(x=>x.full&&x.R-r>Math.max(bx[3],bx[4])).length}});
 ok(r.pass==r.all,`Circular on demo square block: code checks ${r.pass}/${r.all}`);
 ok(r.left==0,`no uncut corner material at the deepest level (${r.left} cells of 0.01 left)`);
 ok(r.worst<=r.so+0.02,`widest cut ${r.worst.toFixed(3)} ≤ stepover ${r.so} `+await E(()=>window.WL));
 ok(/^Extra material · \d passes?$/.test(r.em)&&r.air==0,`corners get ${r.em}; no full ring in air`)}
await E(()=>tab('sim'));await sl(900);await E(()=>{try{scrub(J.M.length)}catch(e){}});await sl(300);ok(await E(()=>J.M.some(m=>m.em)),'Circular: extra material passes drawn amber in Simulate');await p.screenshot({path:SHOT+'/v113z5-cboss-extra-material.png'});await E(()=>tab('new'));await sl(400);
// lead-ins start outside the stock + tool radius (both boss jobs)
{const r=await E(()=>{const bx=rbBox(J),r=+J.p.Cutter.v/2;const c=J.code;const bad=[];const fi=c.findIndex(l=>/^\(FINISH PASS|^\(FLOOR PASS/.test(l));c.forEach((l,i)=>{if(i<fi&&/^G01 Z/.test(l)&&+/Z(-?[\d.]+)/.exec(l)[1]<(+J.p.Z0.v||0)){let k=i-1;while(k>0&&!/^G0[01] X/.test(c[k]))k--;const x=+/X(-?[\d.]+)/.exec(c[k])[1],y=+((/Y(-?[\d.]+)/.exec(c[k])||[0,0])[1]);if(!(x<bx[0]-r||x>bx[3]+r||y<bx[1]-r||y>bx[4]+r))bad.push(i+1+': '+c[k])}});return bad});
 ok(!r.length,'Circular: every roughing plunge/lead-in starts outside the stock + tool radius '+r.slice(0,2).join(' ; '))}
await fresh();await loadFx('rad',{shape:'square',square:{L:5,W:3.5,H:1},zp:'tr'});await E(()=>{J.p['Keep tool down']={v:'NO',g:false};show()});await code();
{const r=await E(()=>{const bx=rbBox(J),r=+J.p.Cutter.v/2;const c=J.code;const bad=[];const fi=c.findIndex(l=>/^\(FINISH PASS|^\(FLOOR PASS/.test(l));c.forEach((l,i)=>{if(i<fi&&/^G01 Z/.test(l)&&+/Z(-?[\d.]+)/.exec(l)[1]<(+J.p.Z0.v||0)){let k=i-1;while(k>0&&!/^G0[01] X/.test(c[k]))k--;const x=+/X(-?[\d.]+)/.exec(c[k])[1],y=+((/Y(-?[\d.]+)/.exec(c[k])||[0,0])[1]);if(!(x<bx[0]-r||x>bx[3]+r||y<bx[1]-r||y>bx[4]+r))bad.push(i+1+': '+c[k])}});return bad});
 ok(!r.length,'Rectangular: every roughing plunge/lead-in starts outside the stock + tool radius '+r.slice(0,2).join(' ; '))}
// boss check: a gouge names the move, tapping the banner jumps the slider to it
{const li=await E(()=>{const c=J.code;const i=c.findIndex(l=>/^G01 X/.test(l)&&!/G4/.test(l));J.edits={...(J.edits||{}),[i]:'G01 X'+(+J.p['Boss L'].v/2-0.3+(rbData(J).cx))+' Y'+rbData(J).cy};return i});
 const txt=await E(li=>{J.code=J.code.map((l,i)=>i==li?J.edits[li]:l);J.M=interp(J.code);J.M=Array.isArray(J.M)?J.M:J.M.moves;const g=r5gouge(J);window.R5G=g;return g.length?g[0].why:''},li);
 ok(/^Line \d+ gouges the part/.test(txt),'boss check names the move: '+txt);
 await E(()=>{const d=document.createElement('div');d.className='ok bad';d.id='r5test';d.textContent='⛔ '+R5G[0].why;document.querySelector('#out').prepend(d)});await tap('#r5test');await sl(700);
 ok(await E(()=>/Simulate/.test(document.querySelector('#ttl').textContent)&&view.n>=R5G[0].mi),'tapping the banner opens Simulate on that move')}

// ---------- 13) Build: no Simulate button inside Sides to machine; Simulate: view row moved to the top under the slider
await fresh();await loadFx('rad');await E(()=>{J.p['Keep tool down']={v:'NO',g:false};show()});await code();
ok(await E(()=>!document.querySelector('#rbpick .rbsim')&&![...document.querySelectorAll('#rbpick button')].some(b=>/Simulate/.test(b.textContent))),'Sides to machine card has no Simulate › button');
await E(()=>tab('sim'));await sl(1000);
{const r=await E(()=>{const row=document.querySelector('#r5view');if(!row)return null;const bs=[...row.querySelectorAll('button')];const sc=document.querySelector('#sc').getBoundingClientRect(),rr=row.getBoundingClientRect();const ctl=[...document.querySelectorAll('#r2pan,#r2pause,#r2bk,#r2fw')].map(b=>b.getBoundingClientRect().top);const R=bs.map(b=>b.getBoundingClientRect());
 return {txt:bs.map(b=>b.textContent).join(' '),under:rr.top>=sc.bottom-1,above:ctl.every(t=>t>rr.bottom-1),inside:R.every(x=>x.left>=0&&x.right<=390),even:Math.max(...R.map(x=>x.width))-Math.min(...R.map(x=>x.width))<1.5,h:Math.min(...R.map(x=>x.height)),clip:bs.every(b=>b.scrollWidth<=b.clientWidth+1)}});
 ok(r&&/^Top Front Iso Fit/.test(r.txt)&&r.under&&r.above,'view row sits right under the slider, above Pan / Step / Play / Pause '+JSON.stringify(r))}

await p.screenshot({path:SHOT+'/v113z5-sim-view-row.png'});
}catch(e){fail++;console.log('FAIL error',e.message)}

// ---------- v113z5b) Stacey: big chamfer corner (chamfer longer than half the side) - extra material from the real outline, no false gouges
await fresh();
// the file carries its own Stock card (Save/Share stores it); import must restore it, no stock passed in here
await E(t=>{const x=mbParse(t);const r=mbAdd(x,0);reopen(S.jobs.indexOf(r));J.r112comp=J.r112comp||{m:'G41',d:4};show();return 1},FX('cham'));await sl(500);
ok(await E(()=>{const s=J.r112stk;return !!(s&&s.shape=='square'&&s.square.L==4&&s.square.W==2.5)}),'import restores the Stock card saved in the file (4 x 2.5 block)');
{const c=await code();const em=await E(()=>(J.r5em&&J.r5em.loops||[]).map(x=>x.c));const g=await E(()=>r5gouge(J).map(x=>x.why));
 ok(c.length>0&&em.includes('Back-right'),'['+(await hold()).slice(0,120)+'] big Chamfer 1.0 corner gets its own extra material pass (from the real chamfer line): '+em.join(','));
 ok(g.length==0,'gouge check uses the real chamfered/rounded outline: no false gouge ('+(g[0]||'none')+')');
 const r=await engScan();ok(r.left<=0.01+0.006,`no uncut stock left after roughing (farthest left ${r.left.toFixed(3)} from the finished outline, finish stock 0.01)`);ok(r.worst<=r.so+0.02,`big chamfer: widest cut ${r.worst.toFixed(3)} <= stepover ${r.so.toFixed(3)}`);
 await E(()=>tab('sim'));await sl(900);await E(()=>{try{scrub(J.M.length)}catch(e){}const t=[...document.querySelectorAll('button')].find(b=>b.textContent.trim()=='Top');t&&t.click()});await sl(400);await p.screenshot({path:SHOT+'/v113z5b-chamfer-sim.png'});await E(()=>tab('new'));await sl(500)}
// ---------- v113z5b) Floor stock Z on Rectangular: full-depth floor pass (side loops + extra material) before the wall finish
await E(()=>{J.p['Finish stock Z']={v:0.05,g:false};show()});
{const c=await code();const fl=c.findIndex(l=>/^\(FLOOR PASS AT FULL DEPTH Z-0\.4/.test(l)),fi=c.findIndex(l=>/^\(FINISH PASS/.test(l));const rz=c.slice(0,fl).filter(l=>/^G01 Z-/.test(l)).map(l=>+l.match(/Z(-[\d.]+)/)[1]);
 ok(fl>0&&fl<fi&&Math.min(...rz)==-0.35&&c.slice(fl,fi).some(l=>/^G01 Z-0\.4 /.test(l))&&c.slice(fl,fi).some(l=>/^\(EXTRA MATERIAL PASS/.test(l)),'Rectangular Finish stock Z 0.05: roughs to Z-0.35, then a Z-0.4 floor pass (side loops + extra material) before the wall finish');
 const fs2=await E(()=>{window.__SV=r5emSum;return 1});const r=await E(()=>{const c=J.code;const fi=c.findIndex(l=>/^\(FINISH PASS/.test(l));const M=interp(c);const mv=(Array.isArray(M)?M:M.moves).filter(m=>!m.r&&m.l<fi&&Math.abs(m.a[2]+0.4)<1e-6&&Math.abs(m.b[2]+0.4)<1e-6);const bx=rbBox(J),o=rbData(J),P=r5poly(o),r=0.25,h=0.02;let left=0;
   for(let x=bx[0]+h/2;x<bx[3];x+=h)for(let y=bx[1]+h/2;y<bx[4];y+=h){const d=r5polyD(P,x,y);if(d<=0.02)continue;let hit=false;for(const m of mv){if(r5segD(x,y,m.a[0],m.a[1],m.b[0],m.b[1])<=r){hit=true;break}}if(!hit&&d>left)left=d}return left});
 ok(r<=0.03,`floor pass covers the whole roughed area at full depth (farthest floor point missed ${r.toFixed(3)})`);
 await E(()=>tab('sim'));await sl(900);await E(()=>{const n=J.code.findIndex(l=>/^\(FINISH PASS/.test(l));const m=J.M.findIndex(x=>x&&(x.l??x.ln)>=n);try{scrub(m>0?m:J.M.length)}catch(e){}const t=[...document.querySelectorAll('button')].find(b=>b.textContent.trim()=='Iso');t&&t.click()});await sl(400);await p.screenshot({path:SHOT+'/v113z5b-floor-sim.png'});await E(()=>tab('new'));await sl(500)}
// ---------- v113z5b) Stacey: Save/Share stores the Stock card for every job type; import restores it (any control)
{const r=await E(()=>{const out=[];Object.keys(J2).filter(op=>!/^(rboss|cboss)$/.test(op)).slice(0,6).concat(['rboss','cboss']).forEach(op=>{try{const j={op,p:{},machine:S.m[0].name,r112stk:{shape:'square',square:{L:5,W:4,H:2},zp:'tr'}};const f=mbFile(j);const t=typeof f=='string'?f:JSON.stringify(f);const x=mbParse(t);x.from&&(x.from.control='Other control');const rec=mbAdd(x,0);out.push(op+':'+!!(rec&&rec.r112stk&&rec.r112stk.square&&rec.r112stk.square.L==5))}catch(e){out.push(op+':ERR '+e.message)}});return out});
 ok(r.length>=8&&r.every(x=>/:true$/.test(x)),'every job type: the exported file carries the Stock card and import restores it (other control too): '+r.join(' '))}
{const r=await E(()=>{J.r112stk={shape:'round',round:{d:3,len:2},zp:'tr'};J.name='DEMO STOCK SAVE';saveJob();const s=S.jobs.slice().sort((a,b)=>(b.date||0)-(a.date||0))[0];J.r112stk.round.d=9;const back=JSON.parse(localStorage.getItem(Object.keys(localStorage).find(k=>/jobs|mc_s|state/i.test(k)&&/DEMO STOCK SAVE/.test(localStorage.getItem(k)))||'null')||'null');return !!(s&&s.r112stk&&s.r112stk.round.d==3)});ok(r,'Save to Library stores its own copy of the Stock card')}
// ---------- v113z5b) Casey: Build Control chip = popup in place (fresh and imported jobs)
for(const kind of ['fresh','imported']){await fresh();await E(()=>{const c=S.m[0].s.find(x=>x.k=='Control');c.st='confirm';save()});
 if(kind=='fresh'){await E(()=>{tab('new');pickJob('rboss');show()})}else{await loadFx('rad');}
 await sl(500);const c0=await E(()=>(J.code||[]).length);const before=await E(()=>JSON.stringify({op:J.op,p:J.p,ttl:document.querySelector('#ttl').textContent}));
 await tap('.r104ctl');await sl(400);
 ok(await E(()=>!!document.querySelector('#r99sheet')&&/Build/.test(document.querySelector('#ttl').textContent)),kind+': Control chip opens the picker as a popup on Build (no trip to Machines)');
 await tap('#r99sheet .cancel');await sl(400);
 ok(await E(b=>!document.querySelector('#r99sheet')&&JSON.stringify({op:J.op,p:J.p,ttl:document.querySelector('#ttl').textContent})==b&&S.m[0].s.find(x=>x.k=='Control').st=='confirm',before),kind+': Cancel changes nothing and stays on Build');
 await tap('.r104ctl');await sl(400);const opt=await p.$('#r99sheet .opt');await tapEl(opt);await tap('#r99sheet .done');await sl(900);
 const st=await E(()=>({ctl:S.m[0].s.find(x=>x.k=='Control'),ttl:document.querySelector('#ttl').textContent,op:J&&J.op,body:document.body.innerText,code:(J.code||[]).length,pill:(document.querySelector('.r104ctl')||{}).textContent||''}));
 ok(st.ctl.st=='user'&&/Build/.test(st.ttl)&&st.op=='rboss'&&!/✓ Saved|Unsaved Build work/.test(st.body)&&/Control: /.test(st.pill)&&!/not set/.test(st.pill)&&(c0?st.code>0:true),kind+': Done saves the control to the machine, stays on the same job (no navigation, no Saved banner, no restore prompt), code '+(c0?'regenerated':'n/a')+': '+st.pill);
 if(kind=='imported')await p.screenshot({path:SHOT+'/v113z5b-control-popup-done.png'})
 await tap('.r104ctl');await sl(400);await tap('#r99sheet .r104clr');await sl(900);
 {const st=await E(()=>({ctl:S.m[S.cur].s.find(x=>x.k=='Control'),ttl:document.querySelector('#ttl').textContent,op:J&&J.op,sheet:!!document.querySelector('#r99sheet'),body:document.body.innerText,pill:(document.querySelector('.r104ctl')||{}).textContent||'',saved:Object.keys(localStorage).some(k=>{try{const v=JSON.parse(localStorage.getItem(k));const c=v&&Array.isArray(v.m)&&v.m[S.cur]&&v.m[S.cur].s.find(x=>x.k=='Control');return c&&c.st!='user'&&!String(c.v||'').trim()}catch(e){return false}})}));
  ok(!st.sheet&&!String(st.ctl.v||'').trim()&&st.ctl.st!='user'&&/Build/.test(st.ttl)&&st.op=='rboss'&&/Control: not set/.test(st.pill)&&!/✓ Saved|Unsaved Build work/.test(st.body)&&st.saved,kind+': Clear (not set) clears Control, saves it, stays on the same job (pill back to "Control: not set"): '+st.pill)}}

// ---------- v113z6) Stacey: no move of ANY kind (rough, extra material, entries, exits, floor, finish) engages more than the stepover; no plunge onto stock
for(let n of ['opp','rad','cham','cham2','lr']){await fresh();const big=n=='cham2';n=n=='cham2'?'cham':n;await loadFx(n,big?{shape:'square',square:{L:4.6,W:3.2,H:1},zp:'tr'}:n=='cham'?null:(n=='rad'?{shape:'square',square:{L:4.5,W:3.5,H:1},zp:'tr'}:{shape:'square',square:{L:4.5,W:3.5,H:1},zp:'tr'}));await E(()=>{J.p['Keep tool down']={v:'NO',g:false};J.p['Finish stock Z']={v:0.02,g:false};show()});await code();const r=await engScan();
 ok(r.worst<=r.so+0.01&&!r.plunge,`demo ${n} (0.005 grid, 0.05 sliding window, margin 0.01): every move incl. entries/exits/floor/finish engages <= stepover (widest ${r.worst.toFixed(3)} at ${r.wl}, stepover ${r.so.toFixed(3)}), no plunge onto stock ${r.plunge||''}`)}
// ---------- v113z6) Maria: the RENDERED Keep tool down switch shows the effective value (locked = Off) after a real file import, after the 0.7 s machine-poll redraw, after toggles/undo, and after a reload
{await fresh();const kdState=()=>E(()=>{const s=[...document.querySelectorAll('.r5sw[data-r5k="Keep tool down"]')];if(s.length!=1)return {n:s.length};const b=v=>s[0].querySelector(`[data-v=${v}]`);const yel=e=>/255, 210, 31/.test(getComputedStyle(e).backgroundColor);return {n:1,offSel:b('NO').classList.contains('on')&&b('NO').getAttribute('aria-checked')=='true'&&yel(b('NO')),onSel:b('YES').classList.contains('on')||b('YES').getAttribute('aria-checked')=='true'||yel(b('YES')),onDis:b('YES').disabled,why:!!s[0].querySelector('.r5why'),v:J.p['Keep tool down'].v}});
 const okLocked=(st,m)=>ok(st.n==1&&st.offSel&&!st.onSel&&st.onDis&&st.why,m+': '+JSON.stringify(st));
 ok(await E(()=>APP_VERSION)=='v113z13b'&&/const C='mc-v113z13b'/.test(fs.readFileSync(path.join(BASE,'sw.js'),'utf8')),'build v113z13b with service-worker cache mc-v113z13b (no stale copy)');
 await E(()=>tab('recent'));await sl(500);const fi=await p.$('#mbf');await fi.uploadFile(path.join(HERE,'fixtures','demo-lr.mbjob'));await sl(1200);{const h=await p.evaluateHandle(()=>[...document.querySelectorAll('button')].find(e=>e.offsetParent&&e.textContent.trim()=='Add to Library'));if(h.asElement())await tapEl(h.asElement());await sl(800)}
 await E(()=>{const i=S.jobs.findIndex(x=>/DEMO RIGHT LEFT/.test(x.name||''));reopen(i);Object.assign(r112stk(),{shape:'square',square:{L:4,W:3,H:1},zp:'tr'});show()});await sl(600);
 okLocked(await kdState(),'real file import (#mbf), Right+Left + YES: rendered Off selected (yellow), On not selected + disabled, reason shown');
 await E(()=>{const c=S.m[S.cur].s.find(x=>x.k=='Control');c.st='confirm';save()});await sl(1600);
 okLocked(await kdState(),'after the 0.7 s machine-poll redraw');
 await E(()=>{const c=S.m[S.cur].s.find(x=>x.k=='Control');c.st='user';save()});await sl(1600);
 await tap('.r5sw[data-r5k="Keep tool down"] [data-v=NO]');okLocked(await kdState(),'after tapping Off');
 const u=await p.$('#r5undo');if(u){await tapEl(u);await sl(300)}okLocked(await kdState(),'after Undo');
 await E(()=>{rbSide('Front');show()});await sl(300);let st=await kdState();ok(st.n==1&&!st.onDis&&!st.why,'picking a connecting side unlocks the switch: '+JSON.stringify(st));await E(()=>{rbSide('Front');show()});await sl(300);okLocked(await kdState(),'unpicking it again locks it back to Off');
 await E(()=>save());await go();await sl(900);await E(()=>{const i=S.jobs.findIndex(x=>/DEMO RIGHT LEFT/.test(x.name||''));reopen(i);Object.assign(r112stk(),{shape:'square',square:{L:4,W:3,H:1},zp:'tr'});show()});await sl(600);okLocked(await kdState(),'after a reload');
 const c=await code();ok(c.length>0&&!c.some(l=>/KEEP DOWN/.test(l)),'program lifts between Right and Left');
 await E(()=>document.querySelector('.r5sw[data-r5k="Keep tool down"]').scrollIntoView({block:'center'}));await p.screenshot({path:SHOT+'/v113z6-kd-locked-off.png'})}
console.log(`\n${pass} passed, ${fail} failed`);await b.close();process.exit(fail?1:0);
