/**
 * GoatCounter - shared across all pages.
 * Cookieless and stores only aggregate data, so no consent banner is needed.
 *
 * GoatCounter records a same-domain <link rel="canonical"> over the real URL, so
 * every page's canonical must be its own path. Project pages each canonicalise
 * to /projects/<id>/, which is also the path the homepage overlay counts under.
 */
(function () {
    const script = document.createElement('script');
    script.src = 'https://gc.zgo.at/count.js';
    script.async = true;
    script.dataset.goatcounter = 'https://imranture.goatcounter.com/count';
    document.head.appendChild(script);
})();
