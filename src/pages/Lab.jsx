import { motion } from 'framer-motion'
import SectionHeader from '../components/ui/SectionHeader'
import ExperimentCard from '../components/lab/ExperimentCard'
import { experiments } from '../data/experiments'
import { Terminal } from 'lucide-react'

export default function Lab() {
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader 
            number={3}
            title="LAB"
            description="Prototypes, tests, and research. An open notebook of experimental engineering that may eventually evolve into full systems."
          />
        </motion.div>

        {/* Content */}
        {experiments.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full mt-12"
          >
            {/* Dashed Engineering Workspace Empty State */}
            <div className="border border-dashed border-[#333] bg-[#0a0a0a] p-12 md:p-20 relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
              
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#444]" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#444]" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#444]" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#444]" />
              
              {/* Center Content */}
              <div className="text-center z-10 flex flex-col items-center">
                <div className="mb-6 relative">
                  <div className="w-16 h-16 rounded-full bg-[#111] flex items-center justify-center border border-[#222]">
                    <Terminal size={24} className="text-[#555]" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#00ff9d] border-2 border-[#0a0a0a] animate-pulse" />
                </div>
                
                <h3 className="font-mono text-sm text-[#888] tracking-[0.2em] uppercase mb-4">
                  Workspace Clear
                </h3>
                <p className="font-mono text-xs text-[#555] tracking-widest max-w-sm leading-loose">
                  STATUS: STANDBY
                  <br />
                  <br />
                  NO ACTIVE EXPERIMENTS DETECTED IN THE LOCAL REPOSITORY. AWAITING NEW PROTOCOLS.
                </p>
              </div>

              {/* Subtle background grid pattern */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                   style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} 
              />
            </div>
          </motion.div>
        ) : (
          <div className="mt-12 space-y-8">
            {experiments.map((experiment, index) => (
              <motion.div
                key={experiment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <ExperimentCard experiment={experiment} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
