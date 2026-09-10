// Thinking/Articles data structure
// Each article should support: id, title, slug, date, content, tags

export const articles = [
  {
    id: "article-001",
    title: "Building Before Mastering",
    slug: "building-before-mastering",
    date: "2026-01-15",
    content:
      "I have learned most of my technical skills by building projects instead of waiting until I feel ready. Starting with Java and DSA, then moving into full-stack development, Python, and machine learning, each project has exposed gaps in my understanding. SecureScript taught me about Java, databases, APIs, and application security. FLOWZEN pushed me toward backend systems and database integration. GIS and CricIntel brought together larger combinations of full-stack development, data, and machine learning. The main lesson has been simple: building something usually reveals what I actually need to learn next.",
    tags: ["Learning", "Engineering", "Projects"]
  },

  {
    id: "article-002",
    title: "What Building CricIntel Taught Me",
    slug: "what-building-cricintel-taught-me",
    date: "2026-02-15",
    content:
      "CricIntel was a step up from my earlier projects because it required multiple parts of a system to work together. The project combines a React frontend, Django REST backend, historical cricket datasets, and machine learning models for cricket analytics and prediction. Working with multiple models, APIs, data, and application features made it clear that building a useful system is more than training a model. Data preparation, backend integration, model inference, authentication, and presenting the results are all part of the problem.",
    tags: ["Machine Learning", "Full Stack", "CricIntel"]
  },

  {
    id: "article-003",
    title: "From Features to Systems",
    slug: "from-features-to-systems",
    date: "2026-03-15",
    content:
      "My earlier projects were mostly focused on individual programming concepts or features. Over time, I started thinking more about how different parts of an application connect. FLOWZEN introduced me to database-backed backend systems, asynchronous tasks, Redis, Celery, and WebSockets. GIS required frontend interaction, APIs, spatial data, machine learning, and geospatial processing to work together. This changed how I approach projects: instead of only asking how to implement a feature, I now think more about how that feature fits into the complete system.",
    tags: ["Systems", "Backend", "Architecture"]
  }
];