// Tutorial tour: WebKit iPhone 13 screenshots + "nothing left behind" check
const {webkit,devices}=require('/tmp/pw/node_modules/playwright');
(async()=>{const b=await webkit.launch();let F=0;const log=(n,ok,x)=>{if(!ok)F++;console.log((ok?'PASS ':'FAIL ')+n+(ok?'':' :: '+x))};const P='/workspace/macro-app/preview/';
for(const wd of [390,320]){const ctx=await b.newContext({...devices['iPhone 13'],viewport:{width:wd,height:wd<350?640:844}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///workspace/macro-app/index.html');await p.evaluate(()=>localStorage.clear());await p.reload();await p.waitForTimeout(900);
await p.evaluate(()=>home());await p.waitForTimeout(200);log(wd+' first launch: welcome card',await p.evaluate(()=>!!document.querySelector('#r89w')));
if(wd==390)await p.screenshot({path:P+'v89-tour-welcome-390.png'});
const before=await p.evaluate(()=>JSON.stringify(Object.keys(localStorage).sort().map(k=>[k,localStorage.getItem(k)])));
await p.tap('#r89w button:has-text("Mill tour")');await p.waitForTimeout(300);
const tapOK=async()=>p.evaluate(()=>[...document.querySelectorAll('#r89 button')].every(b=>{const r=b.getBoundingClientRect();return r.height>=44&&r.width>=44}));
const fits=async()=>p.evaluate(()=>{const c=document.querySelector('#r89 .r89c').getBoundingClientRect();return c.left>=0&&c.right<=innerWidth+0.5});
for(let i=1;i<=8;i++){log(`${wd} mill step ${i}: 44px buttons, Skip, fits`,await tapOK()&&await p.evaluate(()=>!!document.querySelector('#r89 .r89skip'))&&await fits());
 if(wd==390&&[1,3,4].includes(i))await p.screenshot({path:P+`v89-tour-mill-step${i}-390.png`});
 if(wd==390&&i==8)await p.screenshot({path:P+'v89-tour-glossary-390.png'});
 if(i<8){await p.tap('#r89 button:has-text("Next")');await p.waitForTimeout(250)}}
log(wd+' glossary has all terms',await p.evaluate(()=>['Macro','O-number','G54','Z0','Chip','Need list','Override','Ready','Post','.mbjob'].every(t=>document.querySelector('#r89 .r89gl').textContent.includes(t))));
await p.tap('#r89 button:has-text("Back")');await p.waitForTimeout(200);log(wd+' Back works',await p.evaluate(()=>/7\/8/.test(document.querySelector('#r89 .r89k').textContent)));
await p.tap('#r89 .r89skip');await p.waitForTimeout(300);
const after=await p.evaluate(()=>JSON.stringify(Object.keys(localStorage).sort().filter(k=>k!='mc_tour').map(k=>[k,localStorage.getItem(k)])));
log(wd+' mill tour leaves storage untouched (only the tour flag)',after==before,after.slice(0,200)+' vs '+before.slice(0,200));
log(wd+' no welcome card again',await p.evaluate(()=>{home();return !document.querySelector('#r89w')&&localStorage.getItem('mc_tour')=='done'}));
// lathe from More → Tutorial
await p.evaluate(()=>more());await p.waitForTimeout(150);await p.tap('#r89more');await p.waitForTimeout(150);await p.tap('#r89again button:has-text("Lathe tour")');await p.waitForTimeout(300);
const jobs0=await p.evaluate(()=>S.jobs.length);
for(let i=1;i<=8;i++){if(i==3||i==4){const ok=await p.evaluate(()=>J&&J.op=='lturn'&&isLT(S.m[S.cur].type));log(`${wd} lathe step ${i}: OD turn on the demo lathe`,ok);if(wd==390)await p.screenshot({path:P+`v89-tour-lathe-step${i}-390.png`})}
 if(i==4)log(wd+' lathe step 4 has generated values',await p.evaluate(()=>J.p['Bar Ø']&&J.p['Bar Ø'].v!=null));
 if(i<8){await p.tap('#r89 button:has-text("Next")');await p.waitForTimeout(250)}}
await p.tap('#r89 button:has-text("Finish")');await p.waitForTimeout(300);
const after2=await p.evaluate(()=>JSON.stringify(Object.keys(localStorage).sort().filter(k=>k!='mc_tour').map(k=>[k,localStorage.getItem(k)])));
log(wd+' lathe tour leaves storage untouched, no jobs, no draft, machine back',after2==before&&await p.evaluate(j=>S.jobs.length==j&&!localStorage.getItem('mc_draft')&&S.cur==0&&J==null,jobs0),after2.slice(0,120));
await p.reload();await p.waitForTimeout(900);log(wd+' after reload: nothing from the tour',await p.evaluate(()=>!localStorage.getItem('mc_draft')&&!document.querySelector('#r79dr')));
log(wd+' no page errors',!errs.length,errs.join('|'));await ctx.close()}
console.log(F?'FAILS '+F:'ALL PASS');await b.close()})();
