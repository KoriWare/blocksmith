// v115: Simulate toolbar - row XYZ, Tool, Stock, Path, 1x (no Full screen); name-only yellow/gray chips; Tool off really hides the tool;
// Path hides only the toolpath lines; each state kept through scrub, play and speed. Synthetic program only.
// Run: NODE_PATH=/tmp/pt/node_modules node test/simbar.mjs
import { createRequire } from 'module';const require=createRequire(import.meta.url);const puppeteer=require('puppeteer-core');
import path from 'path';import {fileURLToPath} from 'url';const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--allow-file-access-from-files']});const p=await b.newPage();await p.setViewport({width:390,height:844});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+ROOT+'/index.html');await p.evaluate(()=>{localStorage.clear();localStorage.setItem('mc_tour','done')});await p.reload();await new Promise(r=>setTimeout(r,1200));
const R=[];const ok=(n,c,x)=>R.push([c?'PASS':'FAIL',n,x||'']);const w=ms=>new Promise(r=>setTimeout(r,ms));
await p.evaluate(()=>{const L=['%','O1234 (SIMBAR DEMO)','G17 G20 G40 G80 G90','T1 M06','G54','S3000 M03','G00 X0 Y0','G43 H1 Z1.0','G01 Z-0.1 F10.'];for(let i=0;i<40;i++)L.push('G01 X'+(i%2?2:0)+' Y'+(i*0.05).toFixed(3)+' F20.');L.push('G00 Z1.0','M30','%');tab('new');importToEditor(L.join('\n'))});await w(900);
await p.evaluate(()=>{J.name='Simbar test';saveJob()});await w(400);await p.evaluate(()=>tab('sim'));await w(800);
const st=()=>p.evaluate(()=>{const row=$('#tTool').parentElement;const bs=[...row.querySelectorAll('button')].filter(x=>x.offsetParent);
 const px={teal:0,white:0,stock:0};try{const d=ctx.getImageData(0,0,cv.width,cv.height).data;for(let i=0;i<d.length;i+=4){const r=d[i],g=d[i+1],bb=d[i+2];if(Math.abs(r-20)<12&&Math.abs(g-184)<14&&Math.abs(bb-166)<14)px.teal++;else if(r>235&&g>235&&bb>235)px.white++;else if(r==g&&g==bb&&r>80&&r<120)px.stock++}}catch(e){}
 const cls=id=>{const e=$(id);return e.classList.contains('y')?'y':e.classList.contains('gr')?'gr':'?'};
 return {labels:bs.map(x=>x.textContent.trim()),tops:bs.map(x=>Math.round(x.getBoundingClientRect().top)),full:[...document.querySelectorAll('button')].some(x=>/full\s*screen|⛶/i.test(x.textContent)),
  tool:view.tool,stk:view.stk,path:view.path,drawn:window.R115TOOL,c:{t:cls('#tTool'),s:cls('#tStk'),p:cls('#tPath')},px,n:view.n}});
const click=async id=>{await p.evaluate(id=>$(id).scrollIntoView({block:'center'}),id);await w(100);await p.click(id);await w(150)};
let s=await st();console.log(JSON.stringify(s));
ok('1 row reads XYZ, Tool, Stock, Path, 1×',JSON.stringify(s.labels)==JSON.stringify(['XYZ','Tool','Stock','Path','1×']),JSON.stringify(s.labels));
ok('1 no Full screen button',!s.full);ok('1 row on one line',new Set(s.tops).size==1,JSON.stringify(s.tops));
ok('2 defaults: Tool yellow, Stock gray, Path yellow (name only)',s.c.t=='y'&&s.c.s=='gr'&&s.c.p=='y',JSON.stringify(s.c));
ok('3 tool drawn when on (start)',s.drawn===true);
await click('#tTool');s=await st();ok('3 Tool off at start: tool not drawn, chip gray, label "Tool"',s.tool==0&&s.drawn===false&&s.c.t=='gr'&&s.labels[1]=='Tool',JSON.stringify(s));
await p.evaluate(()=>scrub(Math.floor(J.M.length/2)));await w(150);s=await st();ok('3 Tool off mid-program: tool not drawn',s.drawn===false,JSON.stringify({d:s.drawn,n:s.n}));
await p.evaluate(()=>scrub(J.M.length));await w(150);s=await st();ok('3 Tool off at end (home stub): tool not drawn',s.drawn===false);
await click('#tTool');s=await st();ok('3 Tool on again: drawn, yellow',s.drawn===true&&s.c.t=='y');
const a=await st();await click('#tPath');s=await st();ok('4 Path off: teal path pixels gone, chip gray',s.path==0&&s.px.teal<20&&a.px.teal>200&&s.c.p=='gr',`teal ${a.px.teal}->${s.px.teal}`);
ok('4 Path off: tool still drawn and Stock unchanged',s.drawn===true&&s.stk===a.stk);
await click('#tStk');s=await st();ok('2 Stock on: yellow',s.stk==1&&s.c.s=='y');
await click('#tTool');// state now: tool 0, stk 1, path 0
const keep=x=>x.tool==0&&x.stk==1&&x.path==0&&x.c.t=='gr'&&x.c.s=='y'&&x.c.p=='gr'&&x.drawn===false;
await p.evaluate(()=>scrub(3));await w(150);s=await st();ok('5 kept after scrub',keep(s),JSON.stringify(s));
await click('#tSp');await click('#tSp');s=await st();ok('5 kept after speed change',keep(s)&&s.labels[4]!='1×',s.labels[4]);
await p.evaluate(()=>play());await w(1500);s=await st();ok('5 kept during/after play',keep(s),JSON.stringify(s));
await p.evaluate(()=>{tab('edit')});await w(300);await p.evaluate(()=>tab('sim'));await w(500);s=await st();ok('5 kept after Editor and back',keep(s),JSON.stringify(s));
// ---- every Simulate view: mill, lathe, rotary wrapped, HMC, engrave, Swiss. Toggle all three off, play, check hidden at several frames.
await p.evaluate(()=>{NOASK=1;view.hideTriad=1;
 window.__ops=0;const C=CanvasRenderingContext2D.prototype;['stroke','fill','fillRect','strokeRect','fillText','strokeText','drawImage','putImageData'].forEach(k=>{const o=C[k];C[k]=function(){window.__ops++;return o.apply(this,arguments)}});
 for(const f of ['drawStock','eStockFill']){const o=window[f];window[f]=function(){const a=window.__ops;const r=o.apply(this,arguments);if(window.__ops>a)window.R115STK=true;return r}}
 const PC=[[20,184,166],[45,212,191],[127,233,220],[57,255,122],[255,210,31],[250,204,21],[255,77,77]];
 window.__pathPx=()=>{const d=ctx.getImageData(0,0,cv.width,cv.height).data;let c=0;for(let i=0;i<d.length;i+=16){const r=d[i],g=d[i+1],b=d[i+2];if(PC.some(q=>Math.abs(q[0]-r)<10&&Math.abs(q[1]-g)<10&&Math.abs(q[2]-b)<10))c++}return c};
 const _d=draw;draw=function(){window.R115STK=false;const r=_d.apply(this,arguments);if(window.__rec)window.__rec.push({n:view.n,tool:window.R115TOOL,stk:window.R115STK,px:window.__pathPx()});return r}});
const VIEWS={
 mill:null,
 lathe:["pick('Generic 2-axis lathe','Lathes');S.cur=S.m.length-1",'lturn',{'Bar Ø':1,'Finish Ø':0.75,Length:0.5,DOC:0.05,Chamfer:0.02,'Z0 Shift':0,Tool:1}],
 rotary:["S.cur=0;S.m[0].mtype='vmc4';S.m[0].s.forEach(x=>{if(x.k=='Control')x.v='HAAS NGC'})",'g47w',{'Text height':0.25,Depth:0.01,'Start X':0,'Start Y':0,Angle:0,Tool:3}],
 hmc:["pick('Generic HMC 4-axis','Horizontal mills');S.cur=S.m.length-1",'index',{Depth:0.2,'Hole X':0.3,'Hole Y':0.2,'Z0 Shift':0,Tool:2,'Drill Ø':0.25}],
 engrave:["S.cur=0;S.m[0].mtype='vmc';if(S.m[0].opt){S.m[0].opt.ax4=0;S.m[0].opt.cyl=0}",'engrave',{'Letter height':0.25,Depth:0.01,Tool:1,'Text start X':0,'Text start Y':0,'Baseline rotation':0,Mirror:'No'}],
 swiss:["pick('Generic Swiss-type','Swiss-type');S.cur=S.m.length-1",'swiss',{'Bar Ø':0.5,'Finish Ø':0.375,Length:0.8,Segment:0.2,'Flat depth':0.05,'Flat L':0.3,'Cross Ø':0.125,'Cross at Z':0.55,'Cross depth':0.15,'End drill depth':0.1,'Part-off W':0.062,'Z0 Shift':0,'Turn tool':1,'Part-off tool':2,'Flat tool':3,'Cross tool':4,'Drill tool':5}]};
for(const [k,v] of Object.entries(VIEWS)){
 if(v){await p.evaluate(([mc,op,pv])=>{eval(mc);const m=S.m[S.cur];m.s.forEach(x=>{if(x.v==null||x.v===''){if(/brake on . off/i.test(x.k))x.v='M10 / M11';else{const sp=r99spec(x.k)||{};x.v=sp.ch&&sp.ch.length?sp.ch[0]:sp.ex!=null?String(sp.ex):'yes'}}x.st='user'});m.opt=Object.assign(m.opt||{},op=='g47w'?{ax4:1,cyl:1}:{});save();
  J=null;tab('new');pickJob(op);if(J.p.Text)J.p.Text={v:'ABC',g:false};Object.entries(pv).forEach(([a,b])=>{J.p[a]={v:b,g:false}});if(op=='g47w'){const st=r112stk();st.shape='round';st.round={d:2,len:3};st.top=1}
  for(let i=0;i<3;i++){Object.keys(J.p).forEach(q=>{const x=J.p[q];if(x.v==null){const sp=r99spec(q)||{};const ex=sp.ex!=null?String(sp.ex).replace(/^e\.g\.\s*/,''):null;x.v=sp.ch&&sp.ch.length?sp.ch[0]:ex&&!isNaN(parseFloat(ex))?parseFloat(ex):1;x.g=false}});show()}},v);await w(500);await p.evaluate(()=>tab('sim'));await w(700)}
 else{await p.evaluate(()=>tab('sim'));await w(400)}
 const ready=await p.evaluate(k=>({row:!!$('#tPath'),M:(J.M||[]).length,kind:k=='hmc'?!!J.hmc:k=='swiss'?!!J.swiss:k=='lathe'?!!J.lathe&&!J.swiss:k=='engrave'?J.op=='engrave':k=='rotary'?J.op=='g47w':true}),k);
 ok(`${k}: Simulate view ready (row, moves, right view)`,ready.row&&ready.M>1&&ready.kind,JSON.stringify(ready));if(!ready.row||ready.M<2)continue;
 // all on, at the end: baseline
 const on=await p.evaluate(()=>{for(const [id,q] of [['#tTool','tool'],['#tStk','stk'],['#tPath','path']])if(!view[q])$(id).click();window.__rec=[];scrub(J.M.length);const r=window.__rec.pop();$('#tStk').click();window.__rec=[];scrub(J.M.length);const r2=window.__rec.pop();$('#tStk').click();window.__rec=null;r.px=r2.px;/* path pixels counted with Stock off: engrave draws cut moves as grooves when Stock is on */return r});
 ok(`${k}: all on - tool drawn, path drawn`,on&&on.tool===true&&on.px>30,JSON.stringify(on));
 ok(`${k}: Stock on draws the stock layer`,on&&on.stk===true||k=='swiss'||k=='hmc'||k=='rotary'||k=='lathe',JSON.stringify(on&&on.stk));
 if(k=='lathe'){const L=await p.evaluate(async()=>{const b=$('#tStk'),s0=view.stk;b.click();await new Promise(r=>setTimeout(r,150));const t=($('#r11toast')||{}).textContent;return {cls:b.className,op:getComputedStyle(b).opacity,dis:b.getAttribute('aria-disabled'),toast:t,same:view.stk===s0,inRow:b.parentElement===$('#tTool').parentElement&&!!b.offsetParent}});ok('lathe: Stock stays in the row, gray and dimmed, tap shows "No stock in lathe view" and changes nothing',L.inRow&&/\bgr\b/.test(L.cls)&&+L.op<0.6&&L.dis=='true'&&L.toast=='No stock in lathe view'&&L.same,JSON.stringify(L))}
 const lab=await p.evaluate(()=>[...$('#tTool').parentElement.children].filter(x=>x.offsetParent).map(x=>x.textContent.trim()).join());ok(`${k}: row XYZ,Tool,Stock,Path,speed`,/^XYZ,Tool,Stock,Path,[\d.]+×$/.test(lab),lab);
 const base=await p.evaluate(()=>{scrub(0);for(const id of ['#tTool','#tStk','#tPath'])$(id).click();window.__rec=[];scrub(0);const r=window.__rec.pop();window.__rec=[];play();return r.px});/* layers off at line 0: only fixed marks (axes, centerline, labels) remain */await w(2500);
 const fr=await p.evaluate(()=>{const r=window.__rec;window.__rec=null;clearInterval(pl);return r});
 const mid=fr.filter(f=>f.n>0);/* lathe: Stock cannot be toggled there and draws nothing visible (checked above) */const bad=mid.filter(f=>f.tool!==false||(k!='lathe'&&f.stk!==false)||f.px>base+3);ok(`${k}: path pixels measurable (on ${on.px} vs fixed marks ${base})`,on.px-base>30);
 ok(`${k}: Tool, Stock, Path off stay hidden on every playback frame (${mid.length} frames, n up to ${Math.max(0,...mid.map(f=>f.n))})`,mid.length>=3&&!bad.length,bad.slice(0,3).map(f=>JSON.stringify(f)).join(' ')+` base=${base}`);
 if(process.env.DUMP){await p.evaluate(()=>scrub(J.M.length));const u=await p.evaluate(()=>cv.toDataURL());(await import('fs')).writeFileSync(`/tmp/off-${k}.png`,Buffer.from(u.split(',')[1],'base64'))}
 const st=await p.evaluate(()=>({t:view.tool,s:view.stk,p:view.path,c:['#tTool','#tStk','#tPath'].map(i=>$(i).className.split(' ').pop()).join()}));ok(`${k}: states and colours kept after play`,st.t==0&&(k=='lathe'||st.s==0)&&st.p==0&&st.c=='gr,gr,gr',JSON.stringify(st));
 await p.evaluate(()=>{for(const id of ['#tTool','#tStk','#tPath'])$(id).click()});
}
ok('no page errors',!errs.length,errs.join(' | ').slice(0,300));
await b.close();R.forEach(r=>console.log(r.join('  ')));const F=R.filter(r=>r[0]=='FAIL').length;console.log(`P=${R.length-F} F=${F}`);process.exit(F?1:0);
