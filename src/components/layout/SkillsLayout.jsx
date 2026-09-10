import Navbar from '../navigation/Navbar'

/**
 * Layout for the Skills page — navbar only (no footer).
 * The graph canvas fills the entire remaining viewport height.
 */
export default function SkillsLayout({ children }) {
  return (
    <div className="flex flex-col" style={{ height: '100dvh', overflow: 'hidden' }}>
      <Navbar />
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  )
}
