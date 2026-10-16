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
 log('Casey 2: Cut direction asked as a visible Climb / Conventional choice, Climb preselected',s=='Climb*|Conventional',s);
 log('Casey 2: the gray Cut direction chip is gone',!(await E(`!!document.querySelector('#out .chip[onclick="ed(\\'Cut direction\\')"]:not([style*="display: none"])')`)),'');
 if(SHOT=='climb'){await E(`document.querySelector('#rbpick .rbdir').scrollIntoView({block:'center'})`);await sl(200);await p.screenshot({path:OUT+'v113y-climb.png'})}
 await tap('#rbpick .rbdir button[data-dir="Conventional"]');log('Casey 2: tapping Conventional sets it',await E(`J.p['Cut direction'].v`)=='Conventional','');await tap('#rbpick .rbdir button[data-dir="Climb"]');log('Casey 2: back to Climb',await E(`J.p['Cut direction'].v`)=='Climb','')});
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
 const sh=await p.evaluateHandle(()=>{const cd=[...document.querySelectorAll('.card')].find(c=>/Mill A/.test(c.textContent)&&/In use/.test(c.textContent));return [...cd.querySelectorAll('*')].find(e=>/^Show all \d+ settings/.test(e.textContent.trim())&&e.children.length==0)||null});if(sh.asElement()){await tap(sh.asElement());await sl(400)}
 const ch=await p.evaluateHandle(()=>[...document.querySelectorAll('.chip.r')].find(e=>{if(e.textContent.trim()!='! Control'||!e.offsetParent)return false;const r=e.getBoundingClientRect();e.scrollIntoView({block:'center'});const q=e.getBoundingClientRect();const x=document.elementFromPoint(q.x+q.width/2,q.y+q.height/2);return x===e||e.contains(x)})||null);
 if(!ch.asElement()){log('touch: Machines "! Control" chip is visible and tappable',false,await E(`[...document.querySelectorAll('.chip.r')].filter(e=>e.textContent.trim()=='! Control').length`));return}
 await tap(ch.asElement());await sl(700);log('touch: Machines "! Control" chip opens the Control picker',!!(await p.$('#r99sheet')),await E(`$('#ttl').textContent`))});
log('no page errors',errs.length==0,errs.join(' | '));
console.log(r.join('\n')+'\nP='+r.filter(x=>x.startsWith('PASS')).length+' F='+r.filter(x=>x.startsWith('FAIL')).length);await b.close();
