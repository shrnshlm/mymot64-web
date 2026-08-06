// Minimal service worker: cache the app shell so it installs as a PWA and
// opens instantly. Trip data (/api/*) is always fetched live from the network.
const SHELL = "lean-shell-v1";
const ASSETS = ["./", "index.html", "manifest.json", "icons/icon.svg"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(SHELL).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== SHELL).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET") return;            // never cache API POSTs etc.
  if (url.pathname.includes("/api/")) return;         // trip data: always live
  // shell: cache-first, fall back to network
  e.respondWith(caches.match(e.request).then((hit) => hit || fetch(e.request)));
});
