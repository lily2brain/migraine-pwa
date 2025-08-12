self.addEventListener('install', e => {
    e.waitUntil(
        caches.open('migraine-pwa').then(cache => {
            return cache.addAll([
               const CACHE = 'migraine-pwa-v1';
const ASSETS = [
  'index.html',
  'style.css',
  'app.js',
  'manifest.json'
];

            ]);
        })
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(response => response || fetch(e.request))
    );
});
