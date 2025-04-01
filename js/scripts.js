// Copy email address to clipboard
function copyURI(evt) {
    evt.preventDefault();
    const emailLink = evt.target.closest('.email');
    const spanElement = emailLink.querySelector('span');

    const textArea = document.createElement('textarea');
    textArea.innerHTML = emailLink.getAttribute('href').replace('mailto:', '');
    const decodedEmail = textArea.value;

    navigator.clipboard.writeText(decodedEmail).then(() => {
        emailLink.classList.add('clicked');
        spanElement.classList.add('hidden');
        emailLink.style.setProperty('--before-content', '"Copied!"');

        setTimeout(() => {
            emailLink.classList.remove('clicked');
            spanElement.classList.remove('hidden');
            emailLink.style.removeProperty('--before-content');
        }, 3000);
    }, () => {
        /* clipboard write failed */
    });
}

// Function to set the theme
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        if (toggleSwitch) toggleSwitch.checked = true;
    } else {
        document.body.classList.remove('dark-mode');
        if (toggleSwitch) toggleSwitch.checked = false;
    }
}

// Initialize the theme on page load
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
}

// Function to initialize email link with copyURI event listener
function initializeEmailLink() {
    const emailLink = document.getElementById('emailLink');
    if (emailLink) {
        emailLink.href = 'mailto:' + '&#105;&#109;&#114;&#097;&#110;' + '@' + '&#097;&#108;&#117;&#109;&#110;&#105&period;&#114;&#117;&#116;&#103;&#101;&#114;&#115&period;&#101;&#100;&#117;';
        emailLink.removeEventListener('click', copyURI); // Ensure no duplicate listeners
        emailLink.addEventListener('click', copyURI);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const projects = {
        'e4-timestamper': {
            title: 'E4 TimeStamper: GUI App for Automatic Timestamping and Analysis of Empatica E4 Data',
            cover_image: '/image/cover_e4.png',
            primary_image: '/image/e4-timestamper.gif',
            links: [{ url: 'https://github.com/imranture/E4-TimeStamper', text: '<i class="fab fa-github"></i> GitHub' }],
            tags: ['Software Development', 'Time Series Analysis', 'Physiological Signals', 'Empatica E4'],
            shortDescription: 'A user-friendly GUI application designed to facilitate researchers in adding timestamps to physiological signal data obtained from Empatica E4 wristbands.',
            description: 'E4 TimeStamper is a user-friendly GUI application designed to facilitate researchers in adding timestamps to physiological signal data obtained from Empatica E4 wristbands. This tool allows for seamless extraction and precise timestamping of files, all in accordance with the chosen timezone and preferred date & time format. E4 TimeStamper, adopted and implemented by researchers worldwide in their studies<a href="https://www.igi-global.com/gateway/article/full-text-html/313181&riu=true" target="_blank" rel="noopener noreferrer"><sup>1</sup></a>, is available for both Windows and Mac operating systems.'
        },
        'emotion-recognition': {
            title: 'Deep Emotion Recognition using Wearable Sensors',
            cover_image: '/image/cover_emotion.png',
            primary_image: '/image/model-accuracy.png',
            secondary_image: '',
            links: [{ url: '', text: '' }],
            tags: ['Deep Learning', 'Machine Learning', 'Emotion Recognition', 'Physiological Signals', 'LSTM', 'CNN', 'Empatica E4'],
            shortDescription: 'A deep learning based emotion recognition model for the classification of emotional states using physiological signals collected via wearables.',
            description: 'Emotion recognition is an emerging interdisciplinary field that integrates methodologies from affective computing, sentiment analysis, signal processing, and machine learning. This project focuses on classifying emotions such as amusement and stress using physiological signals like heart rate and skin conductivity, collected via wearables. To build the model, a hybrid approach was employed that combines various deep learning architectures, including Convolutional Neural Networks (CNN) and Long Short-Term Memory (LSTM) networks. This approach is capable of accurately capturing changes in physiological signals to identify specific emotional states.<br>The performance of the model has been rigorously evaluated using a variety of metrics, including accuracy, precision, recall, and F1-score. To fine-tune the model\'s performance, hyperparameter tuning was conducted using grid search and Bayesian optimization techniques. The model achieved an accuracy rate of 92% under a 5-fold cross-validation setting. As wearable technology continues to evolve, this project serves as a significant contribution to the development of real-time affective computing systems that could be integrated into future generations of a wide range of wearable products, from smartwatches to health monitors.'
        },
        'python-for-openintro': {
            title: ' Python Implementation of OpenIntro',
            cover_image: '/image/cover_openintro.jpg',
            primary_image: '/image/openintro-python-official-page.png',
            secondary_image: '/image/openintro-python-labs.png',
            links: [{ url: 'https://www.imranture.com/labs/os/', text: '<i class="fas fa-link"></i> Labs' }, {
                url: 'https://openintro.info/stat/labs.php?stat_lab_software=Python%20(beta)',
                text: '<i class="fas fa-link"></i> OpenIntro',
                description: 'Machine Learning Lab - Discover machine learning algorithms, projects, and tutorials.'
            },],
            tags: ['Statistics', 'Python'],
            shortDescription: 'Official Python labs for OpenIntro Statistics.',
            description: 'We developed the Python labs for OpenIntro Statistics, an open-source textbook for introductory statistics used at many universities (from Community Colleges to the Ivy League) around the world, to promote the understanding and application of statistical data analysis using Python. The labs are officially listed on the OpenIntro Statistics website.'
        },
        'bbl-physiodb': {
            title: 'BBL-PhysioDB : Data Hub for Entrepreneurship Assessment and Development Workshop',
            cover_image: '/image/cover_rmit.jpg',
            primary_image: '/image/bbl-physiodb.png',
            secondary_image: '/image/rmit-bbl.jpg',
            links: [{ url: '', text: '' }],
            tags: ['Database Management', 'SQL', 'PostgreSQL', 'Django'],
            shortDescription: 'A robust database designed for the Entrepreneurship Assessment and Development Workshop studies conducted at RMIT University.',
            description: 'BBL-PhysioDB is a robust database, developed with Django and PostgreSQL, for the Entrepreneurship Assessment and Development Workshop studies conducted at RMIT\'s Behavioural Business Lab (BBL). The database can effectively manage data collected from over 150 participants, including entrepreneurs, artists, and professionals with diverse backgrounds. It has the capability to store extensive data collected through multiple lab experiment sessions, including physiological signal data recorded through E4 wristbands from Empatica, along with 200+ questionnaire responses providing demographic information and insights into participants\' entrepreneurial engagement.<br><br>The database offers a user-friendly interface that simplifies navigation and enables robust search capabilities. Researchers can seamlessly query the database to explore findings from BBL studies. The database scheme can be leveraged by other researchers to address their own research needs.'
        },
        'marketing-ab': {
            title: 'Measuring the Impact of Ads on Campaign Success',
            cover_image: '/image/marketing-ab.jpg',
            primary_image: '/image/conversion-rates-by-ad-exposure.png',
            secondary_image: '/image/conversion-rates-by-day-hour.png',
            links: [{ url: 'https://www.kaggle.com/code/imranture/measuring-the-impact-of-ads-on-campaign-success', text: '<i class="fab fa-kaggle"></i> Kaggle' }],
            tags: ['A/B Testing', 'Chi-Square', 'Mann–Whitney U test'],
            shortDescription: 'A comprehensive A/B testing analysis on marketing strategies exploring how ad exposure and timing influence campaign success.',
            description: 'The report presents a detailed A/B testing analysis to understand how ad exposure and timing impact user conversions. By examining data across different days, times, and levels of ad exposure, key insights are uncovered for optimizing marketing strategies. Moreover, the analysis identifies the best day and times to run campaigns and an optimal ad exposure range, balancing the maximization of conversions with minimizing ad fatigue.<br><br>The findings highlight the significant role of targeted ads in driving campaign success. The insights offer actionable recommendations for marketers to enhance campaign effectiveness, emphasizing the importance of well-timed and targeted ads to boost user engagement and conversion rates.'
        },
        'forecasting-translation': {
            title: 'Translating Forecasting: Principles and Practice',
            cover_image: '/image/cover_fpp3.jpg',
            primary_image: '/image/fpp3.png',
            secondary_image: '',
            links: [{ url: 'https://otexts.com/fpp3/', text: '<i class="fas fa-link"></i> Link' }],
            tags: ['Forecasting', 'R', 'RStudio'],
            shortDescription: 'The initiative involves translating the popular textbook to broaden the accessibility and understanding of forecasting principles among Turkish speakers.',
            description: 'The initiative involves translating the popular textbook to broaden the accessibility and understanding of forecasting principles among Turkish speakers. Alongside this effort, a suite of documents has been developed to facilitate the collaborative process among translation teams, ensuring efficient workflows and high-quality educational outcomes.'
        },
        'melbourne-property-sales': {
            title: 'Melbourne Property Sales: Visual Exploration of Housing Market Dynamics',
            cover_image: '/image/melbourne-property-sales.png',
            primary_image: '/image/melbourne-property-sales.png',
            secondary_image: '',
            links: [{ url: 'https://public.tableau.com/app/profile/imranture/viz/MelbournePropertySales_17051684571690/Dashboard', text: '<i class="fas fa-link"></i> Link' }],
            tags: ['Data Visualization', 'Tableau'],
            shortDescription: 'An interactive dashboard with a detailed visual overview of the city\'s real estate trends, based on historical sales data.',
            description: 'Melbourne Property Sales is an interactive dashboard with a detailed visual overview of the city\'s real estate trends, based on historical sales data. The dashboard offers a range of visualizations, including average property prices over time, distributions of key property features, and regional price comparisons for various housing types. These visualizations highlight patterns in the Melbourne housing market dynamics, such as seasonal pricing trends and the common characteristics of sold properties.'
        },
        'early-warning-system': {
            title: 'Advancing Water Safety : Early Warning System to Monitor and Evaluate Drinking Water Quality',
            cover_image: '/image/early-warning-system.png',
            primary_image: '/image/early-warning-system.png',
            secondary_image: '',
            links: [{ url: '', text: '' }],
            tags: ['Anomaly Detection', 'Statistical Quality Control'],
            shortDescription: 'An hybrid approach to monitor and detect unexpected levels of multiple critical parameters.',
            description: 'An early warning system was developed that can enhance the safety and quality of drinking water in Turkiye by identifying hazardous contaminants such as E. coli O157, anthrax, and ricin. Utilizing a hybrid approach that integrates various statistical methods like Z-score analysis, moving averages, control charts, and weighted voting, the system was designed to provide real-time monitoring and detect unexpected levels of multiple parameters, including temperature, pH, total organic carbon, conductivity, oxidation-reduction potential, free chlorine, and dissolved oxygen.<br><br>The idea with employing a multi-tiered approach is to facilitate early intervention for minor deviations while enabling immediate action for more severe anomalies. It has the potential for wide-ranging applications, not just limited to municipal water treatment plants but also extending to main storage and distribution lines, thereby serving as a critical tool with the capability to safeguard public health and environmental integrity.'
        },
        'pdf4u': {
            title: 'pdf4u: Web-Based PDF Management Toolkit App',
            cover_image: '/image/pdf4u.png',
            primary_image: '/image/pdf4u.png',
            secondary_image: '',
            links: [{ url: 'https://pdf4u.onrender.com/', text: '<i class="fas fa-link"></i> Link' }],
            tags: ['Web Development', 'HTML', 'CSS', 'JavaScript', 'Flask'],
            shortDescription: 'A versatile web-based PDF management toolkit app.',
            description: 'pdf4u is a versatile web-based PDF management toolkit app designed to handle a wide range of PDF operations, including merging, splitting, rotating, and extracting pages from PDF files. Developed using Flask for the backend, the application provides a user-friendly interface built with HTML, CSS, and JavaScript. Users can easily upload and manipulate files using an intuitive drag-and-drop feature. The toolkit is designed for extensibility, with additional functionalities like converting images to PDFs and more in development. This project demonstrates full-stack development skills, utilizing Python, Flask, and modern web technologies to create an efficient and robust tool for PDF solutions.'
        },
        'durcalc': {
            title: 'DurCalc : Hassle-Free Calculation of Date and Time Durations',
            cover_image: '/image/durcalc.png',
            primary_image: '/image/durcalc.png',
            secondary_image: '',
            links: [{ url: 'https://github.com/imranture/durcalc', text: '<i class="fas fa-link"></i> Link' }],
            tags: ['Web Development'],
            shortDescription: 'A user-friendly web app to calculate the duration between dates and/or times.',
            description: 'DurCalc is a web app designed to effortlessly calculate the duration between dates and/or times. With its user-friendly interface and intuitive functionality, DurCalc streamlines the process and calculates durations without any fuss.'
        },
        // Add more projects as needed

    };

    // Generate project list on home page
    const projectListContainer = document.querySelector('.content');
    if (projectListContainer) {
        Object.keys(projects).forEach(id => {
            const project = projects[id];
            const projectItem = `
                <div class="item">
                    <a href="/project.html?id=${id}"><img src="${project.cover_image}" alt="${project.title}"></a>
                    <a href="/project.html?id=${id}"><h3>${project.title}</h3></a>
                    <!-- <div class="tags">
                        ${project.tags.map(tag => `<span>${tag}</span>`).join(' ')}
                    </div> -->
                    <p>${project.shortDescription}</p>
                    <a class="weblink" href="/project.html?id=${id}">Read more &#8594;</a>
                </div>
            `;
            projectListContainer.innerHTML += projectItem;
        });
    }

    // Load project content on detail page
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');
    if (projectId) {
        // Clone the narrow column content from the home page when on the project detail page
        fetch('/index.html')
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, 'text/html');

                const narrowContent = doc.querySelector('#narrow-column').innerHTML;
                document.getElementById('narrow-column').innerHTML = narrowContent;

                // Initialize email link after content is loaded
                initializeEmailLink();

                // Now load the project content
                const project = projects[projectId];
                if (project) {
                    const content = `
                    <div id="project-section">
                        <title>${project.title}</title>
                        <h1 class="project-heading">${project.title}</h1>
                        <h4>Description</h4>
                        <p class="project-description">${project.description}</p>
                        <div id="image-container">
                            <img id="primary-image" src="${project.primary_image}" alt="${project.title}">
                            <img id="secondary-image" src="${project.secondary_image}" alt="">
                        </div>  

                        ${project.links.filter(link => link.url && link.text).length ? `
                            <h4>Links</h4>
                            <div class="project-links">
                                ${project.links.map(link => `<a class="weblink" href="${link.url}" target="_blank" rel="noopener noreferrer">${link.text}</a>`).join(' ')} 
                            </div>` : ''}

                        <h4>Related Topics</h4>
                        <div class="tags">
                            ${project.tags.map(tag => `<span>${tag}</span>`).join(' ')}
                        </div>
                    </div>    
                    `;
                    document.getElementById('project-content').innerHTML = content;

                    // Add the new JavaScript code to handle the images
                    const primaryImage = document.getElementById('primary-image');
                    const secondaryImage = document.getElementById('secondary-image');
                    const imageContainer = document.getElementById('image-container');

                    // Check if the secondary image has a valid src
                    if (project.secondary_image && project.secondary_image.trim() !== '') {
                        imageContainer.classList.add('double-image');
                        secondaryImage.style.display = 'block';
                        secondaryImage.alt = `${project.title} - Secondary Image`;
                    } else {
                        imageContainer.classList.add('single-image');
                        secondaryImage.style.display = 'none';
                        secondaryImage.alt = ''; // Clear alt text if no secondary image
                    }
                }
            });
    }

    // Initialize email link on the home page
    initializeEmailLink();

    // Initialize and set the theme
    initializeTheme();

    // Listen for toggle switch change
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', function (e) {
            setTheme(e.target.checked ? 'dark' : 'light');
        });
    }

    // Update copyright year automatically
    var currentYear = new Date().getFullYear();
    document.getElementById("copyright-year").innerText = currentYear;
});
