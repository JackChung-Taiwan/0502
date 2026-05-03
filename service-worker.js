const CACHE_NAME = "michelle-english-game-pwa-v2";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",

  // Game 1
  "https://michelle0919.github.io/T1-2-p.17-syllable-stress/",

  // Game 2
  "https://michelle0919.github.io/T1-2-p.16-syllable/",

  // Game 3
  "https://michelle0919.github.io/V8-p.6-7-VOC/",

  // Game 4
  "https://michelle0919.github.io/T1-4-p.9/",

  // Game 5
  "https://jackchung-taiwan.github.io/P7-p.8-13-ar-er-ir-or-ur-oor/",

  // Game 6
  "https://michelle0919.github.io/T1-1-p.14-15_Greetings-and-Introductions/"
];

// Install
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      for (const file of FILES_TO_CACHE) {
        try {
          await cache.add(file);
          console.log("Cached:", file);
        } catch (error) {
          console.warn("Cache failed:", file, error);
        }
      }
    })
  );

  self.skipWaiting();
});

// Activate
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );

  self.clients.claim();
});

// Fetch
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).catch(() => {
          return caches.match("./index.html");
        })
      );
    })
  );
});
