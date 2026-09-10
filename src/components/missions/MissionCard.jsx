import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import StatusIndicator from '../ui/StatusIndicator'

export default function MissionCard({ mission }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link
        to={`/missions/${mission.slug}`}
        className="group block border border-border bg-surface p-8 hover:border-accent transition-all duration-200"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <span className="font-mono text-accent text-lg font-bold block mb-2">
              MISSION #{mission.missionNumber}
            </span>
            <h3 className="text-text text-2xl font-bold mb-2">{mission.title}</h3>
            <p className="font-mono text-xs text-text2 uppercase tracking-wider">{mission.type}</p>
          </div>
          <span className="text-text3 group-hover:text-accent transition-colors text-2xl">
            →
          </span>
        </div>

        <p className="text-text2 text-base leading-relaxed mb-6">
          {mission.shortDescription}
        </p>

        <div className="flex items-center gap-3 mb-6">
          <StatusIndicator status={mission.status} size="sm" />
        </div>

        {mission.stack && (Array.isArray(mission.stack) ? mission.stack.length > 0 : typeof mission.stack === 'object') && (
          <div className="flex flex-wrap gap-2">
            {Array.isArray(mission.stack) ? (
              <>
                {mission.stack.slice(0, 4).map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 border border-border2 bg-surface2 font-mono text-xs text-text3"
                  >
                    {tech}
                  </span>
                ))}
                {mission.stack.length > 4 && (
                  <span className="px-3 py-1 border border-border2 bg-surface2 font-mono text-xs text-text3">
                    +{mission.stack.length - 4}
                  </span>
                )}
              </>
            ) : (
              <>
                {Object.values(mission.stack).flat().slice(0, 4).map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 border border-border2 bg-surface2 font-mono text-xs text-text3"
                  >
                    {tech}
                  </span>
                ))}
                {Object.values(mission.stack).flat().length > 4 && (
                  <span className="px-3 py-1 border border-border2 bg-surface2 font-mono text-xs text-text3">
                    +{Object.values(mission.stack).flat().length - 4}
                  </span>
                )}
              </>
            )}
          </div>
        )}
      </Link>
    </motion.div>
  )
}
