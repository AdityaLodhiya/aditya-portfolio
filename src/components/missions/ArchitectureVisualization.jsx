export default function ArchitectureVisualization({ architecture }) {
  // If no architecture data is provided, return null (don't display anything)
  if (!architecture || architecture === '') {
    return null
  }

  // Parse the architecture string - handle both single-line and multiline formats
  const lines = architecture.split('\n').filter(line => line.trim() !== '')
  
  return (
    <div className="border border-border bg-surface p-8">
      <h4 className="font-mono text-sm text-text font-bold tracking-wider mb-6">
        SYSTEM ARCHITECTURE
      </h4>
      <div className="space-y-4">
        {lines.map((line, lineIndex) => {
          // Parse each line as a flow of stages
          const stages = line.split(' → ').map(stage => stage.trim())
          return (
            <div key={lineIndex} className="flex flex-col md:flex-row items-start gap-3 overflow-x-auto pb-2">
              {stages.map((stage, index) => (
                <div key={index} className="flex items-center flex-shrink-0 min-w-max">
                  <div className="border border-border2 bg-surface2 px-4 py-3 font-mono text-xs text-text2 whitespace-nowrap">
                    {stage}
                  </div>
                  {index < stages.length - 1 && (
                    <div className="px-3 text-accent font-mono text-sm hidden md:block">
                      →
                    </div>
                  )}
                  {index < stages.length - 1 && (
                    <div className="px-3 text-accent font-mono text-sm md:hidden">
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
