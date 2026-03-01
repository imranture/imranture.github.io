/**
 * Project Loader - Standalone script for project.html pages
 * Loads project details from URL parameters and renders content
 * Duplicates PROJECTS data from main.js to allow independent page loads
 */

// Project data structure: Each key maps to a URL parameter id
// Contains all metadata needed to render a project detail page
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
        <div style="max-width: 800px; margin: 0 auto; padding: 0 var(--space-4) var(--space-6);">
            <h1 style="font-size: clamp(1.25rem, 2.5vw, 1.75rem); font-weight: 500; color: var(--text-main); line-height: 1.3; margin-bottom: var(--space-4);">${project.title}</h1>

            <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: var(--space-5);">
                ${project.tags.map(tag => `
                    <span style="background: var(--bg-card); color: var(--accent); padding: 4px 12px; border-radius: 100px; font-size: 0.85rem; font-family: var(--font-mono); border: 1px solid var(--border-color);">${tag}</span>
                `).join('')}
            </div>

            ${hasLinks ? `
            <div style="display: flex; gap: var(--space-3); flex-wrap: wrap; margin-bottom: var(--space-6);">
                ${project.links.map(link => `
                    <a href="${link.url}" target="_blank" rel="noopener noreferrer"
                       style="color: var(--text-main); text-decoration: none; display: flex; align-items: center; gap: 8px;
                              font-weight: 500; padding: 8px 16px; background: var(--bg-card); border: 1px solid var(--border-color);
                              border-radius: 6px; transition: all 0.2s ease; font-size: 0.95rem;">
                        <i class="fas fa-link" style="color: var(--accent);"></i> ${link.text}
                    </a>
                `).join('')}
            </div>` : ''}

            <p style="font-size: 0.975rem; line-height: 1.65; color: var(--text-muted); margin-bottom: var(--space-5);">${project.description}</p>

            <div style="display: flex; flex-direction: column; gap: var(--space-5);">
                <img src="${project.primary_image}" alt="${project.title}"
                     style="width: 100%; border-radius: 12px; border: 1px solid var(--border-color); box-shadow: 0 10px 30px rgba(0,0,0,0.15);">
                ${project.secondary_image ? `
                <img src="${project.secondary_image}" alt=""
                     style="width: 100%; border-radius: 12px; border: 1px solid var(--border-color); box-shadow: 0 10px 30px rgba(0,0,0,0.15);">
                ` : ''}
            </div>
        </div>`;
})();
