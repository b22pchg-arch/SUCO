/* COMTRADE Offline Reader Pro V8 Row Annotations - Service Worker */
const CACHE_VERSION = 'v8.0.0-row-annotations-20260609';
const CACHE_NAME = 'comtrade-reader-' + CACHE_VERSION;
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-72.png',
  './icons/icon-96.png',
  './icons/icon-128.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

async function cacheAppShell() {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(APP_SHELL.map(url => new Request(url, { cache: 'reload' })));
  return true;
}

self.addEventListener('install', event => {
  event.waitUntil(cacheAppShell().then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith('comtrade-reader-') && k !== CACHE_NAME).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', event => {
  const data = event.data || {};
  if (data.type === 'SKIP_WAITING') {
    self.skipWaiting();
    return;
  }
  if (data.type === 'GET_VERSION') {
    if (event.ports && event.ports[0]) event.ports[0].postMessage({ ok: true, cache: CACHE_NAME, version: CACHE_VERSION });
    return;
  }
  if (data.type === 'REFRESH_CACHE') {
    event.waitUntil((async () => {
      try {
        await cacheAppShell();
        if (event.ports && event.ports[0]) event.ports[0].postMessage({ ok: true, cache: CACHE_NAME });
      } catch (err) {
        if (event.ports && event.ports[0]) event.ports[0].postMessage({ ok: false, error: err.message || String(err) });
      }
    })());
  }
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        const cache = await caches.open(CACHE_NAME);
        cache.put('./index.html', fresh.clone());
        return fresh;
      } catch (err) {
        return (await caches.match('./index.html')) || new Response('COMTRADE Reader offline cache chưa sẵn sàng.', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;
    try {
      const fresh = await fetch(req);
      const cache = await caches.open(CACHE_NAME);
      cache.put(req, fresh.clone());
      return fresh;
    } catch (err) {
      return new Response('Offline và tài nguyên này chưa có trong cache: ' + url.pathname, { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    }
  })());
});
