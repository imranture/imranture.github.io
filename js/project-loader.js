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
                        <i class="fas fa-link"></i> ${link.text}
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
