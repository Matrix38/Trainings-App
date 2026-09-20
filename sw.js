const CACHE_NAME = "fitplan-v2";

const FILES = [
  "./",
  "./index.html",
  "./manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("push", event => {
  let data = {};

  try {
    data = event.data ? event.data.json() : {};
  } catch {
    data = {
      title: "FitPlan 🔔",
      body: "Zeit für dein Training!"
    };
  }

  event.waitUntil(
    self.registration.showNotification(
      data.title || "FitPlan 🔔",
      {
        body: data.body || "Zeit für dein Training!",
        icon: "./icon-192.png",
        badge: "./icon-192.png"
      }
    )
  );
});
