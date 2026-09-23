/**
 * Project Loader - Standalone script for project.html pages
 * Loads project details from URL parameters and renders content
 * Uses centralized PROJECTS_DATA from data/projects.js
 */

// Projects data loaded from centralized data file (data/projects.js)
const PROJECTS = typeof PROJECTS_DATA !== 'undefined' ? PROJECTS_DATA : {};

/**
 * Generates Schema.org structured data for a project
 * @param {string} projectId - Unique project identifier
 * @param {Object} projectData - Project data object
 * @returns {Object} Schema.org SoftwareApplication JSON-LD object
 */
function generateProjectSchema(projectId, projectData) {
    return {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": projectData.title,
        "description": projectData.description,
        "applicationCategory": "DeveloperApplication",
        "creator": {
            "@type": "Person",
            "name": "Imran Ture",
            "url": "https://www.imranture.com/"
        },
        "keywords": projectData.tags.join(", "),
        "image": `https://www.imranture.com${projectData.primary_image}`,
        "url": `https://www.imranture.com/project.html?id=${projectId}`
    };
}

/**
 * Injects project structured data into document head
 * @param {string} projectId - Unique project identifier
 * @param {Object} projectData - Project data object
 */
function injectProjectSchema(projectId, projectData) {
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.id = 'project-schema';
    schemaScript.textContent = JSON.stringify(generateProjectSchema(projectId, projectData));
    document.head.appendChild(schemaScript);
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

// IIFE (Immediately Invoked Function Expression)
// Runs as soon as script loads since DOM is ready (script at end of body)
(function loadProject() {
    // Extract project ID from URL query parameter (?id=project-name)
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');
    const container = document.getElementById('project-content');

    if (!container || !projectId) return;

    const project = PROJECTS[projectId];

    // Handle invalid project ID
    if (!project) {
        container.innerHTML = `
            <div style="text-align: center; padding: 100px 0;">
                <h2 style="color: var(--text-main);">Project not found</h2>
                <p style="color: var(--text-muted); margin-top: 10px;">
                    <a href="/index.html" style="color: var(--accent); text-decoration: none;">← Return to home</a>
                </p>
            </div>`;
        return;
    }

    // Update page title with project name
    document.title = project.title + ' - Imran Ture';

    const hasLinks = project.links && project.links.filter(l => l.url).length > 0;

    // Build and inject complete project detail HTML dynamically
    container.innerHTML = `
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
    
    injectProjectSchema(projectId, project);
    initImageZoom();
})();

// project.html sets no_onload so the generic title is never counted. count.js
// loads from another origin and may arrive before or after this script, so
// count now if it is ready, otherwise hand it the title and let it count itself.
if (window.goatcounter) {
    if (window.goatcounter.count) {
        window.goatcounter.count({ title: document.title });
    } else {
        window.goatcounter.title = document.title;
        window.goatcounter.no_onload = false;
    }
}

/**
 * Initialize image zoom functionality for project images
 * Adds click handlers to open images in a modal lightbox
 */
function initImageZoom() {
    const images = document.querySelectorAll('.project-detail-images img');
    
    images.forEach(img => {
        img.addEventListener('click', () => {
            openImageModal(img.src, img.alt);
        });
    });
}

/**
 * Opens an image in a modal lightbox overlay
 * @param {string} src - Image source URL
 * @param {string} alt - Image alt text
 */
function openImageModal(src, alt) {
    const modal = document.createElement('div');
    modal.className = 'image-modal active';
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'image-modal-close';
    closeBtn.innerHTML = '×';
    closeBtn.setAttribute('aria-label', 'Close image');
    closeBtn.setAttribute('type', 'button');
    
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.style.opacity = '0';
    
    img.onload = () => {
        img.style.transition = 'opacity 0.3s';
        img.style.opacity = '1';
    };
    
    modal.appendChild(closeBtn);
    modal.appendChild(img);
    document.body.appendChild(modal);
    
    document.body.style.overflow = 'hidden';
    
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => modal.remove(), 200);
    };
    
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeModal();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    img.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}
