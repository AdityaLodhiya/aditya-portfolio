import { useState } from 'react'
import SkillGraph from '../components/skills/SkillGraph'

export default function Skills() {
  const [selectedSkill,    setSelectedSkill]    = useState(null)
  const [selectedProject,  setSelectedProject]  = useState(null)
  const [searchQuery,      setSearchQuery]      = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  return (
    <SkillGraph
      selectedSkill={selectedSkill}
      onSkillSelect={setSelectedSkill}
      selectedProject={selectedProject}
      onProjectSelect={setSelectedProject}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      selectedCategory={selectedCategory}
      onCategoryChange={setSelectedCategory}
    />
  )
}
