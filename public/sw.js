console.log("service worker loaded")
const filesToCache = [
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
"sw.js",
]

let cacheName = "SAulLingo-do-not-click-me-MMXXII-cephas-v1.4";
// Install the service worker and cache the files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(filesToCache);
    })
  );
});

// Activate the service worker and clean up old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => {
          return name.startsWith("SAulLingo-do-not-click-me-MMXXII-cephas-v1.4") && name !== cacheName;
        }).map(name => {
          return caches.delete(name);
        })
      );
    })
  );
});

// Serve the PWA from the cache or fetch it from the network
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

// Listen for the "update" message and reload the page
self.addEventListener("message", event => {
  if (event.data === "update") {
    caches.keys().then(cacheNames => {
      cacheNames.forEach(cacheName => {
        caches.delete(cacheName);
      });
    });
    self.skipWaiting();
    clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage("reload");
      });
    });
  }
});