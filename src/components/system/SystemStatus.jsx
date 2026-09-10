import { systemState } from '../../data/system'
import StatusIndicator from '../ui/StatusIndicator'

export default function SystemStatus() {
  return (
    <div className="border border-border bg-surface p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-mono text-sm text-text font-bold tracking-wider">CURRENT SYSTEM</h3>
        <StatusIndicator status="online" size="sm" />
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between py-3 border-b border-border2">
          <span className="font-mono text-xs text-text2 uppercase tracking-wider">STATUS</span>
          <span className="font-mono text-xs text-accent font-bold">ONLINE</span>
        </div>
        
        <div className="flex items-center justify-between py-3 border-b border-border2">
          <span className="font-mono text-xs text-text2 uppercase tracking-wider">BUILDING</span>
          <span className="font-mono text-xs text-text3">{systemState.building}</span>
        </div>
        
        <div className="flex items-center justify-between py-3 border-b border-border2">
          <span className="font-mono text-xs text-text2 uppercase tracking-wider">LEARNING</span>
          <span className="font-mono text-xs text-text3">{systemState.learning}</span>
        </div>
        
        <div className="flex items-center justify-between py-3 border-b border-border2">
          <span className="font-mono text-xs text-text2 uppercase tracking-wider">EXPLORING</span>
          <span className="font-mono text-xs text-text3">{systemState.exploring}</span>
        </div>
        
        <div className="flex items-center justify-between py-3">
          <span className="font-mono text-xs text-text2 uppercase tracking-wider">EXPERIMENT</span>
          <span className="font-mono text-xs text-text3">{systemState.experimenting}</span>
        </div>
      </div>
    </div>
  )
}
