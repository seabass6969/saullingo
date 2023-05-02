console.log("service worker loaded")
const allcontent = [
"/offline.html",
"emoji/crystal-ball.png",
"emoji/happy.png",
"emoji/navbar.png",
"emoji/night.png",
"emoji/rocket.png",
"emoji/sun.png",
"/sun.png",
"icon/icon-192x192.png",
"icon/icon-256x256.png",
"icon/icon-384x384.png",
"icon/icon-512x512.png",
"index.html",
"manifest.webmanifest",
"favicon.svg",
"sw.js"
]
let cache_name = "SAulLingo-do-not-click-me-MMXXII-cephas";
self.addEventListener("install",Event=> {
    console.log("adding me into cache");
    Event.waitUntil(
        caches.open(cache_name).then(cache => {return cache.addAll(allcontent);}).catch(err => console.log(err))
    )
})

self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    const r = await caches.match(e.request);
    console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
    if (r) { return r; }
    const response = await fetch(e.request);
    const cache = await caches.open(cache_name);
    console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
    cache.put(e.request, response.clone());
    return response;
  })());
});

