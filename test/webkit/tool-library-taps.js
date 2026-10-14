// real taps in WebKit iPhone 13 against the Tool Library edit UI
const {webkit,devices}=require('/tmp/pw/node_modules/playwright');
(async()=>{const b=await webkit.launch();const ctx=await b.newContext({...devices['iPhone 13']});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///workspace/macro-app/index.html');await p.evaluate(()=>localStorage.clear());await p.reload();await p.waitForTimeout(800);
await p.evaluate(()=>{NOASK=1;tools()});await p.waitForTimeout(300);console.log('cnt',await p.evaluate(()=>document.querySelectorAll('input[data-f=n]').length+' '+document.querySelector('#ttl').textContent));
const res=[];const st=()=>p.evaluate(()=>JSON.stringify(tlCurM().tools.map(t=>[t.id,t.n,t.dia])));
const warn=async(i,f)=>p.evaluate(([i,f])=>{const el=document.querySelector(`input[data-f="${f}"][data-i="${i}"]`);const w=document.querySelector(`.r83err[data-for="${f}${i}"]`);const vis=w&&w.offsetParent&&w.textContent.trim();return vis?w.textContent.trim():''},[i,f]);
const tryv=async(f,v,label)=>{console.log('try',label,await p.evaluate(()=>document.querySelector('#ttl').textContent+' '+document.querySelectorAll('input[data-f=n]').length));const before=await st();const sel=`input[data-f="${f}"][data-i="0"]`;await p.tap(sel);await p.fill(sel,'');if(v)await p.type(sel,v);await p.tap('#tlhead .s');await p.evaluate(()=>document.activeElement&&document.activeElement.blur());await p.waitForTimeout(600);const after=await st();const w=await warn(0,f);res.push(`${before==after?'notsaved':'SAVED'} | ${w?'warn: '+w:'NO WARNING'} | ${label}`);return [before==after,w]};
const t2=await p.evaluate(()=>tlCurM().tools[1].n);
await tryv('n',String(t2),'duplicate T'+t2);
for(const v of ['0','999','1.5','-3','1e9',''])await tryv('n',v,'T “'+v+'”');
for(const v of ['-0.5','0',''])await tryv('dia',v,'dia “'+v+'”');
const free=await p.evaluate(()=>{const m=tlCurM();let n=1;while(m.tools.some(t=>+t.n==n))n++;return n});
let r=await tryv('n',String(free),'valid T'+free);res[res.length-1]=res[res.length-1].replace(/^notsaved/,'NOT SAVED (bad)');
await tryv('dia','0.375','valid dia 0.375');
res.push('final '+await st());res.push('errors '+errs.join('|'));
await p.screenshot({path:process.argv[2]||'/tmp/tl.png'});
// screenshot a warning state
const sel='input[data-f="n"][data-i="0"]';await p.tap(sel);await p.fill(sel,'');await p.type(sel,'1.5');await p.waitForTimeout(250);await p.evaluate(()=>{const w=document.querySelector('.r83err');w&&w.scrollIntoView({block:'center'})});await p.screenshot({path:process.argv[3]||'/tmp/tlw.png'});
console.log(res.join('\n'));await b.close()})();
