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
const PROJECTS = typeof PROJECTS_DATA !== 'undefined' ? PROJECTS_DATA : {
    'e4-timestamper': {
        title: 'E4 TimeStamper: Web App for Automatic Timestamping and Analysis of Empatica E4 Data',
        primary_image: '/image/e4-timestamper.png',
        secondary_image: null,
        links: [
            { url: 'https://e4timestamper.netlify.app/', text: 'App' },
            { url: 'https://github.com/imranture/E4-TimeStamper', text: 'GitHub' }
        ],
        tags: ['Software Development', 'Time Series Analysis', 'Physiological Signals', 'Empatica E4'],
        description: 'E4 TimeStamper is a user-friendly web application designed to help researchers add timestamps to physiological signal data collected from Empatica E4 wristbands. The tool enables seamless file extraction and precise timestamping, customizable by timezone and preferred date & time format. Widely adopted by researchers worldwide, E4 TimeStamper is now a web-based tool, having previously been available for both Windows and Mac operating systems.'
    },
    'emotion-recognition': {
        title: 'Deep Emotion Recognition using Wearable Sensors',
        primary_image: '/image/model-accuracy.png',
        secondary_image: null,
        links: [],
        tags: ['Deep Learning', 'Machine Learning', 'Emotion Recognition', 'Physiological Signals', 'LSTM', 'CNN', 'Empatica E4'],
        description: 'Emotion recognition is an emerging interdisciplinary field that integrates methodologies from affective computing, sentiment analysis, signal processing, and machine learning. This project focuses on classifying emotions such as amusement and stress using physiological signals like heart rate and skin conductivity, collected via wearables. To build the model, a hybrid approach was employed that combines Convolutional Neural Networks (CNN) and Long Short-Term Memory (LSTM) networks. The model achieved an accuracy rate of 92% under a 5-fold cross-validation setting using grid search and Bayesian optimization for hyperparameter tuning.'
    },
    'python-for-openintro': {
        title: 'Python Implementation of OpenIntro Statistics',
        primary_image: '/image/openintro-python-official-page.png',
        secondary_image: '/image/openintro-python-labs.png',
        links: [
            { url: 'https://www.imranture.com/labs/os/', text: 'Labs' },
            { url: 'https://openintro.info/stat/labs.php?stat_lab_software=Python%20(beta)', text: 'OpenIntro' }
        ],
        tags: ['Statistics', 'Python'],
        description: 'We developed the Python labs for OpenIntro Statistics, an open-source textbook for introductory statistics used at many universities (from Community Colleges to the Ivy League) around the world, to promote the understanding and application of statistical data analysis using Python. The labs are officially listed on the OpenIntro Statistics website.'
    },
    'bbl-physiodb': {
        title: 'BBL-PhysioDB: Data Hub for Entrepreneurship Assessment and Development Workshop',
        primary_image: '/image/bbl-physiodb.png',
        secondary_image: '/image/rmit-bbl.jpg',
        links: [],
        tags: ['Database Management', 'SQL', 'PostgreSQL', 'Django'],
        description: 'BBL-PhysioDB is a robust database, developed with Django and PostgreSQL, for the Entrepreneurship Assessment and Development Workshop studies conducted at RMIT\'s Behavioural Business Lab (BBL). The database can effectively manage data collected from over 150 participants, including entrepreneurs, artists, and professionals with diverse backgrounds. It has the capability to store extensive data collected through multiple lab experiment sessions, including physiological signal data recorded through E4 wristbands from Empatica, along with 200+ questionnaire responses providing demographic information and insights into participants\' entrepreneurial engagement.'
    },
    'marketing-ab': {
        title: 'Measuring the Impact of Ads on Campaign Success',
        primary_image: '/image/conversion-rates-by-ad-exposure.png',
        secondary_image: '/image/conversion-rates-by-day-hour.png',
        links: [
            { url: 'https://www.kaggle.com/code/imranture/measuring-the-impact-of-ads-on-campaign-success', text: 'Kaggle' }
        ],
        tags: ['A/B Testing', 'Chi-Square', 'Mann–Whitney U test'],
        description: 'The report presents a detailed A/B testing analysis to understand how ad exposure and timing impact user conversions. By examining data across different days, times, and levels of ad exposure, key insights are uncovered for optimizing marketing strategies. The analysis identifies the best days and times to run campaigns and an optimal ad exposure range, balancing the maximization of conversions while minimizing ad fatigue. The findings highlight the significant role of targeted ads in driving campaign success.'
    },
    // 'forecasting-translation': {
    //     title: 'Translating Forecasting: Principles and Practice',
    //     primary_image: '/image/fpp3.png',
    //     secondary_image: null,
    //     links: [],
    //     tags: ['Forecasting', 'R', 'RStudio'],
    //     description: 'The initiative involves translating the popular textbook "Forecasting: Principles and Practice" to broaden the accessibility and understanding of forecasting principles among Turkish speakers. Alongside this effort, a suite of documents has been developed to facilitate the collaborative process among translation teams, ensuring efficient workflows and high-quality educational outcomes.'
    // },
    'melbourne-property-sales': {
        title: 'Melbourne Property Sales: Visual Exploration of Housing Market Dynamics',
        primary_image: '/image/melbourne-property-sales.png',
        secondary_image: null,
        links: [
            { url: 'https://public.tableau.com/app/profile/imranture/viz/MelbournePropertySales_17051684571690/Dashboard', text: 'Tableau Dashboard' }
        ],
        tags: ['Data Visualization', 'Tableau'],
        description: 'Melbourne Property Sales is an interactive Tableau dashboard with a detailed visual overview of the city\'s real estate trends, based on historical sales data. The dashboard offers a range of visualizations, including average property prices over time, distributions of key property features, and regional price comparisons for various housing types. These visualizations highlight patterns in the Melbourne housing market dynamics, such as seasonal pricing trends and the common characteristics of sold properties.'
    },
    'early-warning-system': {
        title: 'Advancing Water Safety: Early Warning System to Monitor and Evaluate Drinking Water Quality',
        primary_image: '/image/early-warning-system.png',
        secondary_image: null,
        links: [],
        tags: ['Anomaly Detection', 'Statistical Quality Control'],
        description: 'An early warning system was developed to enhance the safety and quality of drinking water in Türkiye by identifying hazardous contaminants. Utilizing a hybrid approach that integrates various statistical methods like Z-score analysis, moving averages, control charts, and weighted voting, the system provides real-time monitoring and detects unexpected levels of temperature, pH, total organic carbon, conductivity, oxidation-reduction potential, free chlorine, and dissolved oxygen. The multi-tiered approach facilitates early intervention for minor deviations while enabling immediate action for more severe anomalies.'
    },
    'pdf4u': {
        title: 'pdf4u: Web-Based PDF Management Toolkit App',
        primary_image: '/image/pdf4u.png',
        secondary_image: null,
        links: [
            { url: 'https://pdf4u.onrender.com/', text: 'App' }
        ],
        tags: ['Web Development', 'HTML', 'CSS', 'JavaScript', 'Flask'],
        description: 'pdf4u is a versatile web-based PDF management toolkit app designed to handle a wide range of PDF operations, including merging, splitting, rotating, and extracting pages from PDF files. Developed using Flask for the backend, the application provides a user-friendly interface built with HTML, CSS, and JavaScript. Users can easily upload and manipulate files using an intuitive drag-and-drop feature. The toolkit is designed for extensibility, with additional functionalities like converting images to PDFs and more in development.'
    },
    'durcalc': {
        title: 'DurCalc: Hassle-Free Calculation of Date and Time Durations',
        primary_image: '/image/durcalc.png',
        secondary_image: null,
        links: [
            { url: 'https://github.com/imranture/durcalc', text: 'GitHub' }
        ],
        tags: ['Web Development'],
        description: 'DurCalc is a web app designed to effortlessly calculate the duration between dates and/or times. With its user-friendly interface and intuitive functionality, DurCalc streamlines the process and calculates durations without any fuss.'
    }
};

const SKILLS_CARDS = [
    {
        id: "research",
        title: "Research Analysis",
        icon: "fa-solid fa-magnifying-glass-chart",
        description: "I identify gaps, ambiguities, and hidden issues through systematic analysis and collaborative discovery.",
        approach: "Stakeholder interviews, process mapping, exploratory data analysis. I trace workflows and validate assumptions before defining the actual problem.",
        tools: "Python (Pandas, NumPy, Matplotlib), R, SQL (BigQuery, PostgreSQL), Tableau",
        color: "#8B5CF6",
        pattern: "pattern-research"
    },
    {
        id: "planning",
        title: "Strategic Planning",
        icon: "fa-solid fa-chess-knight",
        description: "I turn messy ideas into structured plans with clear steps and dependencies.",
        approach: "Scope breakdowns, dependency mapping, decision matrices, feasibility analysis. I use process modeling and cost-benefit analysis to compare options and define priorities.",
        tools: "Python, Excel, process modeling software, simulation tools",
        color: "#0EA5E9",
        pattern: "pattern-planning"
    },
    {
        id: "development",
        title: "System Development",
        icon: "fa-solid fa-code",
        description: "I build prototypes, models, and tools that take ideas out of discussion and into working systems.",
        approach: "Rapid prototyping, iterative development, building working systems that can be tested and improved through real use.",
        tools: "Python (scikit-learn, TensorFlow, PyTorch), SQL (PostgreSQL, BigQuery), LLMs (OpenAI API, LangChain), Flask, Django",
        color: "#F43F5E",
        pattern: "pattern-development"
    },
    {
        id: "testing",
        title: "Solution Testing",
        icon: "fa-solid fa-vial-circle-check",
        description: "I validate, compare, and refine solutions until they are ready for real-world use.",
        approach: "A/B testing, statistical validation, cross-validation for ML models, edge case testing, user feedback loops. I check how solutions behave under actual use conditions.",
        tools: "Python (SciPy, Statsmodels), chi-square tests, t-tests, reliability metrics",
        color: "#10B981",
        pattern: "pattern-testing"
    },
    {
        id: "optimization",
        title: "Workflow Optimization",
        icon: "fa-solid fa-gauge-high",
        description: "I find bottlenecks and implement targeted improvements to eliminate waste and optimize processes.",
        approach: "Process analysis, workflow mapping, optimization models for complex scheduling and allocation problems.",
        tools: "Python (PuLP, Gurobi for MILP), automation scripts, process modeling",
        color: "#FB923C",
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
        
        setTimeout(() => {
            feedback.remove();
            emailLink.style.color = '';
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
 * Renders the list of projects in the dropdown menu
 */
function renderProjectsList() {
    const dropdown = document.getElementById('projects-dropdown');
    if (!dropdown) return;
    
    const dropdownContent = dropdown.querySelector('.dropdown-content');
    if (!dropdownContent) return;
    
    const projectsHTML = Object.keys(PROJECTS).map(projectId => {
        const project = PROJECTS[projectId];
        return `<button class="dropdown-item" 
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
    
    const cardsHTML = SKILLS_CARDS.map(card => `
        <article class="skill-card" 
                 data-card-id="${card.id}" 
                 data-pattern="${card.pattern}" 
                 style="--card-color: ${card.color}"
                 role="article"
                 tabindex="0"
                 aria-label="${card.title}">
            <div class="skill-card-inner">
                <div class="skill-card-front">
                    <div class="skill-card-front-content">
                        <i class="${card.icon} skill-card-icon"></i>
                        <h3 class="skill-card-title">${formatCardTitle(card.title)}</h3>
                    </div>
                </div>
                <div class="skill-card-back">
                    <h3 class="skill-card-title">${card.title}</h3>
                    <p class="skill-card-description">${card.description}</p>
                    <div class="skill-card-approach">
                        <strong>Approach:</strong> ${card.approach}
                    </div>
                    <div class="skill-card-tools">
                        <strong>Tools:</strong> ${card.tools}
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
        card.addEventListener('click', () => toggleCard(card.dataset.cardId));
    });

    // Initialize mobile stack classes after injection
    if (window.innerWidth <= 950) {
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
    renderProjectDetail(projectId);
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
    if (window.innerWidth <= 950) {
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
        clickedCard.style.padding = '0';
        
        backdrop.classList.remove('active');
        
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
                card.style.padding = '0';
                
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
});


// ========================================
// MOBILE STACK NAVIGATION
// ========================================

function updateCardPositions() {
    if (window.innerWidth > 950) return; // Only on mobile/tablet

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
    if (window.innerWidth > 950) return;
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
    if (!state.isSwiping || window.innerWidth > 950) return;
    
    const cardDeck = document.getElementById('card-deck');
    if (!cardDeck) return;
    
    const cards = Array.from(cardDeck.querySelectorAll('.skill-card'));
    const activeCard = cards[state.activeCardIndex];
    if (!activeCard) return;
    
    const diffX = e.touches[0].clientX - state.swipeStartX;
    const diffY = e.touches[0].clientY - state.swipeStartY;
    
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
    if (window.innerWidth > 950) return;
    
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
        
        setTimeout(() => {
            // Circular navigation: wraps around to first card after last
            state.activeCardIndex = (state.activeCardIndex + 1) % cards.length;
            activeCard.classList.remove('moving-to-back');
            activeCard.style.removeProperty('transform');
            updateCardPositions();
        }, 400);
    } else {
        // Not thrown far enough - snap back to front position
        activeCard.style.removeProperty('transform');
    }
    
    state.isSwiping = false;
}

// Mouse handlers (for desktop testing)
function handleMouseDown(e) {
    if (window.innerWidth > 950) return;
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
    activeCard.classList.add('swiping');
    e.preventDefault();
    e.stopPropagation();
}

function handleMouseMove(e) {
    if (!state.isSwiping || window.innerWidth > 950) return;
    
    const cardDeck = document.getElementById('card-deck');
    if (!cardDeck) return;
    
    const cards = Array.from(cardDeck.querySelectorAll('.skill-card'));
    const activeCard = cards[state.activeCardIndex];
    if (!activeCard) return;
    
    const diffX = e.clientX - state.swipeStartX;
    
    e.preventDefault();
    const rotation = diffX * 0.08;
    const scale = 1.02;
    const translateXValue = `calc(-50% + ${diffX}px)`;
    activeCard.style.setProperty('transform', `translateX(${translateXValue}) translateY(0) rotate(${rotation}deg) scale(${scale})`, 'important');
    activeCard.style.setProperty('z-index', '100', 'important');
}

function handleMouseUp(e) {
    if (!state.isSwiping || window.innerWidth > 950) return;
    
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
        
        setTimeout(() => {
            // Advance to next card (circular)
            state.activeCardIndex = (state.activeCardIndex + 1) % cards.length;
            activeCard.classList.remove('moving-to-back');
            activeCard.style.removeProperty('transform');
            updateCardPositions();
        }, 400);
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
    const crossedLowerBoundary = (previousWidth <= 950 && currentWidth >= 951) || (previousWidth >= 951 && currentWidth <= 950);
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
    
    if (currentWidth <= 950) {
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
    if (window.innerWidth <= 950) {
        updateCardPositions();
    }

    // Make functions globally available for onclick handlers
    window.selectProject = selectProject;
    window.openProjectDetail = openProjectDetail;
    window.toggleCard = toggleCard;
});