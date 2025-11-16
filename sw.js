const CACHE_NAME = 'sorcery-tracker-cache-v2';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/index.tsx',
  '/metadata.json',
  '/types.ts',
  '/App.tsx',
  '/components/PlayerTracker.tsx',
  '/components/Counter.tsx',
  '/components/ManaTracker.tsx',
  '/components/DiceRollerModal.tsx',
  '/components/AvatarSelectorModal.tsx',
  '/components/Icons.tsx',
  '/components/ConfirmationModal.tsx',
  '/components/SettingsModal.tsx',
  '/components/CodexModal.tsx',
  'https://raw.githubusercontent.com/themitchnz/sorcery_tracker/main/archimago.png',
  'https://raw.githubusercontent.com/themitchnz/sorcery_tracker/main/avatar_of_air.png',
  'https://raw.githubusercontent.com/themitchnz/sorcery_tracker/main/avatar_of_earth.png',
  'https://raw.githubusercontent.com/themitchnz/sorcery_tracker/main/avatar_of_fire.png',
  'https://raw.githubusercontent.com/themitchnz/sorcery_tracker/main/avatar_of_water.png',
  'https://raw.githubusercontent.com/themitchnz/sorcery_tracker/main/battlemage.png',
  'https://raw.githubusercontent.com/themitchnz/sorcery_tracker/main/deathspeaker.png',
  'https://raw.githubusercontent.com/themitchnz/sorcery_tracker/main/dragonlord.png',
  'https://raw.githubusercontent.com/themitchnz/sorcery_tracker/main/druid.png',
  'https://raw.githubusercontent.com/themitchnz/sorcery_tracker/main/elementalist.png',
  'https://raw.githubusercontent.com/themitchnz/sorcery_tracker/main/enchantress.png',
  'https://raw.githubusercontent.com/themitchnz/sorcery_tracker/main/flamecaller.png',
  'https://raw.githubusercontent.com/themitchnz/sorcery_tracker/main/geomancer.png',
  'https://raw.githubusercontent.com/themitchnz/sorcery_tracker/main/pathfinder.png',
  'https://raw.githubusercontent.com/themitchnz/sorcery_tracker/main/seer.png',
  'https://raw.githubusercontent.com/themitchnz/sorcery_tracker/main/sorcerer.png',
  'https://raw.githubusercontent.com/themitchnz/sorcery_tracker/main/sparkmage.png',
  'https://raw.githubusercontent.com/themitchnz/sorcery_tracker/main/spellslinger.png',
  'https://raw.githubusercontent.com/themitchnz/sorcery_tracker/main/templar.png',
  'https://raw.githubusercontent.com/themitchnz/sorcery_tracker/main/waveshaper.png',
  'https://raw.githubusercontent.com/themitchnz/sorcery_tracker/main/witch.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response; // Cache hit
        }
        return fetch(event.request).then(
          (response) => {
            // Check if we received a valid response.
            // Opaque responses have status 0, but we want to cache them.
            if (!response || (response.status !== 200 && response.status !== 0)) {
              return response;
            }
            
            // Don't cache POST requests or chrome-extension URLs
            if (event.request.method === 'POST' || event.request.url.startsWith('chrome-extension://')) {
              return response;
            }

            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            return response;
          }
        );
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});