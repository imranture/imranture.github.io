/**
 * Project Loader - Standalone script for project.html pages
 * Loads project details from URL parameters and renders content
 * Uses centralized PROJECTS_DATA from data/projects.js
 */

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
        description: 'E4 TimeStamper is a user-friendly web application designed to help researchers add timestamps to physiological signal data collected from Empatica E4 wristbands. The tool enables seamless file extraction and precise timestamping, customizable by timezone and preferred date &amp; time format. Widely adopted by researchers worldwide, E4 TimeStamper is now a web-based tool, having previously been available for both Windows and Mac operating systems.'
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

// IIFE (Immediately Invoked Function Expression)
// Runs as soon as script loads since DOM is ready (script at end of body)
(function loadProject() {
    // Extract project ID from URL query parameter (?id=project-name)
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');
    const container = document.getElementById('project-content');

    if (!container || !projectId) return;

    const project = PROJECTS[projectId];

    // Update back button to link to correct anchor on homepage
    const backBtn = document.querySelector('a[aria-label="Back to Projects"]');
    if (backBtn) {
        backBtn.href = `/index.html#projects-${projectId}`;
    }

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
