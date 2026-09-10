/**
 * Thinking.jsx
 *
 * Principles section is hardcoded (editorial, not data-driven).
 * Articles section reads from data/thinking/index.js.
 * Edit that file to add new articles.
 */

import SectionHeader from '../components/ui/SectionHeader'
import { articles } from '../data/thinking'

const PRINCIPLES = [
  {
    num: '01',
    title: 'BUILD TO UNDERSTAND',
    body: 'I learn better when concepts turn into something I can actually build. Projects are where I test whether I really understand something.',
  },
  {
    num: '02',
    title: 'FUNDAMENTALS FIRST',
    body: "Frameworks change quickly. Programming fundamentals, data structures, databases, and problem solving stay useful. I'm currently going back to DSA in Java to strengthen those foundations.",
  },
  {
    num: '03',
    title: 'DATA BEFORE THE MODEL',
    body: "Machine learning isn't just about choosing an algorithm. The data, features, preprocessing, and evaluation often matter more than the model itself.",
  },
  {
    num: '04',
    title: 'INTEGRATION IS ENGINEERING',
    body: 'A working system is more than individual technologies. Getting the database, backend, APIs, frontend, models, and deployment to work together is where much of the real engineering happens.',
  },
  {
    num: '05',
    title: 'KEEP LEARNING, KEEP BUILDING',
    body: "I don't expect to know everything before starting a project. I learn what I need, build, break things, fix them, and keep moving.",
  },
]

const CURRENTLY = [
  { topic: 'DSA',        value: 'Java' },
  { topic: 'FULL STACK', value: 'MERN / Next.js' },
  { topic: 'DATA',       value: 'Python / Machine Learning' },
  { topic: 'SYSTEMS',    value: 'Backend + Databases' },
  { topic: 'NEXT',       value: 'Internship + Real-world Engineering' },
]

export default function Thinking() {
  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">

        {/* Header */}
        <SectionHeader
          number={5}
          title="THINKING"
          description="Notes on how I learn, build, and approach engineering."
        />

        {/* Principles */}
        <div className="mt-16 space-y-12">
          {PRINCIPLES.map((p) => (
            <div key={p.num} className="group">
              <div className="flex items-baseline gap-4 mb-3">
                <span className="font-mono text-sm text-[#737373]">{p.num}</span>
                <h3 className="font-mono text-sm font-semibold tracking-widest text-[#e5e5e5] uppercase">
                  {p.title}
                </h3>
              </div>

              <div className="border-t border-[#222] mb-4 group-hover:border-[#333] transition-colors" />

              <p className="text-[#a3a3a3] text-sm leading-relaxed max-w-[500px]">
                {p.body}
              </p>
            </div>
          ))}
        </div>

        {/* Currently Thinking About */}
        <div className="mt-24 pt-12 border-t border-[#111]">
          <h3 className="font-mono text-xs tracking-widest text-[#737373] uppercase mb-6">
            CURRENTLY THINKING ABOUT
          </h3>

          <div className="space-y-3 font-mono text-xs">
            {CURRENTLY.map((item) => (
              <div key={item.topic} className="flex">
                <span className="text-[#a3a3a3] w-[110px] sm:w-[130px] shrink-0">{item.topic}</span>
                <span className="text-[#444] mr-4 shrink-0">→</span>
                <span className="text-[#00ff9d] opacity-80">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Articles — from data/thinking/index.js */}
        {articles.length > 0 && (
          <div className="mt-24 pt-12 border-t border-[#111]">
            <h3 className="font-mono text-xs tracking-widest text-[#737373] uppercase mb-10">
              NOTES
            </h3>

            <div className="space-y-10">
              {articles.map((article) => (
                <div key={article.id} className="group">
                  {/* Date */}
                  {article.date && (
                    <div className="font-mono text-[10px] tracking-widest text-[#555] uppercase mb-2">
                      {article.date}
                    </div>
                  )}

                  {/* Title */}
                  <h4 className="font-mono text-sm font-semibold text-[#e5e5e5] tracking-wide mb-1">
                    {article.title}
                  </h4>

                  <div className="border-t border-[#1a1a1a] mb-4 group-hover:border-[#2a2a2a] transition-colors" />

                  {/* Content (Compact Preview) */}
                  <p className="text-sm text-[#808080] leading-relaxed line-clamp-3">
                    {article.content}
                  </p>

                  {/* Tags */}
                  {article.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[9px] tracking-widest px-2 py-0.5 border border-[#222] text-[#555]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
