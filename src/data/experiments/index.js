/**
 * Experiments data structure
 * 
 * Represents prototypes, tests, and research in the LAB section.
 * 
 * Schema:
 * {
 *   id: string,                 // Unique identifier, e.g., "lab-001"
 *   title: string,              // Title of the experiment
 *   status: string,             // "PROTOTYPE" | "COMPLETED" | "IN_PROGRESS" | "FAILED"
 *   category: string,           // E.g., "AI", "Performance", "Systems"
 *   date: string,               // YYYY-MM-DD
 *   description: string,        // Short summary of the experiment's intent
 *   technologies: string[],     // Stack used
 *   whatWasTested: string,      // The core question or hypothesis
 *   resultObservation: string,  // The empirical outcome or data gathered
 *   lessonsLearned: string[],   // Key takeaways
 *   links: {
 *     github: string | null,
 *     demo: string | null
 *   }
 * }
 */

export const experiments = [
  // The lab is currently clear. Add experiments here to populate the UI.
  {
    id: "lab-001",
    title: "CoreInventory",
    status: "COMPLETED",
    category: "Systems",
    date: "",
    description:
      "A web-based inventory and warehouse management system for managing products, warehouses, locations, stock levels, and stock movements.",
    technologies: [
      "Python",
      "Flask",
      "SQLAlchemy",
      "MySQL",
      "JavaScript",
      "HTML",
      "CSS"
    ],
    whatWasTested:
      "How a database-backed application can manage inventory operations across products, warehouses, locations, and stock movements.",
    resultObservation:
      "Implemented authentication, product management, warehouse and location management, stock tracking, receipts, deliveries, internal transfers, stock history, and dashboard functionality.",
    lessonsLearned: [
      "Structuring a multi-module backend application",
      "Working with relational database models",
      "Building inventory workflows",
      "Connecting frontend interactions with backend operations"
    ],
    links: {
      github: null,
      demo: null
    }
  },

  {
    id: "lab-002",
    title: "Secure OTP Login",
    status: "COMPLETED",
    category: "Security",
    date: "",
    description:
      "A passwordless authentication experiment using email-based OTP verification with Django REST Framework and JWT authentication.",
    technologies: [
      "Python",
      "Django",
      "Django REST Framework",
      "JWT",
      "SQLite",
      "PostgreSQL",
      "SMTP"
    ],
    whatWasTested:
      "How an OTP-based passwordless authentication flow can securely verify users and issue authentication tokens.",
    resultObservation:
      "Implemented OTP generation and verification with hashed OTP storage, expiration handling, attempt limits, user creation, and JWT access and refresh tokens.",
    lessonsLearned: [
      "Designing authentication flows",
      "Securely storing OTP values",
      "Handling OTP expiration and failed attempts",
      "Working with JWT authentication"
    ],
    links: {
      github: null,
      demo: null
    }
  },

  {
    id: "lab-003",
    title: "ReWear",
    status: "COMPLETED",
    category: "Frontend",
    date: "",
    description:
      "A client-side clothing exchange platform prototype built around clothing swaps and a points-based system.",
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Responsive Web Design"
    ],
    whatWasTested:
      "How a frontend-only application could handle clothing discovery, filtering, listings, swapping, points, and simulated user flows.",
    resultObservation:
      "Implemented clothing browsing, filtering, item details, listing flows, simulated authentication, dashboards, points redemption, swap requests, and admin interactions.",
    lessonsLearned: [
      "Managing client-side application state",
      "Building dynamic interfaces with vanilla JavaScript",
      "Designing multi-step user flows",
      "Creating responsive frontend experiences"
    ],
    links: {
      github: null,
      demo: null
    }
  },

  {
    id: "lab-004",
    title: "Node.js Web Experiments",
    status: "COMPLETED",
    category: "Backend",
    date: "",
    description:
      "A collection of small Node.js experiments exploring server-side rendering, email services, file uploads, and Express request handling.",
    technologies: [
      "Node.js",
      "Express",
      "EJS",
      "Nodemailer",
      "Multer",
      "HTML",
      "CSS"
    ],
    whatWasTested:
      "How common backend features such as server-side rendering, email delivery, attachments, and file uploads can be implemented with Node.js.",
    resultObservation:
      "Built and tested separate experiments for EJS rendering, email delivery, email attachments, multiple-file uploads, and CV upload workflows.",
    lessonsLearned: [
      "Working with Express middleware",
      "Using EJS for server-side rendering",
      "Sending emails with Nodemailer",
      "Handling multipart file uploads with Multer"
    ],
    links: {
      github: null,
      demo: null
    }
  },

  {
    id: "lab-005",
    title: "Inventory Management System",
    status: "COMPLETED",
    category: "Java / OOP",
    date: "",
    description:
      "An early Java console-based inventory management system developed as a first-semester project.",
    technologies: [
      "Java",
      "OOP",
      "Arrays",
      "Scanner"
    ],
    whatWasTested:
      "How object-oriented programming concepts could be applied to an inventory and sales management workflow.",
    resultObservation:
      "Implemented admin and user workflows including product management, product search, cart operations, bill generation, sales information, stock checking, and customer feedback.",
    lessonsLearned: [
      "Classes and objects",
      "Inheritance and encapsulation",
      "Polymorphism",
      "Array-based data management",
      "Modular Java programming"
    ],
    links: {
      github: null,
      demo: null
    }
  },

  {
    id: "lab-006",
    title: "Contact Management System",
    status: "COMPLETED",
    category: "Java / CRUD",
    date: "",
    description:
      "A simple Java console application for storing and managing contact information.",
    technologies: [
      "Java",
      "OOP",
      "Arrays",
      "Scanner"
    ],
    whatWasTested:
      "How basic CRUD operations can be implemented using objects, arrays, loops, and user input.",
    resultObservation:
      "Implemented adding, viewing, updating, and deleting contacts containing names, phone numbers, and email addresses.",
    lessonsLearned: [
      "Representing records using classes",
      "Implementing CRUD operations",
      "Working with arrays",
      "Handling console input"
    ],
    links: {
      github: null,
      demo: null
    }
  },

  {
    id: "lab-007",
    title: "Food Ordering System",
    status: "COMPLETED",
    category: "Java / Console",
    date: "",
    description:
      "An early Java console-based food ordering and billing application developed during the first semester.",
    technologies: [
      "Java",
      "OOP",
      "Scanner",
      "Control Flow"
    ],
    whatWasTested:
      "How menu-driven ordering, quantity calculations, billing, discounts, and payment flows could be implemented in a console application.",
    resultObservation:
      "Implemented food selection, quantity-based pricing, bill generation, discount coupon handling, online payment simulation, COD conditions, and delivery information.",
    lessonsLearned: [
      "Using methods to organize application logic",
      "Working with loops and switch statements",
      "Handling user input",
      "Building a complete console workflow"
    ],
    links: {
      github: null,
      demo: null
    }
  },

  {
    id: "lab-008",
    title: "Tic-Tac-Toe",
    status: "COMPLETED",
    category: "Java / Game",
    date: "",
    description:
      "A first-semester Java console game where a player competes against a computer opponent.",
    technologies: [
      "Java",
      "2D Arrays",
      "Random",
      "Console"
    ],
    whatWasTested:
      "How game state, player turns, computer moves, and win conditions could be represented using Java logic and arrays.",
    resultObservation:
      "Implemented player-versus-computer gameplay with board rendering, move validation, random computer moves, win detection, score tracking, and tie detection.",
    lessonsLearned: [
      "Representing game state with arrays",
      "Implementing turn-based logic",
      "Working with random values",
      "Translating game rules into program logic"
    ],
    links: {
      github: null,
      demo: null
    }
  }
];

