const CACHE_NAME = "trading-journal-v3";
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./favicon.ico",
  "./favicon-512.png"
];

// Install event - Cache files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("✅ Files cached successfully");
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event - Serve from cache first
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Activate event - Clear old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
});
