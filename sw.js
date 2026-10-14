const C='mc-v75';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','manifest.json','icons/a.svg','icons/icon-192.png','icons/icon-512.png','icons/maskable-512.png','icons/apple-touch-icon.png'])));});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==C).map(n=>caches.delete(n)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{if(r&&r.ok&&new URL(e.request.url).origin===location.origin){const x=r.clone();caches.open(C).then(c=>c.put(e.request,x));}return r;}).catch(()=>caches.match(e.request).then(r=>r||caches.match('index.html'))));});
