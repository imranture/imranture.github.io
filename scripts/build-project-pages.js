/**
 * Builds one static page per project (projects/<id>/index.html) and sitemap.xml
 * from data/projects.js, so each project has its own crawlable, shareable URL
 * with its title, description and preview tags in the HTML.
 *
 * Run after editing data/projects.js:  node scripts/build-project-pages.js
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const SITE = 'https://www.imranture.com';

// Pages outside data/projects.js that belong in the sitemap
const STATIC_PAGES = ['/', '/labs/os/', '/labs/ml/', '/labs/py/'];

// data/projects.js is a browser script declaring a global, not a module
const PROJECTS = vm.runInNewContext(
    fs.readFileSync(path.join(ROOT, 'data/projects.js'), 'utf8') + ';PROJECTS_DATA'
);

const projectPath = id => `/projects/${id}/`;

function escapeAttr(text) {
    return text
        .replace(/&(?!(?:[a-z]+|#\d+);)/gi, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

/**
 * Plain-text meta description: the project description without markup,
 * cut at a word boundary to fit search result snippets
 */
function metaDescription(project) {
    const text = project.description.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (text.length <= 160) return text;
    return text.slice(0, text.lastIndexOf(' ', 157)).replace(/[\s,;:—-]+$/, '') + '…';
}

/**
 * Schema.org SoftwareApplication JSON-LD for a project
 */
function projectSchema(id, project) {
    return {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": project.title,
        "description": project.description,
        "applicationCategory": "DeveloperApplication",
        "creator": {
            "@type": "Person",
            "name": "Imran Ture",
            "url": "https://www.imranture.com/"
        },
        "keywords": project.tags.join(", "),
        "image": `${SITE}${project.primary_image}`,
        "url": `${SITE}${projectPath(id)}`
    };
}

/**
 * Renders the Type/Domain/Focus metadata line, using icons instead of text labels
 * @param {Object} meta - { type, domain, focus }
 * @returns {string} HTML, or empty string if meta is absent
 */
function renderProjectMeta(meta) {
    if (!meta) return '';
    const pairs = [
        ['🏷️', 'Type', meta.type],
        ['🏢', 'Domain', meta.domain],
        ['🎯', 'Focus', meta.focus]
    ];
    return `
        <p class="project-detail-meta">
            ${pairs.map(([icon, label, value]) => `<span class="project-detail-meta-pair" aria-label="${label}: ${value}"><span class="project-detail-meta-icon" aria-hidden="true">${icon}</span> ${value}</span>`).join('<span class="project-detail-meta-divider">/</span>')}
        </p>`;
}

/**
 * Renders the Problem/Approach/etc. section list
 * @param {Array} sections - [{ heading, body?, checklist?, image? }]
 * @returns {string} HTML, or empty string if sections are absent
 */
function renderProjectSections(sections) {
    if (!sections || sections.length === 0) return '';
    return sections.map(section => `
        <section class="project-detail-section">
            <h2 class="project-detail-section-heading">${section.heading}</h2>
            ${section.body ? `<p class="project-detail-description">${section.body}</p>` : ''}
            ${section.checklist ? `
            <ul class="project-detail-checklist">
                ${section.checklist.map(item => `
                <li class="project-detail-checklist-item">
                    <span class="project-detail-checklist-icon"></span>
                    <span><span class="project-detail-checklist-title">${item.title}:</span> <span class="project-detail-checklist-desc">${item.description}</span></span>
                </li>`).join('')}
            </ul>` : ''}
            ${section.image ? `
            <div class="project-detail-images">
                <img src="${section.image}" alt="${section.heading} diagram" loading="lazy">
            </div>` : ''}
        </section>`).join('');
}

function renderProjectContent(project) {
    const hasLinks = project.links && project.links.filter(l => l.url).length > 0;

    return `
        <div class="project-detail-content">
            <h1 class="project-detail-title">${project.title}</h1>
            ${project.subtitle ? `<p class="project-detail-subtitle">${project.subtitle}</p>` : ''}

            ${renderProjectMeta(project.meta)}

            ${hasLinks ? `
            <div class="project-detail-links">
                ${project.links.map(link => `
                    <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="project-detail-link">
                        <svg class="icon" viewBox="0 0 640 512" aria-hidden="true" focusable="false"><path fill="currentColor" d="M172.5 131.1C228.1 75.51 320.5 75.51 376.1 131.1C426.1 181.1 433.5 260.8 392.4 318.3L391.3 319.9C381 334.2 361 337.6 346.7 327.3C332.3 317 328.9 297 339.2 282.7L340.3 281.1C363.2 249 359.6 205.1 331.7 177.2C300.3 145.8 249.2 145.8 217.7 177.2L105.5 289.5C73.99 320.1 73.99 372 105.5 403.5C133.3 431.4 177.3 435 209.3 412.1L210.9 410.1C225.3 400.7 245.3 404 255.5 418.4C265.8 432.8 262.5 452.8 248.1 463.1L246.5 464.2C188.1 505.3 110.2 498.7 60.21 448.8C3.741 392.3 3.741 300.7 60.21 244.3L172.5 131.1zM467.5 380C411 436.5 319.5 436.5 263 380C213 330 206.5 251.2 247.6 193.7L248.7 192.1C258.1 177.8 278.1 174.4 293.3 184.7C307.7 194.1 311.1 214.1 300.8 229.3L299.7 230.9C276.8 262.1 280.4 306.9 308.3 334.8C339.7 366.2 390.8 366.2 422.3 334.8L534.5 222.5C566 191 566 139.1 534.5 108.5C506.7 80.63 462.7 76.99 430.7 99.9L429.1 101C414.7 111.3 394.7 107.1 384.5 93.58C374.2 79.2 377.5 59.21 391.9 48.94L393.5 47.82C451 6.731 529.8 13.25 579.8 63.24C636.3 119.7 636.3 211.3 579.8 267.7L467.5 380z"/></svg> ${link.text}
                    </a>
                `).join('')}
            </div>` : ''}

            <p class="project-detail-description">${project.description}</p>

            <div class="project-detail-images">
                <img src="${project.primary_image}"
                     alt="${project.title} - Project screenshot"
                     loading="lazy"
                     width="800"
                     height="600">
                ${project.secondary_image ? `<img src="${project.secondary_image}"
                                                 alt="${project.title} - Additional screenshot"
                                                 loading="lazy"
                                                 width="800"
                                                 height="600">` : ''}
            </div>

            ${renderProjectSections(project.sections)}

            <div class="project-detail-tags">
                ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
            </div>
        </div>`;
}

function renderPage(id, project) {
    const url = SITE + projectPath(id);
    const title = escapeAttr(`${project.title} - Imran Ture`);
    const description = escapeAttr(metaDescription(project));
    const image = SITE + project.primary_image;
    // "</" inside JSON-LD would end the script element early
    const schema = JSON.stringify(projectSchema(id, project), null, 4).replace(/</g, '\\u003c');

    return `<!DOCTYPE html>
<!-- Generated by scripts/build-project-pages.js from data/projects.js. Edit those, not this file. -->
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <meta name="description" content="${description}">
    <link rel="canonical" href="${url}">

    <!-- GoatCounter -->
    <script src="/js/analytics.js" async></script>

    <!-- Open Graph -->
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="Imran Ture">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:url" content="${url}">
    <meta property="og:image" content="${image}">
    <meta property="og:image:alt" content="${escapeAttr(project.title)} - Project screenshot">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@imranture">
    <meta name="twitter:creator" content="@imranture">

    <!-- Schema.org SoftwareApplication Structured Data -->
    <script type="application/ld+json">
${schema}
    </script>

    <!-- Favicon -->
    <link rel="icon" type="image/png" sizes="32x32" href="/image/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/image/favicon-16x16.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/image/apple-touch-icon.png">

    <!-- Stylesheets -->
    <link rel="stylesheet" href="/css/styles.min.css">
    <!-- Icons: Font Awesome Free 6.0.0 by @fontawesome - https://fontawesome.com/license/free (CC BY 4.0), inlined as SVG -->

    <!-- Preconnects -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
        rel="stylesheet">
</head>

<body class="project-page">
    <script>
        // Apply theme immediately to prevent flashing
        if (localStorage.getItem('theme') === 'light') {
            document.body.classList.add('theme-light');
        }

        // Theme Toggle Logic (the sun/moon icon follows body.theme-light in CSS)
        function toggleTheme() {
            const isLight = document.body.classList.toggle('theme-light');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        }
    </script>

    <!-- Subtle Grid Background -->
    <div class="bg-grid"></div>

    <div class="layout-container">

        <!-- HEADER -->
        <header class="site-header">
            <a href="/" class="site-name" aria-label="Back to Home">
                <img src="/image/imranture-256.webp" alt="Imran Ture" class="profile-pic">
            </a>
            <nav class="site-nav">
                <!-- Theme Toggle -->
                <button onclick="toggleTheme()" id="btn-theme" class="theme-toggle" aria-label="Toggle Theme">
                    <span id="theme-icon" class="theme-icon" aria-hidden="true"><svg class="icon icon-sun" viewBox="0 0 512 512" aria-hidden="true" focusable="false"><path fill="currentColor" d="M256 159.1c-53.02 0-95.1 42.98-95.1 95.1S202.1 351.1 256 351.1s95.1-42.98 95.1-95.1S309 159.1 256 159.1zM509.3 347L446.1 255.1l63.15-91.01c6.332-9.125 1.104-21.74-9.826-23.72l-109-19.7l-19.7-109c-1.975-10.93-14.59-16.16-23.72-9.824L256 65.89L164.1 2.736c-9.125-6.332-21.74-1.107-23.72 9.824L121.6 121.6L12.56 141.3C1.633 143.2-3.596 155.9 2.736 164.1L65.89 256l-63.15 91.01c-6.332 9.125-1.105 21.74 9.824 23.72l109 19.7l19.7 109c1.975 10.93 14.59 16.16 23.72 9.824L256 446.1l91.01 63.15c9.127 6.334 21.75 1.107 23.72-9.822l19.7-109l109-19.7C510.4 368.8 515.6 356.1 509.3 347zM256 383.1c-70.69 0-127.1-57.31-127.1-127.1c0-70.69 57.31-127.1 127.1-127.1s127.1 57.3 127.1 127.1C383.1 326.7 326.7 383.1 256 383.1z"/></svg><svg class="icon icon-moon" viewBox="0 0 512 512" aria-hidden="true" focusable="false"><path fill="currentColor" d="M32 256c0-123.8 100.3-224 223.8-224c11.36 0 29.7 1.668 40.9 3.746c9.616 1.777 11.75 14.63 3.279 19.44C245 86.5 211.2 144.6 211.2 207.8c0 109.7 99.71 193 208.3 172.3c9.561-1.805 16.28 9.324 10.11 16.95C387.9 448.6 324.8 480 255.8 480C132.1 480 32 379.6 32 256z"/></svg></span>
                </button>
            </nav>
        </header>

        <!-- MAIN CONTENT -->
        <main id="main-content" class="project-main-content">
            <div id="project-content">${renderProjectContent(project)}
            </div>
        </main>
    </div>

    <script src="/js/project-loader.js"></script>
</body>

</html>
`;
}

function renderSitemap(urls) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated by scripts/build-project-pages.js. Edit STATIC_PAGES there or data/projects.js, not this file. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>\n    <loc>${SITE}${url}</loc>\n  </url>`).join('\n')}
</urlset>
`;
}

const projectsDir = path.join(ROOT, 'projects');
fs.mkdirSync(projectsDir, { recursive: true });

// Remove pages of projects that are no longer in the data file
for (const dir of fs.readdirSync(projectsDir)) {
    if (!PROJECTS[dir]) fs.rmSync(path.join(projectsDir, dir), { recursive: true });
}

for (const [id, project] of Object.entries(PROJECTS)) {
    fs.mkdirSync(path.join(projectsDir, id), { recursive: true });
    fs.writeFileSync(path.join(projectsDir, id, 'index.html'), renderPage(id, project));
}

fs.writeFileSync(
    path.join(ROOT, 'sitemap.xml'),
    renderSitemap([...STATIC_PAGES, ...Object.keys(PROJECTS).map(projectPath)])
);

console.log(`Built ${Object.keys(PROJECTS).length} project pages and sitemap.xml`);
