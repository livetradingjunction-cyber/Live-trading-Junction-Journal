const CACHE_NAME = "trading-journal-v4";
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./favicon-192.png",
  "./favicon-512.png"
];

// Install: pre-cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("✅ Files cached");
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch: cache-first, then network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => resp || fetch(event.request))
  );
});

// Activate: cleanup old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n)))
    )
  );
});
