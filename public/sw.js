self.addEventListener(`install`, (evt) => {
  evt.waitUntil(
      caches.open(`cache_v1`)
      .then((cache) => {
        return cache.addAll([
          `./`,
          `./index.html`,
          `./bundle.js`,
          `./css/normalize.css`,
          `./css/style.css`,
          `./fonts/HelveticaNeueCyr-Bold.woff`,
          `./fonts/HelveticaNeueCyr-Bold.woff2`,
          `./fonts/HelveticaNeueCyr-Medium.woff`,
          `./fonts/HelveticaNeueCyr-Medium.woff2`,
          `./fonts/HelveticaNeueCyr-Roman.woff`,
          `./fonts/HelveticaNeueCyr-Roman.woff2`,
          `./img/add-photo.svg`,
          `./img/close.svg`,
          `./img/sample-img.jpg`,
          `./img/wave.svg`,
        ]);
      })
  );
});

self.addEventListener(`activate`, () => {
});

self.addEventListener(`fetch`, (evt) => {
  evt.respondWith(
      caches.match(evt.request)
      .then((response) => {
        return response ? response : fetch(evt.request);
      })
      .catch((err) => {
        throw err;
      })
  );
});
