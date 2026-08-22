/**
 * Projects Data - Centralized source of truth for portfolio projects
 * This file is loaded before main.js and project-loader.js
 */

const PROJECTS_DATA = {
    'gemba-pipeline': {
    title: 'Gemba AI Pipeline: LLM-Structured Store Feedback Across 60 Countries',
    subtitle: 'Turning Scattered Store-Floor Feedback into Queryable Signals',
    primary_image: '/image/gemba-pipeline.png',
    secondary_image: null,
    links: [],
    tags: ['C#', '.NET', 'Google BigQuery', 'Gemini LLM', 'Multimodal AI', 'Data Pipeline'],

meta: {
    type: 'Enterprise Data Pipeline',
    domain: 'Retail Merchandising & Planning',
    focus: 'BigQuery-Native Multimodal Extraction'
},
description: 'A pipeline that reads what people report from the store floor — what\'s selling, what\'s missing, what customers are asking for — across 1,200+ stores in nearly 60 countries, and turns it into structured data merchandising and planning teams can query. Reports arrive as free text with photos attached, and the pipeline reads both, producing 1,300+ demand signals a day from material that used to be read by hand.',
    sections: [
        {
            heading: 'Problem',
            body: 'Employees working in or visiting stores report what\'s selling, what\'s missing, and what customers are asking for — through three channels: emails, an in-house mobile app, and video walkthroughs. Each channel produced feedback that merchandising and planning teams had to read and categorize by hand, with no shared structure across the three sources.<br><br><strong>Goal:</strong> Consolidate all three channels into one structured, queryable table of demand signals — without a human opening every report.'
        },
        {
            heading: 'Approach',
            body: 'We built a .NET batch orchestrator that drives a multi-stage BigQuery pipeline for each feedback channel, embedding every extraction and classification step as a BigQuery <code>AI.GENERATE</code> call directly inside the SQL — letting BigQuery itself reason over each report as part of the pipeline. Attached photos are read alongside the text rather than discarded, because the picture often carries the detail the sentence leaves out.<br><br>Structuring the input mattered as much as structuring the output. Reporters were given a four-question convention — where, when, what product, what happened — that maps onto the fields the pipeline needs, so most reports arrive already carrying what the extraction depends on.'
        },
        {
            heading: 'System Architecture',
            body: 'Each report moves through persisted, resumable stages. <strong>Structure</strong> pulls one or more distinct pieces of feedback out of each raw report, filtering out irrelevant text — like email signatures and reply-chain clutter — that would otherwise get mistaken for real feedback. <strong>Hierarchy</strong> maps free-text product mentions onto the merchandising taxonomy. <strong>Context</strong> classifies the sentiment and topic of each item, such as high demand, a stock gap, or a quality complaint. <strong>Range</strong> validates product attributes like color and material against a bilingual reference list. A final consolidation step then joins everything against store and product master data and writes the finished record. Because every stage\'s output is persisted, a failed or interrupted run resumes exactly where it left off instead of reprocessing from scratch.',
            checklist: [
                { title: 'Multichannel ingestion', description: 'Text and photos are pulled from three channels — emails, an in-house mobile app, and video walkthroughs.'},                
                { title: 'LLM-native structuring', description: 'Extraction and classification run as LLM calls inside BigQuery itself, turning free-text reports into 1,300+ structured demand signals daily.' },
                { title: 'Validation safety net', description: 'A second pass cross-checks the LLM\'s taxonomy and hierarchy choices against canonical reference tables, silently reverting to the trusted value whenever the model\'s answer doesn\'t match.' },
                { title: 'Correction loop', description: 'Reports missing a required field — location, date, product, or observation — trigger an automatic reply asking the sender for it, framed to staff as data-quality feedback rather than a rejection.' },
                { title: 'Rollout and enablement', description: 'Training material shipped alongside the system taught employees the reporting convention across nearly 60 countries, so data quality was designed for at the source rather than patched downstream.' }
            ],
            image: '/image/gemba-pipeline-architecture.svg',
        },
        {
            heading: 'Downstream',
            body: 'The structured table this pipeline produces is what the <strong>Gemba AI Chatbot</strong> queries. This project makes the feedback answerable; the chatbot makes it askable in plain language.'
        }
    ]
},
    'gemba-chatbot': {
    title: 'Gemba AI Chatbot: A Text-to-SQL Agent for Store and Product Insights',
    subtitle: 'Natural-language questions to grounded, real-time answers over BigQuery',
    primary_image: '/image/gemba-chatbot.png',
    secondary_image: null,
    links: [],
    tags: ['Python', 'FastAPI', 'Agentic AI', 'Gemini Data Analytics Agent', 'Google BigQuery', 'MongoDB', 'ClickHouse', 'Server-Sent Events', 'CQRS'],
    meta: {
        type: 'Conversational AI Service',
        domain: 'Retail Merchandising & Planning',
        focus: 'Agentic Text-to-SQL'
    },
    description: 'A chatbot that lets merchandising and planning teams ask about store and product performance in plain Turkish and get an answer from the company\'s data in seconds. The agent works out what the question means in the retailer\'s own vocabulary, queries the data warehouse, checks what comes back before answering, and shows its progress as it goes — so teams get answers they can act on without waiting on an analyst or knowing any SQL.',
    sections: [
        {
            heading: 'Problem',
            body: 'Merchandising and planning teams at one of Turkey\'s leading fashion retailers needed answers to plain-language questions spanning store feedback, sales, and product performance. That data lives in BigQuery tables with messy, real-world characteristics: Turkish-locale casing quirks, heavily space-padded text fields, and product-hierarchy columns that are frequently blank.<br><br>An LLM querying this data will happily return a confident answer built on a silently failed string match. The interface had to be right, not just fluent.<br><br><strong>Goal:</strong> Let business users ask in Turkish and get instant answers they can act on without independently verifying them.'
        },
        {
            heading: 'Approach',
            body: 'The agent runs a loop rather than a single call. It resolves the incoming question against the conversation so far, grounds it in a glossary that maps this retailer\'s business vocabulary onto real columns and values, injects explicit correctness rules for the known data-quality traps, calls its NL→SQL tool, and inspects what comes back — retrying once when the result is empty or the call fails, and streaming progress throughout.<br><br>Google\'s Data Analytics Agent serves as the NL→SQL tool inside that loop. The engineering work is the loop around it: the grounding layer that decides what the tool is asked, the state that makes follow-up questions resolvable, the resilience that handles a bad response, and the transport that keeps a slow query from feeling broken.'
        },
        {
            heading: 'System Architecture',
            body: 'A request enters through a thin router layer, is dispatched to a query handler holding the agent logic, and reaches external services only through infrastructure clients — so grounding changes never touch transport code, and vice versa. Everything downstream of that split exists to make a probabilistic system behave predictably enough for daily use.',
            image: '/image/gemba-chatbot-architecture.svg',
            checklist: [
                { title: 'Grounding layer', description: 'A domain glossary and explicit correctness rules are injected into every tool call, mapping business vocabulary onto real columns and neutralizing Turkish casing, padded text, and null hierarchies.' },
                { title: 'Conversation state', description: 'Chat history persists in MongoDB and loads per session, so follow-up questions resolve against what was already asked instead of starting cold.' },
                { title: 'Observe-and-retry loop', description: 'The agent inspects each tool response and retries once on an empty answer or server error before surfacing a failure.' },
                { title: 'Layered CQRS pipeline', description: 'Routers, query handlers, and infrastructure clients stay cleanly separated, keeping API surface, agent logic, and external calls independently changeable.' },
                { title: 'Real-time progress streaming', description: 'Server-Sent Events push progress as the agent works, so longer queries never leave the user facing a blank screen.' },
                { title: 'Interaction logging', description: 'Every question, answer, generated SQL, and timing lands in ClickHouse, making output quality reviewable rather than anecdotal.' }
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
        title: 'E4 TimeStamper: Timestamping Wearable Sensor Data for Researchers',
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
        title: 'BBL-PhysioDB: Research Database for Multi-Session Entrepreneurship Studies',
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
        title: 'Early Warning System to Monitor and Evaluate Drinking Water Quality',
        primary_image: '/image/early-warning-system.png',
        secondary_image: null,
        links: [],
        tags: ['Anomaly Detection', 'Statistical Quality Control'],
        description: 'An advanced water safety system was developed to enhance the safety and quality of drinking water in Türkiye by identifying hazardous contaminants. Utilizing a hybrid approach that integrates various statistical methods like Z-score analysis, moving averages, control charts, and weighted voting, the system provides real-time monitoring and detects unexpected levels of temperature, pH, total organic carbon, conductivity, oxidation-reduction potential, free chlorine, and dissolved oxygen. The multi-tiered approach facilitates early intervention for minor deviations while enabling immediate action for more severe anomalies.'
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
