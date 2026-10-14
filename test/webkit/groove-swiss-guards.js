// End-to-end O9202 + O9500 step guards, WebKit iPhone 13, fresh context (nothing persists)
const {webkit,devices}=require('/tmp/pw/node_modules/playwright');
(async()=>{const b=await webkit.launch();const ctx=await b.newContext({...devices['iPhone 13']});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///workspace/macro-app/index.html');await p.evaluate(()=>localStorage.clear());await p.reload();await p.waitForTimeout(800);
const blk=o=>p.evaluate(o=>{const c=J&&J.code||[];const i=c.findIndex(l=>l.startsWith(o));if(i<0)return null;let e=i+1;while(e<c.length&&!/^O\d|^%/.test(c[e]))e++;return c.slice(i,e)},o);
await p.evaluate(()=>{NOASK=1;S.cur=S.m.findIndex(m=>/lathe/i.test(m.name+' '+(m.type||'')));tab('new');pickJob('lgroove')});await p.waitForTimeout(200);
const vals={'Bar Ø':'2.0','Width':'0.25','Depth':'0.1','At Z':'1.0','Insert W':'0.125','Tool':'3','Z0':'0'};
for(const [k,v] of Object.entries(vals)){const sel=`#out input[data-k="${k}"]`;await p.tap(sel);await p.fill(sel,'');await p.type(sel,v)}
await p.selectOption('#out select[data-k="Work offset"]',{label:'G54'});await p.tap('#out button:has-text("Continue")');await p.waitForTimeout(500);
const g=await blk('O9202');
const before=await p.evaluate(()=>S.m.length);await p.evaluate(()=>{pick('Generic Swiss-type','Swiss-type');S.cur=S.m.length-1;tab('new');ex('G54 swiss turn 0.5 bar to 0.375 dia 0.8 long z0 0 part off 0.062')});await p.waitForTimeout(500);
const s=await blk('O9500');const mname=await p.evaluate(()=>S.m[S.cur].name);
const show=(n,b)=>{const ok=b&&b.some(l=>/^IF\[#\d+LE0\]GOTO97$/.test(l))&&b.some(l=>/^N97 #3000=2/.test(l));console.log((ok?'PASS ':'FAIL ')+n);(b||['(no block)']).filter(l=>/LE0\]GOTO97|^N97|^WHILE|#100=#100|^O9/.test(l)).forEach(l=>console.log('   '+l))};
show('O9202 OD groove on demo lathe',g);show('O9500 swiss on temporary '+mname+' (machines '+before+'→'+(before+1)+', fresh context)',s);console.log('errors '+(errs.join('|')||'none'));await b.close()})();
