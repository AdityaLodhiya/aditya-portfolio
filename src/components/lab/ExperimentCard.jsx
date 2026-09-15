import { GitBranch, ExternalLink, Beaker } from 'lucide-react'

export default function ExperimentCard({ experiment }) {
  // Determine status styles
  let statusColor = 'text-text3'
  let statusBorder = 'border-border'
  let statusBg = 'bg-surface'
  
  switch (experiment.status) {
    case 'COMPLETED':
      statusColor = 'text-accent'
      statusBorder = 'border-accent/40'
      statusBg = 'bg-accent/5'
      break
    case 'IN_PROGRESS':
      statusColor = 'text-yellow-400'
      statusBorder = 'border-yellow-400/40'
      statusBg = 'bg-yellow-400/5'
      break
    case 'FAILED':
      statusColor = 'text-red-400'
      statusBorder = 'border-red-400/40'
      statusBg = 'bg-red-400/5'
      break
    case 'PROTOTYPE':
      statusColor = 'text-blue-400'
      statusBorder = 'border-blue-400/40'
      statusBg = 'bg-blue-400/5'
      break
    default:
      break
  }

  return (
    <article className="border border-border bg-surface relative overflow-hidden transition-colors hover:border-border2 flex flex-col group">
      {/* Header bar */}
      <div className={`flex flex-wrap items-center justify-between gap-2 sm:gap-4 px-4 sm:px-5 py-2.5 border-b border-border ${statusBg}`}>
        <div className="flex items-center gap-2 sm:gap-3">
          <Beaker size={14} className={statusColor} />
          <span className="font-mono text-[10px] sm:text-[11px] text-text2 tracking-widest uppercase">{experiment.id}</span>
          {experiment.date && (
            <>
              <span className="font-mono text-[10px] text-text3">|</span>
              <span className="font-mono text-[9px] sm:text-[10px] text-text2 tracking-widest">{experiment.date}</span>
            </>
          )}
        </div>
        <div className={`font-mono text-[9px] px-2 py-0.5 border ${statusBorder} ${statusColor} tracking-widest uppercase`}>
          {experiment.status}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="flex-1 p-4 sm:p-5 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-6">
          
          {/* Left Column: Identity & Summary */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="font-mono text-[10px] text-accent tracking-widest uppercase mb-1.5">
              {experiment.category}
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-text tracking-tight mb-2">
              {experiment.title}
            </h2>
            <p className="text-text2 text-sm leading-relaxed mb-4 sm:mb-5">
              {experiment.description}
            </p>
            
            <div className="mt-auto">
              <h3 className="font-mono text-[9px] text-text3 tracking-widest uppercase mb-2">Technologies</h3>
              <div className="flex flex-wrap gap-x-2 gap-y-1">
                {experiment.technologies.map((tech, idx) => (
                  <span key={tech} className="font-mono text-[10px] text-text2">
                    {tech}{idx < experiment.technologies.length - 1 && <span className="text-text3 ml-2">·</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-7 flex flex-col justify-center gap-5">
            <div>
              <h3 className="font-mono text-[9px] text-text3 tracking-widest uppercase mb-2 flex items-center gap-2">
                <span className="w-1.5 h-px bg-border2"></span>
                Hypothesis / Test
              </h3>
              <p className="text-text2 text-sm leading-relaxed border-l-2 border-border2 pl-3 py-0.5">
                {experiment.whatWasTested}
              </p>
            </div>
            
            <div>
              <h3 className="font-mono text-[9px] text-text3 tracking-widest uppercase mb-2 flex items-center gap-2">
                <span className="w-1.5 h-px bg-border2"></span>
                Observation
              </h3>
              <p className="text-text2 text-sm leading-relaxed border-l-2 border-border2 pl-3 py-0.5">
                {experiment.resultObservation}
              </p>
            </div>
          </div>
        </div>

        {/* Lessons Learned (Compact horizontal) */}
        {experiment.lessonsLearned && experiment.lessonsLearned.length > 0 && (
          <div className="mt-6 pt-5 border-t border-border/50">
            <h3 className="font-mono text-[9px] text-text3 tracking-widest uppercase mb-2">Lessons Learned</h3>
            <div className="flex flex-wrap gap-x-2 gap-y-1 items-center">
              {experiment.lessonsLearned.map((lesson, idx) => (
                <span key={idx} className="text-[13px] text-text2 leading-tight">
                  {lesson}
                  {idx < experiment.lessonsLearned.length - 1 && (
                    <span className="text-accent ml-2 text-lg leading-none align-middle inline-block -translate-y-px">·</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Optional Footer: Links (Only show if there are links) */}
      {(experiment.links?.github || experiment.links?.demo) && (
        <div className="px-5 py-3 border-t border-border bg-[#0a0a0a]/50 flex items-center gap-5">
          {experiment.links?.github && (
            <a 
              href={experiment.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-[9px] text-text3 hover:text-accent transition-colors tracking-widest uppercase"
            >
              <GitBranch size={12} />
              Repository
            </a>
          )}
          {experiment.links?.demo && (
            <a 
              href={experiment.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-[9px] text-text3 hover:text-accent transition-colors tracking-widest uppercase"
            >
              <ExternalLink size={12} />
              Live Demo
            </a>
          )}
        </div>
      )}
    </article>
  )
}
