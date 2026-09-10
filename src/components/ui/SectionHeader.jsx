export default function SectionHeader({ number, title, description }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-4 mb-3">
        <span className="font-mono text-accent text-lg font-bold">{String(number).padStart(2, '0')}</span>
        <h2 className="text-3xl font-bold text-text">{title}</h2>
      </div>
      {description && (
        <p className="text-text2 text-base max-w-2xl leading-relaxed">{description}</p>
      )}
    </div>
  )
}
