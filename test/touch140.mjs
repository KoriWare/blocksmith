// v113y: real TOUCH events at a phone viewport (390x844, hasTouch) via puppeteer-core + system Chrome.
// Run: NODE_PATH=/tmp/pt/node_modules node test/touch140.mjs [shot]
import { createRequire } from 'module';const require=createRequire(import.meta.url);const puppeteer=require('puppeteer-core');
const SHOT=process.argv[2]||'';const OUT='/workspace/bs/shots113/';
const r=[];const log=(n,ok,x)=>{r.push((ok?'PASS ':'FAIL ')+n+(ok||!x?'':' :: '+String(x).slice(0,600)))};
const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',headless:'new',args:['--no-sandbox','--allow-file-access-from-files']});
const p=await b.newPage();await p.setViewport({width:390,height:844,hasTouch:true,isMobile:true,deviceScaleFactor:1});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
const URL='file:///workspace/macro-app/index.html?v=140';await p.goto(URL);await p.evaluate(()=>{localStorage.clear();localStorage.setItem('mc_tour','done')});await p.goto(URL);await sl(900);
function sl(ms){return new Promise(r=>setTimeout(r,ms))}
const E=(s)=>p.evaluate(s);
const tap=async(sel,dx=0.5,dy=0.5)=>{const h=typeof sel=='string'?await p.$(sel):sel;if(!h)throw new Error('no '+sel);await h.evaluate(e=>{const r=e.getBoundingClientRect();if(r.top<80||r.bottom>innerHeight-110)e.scrollIntoView({block:'center'})});const bb=await h.boundingBox();if(!bb)throw new Error('hidden '+sel);await p.touchscreen.tap(bb.x+bb.width*dx,bb.y+bb.height*dy);await sl(350)};
const tapText=async(t)=>{const h=await p.evaluateHandle(t=>[...document.querySelectorAll('button')].find(e=>e.offsetParent&&e.textContent.trim().startsWith(t)),t);const el=h.asElement();if(!el)throw new Error('no button '+t);await tap(el)};
const type=async s=>{await p.keyboard.type(s,{delay:30});await sl(150)};
const sideRow=k=>`#rbpick [data-rbside="${k}"]`;
const ck=()=>E(`JSON.stringify(checks(J).filter(c=>/unpicked|rapid into stock/i.test(c[0])))`);
// setup: demo Mill A, Control confirmed, Rectangular Boss/Profile, values typed (fields only, not under test here)
await E(`cur(0);const c=S.m[0].s.find(x=>x.k=='Control');c.st='user';save();tab('new');pickJob('rboss');['Boss L',2,'Boss W',1.5,'Depth',0.3,'Z0',0,'Cutter',0.5,'Stepdown',0.15,'Tool',4].reduce((a,v,i,A)=>{if(i%2==0)J.p[v]={v:A[i+1],g:false};return a},0);J.p['Boss placement']={v:'Center in stock',g:false};J.p['Work offset']={v:'G54',g:false};show();1`);await sl(400);
const T=async(n,f)=>{try{await f()}catch(e){log(n,false,'error '+e.message)}};
await T('setup',async()=>{log('setup: Rectangular Boss open',await E(`J.op`)=='rboss',await E('J&&J.op'))});
// Maria: no 'Sides (count)' number field / 'digits only'; the Need list counts the picker
await T('maria',async()=>{const t=await E(`$('#out').innerText`);const inp=await E(`!!document.querySelector('#out input[data-k="Sides"],#out [data-r99k="Sides"] input')`);
 log('Maria: no Sides number field, no "digits only", no "(count)"; Need row points to the side picker',!inp&&!/digits only/i.test(t)&&!/Sides\s*\(count\)/i.test(t)&&/Sides\s*[—-]\s*tap/i.test(t),t.slice(0,600));
 log('Maria: Need N counts the picker',/Need 1 more/.test(t),t.match(/Need \d+ more/))});
// Casey 3 + side taps by touch (no layout jump; free-card appears)
await T('jump',async()=>{await p.evaluate(()=>scrollTo(0,0));await E(`document.getElementById('rbpick').scrollIntoView({block:'center'})`);await sl(200);const t0=await E(`document.getElementById('rbpick').getBoundingClientRect().top`);
 for(const k of ['Back','Right','Front','Left']){await tap(sideRow(k));await sl(300)}const t1=await E(`document.getElementById('rbpick').getBoundingClientRect().top`);
 log('Casey 3: tapping sides by touch (incl. Left, when the free-tools card appears) keeps the picker in place',Math.abs(t1-t0)<2,t0+' -> '+t1);
 log('touch: all four sides picked',await E(`String(J.p.Sides.v)`)=='Back, Right, Front, Left',await E(`String(J.p.Sides.v)`))});
await T('roundscroll',async()=>{const y0=await E('scrollY'),t0=await E(`document.querySelector('#rbpick .rbc[data-c="Back-right"]').getBoundingClientRect().top`);await tap('#rbpick [data-rbc="Back-right"][data-k="Round"]');await sl(300);const t1=await E(`document.querySelector('#rbpick .rbc[data-c="Back-right"]').getBoundingClientRect().top`);
 log('Casey 3: Round does not scroll the page (row stays put)',Math.abs(t1-t0)<2,t0+' -> '+t1);await type('0.25');await tap('#rbpick [data-rbc="Front-right"][data-k="Chamfer"]');await sl(300);
 log('Casey 7 by touch: corner size typed, the first tap (Chamfer) acts',await E(`J.p['Corner Back-right'].v`)=='Round 0.25'&&/^Chamfer/.test(await E(`J.p['Corner Front-right'].v`)),await E(`J.p['Corner Back-right'].v+' | '+J.p['Corner Front-right'].v`));
 await type('0.1');await tap('#rbpick [data-rbc="Front-left"][data-k="Sharp"]');await sl(200)});
// Casey 2: Climb / Conventional segmented control
await T('climb',async()=>{const s=await E(`(()=>{const g=document.querySelector('#rbpick .rbdir');return g?[...g.querySelectorAll('button')].map(b=>b.textContent+(b.classList.contains('on')?'*':'')).join('|'):'none'})()`);
 log('v113z: Climb shown as a gray suggested default ("Climb (default)"), neither option yellow until tapped',s=='Climb (default)|Conventional'&&(await E(`J.p['Cut direction'].g`))===true,s);
 log('Casey 2: the gray Cut direction chip is gone',!(await E(`!!document.querySelector('#out .chip[onclick="ed(\\'Cut direction\\')"]:not([style*="display: none"])')`)),'');
 if(SHOT=='climb'){await E(`document.querySelector('#rbpick .rbdir').scrollIntoView({block:'center'})`);await sl(200);await p.screenshot({path:OUT+'v113y-climb.png'})}
 await tap('#rbpick .rbdir button[data-dir="Conventional"]');log('Casey 2: tapping Conventional sets it',await E(`J.p['Cut direction'].v`)=='Conventional','');await tap('#rbpick .rbdir button[data-dir="Climb"]');log('Casey 2: back to Climb (tapped: now yellow, user-picked)',await E(`J.p['Cut direction'].v`)=='Climb'&&(await E(`[...document.querySelectorAll('#rbpick .rbdir button')].map(b=>b.textContent+(b.classList.contains('on')?'*':'')).join('|')`))=='Climb*|Conventional','')});
// Casey 1: stock Length then Width / Height by touch
await T('stock',async()=>{await tapText('Continue').catch(()=>{});await sl(300);const sq=await p.$('#r112stk [data-st=shape][data-sv=square]');if(sq){await tap(sq)}
 const L='#r112stk input[data-sk="square.L"]',W='#r112stk input[data-sk="square.W"]',H='#r112stk input[data-sk="square.H"]';
 await tap(L);await type('4');await tap(W);await type('3');await tap(H);await type('1');await tap('#rbpick .rbdir button[data-dir="Climb"]');await sl(300);
 const v=await E(`JSON.stringify(J.r112stk&&J.r112stk.square)`);log('Casey 1: after typing Length, the first tap on Width / Height focuses it and keeps every character (4 x 3 x 1)',/"L":"?4"?/.test(v)&&/"W":"?3"?/.test(v)&&/"H":"?1"?/.test(v),v)});
// ± never on non-negative fields, inline or dialog (keypad)
await T('pm',async()=>{await tap(await p.evaluateHandle(()=>document.querySelector('#out .chip[onclick="ed(\'Boss W\')"]')));await sl(300);const d=await E(`(()=>{const i=document.activeElement;const pm=document.getElementById('pmkey');return JSON.stringify({tag:i&&i.tagName,id:i&&i.id,pm:pm?!pm.hidden&&getComputedStyle(pm).display!='none':false})})()`);
 log('Casey 3b: no ± key in the Boss W dialog',!JSON.parse(d).pm,d);await p.keyboard.press('Escape');await E(`(()=>{const c=document.getElementById('dlgcancel')||[...document.querySelectorAll('button')].find(b=>b.offsetParent&&/^Cancel$/.test(b.textContent.trim()));c&&c.click()})()`);await sl(300)});
// Generate after Continue, by touch
await T('gen',async()=>{await E(`J.p.Depth={v:0.2,g:false}`);await tapText('Generate Code');await sl(400);const c=await E(`(J.code||[]).filter(l=>/^G01 Z/.test(l)).join(',')`);log('touch: Generate after Continue regenerates',/Z-0\.2 /.test(c)&&!/Z-0\.3 /.test(c),c)});
// preview: stock outline
await T('stock outline',async()=>{const s=await E(`(()=>{const r=document.querySelector('#rbpick .rbstock');return r?r.getAttribute('width')+'x'+r.getAttribute('height'):'none'})()`);log('Casey 4: preview draws the stock outline (4 x 3 block, boss inside)',s!='none'&&Math.abs(eval(s.replace('x','/'))-4/3)<0.02,s)});
// Stacey: Front + Back on a narrower boss: No corners; narrow boss with corners set -> hold, red circles, corners kept
await T('fb',async()=>{for(const c of ['Back-right','Front-right'])await tap(`#rbpick [data-rbc="${c}"][data-k="Sharp"]`);for(const k of ['Left','Right'])await tap(sideRow(k));await sl(300);const t=await E(`(document.querySelector('#rbpick .rbnoc')||{}).textContent||''`);log('Front + Back on a 4x3 block (boss narrower): real-shape preview + "No corners" line',/No corners/.test(t)&&!!(await p.$('#rbpick .rbstock'))&&(await E(`String(J.p.Sides.v)`))=='Back, Front',t);
 if(SHOT=='fb'){await E(`(document.getElementById('rbpick').scrollIntoView({block:'start'}),scrollBy(0,-70))`);await sl(200);await p.screenshot({path:OUT+'v113y-front-back.png'})}
 for(const k of ['Left','Right'])await tap(sideRow(k));await sl(300);
 await E(`J.p['Corner Front-left']={v:'Round 0.25',g:false};J.p['Corner Back-right']={v:'Chamfer 0.1',g:false};show()`);await sl(200);for(const k of ['Front','Back'])await tap(sideRow(k));await sl(300);
 const h=await E(`rbData(J).hold||''`);const red=await E(`[...document.querySelectorAll('#rbpick .rbbad')].map(e=>e.dataset.c).sort().join()`);
 log('Stacey: Left + Right on a narrower boss with corners set: HOLD with the message, not plain end passes',/^Corners on the ends need the boss as wide as the stock, or pick that side too\./.test(h)&&!(await E('J.code'))&&/Corners on the ends need the boss as wide as the stock/.test(await E(`$('#out').innerText`)),h);
 log('Stacey: those corners are circled red and kept (not dropped)',red=='Back-right,Front-left'&&(await E(`J.p['Corner Front-left'].v+'|'+J.p['Corner Back-right'].v`))=='Round 0.25|Chamfer 0.1',red);
 if(SHOT=='hold'){await E(`(document.getElementById('rbpick').scrollIntoView({block:'start'}),scrollBy(0,-70))`);await sl(200);await p.screenshot({path:OUT+'v113y-narrow-hold.png'})}
 await E(`J.p['Boss W'].v=3;show()`);await sl(200);log('Stacey: same corners with the boss as wide as the stock: written as end corners',!(await E(`rbData(J).hold`))&&(await E('(J.code||[]).length'))>20,await E(`rbData(J).hold`));
 await E(`J.p['Boss W'].v=1.5;J.p['Corner Front-left'].v='Sharp';J.p['Corner Back-right'].v='Sharp';show()`);await sl(200);log('Stacey: set back to Sharp: Left + Right writes plain ends, no hold',!(await E(`rbData(J).hold`))&&(await E('(J.code||[]).length'))>20,await E(`rbData(J).hold`));
 for(const k of ['Back','Front'])await tap(sideRow(k));await sl(200)});
// dropdown readability (touch-opened Need-list select)
await T('dd',async()=>{await E(`J.p['Work offset'].v=null;show()`);await sl(200);const c=await E(`getComputedStyle(document.querySelector('#out select[data-k="Work offset"]')).color`);log('dropdown text readable (light on dark)',/rgb\((2[2-5]\d), ?\1/.test(c),c);await E(`J.p['Work offset'].v='G54';show()`)});
// Control chip / tile by touch
await T('ctl',async()=>{await E(`(()=>{const c=S.m[0].s.find(x=>x.k=='Control');c.st='confirm';save();tab('machines');tab('new')})();1`);await sl(500);const t=await p.$('.r104ctl');if(!t){log('Control tile',false,'missing');return}await tap(t);await sl(600);log('touch: Build "Control: not set ›" opens the Control picker',!!(await p.$('#r99sheet')),'');
 await E(`['r99sheet','r99dim'].forEach(i=>{const e=document.getElementById(i);e&&e.remove()});tab('machines');1`);await sl(500);
 {const z=await p.evaluateHandle(()=>{const cd=[...document.querySelectorAll('.card')].find(c=>/Mill A/.test(c.textContent)&&/In use/.test(c.textContent));const e=cd&&cd.querySelector('.r113zctl');if(!e)return null;e.scrollIntoView({block:'center'});const q=e.getBoundingClientRect();const x=document.elementFromPoint(q.x+q.width/2,q.y+q.height/2);return (x===e||e.contains(x))?e:null});
  if(!z.asElement())log('v113z: Machines "! Control" chip tappable without opening Show all',false,'covered or missing');else{await tap(z.asElement());await sl(700);log('v113z: Machines "! Control" chip (no Show all) is tappable by touch and opens the Control picker',!!(await p.$('#r99sheet')),await E(`$('#ttl').textContent`));await E(`['r99sheet','r99dim'].forEach(i=>{const e=document.getElementById(i);e&&e.remove()});tab('machines');1`);await sl(500)}}
 const sh=await p.evaluateHandle(()=>{const cd=[...document.querySelectorAll('.card')].find(c=>/Mill A/.test(c.textContent)&&/In use/.test(c.textContent));return [...cd.querySelectorAll('*')].find(e=>/^Show all \d+ settings/.test(e.textContent.trim())&&e.children.length==0)||null});if(sh.asElement()){await tap(sh.asElement());await sl(400)}
 const ch=await p.evaluateHandle(()=>[...document.querySelectorAll('.chip.r')].find(e=>{if(e.textContent.trim()!='! Control'||!e.offsetParent)return false;const r=e.getBoundingClientRect();e.scrollIntoView({block:'center'});const q=e.getBoundingClientRect();const x=document.elementFromPoint(q.x+q.width/2,q.y+q.height/2);return x===e||e.contains(x)})||null);
 if(!ch.asElement()){log('touch: Machines "! Control" chip is visible and tappable',false,await E(`[...document.querySelectorAll('.chip.r')].filter(e=>e.textContent.trim()=='! Control').length`));return}
 await tap(ch.asElement());await sl(700);log('touch: Machines "! Control" chip opens the Control picker',!!(await p.$('#r99sheet')),await E(`$('#ttl').textContent`))});

// v113z2: Simulate controls by touch - Pan toggle, Play/Pause, Step back/forward
const LJ=`cur(2);S.m[2].s.forEach(x=>x.st='user');tab('new');pickJob('g71');const v={Profile:'x0.5,z0; x0.5,z-1; x1.1,z-1.2; x1.5,z-1.2',['Stock Ø']:1.5,['Start Z']:0.1,['Depth of cut']:0.1,Tool:1,['Finish tool']:2,['Work offset']:'G54',['X0 Z0 at']:'X0 spindle centerline, Z0 finished front face'};Object.keys(v).forEach(k=>J.p[k]={v:v[k],g:false});show();1`;
const navSim=async()=>{for(let k=0;k<4;k++){const h=await p.evaluateHandle(()=>[...document.querySelectorAll('button[data-t=sim]')].find(e=>e.offsetParent));if(h.asElement()){const b=await h.asElement().boundingBox();await p.touchscreen.tap(b.x+b.width/2,b.y+b.height/2)}await sl(1200);if(await E(`!!document.querySelector('#r2fw')&&!!document.querySelector('#r2fw').offsetParent`))return}};
const row=()=>E(`JSON.stringify([...document.querySelectorAll('.r2row button')].map(b=>{const r=b.getBoundingClientRect();return[b.id||b.textContent.trim(),Math.round(r.left),Math.round(r.right),Math.round(r.top+scrollY),Math.round(r.width),Math.round(r.height)]}))`);
await T('sim mill pan',async()=>{p.on('dialog',d=>d.accept().catch(()=>{}));await p.goto(URL);await sl(1500);await E(`cur(0);tab('new');pickJob('rboss');['Boss L',2,'Boss W',1.5,'Depth',0.3,'Z0',0,'Cutter',0.5,'Stepdown',0.15,'Tool',4].reduce((a,v,i,A)=>{if(i%2==0)J.p[v]={v:A[i+1],g:false};return a},0);J.p['Boss placement']={v:'Center in stock',g:false};J.p['Work offset']={v:'G54',g:false};J.p['Cut direction']={v:'Climb',g:false};['Front','Back','Left','Right'].forEach(rbSide);S.m[0].s.forEach(x=>x.st='user');Object.values(J.p).forEach(x=>x.g=false);Object.assign(r112stk(),{shape:'square',square:{L:4,W:3,H:1}});show();1`);await sl(400);await navSim();
 const R0=JSON.parse(await row());log('v113z2: control row has Pan, Step back, Play, Pause, Step forward, all at least 40x40 and inside 390px on one line',R0.map(x=>x[0]).join()=='r2pan,r2bk,r2pl,r2pa,r2fw'&&R0.every(x=>x[4]>=40&&x[5]>=40&&x[1]>=0&&x[2]<=390&&x[3]==R0[0][3]),JSON.stringify(R0));
 await tap(`button[onclick="vw('fit')"]`);const F0=JSON.parse(await E(`JSON.stringify([view.px,view.py])`));await tap('#r2pan');log('Pan: tapping Pan turns it on (yellow)',await E(`view.pan===true&&$('#r2pan').classList.contains('y')`),'');
 await p.evaluate(()=>{$('#cv').scrollIntoView({block:'center'})});await sl(200);const bb=await (await p.$('#cv')).boundingBox();const cx=bb.x+bb.width/2,cy=bb.y+bb.height/2;
 const v0=JSON.parse(await E(`JSON.stringify([view.px,view.py,view.rx,view.rz])`));
 await p.touchscreen.touchStart(cx,cy);for(let i=1;i<=6;i++){await p.touchscreen.touchMove(cx+i*8,cy+i*5);await sl(30)}await p.touchscreen.touchEnd();await sl(200);
 const v1=JSON.parse(await E(`JSON.stringify([view.px,view.py,view.rx,view.rz])`));log('Pan (touch): one-finger drag moves the view and does not rotate it',Math.abs(v1[0]-v0[0])>20&&Math.abs(v1[1]-v0[1])>10&&v1[2]==v0[2]&&v1[3]==v0[3],JSON.stringify([v0,v1]));
 await p.mouse.move(cx,cy);await p.mouse.down();await p.mouse.move(cx-30,cy-20,{steps:5});await p.mouse.up();await sl(200);
 const v2=JSON.parse(await E(`JSON.stringify([view.px,view.py,view.rx,view.rz])`));log('Pan (mouse): drag moves the view too',v2[0]<v1[0]-15&&v2[2]==v0[2],JSON.stringify(v2));
 await tapText('Build');await sl(500);await navSim();const v3=JSON.parse(await E(`JSON.stringify([view.px,view.py,view.pan])`));log('Pan is kept after switching tabs (with the Pan button still on)',Math.abs(v3[0]-v2[0])<1&&Math.abs(v3[1]-v2[1])<1&&v3[2]&&await E(`$('#r2pan').classList.contains('y')`),JSON.stringify([v2,v3]));
 await tap(`button[onclick="vw('fit')"]`);log('Fit resets pan (back to the fitted view)',await E(`Math.abs(view.px-(${F0[0]}))<0.5&&Math.abs(view.py-(${F0[1]}))<0.5`),await E(`view.px+','+view.py`));
 await tap('#r2pan');await p.evaluate(()=>{$('#cv').scrollIntoView({block:'center'})});await sl(200);const b2=await (await p.$('#cv')).boundingBox();const qx=b2.x+b2.width/2,qy=b2.y+b2.height/2;await p.touchscreen.touchStart(qx,qy);for(let i=1;i<=5;i++){await p.touchscreen.touchMove(qx+i*8,qy);await sl(30)}await p.touchscreen.touchEnd();await sl(200);
 log('Pan off: button gray again and drag rotates the mill view',await E(`view.pan===false&&!$('#r2pan').classList.contains('y')&&Math.abs(view.px-(${F0[0]}))<0.5`)&&(await E('view.rz'))!=v0[3],await E(`JSON.stringify([view.pan,$('#r2pan').className,view.px,view.py,view.rz])`)+v0[3]);
 const R1=JSON.parse(await row());log('no layout jump: control row identical after taps',JSON.stringify(R1.map(x=>x.slice(0,3).concat(x.slice(4))))==JSON.stringify(R0.map(x=>x.slice(0,3).concat(x.slice(4)))),JSON.stringify(R1))});
await T('sim play/pause',async()=>{await E(`scrub(0);1`);await tap('#r2pl');await sl(500);log('Play: playing shows Play yellow, Pause enabled',await E(`$('#r2pl').classList.contains('y')&&!$('#r2pa').disabled`),'');
 await tap('#r2pa');const n=await E('view.n');await sl(800);const n2=await E('view.n');const L=await E('J.M.length');
 log('Pause stops on the current line (counter frozen, line highlighted)',n>0&&n<L&&n2==n&&await E(`!!document.querySelector('#simcode .cur')&&$('#sc').value==String(view.n)`),n+'/'+n2+'/'+L);
 await tap('#r2pl');await sl(300);log('Play resumes from where it paused',(await E('view.n'))>n,'');await tap('#r2pa')});
await T('sim step lathe',async()=>{await E(LJ);await sl(400);await navSim();const cyc=JSON.parse(await E(`JSON.stringify(J.M.map(m=>[m.cyc||'',m.l]))`));const code=JSON.parse(await E('JSON.stringify(J.code)'));
 await E('scrub(0);1');await sl(200);log('Step back disabled at step 0, forward enabled',await E(`$('#r2bk').disabled&&!$('#r2fw').disabled`),'');
 await tap('#r2fw');log('Step forward (touch) goes to step 1',await E('view.n')==1,await E('view.n'));
 const fi=cyc.findIndex(x=>x[0]=='rough');await E(`scrub(${fi+3});1`);await tap('#r2bk');const n=await E('view.n');const cur=await E(`(document.querySelector('#simcode .cur')||{}).textContent||''`);
 log('Step back (touch) inside the expanded G71 roughing: one move earlier, counter + G71 line highlight follow',n==fi+2&&cyc[n-1][0]=='rough'&&cur.includes('G71 P10')&&await E(`$('#sc').value`)==String(n),n+' '+cur);
 const ff=cyc.map(x=>x[0]).lastIndexOf('semi')+1;await E(`scrub(${ff+1});1`);await tap('#r2bk');const c2=await E(`(document.querySelector('#simcode .cur')||{}).textContent||''`);log('Step back from after the G71 semi-finish pass lands on its last move with the G71 line highlighted',cyc[(await E('view.n'))-1][0]=='semi'&&c2.includes('G71 P10'),c2);
 await E('scrub(J.M.length);1');await sl(150);log('Step forward disabled at the end, back enabled',await E(`$('#r2fw').disabled&&!$('#r2bk').disabled`),'');
 if(SHOT=='sim'){await E(`scrub(${fi+4});view.pan=true;r2ui();$('#r2pan').scrollIntoView({block:'end'});scrollBy(0,90);1`);await sl(400);await p.screenshot({path:OUT+'v113z2-sim-controls.png'})}});

// v113z2: lathe Profile is a text box with quick keys + Examples (touch)
await T('profile',async()=>{await p.goto(URL);await sl(1500);await E(LJ.replace("Profile:'x0.5,z0; x0.5,z-1; x1.1,z-1.2; x1.5,z-1.2',",''));await sl(500);
 const ta=await p.$('#r2pf');if(!ta)return log('Profile text box present',false,await E(`(document.querySelector('[data-k=Profile]')||{}).outerHTML`));
 await tap('#r2pf');await sl(300);log('Profile: tapping opens a text box (textarea, inputmode=text), no number pad dialog',await E(`document.activeElement.id=='r2pf'&&document.activeElement.tagName=='TEXTAREA'&&document.activeElement.getAttribute('inputmode')=='text'&&!document.querySelector('#dlgin')`),await E(`document.activeElement.outerHTML.slice(0,200)`));
 const q=async k=>{const h=await p.evaluateHandle(k=>[...document.querySelectorAll('#r2qk button')].find(b=>b.dataset.q==k),k);await tap(h.asElement());await sl(80)};
 await q('X');await type('0');await q('.');await type('5');await q('Z');await type('0');await q('\n');await q('X');await type('0.5');await q('Z');await q('-');await type('1');await q('\n');await type('G01 X1.5 Z');await q('-');await type('1');await sl(300);
 const v=await E(`$('#r2pf').value`);log('Typed a 3-line profile with quick keys + keyboard (X, Z, minus, decimal point, newline, letters)',v=='X0.5 Z0\nX0.5 Z-1\nG01 X1.5 Z-1',JSON.stringify(v));
 log('Profile validation shows ✓ 3 moves while typing',await E(`$('#r2pm').textContent`)=='✓ 3 moves',await E(`$('#r2pm').textContent`));
 if(SHOT=='profile'||SHOT=='sim')await p.screenshot({path:OUT+'v113z2-profile.png'});
 await E(`document.activeElement.blur();1`);await sl(700);const code=await E(`(J.code||[]).join('\\n')`);
 log('Profile kept after leaving the field and the job generates G71 with the typed moves',/G71 P10 Q20/.test(code)&&/N20 G01 X1\.5 Z-1\.0/.test(code),code.slice(0,200)+' '+await E(`JSON.stringify(J.p.Profile)`));
 {const h=await p.evaluateHandle(()=>[...document.querySelectorAll('#out [onclick]')].find(e=>e.offsetParent&&e.getAttribute('onclick')=="ed('Profile')"));if(h.asElement())await tap(h.asElement());await sl(400);log('Tapping the filled Profile opens the text sheet (textarea, inputmode=text, keys, Examples), not the number pad',await E(`!!$('#r2ps')&&$('#r2pf').tagName=='TEXTAREA'&&$('#r2pf').getAttribute('inputmode')=='text'&&$('#r2pf').value.split('\\n').length==3&&!!$('#r2ps #r2qk')&&!!$('#r2ps #r2exb')&&!document.querySelector('#dlgin')`),await E(`!!$('#r2ps')+' '+($('#r2pf')||{}).value`))}
 await E(`$('#r2pf').value='X1 Z0\\nX0.5 Z-1';$('#r2pf').dispatchEvent(new Event('input'));1`);log('Validation still flags a profile the app rejects (X getting smaller)',/X must not get smaller|Type I/.test(await E(`J2.g71.block(J)||''`)),await E(`J2.g71.block(J)`));
 await E(`$('#r2pf').value='X0.5 Z0\\nQQ';$('#r2pf').dispatchEvent(new Event('input'));1`);log('Lines the app cannot read are flagged in red',/not understood/.test(await E(`$('#r2pm').textContent`)),await E(`$('#r2pm').textContent`));
 await tap('#r2exb');await sl(400);const ex=await E(`JSON.stringify({rule:$('#r2ex .s').textContent,items:[...document.querySelectorAll('#r2ex .r2exi')].map(e=>e.querySelector('b').textContent),ins:[...document.querySelectorAll('#r2ex .r2exi button')].map(b=>{const r=b.getBoundingClientRect();return[r.width,r.height]})})`);const X=JSON.parse(ex);
 log('Examples: popup shows the syntax rule and 4 examples (step shaft, taper, chamfer + shoulder, arc) with Insert buttons >= 40px',/One move per line/.test(X.rule)&&X.items.length==4&&/Step/.test(X.items[0])&&/Taper/.test(X.items[1])&&/Chamfer/.test(X.items[2])&&/arc/i.test(X.items[3])&&X.ins.every(a=>a[0]>=40&&a[1]>=40)&&/not shown in Simulate/.test(await E(`$('#r2ex').innerText`)),ex);
 if(SHOT=='profile'||SHOT=='sim')await p.screenshot({path:OUT+'v113z2-examples.png'});
 const ib=await p.$$('#r2ex .r2exi button');await tap(ib[1]);await sl(400);log('Insert into a non-empty field asks first',!!(await p.$('#dlgok')),'');
 if(await p.$('#dlgok')){await tap('#dlgok');await sl(500)}log('After confirming, the Taper example fills the field and passes validation',await E(`$('#r2pf').value==R2EX[1][2]&&!J2.g71.block(J)&&/✓ 3 moves/.test($('#r2pm').textContent)`),await E(`$('#r2pf')&&$('#r2pf').value`));
 await E(`$('#r2pf').value='';$('#r2pf').dispatchEvent(new Event('input'));1`);await tap('#r2exb');await sl(300);const ib2=await p.$$('#r2ex .r2exi button');await tap(ib2[0]);await sl(500);log('Insert into an empty field fills it directly (no question)',!(await p.$('#dlgok'))&&await E(`$('#r2pf').value==R2EX[0][2]`),'')});
log('no page errors',errs.length==0,errs.join(' | '));
console.log(r.join('\n')+'\nP='+r.filter(x=>x.startsWith('PASS')).length+' F='+r.filter(x=>x.startsWith('FAIL')).length);await b.close();
