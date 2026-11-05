const CACHE='tube-track-shell-v1.8';
const SHELL=['./','./TubeTrack.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)));self.skipWaiting()});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('tube-track-shell-')&&k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);
 if(event.request.method!=='GET'||url.origin!==self.location.origin)return;
 if(event.request.mode==='navigate'){
  event.respondWith(fetch(event.request).catch(()=>caches.match('./TubeTrack.html')));return;
 }
 if(SHELL.some(x=>new URL(x,self.registration.scope).pathname===url.pathname)){
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)));return;
 }
});
