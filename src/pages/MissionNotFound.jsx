import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function MissionNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-2xl"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-text mb-4">
          MISSION NOT FOUND
        </h1>
        
        <p className="text-text2 text-lg mb-8">
          The mission you're looking for doesn't exist or hasn't been documented yet.
        </p>
        
        <Link
          to="/missions"
          className="inline-flex items-center gap-2 px-6 py-3 border border-accent bg-surface hover:bg-surface2 transition-colors font-mono text-sm text-accent"
        >
          <span>←</span>
          <span>BACK TO MISSIONS</span>
        </Link>
      </motion.div>
    </div>
  )
}
