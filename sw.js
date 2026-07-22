/* =========================================================
   HILADOS — Service Worker
   Cachea el "app shell" (HTML, CSS, JS, íconos) la primera vez
   que se visita, para que el juego abra y funcione sin conexión
   una vez instalado. Los 1150 niveles ya viven dentro de
   script.js, así que quedan disponibles offline automáticamente.
   ========================================================= */

const CACHE_NAME = 'hilados-cache-v1';
const APP_SHELL = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-512-maskable.png',
  './icons/apple-touch-icon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Estrategia: "cache first, luego red" para el shell; siempre intenta
// actualizar en segundo plano cuando hay conexión disponible.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const networkFetch = fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => cached); // sin conexión: usar la copia cacheada

      return cached || networkFetch;
    })
  );
});
