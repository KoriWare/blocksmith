const {webkit,devices}=require('/tmp/pw/node_modules/playwright');
(async()=>{const b=await webkit.launch();const ctx=await b.newContext({...devices['iPhone 13']});const p=await ctx.newPage();
await p.goto('file:///workspace/macro-app/index.html');await p.evaluate(()=>localStorage.clear());await p.reload();await p.waitForTimeout(800);
const out=[];
// A: confirmed chip edits (Dia 4, OK; Holes 8, OK), F5 right away
await p.evaluate(()=>{NOASK=1;tab('new');pickJob('bolt')});await p.waitForTimeout(200);
for(const [k,v] of [['Dia','4'],['Holes','8']]){await p.tap(`#out .card .chip:has-text("${k}")`);await p.waitForTimeout(150);await p.fill('#dlgin','');await p.type('#dlgin',v);await p.keyboard.press('Enter');await p.waitForTimeout(100)}
out.push('A in J: '+await p.evaluate(()=>JSON.stringify([J.p.Dia.v,J.p.Holes.v])));
await p.reload();await p.waitForTimeout(900);await p.evaluate(()=>{NOASK=1;tab('new')});await p.waitForTimeout(200);const bA=await p.evaluate(()=>!!document.querySelector('#r79dr'));
if(bA){await p.tap('#r79dr button:has-text("Restore")');await p.waitForTimeout(200)}out.push('A banner '+bA+' restored '+await p.evaluate(()=>JSON.stringify(J&&[J.p.Dia.v,J.p.Holes.v])));
// B: typing in the chip box without OK, F5 right away
await p.evaluate(()=>{drClear();J=null;tab('new');pickJob('bolt')});await p.waitForTimeout(200);await p.tap('#out .card .chip:has-text("Dia")');await p.waitForTimeout(150);await p.fill('#dlgin','');await p.type('#dlgin','5.5');
await p.reload();await p.waitForTimeout(900);await p.evaluate(()=>{NOASK=1;tab('new')});await p.waitForTimeout(200);const bB=await p.evaluate(()=>!!document.querySelector('#r79dr'));
if(bB){await p.tap('#r79dr button:has-text("Restore")');await p.waitForTimeout(250)}out.push('B banner '+bB+' box reopened with '+await p.evaluate(()=>document.getElementById('dlgin')?.value)+' Dia still '+await p.evaluate(()=>J&&J.p.Dia.v));
await p.keyboard.press('Enter');await p.waitForTimeout(150);out.push('B after OK Dia '+await p.evaluate(()=>J.p.Dia.v));
console.log(out.join('\n'));await b.close()})();
