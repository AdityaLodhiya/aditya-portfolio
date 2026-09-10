export default function StatusIndicator({ status = 'online', size = 'sm' }) {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  }

  const statusColors = {
    online: 'bg-accent',
    offline: 'bg-text3',
    building: 'bg-accent',
    learning: 'bg-accent2'
  }

  return (
    <div className="flex items-center gap-2">
      <span className={`rounded-full ${sizeClasses[size]} ${statusColors[status] || statusColors.online} animate-pulse`} />
      <span className="font-mono text-xs text-text2 uppercase">{status}</span>
    </div>
  )
}
