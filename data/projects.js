/**
 * Projects Data - Centralized source of truth for portfolio projects
 * This file is loaded before main.js and project-loader.js
 */

const PROJECTS_DATA = {
    'lcw-gembagpt-pipeline': {
        title: 'Gemba AI Pipeline: LLM-Structured Store Feedback Across 60 Countries',
        subtitle: 'Turning Scattered Store-Floor Feedback into Structured Demand Signals',
        primary_image: '/image/lcw-gembagpt-pipeline.png',
        secondary_image: null,
        links: [],
        tags: ['C#', '.NET', 'Google BigQuery', 'Gemini LLM', 'Data Pipeline', 'AI'],
        meta: {
            type: 'Enterprise Data Pipeline',
            domain: 'Retail Merchandising & Planning',
            focus: 'BigQuery-Native LLM Extraction'
        },
        description: 'A production BigQuery pipeline that runs LLM extraction and validation natively inside SQL to turn daily store-floor feedback from 1,200+ stores across nearly 60 countries into structured, queryable demand signals.',
        sections: [
            {
                heading: 'Problem',
                body: 'Store employees report what\'s selling, what\'s missing, and what customers are asking for through three disconnected channels — emails, an in-house mobile app, and video walkthroughs. Each channel produced free-text feedback that merchandising and planning teams had to read and categorize by hand, with no shared structure across the three sources.<br><br><strong>Goal:</strong> Consolidate all three feedback channels into one structured, queryable table of demand signals — without a human reading every message.'
            },
            {
                heading: 'Approach',
                body: 'We built a .NET batch orchestrator that drives a multi-stage BigQuery pipeline for each feedback channel, embedding every extraction and classification step as a BigQuery <code>AI.GENERATE</code> call directly inside the SQL — letting BigQuery itself reason over each report as part of the pipeline.'
            },
            {
                heading: 'System Architecture',
                body: 'Each report moves through persisted, resumable stages. <strong>Structure</strong> pulls one or more distinct pieces of feedback out of each raw report, filtering out irrelevant text — like email signatures and reply-chain clutter — that would otherwise get mistaken for real feedback. <strong>Hierarchy</strong> maps free-text product mentions onto the merchandising taxonomy. <strong>Context</strong> classifies the sentiment and topic of each item, such as high demand, a stock gap, or a quality complaint. <strong>Range</strong> validates product attributes like color and material against a bilingual reference list. A final consolidation step then joins everything against store and product master data and writes the finished record. Because every stage\'s output is persisted, a failed or interrupted run resumes exactly where it left off instead of reprocessing from scratch.',
                checklist: [
                    { title: 'Multi-channel ingestion', description: 'Feedback is pulled from three channels — emails, an in-house mobile app, and video walkthroughs — into a shared staging pipeline.' },
                    { title: 'LLM-native structuring', description: 'Extraction and classification run as LLM calls inside BigQuery itself, turning free-text reports into 1,300+ structured demand signals daily.' },
                    { title: 'Validation safety net', description: 'A second pass cross-checks the LLM\'s taxonomy and hierarchy choices against canonical reference tables, silently reverting to the trusted value whenever the model\'s answer doesn\'t match.' },
                    { title: 'Correction loop', description: 'Reports missing a required field (store, product category, or timeframe) are automatically flagged, and a correction-request email is sent back to the sender.' }
                ]
            }
        ]
    },
    'lcw-gembagpt-chatbot': {
        title: 'Gemba AI Chatbot: A Grounded Text-to-SQL Agent for Store Insights',
        subtitle: 'Turning Natural-Language Questions into Grounded, Real-Time Store Insights',
        primary_image: '/image/lcw-gembagpt-chatbot.png',
        secondary_image: null,
        links: [],
        tags: ['Python', 'FastAPI', 'Google BigQuery', 'Gemini API', 'Conversational AI', 'CQRS'],
        meta: {
            type: 'Conversational AI Service',
            domain: 'Retail Merchandising & Planning',
            focus: 'Text-to-SQL Agent'
        },
        description: 'A Turkish-language text-to-SQL agent, backed by a FastAPI service, that gives business users instant, correctly grounded answers about store performance straight from BigQuery — engineered with the reliability, correctness, and observability a natural-language interface needs to run against real, messy production data.',
        sections: [
            {
                heading: 'Problem',
                body: 'Merchandising and planning teams at one of Turkey\'s leading fashion retailers needed answers to plain-language questions about store performance — but the underlying feedback and sales data live in BigQuery tables with messy, real-world characteristics: Turkish-locale casing quirks, heavily space-padded text fields, and product-hierarchy columns that are frequently blank. A natural-language interface over this data had to get answers right despite the mess, not just sound plausible.<br><br><strong>Goal:</strong> Let business users ask questions in Turkish and get instant, correctly grounded answers — without data quality issues silently producing a wrong but confident-sounding response.'
            },
            {
                heading: 'Approach',
                body: 'We engineered the domain-grounding and reliability layer that powers this agent — prompt and glossary design that keeps every answer grounded in real data, plus the production-grade reliability (retries, real-time progress streaming, correctness rules) a natural-language interface needs before real users can trust it. It\'s exposed to the UI as a streaming, CQRS-style query pipeline over Gemini and BigQuery.'
            },
            {
                heading: 'System Architecture',
                body: 'Requests flow through a CQRS-style pipeline — routers, then query handlers, then infrastructure clients — keeping the API surface, domain logic, and external service calls cleanly separated. Because the underlying data has real-world text-quality issues that could otherwise produce a wrong but confident-sounding answer, we encoded explicit correctness rules into the instruction layer rather than trusting the model to catch them. Requests also retry once on transient empty-answer or server errors, and stream progress to the client over Server-Sent Events so users see the agent working instead of staring at a blank screen during longer queries.',
                image: '/image/lcw-gembagpt-chatbot-architecture.svg',
                checklist: [
                    { title: 'Layered CQRS pipeline', description: 'Requests flow through routers, then query handlers, then infrastructure clients, keeping the API surface, domain logic, and external service calls cleanly separated.' },
                    { title: 'Turkish-text correctness', description: 'Explicit data-quality rules stop Turkish-locale text quirks from silently producing a wrong but confident-sounding answer.' },
                    { title: 'Resilience layer', description: 'Requests retry once on transient empty-answer or server errors before failing back to the user.' },
                    { title: 'Real-time progress streaming', description: 'Progress events stream to the client over Server-Sent Events, so users see the agent working instead of staring at a blank screen during longer queries.' }
                ]
            }
        ]
    },
    'pia-price-intelligence': {
    title: 'PIA: Automated Price Intelligence Dashboard for Turkish Fashion Retail',
    primary_image: '/image/pia-price-tracker-for-turkish-fashion-retail.png',
    secondary_image: null,
    links: [
        { url: 'https://pia-price-tracker.vercel.app', text: 'Dashboard' },
    ],
    tags: ['Python', 'Playwright', 'Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'GitHub Actions', 'Vercel'],
    description: 'Turkish fashion retailers frequently adjust prices across thousands of SKUs — making it difficult to tell whether a displayed discount reflects a genuine price drop or simply an inflated original price.<br><br>To investigate this, I built PIA (Price Intelligence App) — an end-to-end automated pipeline that scrapes publicly listed prices and product data across 7 categories daily using Python and Playwright, stores every price snapshot in a Supabase PostgreSQL database, and surfaces the data through a deployed Next.js dashboard. Discounts are calculated against each product\'s 30-day price high rather than the store-reported original price, exposing artificial markups that would otherwise go unnoticed.<br><br>The dashboard tracks 1,800+ products across three stores, with real-time filtering by store and category, a price history chart per product, and analytics including discount coverage, price segment distribution, and category depth comparisons. The scraper runs automatically every morning via GitHub Actions and the dashboard is hosted on Vercel.'
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
