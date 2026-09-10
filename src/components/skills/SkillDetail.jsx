import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { skills } from '../../data/skills'
import { projects } from '../../data/projects'

function getProjectById(id) {
  return projects.find(p => p.id === id)
}

function getSkillById(id) {
  return skills.find(s => s.id === id)
}

export default function SkillDetail({ skill, onClose }) {
  if (!skill) return null

  const usedInProjects = skill.projects
    .map(id => getProjectById(id))
    .filter(Boolean)

  const related = (skill.relatedSkills ?? [])
    .map(id => getSkillById(id))
    .filter(Boolean)

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.25 }}
      style={{ animation: 'inspector-in 0.25s ease both' }}
      className="border border-border bg-surface"
    >
      {/* ── Header ────────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between p-5 border-b border-border">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-text text-lg font-bold tracking-tight">{skill.name}</h3>
            <span
              className="font-mono text-[10px] px-2 py-0.5 border"
              style={{
                color: getCategoryAccent(skill.category),
                borderColor: `${getCategoryAccent(skill.category)}40`,
                background: `${getCategoryAccent(skill.category)}0d`,
              }}
            >
              {skill.category}
            </span>
          </div>
          {skill.status && (
            <span className="font-mono text-[10px] text-text3 uppercase tracking-wider">
              STATUS: {skill.status}
            </span>
          )}
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="text-text3 hover:text-text transition-colors font-mono text-sm ml-4 mt-0.5"
            aria-label="Close inspector"
          >
            ✕
          </button>
        )}
      </div>

      <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ── Evidence ──────────────────────────────────────────────── */}
        <div className="md:col-span-1">
          <p className="font-mono text-[10px] text-text3 uppercase tracking-wider mb-2">
            Evidence
          </p>
          <p className="text-text2 text-sm leading-relaxed">
            {skill.evidence ?? 'No evidence documented.'}
          </p>
        </div>

        {/* ── Missions / Projects ───────────────────────────────────── */}
        <div className="md:col-span-1">
          <p className="font-mono text-[10px] text-text3 uppercase tracking-wider mb-2">
            Used In {usedInProjects.length} Mission{usedInProjects.length !== 1 ? 's' : ''}
          </p>
          {usedInProjects.length === 0 ? (
            <p className="text-text3 text-sm">No missions linked.</p>
          ) : (
            <div className="space-y-1.5">
              {usedInProjects.map(project => (
                <Link
                  key={project.id}
                  to={`/missions/${project.slug}`}
                  className="flex items-center justify-between border border-border2 bg-surface2 px-3 py-2 hover:border-accent group transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-mono text-[10px] text-text3 flex-shrink-0">
                      {project.missionNumber}
                    </span>
                    <span className="text-text text-sm truncate group-hover:text-accent transition-colors">
                      {project.title}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-text3 flex-shrink-0 ml-2 group-hover:text-accent transition-colors">
                    →
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* ── Related Skills ────────────────────────────────────────── */}
        <div className="md:col-span-1">
          <p className="font-mono text-[10px] text-text3 uppercase tracking-wider mb-2">
            Related Skills
          </p>
          {related.length === 0 ? (
            <p className="text-text3 text-sm">No related skills.</p>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {related.map(rel => (
                <span
                  key={rel.id}
                  className="px-2 py-1 border border-border2 bg-surface2 font-mono text-[10px] text-text3"
                >
                  {rel.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// Match the same palette as SkillGraph
function getCategoryAccent(category) {
  const map = {
    'LANGUAGES':               '#00ff9d',
    'FRONTEND':                '#38bdf8',
    'BACKEND':                 '#a78bfa',
    'DATA / ML':               '#f59e0b',
    'DATABASES':               '#fb923c',
    'SYSTEMS / INFRASTRUCTURE':'#f472b6',
    'GEOSPATIAL':              '#34d399',
    'ARCHITECTURE':            '#94a3b8',
  }
  return map[category] ?? '#737373'
}
