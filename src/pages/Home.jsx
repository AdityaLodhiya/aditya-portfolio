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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-16 lg:py-24">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 sm:mb-14"
        >
          <div className="flex items-center gap-2.5 mb-4 sm:mb-6">
            <StatusIndicator status="online" size="sm" />
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-text mb-4 sm:mb-6 tracking-tight">
            ADITYA <span className="text-accent">//</span> SYSTEM
          </h1>

          <p className="text-lg sm:text-2xl lg:text-3xl text-text2 mb-6 sm:mb-8 font-medium">
            Computer Science Student
          </p>

          <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-10">
            <span className="px-3 py-1.5 sm:px-4 sm:py-2 border border-border2 bg-surface font-mono text-xs sm:text-sm text-text2">
              AI
            </span>
            <span className="px-3 py-1.5 sm:px-4 sm:py-2 border border-border2 bg-surface font-mono text-xs sm:text-sm text-text2">
              DATA
            </span>
            <span className="px-3 py-1.5 sm:px-4 sm:py-2 border border-border2 bg-surface font-mono text-xs sm:text-sm text-text2">
              FULL STACK
            </span>
            <span className="px-3 py-1.5 sm:px-4 sm:py-2 border border-border2 bg-surface font-mono text-xs sm:text-sm text-text2">
              SYSTEMS
            </span>
          </div>

          <div className="border-l-2 sm:border-l-4 border-accent pl-4 sm:pl-8 mb-8 sm:mb-10">
            <p className="text-lg sm:text-2xl text-text mb-1.5 sm:mb-2 font-bold tracking-tight">BUILD.</p>
            <p className="text-lg sm:text-2xl text-text mb-1.5 sm:mb-2 font-bold tracking-tight">BREAK.</p>
            <p className="text-lg sm:text-2xl text-text mb-1.5 sm:mb-2 font-bold tracking-tight">UNDERSTAND.</p>
            <p className="text-lg sm:text-2xl text-text font-bold tracking-tight">REBUILD.</p>
          </div>

          <p className="text-text2 max-w-3xl leading-relaxed text-sm sm:text-base lg:text-lg">
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
          className="mb-12 sm:mb-16"
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6">
            {entryPoints.map((entry) => (
              <Link
                key={entry.path}
                to={entry.path}
                className="group border border-border bg-surface p-5 sm:p-6 md:p-8 hover:border-accent transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <span className="font-mono text-accent text-base sm:text-lg font-bold">
                      {String(entry.number).padStart(2, '0')}
                    </span>
                    <span className="text-text3 group-hover:text-accent transition-colors text-lg sm:text-xl">
                      →
                    </span>
                  </div>
                  <h3 className="text-text text-lg sm:text-xl font-bold mb-2">{entry.title}</h3>
                  <p className="text-text2 text-sm sm:text-base leading-relaxed">{entry.description}</p>
                </div>
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
            className="mt-12 sm:mt-16"
          >
            <SectionHeader 
              number={0}
              title="ACTIVE PROCESS"
              description="Primary project currently in active focus and development."
            />

            <div className="border border-border bg-surface p-5 sm:p-6 md:p-8 relative overflow-hidden group mt-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-6">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-accent animate-pulse" />
                  <span className="font-mono text-[11px] sm:text-xs text-accent uppercase tracking-wider">
                    ACTIVE DEV // MISSION #{activeProject.missionNumber}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-text3 tracking-widest uppercase">
                  {activeProject.type}
                </span>
              </div>

              <h3 className="text-text text-xl sm:text-2xl font-bold mb-2 sm:mb-3">{activeProject.title}</h3>
              <p className="text-text2 text-sm sm:text-base leading-relaxed mb-6 max-w-3xl">
                {activeProject.shortDescription}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 sm:pt-6 border-t border-border">
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {(activeProject.stack?.machineLearning || []).concat(activeProject.stack?.backend || []).slice(0, 5).map((tech) => (
                    <span key={tech} className="font-mono text-[11px] sm:text-xs px-2 sm:px-2.5 py-1 border border-border2 bg-surface2 text-text3">
                      {tech}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/missions/${activeProject.slug}`}
                  className="inline-flex items-center justify-center gap-2 font-mono text-xs text-accent hover:text-text transition-colors tracking-widest uppercase font-semibold py-2.5 px-3 bg-surface2 sm:bg-transparent border border-border2 sm:border-0 rounded-sm"
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
