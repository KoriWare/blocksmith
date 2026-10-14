const {chromium,webkit,devices}=require('/tmp/pw/node_modules/playwright');
(async()=>{const out='/workspace/macro-app/preview/';const c=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--allow-file-access-from-files']});let F=0;const log=(n,ok,x)=>{if(!ok)F++;console.log((ok?'PASS ':'FAIL ')+n+(ok?'':' :: '+x))};
for(const [W,H] of [[1280,800],[1920,1080]]){const p=await c.newPage({viewport:{width:W,height:H}});await p.goto('file:///workspace/macro-app/index.html');await p.evaluate(()=>localStorage.clear());await p.reload();await p.waitForTimeout(800);
 const chk=async(n)=>{const r=await p.evaluate(()=>{const L=(W)=>{const sel=['.h','.tabs','#v','#r89 .r89c','#dlg .dlgb','#r79toast','#r86pick .card','#pmkey'];return sel.map(s=>{const e=document.querySelector(s);if(!e||!e.offsetParent&&getComputedStyle(e).position!='fixed')return null;const r=e.getBoundingClientRect();if(!r.width)return null;return [s,Math.round(r.left),Math.round(r.right)]}).filter(Boolean)};return {els:L(),W:innerWidth,sw:document.documentElement.scrollWidth}});const lo=(r.W-480)/2-1,hi=(r.W+480)/2+1;const bad=r.els.filter(([s,a,b])=>a<lo||b>hi);log(`${W} ${n}: everything inside the 480 column, no h-scroll`,!bad.length&&r.sw<=r.W,JSON.stringify(bad)+' sw'+r.sw)};
 await chk('home');await p.screenshot({path:out+`v91-wide-home-${W}.png`});
 await p.evaluate(()=>{NOASK=1;tab('new');document.querySelector('#q').value=JB.bolt[1];go()});await p.waitForTimeout(200);await chk('build');await p.screenshot({path:out+`v91-wide-build-${W}.png`});
 await p.evaluate(()=>tab('sim'));await p.waitForTimeout(300);await chk('sim');
 await p.evaluate(()=>{S.ts=150;applyTS();tab('new')});await p.waitForTimeout(200);await chk('build 150%');await p.evaluate(()=>{S.ts=100;applyTS()});
 await p.evaluate(()=>ed('Dia'));await p.waitForTimeout(150);await chk('dialog');await p.keyboard.press('Escape');await p.waitForTimeout(100);
 await p.evaluate(()=>toast79('Saved'));await p.waitForTimeout(80);await chk('toast');
 await p.evaluate(()=>{tlCurM().tools[0].dia=-1;S.m[1].tools=S.m[1].tools&&S.m[1].tools.length?S.m[1].tools:[{id:'q',n:1,dia:-1,type:'Drill'}];S.m[1].tools[0].dia=-1;more()});await p.waitForTimeout(100);await p.click('#v .card[onclick^="tools("]');await p.waitForTimeout(150);await chk('pick sheet');await p.evaluate(()=>r86close());
 await p.evaluate(()=>r89start('mill'));await p.waitForTimeout(300);await chk('tour');if(W==1280)await p.screenshot({path:out+'v91-wide-tour-1280.png'});await p.evaluate(()=>r89close());
 log(`${W} outside the column is a neutral dark background`,await p.evaluate(()=>getComputedStyle(document.documentElement).backgroundColor=='rgb(10, 11, 13)'));await p.close()}
await c.close();
// phones unchanged: compare against HEAD screenshots pixel-for-pixel is done separately
console.log(F?'FAILS '+F:'ALL PASS')})();
