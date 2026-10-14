const {webkit,devices}=require('/tmp/pw/node_modules/playwright');
(async()=>{const b=await webkit.launch();const ctx=await b.newContext({...devices['iPhone 13']});const p=await ctx.newPage();
await p.goto('file:///workspace/macro-app/index.html');await p.evaluate(()=>{localStorage.clear();localStorage.setItem('mc_draft',JSON.stringify({J:{op:'bolt',p:{},edits:{}},cur:0,t:Date.now()}))});await p.reload();await p.waitForTimeout(800);
await p.evaluate(()=>{NOASK=1;tab('new')});await p.waitForTimeout(200);await p.tap('#r79dr button:has-text("Discard")');
await p.evaluate(()=>pickJob('bolt'));await p.waitForTimeout(150);for(const [k,v] of [['Center X','1.25'],['Center Y','0.5']]){const s=`#out input[data-k="${k}"]`;await p.tap(s);await p.type(s,v)}
await p.reload();await p.waitForTimeout(900);await p.evaluate(()=>{NOASK=1;tab('new')});await p.waitForTimeout(200);
console.log('banner after F5:',await p.evaluate(()=>!!document.querySelector('#r79dr')),await p.evaluate(()=>localStorage.getItem('mc_draft')?.match(/"typed":\{[^}]*\}/)?.[0]));await b.close()})();
