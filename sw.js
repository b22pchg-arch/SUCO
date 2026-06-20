/* COMTRADE Offline Reader Pro V9.9.28 - PWA cache for stable open guard */
const CACHE_VERSION = 'comtrade-reader-v99-28-record-decoder-plus-20260620-1';
const OLD_CACHE_PREFIX = 'comtrade-reader-';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './unarchiver.min.js',
  './worker-bundle.js',
  './libarchive.wasm',
  './icons/icon-72.png',
  './icons/icon-96.png',
  './icons/icon-128.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

async function cacheAppShell() {
  const cache = await caches.open(CACHE_VERSION);
  for (const url of APP_SHELL) {
    try {
      await cache.add(new Request(url, { cache: 'reload' }));
    } catch (err) {
      console.warn('[SW] Không cache được:', url, err);
    }
  }
  return true;
}

function withMimeIfNeeded(request, response) {
  if (!response) return response;
  const url = new URL(request.url);
  if (url.pathname.endsWith('.wasm')) {
    const headers = new Headers(response.headers);
    headers.set('Content-Type', 'application/wasm');
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  }
  if (url.pathname.endsWith('.js')) {
    const headers = new Headers(response.headers);
    if (!headers.get('Content-Type')) headers.set('Content-Type', 'text/javascript; charset=utf-8');
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  }
  return response;
}

self.addEventListener('install', event => {
  event.waitUntil(cacheAppShell().then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => {
      if (k.startsWith(OLD_CACHE_PREFIX) && k !== CACHE_VERSION) return caches.delete(k);
      return Promise.resolve(false);
    }));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_VERSION);
    if (req.mode === 'navigate') {
      try {
        const fresh = await fetch(req);
        cache.put('./index.html', fresh.clone()).catch(() => {});
        return fresh;
      } catch (err) {
        return (await cache.match('./index.html')) || new Response('COMTRADE PWA chưa có index.html trong cache.', {status: 503});
      }
    }

    const cached = await cache.match(req);
    if (cached) return withMimeIfNeeded(req, cached);

    try {
      const fresh = await fetch(req);
      const pathname = url.pathname.toLowerCase();
      if (fresh.ok && (pathname.endsWith('.html') || pathname.endsWith('.js') || pathname.endsWith('.wasm') || pathname.endsWith('.webmanifest') || pathname.endsWith('.png'))) {
        cache.put(req, fresh.clone()).catch(() => {});
      }
      return withMimeIfNeeded(req, fresh);
    } catch (err) {
      return new Response('Không có trong cache offline: ' + url.pathname, { status: 503, headers: {'Content-Type':'text/plain; charset=utf-8'} });
    }
  })());
});

self.addEventListener('message', event => {
  const data = event.data || {};
  const reply = msg => { try { event.ports && event.ports[0] && event.ports[0].postMessage(msg); } catch(e){} };
  if (data.type === 'GET_VERSION') {
    reply({ ok: true, cache: CACHE_VERSION, files: APP_SHELL });
  } else if (data.type === 'REFRESH_CACHE') {
    cacheAppShell().then(() => reply({ ok: true, cache: CACHE_VERSION, files: APP_SHELL })).catch(err => reply({ ok: false, error: err.message }));
  } else if (data.type === 'SKIP_WAITING') {
    self.skipWaiting();
    reply({ ok: true });
  }
});
