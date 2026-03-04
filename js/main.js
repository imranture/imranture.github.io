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
    tagline: "RESEARCH · PLANNING · DEVELOPMENT · TESTING · OPTIMIZATION",
    mainMessage: "I design and build systems<br>people rely on.",
    subtitle: "Prototypes, models, apps, and AI tools for everyday challenges and decisions",
    location: "Somewhere on the globe",
    socialLinks: [
        { icon: "fas fa-envelope", url: "mailto:&#105;&#109;&#114;&#097;&#110;@&#097;&#108;&#117;&#109;&#110;&#105;.&#114;&#117;&#116;&#103;&#101;&#114;&#115;.&#101;&#100;&#117;", label: "Email", isEmail: true },
        { icon: "fab fa-linkedin-in", url: "https://www.linkedin.com/in/imranture/", label: "LinkedIn" },
        { icon: "fab fa-github", url: "https://github.com/imranture", label: "GitHub" },
        { icon: "fab fa-kaggle", url: "https://www.kaggle.com/imranture", label: "Kaggle" },
    ]
};

const PROJECTS = {
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
        description: "I find what is missing, unclear, or overlooked before it becomes a problem.",
        details: "Stakeholder interviews, process mapping, SQL checks, exploratory analysis in Python. I trace workflows and validate assumptions before defining the actual problem.",
        color: "#CC6A1E",
        pattern: "pattern-research"
    },
    {
        id: "planning",
        title: "Strategic Planning",
        description: "I turn messy ideas into structured plans with clear steps that can actually be followed.",
        details: "Scope breakdowns, dependency mapping, decision matrices, simple prioritization frameworks. I sketch the flow first, compare options, and define what should be built now versus later.",
        color: "#3f7689",
        pattern: "pattern-planning"
    },
    {
        id: "development",
        title: "System Development",
        description: "I build prototypes, models, and tools that take ideas out of discussion and into use.",
        details: "Python scripts, SQL logic, internal tools, LLM-assisted workflows, web apps with Flask or Django. I build working models that can be tested and improved through real use.",
        color: "#d81c3f",
        pattern: "pattern-development"
    },
    {
        id: "testing",
        title: "Solution Testing",
        description: "I test, compare, and refine until the solution holds up in real situations.",
        details: "Side-by-side output comparisons, edge case testing, user feedback loops, reliability metrics. I check how the solution behaves under actual use conditions before calling it done.",
        color: "#229954",
        pattern: "pattern-testing"
    },
    {
        id: "optimization",
        title: "Workflow Optimization",
        description: "I identify where work slows down or wastes time, then simplify it.",
        details: "Process flow refinement, automation scripts in Python, tool consolidation, removing redundant steps. I reduce repeated manual work and adjust how systems interact to eliminate friction.",
        color: "#6A35CC",
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

// ========================================
// RENDER FUNCTIONS
// ========================================

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

function renderIntro() {
    const centerPanel = document.getElementById('center-panel');
    const cardDeck = document.getElementById('card-deck');
    
    // Show card deck on intro page (works on all screen sizes)
    if (cardDeck) {
        cardDeck.classList.remove('hidden');
    }

    centerPanel.innerHTML = `
        <div class="intro-content">
            <h1 class="intro-name">${INTRO.name}</h1>
            <p class="intro-role">${INTRO.role}</p>
            <p class="intro-tagline">${INTRO.tagline}</p>
            <h2 class="intro-message">${INTRO.mainMessage}</h2>
            <p class="intro-subtitle">${INTRO.subtitle}</p>
        </div>
    `;

    state.currentView = 'intro';
    state.currentProjectId = null;
}

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
            <img src="${project.primary_image}" alt="${project.title}">
            ${project.secondary_image ? `<img src="${project.secondary_image}" alt="">` : ''}
        </div>
    `;

    contentDiv.innerHTML = `
        <h1 class="project-detail-title">${project.title}</h1>
        <div class="project-detail-tags">${tagsHTML}</div>
        ${linksHTML}
        <p class="project-detail-description">${project.description}</p>
        ${imagesHTML}
    `;
}

function renderProjectsList() {
    const dropdown = document.getElementById('projects-dropdown');
    if (!dropdown) return;
    
    const dropdownContent = dropdown.querySelector('.dropdown-content');
    if (!dropdownContent) return;
    
    const projectsHTML = Object.keys(PROJECTS).map(projectId => {
        const project = PROJECTS[projectId];
        return `<div class="dropdown-item" onclick="selectProject('${projectId}')">${project.title}</div>`;
    }).join('');

    dropdownContent.innerHTML = projectsHTML;
}

function renderSkillCards() {
    const cardDeck = document.getElementById('card-deck');
    
    const cardsHTML = SKILLS_CARDS.map(card => `
        <div class="skill-card" data-card-id="${card.id}" data-pattern="${card.pattern}" style="--card-color: ${card.color}">
            <h3 class="skill-card-title">${card.title}</h3>
            <p class="skill-card-description">${card.description}</p>
            <p class="skill-card-details">${card.details}</p>
        </div>
    `).join('');

    cardDeck.innerHTML = cardsHTML;

    // Disable image dragging
    document.querySelectorAll('.skill-card img').forEach(img => {
        img.ondragstart = function() { return false; };
        img.draggable = false;
    });

    // Add click event listeners (desktop only - mobile uses swipe)
    if (window.innerWidth > 950) {
        document.querySelectorAll('.skill-card').forEach(card => {
            card.addEventListener('click', () => toggleCard(card.dataset.cardId));
        });
    }

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

function selectProject(projectId) {
    closeDropdown();
    openProjectDetail(projectId);
}

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

function closeProjectDetail() {
    const overlay = document.getElementById('project-detail-overlay');
    overlay.classList.remove('active');
    state.isOverlayOpen = false;
}

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
    } else {
        closeDropdown();
    }
}

function closeDropdown() {
    const dropdown = document.getElementById('projects-dropdown');
    const backdrop = document.getElementById('projects-dropdown-backdrop');
    dropdown.classList.add('hidden');
    backdrop.classList.add('hidden');
    state.isDropdownOpen = false;
}

function toggleCard(cardId) {
    const cards = document.querySelectorAll('.skill-card');
    const clickedCard = document.querySelector(`[data-card-id="${cardId}"]`);
    const cardDeck = document.getElementById('card-deck');
    
    // On mobile/tablet: clicking a stacked card brings it to focus (no expand)
    if (window.innerWidth <= 950) {
        const deckCards = Array.from(cardDeck.querySelectorAll('.skill-card'));
        const clickedIndex = deckCards.indexOf(clickedCard);
        if (clickedIndex !== -1 && clickedIndex !== state.activeCardIndex) {
            state.activeCardIndex = clickedIndex;
            updateCardPositions();
        }
        // Clicking active card does nothing on mobile (already fully visible)
        return;
    }
    
    // Desktop only: Get or create backdrop
    let backdrop = document.getElementById('card-backdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.id = 'card-backdrop';
        backdrop.className = 'card-backdrop';
        document.body.appendChild(backdrop);
        
        // Close card when clicking backdrop
        backdrop.addEventListener('click', () => {
            if (state.expandedCardId) {
                toggleCard(state.expandedCardId);
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
        clickedCard.style.padding = 'var(--space-5)';
        
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
                card.style.padding = 'var(--space-5)';
                
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
                toggleCard(cardId);
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
    
    // Close dropdown if clicking outside
    if (state.isDropdownOpen && 
        !dropdown.contains(e.target) && 
        !projectsBtn.contains(e.target)) {
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
            toggleCard(state.expandedCardId);
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
function handleTouchStart(e) {
    if (window.innerWidth > 950) return;
    
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
        return; // Touch is outside the active card
    }
    
    state.isSwiping = true;
    state.swipeStartX = touch.clientX;
    state.swipeStartY = touch.clientY;
    activeCard.classList.add('swiping');
    e.preventDefault();
    e.stopPropagation();
}

function handleTouchMove(e) {
    if (!state.isSwiping || window.innerWidth > 950) return;
    
    const cardDeck = document.getElementById('card-deck');
    if (!cardDeck) return;
    
    const cards = Array.from(cardDeck.querySelectorAll('.skill-card'));
    const activeCard = cards[state.activeCardIndex];
    if (!activeCard) return;
    
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - state.swipeStartX;
    const diffY = currentY - state.swipeStartY;
    
    e.preventDefault();
    const rotation = diffX * 0.08;
    const scale = 1.02;
    activeCard.style.setProperty('transform', `translateX(calc(-50% + ${diffX}px)) translateY(0) rotate(${rotation}deg) scale(${scale})`, 'important');
    activeCard.style.setProperty('z-index', '100', 'important');
}

function handleTouchEnd(e) {
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
    
    const endX = e.changedTouches[0].clientX;
    const diffX = endX - state.swipeStartX;
    const windowWidth = window.innerWidth;
    // Swipe threshold: must drag 40% of screen width to dismiss card
    const swipeThreshold = windowWidth * 0.4;
    
    activeCard.classList.remove('swiping');
    activeCard.style.zIndex = '';
    
    if (Math.abs(diffX) > swipeThreshold) {
        // Card thrown far enough - animate to back of deck
        activeCard.classList.add('moving-to-back');
        
        setTimeout(() => {
            // Circular navigation: wraps around to first card after last
            state.activeCardIndex = (state.activeCardIndex + 1) % cards.length;
            activeCard.classList.remove('moving-to-back');
            activeCard.style.transform = '';
            updateCardPositions();
        }, 400);
    } else {
        // Not thrown far enough - snap back to front position
        activeCard.style.transform = '';
    }
    
    state.isSwiping = false;
}

// Mouse handlers (for desktop testing)
function handleMouseDown(e) {
    if (window.innerWidth > 950) return;
    
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
    activeCard.style.zIndex = '';
    
    if (Math.abs(diffX) > swipeThreshold) {
        // Card thrown far enough - move to back of deck
        activeCard.classList.add('moving-to-back');
        
        setTimeout(() => {
            // Advance to next card (circular)
            state.activeCardIndex = (state.activeCardIndex + 1) % cards.length;
            activeCard.classList.remove('moving-to-back');
            activeCard.style.transform = '';
            updateCardPositions();
        }, 400);
    } else {
        // Not thrown far enough - snap back to front
        activeCard.style.transform = '';
    }
    
    state.isSwiping = false;
}

// Window resize handler to reinitialize on breakpoint change
function handleResize() {
    if (window.innerWidth <= 950) {
        updateCardPositions();
    }
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

    // Attach event listeners
    document.getElementById('site-name').addEventListener('click', resetToIntro);
    document.getElementById('btn-projects').addEventListener('click', toggleDropdown);
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