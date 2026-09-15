import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import StatusIndicator from '../ui/StatusIndicator'
import ArchitectureVisualization from './ArchitectureVisualization'

const STATUS_MAP = {
  active: 'text-accent',
  completed: 'text-text',
  in_development: 'text-text2',
  experiment: 'text-accent2',
  archived: 'text-text3',
  failed: 'text-text3'
}

function getStatusColor(status) {
  return STATUS_MAP[status] || 'text-text2'
}

function MissionSection({ title, children, showIf = true }) {
  if (!showIf) return null
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-12"
    >
      <h4 className="font-mono text-sm text-accent font-bold tracking-wider mb-4 border-b border-border pb-2">
        {title}
      </h4>
      <div className="text-text2 text-base leading-relaxed">
        {children}
      </div>
    </motion.div>
  )
}

function MetadataRow({ label, value }) {
  if (!value) return null
  return (
    <div className="flex items-center justify-between py-3 border-b border-border2">
      <span className="font-mono text-xs text-text2 uppercase tracking-wider">{label}</span>
      <span className="font-mono text-xs text-text">{value}</span>
    </div>
  )
}

export default function MissionDetail({ mission }) {

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 sm:mb-8"
        >
          <Link
            to="/missions"
            className="inline-flex items-center gap-2 text-text2 hover:text-text transition-colors font-mono text-xs sm:text-sm py-1.5"
          >
            <span>←</span>
            <span>BACK TO MISSIONS</span>
          </Link>
        </motion.div>

        {/* Mission Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 sm:mb-12"
        >
          <div className="flex items-center gap-3 mb-3 sm:mb-4">
            <StatusIndicator status={mission.status} size="md" />
            <span className={`font-mono text-xs uppercase tracking-wider ${getStatusColor(mission.status)}`}>
              {mission.status.replace('_', ' ')}
            </span>
          </div>

          <div className="flex items-center gap-4 mb-2 sm:mb-3">
            <span className="font-mono text-accent text-lg sm:text-2xl font-bold">
              MISSION #{mission.missionNumber}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-text mb-3 sm:mb-4 tracking-tight break-words">
            {mission.title}
          </h1>

          <p className="font-mono text-xs sm:text-sm text-text2 uppercase tracking-wider">
            {mission.type}
          </p>
        </motion.div>

        {/* Metadata */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="border border-border bg-surface p-4 sm:p-6 md:p-8 mb-8 sm:mb-12"
        >
          <div className="space-y-0">
            <MetadataRow label="STATUS" value={mission.status.replace('_', ' ').toUpperCase()} />
            <MetadataRow label="TYPE" value={mission.type} />
          </div>
        </motion.div>

        {/* Contribution */}
        {mission.contribution && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="border-l-2 sm:border-l-4 border-accent bg-surface2 p-4 sm:p-6 mb-8 sm:mb-12"
          >
            <h4 className="font-mono text-xs sm:text-sm text-accent font-bold tracking-wider mb-2">
              MY CONTRIBUTION
            </h4>
            <p className="text-text2 text-sm sm:text-base leading-relaxed">
              {mission.contribution}
            </p>
          </motion.div>
        )}

        {/* Mission Sections */}
        <MissionSection title="OBJECTIVE" showIf={mission.objective}>
          {mission.objective}
        </MissionSection>

        <MissionSection title="PROBLEM" showIf={mission.problem}>
          {mission.problem}
        </MissionSection>

        <MissionSection title="APPROACH" showIf={mission.approach}>
          {mission.approach}
        </MissionSection>

        {/* Stack */}
        {mission.stack && (Array.isArray(mission.stack) ? mission.stack.length > 0 : typeof mission.stack === 'object') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-12"
          >
            <h4 className="font-mono text-sm text-accent font-bold tracking-wider mb-4 border-b border-border pb-2">
              STACK
            </h4>
            {Array.isArray(mission.stack) ? (
              <div className="flex flex-wrap gap-3">
                {mission.stack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 border border-border2 bg-surface font-mono text-sm text-text2"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(mission.stack).map(([category, technologies]) => (
                  <div key={category}>
                    <h5 className="font-mono text-xs text-text3 uppercase tracking-wider mb-3">
                      {category.replace(/([A-Z])/g, ' $1').trim()}
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 border border-border2 bg-surface2 font-mono text-xs text-text2"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Data */}
        <MissionSection title="DATA" showIf={mission.data}>
          {typeof mission.data === 'string' ? mission.data : 'Data information available'}
        </MissionSection>

        {/* Architecture */}
        <ArchitectureVisualization architecture={mission.architecture} />

        {/* Results */}
        <MissionSection title="RESULTS" showIf={mission.results}>
          {typeof mission.results === 'string' 
            ? mission.results 
            : 'Documentation in progress.'
          }
        </MissionSection>

        {/* Challenges */}
        {mission.challenges && mission.challenges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-12"
          >
            <h4 className="font-mono text-sm text-accent font-bold tracking-wider mb-4 border-b border-border pb-2">
              CHALLENGES
            </h4>
            <ul className="space-y-3">
              {mission.challenges.map((challenge, index) => (
                <li key={index} className="text-text2 text-base leading-relaxed flex items-start gap-3">
                  <span className="text-accent mt-1">→</span>
                  <span>{challenge}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Lessons */}
        {mission.lessons && mission.lessons.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-12"
          >
            <h4 className="font-mono text-sm text-accent font-bold tracking-wider mb-4 border-b border-border pb-2">
              LESSONS
            </h4>
            <ul className="space-y-3">
              {mission.lessons.map((lesson, index) => (
                <li key={index} className="text-text2 text-base leading-relaxed flex items-start gap-3">
                  <span className="text-accent mt-1">→</span>
                  <span>{lesson}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Future Work */}
        {mission.futureWork && mission.futureWork.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-12"
          >
            <h4 className="font-mono text-sm text-accent font-bold tracking-wider mb-4 border-b border-border pb-2">
              FUTURE WORK
            </h4>
            <ul className="space-y-3">
              {mission.futureWork.map((item, index) => (
                <li key={index} className="text-text2 text-base leading-relaxed flex items-start gap-3">
                  <span className="text-accent mt-1">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Links */}
        {(mission.github || mission.demo) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-12"
          >
            <h4 className="font-mono text-sm text-accent font-bold tracking-wider mb-4 border-b border-border pb-2">
              LINKS
            </h4>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              {mission.github && (
                <a
                  href={mission.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto text-center px-6 py-3 border border-accent bg-surface hover:bg-surface2 transition-colors font-mono text-sm text-accent"
                >
                  GITHUB ↗
                </a>
              )}
              {mission.demo && (
                <a
                  href={mission.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto text-center px-6 py-3 border border-accent bg-surface hover:bg-surface2 transition-colors font-mono text-sm text-accent"
                >
                  LIVE DEMO ↗
                </a>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
