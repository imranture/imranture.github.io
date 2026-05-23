  /**
 * Minimal Portfolio - Main JavaScript
 * Single-page interactions and state management
 */

// ========================================
// DATA STRUCTURES
// ========================================

const INTRO = {
    name: "İMRAN TÜRE",
    role: "Senior Analyst & Developer",
    tagline: ["RESEARCH", "PLANNING", "DEVELOPMENT", "TESTING", "OPTIMIZATION"],
    mainMessage: "I design and build systems<br>people rely on.",
    subtitle: "Prototypes, models, software, and AI applications<br>for everyday challenges and decisions",
    location: "Somewhere on the globe",
    socialLinks: [
        { icon: "fas fa-envelope", url: "mailto:&#105;&#109;&#114;&#097;&#110;@&#097;&#108;&#117;&#109;&#110;&#105;.&#114;&#117;&#116;&#103;&#101;&#114;&#115;.&#101;&#100;&#117;", label: "Email", isEmail: true },
        { icon: "fab fa-linkedin-in", url: "https://www.linkedin.com/in/imranture/", label: "LinkedIn" },
        { icon: "fab fa-github", url: "https://github.com/imranture", label: "GitHub" },
        { icon: "fab fa-kaggle", url: "https://www.kaggle.com/imranture", label: "Kaggle" },
    ]
};

// Projects data loaded from centralized data file (data/projects.js)
const PROJECTS = typeof PROJECTS_DATA !== 'undefined' ? PROJECTS_DATA : {};

const SKILLS_CARDS = [
    {
        id: "research",
        title: "Understand",
        icon: "fa-solid fa-magnifying-glass",
        description: "I start by figuring out what the problem actually is — talking to the people doing the work and digging through data to see where the real gaps are.",
        approach: "Data mining, exploratory data analysis, stakeholder interviews, pattern discovery studies",
        tools: ["BigQuery (Ad-hoc SQL)", "Python (NumPy, Pandas, SciPy, Jupyter)", "Whiteboarding & process sketching (Miro)"],
        color: "#8B5CF6",
        pattern: "pattern-research"
    },
    {
        id: "planning",
        title: "Design",
        icon: "fa-solid fa-chess-knight",
        description: "I turn ambiguous ideas into specs, prototypes, and plans with clear priorities and trade-offs — so stakeholders can react to something concrete before development starts.",
        approach: "Data architecture design, AI-assisted specs, process design, working prototypes, feasibility analysis",
        tools: ["Cursor & Claude Code", "Data Modeling (BigQuery)", "Prototyping (Firebase Studio)", "Wireframing (Balsamiq)", "Process diagrams (Mermaid)"],
        color: "#0EA5E9",
        pattern: "pattern-planning"
    },
    {
        id: "development",
        title: "Build",
        icon: "fa-solid fa-code",
        description: "I build the working thing — from rapid prototypes to production pipelines and AI agents. Comfortable across the stack: data, backend services, and LLM integration.",
        approach: "Building ETL pipelines, LLM integration, structured prompt design, text-to-SQL assistants, AI agents, API design, and production backend services",
        tools: ["Python (FastAPI, Django, Streamlit)", "SQL & BigQuery", "Google Cloud", "Cursor & Claude Code"],
        color: "#F43F5E",
        pattern: "pattern-development"
    },
    {
        id: "testing",
        title: "Validate",
        icon: "fa-solid fa-flask",
        description: "I check whether the thing actually holds up — under real conditions, with real users. Pilots, statistical validation, edge-case probing, and honest feedback loops.",
        approach: "Running pilots with real users, comparing model outputs to ground truth, probing edge cases, gathering and acting on feedback",
        tools: ["Python (SciPy, statsmodels)", "SQL output verification (BigQuery)", "Cross-validation (scikit-learn)"],
        color: "#10B981",
        pattern: "pattern-testing"
    },
    {
        id: "optimization",
        title: "Improve",
        icon: "fa-solid fa-gauge-high",
        description: "Once something is running, I look for bottlenecks, repetitive manual work, and places where smarter automation replaces brute effort.",
        approach: "Mathematical optimization, ETL automation, scheduling and allocation modeling, workflow automation, bottleneck analysis",
        tools: ["Automation scripting (Python + scheduled jobs)", "Process simulation (Python)", "PuLP & OR-Tools (MILP solvers)"],
        color: "#ffb762",
        pattern: "pattern-optimization"
    }
];

// ========================================
// STATE MANAGEMENT
// ========================================

const state = {
    currentView: 'intro',
    currentProjectId: null,
    expandedCardId: null,
    isDropdownOpen: false,
    isOverlayOpen: false,
    // Mobile stack state (single focused card + top peeks)
    activeCardIndex: 0,
    isSwiping: false,
    hasDragged: false,
    swipeStartX: 0,
    swipeStartY: 0
};

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Copies email address to clipboard with visual feedback
 * @param {Event} evt - Click event from email link
 */
function copyEmail(evt) {
    evt.preventDefault();
    const emailLink = evt.target.closest('.email-link');
    if (!emailLink) return;
    
    // Decode HTML entities in obfuscated email address
    const textArea = document.createElement('textarea');
    textArea.innerHTML = emailLink.getAttribute('data-email').replace('mailto:', '');
    const decodedEmail = textArea.value;
    
    // Copy to clipboard
    navigator.clipboard.writeText(decodedEmail).then(() => {
        // Visual feedback with "Copied!" text next to icon
        const feedback = document.createElement('span');
        feedback.className = 'copied-feedback';
        feedback.textContent = 'Copied!';
        emailLink.appendChild(feedback);
        emailLink.style.color = 'var(--accent)';
        emailLink.classList.add('copying');
        
        setTimeout(() => {
            feedback.remove();
            emailLink.style.color = '';
            emailLink.classList.remove('copying');
        }, 1200);
    }).catch(() => {
        console.error('Failed to copy email');
    });
}

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
    const existingSchema = document.getElementById('project-schema');
    if (existingSchema) {
        existingSchema.remove();
    }
    
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.id = 'project-schema';
    schemaScript.textContent = JSON.stringify(generateProjectSchema(projectId, projectData));
    document.head.appendChild(schemaScript);
}

/**
 * Removes project structured data from document head
 */
function removeProjectSchema() {
    const existingSchema = document.getElementById('project-schema');
    if (existingSchema) {
        existingSchema.remove();
    }
}

// ========================================
// RENDER FUNCTIONS
// ========================================

/**
 * Renders social media links in the fixed sidebar
 */
function renderSocialLinks() {
    const socialLinksContainer = document.getElementById('social-links');
    if (!socialLinksContainer) return;
    
    const socialsHTML = INTRO.socialLinks.map(link => {
        if (link.isEmail) {
            return `<a href="${link.url}" class="email-link" data-email="${link.url}" aria-label="${link.label}">
                <i class="${link.icon}"></i>
            </a>`;
        } else {
            return `<a href="${link.url}" target="_blank" rel="noopener noreferrer" aria-label="${link.label}">
                <i class="${link.icon}"></i>
            </a>`;
        }
    }).join('');
    
    socialLinksContainer.innerHTML = socialsHTML;
    
    // Add email copy functionality
    const emailLink = socialLinksContainer.querySelector('.email-link');
    if (emailLink) {
        emailLink.addEventListener('click', copyEmail);
    }
}

/**
 * Adjusts visibility of tagline dots to prevent them appearing at line ends
 * Hides dots when the next word wraps to a new line
 */
function adjustTaglineDots() {
    const words = document.querySelectorAll('.tagline-word');
    const dots = document.querySelectorAll('.tagline-dot');
    
    if (words.length === 0 || dots.length === 0) return;
    
    // Reset all dots to visible first
    dots.forEach(dot => dot.style.visibility = 'visible');
    
    // Check each word-dot pair
    words.forEach((word, index) => {
        if (index >= dots.length) return;
        
        const dot = dots[index];
        const nextWord = words[index + 1];
        
        if (!nextWord) return;
        
        // Get vertical positions
        const wordRect = word.getBoundingClientRect();
        const nextWordRect = nextWord.getBoundingClientRect();
        
        // If next word is on a different line (lower vertical position),
        // hide the dot to prevent it appearing at end of line
        if (Math.abs(nextWordRect.top - wordRect.top) > 5) {
            dot.style.visibility = 'hidden';
        }
    });
}

/**
 * Renders the intro/home page with name, role, tagline, and message
 */
function renderIntro() {
    const centerPanel = document.getElementById('center-panel');
    const cardDeck = document.getElementById('card-deck');
    
    // Show card deck on intro page (works on all screen sizes)
    if (cardDeck) {
        cardDeck.classList.remove('hidden');
    }

    // Format tagline: each word in its own span, dots in separate spans
    // Add line break after 3rd word (DEVELOPMENT) for preferred layout on smaller screens
    const shouldAddBreak = window.innerWidth < 1200; // Only add break on narrower screens
    const taglineHTML = INTRO.tagline.map((word, index) => {
        const wordSpan = `<span class="tagline-word" data-index="${index}">${word}</span>`;
        if (index < INTRO.tagline.length - 1) {
            const dot = `<span class="tagline-dot" data-index="${index}"> ·</span> `;
            // Add line break after DEVELOPMENT (index 2) on narrower screens
            if (index === 2 && shouldAddBreak) {
                return wordSpan + dot + '<br>';
            }
            return wordSpan + dot;
        }
        return wordSpan;
    }).join('');
    
    centerPanel.innerHTML = `
        <article class="intro-content" itemscope itemtype="https://schema.org/Person">
            <h1 class="intro-name" itemprop="name">${INTRO.name}</h1>
            <p class="intro-role" itemprop="jobTitle">${INTRO.role}</p>
            <p class="intro-tagline" aria-label="Skills: ${INTRO.tagline.join(', ')}">${taglineHTML}</p>
            <h2 class="intro-message">${INTRO.mainMessage}</h2>
            <p class="intro-subtitle">${INTRO.subtitle}</p>
        </article>
    `;
    
    // After rendering, check line positions and hide dots at line ends
    setTimeout(() => adjustTaglineDots(), 0);

    state.currentView = 'intro';
    state.currentProjectId = null;
}

/**
 * Renders project details in the modal overlay
 * @param {string} projectId - Unique project identifier
 */
function renderProjectDetail(projectId) {
    const project = PROJECTS[projectId];
    if (!project) return;

    const contentDiv = document.getElementById('project-detail-content');
    
    const tagsHTML = project.tags.map(tag => 
        `<span class="project-tag">${tag}</span>`
    ).join('');

    const linksHTML = project.links && project.links.length > 0 
        ? `<div class="project-detail-links">
            ${project.links.map(link => 
                `<a href="${link.url}" target="_blank" rel="noopener noreferrer" class="project-detail-link">
                    <i class="fas fa-link"></i> ${link.text}
                </a>`
            ).join('')}
           </div>`
        : '';

    const imagesHTML = `
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
    `;

    contentDiv.innerHTML = `
        <h1 class="project-detail-title" id="project-detail-title">${project.title}</h1>
        ${linksHTML}
        <p class="project-detail-description">${project.description}</p>
        ${imagesHTML}
        <div class="project-detail-tags" role="list" aria-label="Project tags">${tagsHTML}</div>
    `;
    
    injectProjectSchema(projectId, project);
    
    document.title = `${project.title} | Imran Ture`;
}

/**
 * Renders the thumbnail strip at the bottom of the project modal (mobile)
 * and the floating sidebar (desktop)
 * @param {string} activeProjectId - The currently open project
 */
function renderThumbnailStrip(activeProjectId) {
    // 1. Render Mobile Horizontal Strip
    const stripContainer = document.getElementById('project-thumbnail-strip');
    if (stripContainer) {
        const thumbnailsHTML = Object.keys(PROJECTS).map(projectId => {
            const project = PROJECTS[projectId];
            const isActive = projectId === activeProjectId ? 'active' : '';
            
            return `
                <div class="thumbnail-item ${isActive}" 
                     title="${project.title}" 
                     onclick="switchProjectFromThumbnail('${projectId}')"
                     role="button" 
                     aria-label="View ${project.title}">
                    <img src="${project.primary_image}" alt="${project.title} thumbnail" loading="lazy">
                </div>
            `;
        }).join('');

        stripContainer.innerHTML = thumbnailsHTML;

        // Auto-scroll the strip so the active thumbnail is visible
        setTimeout(() => {
            const activeThumb = stripContainer.querySelector('.active');
            if (activeThumb) {
                const scrollLeft = activeThumb.offsetLeft - (stripContainer.clientWidth / 2) + (activeThumb.clientWidth / 2);
                stripContainer.scrollTo({ left: scrollLeft, behavior: 'smooth' });
            }
        }, 50);
    }

    // 2. Render Desktop Floating Sidebar
    const sidebarContainer = document.getElementById('desktop-floating-sidebar');
    if (sidebarContainer) {
        const sidebarHTML = Object.keys(PROJECTS).map(projectId => {
            const project = PROJECTS[projectId];
            const isActive = projectId === activeProjectId ? 'active' : '';
            
            return `
                <div class="sidebar-thumbnail-item ${isActive}" 
                     title="${project.title}" 
                     onclick="switchProjectFromThumbnail('${projectId}')"
                     role="button" 
                     aria-label="View ${project.title}">
                    <img src="${project.primary_image}" alt="${project.title} thumbnail" loading="lazy">
                </div>
            `;
        }).join('');

        sidebarContainer.innerHTML = sidebarHTML;

        // Auto-scroll the sidebar so the active thumbnail is visible
        setTimeout(() => {
            const activeThumb = sidebarContainer.querySelector('.active');
            if (activeThumb) {
                const scrollTop = activeThumb.offsetTop - (sidebarContainer.clientHeight / 2) + (activeThumb.clientHeight / 2);
                sidebarContainer.scrollTo({ top: scrollTop, behavior: 'smooth' });
            }
        }, 50);
    }
}

/**
 * Handles clicking a thumbnail
 * @param {string} projectId - Unique project identifier
 */
function switchProjectFromThumbnail(projectId) {
    if (state.currentProjectId === projectId) return;
    
    state.currentProjectId = projectId;
    renderProjectDetail(projectId);
    renderThumbnailStrip(projectId);
    
    const overlayContent = document.querySelector('.overlay-content');
    if (overlayContent) {
        overlayContent.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

/**
 * Navigates to the next or previous project
 * @param {string} direction - 'next' or 'prev'
 */
function navigateProject(direction) {
    if (!state.isOverlayOpen || !state.currentProjectId) return;
    
    const projectIds = Object.keys(PROJECTS);
    const currentIndex = projectIds.indexOf(state.currentProjectId);
    if (currentIndex === -1) return;

    let newIndex;
    if (direction === 'next') {
        newIndex = (currentIndex + 1) % projectIds.length;
    } else {
        newIndex = (currentIndex - 1 + projectIds.length) % projectIds.length;
    }

    const nextProjectId = projectIds[newIndex];
    
    state.currentProjectId = nextProjectId;
    renderProjectDetail(nextProjectId);
    renderThumbnailStrip(nextProjectId);
    
    const overlayContent = document.querySelector('.overlay-content');
    if (overlayContent) overlayContent.scrollTop = 0;
}

/**
 * Renders the list of projects in the dropdown menu
 */
function renderProjectsList() {
    const dropdown = document.getElementById('projects-dropdown');
    if (!dropdown) return;
    
    const dropdownContent = dropdown.querySelector('.dropdown-content');
    if (!dropdownContent) return;
    
    const projectsHTML = Object.keys(PROJECTS).map((projectId, index) => {
        const project = PROJECTS[projectId];
        return `<button class="dropdown-item" 
                        style="animation-delay: ${(index + 1) * 0.05}s"
                        onclick="selectProject('${projectId}')" 
                        role="menuitem"
                        aria-label="View ${project.title} project">${project.title}</button>`;
    }).join('');

    dropdownContent.innerHTML = projectsHTML;
}

/**
 * Formats skill card titles with responsive line breaks
 * @param {string} title - Card title to format
 * @returns {string} Formatted title with optional <br> tags
 */
function formatCardTitle(title) {
    // Always split words for the front face to create a stacked look
    return title.split(' ').map(word => `<span style="display: block;">${word}</span>`).join('');
}

/**
 * Renders skill cards with patterns and animations
 */
function renderSkillCards() {
    const cardDeck = document.getElementById('card-deck');
    
    const cardsHTML = SKILLS_CARDS.map((card, index) => `
        <article class="skill-card" 
                 data-card-id="${card.id}" 
                 data-pattern="${card.pattern}" 
                 style="--card-color: ${card.color}"
                 role="article"
                 tabindex="0"
                 aria-label="${card.title}">
            <div class="skill-card-inner">
                <div class="skill-card-front">
                    <div class="skill-card-number">${index + 1}</div>
                    <div class="skill-card-front-content">
                        <div class="skill-card-icon-wrapper">
                            <i class="${card.icon} skill-card-icon"></i>
                        </div>
                        <h3 class="skill-card-title">${formatCardTitle(card.title)}</h3>
                    </div>
                </div>
                <div class="skill-card-back">
                    <div class="skill-card-back-scroll">
                        <h3 class="skill-card-title">${card.title}</h3>
                        <div class="skill-card-back-content">
                            <p class="skill-card-description">${card.description}</p>
                            <div class="skill-card-approach">
                                <div class="section-label">Approach</div>
                                <p>${card.approach}</p>
                            </div>
                            <div class="skill-card-tools">
                                <div class="section-label">Tools</div>
                                <div class="tools-badges">
                                    ${card.tools.map(tool => `<span class="tool-badge">${tool}</span>`).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    `).join('');

    cardDeck.innerHTML = cardsHTML;

    // Disable image dragging
    document.querySelectorAll('.skill-card img').forEach(img => {
        img.ondragstart = function() { return false; };
        img.draggable = false;
    });

    // Add click event listeners (for both desktop and mobile)
    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (state.hasDragged) {
                e.preventDefault();
                return;
            }
            toggleCard(card.dataset.cardId);
        });
    });

    // Initialize mobile stack classes after injection
    if (window.innerWidth <= 980) {
        // Clamp active index if card count changes
        state.activeCardIndex = Math.min(state.activeCardIndex, SKILLS_CARDS.length - 1);
        updateCardPositions();
    }
}

// ========================================
// EVENT HANDLERS
// ========================================

/**
 * Handles project selection from dropdown menu
 * @param {string} projectId - Unique project identifier
 */
function selectProject(projectId) {
    closeDropdown();
    openProjectDetail(projectId);
}

/**
 * Opens project detail modal overlay
 * @param {string} projectId - Unique project identifier
 */
function openProjectDetail(projectId) {
    state.currentProjectId = projectId;
    renderProjectDetail(projectId);
    renderThumbnailStrip(projectId);
    
    const overlay = document.getElementById('project-detail-overlay');
    const overlayContent = overlay.querySelector('.overlay-content');
    
    // Reset scroll position to top
    if (overlayContent) {
        overlayContent.scrollTop = 0;
    }
    
    overlay.classList.add('active');
    state.isOverlayOpen = true;
}

/**
 * Closes project detail modal overlay and cleans up schema
 */
function closeProjectDetail() {
    const overlay = document.getElementById('project-detail-overlay');
    overlay.classList.remove('active');
    state.isOverlayOpen = false;
    
    removeProjectSchema();
    document.title = 'Imran Ture';
}

/**
 * Toggles the projects dropdown menu visibility
 */
function toggleDropdown() {
    const dropdown = document.getElementById('projects-dropdown');
    const backdrop = document.getElementById('projects-dropdown-backdrop');
    const isHidden = dropdown.classList.contains('hidden');
    
    // If overlay is open, close it first and go back to intro
    if (state.isOverlayOpen) {
        closeProjectDetail();
        renderIntro();
    }
    
    if (isHidden) {
        dropdown.classList.remove('hidden');
        backdrop.classList.remove('hidden');
        state.isDropdownOpen = true;
        document.body.classList.add('dropdown-open');
    } else {
        closeDropdown();
    }
}

/**
 * Closes the projects dropdown menu
 */
function closeDropdown() {
    const dropdown = document.getElementById('projects-dropdown');
    const backdrop = document.getElementById('projects-dropdown-backdrop');
    dropdown.classList.add('hidden');
    backdrop.classList.add('hidden');
    state.isDropdownOpen = false;
    document.body.classList.remove('dropdown-open');
}

/**
 * Toggles card expansion state on desktop or brings card to focus on mobile
 * @param {string} cardId - Unique card identifier
 * @param {boolean} forceCollapse - If true, forces collapse even if clicking the card itself
 */
function toggleCard(cardId, forceCollapse = false) {
    const cards = document.querySelectorAll('.skill-card');
    const clickedCard = document.querySelector(`[data-card-id="${cardId}"]`);
    const cardDeck = document.getElementById('card-deck');
    
    // If clicking an already expanded card, don't collapse unless forced (e.g. via close button)
    if (state.expandedCardId === cardId && !forceCollapse) {
        return;
    }
    
    // On mobile/tablet: clicking a stacked card brings it to focus
    if (window.innerWidth <= 980) {
        // If card is in the deck, check if it's the active one
        if (cardDeck && cardDeck.contains(clickedCard)) {
            const deckCards = Array.from(cardDeck.querySelectorAll('.skill-card'));
            const clickedIndex = deckCards.indexOf(clickedCard);
            if (clickedIndex !== -1 && clickedIndex !== state.activeCardIndex) {
                state.activeCardIndex = clickedIndex;
                updateCardPositions();
                return; // Don't expand, just bring to front
            }
        }
        // If it's the active card (or already expanded), proceed with expand/collapse logic
    }
    
    // Get or create backdrop
    let backdrop = document.getElementById('card-backdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.id = 'card-backdrop';
        backdrop.className = 'card-backdrop';
        document.body.appendChild(backdrop);
        
        // Close card when clicking backdrop
        backdrop.addEventListener('click', () => {
            if (state.expandedCardId) {
                toggleCard(state.expandedCardId, true);
            }
        });
    }
    
    if (state.expandedCardId === cardId) {
        // Collapse: animate back to original position in deck
        // Clone technique: creates invisible copy to measure original position
        // without affecting visual state during calculation
        const clone = clickedCard.cloneNode(true);
        clone.style.visibility = 'hidden';
        clone.style.position = 'absolute';
        clone.style.pointerEvents = 'none';
        clone.classList.remove('expanded');
        clone.classList.remove('expanding');
        
        // Insert clone at original position to measure
        const originalIndex = parseInt(clickedCard.dataset.originalIndex || 0);
        if (cardDeck.children[originalIndex]) {
            cardDeck.insertBefore(clone, cardDeck.children[originalIndex]);
        } else {
            cardDeck.appendChild(clone);
        }
        
        // Get target position from clone
        const targetRect = clone.getBoundingClientRect();
        const targetTransform = window.getComputedStyle(clone).transform;
        
        // Remove clone
        clone.remove();
        
        // Remove expanded, add collapsing
        clickedCard.classList.remove('expanded');
        clickedCard.classList.remove('expanding');
        clickedCard.classList.add('collapsing');
        
        // Force reflow to ensure transition works
        clickedCard.offsetHeight;
        
        // Set target position for animation
        clickedCard.style.left = targetRect.left + 'px';
        clickedCard.style.top = targetRect.top + 'px';
        clickedCard.style.width = targetRect.width + 'px';
        clickedCard.style.height = targetRect.height + 'px';
        clickedCard.style.transform = targetTransform;
        
        backdrop.classList.remove('active');
        document.body.style.overflow = '';
        
        // Wait for animation, then move back to deck and cleanup
        setTimeout(() => {
            if (clickedCard.parentElement === document.body) {
                if (cardDeck.children[originalIndex]) {
                    cardDeck.insertBefore(clickedCard, cardDeck.children[originalIndex]);
                } else {
                    cardDeck.appendChild(clickedCard);
                }
            }
            clickedCard.classList.remove('collapsing');
            clickedCard.style.position = '';
            clickedCard.style.left = '';
            clickedCard.style.top = '';
            clickedCard.style.width = '';
            clickedCard.style.height = '';
            clickedCard.style.transform = '';
            clickedCard.style.margin = '';
            clickedCard.style.padding = '';
            
            // Force reflow to ensure it settles correctly
            clickedCard.offsetHeight;
            
            state.expandedCardId = null;
        }, 500);
    } else {
        // Collapse others first
        cards.forEach(card => {
            if (card.classList.contains('expanded')) {
                // Create a hidden clone to calculate target position
                const clone = card.cloneNode(true);
                clone.style.visibility = 'hidden';
                clone.style.position = 'absolute';
                clone.style.pointerEvents = 'none';
                clone.classList.remove('expanded');
                clone.classList.remove('expanding');
                
                const originalIndex = parseInt(card.dataset.originalIndex || 0);
                if (cardDeck.children[originalIndex]) {
                    cardDeck.insertBefore(clone, cardDeck.children[originalIndex]);
                } else {
                    cardDeck.appendChild(clone);
                }
                
                // Get target position from clone
                const targetRect = clone.getBoundingClientRect();
                const targetTransform = window.getComputedStyle(clone).transform;
                
                // Remove clone
                clone.remove();
                
                card.classList.remove('expanded');
                card.classList.remove('expanding');
                card.classList.add('collapsing');
                
                // Force reflow
                card.offsetHeight;
                
                card.style.left = targetRect.left + 'px';
                card.style.top = targetRect.top + 'px';
                card.style.width = targetRect.width + 'px';
                card.style.height = targetRect.height + 'px';
                card.style.transform = targetTransform;
                
                setTimeout(() => {
                    if (card.parentElement === document.body) {
                        if (cardDeck.children[originalIndex]) {
                            cardDeck.insertBefore(card, cardDeck.children[originalIndex]);
                        } else {
                            cardDeck.appendChild(card);
                        }
                    }
                    card.classList.remove('collapsing');
                    card.style.position = '';
                    card.style.left = '';
                    card.style.top = '';
                    card.style.width = '';
                    card.style.height = '';
                    card.style.transform = '';
                    card.style.margin = '';
                    card.style.padding = '';
                    
                    // Force reflow
                    card.offsetHeight;
                }, 500);
            }
        });
        
        // Store the card's original index in the deck
        const cardIndex = Array.from(cardDeck.children).indexOf(clickedCard);
        clickedCard.dataset.originalIndex = cardIndex;
        
        // Get the card's current position before moving
        const rect = clickedCard.getBoundingClientRect();
        const currentTransform = window.getComputedStyle(clickedCard).transform;
        
        // Move to body and position at same visual location
        document.body.appendChild(clickedCard);
        clickedCard.style.position = 'fixed';
        clickedCard.style.left = rect.left + 'px';
        clickedCard.style.top = rect.top + 'px';
        clickedCard.style.width = rect.width + 'px';
        clickedCard.style.height = rect.height + 'px';
        clickedCard.style.transform = currentTransform;
        clickedCard.style.margin = '0';
        
        // Force reflow
        clickedCard.offsetHeight;
        
        // Add close button if it doesn't exist
        let closeBtn = clickedCard.querySelector('.card-close-btn');
        if (!closeBtn) {
            closeBtn = document.createElement('button');
            closeBtn.className = 'card-close-btn';
            closeBtn.innerHTML = '<i class="fa-solid fa-times"></i>';
            closeBtn.setAttribute('aria-label', 'Close card');
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleCard(cardId, true);
            });
            clickedCard.appendChild(closeBtn);
        }
        
        // Add expanding class and show backdrop
        clickedCard.classList.add('expanding');
        backdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // After a brief moment, add expanded class for animation
        requestAnimationFrame(() => {
            clickedCard.classList.add('expanded');
            state.expandedCardId = cardId;
        });
    }
}

/**
 * Smoothly transitions content in the center panel
 * @param {Function} callback - Function to execute during transition
 */
function transitionContent(callback) {
    const centerPanel = document.getElementById('center-panel');
    centerPanel.classList.add('fade-out');
    
    setTimeout(() => {
        callback();
        centerPanel.classList.remove('fade-out');
        centerPanel.classList.add('fade-in');
        
        setTimeout(() => {
            centerPanel.classList.remove('fade-in');
        }, 300);
    }, 300);
}

/**
 * Resets view to intro page, closing any open modals
 */
function resetToIntro() {
    closeDropdown();
    if (state.isOverlayOpen) {
        closeProjectDetail();
    }
    if (state.expandedCardId) {
        toggleCard(state.expandedCardId, true);
    }
    transitionContent(() => renderIntro());
}

// ========================================
// THEME TOGGLE
// ========================================

/**
 * Toggles between light and dark theme
 */
function toggleTheme() {
    const isLight = document.body.classList.toggle('theme-light');
    const icon = document.getElementById('theme-icon');

    if (isLight) {
        localStorage.setItem('theme', 'light');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        localStorage.setItem('theme', 'dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

/**
 * Initializes theme from localStorage on page load
 */
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('theme-light');
        const icon = document.getElementById('theme-icon');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// ========================================
// CLICK OUTSIDE HANDLERS
// ========================================

document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('projects-dropdown');
    const projectsBtn = document.getElementById('btn-projects');
    const mobileProjectsBtn = document.getElementById('btn-projects-mobile');
    
    // Close dropdown if clicking outside (check both desktop and mobile buttons)
    if (state.isDropdownOpen && 
        !dropdown.contains(e.target) && 
        !projectsBtn.contains(e.target) &&
        !(mobileProjectsBtn && mobileProjectsBtn.contains(e.target))) {
        closeDropdown();
    }

    // Close overlay if clicking on backdrop
    const overlay = document.getElementById('project-detail-overlay');
    if (state.isOverlayOpen && e.target.classList.contains('overlay-backdrop')) {
        closeProjectDetail();
    }
});

// ========================================
// KEYBOARD HANDLERS
// ========================================

document.addEventListener('keydown', (e) => {
    // ESC key closes overlay or expanded card
    if (e.key === 'Escape') {
        if (state.isOverlayOpen) {
            closeProjectDetail();
        } else if (state.expandedCardId) {
            toggleCard(state.expandedCardId, true);
        }
    }
    
    // Arrow key navigation when modal is open
    if (state.isOverlayOpen) {
        if (e.key === 'ArrowRight') navigateProject('next');
        if (e.key === 'ArrowLeft') navigateProject('prev');
    }
});


// ========================================
// MOBILE STACK NAVIGATION
// ========================================

function updateCardPositions() {
    if (window.innerWidth > 980) return; // Only on mobile/tablet

    const cardDeck = document.getElementById('card-deck');
    if (!cardDeck) return;
    
    const cards = Array.from(cardDeck.querySelectorAll('.skill-card'));
    const totalCards = cards.length;
    
    cards.forEach((card, index) => {
        card.classList.remove('active', 'stacked-1', 'stacked-2', 'stacked-3', 'stacked-4', 'moving-to-back');
        
        // Circular offset: cards wrap around in infinite loop
        let offset = (index - state.activeCardIndex + totalCards) % totalCards;
        
        if (offset === 0) {
            card.classList.add('active');
        } else if (offset <= 4) {
            card.classList.add(`stacked-${offset}`);
        }
    });
}

function navigateCarousel(direction) {
    const totalCards = document.querySelectorAll('.skill-card').length;
    if (direction === 'next' && state.activeCardIndex < totalCards - 1) state.activeCardIndex++;
    if (direction === 'prev' && state.activeCardIndex > 0) state.activeCardIndex--;
    updateCardPositions();
}

// Touch/Swipe Handlers - Horizontal swipe-to-dismiss
// touch-action: pan-y on .skill-card lets the browser own vertical scrolling;
// JS only takes over once the gesture is confirmed as horizontal.
function handleTouchStart(e) {
    state.hasDragged = false;
    if (window.innerWidth > 980) return;
    if (state.isDropdownOpen || state.isOverlayOpen || state.expandedCardId) return;
    
    const cardDeck = document.getElementById('card-deck');
    if (!cardDeck) return;
    
    const cards = Array.from(cardDeck.querySelectorAll('.skill-card'));
    const activeCard = cards[state.activeCardIndex];
    
    if (!activeCard || !activeCard.classList.contains('active')) return;
    
    // Check if touch is directly on the active (front) card
    const touch = e.touches[0];
    const rect = activeCard.getBoundingClientRect();
    if (touch.clientX < rect.left || touch.clientX > rect.right ||
        touch.clientY < rect.top || touch.clientY > rect.bottom) {
        return;
    }
    
    // Tentatively start tracking; direction confirmed in touchmove
    state.isSwiping = true;
    state.swipeStartX = touch.clientX;
    state.swipeStartY = touch.clientY;
}

function handleTouchMove(e) {
    if (!state.isSwiping || window.innerWidth > 980) return;
    
    const cardDeck = document.getElementById('card-deck');
    if (!cardDeck) return;
    
    const cards = Array.from(cardDeck.querySelectorAll('.skill-card'));
    const activeCard = cards[state.activeCardIndex];
    if (!activeCard) return;
    
    const diffX = e.touches[0].clientX - state.swipeStartX;
    const diffY = e.touches[0].clientY - state.swipeStartY;
    
    if (Math.abs(diffX) > 5 || Math.abs(diffY) > 5) {
        state.hasDragged = true;
    }
    
    if (!state.hasDragged) return;
    
    // Vertical gesture — browser's touch-action: pan-y handles the scroll; we bail out
    if (Math.abs(diffY) > Math.abs(diffX)) {
        state.isSwiping = false;
        activeCard.classList.remove('swiping');
        activeCard.style.removeProperty('transform');
        activeCard.style.removeProperty('z-index');
        return;
    }
    
    // Horizontal gesture confirmed — take over and move the card
    if (!activeCard.classList.contains('swiping')) {
        activeCard.classList.add('swiping');
    }
    e.preventDefault();
    const rotation = diffX * 0.08;
    const scale = 1.02;
    activeCard.style.setProperty('transform', `translateX(calc(-50% + ${diffX}px)) translateY(0) rotate(${rotation}deg) scale(${scale})`, 'important');
    activeCard.style.setProperty('z-index', '100', 'important');
}

function handleTouchEnd(e) {
    if (window.innerWidth > 980) return;
    
    if (!state.isSwiping) return;
    
    const cardDeck = document.getElementById('card-deck');
    if (!cardDeck) {
        state.isSwiping = false;
        return;
    }
    
    const cards = Array.from(cardDeck.querySelectorAll('.skill-card'));
    const activeCard = cards[state.activeCardIndex];
    if (!activeCard) {
        state.isSwiping = false;
        return;
    }
    
    const endX = e.changedTouches[0].clientX;
    const diffX = endX - state.swipeStartX;
    const windowWidth = window.innerWidth;
    // Swipe threshold: must drag 40% of screen width to dismiss card
    const swipeThreshold = windowWidth * 0.4;
    
    activeCard.classList.remove('swiping');
    activeCard.style.removeProperty('z-index');
    
    if (Math.abs(diffX) > swipeThreshold) {
        // Card thrown far enough - animate to back of deck
        activeCard.classList.add('moving-to-back');
        
        // Advance to next card immediately for smoother feel
        state.activeCardIndex = (state.activeCardIndex + 1) % cards.length;
        updateCardPositions();
        
        setTimeout(() => {
            activeCard.classList.remove('moving-to-back');
            activeCard.style.removeProperty('transform');
        }, 300);
    } else {
        // Not thrown far enough - snap back to front position
        activeCard.style.removeProperty('transform');
    }
    
    state.isSwiping = false;
}

// Mouse handlers (for desktop testing)
function handleMouseDown(e) {
    state.hasDragged = false;
    if (window.innerWidth > 980) return;
    if (state.isDropdownOpen || state.isOverlayOpen || state.expandedCardId) return;
    
    const cardDeck = document.getElementById('card-deck');
    if (!cardDeck) return;
    
    const cards = Array.from(cardDeck.querySelectorAll('.skill-card'));
    const activeCard = cards[state.activeCardIndex];
    
    if (!activeCard || !activeCard.classList.contains('active')) return;
    
    // Check if mouse is on the card
    const rect = activeCard.getBoundingClientRect();
    
    if (e.clientX < rect.left || e.clientX > rect.right ||
        e.clientY < rect.top || e.clientY > rect.bottom) {
        return;
    }
    
    state.isSwiping = true;
    state.swipeStartX = e.clientX;
    state.swipeStartY = e.clientY;
    e.preventDefault();
    e.stopPropagation();
}

function handleMouseMove(e) {
    if (!state.isSwiping || window.innerWidth > 980) return;
    
    const cardDeck = document.getElementById('card-deck');
    if (!cardDeck) return;
    
    const cards = Array.from(cardDeck.querySelectorAll('.skill-card'));
    const activeCard = cards[state.activeCardIndex];
    if (!activeCard) return;
    
    const diffX = e.clientX - state.swipeStartX;
    const diffY = e.clientY - state.swipeStartY;
    
    if (Math.abs(diffX) > 5 || Math.abs(diffY) > 5) {
        state.hasDragged = true;
    }
    
    if (!state.hasDragged) return;
    
    if (!activeCard.classList.contains('swiping')) {
        activeCard.classList.add('swiping');
    }
    
    e.preventDefault();
    const rotation = diffX * 0.08;
    const scale = 1.02;
    const translateXValue = `calc(-50% + ${diffX}px)`;
    activeCard.style.setProperty('transform', `translateX(${translateXValue}) translateY(0) rotate(${rotation}deg) scale(${scale})`, 'important');
    activeCard.style.setProperty('z-index', '100', 'important');
}

function handleMouseUp(e) {
    if (!state.isSwiping || window.innerWidth > 980) return;
    
    const cardDeck = document.getElementById('card-deck');
    if (!cardDeck) {
        state.isSwiping = false;
        return;
    }
    
    const cards = Array.from(cardDeck.querySelectorAll('.skill-card'));
    const activeCard = cards[state.activeCardIndex];
    if (!activeCard) {
        state.isSwiping = false;
        return;
    }
    
    const diffX = e.clientX - state.swipeStartX;
    const windowWidth = window.innerWidth;
    const swipeThreshold = windowWidth * 0.4; // 40% of screen width
    
    activeCard.classList.remove('swiping');
    activeCard.style.removeProperty('z-index');
    
    if (Math.abs(diffX) > swipeThreshold) {
        // Card thrown far enough - move to back of deck
        activeCard.classList.add('moving-to-back');
        
        // Advance to next card immediately for smoother feel
        state.activeCardIndex = (state.activeCardIndex + 1) % cards.length;
        updateCardPositions();
        
        setTimeout(() => {
            activeCard.classList.remove('moving-to-back');
            activeCard.style.removeProperty('transform');
        }, 300);
    } else {
        // Not thrown far enough - snap back to front
        activeCard.style.removeProperty('transform');
    }
    
    state.isSwiping = false;
}

// Window resize handler to reinitialize on breakpoint change
let previousWidth = window.innerWidth;
let resizeTimer;

function handleResize() {
    const currentWidth = window.innerWidth;
    
    // Check if we crossed the 951px or 1350px boundaries
    const crossedLowerBoundary = (previousWidth <= 980 && currentWidth >= 981) || (previousWidth >= 981 && currentWidth <= 980);
    const crossedUpperBoundary = (previousWidth <= 1350 && currentWidth >= 1351) || (previousWidth >= 1351 && currentWidth <= 1350);
    const crossedTaglineBoundary = (previousWidth <= 1200 && currentWidth >= 1201) || (previousWidth >= 1201 && currentWidth <= 1200);
    
    // Re-render cards when crossing boundaries to update <br> tags in titles
    if (crossedLowerBoundary || crossedUpperBoundary) {
        renderSkillCards();
    }
    
    // Re-render intro when crossing tagline boundary to update line breaks
    if (crossedTaglineBoundary && state.currentView === 'intro') {
        renderIntro();
    }
    
    if (currentWidth <= 980) {
        updateCardPositions();
    }
    
    // Debounce tagline dot adjustment
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        adjustTaglineDots();
    }, 100);
    
    previousWidth = currentWidth;
}


// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initTheme();

    // Render initial content
    renderIntro();
    renderProjectsList();
    renderSkillCards();
    renderSocialLinks();

    // Update copyright year
    document.getElementById('copyright-year').textContent = new Date().getFullYear();

    // Attach event listeners
    document.getElementById('site-name').addEventListener('click', resetToIntro);
    document.getElementById('btn-projects').addEventListener('click', toggleDropdown);
    const mobileProjectsBtn = document.getElementById('btn-projects-mobile');
    if (mobileProjectsBtn) {
        mobileProjectsBtn.addEventListener('click', toggleDropdown);
    }
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    document.getElementById('overlay-close').addEventListener('click', closeProjectDetail);
    document.getElementById('projects-dropdown-backdrop').addEventListener('click', closeDropdown);

    const prevBtn = document.getElementById('project-prev');
    const nextBtn = document.getElementById('project-next');
    if (prevBtn) prevBtn.addEventListener('click', () => navigateProject('prev'));
    if (nextBtn) nextBtn.addEventListener('click', () => navigateProject('next'));

    // Thumbnail strip scroll buttons (Mobile/Tablet only now)
    const stripContainer = document.getElementById('project-thumbnail-strip');
    const scrollLeftBtn = document.getElementById('strip-scroll-left');
    const scrollRightBtn = document.getElementById('strip-scroll-right');

    if (scrollLeftBtn && scrollRightBtn && stripContainer) {
        // Scroll amount (roughly 2-3 thumbnails)
        const scrollAmount = 300; 

        scrollLeftBtn.addEventListener('click', () => {
            stripContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        scrollRightBtn.addEventListener('click', () => {
            stripContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }

    // Mobile/tablet: setup swipe handlers for both touch and mouse
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: false });
    
    // Also support mouse for desktop testing
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    window.addEventListener('resize', handleResize);
    
    // Initialize mobile/tablet card stack
    if (window.innerWidth <= 980) {
        updateCardPositions();
    }

    // Make functions globally available for onclick handlers
    window.selectProject = selectProject;
    window.openProjectDetail = openProjectDetail;
    window.toggleCard = toggleCard;
    window.switchProjectFromThumbnail = switchProjectFromThumbnail;
    window.navigateProject = navigateProject;
});