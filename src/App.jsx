import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import SkillsLayout from './components/layout/SkillsLayout'
import Home from './pages/Home'
import Missions from './pages/Missions'
import MissionDetailPage from './pages/MissionDetailPage'
import Skills from './pages/Skills'
import Lab from './pages/Lab'
import Journey from './pages/Journey'
import Thinking from './pages/Thinking'
import Contact from './pages/Contact'
import './styles/globals.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/missions" element={<Layout><Missions /></Layout>} />
        <Route path="/missions/:slug" element={<Layout><MissionDetailPage /></Layout>} />
        <Route path="/skills" element={<SkillsLayout><Skills /></SkillsLayout>} />
        <Route path="/lab" element={<Layout><Lab /></Layout>} />
        <Route path="/journey" element={<Layout><Journey /></Layout>} />
        <Route path="/thinking" element={<Layout><Thinking /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
      </Routes>
    </Router>
  )
}

export default App