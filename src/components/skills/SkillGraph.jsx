import { useState, useRef, useCallback, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { skills } from '../../data/skills'
import { projects } from '../../data/projects'
import { experiments } from '../../data/experiments'

// ─── Category abbreviations ───────────────────────────────────────────────────
const CAT_ABBR = {
  'LANGUAGES': 'LANG',
  'FRONTEND': 'FE',
  'BACKEND': 'BE',
  'DATA / ML': 'ML',
  'DATABASES': 'DB',
  'SYSTEMS / INFRASTRUCTURE': 'SYS',
  'GEOSPATIAL': 'GEO',
  'ARCHITECTURE': 'ARCH',
}

const CAT_ORDER = [
  'LANGUAGES', 'FRONTEND', 'BACKEND', 'DATA / ML',
  'DATABASES', 'SYSTEMS / INFRASTRUCTURE', 'GEOSPATIAL', 'ARCHITECTURE',
]

// ─── Build graph data ─────────────────────────────────────────────────────────
function buildGraphData() {
  const allProjects = [
    ...projects.map((p, i) => ({
      id: p.id,
      name: p.title,
      label: `MISSION // ${String(p.missionNumber || i + 1).padStart(2, '0')}`,
      labelShort: `M${String(p.missionNumber || i + 1).padStart(2, '0')}`,
      type: 'project',
      slug: p.slug,
      isMission: true,
      raw: p,
    })),
    ...experiments.map((e, i) => ({
      id: e.id,
      name: e.title,
      label: `LAB // ${String(i + 1).padStart(2, '0')}`,
      labelShort: `LAB${String(i + 1).padStart(2, '0')}`,
      type: 'project',
      slug: null,
      isMission: false,
      raw: e,
    })),
  ]

  const projectIdSet = new Set(allProjects.map(p => p.id))

  const skillNodes = skills.map(s => ({
    id: s.id,
    name: s.name,
    type: 'skill',
    category: s.category,
    abbr: CAT_ABBR[s.category] ?? s.category.slice(0, 4).toUpperCase(),
    projects: (s.projects ?? []).filter(pid => projectIdSet.has(pid)),
    evidence: s.evidence ?? '',
    data: s,
  }))

  const edges = []
  skillNodes.forEach(skill => {
    skill.projects.forEach(pid => edges.push({ from: skill.id, to: pid }))
  })

  return { skillNodes, projectNodes: allProjects, edges }
}

// ─── Layout ───────────────────────────────────────────────────────────────────
// Approach: proportional-arc sectors + uniform row distribution + repulsion pass.
// Each category gets an arc proportional to its size. Nodes fill rings
// from inside out in rows. A final repulsion pass guarantees no overlap.
function computeLayout(skillNodes, projectNodes) {
  const W = 3200
  const H = 1600
  const cx = W / 2
  const cy = H / 2

  const positions = new Map()

  // ── Projects: 2D oval cluster ─────────────────────────────────────────────
  const missions = projectNodes.filter(p => p.isMission)
  const labs = projectNodes.filter(p => !p.isMission)

  const MRX = 270, MRY = 210
  missions.forEach((p, i) => {
    const angle = -Math.PI / 2 + (i / Math.max(missions.length, 1)) * 2 * Math.PI
    positions.set(p.id, { x: cx + MRX * Math.cos(angle), y: cy + MRY * Math.sin(angle) })
  })

  const LRX = 480, LRY = 320
  const labOffset = Math.PI / Math.max(labs.length, 1)
  labs.forEach((p, i) => {
    const angle = -Math.PI / 2 + labOffset + (i / Math.max(labs.length, 1)) * 2 * Math.PI
    positions.set(p.id, { x: cx + LRX * Math.cos(angle), y: cy + LRY * Math.sin(angle) })
  })

  // ── Skill rings (3 rings, wider spacing) ──────────────────────────────────
  // Rings are spaced further apart so rows don't visually bleed into each other
  const RINGS = [
    { rx: 720, ry: 430 },
    { rx: 950, ry: 560 },
    { rx: 1180, ry: 680 },
  ]
  const NODE_W = 110  // width budget per node (node 96px + 14px gap)
  const NODE_H = 38  // height budget per node (node 22px + 16px gap)

  // Placement order: interleave large categories so density is balanced
  const PLACEMENT_ORDER = [
    'FRONTEND', 'DATABASES', 'BACKEND', 'GEOSPATIAL',
    'SYSTEMS / INFRASTRUCTURE', 'LANGUAGES', 'ARCHITECTURE', 'DATA / ML',
  ]
  const activeCats = PLACEMENT_ORDER.filter(c => skillNodes.some(s => s.category === c))
  const extraCats = CAT_ORDER.filter(c =>
    skillNodes.some(s => s.category === c) && !PLACEMENT_ORDER.includes(c)
  )
  const orderedCats = [...activeCats, ...extraCats]

  const catSizes = orderedCats.map(c => skillNodes.filter(s => s.category === c).length)
  const totalSkills = catSizes.reduce((a, b) => a + b, 0)

  let arcStart = -Math.PI / 2

  orderedCats.forEach((cat, ci) => {
    const siblings = [...skillNodes.filter(s => s.category === cat)]

    const fullArc = (catSizes[ci] / totalSkills) * 2 * Math.PI
    // Use 82% of the arc so there's always a visible gap between categories
    const sectorSpan = fullArc * 0.82
    const sectorCenter = arcStart + fullArc / 2
    arcStart += fullArc

    const n = siblings.length

    // Decide how many columns (rings) to split the category into.
    // Aim for roughly sqrt(n) rows but at most 3 rings.
    const numRings = Math.min(RINGS.length, Math.ceil(Math.sqrt(n)))

    // Distribute nodes evenly across rings (innermost ring gets fewer)
    // e.g. 10 nodes → ring0: 3, ring1: 3, ring2: 4
    const ringCounts = Array(numRings).fill(0)
    for (let i = 0; i < n; i++) ringCounts[i % numRings]++

    let nodeIdx = 0
    for (let ri = 0; ri < numRings; ri++) {
      const { rx, ry } = RINGS[ri]
      const count = ringCounts[ri]
      if (!count) continue

      // Calculate how much angular space n nodes need on this ellipse
      // Use the conservative (smaller) axis for angular gap
      const minAxis = Math.min(rx, ry)
      const angularGap = 2 * Math.atan2(NODE_W / 2, minAxis)
      const neededSpan = (count - 1) * angularGap
      const usedSpan = Math.min(sectorSpan, neededSpan)
      const startAngle = sectorCenter - usedSpan / 2

      // Stagger odd rings by half a gap so they don't stack directly behind even rings
      const stagger = ri % 2 === 1 ? angularGap * 0.5 : 0

      for (let j = 0; j < count; j++) {
        const t = count === 1 ? 0.5 : j / (count - 1)
        const angle = startAngle + stagger + t * usedSpan

        positions.set(siblings[nodeIdx].id, {
          x: cx + rx * Math.cos(angle),
          y: cy + ry * Math.sin(angle),
        })
        nodeIdx++
      }
    }
  })

  // ── Repulsion pass: push overlapping skill nodes apart ────────────────────
  // Run up to 60 iterations of simple pairwise repulsion to eliminate any
  // residual overlaps. This is O(n²) but n=55 so it's fast (~3000 pairs).
  const skillIds = skillNodes.map(s => s.id)
  for (let iter = 0; iter < 60; iter++) {
    let moved = false
    for (let a = 0; a < skillIds.length - 1; a++) {
      for (let b = a + 1; b < skillIds.length; b++) {
        const pa = positions.get(skillIds[a])
        const pb = positions.get(skillIds[b])
        const dx = pb.x - pa.x
        const dy = pb.y - pa.y
        // Required clearance: NODE_W horizontally, NODE_H vertically
        const overlapX = NODE_W - Math.abs(dx)
        const overlapY = NODE_H - Math.abs(dy)
        if (overlapX > 0 && overlapY > 0) {
          // Push along the axis of least overlap
          const pushX = (overlapX / 2 + 1) * Math.sign(dx || 1)
          const pushY = (overlapY / 2 + 1) * Math.sign(dy || 1)
          if (overlapX < overlapY) {
            pa.x -= pushX; pb.x += pushX
          } else {
            pa.y -= pushY; pb.y += pushY
          }
          moved = true
        }
      }
    }
    if (!moved) break
  }

  return { positions, W, H }
}


// ─── Main component ───────────────────────────────────────────────────────────
export default function SkillGraph({
  selectedSkill,
  onSkillSelect,
  selectedProject,
  onProjectSelect,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}) {
  const { skillNodes, projectNodes, edges } = useMemo(() => buildGraphData(), [])
  const { positions } = useMemo(
    () => computeLayout(skillNodes, projectNodes),
    [skillNodes, projectNodes]
  )

  const allNodes = useMemo(() => [
    ...skillNodes.map(s => ({ ...s, ...positions.get(s.id) })),
    ...projectNodes.map(p => ({ ...p, ...positions.get(p.id) })),
  ].filter(n => n.x !== undefined), [skillNodes, projectNodes, positions])

  const allEdges = useMemo(() => {
    const map = new Map(allNodes.map(n => [n.id, n]))
    return edges.map(e => ({ src: map.get(e.from), tgt: map.get(e.to) }))
      .filter(e => e.src && e.tgt)
  }, [allNodes, edges])

  const stats = useMemo(() => ({
    skills: skillNodes.length,
    projects: projectNodes.length,
    edges: allEdges.length,
  }), [skillNodes, projectNodes, allEdges])

  // ── Viewport ──────────────────────────────────────────────────────────────
  const containerRef = useRef(null)
  const [vp, setVp] = useState({ x: 0, y: 0, scale: 1 })
  const [dragging, setDragging] = useState(false)
  const [dragOrigin, setDragOrigin] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(null)

  // Node dimensions (must match the rendering constants below)
  const SW = 96, SH = 44, PW = 138, PH = 56

  // ── Actual bounding box of all placed nodes ───────────────────────────────
  // We fit the VIEWPORT to this box, not to the abstract W×H canvas.
  // This is the key fix: nodes only occupy ~1600×700 of the 2400×1000 canvas,
  // so fitting W×H would under-use the screen.
  const nodeBounds = useMemo(() => {
    if (!allNodes.length) return null
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
    allNodes.forEach(n => {
      const hw = n.type === 'project' ? PW / 2 : SW / 2
      const hh = n.type === 'project' ? PH / 2 : SH / 2
      minX = Math.min(minX, n.x - hw)
      maxX = Math.max(maxX, n.x + hw)
      minY = Math.min(minY, n.y - hh)
      maxY = Math.max(maxY, n.y + hh)
    })
    return { minX, maxX, minY, maxY }
  }, [allNodes, SW, SH, PW, PH])

  // ── Fit viewport to node bounding box ────────────────────────────────────
  const fitToBounds = useCallback(() => {
    const el = containerRef.current
    if (!el || !nodeBounds) return
    const { width, height } = el.getBoundingClientRect()
    const { minX, maxX, minY, maxY } = nodeBounds
    const graphW = maxX - minX
    const graphH = maxY - minY
    const isMobile = width < 768
    const PAD = isMobile ? 24 : 60
    const rawScale = Math.min(
      (width - PAD * 2) / (graphW + PAD * 2),
      (height - PAD * 2) / (graphH + PAD * 2),
    )

    if (isMobile) {
      // On mobile: start zoomed in at the center of the graph at a readable scale.
      // Users can pinch-zoom out to see all nodes.
      const gcx = (minX + maxX) / 2
      const gcy = (minY + maxY) / 2
      const mobileScale = Math.max(rawScale * 2.2, 0.38) // Start 2x+ zoomed vs fit-all
      setVp({
        scale: Math.min(mobileScale, 0.65),
        x: width / 2 - gcx * Math.min(mobileScale, 0.65),
        y: height / 2 - gcy * Math.min(mobileScale, 0.65),
      })
    } else {
      const scale = Math.max(Math.min(rawScale, 1.0), 0.45)
      const gcx = (minX + maxX) / 2
      const gcy = (minY + maxY) / 2
      setVp({
        scale,
        x: width / 2 - gcx * scale,
        y: height / 2 - gcy * scale,
      })
    }
  }, [nodeBounds])

  // Run once after the DOM is ready and nodeBounds is available
  useEffect(() => {
    fitToBounds()
  }, [fitToBounds])

  // ── Selection: which node is "active" (hovered or selected) ──────────────
  const selectedId = selectedSkill?.id ?? selectedProject?.id ?? null
  const activeNode = hovered ?? (selectedId ? allNodes.find(n => n.id === selectedId) : null)

  // ── Connected IDs for highlighting ────────────────────────────────────────
  const connectedIds = useMemo(() => {
    if (!activeNode) return null
    const ids = new Set([activeNode.id])
    if (activeNode.type === 'skill') {
      activeNode.projects.forEach(id => ids.add(id))
    } else {
      // project selected → highlight skills that use it
      skillNodes.forEach(s => { if (s.projects.includes(activeNode.id)) ids.add(s.id) })
    }
    return ids
  }, [activeNode, skillNodes])

  // ── Filtering ─────────────────────────────────────────────────────────────
  const visibleNodes = useMemo(() => allNodes.filter(n => {
    if (n.type === 'project') return true
    const matchCat = !selectedCategory || n.category === selectedCategory
    const matchSearch = !searchQuery || n.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchSearch
  }), [allNodes, selectedCategory, searchQuery])

  const visibleIdSet = useMemo(() => new Set(visibleNodes.map(n => n.id)), [visibleNodes])

  const visibleEdges = useMemo(() => allEdges.filter(
    e => visibleIdSet.has(e.src.id) && visibleIdSet.has(e.tgt.id)
  ), [allEdges, visibleIdSet])

  // ── Wheel zoom ────────────────────────────────────────────────────────────
  const handleWheel = useCallback(e => {
    e.preventDefault()
    const factor = e.deltaY < 0 ? 1.1 : 0.9
    const newScale = Math.min(Math.max(vp.scale * factor, 0.12), 5)
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const mx = e.clientX - rect.left
    const my = e.clientY - rect.top
    setVp(p => ({
      scale: newScale,
      x: mx - (mx - p.x) * (newScale / p.scale),
      y: my - (my - p.y) * (newScale / p.scale),
    }))
  }, [vp.scale])

  // ── Pan & Touch ─────────────────────────────────────────────────────────
  const onMouseDown = e => {
    if (e.target.tagName === 'svg' || e.target.tagName === 'rect') {
      setDragging(true)
      setDragOrigin({ x: e.clientX - vp.x, y: e.clientY - vp.y })
    }
  }
  const onMouseMove = e => {
    if (!dragging) return
    setVp(p => ({ ...p, x: e.clientX - dragOrigin.x, y: e.clientY - dragOrigin.y }))
  }
  const onMouseUp = () => setDragging(false)

  // Touch gesture support
  const touchDataRef = useRef({ dist: 0, scale: 1 })
  const onTouchStart = e => {
    if (e.touches.length === 1) {
      const t = e.touches[0]
      setDragging(true)
      setDragOrigin({ x: t.clientX - vp.x, y: t.clientY - vp.y })
    } else if (e.touches.length === 2) {
      const t1 = e.touches[0]
      const t2 = e.touches[1]
      const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY)
      touchDataRef.current = { dist, scale: vp.scale }
    }
  }

  const onTouchMove = e => {
    if (e.touches.length === 1 && dragging) {
      const t = e.touches[0]
      setVp(p => ({ ...p, x: t.clientX - dragOrigin.x, y: t.clientY - dragOrigin.y }))
    } else if (e.touches.length === 2 && touchDataRef.current.dist > 0) {
      const t1 = e.touches[0]
      const t2 = e.touches[1]
      const newDist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY)
      const factor = newDist / touchDataRef.current.dist
      const newScale = Math.min(Math.max(touchDataRef.current.scale * factor, 0.12), 5)
      setVp(p => ({ ...p, scale: newScale }))
    }
  }

  const onTouchEnd = () => {
    setDragging(false)
    touchDataRef.current.dist = 0
  }

  // ── Reset view ────────────────────────────────────────────────────────────
  const resetView = fitToBounds

  // ── Clear selection ───────────────────────────────────────────────────────
  const clearSelection = () => {
    onSkillSelect?.(null)
    onProjectSelect?.(null)
    setHovered(null)
  }

  // ── Edge bezier ───────────────────────────────────────────────────────────
  const bezier = (sx, sy, tx, ty) => {
    const dx = tx - sx, dy = ty - sy
    const len = Math.sqrt(dx * dx + dy * dy) || 1
    const bend = Math.min(len * 0.18, 60)
    const mx = (sx + tx) / 2, my = (sy + ty) / 2
    return `M${sx},${sy} Q${mx - dy * bend / len},${my + dx * bend / len} ${tx},${ty}`
  }

  // ── Node dimensions (must match nodeBounds constants above) ────────────────
  // SW=96, SH=44, PW=138, PH=56 — already declared earlier in this scope

  const inspectorOpen = !!(selectedSkill || selectedProject)

  return (
    <div className="flex flex-col" style={{ height: '100%', overflow: 'hidden' }}>

      {/* ══ TOOLBAR ══════════════════════════════════════════════════════════ */}
      {/* Desktop Toolbar */}
      <div
        className="hidden md:flex items-stretch shrink-0 border-b border-border"
        style={{ background: '#0d0d0d' }}
      >
        {/* 02 SKILLS */}
        <div className="flex items-center gap-3 px-5 border-r border-border">
          <span className="font-mono text-accent text-xs font-bold">02</span>
          <span className="font-mono text-text text-xs font-bold tracking-[0.2em]">SKILLS</span>
        </div>

        {/* Stats */}
        <div className="flex items-center border-r border-border px-5 gap-4">
          {[
            { value: stats.skills, label: 'SKILLS' },
            { value: stats.projects, label: 'PROJECTS' },
            { value: stats.edges, label: 'EDGES' },
          ].map(({ value, label }, i, arr) => (
            <div key={label} className="flex items-center gap-4">
              <div className="text-center py-2">
                <div className="font-mono text-accent font-bold text-sm leading-none">{value}</div>
                <div className="font-mono text-text3 text-[8px] tracking-widest mt-0.5">{label}</div>
              </div>
              {i < arr.length - 1 && <div className="w-px h-5 bg-border2" />}
            </div>
          ))}
        </div>

        {/* Category filters */}
        <div className="flex items-center gap-1 px-4 flex-1 overflow-x-auto no-scrollbar border-r border-border">
          {CAT_ORDER.map((cat, i) => {
            const active = selectedCategory === cat
            return (
              <button
                key={cat}
                onClick={() => { onCategoryChange?.(active ? '' : cat); clearSelection() }}
                className="flex-shrink-0 font-mono text-[9px] tracking-wider px-2 py-1 border transition-all duration-150 whitespace-nowrap"
                style={{
                  borderColor: active ? '#00ff9d' : '#2a2a2a',
                  color: active ? '#00ff9d' : '#555555',
                  background: active ? 'rgba(0,255,157,0.06)' : 'transparent',
                }}
              >
                <span style={{ color: active ? '#00cc7d' : '#3a3a3a' }} className="mr-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {CAT_ABBR[cat] ?? cat}
              </button>
            )
          })}
        </div>

        {/* Search */}
        <div className="flex items-center px-4 shrink-0">
          <input
            type="text"
            placeholder="search..."
            value={searchQuery}
            onChange={e => onSearchChange?.(e.target.value)}
            className="font-mono text-xs bg-transparent border border-border2 text-text2 px-3 py-1.5 w-40 focus:border-accent focus:outline-none placeholder:text-text3 transition-colors"
          />
        </div>
      </div>

      {/* Mobile Toolbar (Stacked & scrollable) */}
      <div
        className="flex md:hidden flex-col shrink-0 border-b border-border divide-y divide-border2"
        style={{ background: '#0d0d0d' }}
      >
        <div className="flex items-center justify-between px-3 py-2 gap-2">
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-mono text-accent text-xs font-bold">02</span>
            <span className="font-mono text-text text-xs font-bold tracking-wider">SKILLS</span>
            <span className="font-mono text-[10px] text-accent px-1.5 py-0.5 bg-accent/10 rounded">
              {stats.skills}
            </span>
          </div>
          <div className="flex-1 max-w-[170px]">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={e => onSearchChange?.(e.target.value)}
              className="w-full font-mono text-xs bg-surface2 border border-border2 text-text2 px-2.5 py-1 focus:border-accent focus:outline-none placeholder:text-text3/60 rounded-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 overflow-x-auto no-scrollbar">
          {CAT_ORDER.map((cat, i) => {
            const active = selectedCategory === cat
            return (
              <button
                key={cat}
                onClick={() => { onCategoryChange?.(active ? '' : cat); clearSelection() }}
                className="flex-shrink-0 font-mono text-[10px] tracking-wider px-2 py-1 border transition-all duration-150 whitespace-nowrap rounded-sm"
                style={{
                  borderColor: active ? '#00ff9d' : '#2a2a2a',
                  color: active ? '#00ff9d' : '#777777',
                  background: active ? 'rgba(0,255,157,0.08)' : '#111111',
                }}
              >
                <span style={{ color: active ? '#00cc7d' : '#555555' }} className="mr-1 font-bold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {CAT_ABBR[cat] ?? cat}
              </button>
            )
          })}
        </div>
      </div>

      {/* ══ GRAPH CANVAS ═════════════════════════════════════════════════════ */}
      <div
        ref={containerRef}
        className="relative flex-1 overflow-hidden"
        style={{ background: '#0a0a0a' }}
      >
        {/* Mobile hint — pinch to zoom */}
        <div className="md:hidden absolute bottom-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <span className="font-mono text-[10px] text-text3/70 tracking-widest bg-surface/80 px-3 py-1 rounded-full border border-border">
            PINCH TO ZOOM · DRAG TO PAN
          </span>
        </div>
        {/* Dot grid */}
        <svg
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ width: '100%', height: '100%', opacity: 0.25 }}
        >
          <defs>
            <pattern id="sg-dots" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="0.8" cy="0.8" r="0.8" fill="#3a3a3a" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sg-dots)" />
        </svg>

        {/* Main SVG */}
        <svg
          style={{ width: '100%', height: '100%', cursor: dragging ? 'grabbing' : 'grab', touchAction: 'none' }}
          onWheel={handleWheel}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onClick={clearSelection}
        >
          <g transform={`translate(${vp.x},${vp.y}) scale(${vp.scale})`}>
            {/* Background hit rect */}
            <rect x={-99999} y={-99999} width={999999} height={999999} fill="transparent" />

            {/* ── Edges ──────────────────────────────────────────────────── */}
            {visibleEdges.map((e, i) => {
              const isDirectConnection = activeNode &&
                (e.src.id === activeNode.id || e.tgt.id === activeNode.id)

              let edgeStroke = '#222222'
              let edgeWidth = 0.8
              let edgeOpacity = 0.12 // Default: very subtle

              if (activeNode) {
                if (isDirectConnection) {
                  if (hovered && hovered.id === activeNode.id) {
                    // Hover state: moderately visible
                    edgeStroke = '#00cc7d'
                    edgeOpacity = 0.6
                    edgeWidth = 1.2
                  } else {
                    // Selected state: bright green
                    edgeStroke = '#00ff9d'
                    edgeOpacity = 0.95
                    edgeWidth = 1.8
                  }
                } else {
                  // Unrelated edges during interaction: almost invisible
                  edgeOpacity = 0.02
                }
              }

              return (
                <path
                  key={i}
                  d={bezier(e.src.x, e.src.y, e.tgt.x, e.tgt.y)}
                  stroke={edgeStroke}
                  strokeWidth={edgeWidth}
                  fill="none"
                  opacity={edgeOpacity}
                  className={isDirectConnection ? 'sg-edge-active' : undefined}
                />
              )
            })}

            {/* ── Nodes ──────────────────────────────────────────────────── */}
            {visibleNodes.map(node => {
              const isActiveNode = activeNode?.id === node.id
              const isSelected = node.id === selectedId
              const highlighted = !activeNode || connectedIds?.has(node.id)
              const opacity = highlighted ? 1 : 0.12

              // ── PROJECT NODE ────────────────────────────────────────────
              if (node.type === 'project') {
                // Default: subtle green border to signal "project = anchor"
                const borderCol = isActiveNode
                  ? '#00ff9d'
                  : (highlighted && activeNode) ? '#00cc7d'
                    : isSelected ? '#00cc7d'
                      : '#1e4a30'   // restrained dark green border
                const labelCol = isActiveNode || (highlighted && activeNode)
                  ? '#00ff9d'
                  : isSelected ? '#00cc7d'
                    : '#2d6b4a'   // muted green for MISSION/LAB metadata
                const nameCol = isActiveNode || (highlighted && activeNode) || isSelected
                  ? '#d0d0d0' : '#848484'  // slightly brighter than skills at rest
                const dotCol = isActiveNode || isSelected ? '#00ff9d' : '#1e4a30'
                const fillCol = isActiveNode ? 'rgba(0,255,157,0.07)'
                  : isSelected ? 'rgba(0,255,157,0.04)'
                    : 'rgba(10,20,14,1)'    // very subtle green tint on bg
                return (
                  <g
                    key={node.id}
                    opacity={opacity}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={e => { e.stopPropagation(); setHovered(node) }}
                    onMouseLeave={() => setHovered(null)}
                    onClick={e => {
                      e.stopPropagation()
                      onSkillSelect?.(null)
                      onProjectSelect?.(node)
                    }}
                  >
                    <rect
                      x={node.x - PW / 2} y={node.y - PH / 2}
                      width={PW} height={PH} rx={2}
                      fill={fillCol}
                      stroke={borderCol}
                      strokeWidth={isActiveNode || isSelected ? 1.5 : 1}
                    />
                    <text
                      x={node.x} y={node.y - 12}
                      textAnchor="middle" fontSize={7}
                      fontFamily="JetBrains Mono, monospace"
                      fill={labelCol} letterSpacing="1.2"
                    >
                      {node.label}
                    </text>
                    <text
                      x={node.x} y={node.y + 7}
                      textAnchor="middle" fontSize={10}
                      fontFamily="Inter, sans-serif" fontWeight="500"
                      fill={nameCol}
                    >
                      {node.name.length > 16 ? node.name.slice(0, 15) + '…' : node.name}
                    </text>
                    <circle
                      cx={node.x + PW / 2 - 7} cy={node.y - PH / 2 + 7}
                      r={3}
                      fill={dotCol}
                    />
                  </g>
                )
              }

              // ── SKILL NODE ──────────────────────────────────────────────
              // Cool blue-gray identity to contrast with project green
              const borderCol = isActiveNode
                ? '#00ff9d'
                : (isSelected || (highlighted && activeNode)) ? '#4a8fff'
                  : '#2a3040'   // cool dark blue-gray border at rest
              const nameFill = isActiveNode || isSelected || (highlighted && activeNode)
                ? '#e0e0e0' : '#606878'   // slightly cool-tinted text at rest
              const subFill = isActiveNode
                ? '#00ff9d'
                : (highlighted && activeNode) ? '#4a8fff'
                  : '#3a4050'   // cool blue-gray for category metadata

              return (
                <g
                  key={node.id}
                  opacity={opacity}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={e => { e.stopPropagation(); setHovered(node) }}
                  onMouseLeave={() => setHovered(null)}
                  onClick={e => {
                    e.stopPropagation()
                    onProjectSelect?.(null)
                    onSkillSelect?.(node.data)
                  }}
                >
                  <rect
                    x={node.x - SW / 2} y={node.y - SH / 2}
                    width={SW} height={SH} rx={2}
                    fill={isActiveNode ? 'rgba(0,255,157,0.06)' : 'rgba(12,14,20,1)'}
                    stroke={borderCol}
                    strokeWidth={isActiveNode ? 1.5 : 0.8}
                  />
                  <text
                    x={node.x} y={node.y - 5}
                    textAnchor="middle" fontSize={10}
                    fontFamily="Inter, sans-serif" fontWeight="500"
                    fill={nameFill}
                  >
                    {node.name.length > 12 ? node.name.slice(0, 11) + '…' : node.name}
                  </text>
                  <text
                    x={node.x} y={node.y + 12}
                    textAnchor="middle" fontSize={7.5}
                    fontFamily="JetBrains Mono, monospace"
                    fill={subFill} letterSpacing="0.8"
                  >
                    {node.abbr} · {node.projects.length}
                  </text>
                </g>
              )
            })}
          </g>
        </svg>

        {/* ── Zoom controls (bottom-left) ───────────────────────────────── */}
        <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 flex flex-col gap-1.5 z-20">
          <button
            onClick={() => setVp(p => ({ ...p, scale: Math.min(p.scale * 1.25, 5) }))}
            className="w-9 h-9 sm:w-7 sm:h-7 flex items-center justify-center border border-border2 font-mono text-text2 text-sm sm:text-xs hover:border-accent hover:text-accent transition-colors rounded-sm"
            style={{ background: 'rgba(10,10,10,0.92)' }}
            aria-label="Zoom in"
          >
            +
          </button>
          <button
            onClick={() => setVp(p => ({ ...p, scale: Math.max(p.scale * 0.8, 0.12) }))}
            className="w-9 h-9 sm:w-7 sm:h-7 flex items-center justify-center border border-border2 font-mono text-text2 text-sm sm:text-xs hover:border-accent hover:text-accent transition-colors rounded-sm"
            style={{ background: 'rgba(10,10,10,0.92)' }}
            aria-label="Zoom out"
          >
            −
          </button>
          <button
            onClick={resetView}
            className="w-9 h-9 sm:w-7 sm:h-7 flex items-center justify-center border border-border2 font-mono text-text2 text-sm sm:text-xs hover:border-accent hover:text-accent transition-colors rounded-sm"
            style={{ background: 'rgba(10,10,10,0.92)' }}
            aria-label="Reset zoom"
          >
            ⊙
          </button>
        </div>

        {/* ── Legend (bottom-right, hidden on very small screens or when inspector open) ────────── */}
        {!inspectorOpen && (
          <div
            className="hidden sm:flex absolute bottom-5 right-5 items-center gap-5 px-3 py-2 border border-border"
            style={{ background: 'rgba(10,10,10,0.92)' }}
          >
            {/* SKILL – cool blue-gray */}
            <div className="flex items-center gap-1.5">
              <div style={{ width: 14, height: 10, border: '1px solid #2a3040', borderRadius: 1, background: 'rgba(12,14,20,1)' }} />
              <span className="font-mono text-[8px]" style={{ color: '#4a5060' }}>SKILL</span>
            </div>
            {/* PROJECT – subtle green */}
            <div className="flex items-center gap-1.5">
              <div style={{ width: 18, height: 13, border: '1px solid #1e4a30', borderRadius: 1, background: 'rgba(10,20,14,1)' }} />
              <span className="font-mono text-[8px]" style={{ color: '#2d6b4a' }}>PROJECT</span>
            </div>
            {/* ACTIVE – bright green */}
            <div className="flex items-center gap-1.5">
              <div style={{ width: 28, height: 2, background: '#00ff9d', borderRadius: 1, opacity: 0.9 }} />
              <span className="font-mono text-[8px]" style={{ color: '#00ff9d' }}>ACTIVE</span>
            </div>
          </div>
        )}

        {/* ── Inspector Panel (Mobile Bottom Sheet / Desktop Right Sidebar) ──────────────── */}
        {selectedSkill && (
          <SkillInspector
            key={selectedSkill.id}
            skillNode={allNodes.find(n => n.id === selectedSkill.id)}
            projectNodes={projectNodes}
            onClose={clearSelection}
          />
        )}
        {selectedProject && !selectedSkill && (
          <ProjectInspector
            key={selectedProject.id}
            projectNode={selectedProject}
            skillNodes={skillNodes}
            onClose={clearSelection}
          />
        )}
      </div>
    </div>
  )
}

// ─── Skill Inspector ──────────────────────────────────────────────────────────
function SkillInspector({ skillNode, projectNodes, onClose }) {
  const projectMap = useMemo(() => new Map(projectNodes.map(p => [p.id, p])), [projectNodes])
  const usedIn = useMemo(
    () => (skillNode?.projects ?? []).map(id => projectMap.get(id)).filter(Boolean),
    [skillNode, projectMap]
  )

  if (!skillNode) return null

  return (
    <div
      className="sg-inspector animate-sheet-up fixed inset-x-0 bottom-0 max-h-[78vh] md:max-h-none md:inset-x-auto md:top-0 md:right-0 md:bottom-0 md:w-72 flex flex-col border-t md:border-t-0 md:border-l border-border rounded-t-xl md:rounded-none z-50 overflow-y-auto shadow-2xl"
      style={{ background: 'rgba(10,10,10,0.98)' }}
      onClick={e => e.stopPropagation()}
    >
      {/* Mobile drag handle */}
      <div className="w-10 h-1 rounded-full bg-border2 mx-auto mt-2.5 mb-1 md:hidden shrink-0" />

      <div className="flex items-center justify-between px-5 py-3 sm:py-4 border-b border-border shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
          <span className="font-mono text-[9px] text-text3 tracking-[0.18em] uppercase">Skill Node</span>
        </div>
        <button
          onClick={onClose}
          className="font-mono text-text3 text-sm hover:text-text transition-colors w-9 h-9 sm:w-6 sm:h-6 flex items-center justify-center rounded-sm"
          aria-label="Close inspector"
        >
          ✕
        </button>
      </div>
      <div className="h-px bg-accent shrink-0" />
      <div className="px-5 py-4 sm:py-5 flex-1">
        <h2 className="font-mono text-text font-bold tracking-[0.1em] uppercase text-[15px] mb-1 leading-tight">
          {skillNode.name}
        </h2>
        <p className="font-mono text-accent text-[9px] tracking-[0.2em] uppercase mb-4">
          {skillNode.data?.category ?? skillNode.category}
        </p>
        {skillNode.evidence && (
          <div className="flex gap-3 mb-5">
            <div className="w-px bg-border2 mt-0.5 shrink-0" />
            <p className="text-text3 text-[11px] leading-relaxed">{skillNode.evidence}</p>
          </div>
        )}
        <div className="border-t border-border mb-4" />
        <p className="font-mono text-[8px] text-text3 tracking-[0.2em] uppercase mb-3">
          Used in {usedIn.length} project{usedIn.length !== 1 ? 's' : ''}
        </p>
        <div className="flex flex-col gap-1.5 pb-4">
          {usedIn.map(p => <ProjectEntry key={p.id} project={p} />)}
          {usedIn.length === 0 && (
            <p className="font-mono text-text3 text-[10px]">No linked projects.</p>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Project Inspector ────────────────────────────────────────────────────────
function ProjectInspector({ projectNode, skillNodes, onClose }) {
  // Skills that reference this project
  const linkedSkills = useMemo(
    () => skillNodes.filter(s => s.projects.includes(projectNode.id)),
    [projectNode.id, skillNodes]
  )

  // Raw source data (mission or experiment object)
  const raw = projectNode.raw ?? {}

  // Flatten tech stack (missions have nested stack object, labs have flat technologies array)
  const technologies = useMemo(() => {
    const r = projectNode.raw ?? {}
    if (!projectNode.isMission) return r.technologies ?? []
    const s = r.stack ?? {}
    return [...new Set([
      ...(s.frontend ?? []),
      ...(s.backend ?? []),
      ...(s.machineLearning ?? []),
      ...(s.infrastructure ?? []),
      ...(s.mapping ?? []),
      ...(s.database ?? []),
      ...(s.tools ?? []),
      ...(s.languages ?? []),
    ])]
  }, [projectNode])

  return (
    <div
      className="sg-inspector animate-sheet-up fixed inset-x-0 bottom-0 max-h-[78vh] md:max-h-none md:inset-x-auto md:top-0 md:right-0 md:bottom-0 md:w-72 flex flex-col border-t md:border-t-0 md:border-l border-border rounded-t-xl md:rounded-none z-50 overflow-y-auto shadow-2xl"
      style={{ background: 'rgba(10,10,10,0.98)' }}
      onClick={e => e.stopPropagation()}
    >
      {/* Mobile drag handle */}
      <div className="w-10 h-1 rounded-full bg-border2 mx-auto mt-2.5 mb-1 md:hidden shrink-0" />

      <div className="flex items-center justify-between px-5 py-3 sm:py-4 border-b border-border shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
          <span className="font-mono text-[9px] text-text3 tracking-[0.18em] uppercase">
            {projectNode.isMission ? 'Mission' : 'Lab'} Node
          </span>
        </div>
        <button
          onClick={onClose}
          className="font-mono text-text3 text-sm hover:text-text transition-colors w-9 h-9 sm:w-6 sm:h-6 flex items-center justify-center rounded-sm"
          aria-label="Close inspector"
        >
          ✕
        </button>
      </div>
      <div className="h-px bg-accent shrink-0" />

      <div className="px-5 py-4 sm:py-5 flex-1">
        {/* Label (MISSION // 01) */}
        <p className="font-mono text-[9px] text-text3 tracking-[0.2em] uppercase mb-1">
          {projectNode.label}
        </p>
        {/* Title */}
        <h2 className="font-mono text-text font-bold tracking-[0.08em] uppercase text-[14px] mb-1 leading-tight">
          {projectNode.name}
        </h2>
        {/* Type + Status */}
        <div className="flex items-center gap-3 mb-4">
          {raw.type && (
            <span className="font-mono text-accent text-[8px] tracking-widest">{raw.type}</span>
          )}
          {raw.category && !raw.type && (
            <span className="font-mono text-accent text-[8px] tracking-widest">{raw.category}</span>
          )}
          {raw.status && (
            <span className="font-mono text-text3 text-[8px] tracking-widest border border-border2 px-1.5 py-0.5">
              {raw.status}
            </span>
          )}
        </div>

        {/* Description */}
        {(raw.shortDescription || raw.description) && (
          <div className="flex gap-3 mb-5">
            <div className="w-px bg-border2 mt-0.5 shrink-0" />
            <p className="text-text3 text-[11px] leading-relaxed">
              {raw.shortDescription ?? raw.description}
            </p>
          </div>
        )}

        <div className="border-t border-border mb-4" />

        {/* Technologies */}
        {technologies.length > 0 && (
          <div className="mb-4">
            <p className="font-mono text-[8px] text-text3 tracking-[0.2em] uppercase mb-2">
              Technologies
            </p>
            <div className="flex flex-wrap gap-1">
              {technologies.map(t => (
                <span
                  key={t}
                  className="font-mono text-[9px] border border-border2 px-1.5 py-0.5 text-text3"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Connected skills from graph */}
        {linkedSkills.length > 0 && (
          <div className="mb-4">
            <p className="font-mono text-[8px] text-text3 tracking-[0.2em] uppercase mb-2">
              Linked Skills · {linkedSkills.length}
            </p>
            <div className="flex flex-wrap gap-1">
              {linkedSkills.map(s => (
                <span
                  key={s.id}
                  className="font-mono text-[9px] border border-border2 px-1.5 py-0.5"
                  style={{ color: '#666666' }}
                >
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        {(raw.github || raw.demo || raw.links?.github || raw.links?.demo) && (
          <div className="border-t border-border pt-4 flex flex-col gap-2">
            {(raw.github || raw.links?.github) && (
              <a
                href={raw.github ?? raw.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between border border-border2 px-3 py-2 hover:border-accent group transition-colors"
                style={{ background: '#0d0d0d' }}
                onClick={e => e.stopPropagation()}
              >
                <span className="font-mono text-[10px] text-text3 group-hover:text-text transition-colors">GitHub</span>
                <span className="font-mono text-text3 text-xs group-hover:text-accent transition-colors">↗</span>
              </a>
            )}
            {(raw.demo || raw.links?.demo) && (
              <a
                href={raw.demo ?? raw.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between border border-border2 px-3 py-2 hover:border-accent group transition-colors"
                style={{ background: '#0d0d0d' }}
                onClick={e => e.stopPropagation()}
              >
                <span className="font-mono text-[10px] text-text3 group-hover:text-text transition-colors">Live Demo</span>
                <span className="font-mono text-text3 text-xs group-hover:text-accent transition-colors">↗</span>
              </a>
            )}
            {projectNode.slug && (
              <Link
                to={`/missions/${projectNode.slug}`}
                className="flex items-center justify-between border border-border2 px-3 py-2 hover:border-accent group transition-colors"
                style={{ background: '#0d0d0d' }}
                onClick={e => e.stopPropagation()}
              >
                <span className="font-mono text-[10px] text-accent group-hover:text-text transition-colors">View Full Mission</span>
                <span className="font-mono text-accent text-xs group-hover:text-text transition-colors">→</span>
              </Link>
            )}
          </div>
        )}
        {projectNode.slug && !(raw.github || raw.demo || raw.links?.github || raw.links?.demo) && (
          <div className="border-t border-border pt-4">
            <Link
              to={`/missions/${projectNode.slug}`}
              className="flex items-center justify-between border border-border2 px-3 py-2 hover:border-accent group transition-colors"
              style={{ background: '#0d0d0d' }}
              onClick={e => e.stopPropagation()}
            >
              <span className="font-mono text-[10px] text-accent group-hover:text-text transition-colors">View Full Mission</span>
              <span className="font-mono text-accent text-xs">→</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Project list entry (used inside SkillInspector) ─────────────────────────
function ProjectEntry({ project }) {
  const inner = (
    <div
      className="flex items-center justify-between px-3 py-2.5 border border-border2 group-hover:border-accent transition-colors"
      style={{ background: '#0d0d0d' }}
    >
      <div>
        <div className="font-mono text-accent text-[8px] tracking-widest mb-0.5">{project.labelShort}</div>
        <div className="text-text2 text-[11px] group-hover:text-text transition-colors">{project.name}</div>
      </div>
      {project.slug && (
        <span className="font-mono text-text3 text-xs group-hover:text-accent transition-colors">→</span>
      )}
    </div>
  )
  if (project.slug) {
    return (
      <Link to={`/missions/${project.slug}`} className="group block" onClick={e => e.stopPropagation()}>
        {inner}
      </Link>
    )
  }
  return <div className="group">{inner}</div>
}
