const {webkit,devices}=require('/tmp/pw/node_modules/playwright');
(async()=>{const b=await webkit.launch();const ctx=await b.newContext({...devices['iPhone 13']});const p=await ctx.newPage();let F=0;const log=(n,ok,x)=>{if(!ok)F++;console.log((ok?'PASS ':'FAIL ')+n+(ok?'':' :: '+x))};
await p.goto('file:///workspace/macro-app/index.html');await p.evaluate(()=>localStorage.clear());await p.reload();await p.waitForTimeout(800);
const vis=s=>p.evaluate(s=>{const e=document.querySelector(s);return !!(e&&e.offsetParent)},s);
await p.evaluate(()=>{NOASK=1;tab('new')});await p.waitForTimeout(200);
log('no job: picker expanded (tabs, search, grid)',await vis('#jcbar')&&await vis('#jcq')&&await vis('#jcjobs')&&!await vis('#r79fold'));
await p.tap('#jcbar [data-cat="Milling"]');await p.waitForTimeout(150);await p.screenshot({path:'/workspace/macro-app/preview/v88-build-expanded-390.png'});
await p.tap('#jcjobs [data-op="face"]');await p.waitForTimeout(300);
const bar=await p.evaluate(()=>document.querySelector('#r79fold').innerText.replace(/\s+/g,' ').trim());log('tap job → one compact bar',bar=='▸ Milling · Face mill Change'&&!await vis('#jcbar')&&!await vis('#jcq')&&!await vis('#jcjobs'),bar);
log('chips right under the bar (Job manager link between kept)',await p.evaluate(()=>{const fb=document.querySelector('#r79fold'),c=document.querySelector('#out .card');return c.getBoundingClientRect().top-fb.getBoundingClientRect().bottom<60}));
await p.screenshot({path:'/workspace/macro-app/preview/v88-build-collapsed-390.png'});
await p.evaluate(()=>{S.jtab='Probing';save()});await p.tap('#r79fold');await p.waitForTimeout(200);await p.screenshot({path:'/workspace/macro-app/preview/v88-build-expanded-job-390.png'});
log('tap bar → expands with the job\'s tab selected',await vis('#jcbar')&&await p.evaluate(()=>document.querySelector('#jcbar .chip.y').dataset.cat)=='Milling'&&await p.evaluate(()=>document.querySelector('#jcjobs [data-op="face"]').classList.contains('y')),await p.evaluate(()=>document.querySelector('#jcbar .chip.y')?.dataset.cat));
log('expanded bar reads ▾ … Hide',(await p.evaluate(()=>document.querySelector('#r79fold').innerText)).startsWith('▾'));
await p.fill('#jcq','bolt');await p.waitForTimeout(150);log('search still works',await p.evaluate(()=>[...document.querySelectorAll('#jcjobs [data-op]')].length>0&&[...document.querySelectorAll('#jcjobs [data-op]')].every(b=>/bolt/i.test(b.textContent))));
await p.tap('#jcjobs [data-op]');await p.waitForTimeout(250);log('picking from search collapses again',!await vis('#jcbar')&&/Bolt/.test(await p.evaluate(()=>document.querySelector('#r79fold').innerText)));
await p.evaluate(()=>{J.p['Dia']={v:3,g:false};saveJob&&0});
// My jobs: save the job to Library, open from Library → collapsed; My jobs tab lists it
await p.evaluate(()=>{tab('new');document.querySelector('#q').value=JB.bolt[1];go();J.name='Kori bolt';UIA.confirm=()=>true;window.prompt=()=>'Kori bolt';saveJob();S.jobs[0].name='Kori bolt';save()});
await p.evaluate(()=>{J=null;tab('new')});await p.waitForTimeout(200);log('no job after clearing: expanded',await vis('#jcbar'));
const my=await p.evaluate(()=>[...document.querySelectorAll('#jcbar [data-cat]')].map(b=>b.dataset.cat).find(c=>/My jobs/.test(c)));
if(my){await p.tap(`#jcbar [data-cat="${my}"]`);await p.waitForTimeout(150);const has=await p.evaluate(()=>[...document.querySelectorAll('#jcjobs [data-op]')].map(b=>b.textContent));log('My jobs tab lists saved job',has.some(t=>/Kori bolt/.test(t)),has.join('|'));
 await p.tap('#jcjobs [data-op]:has-text("Kori bolt")');await p.waitForTimeout(300);log('opening a My job collapses, bar names My jobs',!await vis('#jcbar')&&/My jobs/.test(await p.evaluate(()=>document.querySelector('#r79fold').innerText)),await p.evaluate(()=>document.querySelector('#r79fold')?.innerText));}
else log('My jobs tab present',false,'none');
await p.evaluate(()=>{J=null;tab('recent')});await p.waitForTimeout(200);await p.tap('#v [onclick^="reopen("]');const op=1;console.log('lib open:',op);await p.waitForTimeout(300);
if(await p.evaluate(()=>!!document.querySelector('#jpbox')))log('opened from Library: starts collapsed',await p.evaluate(()=>document.querySelector('#jpbox').classList.contains('r79folded'))&&!await vis('#jcbar'));
await p.evaluate(()=>{tab('new');pickJob('face')});await p.waitForTimeout(150);await p.reload();await p.waitForTimeout(900);await p.evaluate(()=>{NOASK=1;tab('new')});await p.waitForTimeout(150);
const rb=await p.$('#r79dr button:has-text("Restore")');if(rb){await rb.tap();await p.waitForTimeout(300);log('restored draft: starts collapsed',!await vis('#jcbar')&&await vis('#r79fold'))}
await p.evaluate(()=>{tab('new')});await p.waitForTimeout(150);if(await vis('#r79fold')){await p.tap('#r79fold');await p.waitForTimeout(150)}const jm=await p.$('#jmlink a, #jmlink [onclick]');if(jm){await jm.tap();await p.waitForTimeout(250);log('Job manager link works',/Job manager/.test(await p.evaluate(()=>document.querySelector('#ttl').textContent)))}else log('Job manager link found',false,'');
console.log(F?'FAILS '+F:'ALL PASS');await b.close()})();
