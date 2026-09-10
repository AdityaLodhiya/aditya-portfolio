// Projects data structure
// Each project should support: id, title, slug, missionNumber, status, type, shortDescription,
// objective, problem, stack, data, architecture, implementation, results, challenges,
// lessons, futureWork, github, demo

export const projects = [
  {
    id: "cricintel",
    slug: "cricintel",
    missionNumber: "01",
    title: "CricIntel",

    status: "ACTIVE",

    type: "AI / DATA / FULL STACK",

    shortDescription:
      "An AI-powered cricket analytics and prediction platform that combines historical cricket data, machine learning, Django REST APIs, and a React interface to generate player, matchup, venue, and Playing XI insights.",

    objective:
      "Build a full-stack cricket intelligence platform that transforms historical cricket data into practical match and player insights across T20, ODI, and Test formats.",

    problem:
      "Cricket statistics are often available as disconnected datasets and dashboards. CricIntel attempts to bring historical data processing, machine learning predictions, analytics, and interactive visualization into one system.",

    approach:
      "The system follows an end-to-end pipeline: historical cricket data is cleaned and transformed through feature engineering, format-specific machine learning models are trained offline, serialized models are loaded by the Django backend for inference, and the React frontend consumes REST APIs to present predictions and analytics.",

    stack: {
      frontend: [
        "React",
        "Vite",
        "JavaScript",
        "Tailwind CSS",
        "Plotly"
      ],

      backend: [
        "Python",
        "Django",
        "Django REST Framework",
        "REST APIs"
      ],

      machineLearning: [
        "XGBoost",
        "Scikit-learn",
        "Pandas",
        "NumPy",
        "Joblib"
      ],

      data: [
        "CSV",
        "JSON",
        "Historical cricket data"
      ]
    },

    data:
      "Historical cricket data covering T20, ODI, and Test formats, including player, match, venue, and performance information. The pipeline performs data cleaning, match-level processing, player-level aggregation, feature engineering, and format-specific dataset preparation.",

    architecture:
      "Historical Cricket Data → Data Cleaning → Match/Player Processing → Feature Engineering → Offline XGBoost Training → Saved Joblib Models → Django REST API → React Frontend",

    implementation:
      "The system separates model training from application runtime. XGBoost models are trained offline and saved as Joblib artifacts. During runtime, the Django backend loads the trained models, prepares features, performs inference, and returns predictions and analytics through REST APIs. The React frontend handles interaction, state, visualization, and presentation.",

    results:
      "The repository documents support for three cricket formats, 15 trained XGBoost models, 8,000+ historical matches, 3,000+ players, and 500+ venues. These figures are project coverage metrics documented in the repository rather than claims of model accuracy.",

    challenges:
      [
        "Working with historical cricket datasets across multiple formats.",
        "Maintaining consistency between training-time preprocessing and runtime inference.",
        "Separating offline model training from production inference.",
        "Connecting machine-learning inference with a full-stack web application.",
        "Handling situations where sufficient historical data is unavailable without fabricating results."
      ],

    lessons:
      [
        "Machine learning becomes much more useful when integrated into a complete application rather than isolated inside notebooks.",
        "Training and runtime inference should be separated when deploying trained models.",
        "The backend should own data processing, feature preparation, inference, and statistical logic.",
        "Real data quality and evaluation methodology matter when interpreting model metrics."
      ],

    futureWork:
      [
        "Live cricket data integration",
        "Real-time weather integration",
        "Player injury and availability data",
        "More granular ball-by-ball matchup modelling",
        "Automated model retraining pipelines",
        "Model monitoring and drift detection",
        "Advanced explainability using SHAP"
      ],

    github: "https://github.com/AdityaLodhiya/CricIntel",

    demo: null
  },
  {
    id: "gis",
    slug: "geospatial-site-readiness-analyzer",
    missionNumber: "02",
    title: "GeoSpatial Site Readiness Analyzer",

    status: "COMPLETED",

    type: "GIS / MACHINE LEARNING / FULL STACK",

    shortDescription:
      "An interactive GIS and machine learning platform for evaluating, comparing, and analyzing site suitability across Ahmedabad for business and infrastructure use cases.",

    objective:
      "Build a decision-support platform that combines geospatial data, machine learning, spatial analysis, and interactive mapping to evaluate location suitability.",

    problem:
      "Choosing a suitable location for a business or infrastructure project requires evaluating multiple geographic and environmental factors together. Traditional GIS tools provide maps and raw layers, but users still need to manually interpret those factors.",

    approach:
      "The system divides Ahmedabad into spatial units using H3 indexing, extracts spatial features, applies specialized machine learning models for different use cases, and exposes the resulting analysis through an interactive map and REST API.",

    contribution:
      "Collaboratively built as part of a 3-day hackathon.",

    stack: {
      frontend: [
        "React 19",
        "Vite",
        "JavaScript / JSX",
        "MapLibre GL",
        "Mapbox Geocoder",
        "Turf.js"
      ],

      backend: [
        "Python",
        "FastAPI",
        "Pydantic",
        "SQLAlchemy",
        "Pandas",
        "NumPy",
        "HTTPX",
        "Joblib"
      ],

      machineLearning: [
        "XGBoost",
        "Scikit-learn",
        "KMeans",
        "Feature Scaling"
      ],

      geospatial: [
        "PostGIS",
        "H3",
        "GeoJSON",
        "OSRM"
      ]
    },

    data:
      "The system uses spatial features including population, road density, POI count, building density, building area, competitor count, flood risk, and air quality. The repository also contains Ahmedabad boundary data, roads, buildings, land use, water bodies, competitors, air-quality data, and a consolidated feature dataset.",

    architecture:
      "React + Vite Interactive GIS UI → FastAPI REST Backend → XGBoost / KMeans Model Layer + PostgreSQL / PostGIS / H3 Spatial Data → Location Insights",

    implementation:
      "The platform provides interactive map-based site analysis across five use cases: retail, warehouse, EV charging, telecom tower, and renewable energy. It also supports location comparison, polygon analysis, hotspot analysis, drive-time isochrones, accessibility analysis, spatial statistics, and JSON/CSV export.",

    results:
      "The system contains five specialized machine learning use cases and a KMeans clustering model operating on 10,320 H3 hexagons. The stored KMeans model reports a silhouette score of 0.308 and a Calinski-Harabasz score of 4521.16.",

    challenges: [
      "Combining multiple spatial datasets into a common feature representation.",
      "Connecting geospatial analysis and machine learning with an interactive web interface.",
      "Supporting different location-suitability models for different use cases.",
      "Handling spatial operations such as polygon analysis, accessibility, hotspots, and drive-time isochrones."
    ],

    lessons: [
      "Geospatial problems require careful feature engineering and spatial representation.",
      "Machine learning can become more useful when combined with transparent feature-level analysis.",
      "A full-stack GIS system requires coordination between frontend mapping, backend APIs, spatial databases, and ML models.",
      "Model evaluation metrics need to be interpreted within the context of the underlying data and problem."
    ],

    futureWork: [
      "Real-time traffic integration",
      "More detailed socioeconomic datasets",
      "Additional business-specific models",
      "Automated data pipelines",
      "Cloud-hosted spatial databases",
      "Real-time environmental data",
      "Satellite imagery integration",
      "Improved model explainability",
      "Better model calibration and validation"
    ],

    github: "https://github.com/AdityaLodhiya/GIS",

    demo: null
  },
  {
    id: "flowzen",
    slug: "flowzen",
    missionNumber: "03",
    title: "FlowZen",

    status: "COMPLETED",

    type: "WORKFLOW AUTOMATION / BACKEND / SYSTEMS",

    shortDescription:
      "A self-hosted workflow automation platform for connecting applications, APIs, databases, triggers, and scheduled tasks into executable automation pipelines.",

    objective:
      "Build a self-hosted automation platform capable of orchestrating multi-step workflows, handling triggers, scheduling tasks, executing actions, and maintaining workflow state and execution history.",

    problem:
      "Manual repetitive operations often require custom integration code or external automation platforms. FlowZen provides a self-hosted system for connecting APIs, applications, databases, webhooks, and scheduled jobs while retaining control over application data.",

    approach:
      "FlowZen uses Django as the backend and workflow engine, PostgreSQL for persistent storage, Redis as the task broker, Celery workers for asynchronous execution, Celery Beat for scheduled triggers, and Django Channels for real-time communication.",

    contribution:
      "Worked on the database layer and database-to-backend integration.",

    stack: {
      backend: [
        "Python",
        "Django",
        "Django REST Framework"
      ],

      database: [
        "PostgreSQL",
        "SQL"
      ],

      taskProcessing: [
        "Celery",
        "Celery Beat",
        "Redis"
      ],

      frontend: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "Django Templates"
      ],

      realtime: [
        "Django Channels",
        "WebSockets"
      ],

      infrastructure: [
        "Docker",
        "Docker Compose"
      ]
    },

    data:
      "PostgreSQL stores workflow definitions, user data, credentials, and execution history. Redis is used as the task broker and for asynchronous workflow execution and state management.",

    architecture:
      "Frontend Interface → Django Backend API → PostgreSQL Database\nExternal Webhooks → Django Backend → Redis → Celery Workers → External APIs\nCelery Beat → Redis → Celery Workers",

    implementation:
      "FlowZen provides workflow creation, trigger-based execution, action pipelines, scheduled tasks, REST and GraphQL API requests, database actions, execution logging, workflow history, error handling, and a visual workflow builder. Celery workers execute queued tasks while the PostgreSQL layer persists workflow and execution state.",

    results:
      "The repository documents a working workflow automation architecture with Django, PostgreSQL, Redis, Celery, Celery Beat, Django Channels, Docker, and a workflow execution engine supporting triggers, actions, scheduling, API integrations, and execution logging.",

    challenges: [
      "Connecting persistent workflow state with asynchronous task execution.",
      "Integrating the database layer with backend workflow logic.",
      "Managing queued tasks through Redis and Celery.",
      "Maintaining execution history and workflow state across asynchronous operations."
    ],

    lessons: [
      "Database design becomes more important as workflow state and execution history become persistent.",
      "Asynchronous systems require clear boundaries between request handling, task queuing, execution, and persistence.",
      "Backend and database integration needs to be designed around the application's actual execution flow rather than treated as an isolated layer."
    ],

    futureWork: [
      "Expanded integrations library",
      "Cloud deployment templates",
      "Advanced authentication",
      "Multi-tenant support",
      "Role-based access control",
      "Additional AI workflow nodes"
    ],

    github: "https://github.com/AdityaLodhiya/FLOWZEN",

    demo: null
  },

  {
    id: "bank-management-system",
    slug: "bank-management-system",
    missionNumber: "04",
    title: "Bank Management System",

    status: "COMPLETED",

    type: "PYTHON / SOFTWARE ARCHITECTURE",

    shortDescription:
      "A modular bank management system built in Python using a service-repository architecture with authentication, transaction processing, and financial modules.",

    objective:
      "Build a modular banking application that separates application responsibilities into reusable layers for authentication, data access, business logic, and user-facing pages.",

    problem:
      "Banking applications involve multiple related operations such as authentication, transactions, and financial workflows. A modular architecture helps separate these responsibilities and keeps the system easier to maintain.",

    approach:
      "The application uses a modular service-repository architecture with separate core, database, page, and utility modules.",

    contribution:
      "Developed the bank management system and its modular application structure.",

    stack: {
      language: [
        "Python"
      ],

      framework: [
        "Streamlit"
      ],

      architecture: [
        "Service-Repository Architecture"
      ],

      application: [
        "Authentication",
        "Transaction Processing",
        "Financial Modules"
      ]
    },

    data:
      "The application contains a dedicated database layer under the BMS/db module. The exact database technology and schema should be documented only if confirmed from the source implementation.",

    architecture:
      "Streamlit Application → Core / Service Layer → Repository / Database Layer",

    implementation:
      "The repository is organized into BMS/core, BMS/db, BMS/pages, BMS/utils, and app.py. This separates application logic, data access, page-level functionality, utilities, and the main application entry point.",

    results:
      "The repository provides a modular Python implementation covering authentication, transaction processing, and financial modules using a service-repository architecture.",

    challenges: [
      "Keeping banking operations separated into maintainable modules.",
      "Separating application/business logic from data-access responsibilities.",
      "Structuring authentication and transaction-related functionality within a modular application."
    ],

    lessons: [
      "Separating business logic from data access makes an application easier to maintain.",
      "Even relatively small applications benefit from clear architectural boundaries.",
      "Financial applications require careful separation between authentication, transactions, and persistence."
    ],

    futureWork: [
      "Expanded financial features",
      "More comprehensive transaction reporting",
      "Improved testing coverage",
      "Production-grade authentication and authorization",
      "Deployment and observability improvements"
    ],

    github: "https://github.com/AdityaLodhiya/bank-management-system-streamlit",

    demo: null
  },
  {
    id: "secure-script",
    slug: "secure-script",
    missionNumber: "05",
    title: "SecureScript",

    status: "COMPLETED",

    type: "SOFTWARE / SYSTEMS",

    shortDescription:
      "A terminal-based paper crypto trading platform built in Java, combining real-time market data, portfolio management, database integration, and secure source-code execution.",

    objective:
      "Build a secure and realistic crypto trading environment where users can register, monitor live cryptocurrency prices, and buy or sell assets using paper funds.",

    problem:
      "Create a realistic crypto trading experience without real-money transactions while maintaining persistent user data, dynamic market information, and protection of the application's source code.",

    approach:
      "Implemented a Java-based terminal trading system with database-backed authentication and asset management, dynamic market data fetched through an API, buy/sell operations, portfolio tracking, and a secure encoded-source execution flow.",

    stack: {
      frontend: ["Terminal / CLI"],
      backend: ["Java"],
      data: ["CoinGecko API", "Database", "Doubly Linked List"]
    },

    data:
      "Real-time cryptocurrency market data for approximately 100 coins fetched dynamically through an API.",

    architecture:
      "Encoded Source → Temporary Decoding → Execution → Auto-Erasure",

    implementation:
      "The system handles authentication and asset balances in a local database. Real-time market prices are fetched via the CoinGecko API. A doubly linked list is used for sorting operations. Finally, the source code runs through an encoded execution flow to prevent unauthorized modifications.",

    results:
      "Built a functional paper-trading platform supporting user authentication, live cryptocurrency data, buying and selling, portfolio management, coin sorting, and persistent database-backed data.",

    challenges: [
      "Managing dynamic market data",
      "Maintaining persistent user and asset information",
      "Implementing efficient coin sorting",
      "Adding security to the source-code execution process"
    ],

    lessons: [
      "Gained practical experience with Java, API integration, and databases",
      "Understood the complexities of data structures like Doubly Linked Lists",
      "Learned about source-code security and designing a realistic trading workflow"
    ],

    futureWork: [
      "Implement blockchain-like transaction recording",
      "Add AI-based price prediction and alerts",
      "Improve the trading interface"
    ],

    github: "https://github.com/AdityaLodhiya/Wallet",

    demo: null
  }
]
export default projects;


// Helper function to get project by slug
export function getProjectBySlug(slug) {
  return projects.find(project => project.slug === slug)
}

// Helper function to get project by ID
export function getProjectById(id) {
  return projects.find(project => project.id === id)
}
