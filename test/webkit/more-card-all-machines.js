const {webkit,devices}=require('/tmp/pw/node_modules/playwright');
(async()=>{const b=await webkit.launch();for(const wd of [320,390]){const ctx=await b.newContext({...devices['iPhone 13'],viewport:{width:wd,height:wd<350?640:844}});const p=await ctx.newPage();
await p.goto('file:///workspace/macro-app/index.html');await p.evaluate(()=>localStorage.clear());await p.reload();await p.waitForTimeout(800);
await p.evaluate(()=>{NOASK=1;S.m.forEach((m,i)=>{if(!m.tools||!m.tools.length)m.tools=[{id:'a'+i,n:1,type:'Drill',dia:0.25},{id:'b'+i,n:2,type:'Drill',dia:0.25}]});S.m[1].tools[0].dia=-0.5;S.m[2].tools[0].dia=0;S.m[2].tools[1].dia=-1;save();more()});await p.waitForTimeout(200);
await p.evaluate(()=>document.querySelector('#v .card[onclick^="tools("]').scrollIntoView({block:'center'}));await p.screenshot({path:`/workspace/macro-app/preview/v86-more-allmachines-${wd}.png`});
await p.tap('#v .card[onclick^="tools("]');await p.waitForTimeout(200);await p.screenshot({path:`/workspace/macro-app/preview/v86-more-pick-${wd}.png`});
console.log(wd,await p.evaluate(()=>[...document.querySelectorAll('#r86pick .r86m')].map(b=>b.textContent.trim()).join(' | ')+' cur='+S.cur));
await p.tap('#r86pick .r86m[data-i="2"]');await p.waitForTimeout(200);console.log(wd,await p.evaluate(()=>document.querySelector('#ttl').textContent+' cur='+S.cur));await ctx.close()}await b.close()})();
