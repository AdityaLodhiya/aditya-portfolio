export default function ArchitectureVisualization({ architecture }) {
  // If no architecture data is provided, return null (don't display anything)
  if (!architecture || architecture === '') {
    return null
  }

  // Parse the architecture string - handle both single-line and multiline formats
  const lines = architecture.split('\n').filter(line => line.trim() !== '')
  
  return (
    <div className="border border-border bg-surface p-4 sm:p-6 md:p-8">
      <h4 className="font-mono text-xs sm:text-sm text-text font-bold tracking-wider mb-4 sm:mb-6">
        SYSTEM ARCHITECTURE
      </h4>
      <div className="space-y-4">
        {lines.map((line, lineIndex) => {
          // Parse each line as a flow of stages
          const stages = line.split(' → ').map(stage => stage.trim())
          return (
            <div key={lineIndex} className="flex flex-col md:flex-row items-stretch md:items-center gap-2 sm:gap-3 overflow-x-auto pb-2">
              {stages.map((stage, index) => (
                <div key={index} className="flex flex-col md:flex-row items-center flex-shrink-0">
                  <div className="border border-border2 bg-surface2 px-3 sm:px-4 py-2.5 sm:py-3 font-mono text-xs text-text2 w-full text-center md:text-left md:w-auto">
                    {stage}
                  </div>
                  {index < stages.length - 1 && (
                    <div className="px-3 text-accent font-mono text-sm hidden md:block">
                      →
                    </div>
                  )}
                  {index < stages.length - 1 && (
                    <div className="py-1 text-accent font-mono text-xs md:hidden">
                      ↓
                    </div>
                  )}
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
