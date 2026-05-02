const CACHE_NAME = 'tributos-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://code.jquery.com/jquery-3.6.0.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jquery-maskmoney/3.0.2/jquery.maskMoney.min.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap'
];

// Instalação: Salva arquivos no cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Ativação: Limpa caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// Busca: Serve arquivos do cache se estiver offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
