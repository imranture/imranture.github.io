/**
 * GoatCounter - shared across all pages.
 * Cookieless and stores only aggregate data, so no consent banner is needed.
 *
 * The recorded path is location.pathname + location.search, which is what makes
 * project pages report per project (/project.html?id=pdf4u). Do not add a
 * <link rel="canonical"> to project.html: GoatCounter prefers a same-domain
 * canonical over the real URL, and every project would collapse into one row.
 */
(function () {
    const script = document.createElement('script');
    script.src = 'https://gc.zgo.at/count.js';
    script.async = true;
    script.dataset.goatcounter = 'https://imranture.goatcounter.com/count';
    document.head.appendChild(script);
})();
