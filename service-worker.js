// Service Worker for The Yard Cafe Events Manager PWA
const CACHE_NAME = 'yard-cafe-events-v1';
const ASSETS_TO_CACHE = [
  '/admin/index.html',
  '/admin/css/admin-styles.css',
  '/admin/js/admin-app.js',
  '/admin/js/events-manager.js',
  '/css/normalize.css',
  '/css/webflow.css',
  '/css/yardcafe.webflow.css',
  '/images/Y_wht.png',
  '/images/pwa-icon-192.png',
  '/images/pwa-icon-512.png',
  '/images/favicon.png'
];

// Install event - cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching app assets');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            console.log('Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch event - network first, then cache
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Clone the response
        const responseToCache = response.clone();
        
        // Open cache and store the response
        caches.open(CACHE_NAME)
          .then(cache => {
            if (event.request.url.indexOf('http') === 0) {
              cache.put(event.request, responseToCache);
            }
          });
          
        return response;
      })
      .catch(() => {
        // If network fails, try to serve from cache
        return caches.match(event.request);
      })
  );
});
