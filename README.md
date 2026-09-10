# ADITYA // SYSTEM

A personal developer portfolio designed as an interactive operating system / intelligence dashboard.

## Core Philosophy

BUILD. BREAK. UNDERSTAND. REBUILD.

This is not a conventional student portfolio. It presents the developer's work as a unified system rather than a collection of unrelated projects.

## Tech Stack

- **Frontend**: React, Vite
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM

## Architecture

The project follows a clean, scalable architecture with clear separation of concerns:

### Directory Structure

```
src/
├── assets/              # Static assets (images, fonts)
├── components/          # React components
│   ├── layout/         # Layout components (Navbar, Footer, etc.)
│   ├── navigation/     # Navigation components
│   ├── ui/             # Reusable UI components
│   ├── missions/       # Project/Mission components
│   ├── skills/         # Skill graph components
│   ├── lab/            # Experiment components
│   ├── timeline/       # Version history components
│   ├── thinking/       # Blog/article components
│   ├── terminal/       # Terminal interface components
│   └── system/         # System status components
├── data/               # Content/data (separated from UI)
│   ├── projects/       # Project data
│   ├── skills/         # Skill data
│   ├── experiments/    # Lab experiment data
│   ├── failures/       # Failed experiment data
│   ├── timeline/       # Version history data
│   ├── thinking/       # Article data
│   └── system/         # Current system state
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Third-party library configurations
├── utils/              # Utility functions
├── styles/             # Global styles
├── App.jsx             # Main application component
└── main.jsx            # Application entry point
```

### Key Architectural Principles

1. **Data-UI Separation**: All content is stored in `src/data/` directories, not hardcoded in components
2. **Component Modularity**: Components are organized by feature/section
3. **Scalability**: Easy to add new projects, skills, or content without rewriting UI
4. **Performance**: Minimal dependencies, fast loading
5. **Accessibility**: Semantic HTML, keyboard navigation, readable contrast

## Planned Sections

1. **Missions** - Projects presented as engineering missions
2. **Skill Graph** - Interactive technology-capability-project relationships
3. **Lab** - Experiments and prototypes
4. **Failed Experiments** - Documented failures and lessons learned
5. **Version History** - Developer journey as software version history
6. **Thinking** - Technical journal and articles
7. **Live System** - Current work and focus areas
8. **Terminal Mode** - Optional command-line interface

## Design System

### Colors
- Background: `#0a0a0a`
- Surface: `#111111`
- Surface 2: `#1a1a1a`
- Border: `#222222`
- Border 2: `#2a2a2a`
- Text: `#e5e5e5`
- Text 2: `#a3a3a3`
- Text 3: `#737373`
- Accent: `#00ff9d`
- Accent 2: `#00cc7d`

### Typography
- Monospace: JetBrains Mono
- Sans-serif: Inter

## Development

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Content Guidelines

**IMPORTANT**: Never fabricate content. Use placeholders until real information is provided.

- No fake project statistics
- No fake ML accuracy
- No fake achievements
- No fake testimonials
- No fake articles

All content must represent Aditya truthfully.

## Next Steps

1. Implement navigation and layout components
2. Build the Missions section with project cards
3. Create the Skill Graph visualization
4. Develop the Lab section for experiments
5. Add the Failed Experiments section
6. Build the Version History timeline
7. Create the Thinking section
8. Implement the Live System status
9. Add the Terminal Mode interface
10. Optimize for performance and accessibility
