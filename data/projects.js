/**
 * Projects Data - Centralized source of truth for portfolio projects
 * This file is loaded before main.js and project-loader.js
 */

const PROJECTS_DATA = {
    'lcw-gembagpt-pipeline': {
        title: 'LCW GembaGPT Pipeline: LLM-Powered Store Insights Across 60 Countries',
        primary_image: '/image/lcw-gembagpt-pipeline.png',
        secondary_image: null,
        links: [],
        tags: ['C#', '.NET', 'Google BigQuery', 'Gemini LLM', 'Data Pipeline', 'AI'],
        description: 'LC Waikiki has 1,200+ stores across nearly 60 countries, and receives daily feedback on what\'s selling, what\'s missing from shelves, and what customers are asking for through emails, mobile apps, and videos. Merchandising and planning teams had been copying this manually into spreadsheets with no reliable way to act on it at scale.<br><br>To fix this scattered manual workflow, we built an end-to-end automated pipeline — a C#/.NET enterprise orchestrator backed by Google Gemini and BigQuery — that ingests this raw feedback and extracts about 300 structured product intelligence signals daily. If a report can\'t be processed, the system automatically identifies the gap and emails the sender a correction request.'
    },
    'lcw-gembagpt-chatbot': {
        title: 'LCW GembaGPT Chatbot: Text-to-SQL Agent for Reliable Store Insights',
        primary_image: '/image/lcw-gembagpt-chatbot.png',
        secondary_image: null,
        links: [],
        tags: ['Python', 'FastAPI', 'Google BigQuery', 'Gemini API', 'Conversational AI', 'CQRS'],
        description: 'LC Waikiki\'s merchandising and planning teams were sitting on a growing archive of daily store-visit data, but it was scattered across systems with no easy way to see the full picture — trends, signals, or gaps. This made data-driven decisions on product performance, stock availability, and customer demand slow and unreliable.<br><br>To give these teams the answers they need in seconds, we built a conversational AI assistant — a Python/FastAPI service backed by Google Gemini and BigQuery — that lets business users ask questions in plain language and get structured, data-backed answers instantly. Every response is grounded against actual database records, eliminating the risk of AI hallucination and ensuring teams can act on what they see.'
    },
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
    },
};
