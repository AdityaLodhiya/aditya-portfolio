import { systemState } from '../../data/system'
import StatusIndicator from '../ui/StatusIndicator'

export default function SystemStatus() {
  const items = [
    { label: 'STATUS', value: 'ONLINE', isAccent: true },
    { label: 'BUILDING', value: systemState.building },
    { label: 'LEARNING', value: systemState.learning },
    { label: 'EXPLORING', value: systemState.exploring },
    { label: 'EXPERIMENT', value: systemState.experimenting, isLast: true },
  ]

  return (
    <div className="border border-border bg-surface p-4 sm:p-6 md:p-8">
      <div className="flex items-center justify-between mb-4 sm:mb-6 pb-3 border-b border-border">
        <h3 className="font-mono text-xs sm:text-sm text-text font-bold tracking-wider">CURRENT SYSTEM STATE</h3>
        <StatusIndicator status="online" size="sm" />
      </div>

      <div className="divide-y divide-border2">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row sm:items-center justify-between py-2.5 sm:py-3 gap-1 sm:gap-4"
          >
            <span className="font-mono text-[10px] sm:text-xs text-text2 uppercase tracking-wider shrink-0">
              {item.label}
            </span>
            <span
              className={`font-mono text-xs ${
                item.isAccent ? 'text-accent font-bold' : 'text-text3'
              } sm:text-right break-words`}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
