import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SystemStatus from '../components/system/SystemStatus'
import SectionHeader from '../components/ui/SectionHeader'
import StatusIndicator from '../components/ui/StatusIndicator'
import { projects } from '../data/projects'

export default function Home() {
  const activeProject = projects.find(p => p.status?.toLowerCase() === 'active') || projects[0]
  const entryPoints = [
    {
      number: 1,
      title: 'MISSIONS',
      description: 'Projects I\'ve actually built.',
      path: '/missions'
    },
    {
      number: 2,
      title: 'SKILL GRAPH',
      description: 'Technologies connected to real projects.',
      path: '/skills'
    },
    {
      number: 3,
      title: 'LAB',
      description: 'Experiments, prototypes and research.',
      path: '/lab'
    },
    {
      number: 4,
      title: 'VERSION HISTORY',
      description: 'How I got here.',
      path: '/journey'
    },
    {
      number: 5,
      title: 'THINKING',
      description: 'Things I\'m currently trying to understand.',
      path: '/thinking'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Subtle background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-surface2/20 via-background to-background" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,34,34,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,34,34,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <StatusIndicator status="online" size="sm" />
            <span className="font-mono text-xs text-text2 uppercase tracking-wider">System Online</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-text mb-6 tracking-tight">
            ADITYA // SYSTEM
          </h1>
          
          <p className="text-2xl sm:text-3xl text-text2 mb-8 font-medium">
            Computer Science Student
          </p>
          
          <div className="flex flex-wrap gap-3 mb-10">
            <span className="px-4 py-2 border border-border2 bg-surface font-mono text-sm text-text2">
              AI
            </span>
            <span className="px-4 py-2 border border-border2 bg-surface font-mono text-sm text-text2">
              DATA
            </span>
            <span className="px-4 py-2 border border-border2 bg-surface font-mono text-sm text-text2">
              FULL STACK
            </span>
            <span className="px-4 py-2 border border-border2 bg-surface font-mono text-sm text-text2">
              SYSTEMS
            </span>
          </div>
          
          <div className="border-l-4 border-accent pl-8 mb-10">
            <p className="text-2xl text-text mb-3 font-bold">BUILD.</p>
            <p className="text-2xl text-text mb-3 font-bold">BREAK.</p>
            <p className="text-2xl text-text mb-3 font-bold">UNDERSTAND.</p>
            <p className="text-2xl text-text font-bold">REBUILD.</p>
          </div>
          
          <p className="text-text2 max-w-3xl leading-relaxed text-lg">
            I build software systems, experiment with data and machine learning, 
            and explore full-stack development. This portfolio is designed as a 
            personal operating system to document my work, experiments, and learning journey.
          </p>
        </motion.div>

        {/* System Status Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <SystemStatus />
        </motion.div>

        {/* Entry Points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <SectionHeader 
            number={0}
            title="SYSTEM MODULES"
            description="Navigate through different sections of the system."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {entryPoints.map((entry) => (
              <Link
                key={entry.path}
                to={entry.path}
                className="group border border-border bg-surface p-8 hover:border-accent transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="font-mono text-accent text-lg font-bold">
                    {String(entry.number).padStart(2, '0')}
                  </span>
                  <span className="text-text3 group-hover:text-accent transition-colors text-xl">
                    →
                  </span>
                </div>
                <h3 className="text-text text-xl font-bold mb-3">{entry.title}</h3>
                <p className="text-text2 text-base leading-relaxed">{entry.description}</p>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Active Process / Flagship Project Preview */}
        {activeProject && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16"
          >
            <SectionHeader 
              number={0}
              title="ACTIVE PROCESS"
              description="Primary project currently in active focus and development."
            />
            
            <div className="border border-border bg-surface p-8 relative overflow-hidden group">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                  <span className="font-mono text-xs text-accent uppercase tracking-wider">
                    ACTIVE DEVELOPMENT // MISSION #{activeProject.missionNumber}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-text3 tracking-widest uppercase">
                  {activeProject.type}
                </span>
              </div>

              <h3 className="text-text text-2xl font-bold mb-3">{activeProject.title}</h3>
              <p className="text-text2 text-base leading-relaxed mb-6 max-w-3xl">
                {activeProject.shortDescription}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-border">
                <div className="flex flex-wrap gap-2">
                  {(activeProject.stack?.machineLearning || []).concat(activeProject.stack?.backend || []).slice(0, 5).map((tech) => (
                    <span key={tech} className="font-mono text-xs px-2.5 py-1 border border-border2 bg-surface2 text-text3">
                      {tech}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/missions/${activeProject.slug}`}
                  className="inline-flex items-center gap-2 font-mono text-xs text-accent hover:text-text transition-colors tracking-widest uppercase font-semibold"
                >
                  <span>VIEW MISSION SPEC</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
