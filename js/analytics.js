/**
 * Google Analytics 4 - shared across all pages.
 * Loads immediately so visitors who never scroll or click are still counted.
 */
(function () {
    const GA_ID = 'G-773DZQ4QLB';

    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID);
})();
