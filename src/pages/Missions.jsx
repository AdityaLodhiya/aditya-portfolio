import { motion } from 'framer-motion'
import SectionHeader from '../components/ui/SectionHeader'
import MissionCard from '../components/missions/MissionCard'
import { projects } from '../data/projects'

export default function Missions() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader 
            number={1}
            title="MISSIONS"
            description="Projects I've actually built. Systems, experiments and applications built while learning software engineering, data and AI."
          />
        </motion.div>

        {projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="border border-border bg-surface p-12 text-center"
          >
            <p className="font-mono text-accent text-sm mb-4">STATUS</p>
            <p className="text-text2 text-lg">No missions documented yet.</p>
            <p className="text-text3 text-sm mt-2">Mission data will be added when available.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((mission, index) => (
              <motion.div
                key={mission.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <MissionCard mission={mission} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
