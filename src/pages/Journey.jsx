/**
 * Journey.jsx
 *
 * Reads from data/timeline/index.js and data/failures/index.js.
 * No hardcoded content — edit the data files to update this page.
 */

import SectionHeader from '../components/ui/SectionHeader'
import { timeline } from '../data/timeline'
import { failures } from '../data/failures'
import { getProjectBySlug } from '../data/projects'
import { Link } from 'react-router-dom'

// ── Page ──────────────────────────────────────────────────────────────────
export default function Journey() {
  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20 lg:py-24">

        <SectionHeader
          number={4}
          title="JOURNEY"
          description="From learning the fundamentals to building larger systems."
        />

        {/* Timeline */}
        <div className="relative mt-8 sm:mt-14">

          {/* Spine */}
          <div
            className="absolute left-0 top-0 bottom-0 w-px"
            style={{
              background: 'linear-gradient(to bottom, transparent, #252525 10%, #252525 90%, transparent)',
            }}
          />

          <div>
            {timeline.map((entry, i) => {
              const isCurrent = i === timeline.length - 1
              const techs = Array.isArray(entry.technologies) ? entry.technologies : []
              const resolvedProjects = (entry.projects || []).map(getProjectBySlug).filter(Boolean)
              return (
                <Entry
                  key={entry.version ?? i}
                  phase={entry.period}
                  label={entry.title}
                  techs={techs}
                  body={entry.description}
                  projects={resolvedProjects}
                  isCurrent={isCurrent}
                />
              )
            })}
          </div>
        </div>

        {/* Failures / Lessons */}
        {failures.length > 0 && (
          <div className="mt-14 sm:mt-20 pt-8 sm:pt-12 border-t border-[#181818]">
            <div className="font-mono text-[10px] tracking-[0.18em] text-[#555] uppercase mb-6 sm:mb-8">
              WHAT WENT WRONG
            </div>
            <div className="space-y-6 sm:space-y-8">
              {failures.map((f) => (
                <div key={f.id} className="border-l border-[#2a2a2a] pl-4 sm:pl-5">
                  <div className="font-mono text-[11px] tracking-widest text-[#a3a3a3] uppercase mb-1.5 sm:mb-2">
                    {f.title}
                  </div>
                  <p className="text-xs sm:text-sm text-[#777] leading-relaxed mb-2">
                    {f.reason}
                  </p>
                  <p className="font-mono text-[10px] text-[#4a9e78] leading-relaxed">
                    ↳ {f.learned}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

// ── Entry ─────────────────────────────────────────────────────────────────
function Entry({ phase, label, techs, body, projects, isCurrent }) {
  return (
    <div className="relative flex gap-4 sm:gap-8 pb-8 last:pb-0">

      {/* Dot on the spine */}
      <div
        className="absolute -left-[3.5px] top-[5px] z-10 rounded-full flex-shrink-0"
        style={{
          width: isCurrent ? 8 : 7,
          height: isCurrent ? 8 : 7,
          background: isCurrent ? '#00ff9d' : '#2a2a2a',
          border: `1px solid ${isCurrent ? '#00ff9d' : '#444'}`,
          boxShadow: isCurrent ? '0 0 10px rgba(0,255,157,0.35)' : 'none',
        }}
      />

      {/* Content — indented from the spine */}
      <div className="pl-5 sm:pl-8 flex-1 min-w-0">

        {/* Phase */}
        <div
          className="font-mono text-[10px] tracking-[0.18em] uppercase mb-2 leading-none"
          style={{ color: isCurrent ? '#00ff9d' : '#555' }}
        >
          {phase}
        </div>

        {/* Label */}
        <div
          className="font-mono text-[11px] tracking-[0.12em] uppercase mb-3 font-semibold"
          style={{ color: isCurrent ? '#e5e5e5' : '#a3a3a3' }}
        >
          {label}
        </div>

        {/* Tech stack — pill tags that wrap cleanly on mobile */}
        {techs && techs.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {techs.map((t) => (
              <span
                key={t}
                className="font-mono text-[9px] px-1.5 py-0.5 border rounded-sm whitespace-nowrap"
                style={{
                  borderColor: isCurrent ? 'rgba(0,255,157,0.3)' : '#2a2a2a',
                  color: isCurrent ? '#00ff9d' : '#666',
                  background: isCurrent ? 'rgba(0,255,157,0.04)' : 'transparent',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Body text */}
        <p
          className="text-sm leading-relaxed"
          style={{ color: isCurrent ? '#a3a3a3' : '#808080' }}
        >
          {body}
        </p>

        {/* Projects */}
        {projects && projects.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {projects.map(p => (
              <Link
                key={p.slug}
                to={`/missions/${p.slug}`}
                className="font-mono text-[10px] tracking-widest px-2 py-1 border border-[#222] text-[#888] hover:text-[#00ff9d] hover:border-[#00ff9d] transition-colors bg-[#0f0f0f]"
              >
                {p.title} ↗
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
