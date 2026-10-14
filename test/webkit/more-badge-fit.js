// More badge fit test at 320 and 390 (WebKit iPhone 13): full text when it fits, else '⚠ N'; never ellipsis; aria/title full; card height unchanged
const {webkit,devices}=require('/tmp/pw/node_modules/playwright');
(async()=>{const b=await webkit.launch();let fails=0;const log=(n,ok,x)=>{if(!ok)fails++;console.log((ok?'PASS ':'FAIL ')+n+(ok?'':' :: '+x))};
for(const wd of [320,390]){const ctx=await b.newContext({...devices['iPhone 13'],viewport:{width:wd,height:wd<350?640:844}});const p=await ctx.newPage();
await p.goto('file:///workspace/macro-app/index.html');await p.evaluate(()=>localStorage.clear());await p.reload();await p.waitForTimeout(800);
const st=()=>p.evaluate(()=>{const c=document.querySelector('#v .card[onclick^="tools("]'),t=c.querySelector('.t'),a=getComputedStyle(t,'::after');return {txt:a.content.replace(/"\s*"/g,'').replace(/^"|"$/g,''),ov:a.textOverflow,fits:(()=>{const r=document.createRange();r.selectNodeContents(t);const tr=t.getBoundingClientRect();return r.getBoundingClientRect().right<=tr.right+0.5})(),h:c.offsetHeight,aria:c.getAttribute('aria-label'),title:c.title}});
await p.evaluate(()=>{NOASK=1;S.m.forEach((m,i)=>{if(!m.tools||!m.tools.length)m.tools=[{id:'a'+i,n:1,type:'Drill',dia:0.25},{id:'b'+i,n:2,type:'Drill',dia:0.25}]});save();more()});await p.waitForTimeout(150);const h0=(await st()).h;
for(const [nm,setup,full] of [['one machine',"S.m[1].tools[0].dia=-0.5",()=>'1 · '+'Mill B'],['two machines',"S.m[2].tools[0].dia=0;S.m[2].tools[1].dia=-1",()=>'3 · 2 machines']]){
 await p.evaluate(s=>{eval(s);save();more()},setup);await p.waitForTimeout(150);const r=await st();await p.evaluate(()=>document.querySelector('#v .card[onclick^="tools("]').scrollIntoView({block:'center'}));
 await p.screenshot({path:`/workspace/macro-app/preview/v87-more-${nm.replace(' ','')}-${wd}.png`});
 const N=full().split(' ')[0];log(`${wd} ${nm}: badge “${r.txt}” fits, no ellipsis`,r.fits&&r.ov!='ellipsis'&&(r.txt=='⚠ '+full()||r.txt=='⚠ '+N),JSON.stringify(r));
 log(`${wd} ${nm}: full text in aria + title`,r.aria.includes(full().replace(/^\d+ · /,''))&&r.title.includes(full().replace(/^\d+ · /,'')),r.aria+' | '+r.title);
 log(`${wd} ${nm}: card height unchanged`,r.h==h0,r.h+' vs '+h0);console.log('   '+wd+' '+nm+' → '+r.txt)}
{await p.evaluate(()=>{S.m[2].tools[0].dia=0.5;S.m[2].tools[1].dia=0.5;S.m[1].name='Mill B Doosan DNM 5700 rear cell';save();more()});await p.waitForTimeout(150);const r=await st();await p.evaluate(()=>document.querySelector('#v .card[onclick^="tools("]').scrollIntoView({block:'center'}));await p.screenshot({path:`/workspace/macro-app/preview/v87-more-longname-${wd}.png`});
 log(`${wd} long name doesn't fit: just “⚠ 1”`,r.txt=='⚠ 1'&&r.h==h0&&r.aria.includes('Mill B Doosan DNM 5700 rear cell')&&r.title.includes('Mill B Doosan DNM 5700 rear cell'),JSON.stringify(r));console.log('   '+wd+' long name → '+r.txt);
 await p.evaluate(()=>{S.m[1].name='Mill B';S.m[2].tools[0].dia=0;S.m[2].tools[1].dia=-1;save();more()});await p.waitForTimeout(100)}
await p.setViewportSize({width:wd==320?390:320,height:700});await p.waitForTimeout(200);const r2=await st();log(`${wd}→resize: refits`,r2.fits&&!/…/.test(r2.txt),JSON.stringify(r2));
await p.evaluate(()=>{S.m.forEach(m=>(m.tools||[]).forEach(t=>{if(!(+t.dia>0))t.dia=0.25}));S.cur=0;tlCurM().tools[0].dia=-0.5;save();tools()});await p.waitForTimeout(150);const sel='input[data-f="dia"][data-i="0"]';await p.tap(sel);await p.fill(sel,'');await p.type(sel,'0.5');await p.evaluate(()=>document.activeElement.blur());await p.waitForTimeout(100);
 log(`${wd} fixed row clears at once`,await p.evaluate(()=>{const c=document.querySelector('input[data-f="dia"][data-i="0"]').closest('.card');return !c.classList.contains('r83badtool')&&!c.querySelector('.r83err')&&!document.querySelector('#r83tlbad')&&tlCurM().tools[0].dia==0.5}),'');
await ctx.close()}console.log(fails?'FAILS '+fails:'ALL PASS');await b.close()})();
