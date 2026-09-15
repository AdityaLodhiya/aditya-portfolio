export default function SectionHeader({ number, title, description }) {
  return (
    <div className="mb-6 sm:mb-10">
      <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3">
        <span className="font-mono text-accent text-base sm:text-lg font-bold">{String(number).padStart(2, '0')}</span>
        <h2 className="text-2xl sm:text-3xl font-bold text-text tracking-tight">{title}</h2>
      </div>
      {description && (
        <p className="text-text2 text-sm sm:text-base max-w-2xl leading-relaxed">{description}</p>
      )}
    </div>
  )
}
