import { useParams } from 'react-router-dom'
import MissionDetail from '../components/missions/MissionDetail'
import { getProjectBySlug } from '../data/projects'
import MissionNotFound from './MissionNotFound'

export default function MissionDetailPage() {
  const { slug } = useParams()
  const mission = getProjectBySlug(slug)

  if (!mission) {
    return <MissionNotFound />
  }

  return <MissionDetail mission={mission} />
}
