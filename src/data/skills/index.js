// Skills data structure
// Each skill should support: id, name, category, projects, relatedSkills, evidence, status

export const skills = [
  // LANGUAGES
  {
    id: 'python',
    name: 'Python',
    category: 'LANGUAGES',
    projects: ['cricintel', 'gis', 'flowzen', 'bank-management-system', 'lab-001', 'lab-002'],
    relatedSkills: ['pandas', 'numpy', 'scikit-learn', 'xgboost', 'django', 'fastapi'],
    evidence: 'Used across data processing, backend APIs, machine learning, and application development.',
    status: 'USED'
  },
  {
    id: 'java',
    name: 'Java',
    category: 'LANGUAGES',
    projects: ['lab-005', 'lab-006', 'lab-007', 'lab-008', 'secure-script'],
    relatedSkills: ['oop', 'arrays', 'console-applications'],
    evidence: 'Used for object-oriented console applications and a terminal-based trading platform.',
    status: 'USED'
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'LANGUAGES',
    projects: ['cricintel', 'gis', 'flowzen', 'lab-001', 'lab-003', 'lab-004'],
    relatedSkills: ['react', 'vite'],
    evidence: 'Used for frontend development and interactive interfaces.',
    status: 'USED'
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'LANGUAGES',
    projects: ['flowzen'],
    relatedSkills: ['postgresql'],
    evidence: 'Used for database queries and data persistence.',
    status: 'USED'
  },

  // FRONTEND
  {
    id: 'react',
    name: 'React',
    category: 'FRONTEND',
    projects: ['cricintel', 'gis'],
    relatedSkills: ['javascript', 'vite'],
    evidence: 'Used for building interactive user interfaces and data visualization.',
    status: 'USED'
  },
  {
    id: 'vite',
    name: 'Vite',
    category: 'FRONTEND',
    projects: ['cricintel', 'gis'],
    relatedSkills: ['react', 'javascript'],
    evidence: 'Used as build tool and development server.',
    status: 'USED'
  },
  {
    id: 'html',
    name: 'HTML',
    category: 'FRONTEND',
    projects: ['lab-001', 'lab-003', 'lab-004', 'flowzen'],
    relatedSkills: ['css', 'javascript'],
    evidence: 'Used for structuring web interfaces.',
    status: 'USED'
  },
  {
    id: 'css',
    name: 'CSS',
    category: 'FRONTEND',
    projects: ['lab-001', 'lab-003', 'lab-004', 'flowzen'],
    relatedSkills: ['html', 'javascript'],
    evidence: 'Used for styling web interfaces.',
    status: 'USED'
  },
  {
    id: 'ejs',
    name: 'EJS',
    category: 'FRONTEND',
    projects: ['lab-004'],
    relatedSkills: ['node-js', 'express'],
    evidence: 'Used for server-side templating in Node.js.',
    status: 'USED'
  },
  {
    id: 'responsive-web-design',
    name: 'Responsive Web Design',
    category: 'FRONTEND',
    projects: ['lab-003'],
    relatedSkills: ['html', 'css'],
    evidence: 'Used for building mobile-friendly vanilla JS interfaces.',
    status: 'USED'
  },
  {
    id: 'tailwind-css',
    name: 'Tailwind CSS',
    category: 'FRONTEND',
    projects: ['cricintel'],
    relatedSkills: ['react'],
    evidence: 'Used for utility-first styling.',
    status: 'USED'
  },
  {
    id: 'streamlit',
    name: 'Streamlit',
    category: 'FRONTEND',
    projects: ['bank-management-system'],
    relatedSkills: ['python'],
    evidence: 'Used for building Python-based web applications.',
    status: 'USED'
  },
  {
    id: 'maplibre-gl',
    name: 'MapLibre GL',
    category: 'FRONTEND',
    projects: ['gis'],
    relatedSkills: ['javascript', 'geojson'],
    evidence: 'Used for interactive mapping and geospatial visualization.',
    status: 'USED'
  },
  {
    id: 'turf-js',
    name: 'Turf.js',
    category: 'FRONTEND',
    projects: ['gis'],
    relatedSkills: ['geojson'],
    evidence: 'Used for geospatial analysis and spatial operations.',
    status: 'USED'
  },

  // BACKEND
  {
    id: 'django',
    name: 'Django',
    category: 'BACKEND',
    projects: ['cricintel', 'flowzen', 'lab-002'],
    relatedSkills: ['python', 'django-rest-framework'],
    evidence: 'Used as web framework, workflow engine, and authentication backend.',
    status: 'USED'
  },
  {
    id: 'flask',
    name: 'Flask',
    category: 'BACKEND',
    projects: ['lab-001'],
    relatedSkills: ['python', 'sqlalchemy'],
    evidence: 'Used for building a web-based inventory management system.',
    status: 'USED'
  },
  {
    id: 'node-js',
    name: 'Node.js',
    category: 'BACKEND',
    projects: ['lab-004'],
    relatedSkills: ['express', 'javascript'],
    evidence: 'Used for server-side JavaScript experiments.',
    status: 'USED'
  },
  {
    id: 'express',
    name: 'Express',
    category: 'BACKEND',
    projects: ['lab-004'],
    relatedSkills: ['node-js'],
    evidence: 'Used for handling HTTP requests in Node.js.',
    status: 'USED'
  },
  {
    id: 'nodemailer',
    name: 'Nodemailer',
    category: 'BACKEND',
    projects: ['lab-004'],
    relatedSkills: ['node-js', 'smtp'],
    evidence: 'Used for sending emails and attachments via Node.js.',
    status: 'USED'
  },
  {
    id: 'multer',
    name: 'Multer',
    category: 'BACKEND',
    projects: ['lab-004'],
    relatedSkills: ['node-js', 'express'],
    evidence: 'Used for multipart file upload handling.',
    status: 'USED'
  },
  {
    id: 'jwt',
    name: 'JWT',
    category: 'BACKEND',
    projects: ['lab-002'],
    relatedSkills: ['django', 'django-rest-framework'],
    evidence: 'Used for stateless token-based authentication.',
    status: 'USED'
  },
  {
    id: 'django-rest-framework',
    name: 'Django REST Framework',
    category: 'BACKEND',
    projects: ['cricintel', 'flowzen', 'lab-002'],
    relatedSkills: ['django', 'python'],
    evidence: 'Used for building REST APIs.',
    status: 'USED'
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'BACKEND',
    projects: ['gis'],
    relatedSkills: ['python'],
    evidence: 'Used for building REST APIs.',
    status: 'USED'
  },
  {
    id: 'rest-apis',
    name: 'REST APIs',
    category: 'BACKEND',
    projects: ['cricintel', 'flowzen'],
    relatedSkills: ['django', 'django-rest-framework', 'fastapi'],
    evidence: 'Used for client-server communication.',
    status: 'USED'
  },

  // DATA / ML
  {
    id: 'pandas',
    name: 'Pandas',
    category: 'DATA / ML',
    projects: ['cricintel', 'gis'],
    relatedSkills: ['python', 'numpy'],
    evidence: 'Used for data manipulation and analysis.',
    status: 'USED'
  },
  {
    id: 'numpy',
    name: 'NumPy',
    category: 'DATA / ML',
    projects: ['cricintel', 'gis'],
    relatedSkills: ['python', 'pandas'],
    evidence: 'Used for numerical computing and array operations.',
    status: 'USED'
  },
  {
    id: 'scikit-learn',
    name: 'Scikit-learn',
    category: 'DATA / ML',
    projects: ['cricintel', 'gis'],
    relatedSkills: ['python', 'xgboost'],
    evidence: 'Used for machine learning model training and preprocessing.',
    status: 'USED'
  },
  {
    id: 'xgboost',
    name: 'XGBoost',
    category: 'DATA / ML',
    projects: ['cricintel', 'gis'],
    relatedSkills: ['scikit-learn', 'python'],
    evidence: 'Used for gradient boosting machine learning models.',
    status: 'USED'
  },
  {
    id: 'kmeans',
    name: 'KMeans',
    category: 'DATA / ML',
    projects: ['gis'],
    relatedSkills: ['scikit-learn'],
    evidence: 'Used for clustering analysis.',
    status: 'USED'
  },
  {
    id: 'joblib',
    name: 'Joblib',
    category: 'DATA / ML',
    projects: ['cricintel', 'gis'],
    relatedSkills: ['python', 'scikit-learn'],
    evidence: 'Used for model serialization and parallel computing.',
    status: 'USED'
  },

  // DATABASES
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'DATABASES',
    projects: ['flowzen', 'lab-002'],
    relatedSkills: ['sql', 'postgis'],
    evidence: 'Used for persistent data storage.',
    status: 'USED'
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'DATABASES',
    projects: ['lab-001'],
    relatedSkills: ['sqlalchemy'],
    evidence: 'Used for relational data storage in CoreInventory.',
    status: 'USED'
  },
  {
    id: 'sqlite',
    name: 'SQLite',
    category: 'DATABASES',
    projects: ['lab-002'],
    relatedSkills: ['django'],
    evidence: 'Used for local data storage in OTP authentication experiment.',
    status: 'USED'
  },
  {
    id: 'sqlalchemy',
    name: 'SQLAlchemy',
    category: 'DATABASES',
    projects: ['lab-001', 'gis'],
    relatedSkills: ['python', 'mysql'],
    evidence: 'Used as ORM for database interactions.',
    status: 'USED'
  },
  {
    id: 'postgis',
    name: 'PostGIS',
    category: 'DATABASES',
    projects: ['gis'],
    relatedSkills: ['postgresql', 'geojson'],
    evidence: 'Used for spatial data storage and geospatial queries.',
    status: 'USED'
  },

  // SYSTEMS / INFRASTRUCTURE
  {
    id: 'redis',
    name: 'Redis',
    category: 'SYSTEMS / INFRASTRUCTURE',
    projects: ['flowzen'],
    relatedSkills: ['celery'],
    evidence: 'Used as task broker and cache.',
    status: 'USED'
  },
  {
    id: 'celery',
    name: 'Celery',
    category: 'SYSTEMS / INFRASTRUCTURE',
    projects: ['flowzen'],
    relatedSkills: ['redis', 'python'],
    evidence: 'Used for asynchronous task processing.',
    status: 'USED'
  },
  {
    id: 'celery-beat',
    name: 'Celery Beat',
    category: 'SYSTEMS / INFRASTRUCTURE',
    projects: ['flowzen'],
    relatedSkills: ['celery'],
    evidence: 'Used for scheduled task execution.',
    status: 'USED'
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'SYSTEMS / INFRASTRUCTURE',
    projects: ['flowzen'],
    relatedSkills: ['docker-compose'],
    evidence: 'Used for containerization.',
    status: 'USED'
  },
  {
    id: 'docker-compose',
    name: 'Docker Compose',
    category: 'SYSTEMS / INFRASTRUCTURE',
    projects: ['flowzen'],
    relatedSkills: ['docker'],
    evidence: 'Used for multi-container orchestration.',
    status: 'USED'
  },
  {
    id: 'websockets',
    name: 'WebSockets',
    category: 'SYSTEMS / INFRASTRUCTURE',
    projects: ['flowzen'],
    relatedSkills: ['django-channels'],
    evidence: 'Used for real-time communication.',
    status: 'USED'
  },
  {
    id: 'django-channels',
    name: 'Django Channels',
    category: 'SYSTEMS / INFRASTRUCTURE',
    projects: ['flowzen'],
    relatedSkills: ['django', 'websockets'],
    evidence: 'Used for real-time WebSocket connections.',
    status: 'USED'
  },
  {
    id: 'otp-authentication',
    name: 'OTP Authentication',
    category: 'SYSTEMS / INFRASTRUCTURE',
    projects: ['lab-002'],
    relatedSkills: ['smtp', 'passwordless-authentication'],
    evidence: 'Used for secure one-time password verification flow.',
    status: 'USED'
  },
  {
    id: 'passwordless-authentication',
    name: 'Passwordless Auth',
    category: 'SYSTEMS / INFRASTRUCTURE',
    projects: ['lab-002'],
    relatedSkills: ['otp-authentication'],
    evidence: 'Used for email-based login without a password.',
    status: 'USED'
  },
  {
    id: 'smtp',
    name: 'SMTP / Email',
    category: 'SYSTEMS / INFRASTRUCTURE',
    projects: ['lab-002', 'lab-004'],
    relatedSkills: ['otp-authentication', 'nodemailer'],
    evidence: 'Used for sending OTPs and email attachments.',
    status: 'USED'
  },

  // GEOSPATIAL
  {
    id: 'h3',
    name: 'H3',
    category: 'GEOSPATIAL',
    projects: ['gis'],
    relatedSkills: ['geojson'],
    evidence: 'Used for spatial indexing and hexagonal grid systems.',
    status: 'USED'
  },
  {
    id: 'geojson',
    name: 'GeoJSON',
    category: 'GEOSPATIAL',
    projects: ['gis'],
    relatedSkills: ['h3', 'postgis'],
    evidence: 'Used for geospatial data format.',
    status: 'USED'
  },
  {
    id: 'osrm',
    name: 'OSRM',
    category: 'GEOSPATIAL',
    projects: ['gis'],
    relatedSkills: ['geojson'],
    evidence: 'Used for routing and travel time calculations.',
    status: 'USED'
  },

  // ARCHITECTURE
  {
    id: 'service-repository-architecture',
    name: 'Service-Repository Architecture',
    category: 'ARCHITECTURE',
    projects: ['bank-management-system'],
    relatedSkills: ['python'],
    evidence: 'Used for separating business logic from data access.',
    status: 'USED'
  },
  {
    id: 'oop',
    name: 'OOP',
    category: 'ARCHITECTURE',
    projects: ['lab-005', 'lab-006', 'lab-007'],
    relatedSkills: ['java'],
    evidence: 'Used for structuring classes, inheritance, and encapsulation.',
    status: 'USED'
  },
  {
    id: 'arrays',
    name: 'Arrays',
    category: 'ARCHITECTURE',
    projects: ['lab-005', 'lab-006', 'lab-008'],
    relatedSkills: ['java', '2d-arrays'],
    evidence: 'Used for data management and state tracking in console applications.',
    status: 'USED'
  },
  {
    id: '2d-arrays',
    name: '2D Arrays',
    category: 'ARCHITECTURE',
    projects: ['lab-008'],
    relatedSkills: ['arrays', 'game-logic'],
    evidence: 'Used for representing the game board in Tic-Tac-Toe.',
    status: 'USED'
  },
  {
    id: 'crud',
    name: 'CRUD',
    category: 'ARCHITECTURE',
    projects: ['lab-005', 'lab-006'],
    relatedSkills: ['java', 'arrays'],
    evidence: 'Used for implementing data management workflows.',
    status: 'USED'
  },
  {
    id: 'console-applications',
    name: 'Console Applications',
    category: 'ARCHITECTURE',
    projects: ['lab-005', 'lab-006', 'lab-007', 'lab-008', 'secure-script'],
    relatedSkills: ['java'],
    evidence: 'Used for building terminal-based user interfaces.',
    status: 'USED'
  },
  {
    id: 'game-logic',
    name: 'Game Logic',
    category: 'ARCHITECTURE',
    projects: ['lab-008'],
    relatedSkills: ['java', '2d-arrays'],
    evidence: 'Used for implementing turn-based game mechanics.',
    status: 'USED'
  }
]

// Helper function to get skill by ID
export function getSkillById(id) {
  return skills.find(skill => skill.id === id)
}

// Helper function to get skills by category
export function getSkillsByCategory(category) {
  return skills.filter(skill => skill.category === category)
}

// Helper function to get skills by project
export function getSkillsByProject(projectId) {
  return skills.filter(skill => skill.projects.includes(projectId))
}

export default skills
