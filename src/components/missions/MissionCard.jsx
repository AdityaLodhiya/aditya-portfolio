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
        className="group block border border-border bg-surface p-5 sm:p-6 md:p-8 hover:border-accent transition-all duration-200"
      >
        <div className="flex items-start justify-between gap-3 mb-4 sm:mb-6">
          <div>
            <span className="font-mono text-accent text-xs sm:text-sm font-bold block mb-1 sm:mb-2 tracking-wider">
              MISSION #{mission.missionNumber}
            </span>
            <h3 className="text-text text-xl sm:text-2xl font-bold mb-1 sm:mb-2 tracking-tight">{mission.title}</h3>
            <p className="font-mono text-[11px] sm:text-xs text-text2 uppercase tracking-wider">{mission.type}</p>
          </div>
          <span className="text-text3 group-hover:text-accent transition-colors text-xl sm:text-2xl shrink-0 pt-1">
            →
          </span>
        </div>

        <p className="text-text2 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
          {mission.shortDescription}
        </p>

        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <StatusIndicator status={mission.status} size="sm" />
        </div>

        {mission.stack && (Array.isArray(mission.stack) ? mission.stack.length > 0 : typeof mission.stack === 'object') && (
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {Array.isArray(mission.stack) ? (
              <>
                {mission.stack.slice(0, 4).map((tech, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-1 border border-border2 bg-surface2 font-mono text-[11px] sm:text-xs text-text3"
                  >
                    {tech}
                  </span>
                ))}
                {mission.stack.length > 4 && (
                  <span className="px-2.5 py-1 border border-border2 bg-surface2 font-mono text-[11px] sm:text-xs text-text3">
                    +{mission.stack.length - 4}
                  </span>
                )}
              </>
            ) : (
              <>
                {Object.values(mission.stack).flat().slice(0, 4).map((tech, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-1 border border-border2 bg-surface2 font-mono text-[11px] sm:text-xs text-text3"
                  >
                    {tech}
                  </span>
                ))}
                {Object.values(mission.stack).flat().length > 4 && (
                  <span className="px-2.5 py-1 border border-border2 bg-surface2 font-mono text-[11px] sm:text-xs text-text3">
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
