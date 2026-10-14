const {webkit,devices}=require('/tmp/pw/node_modules/playwright');
(async()=>{const b=await webkit.launch();const ctx=await b.newContext({...devices['iPhone 13']});const p=await ctx.newPage();
await p.goto('file:///workspace/macro-app/index.html');await p.evaluate(()=>{localStorage.clear()});await p.reload();await p.waitForTimeout(800);
await p.evaluate(()=>{NOASK=1;tlCurM().tools[0].dia=-0.5;save()});await p.reload();await p.waitForTimeout(800);
const r=[];const chk=async(n)=>r.push(n+': '+await p.evaluate(()=>[...document.querySelectorAll('#v button, #v .card[onclick^="tools("]')].filter(b=>/🔧\s*Tool Library/.test(b.textContent)).map(b=>(b.classList.contains('r83badbtn')?'RED ':'plain ')+getComputedStyle(b.matches('.card')?b.querySelector('.t'):b,'::after').content).join(' ; ')));
await p.evaluate(()=>more());await p.waitForTimeout(200);await chk('More');await p.screenshot({path:'/workspace/macro-app/preview/v85-more-toolbadge-390.png'});
await p.evaluate(()=>tab('machines'));await p.waitForTimeout(200);await chk('Machines');
await p.evaluate(()=>tab('new'));await p.waitForTimeout(200);await chk('Build');console.log(r.join('\n'));await b.close()})();
